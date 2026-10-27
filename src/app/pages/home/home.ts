import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EXPERIENCE_LEVELS, EXPERIENCE_MAP, matchesExperience } from '../../data/experience';
import { Experience } from '../../data/models';
import { TRACKS, TRACK_MAP, topicsOf } from '../../data/topics';
import { ContentService } from '../../content.service';
import { ProgressService } from '../../progress.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Home {
  protected readonly progress = inject(ProgressService);
  private readonly content = inject(ContentService);

  protected readonly tracks = TRACKS.map((t) => ({ ...t, topicCount: topicsOf(t.id).length }));
  protected readonly track = computed(() => TRACK_MAP[this.progress.track()]);
  protected readonly loading = this.content.loading;

  protected readonly levels = computed(() => {
    const all = this.content.allQuestions();
    return EXPERIENCE_LEVELS.map((level) => ({
      ...level,
      count: all.filter((q) => matchesExperience(q.level, level.id)).length,
    }));
  });
  protected readonly allCount = computed(() => this.content.allQuestions().length);
  protected readonly selected = computed(() => {
    const exp = this.progress.experience();
    return exp ? EXPERIENCE_MAP[exp] : null;
  });

  protected readonly total = computed(() => this.content.questions().length);
  protected readonly quizCount = computed(() => this.content.quiz().length);
  protected readonly known = computed(() => this.countWith('known'));
  protected readonly review = computed(() => this.countWith('review'));
  protected readonly pct = computed(() =>
    this.total() ? Math.round((this.known() / this.total()) * 100) : 0,
  );

  protected readonly topics = computed(() => {
    const status = this.progress.status();
    const questions = this.content.questions();
    return topicsOf(this.progress.track())
      .map((topic) => {
        const inTopic = questions.filter((q) => q.topic === topic.id);
        const known = inTopic.filter((q) => status[q.id] === 'known').length;
        return {
          ...topic,
          count: inTopic.length,
          known,
          pct: inTopic.length ? Math.round((known / inTopic.length) * 100) : 0,
        };
      })
      .filter((t) => t.count > 0);
  });

  protected choose(level: Experience | null): void {
    this.progress.experience.set(level);
  }

  protected resetProgress(): void {
    if (confirm('Reset all progress, bookmarks and quiz history?')) this.progress.reset();
  }

  private countWith(value: 'known' | 'review'): number {
    const status = this.progress.status();
    return this.content.questions().filter((q) => status[q.id] === value).length;
  }
}
