import { Track, TrackData } from './models';

/** One lazily loaded chunk per technology, so users only download what they study. */
export const TRACK_LOADERS: Record<Track, () => Promise<TrackData>> = {
  angular: () => import('./tracks/angular').then((m) => m.default),
  react: () => import('./tracks/react').then((m) => m.default),
  javascript: () => import('./tracks/javascript').then((m) => m.default),
  web: () => import('./tracks/web').then((m) => m.default),
  dotnet: () => import('./tracks/dotnet').then((m) => m.default),
  java: () => import('./tracks/java').then((m) => m.default),
  python: () => import('./tracks/python').then((m) => m.default),
  php: () => import('./tracks/php').then((m) => m.default),
};
