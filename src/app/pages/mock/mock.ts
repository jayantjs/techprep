import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../content.service';
import { CLOSING_PROMPT, INTERVIEWER_LINES, OPENING_PROMPTS, TalkPrompt } from '../../data/mock';
import { Difficulty, Question } from '../../data/models';
import { TOPIC_MAP, TRACK_MAP, topicsOf } from '../../data/topics';
import { ProgressService } from '../../progress.service';
import { Answer } from '../../shared/answer/answer';
import { inputValue, shuffle } from '../../shared/utils';

type Phase = 'setup' | 'live' | 'result';
type Rating = 'nailed' | 'partly' | 'missed';

interface QuestionItem {
  kind: 'question';
  id: string;
  question: Question;
}
interface TalkItem {
  kind: 'talk';
  id: string;
  prompt: TalkPrompt;
}
type MockItem = QuestionItem | TalkItem;

/** Minimal typing for the (prefixed) Web Speech recognition API. */
interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start(): void;
  stop(): void;
}
interface SpeechResultEvent {
  resultIndex: number;
  results: ArrayLike<{ isFinal: boolean; 0: { transcript: string } }>;
}
type RecognitionCtor = new () => SpeechRecognitionLike;

const DIFFICULTY_ORDER: Record<Difficulty, number> = { easy: 0, medium: 1, hard: 2 };
const POINTS: Record<Rating, number> = { nailed: 2, partly: 1, missed: 0 };

