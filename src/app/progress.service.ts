import { Injectable, computed, effect, signal } from '@angular/core';
import { Experience, Lang, Track } from './data/models';
import { NOTE_MERGES } from './data/notes-merge';

export type Status = 'known' | 'review';

export interface QuizResult {
  date: string;
  topic: string;
  track?: Track;
  experience?: Experience | null;
  score: number;
  total: number;
}

export interface MockResult {
  date: string;
  track: Track;
  /** Topic id, or 'all' for a full round. */
  topic: string;
  questions: number;
  pct: number;
}

interface SavedProgress {
  /** null = not chosen yet / all levels. */
  experience: Experience | null;
  /** Language of the simple explanation box. */
  lang: Lang;
  /** Technology being studied. */
  track: Track;
  status: Record<string, Status>;
  bookmarks: string[];
  quizHistory: QuizResult[];
  mockHistory: MockResult[];
  /** Best KBC winnings (₹) per technology. */
  kbcBest: Partial<Record<Track, number>>;
}

const STORAGE_KEY = 'ng-interview-prep:v1';
const MAX_HISTORY = 20;

/** Learning progress and user preferences (technology, level, language), persisted to localStorage. */
@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly saved = load();

  readonly experience = signal<Experience | null>(this.saved.experience);
  readonly lang = signal<Lang>(this.saved.lang);
  readonly track = signal<Track>(this.saved.track);
  readonly status = signal<Record<string, Status>>(this.saved.status);
  readonly bookmarks = signal<string[]>(this.saved.bookmarks);
  readonly quizHistory = signal<QuizResult[]>(this.saved.quizHistory);
  readonly mockHistory = signal<MockResult[]>(this.saved.mockHistory);
  readonly kbcBest = signal<Partial<Record<Track, number>>>(this.saved.kbcBest);

  readonly bestQuizPct = computed(() =>
    this.quizHistory().reduce((best, r) => Math.max(best, Math.round((r.score / r.total) * 100)), 0),
  );

  constructor() {
    effect(() => {
      const data: SavedProgress = {
        experience: this.experience(),
        lang: this.lang(),
        track: this.track(),
        status: this.status(),
        bookmarks: this.bookmarks(),
        quizHistory: this.quizHistory(),
        mockHistory: this.mockHistory(),
        kbcBest: this.kbcBest(),
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // Storage unavailable (private mode / quota) — progress stays in memory.
      }
    });
  }

  setStatus(id: string, status: Status): void {
    this.status.update((s) => ({ ...s, [id]: status }));
  }

  /** Sets the status, or clears it when it is already set to the same value. */
  toggleStatus(id: string, status: Status): void {
    this.status.update((s) => {
      const next = { ...s };
      if (next[id] === status) delete next[id];
      else next[id] = status;
      return next;
    });
  }

  toggleBookmark(id: string): void {
    this.bookmarks.update((b) => (b.includes(id) ? b.filter((x) => x !== id) : [...b, id]));
  }

  addQuizResult(result: QuizResult): void {
    this.quizHistory.update((h) => [result, ...h].slice(0, MAX_HISTORY));
  }

  addMockResult(result: MockResult): void {
    this.mockHistory.update((h) => [result, ...h].slice(0, MAX_HISTORY));
  }

  /** Remembers the winnings if they beat the best for this technology. */
  recordKbc(track: Track, amount: number): void {
    this.kbcBest.update((b) => ((b[track] ?? 0) >= amount ? b : { ...b, [track]: amount }));
  }

  /** Clears learning progress; the chosen technology, level and language are kept. */
  reset(): void {
    this.status.set({});
    this.bookmarks.set([]);
    this.quizHistory.set([]);
    this.mockHistory.set([]);
    this.kbcBest.set({});
  }
}

/** Moves status and bookmarks of merged note questions onto the bank question they joined. */
function migrateMergedNotes(saved: SavedProgress): SavedProgress {
  const status = { ...saved.status };
  for (const [from, to] of Object.entries(NOTE_MERGES)) {
    if (status[from] && !status[to]) status[to] = status[from];
    delete status[from];
  }
  const bookmarks = [...new Set(saved.bookmarks.map((id) => NOTE_MERGES[id] ?? id))];
  return { ...saved, status, bookmarks };
}

function load(): SavedProgress {
  const empty: SavedProgress = { experience: null, lang: 'en', track: 'angular', status: {}, bookmarks: [], quizHistory: [], mockHistory: [], kbcBest: {} };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? migrateMergedNotes({ ...empty, ...JSON.parse(raw) }) : empty;
  } catch {
    return empty;
  }
}
