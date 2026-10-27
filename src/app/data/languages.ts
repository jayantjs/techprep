import { Lang } from './models';

export interface Language {
  id: Lang;
  /** Name in its own script, shown in the picker. */
  label: string;
  /** Heading of the simple explanation box. */
  boxTitle: string;
  /** BCP 47 tag for the lang attribute (fonts, screen readers). */
  htmlLang: string;
}

export const LANGUAGES: Language[] = [
  { id: 'hi', label: 'हिन्दी', boxTitle: 'Aasaan bhasha mein', htmlLang: 'hi-Latn' },
  { id: 'en', label: 'English', boxTitle: 'In simple words', htmlLang: 'en' },
  { id: 'bn', label: 'বাংলা', boxTitle: 'সহজ ভাষায়', htmlLang: 'bn' },
];

export const LANGUAGE_MAP = Object.fromEntries(LANGUAGES.map((l) => [l.id, l])) as Record<
  Lang,
  Language
>;
