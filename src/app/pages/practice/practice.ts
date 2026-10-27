import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { Difficulty } from '../../data/models';
import { topicsOf } from '../../data/topics';
import { ContentService } from '../../content.service';
import { ProgressService } from '../../progress.service';
import { QuestionCard } from '../../shared/question-card/question-card';
import { inputValue } from '../../shared/utils';

type StatusFilter = 'all' | 'new' | 'known' | 'review' | 'saved';

@Component({
  selector: 'app-practice',
  imports: [QuestionCard],
  templateUrl: './practice.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Practice {
  private readonly progress = inject(ProgressService);
  private readonly content = inject(ContentService);
  protected readonly topics = computed(() => topicsOf(this.progress.track()));
  protected readonly inputValue = inputValue;
  protected readonly statusFilters: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'new', label: 'Not started' },
    { value: 'review', label: 'To revise' },
    { value: 'known', label: 'Known' },
    { value: 'saved', label: '★ Saved' },
  ];

  protected readonly search = signal('');
  /** Resets to all topics whenever the technology changes. */
  protected readonly topic = linkedSignal(() => (this.progress.track(), 'all'));
  protected readonly difficulty = signal<Difficulty | 'all'>('all');
  protected readonly statusFilter = signal<StatusFilter>('all');

  protected readonly results = computed(() => {
    const term = this.search().trim().toLowerCase();
    const topic = this.topic();
    const level = this.difficulty();
    const filter = this.statusFilter();
    const status = this.progress.status();
    const saved = this.progress.bookmarks();

    return this.content.questions().filter((q) => {
      if (topic !== 'all' && q.topic !== topic) return false;
      if (level !== 'all' && q.difficulty !== level) return false;
      if (filter === 'new' && status[q.id]) return false;
      if ((filter === 'known' || filter === 'review') && status[q.id] !== filter) return false;
      if (filter === 'saved' && !saved.includes(q.id)) return false;
      if (!term) return true;
      return [q.question, q.answer, ...(q.points ?? [])].some((s) => s.toLowerCase().includes(term));
    });
  });

  protected clear(): void {
    this.search.set('');
    this.topic.set('all');
    this.difficulty.set('all');
    this.statusFilter.set('all');
  }
}
