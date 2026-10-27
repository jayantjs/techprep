import { NOTE_MERGES } from '../notes-merge';
import { QuizQuestion, Question, Track, TrackData } from '../models';
import { TOPIC_MAP } from '../topics';

/** Keeps only the items whose topic belongs to `track` (shared sources mix tracks). */
export function pick(track: Track, questions: Question[][], quiz: QuizQuestion[][]): TrackData {
  const inTrack = (x: { topic: string }) => TOPIC_MAP[x.topic]?.track === track;
  return { questions: mergeNotes(questions.flat().filter(inTrack)), quiz: quiz.flat().filter(inTrack) };
}

/** Folds handwritten notes that duplicate a bank question into that question. */
function mergeNotes(questions: Question[]): Question[] {
  const ids = new Set(questions.map((q) => q.id));
  const merged = new Map<string, Question[]>();
  const kept: Question[] = [];
  for (const q of questions) {
    const target = NOTE_MERGES[q.id];
    if (target && ids.has(target)) merged.set(target, [...(merged.get(target) ?? []), q]);
    else kept.push(q);
  }
  return kept.map((q) => (merged.has(q.id) ? { ...q, fromNotes: merged.get(q.id) } : q));
}
