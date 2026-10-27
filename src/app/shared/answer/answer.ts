import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { LANGUAGE_MAP } from '../../data/languages';
import { Question } from '../../data/models';
import { ProgressService } from '../../progress.service';
import { Diagram } from '../diagram/diagram';

/** Full explanation of a question: simple version, diagram, interview answer and code. */
@Component({
  selector: 'app-answer',
  imports: [Diagram],
  templateUrl: './answer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Answer {
  readonly question = input.required<Question>();

  private readonly progress = inject(ProgressService);
  protected readonly language = computed(() => LANGUAGE_MAP[this.progress.lang()]);
  protected readonly simple = computed(() => this.question().simple?.[this.progress.lang()]);
}
