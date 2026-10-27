import { Topic, Track } from './models';

export const TOPICS: Topic[] = [
  { track: 'angular', id: 'fundamentals', title: 'Fundamentals', short: 'Fu', description: 'Components, data binding, standalone, AOT & Ivy.' },
  { track: 'angular', id: 'templates', title: 'Templates & Directives', short: 'Td', description: 'Control flow, directives, pipes, content projection.' },
  { track: 'angular', id: 'lifecycle', title: 'Lifecycle Hooks', short: 'Lh', description: 'Hook order, cleanup, common lifecycle errors.' },
  { track: 'angular', id: 'communication', title: 'Component Communication', short: 'Cc', description: 'input(), output(), model(), queries, shared services.' },
  { track: 'angular', id: 'di', title: 'Dependency Injection', short: 'Di', description: 'Injectors, providers, tokens, resolution modifiers.' },
  { track: 'angular', id: 'change-detection', title: 'Change Detection', short: 'Cd', description: 'Default vs OnPush, Zone.js vs zoneless.' },
  { track: 'angular', id: 'signals', title: 'Signals', short: 'Si', description: 'signal, computed, effect, linkedSignal, resource.' },
  { track: 'angular', id: 'rxjs', title: 'RxJS', short: 'Rx', description: 'Observables, subjects, flattening operators, leaks.' },
  { track: 'angular', id: 'routing', title: 'Routing', short: 'Ro', description: 'Lazy loading, guards, resolvers, route params.' },
  { track: 'angular', id: 'forms', title: 'Forms', short: 'Fo', description: 'Reactive vs template-driven, validators, CVA.' },
  { track: 'angular', id: 'http', title: 'HTTP', short: 'Ht', description: 'HttpClient, interceptors, error handling.' },
  { track: 'angular', id: 'performance', title: 'Performance & SSR', short: 'Pe', description: '@defer, lazy loading, SSR and hydration.' },
  { track: 'angular', id: 'testing', title: 'Testing', short: 'Te', description: 'TestBed, mocking, HttpTestingController.' },
  { track: 'angular', id: 'architecture', title: 'Architecture & Advanced', short: 'Ar', description: 'State management, dynamic components, what is new.' },
  { track: 'angular', id: 'scenarios', title: 'Real-world Scenarios', short: 'Sc', description: 'Bugs and situations from real projects — what would you do?' },
  { track: 'angular', id: 'coding', title: 'Coding Challenges', short: '</>', description: 'Machine-coding tasks with complete, explained solutions.' },
  { track: 'javascript', id: 'js-basics', title: 'JS Basics & Types', short: 'Jb', description: 'Types, coercion, scope, hoisting, var / let / const.' },
  { track: 'javascript', id: 'js-functions', title: 'Functions & Closures', short: 'Jf', description: 'Closures, this, call / apply / bind, currying.' },
  { track: 'javascript', id: 'js-objects', title: 'Objects & Prototypes', short: 'Jo', description: 'Prototype chain, classes, inheritance, Proxy.' },
  { track: 'javascript', id: 'js-async', title: 'Async JS & Event Loop', short: 'Ja', description: 'Event loop, promises, async / await, workers.' },
  { track: 'javascript', id: 'js-es6', title: 'ES6+ & Arrays', short: 'Je', description: 'Destructuring, spread, Map / Set, modules, array methods.' },
  { track: 'javascript', id: 'js-dom', title: 'Browser & DOM', short: 'Jd', description: 'Events, storage, rendering, CORS, security.' },
  { track: 'javascript', id: 'js-coding', title: 'JS Coding & Output', short: '{}', description: 'Polyfills, debounce / throttle, output puzzles.' },
  { track: 'web', id: 'html', title: 'HTML', short: 'Hm', description: 'Semantic tags, forms, accessibility, SEO, responsive images.' },
  { track: 'web', id: 'css-basics', title: 'CSS Basics & Selectors', short: 'Cb', description: 'Box model, specificity, cascade, units, variables.' },
  { track: 'web', id: 'css-layout', title: 'CSS Layout', short: 'Cl', description: 'Position, z-index, Flexbox, Grid, centering.' },
  { track: 'web', id: 'css-advanced', title: 'Responsive & Modern CSS', short: 'Ca', description: 'Media / container queries, animations, performance, @layer.' },
  { track: 'react', id: 'react-basics', title: 'React Basics & JSX', short: 'Rb', description: 'Components, JSX, props vs state, lists & keys, forms.' },
  { track: 'react', id: 'react-hooks', title: 'Hooks', short: 'Rh', description: 'useState, useEffect, useMemo, useCallback, custom hooks, React 19 hooks.' },
  { track: 'react', id: 'react-state', title: 'State & Routing', short: 'Rs', description: 'Context, Redux Toolkit, Zustand, TanStack Query, React Router.' },
  { track: 'react', id: 'react-advanced', title: 'Performance & Advanced', short: 'Ra', description: 'Reconciliation, memo, Suspense, Server Components, Next.js.' },
  { track: 'react', id: 'react-coding', title: 'React Coding & Scenarios', short: '</>', description: 'Machine-coding tasks with full solutions.' },
  { track: 'dotnet', id: 'cs-basics', title: 'C# Fundamentals', short: 'C#', description: 'Types, classes vs structs vs records, generics, delegates, LINQ.' },
  { track: 'dotnet', id: 'aspnet', title: 'ASP.NET Core', short: 'An', description: 'Middleware, DI lifetimes, minimal APIs, auth, configuration.' },
  { track: 'dotnet', id: 'efcore', title: 'Entity Framework Core', short: 'Ef', description: 'DbContext, migrations, tracking, loading strategies, N+1.' },
  { track: 'dotnet', id: 'dotnet-advanced', title: 'Advanced .NET', short: 'Dn', description: 'GC, async internals, SOLID, patterns, testing, AOT.' },
  { track: 'java', id: 'java-core', title: 'Core Java & OOP', short: 'Jv', description: 'JVM, OOP, String, equals / hashCode, exceptions, records.' },
  { track: 'java', id: 'java-collections', title: 'Collections & Streams', short: 'Jl', description: 'HashMap internals, List vs Set, Comparator, Streams, Optional.' },
  { track: 'java', id: 'java-concurrency', title: 'Multithreading & JVM', short: 'Jt', description: 'Threads, synchronized, volatile, executors, virtual threads, GC.' },
  { track: 'java', id: 'spring', title: 'Spring Boot', short: 'Sp', description: 'IoC, beans, REST, JPA / Hibernate, @Transactional, security.' },
  { track: 'python', id: 'py-basics', title: 'Python Basics', short: 'Py', description: 'Data types, mutability, comprehensions, scope, exceptions.' },
  { track: 'python', id: 'py-advanced', title: 'Advanced Python', short: 'Pa', description: 'Decorators, generators, GIL, asyncio, OOP, dunder methods.' },
  { track: 'python', id: 'py-web', title: 'Django, Flask & FastAPI', short: 'Pw', description: 'ORM, DRF, middleware, Pydantic, WSGI vs ASGI, Celery.' },
  { track: 'python', id: 'py-coding', title: 'Python Coding', short: '</>', description: 'Classic coding problems solved the Pythonic way.' },
  { track: 'php', id: 'php-core', title: 'PHP Fundamentals', short: 'Php', description: 'Types, arrays, OOP, traits, PHP 8 features, security.' },
  { track: 'php', id: 'laravel', title: 'Laravel', short: 'Lv', description: 'Routing, service container, Eloquent, queues, auth, testing.' },
];

export const TOPIC_MAP: Record<string, Topic> = Object.fromEntries(TOPICS.map((t) => [t.id, t]));

export interface TrackInfo {
  id: Track;
  title: string;
  /** Short label for the tech picker tile. */
  short: string;
}

export const TRACKS: TrackInfo[] = [
  { id: 'angular', title: 'Angular', short: 'Ng' },
  { id: 'react', title: 'React', short: 'Re' },
  { id: 'javascript', title: 'JavaScript', short: 'JS' },
  { id: 'web', title: 'HTML & CSS', short: '</>' },
  { id: 'dotnet', title: '.NET / C#', short: 'C#' },
  { id: 'java', title: 'Java & Spring', short: 'Jv' },
  { id: 'python', title: 'Python', short: 'Py' },
  { id: 'php', title: 'PHP & Laravel', short: 'Php' },
];

export const TRACK_MAP = Object.fromEntries(TRACKS.map((t) => [t.id, t])) as Record<Track, TrackInfo>;

export function topicsOf(track: Track): Topic[] {
  return TOPICS.filter((t) => t.track === track);
}
