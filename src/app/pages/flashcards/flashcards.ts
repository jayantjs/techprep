import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
  untracked,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Question } from '../../data/models';
import { TOPIC_MAP, topicsOf } from '../../data/topics';
import { ContentService } from '../../content.service';
import { ProgressService, Status } from '../../progress.service';
import { Answer } from '../../shared/answer/answer';
import { inputValue, shuffle } from '../../shared/utils';

@Component({
  selector: 'app-flashcards',
  imports: [RouterLink, Answer],
  templateUrl: './flashcards.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown)': 'onKey($event)' },
})
export class Flashcards {
  private readonly progress = inject(ProgressService);
  private readonly content = inject(ContentService);
  protected readonly topics = computed(() => topicsOf(this.progress.track()));
  protected readonly topicMap = TOPIC_MAP;
  protected readonly inputValue = inputValue;

  /** Resets to all topics whenever the technology changes. */
  protected readonly topic = linkedSignal(() => (this.progress.track(), 'all'));
  protected readonly onlyUnknown = signal(false);
  protected readonly deck = signal<Question[]>([]);
  protected readonly index = signal(0);
  protected readonly flipped = signal(false);
  protected readonly knewCount = signal(0);

  protected readonly current = computed(() => this.deck()[this.index()]);
  protected readonly done = computed(() => this.deck().length > 0 && this.index() >= this.deck().length);
  protected readonly pct = computed(() =>
    this.deck().length ? Math.round((this.index() / this.deck().length) * 100) : 0,
  );

  constructor() {
    // Rebuild the deck whenever the question set changes: technology, level or data loaded.
    effect(() => {
      this.content.questions();
      untracked(() => this.build());
    });
  }

  protected build(): void {
    const topic = this.topic();
    const status = this.progress.status();
    const cards = this.content.questions().filter(
      (q) =>
        (topic === 'all' || q.topic === topic) && (!this.onlyUnknown() || status[q.id] !== 'known'),
    );
    this.deck.set(shuffle(cards));
    this.index.set(0);
    this.knewCount.set(0);
    this.flipped.set(false);
  }

  protected answer(status?: Status): void {
    const card = this.current();
    if (!card) return;
    if (status) this.progress.setStatus(card.id, status);
    if (status === 'known') this.knewCount.update((n) => n + 1);
    this.flipped.set(false);
    this.index.update((i) => i + 1);
  }

  protected onKey(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    if (!this.current() || target.matches('input, select, textarea, button')) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.flipped.update((f) => !f);
    } else if (event.key === '1' && this.flipped()) {
      this.answer('known');
    } else if (event.key === '2' && this.flipped()) {
      this.answer('review');
    } else if (event.key === 'ArrowRight') {
      this.answer();
    }
  }
}
