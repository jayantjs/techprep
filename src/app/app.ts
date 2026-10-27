import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { EXPERIENCE_LEVELS } from './data/experience';
import { LANGUAGES } from './data/languages';
import { TRACKS } from './data/topics';
import { Experience, Lang, Track } from './data/models';
import { ProgressService } from './progress.service';
import { inputValue } from './shared/utils';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
})
export class App {
  protected readonly progress = inject(ProgressService);
  protected readonly levels = EXPERIENCE_LEVELS;
  protected readonly languages = LANGUAGES;
  protected readonly tracks = TRACKS;
  protected readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/practice', label: 'Practice', exact: false },
    { path: '/flashcards', label: 'Flashcards', exact: false },
    { path: '/quiz', label: 'Quiz', exact: false },
    { path: '/mock', label: '🎤 Mock', exact: false },
  ];

  protected setExperience(event: Event): void {
    const value = inputValue(event);
    this.progress.experience.set(value === 'all' ? null : (value as Experience));
  }

  protected setTrack(event: Event): void {
    this.progress.track.set(inputValue(event) as Track);
  }

  protected setLang(event: Event): void {
    this.progress.lang.set(inputValue(event) as Lang);
  }
}
