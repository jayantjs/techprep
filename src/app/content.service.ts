import { Injectable, computed, inject, resource } from '@angular/core';
import { matchesExperience } from './data/experience';
import { TRACK_LOADERS } from './data/track-loader';
import { ProgressService } from './progress.service';

/**
 * Question bank for the chosen technology, filtered by experience level. Each
 * technology is a separate lazily loaded chunk, so the always-loaded shell and
 * the header never pull in question data.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly progress = inject(ProgressService);

  private readonly data = resource({
    params: () => this.progress.track(),
    loader: ({ params }) => TRACK_LOADERS[params](),
  });

  readonly loading = computed(() => this.data.isLoading());
  /** Every question of the current technology, regardless of level. */
  readonly allQuestions = computed(() => this.data.value()?.questions ?? []);

  /** Questions and quiz items for the chosen experience level (cumulative). */
  readonly questions = computed(() =>
    this.allQuestions().filter((q) => matchesExperience(q.level, this.progress.experience())),
  );
  /** Every MCQ of the current technology, regardless of level (KBC climbs through all of them). */
  readonly allQuiz = computed(() => this.data.value()?.quiz ?? []);
  readonly quiz = computed(() =>
    this.allQuiz().filter((q) =>
      matchesExperience(q.level, this.progress.experience()),
    ),
  );
}
