import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { EXPERIENCE_MAP } from '../../data/experience';
import { Experience, QuizQuestion, Track } from '../../data/models';
import { TOPIC_MAP, TRACK_MAP, topicsOf } from '../../data/topics';
import { ContentService } from '../../content.service';
import { ProgressService } from '../../progress.service';
import { inputValue, shuffle, shuffleOptions } from '../../shared/utils';

type Phase = 'setup' | 'play' | 'result';

@Component({
  selector: 'app-quiz',
  imports: [DatePipe, RouterLink],
  templateUrl: './quiz.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Quiz {
  protected readonly progress = inject(ProgressService);
  private readonly content = inject(ContentService);
  protected readonly topics = computed(() =>
    topicsOf(this.progress.track()).filter((t) => this.content.quiz().some((q) => q.topic === t.id)),
  );
  protected readonly trackTitle = computed(() => TRACK_MAP[this.progress.track()].title);
  protected readonly topicMap = TOPIC_MAP;
  protected readonly counts = [5, 10, 15, 0];
  protected readonly letters = 'ABCD';
  protected readonly inputValue = inputValue;

  protected readonly phase = signal<Phase>('setup');
  /** Resets to all topics whenever the technology changes. */
  protected readonly topic = linkedSignal(() => (this.progress.track(), 'all'));
  protected readonly count = signal(10);
  protected readonly questions = signal<QuizQuestion[]>([]);
  protected readonly answers = signal<number[]>([]);
  protected readonly index = signal(0);

  protected readonly pool = computed(() =>
    this.content.quiz().filter((q) => this.topic() === 'all' || q.topic === this.topic()),
  );
  protected readonly quizSize = computed(() => Math.min(this.count() || Infinity, this.pool().length));
  protected readonly current = computed(() => this.questions()[this.index()]);
  protected readonly selected = computed<number | undefined>(() => this.answers()[this.index()]);
  protected readonly isLast = computed(() => this.index() === this.questions().length - 1);
  protected readonly score = computed(
    () => this.answers().filter((a, i) => a === this.questions()[i]?.correct).length,
  );
  protected readonly pct = computed(() =>
    this.questions().length ? Math.round((this.score() / this.questions().length) * 100) : 0,
  );
  protected readonly mistakes = computed(() =>
    this.questions()
      .map((q, i) => ({ q, chosen: this.answers()[i] ?? -1 }))
      .filter(({ q, chosen }) => chosen !== q.correct),
  );

  protected start(): void {
    const picked = shuffle(this.pool()).slice(0, this.quizSize()).map(shuffleOptions);
    this.questions.set(picked);
    this.answers.set([]);
    this.index.set(0);
    this.phase.set('play');
  }

  protected choose(option: number): void {
    if (this.selected() !== undefined) return;
    this.answers.update((a) => {
      const next = [...a];
      next[this.index()] = option;
      return next;
    });
  }

  protected next(): void {
    if (!this.isLast()) {
      this.index.update((i) => i + 1);
      return;
    }
    this.progress.addQuizResult({
      date: new Date().toISOString(),
      topic: this.topic(),
      track: this.progress.track(),
      experience: this.progress.experience(),
      score: this.score(),
      total: this.questions().length,
    });
    this.phase.set('result');
  }

  protected levelName(exp: Experience | null | undefined): string {
    return exp ? EXPERIENCE_MAP[exp].label : 'All levels';
  }

  protected topicName(id: string, track?: Track): string {
    if (id !== 'all') return TOPIC_MAP[id]?.title ?? id;
    return 'All ' + (track ? TRACK_MAP[track].title : 'Angular') + ' topics';
  }
}