@Component({
  selector: 'app-mock',
  imports: [DatePipe, RouterLink, Answer],
  templateUrl: './mock.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockInterview {
  /** Bound from `?topic=` — the topic page links here with its id. */
  readonly topicParam = input<string | undefined>(undefined, { alias: 'topic' });

  protected readonly progress = inject(ProgressService);
  private readonly content = inject(ContentService);
  protected readonly inputValue = inputValue;
  protected readonly topicMap = TOPIC_MAP;

  // ── Setup ──
  protected readonly track = computed(() => TRACK_MAP[this.progress.track()]);
  protected readonly topics = computed(() =>
    topicsOf(this.progress.track()).filter((t) =>
      this.content.questions().some((q) => q.topic === t.id),
    ),
  );
  protected readonly topic = linkedSignal(() => {
    const param = this.topicParam();
    return param && TOPIC_MAP[param]?.track === this.progress.track() ? param : 'all';
  });
  protected readonly counts = [5, 8, 12, 15];
  protected readonly count = signal(8);
  protected readonly timeOptions = [
    { value: 60, label: '1 min' },
    { value: 120, label: '2 min' },
    { value: 180, label: '3 min' },
    { value: 0, label: 'No timer' },
  ];
  protected readonly seconds = signal(120);
  /** Intro / project / closing rounds — on by default for a full round. */
  protected readonly includeTalk = linkedSignal(() => this.topic() === 'all');
  protected readonly preferWeak = signal(true);
  protected readonly autoRead = signal(false);

  protected readonly pool = computed(() =>
    this.content.questions().filter((q) => this.topic() === 'all' || q.topic === this.topic()),
  );
  protected readonly size = computed(() => Math.min(this.count(), this.pool().length));
  protected readonly history = computed(() =>
    this.progress.mockHistory().filter((h) => h.track === this.progress.track()).slice(0, 5),
  );

  // ── Live interview ──
  protected readonly phase = signal<Phase>('setup');
  protected readonly items = signal<MockItem[]>([]);
  protected readonly index = signal(0);
  protected readonly revealed = signal(false);
  protected readonly timedOut = signal(false);
  protected readonly answerText = signal('');
  protected readonly timeLeft = signal(0);
  protected readonly ratings = signal<Record<string, Rating>>({});
  protected readonly timeSpent = signal<Record<string, number>>({});
  protected readonly listening = signal(false);
  private startedAt = 0;

  protected readonly current = computed(() => this.items()[this.index()]);
  protected readonly questionItems = computed(() =>
    this.items().filter((i): i is QuestionItem => i.kind === 'question'),
  );
  protected readonly questionNo = computed(
    () => this.items().slice(0, this.index() + 1).filter((i) => i.kind === 'question').length,
  );
  protected readonly isLast = computed(() => this.index() === this.items().length - 1);
  protected readonly interviewerLine = computed(() => {
    const n = this.questionNo();
    return n <= 1 ? INTERVIEWER_LINES[0] : INTERVIEWER_LINES[1 + ((n - 2) % (INTERVIEWER_LINES.length - 1))];
  });
  protected readonly pctDone = computed(() =>
    this.items().length ? Math.round((this.index() / this.items().length) * 100) : 0,
  );

  // ── Result ──
  private readonly rated = computed(() =>
    this.questionItems().filter((i) => this.ratings()[i.id] !== undefined),
  );
  protected readonly score = computed(() => {
    const rated = this.rated();
    if (!rated.length) return 0;
    const points = rated.reduce((sum, i) => sum + POINTS[this.ratings()[i.id]], 0);
    return Math.round((points / (rated.length * 2)) * 100);
  });
  protected readonly tally = computed(() => {
    const t = { nailed: 0, partly: 0, missed: 0 };
    for (const i of this.rated()) t[this.ratings()[i.id]]++;
    return t;
  });
  protected readonly verdict = computed(() => {
    const s = this.score();
    if (s >= 80) return { title: 'Strong — interview ready', tone: 'known' };
    if (s >= 60) return { title: 'Good — polish the weak spots', tone: 'known' };
    if (s >= 40) return { title: 'Borderline — revise and retry', tone: 'review' };
    return { title: 'Needs more practice', tone: 'wrong' };
  });
  protected readonly avgTime = computed(() => {
    const times = this.rated().map((i) => this.timeSpent()[i.id] ?? 0);
    return times.length ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0;
  });
  protected readonly byTopic = computed(() => {
    const groups = new Map<string, { title: string; points: number; total: number }>();
    for (const i of this.rated()) {
      const g = groups.get(i.question.topic) ?? {
        title: TOPIC_MAP[i.question.topic]?.title ?? i.question.topic,
        points: 0,
        total: 0,
      };
      g.points += POINTS[this.ratings()[i.id]];
      g.total += 2;
      groups.set(i.question.topic, g);
    }
    return [...groups.entries()]
      .map(([id, g]) => ({ id, title: g.title, pct: Math.round((g.points / g.total) * 100) }))
      .sort((a, b) => a.pct - b.pct);
  });
  protected readonly toRevise = computed(() =>
    this.rated()
      .filter((i) => this.ratings()[i.id] !== 'nailed')
      .map((i) => ({ item: i, rating: this.ratings()[i.id] })),
  );

  // ── Speech (optional, browser-dependent) ──
  protected readonly canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;
  private readonly Recognition: RecognitionCtor | undefined =
    typeof window === 'undefined'
      ? undefined
      : ((window as unknown as { SpeechRecognition?: RecognitionCtor }).SpeechRecognition ??
        (window as unknown as { webkitSpeechRecognition?: RecognitionCtor }).webkitSpeechRecognition);
  protected readonly canListen = !!this.Recognition;
  private recognition?: SpeechRecognitionLike;

  constructor() {
    // A topic link from another technology switches to that technology first.
    effect(() => {
      const param = this.topicParam();
      const track = param ? TOPIC_MAP[param]?.track : undefined;
      if (track && track !== this.progress.track()) this.progress.track.set(track);
    });

    const timer = setInterval(() => this.tick(), 1000);
    inject(DestroyRef).onDestroy(() => {
      clearInterval(timer);
      this.stopListening();
      if (this.canSpeak) speechSynthesis.cancel();
    });
  }

  protected start(): void {
    const talk = (prompt: TalkPrompt): TalkItem => ({ kind: 'talk', id: prompt.id, prompt });
    const questions: MockItem[] = this.pick().map((q) => ({ kind: 'question', id: q.id, question: q }));
    const items = this.includeTalk()
      ? [...OPENING_PROMPTS.map(talk), ...questions, talk(CLOSING_PROMPT)]
      : questions;
    this.items.set(items);
    this.ratings.set({});
    this.timeSpent.set({});
    this.phase.set('live');
    this.show(0);
  }

  protected questionText(item: MockItem): string {
    return item.kind === 'question' ? item.question.question : item.prompt.question(this.track().title);
  }

  protected reveal(timedOut = false): void {
    const item = this.current();
    if (!item || this.revealed()) return;
    this.stopListening();
    this.timedOut.set(timedOut);
    this.revealed.set(true);
    const spent = Math.round((Date.now() - this.startedAt) / 1000);
    this.timeSpent.update((t) => ({ ...t, [item.id]: spent }));
  }

  protected rate(rating: Rating): void {
    const item = this.current();
    if (item?.kind !== 'question') return;
    this.ratings.update((r) => ({ ...r, [item.id]: rating }));
    this.progress.setStatus(item.id, rating === 'nailed' ? 'known' : 'review');
    this.next();
  }

  protected skip(): void {
    this.reveal();
    this.rate('missed');
  }

  protected next(): void {
    if (this.isLast()) this.finish();
    else this.show(this.index() + 1);
  }

  protected finish(): void {
    this.stopListening();
    if (this.canSpeak) speechSynthesis.cancel();
    if (this.rated().length) {
      this.progress.addMockResult({
        date: new Date().toISOString(),
        track: this.progress.track(),
        topic: this.topic(),
        questions: this.rated().length,
        pct: this.score(),
      });
    }
    this.phase.set('result');
  }

  protected speak(text: string): void {
    if (!this.canSpeak) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    speechSynthesis.speak(utterance);
  }

  protected toggleListening(): void {
    if (this.listening()) {
      this.stopListening();
      return;
    }
    if (!this.Recognition) return;
    const rec = new this.Recognition();
    rec.lang = 'en-IN';
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (event) => {
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) text += event.results[i][0].transcript;
      }
      if (text.trim()) this.answerText.update((a) => (a ? a + ' ' : '') + text.trim());
    };
    rec.onend = () => this.listening.set(false);
    rec.onerror = () => this.listening.set(false);
    rec.start();
    this.recognition = rec;
    this.listening.set(true);
  }

  protected mmss(total: number): string {
    const m = Math.floor(total / 60);
    const s = total % 60;
    return m + ':' + String(s).padStart(2, '0');
  }

  protected topicName(id: string): string {
    return id === 'all' ? 'Full round' : (TOPIC_MAP[id]?.title ?? id);
  }

  private show(index: number): void {
    this.stopListening();
    this.index.set(index);
    this.revealed.set(false);
    this.timedOut.set(false);
    this.answerText.set('');
    this.timeLeft.set(this.seconds());
    this.startedAt = Date.now();
    const item = this.items()[index];
    if (item && this.autoRead()) this.speak(this.questionText(item));
  }

  private tick(): void {
    const item = this.current();
    if (this.phase() !== 'live' || this.revealed() || !this.seconds() || item?.kind !== 'question') return;
    this.timeLeft.update((t) => t - 1);
    if (this.timeLeft() <= 0) this.reveal(true);
  }

  private stopListening(): void {
    this.recognition?.stop();
    this.recognition = undefined;
    this.listening.set(false);
  }

  /** Round-robin across topics, then easy → hard like a real interview. */
  private pick(): Question[] {
    const status = this.progress.status();
    let pool = this.pool();
    if (this.preferWeak()) {
      const fresh = pool.filter((q) => status[q.id] !== 'known');
      if (fresh.length >= this.size()) pool = fresh;
    }
    const byTopic = new Map<string, Question[]>();
    for (const q of shuffle(pool)) {
      const list = byTopic.get(q.topic) ?? [];
      list.push(q);
      byTopic.set(q.topic, list);
    }
    const lists = shuffle([...byTopic.values()]);
    const picked: Question[] = [];
    while (picked.length < this.size() && lists.some((l) => l.length)) {
      for (const list of lists) {
        const q = list.shift();
        if (q && picked.length < this.size()) picked.push(q);
      }
    }
    return picked.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
  }
}
