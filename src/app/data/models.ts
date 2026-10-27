export type Difficulty = 'easy' | 'medium' | 'hard';

/** Experience band a question is typically asked at. */
export type Experience = 'fresher' | 'junior' | 'mid' | 'senior';

/** Languages offered for the simple explanation box. */
export type Lang = 'hi' | 'en' | 'bn';
export type LocalizedText = Record<Lang, string>;

/** Visual explanations rendered by the Diagram component. */
export type DiagramId =
  | 'data-binding'
  | 'spa-bootstrap'
  | 'lifecycle'
  | 'communication'
  | 'di-hierarchy'
  | 'change-detection'
  | 'signals'
  | 'flattening'
  | 'interceptors'
  | 'lazy-loading'
  | 'event-loop'
  | 'prototype-chain'
  | 'event-bubbling'
  | 'box-model'
  | 'flexbox'
  | 'specificity';

export type Track =
  | 'angular'
  | 'react'
  | 'javascript'
  | 'web'
  | 'dotnet'
  | 'java'
  | 'python'
  | 'php';

export interface Topic {
  id: string;
  track: Track;
  title: string;
  /** Two-letter monogram shown on the topic tile. */
  short: string;
  description: string;
}

export interface Question {
  id: string;
  topic: string;
  level: Experience;
  difficulty: Difficulty;
  question: string;
  answer: string;
  /** Plain-language explanation with a real-life analogy, per language. */
  simple?: LocalizedText;
  diagram?: DiagramId;
  points?: string[];
  code?: string;
  /** Set for questions transcribed from the user's handwritten notes. */
  source?: 'notes';
  /** Question number as written in the notes. */
  noteNo?: number;
  /** PDF page the question starts on (numbering restarts inside the notes). */
  notePage?: number;
  /** Fix for a note that is wrong or outdated for current Angular. */
  correction?: string;
  /** Handwritten-note versions of this same question, merged in from the notes. */
  fromNotes?: Question[];
}

export interface QuizQuestion {
  id: string;
  topic: string;
  level: Experience;
  question: string;
  options: string[];
  /** Index into `options`. */
  correct: number;
  explanation: string;
}

/** Everything one technology track ships, loaded lazily per track. */
export interface TrackData {
  questions: Question[];
  quiz: QuizQuestion[];
}
