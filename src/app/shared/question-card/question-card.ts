import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { Question } from '../../data/models';
import { TOPIC_MAP } from '../../data/topics';
import { EXPERIENCE_MAP } from '../../data/experience';
import { ProgressService } from '../../progress.service';
import { Answer } from '../answer/answer';

@Component({
  selector: 'app-question-card',
  imports: [Answer],
  templateUrl: './question-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionCard {
  readonly question = input.required<Question>();
  readonly showTopic = input(false);

  protected readonly progress = inject(ProgressService);
  protected readonly open = signal(false);
  protected readonly topic = computed(() => TOPIC_MAP[this.question().topic]);
  protected readonly level = computed(() => EXPERIENCE_MAP[this.question().level]);
  protected readonly status = computed(() => this.progress.status()[this.question().id]);
  protected readonly bookmarked = computed(() =>
    this.progress.bookmarks().includes(this.question().id),
  );
}
