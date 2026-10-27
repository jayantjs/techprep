import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Difficulty } from '../../data/models';
import { EXPERIENCE_MAP } from '../../data/experience';
import { TOPIC_MAP, topicsOf } from '../../data/topics';
import { ContentService } from '../../content.service';
import { ProgressService } from '../../progress.service';
import { QuestionCard } from '../../shared/question-card/question-card';

@Component({
  selector: 'app-topic',
  imports: [RouterLink, QuestionCard],
  templateUrl: './topic.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopicDetail {
  /** Bound from the `:id` route param. */
  readonly id = input.required<string>();

  protected readonly progress = inject(ProgressService);
  private readonly content = inject(ContentService);
  protected readonly levels: (Difficulty | 'all')[] = ['all', 'easy', 'medium', 'hard'];
  protected readonly difficulty = signal<Difficulty | 'all'>('all');

  protected readonly topic = computed(() => TOPIC_MAP[this.id()]);
  private readonly siblings = computed(() => {
    const topic = this.topic();
    return topic ? topicsOf(topic.track) : [];
  });
  private readonly index = computed(() => this.siblings().findIndex((t) => t.id === this.id()));
  protected readonly prev = computed(() => this.siblings()[this.index() - 1]);
  protected readonly next = computed(() => this.siblings()[this.index() + 1]);

  private readonly all = computed(() =>
    this.content.questions().filter((q) => q.topic === this.id()),
  );
  protected readonly levelLabel = computed(() => {
    const exp = this.progress.experience();
    return exp ? EXPERIENCE_MAP[exp].label + ' (' + EXPERIENCE_MAP[exp].years + ')' : null;
  });
  protected readonly questions = computed(() => {
    const level = this.difficulty();
    return this.all().filter((q) => level === 'all' || q.difficulty === level);
  });
  protected readonly known = computed(() => {
    const status = this.progress.status();
    return this.all().filter((q) => status[q.id] === 'known').length;
  });
  protected readonly total = computed(() => this.all().length);
  protected readonly loading = this.content.loading;

  constructor() {
    // Opening a topic (e.g. from a shared link) switches to its technology.
    effect(() => {
      const topic = this.topic();
      if (topic && topic.track !== this.progress.track()) this.progress.track.set(topic.track);
    });
  }
}
