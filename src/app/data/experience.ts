import { Experience } from './models';

export interface ExperienceLevel {
  id: Experience;
  label: string;
  years: string;
  focus: string;
}

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  {
    id: 'fresher',
    label: 'Fresher',
    years: '0–1 yr',
    focus: 'Core concepts and syntax — the basics every interview starts with.',
  },
  {
    id: 'junior',
    label: 'Junior',
    years: '1–3 yrs',
    focus: 'Day-to-day framework features, common patterns, debugging and testing.',
  },
  {
    id: 'mid',
    label: 'Mid-level',
    years: '3–5 yrs',
    focus: 'Internals, performance, real-world scenarios and design trade-offs.',
  },
  {
    id: 'senior',
    label: 'Senior / Lead',
    years: '5+ yrs',
    focus: 'Architecture, scalability, security, migrations and leading teams.',
  },
];

export const EXPERIENCE_MAP: Record<Experience, ExperienceLevel> = Object.fromEntries(
  EXPERIENCE_LEVELS.map((l) => [l.id, l]),
) as Record<Experience, ExperienceLevel>;

const RANK: Record<Experience, number> = { fresher: 0, junior: 1, mid: 2, senior: 3 };

/**
 * Interviews for a level also cover everything below it, so a level includes
 * all questions up to and including that level. `null` means "all levels".
 */
export function matchesExperience(level: Experience, selected: Experience | null): boolean {
  return selected === null || RANK[level] <= RANK[selected];
}
