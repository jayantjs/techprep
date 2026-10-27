import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../content.service';
import { Experience, QuizQuestion } from '../../data/models';
import { TOPIC_MAP, TRACK_MAP } from '../../data/topics';
import { ProgressService } from '../../progress.service';
import { shuffle, shuffleOptions } from '../../shared/utils';

/** The classic 15-step KBC prize ladder (₹). */
const LADDER = [
  1_000, 2_000, 3_000, 5_000, 10_000, 20_000, 40_000, 80_000, 1_60_000, 3_20_000, 6_40_000, 12_50_000,
  25_00_000, 50_00_000, 1_00_00_000,
];
/** Safe havens — once crossed, a wrong answer still pays this much. */
const MILESTONES = new Set([10_000, 3_20_000]);
const LEVEL_RANK: Record<Experience, number> = { fresher: 0, junior: 1, mid: 2, senior: 3 };

type Phase = 'intro' | 'question' | 'locked' | 'correct' | 'over';
type Outcome = 'won' | 'wrong' | 'timeout' | 'quit';
type Lifeline = 'fifty' | 'audience' | 'expert' | 'flip';

const rupees = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

@Component({
  selector: 'app-kbc',
  imports: [RouterLink],
  templateUrl: './kbc.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Kbc {
  protected readonly progress = inject(ProgressService);
  private readonly content = inject(ContentService);
  protected readonly letters = 'ABCD';
  protected readonly topicMap = TOPIC_MAP;

  protected readonly track = computed(() => TRACK_MAP[this.progress.track()]);
  protected readonly poolSize = computed(() => this.content.allQuiz().length);
  protected readonly gameSize = computed(() => Math.min(LADDER.length, this.poolSize()));
  protected readonly best = computed(() => this.progress.kbcBest()[this.progress.track()] ?? 0);
  protected readonly lifelineInfo: { id: Lifeline; icon: string; label: string }[] = [
    { id: 'fifty', icon: '50:50', label: 'Removes two wrong answers' },
    { id: 'audience', icon: '👥', label: 'Audience poll' },
    { id: 'expert', icon: '🎓', label: 'Ask the expert' },
    { id: 'flip', icon: '🔄', label: 'Flip the question' },
  ];

  protected readonly phase = signal<Phase>('intro');
  protected readonly ladder = signal<number[]>(LADDER);
  protected readonly questions = signal<QuizQuestion[]>([]);
  private reserve: QuizQuestion[] = [];
  protected readonly index = signal(0);
  protected readonly selected = signal<number | null>(null);
  protected readonly removed = signal<number[]>([]);
  protected readonly poll = signal<number[] | null>(null);
  protected readonly expert = signal<{ option: number; sure: boolean } | null>(null);
  protected readonly used = signal<Record<Lifeline, boolean>>(this.freshLifelines());
  protected readonly outcome = signal<Outcome | null>(null);
  protected readonly timeLeft = signal(0);

  protected readonly current = computed(() => this.questions()[this.index()]);
  /** Position on the full 15-step ladder — drives timers and difficulty of the lifelines. */
  private readonly step = computed(() => LADDER.length - this.ladder().length + this.index());
  protected readonly timeLimit = computed(() => (this.step() < 5 ? 45 : this.step() < 10 ? 60 : 0));
  protected readonly playingFor = computed(() => this.ladder()[this.index()] ?? 0);
  protected readonly banked = computed(() => this.ladder()[this.index() - 1] ?? 0);
  protected readonly safeAmount = computed(() =>
    this.ladder()
      .slice(0, this.index())
      .filter((p) => MILESTONES.has(p))
      .reduce((a, b) => Math.max(a, b), 0),
  );
  protected readonly winnings = computed(() => {
    switch (this.outcome()) {
      case 'won':
        return this.ladder()[this.ladder().length - 1];
      case 'quit':
        return this.banked();
      case 'wrong':
      case 'timeout':
        return this.safeAmount();
      default:
        return 0;
    }
  });
  /** Ladder shown top-down like on TV. */
  protected readonly ladderView = computed(() =>
    this.ladder()
      .map((amount, i) => ({ amount, i, milestone: MILESTONES.has(amount) }))
      .reverse(),
  );
  protected readonly isMilestone = computed(() => MILESTONES.has(this.playingFor()));

  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    const tick = setInterval(() => this.tick(), 1000);
    inject(DestroyRef).onDestroy(() => {
      clearInterval(tick);
      this.timers.forEach(clearTimeout);
    });
  }

  protected rupees(amount: number): string {
    return amount === 1_00_00_000 ? '₹1 Crore' : rupees.format(amount);
  }

  protected start(): void {
    const pool = shuffle(this.content.allQuiz());
    const count = Math.min(LADDER.length, pool.length);
    // Easy first: order the picked questions by experience level, random within a level.
    const picked = pool
      .slice(0, count)
      .sort((a, b) => LEVEL_RANK[a.level] - LEVEL_RANK[b.level])
      .map(shuffleOptions);
    this.reserve = pool.slice(count);
    // With fewer questions, keep the top of the ladder so the final question is still ₹1 Crore.
    this.ladder.set(LADDER.slice(LADDER.length - count));
    this.questions.set(picked);
    this.used.set(this.freshLifelines());
    this.outcome.set(null);
    this.show(0);
  }

  protected choose(option: number): void {
    if (this.phase() !== 'question' || this.removed().includes(option)) return;
    this.selected.set(option);
  }

  /** Lock the answer — a short pause for suspense, then the reveal. */
  protected lock(): void {
    if (this.phase() !== 'question' || this.selected() === null) return;
    this.phase.set('locked');
    this.later(1600, () => {
      const right = this.selected() === this.current().correct;
      if (!right) return this.end('wrong');
      if (this.index() === this.questions().length - 1) return this.end('won');
      this.phase.set('correct');
    });
  }

  protected next(): void {
    this.show(this.index() + 1);
  }

  protected quit(): void {
    if (this.phase() === 'question') this.end('quit');
  }

  protected useLifeline(id: Lifeline): void {
    if (this.phase() !== 'question' || this.used()[id]) return;
    this.used.update((u) => ({ ...u, [id]: true }));
    const q = this.current();
    const wrong = [0, 1, 2, 3].filter((i) => i !== q.correct && !this.removed().includes(i));

    if (id === 'fifty') {
      const gone = shuffle(wrong).slice(0, 2);
      this.removed.update((r) => [...r, ...gone]);
      if (gone.includes(this.selected() ?? -1)) this.selected.set(null);
    } else if (id === 'audience') {
      this.poll.set(this.audienceVotes(q));
    } else if (id === 'expert') {
      // The expert is very reliable early on and less so near the top of the ladder.
      const right = Math.random() < (this.step() < 10 ? 0.92 : 0.75);
      const option = right || !wrong.length ? q.correct : shuffle(wrong)[0];
      this.expert.set({ option, sure: Math.random() < (this.step() < 10 ? 0.8 : 0.45) });
    } else if (id === 'flip') {
      const target = LEVEL_RANK[q.level];
      const i = this.reserve.findIndex((r) => LEVEL_RANK[r.level] >= target);
      const [replacement] = this.reserve.splice(i >= 0 ? i : 0, 1);
      if (replacement) {
        this.questions.update((qs) => qs.map((x, n) => (n === this.index() ? shuffleOptions(replacement) : x)));
        this.resetQuestionState();
      }
    }
  }

  protected optionState(i: number): string {
    const q = this.current();
    const phase = this.phase();
    if (this.removed().includes(i)) return 'removed';
    if (phase === 'locked') return this.selected() === i ? 'locked' : '';
    if (phase === 'correct' || phase === 'over') {
      if (i === q.correct) return 'correct';
      if (i === this.selected()) return 'wrong';
      return '';
    }
    return this.selected() === i ? 'selected' : '';
  }

  private show(index: number): void {
    this.index.set(index);
    this.resetQuestionState();
    this.phase.set('question');
  }

  private resetQuestionState(): void {
    this.selected.set(null);
    this.removed.set([]);
    this.poll.set(null);
    this.expert.set(null);
    this.timeLeft.set(this.timeLimit());
  }

  private end(outcome: Outcome): void {
    this.outcome.set(outcome);
    this.phase.set('over');
    this.progress.recordKbc(this.progress.track(), this.winnings());
  }

  private tick(): void {
    if (this.phase() !== 'question' || !this.timeLimit()) return;
    this.timeLeft.update((t) => t - 1);
    if (this.timeLeft() <= 0) this.end('timeout');
  }

  /** Simulated audience: confident on easy steps, split on hard ones. */
  private audienceVotes(q: QuizQuestion): number[] {
    const visible = [0, 1, 2, 3].filter((i) => !this.removed().includes(i));
    const base = this.step() < 5 ? 70 : this.step() < 10 ? 52 : 38;
    const correctShare = base + Math.floor(Math.random() * 15);
    const others = visible.filter((i) => i !== q.correct);
    const weights = others.map(() => Math.random() + 0.2);
    const total = weights.reduce((a, b) => a + b, 0);
    const votes = [0, 0, 0, 0];
    votes[q.correct] = correctShare;
    let left = 100 - correctShare;
    others.forEach((i, n) => {
      const share = n === others.length - 1 ? left : Math.round(((100 - correctShare) * weights[n]) / total);
      votes[i] = share;
      left -= share;
    });
    return votes;
  }

  private freshLifelines(): Record<Lifeline, boolean> {
    return { fifty: false, audience: false, expert: false, flip: false };
  }

  private later(ms: number, fn: () => void): void {
    this.timers.push(setTimeout(fn, ms));
  }
}
