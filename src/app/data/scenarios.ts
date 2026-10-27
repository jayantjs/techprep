import { Question } from './models';

/** Real-world "what would you do if…" interview questions. */
export const SCENARIO_QUESTIONS: Question[] = [
  {
    id: 'sc-1',
    level: 'fresher',
    topic: 'scenarios',
    difficulty: 'easy',
    simple: {
      hi: 'Aap gift kholne ki koshish kar rahe ho par courier abhi aaya hi nahi — khaali haath se gift nikaal rahe ho. Pehle check karo "parcel aa gaya?" (@if), tabhi kholo.',
      en: 'You\'re trying to open a gift, but the courier hasn\'t even arrived — you\'re pulling a gift out of empty hands. First check "has the parcel arrived?" (@if), then open it.',
      bn: 'তুমি উপহার খোলার চেষ্টা করছ, কিন্তু কুরিয়ার এখনো আসেইনি — খালি হাত থেকে উপহার বের করছ। আগে দেখো "পার্সেল এসেছে?" (@if), তারপর খোলো।',
    },
    question:
      'Your page crashes with "Cannot read properties of undefined (reading \'name\')" right after it loads. What is happening and how do you fix it?',
    answer:
      'The template reads user.name before the API response has arrived, so user is still undefined during the first render. Render the value only when the data exists.',
    points: [
      'Wrap the block in @if (user(); as u) and show a loading state in @else.',
      'Or use optional chaining: {{ user()?.name }}.',
      'Give signals/toSignal an initialValue so the type and the first render are safe.',
      'Check the real API response shape in the Network tab — often the data is nested (response.data.user).',
    ],
    code: `<!-- ❌ crashes while the user is still loading -->
<h2>{{ user().name }}</h2>

<!-- ✅ render only when the data exists -->
@if (user(); as u) {
  <h2>{{ u.name }}</h2>
} @else {
  <p>Loading…</p>
}`,
  },
  {
    id: 'sc-2',
    level: 'junior',
    topic: 'scenarios',
    difficulty: 'easy',
    simple: {
      hi: 'Aapne waiter se "HttpClient" maanga, par restaurant ke menu (providers) mein wo likha hi nahi. Menu mein add karo — provideHttpClient().',
      en: 'You asked the waiter for "HttpClient", but it isn\'t on the restaurant menu (providers). Add it to the menu — provideHttpClient().',
      bn: 'তুমি ওয়েটারের কাছে "HttpClient" চাইলে, কিন্তু রেস্টুরেন্টের মেনুতে (providers) সেটা লেখাই নেই। মেনুতে যোগ করো — provideHttpClient()।',
    },
    question: 'You see "NullInjectorError: No provider for HttpClient!" in the console. How do you fix it?',
    answer:
      'Angular walked up every injector and none of them provides HttpClient. Register it in the application config with provideHttpClient().',
    points: [
      'For your own services: add @Injectable({ providedIn: "root" }) or list them in providers.',
      'A service provided only on a lazy route is not available outside that route.',
      'In unit tests, provide the dependency (or a mock) in TestBed.configureTestingModule.',
      'Check the import path — importing a class with the same name from the wrong package gives the same error.',
    ],
    code: `// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
};`,
  },
  {
    id: 'sc-3',
    level: 'junior',
    topic: 'scenarios',
    difficulty: 'medium',
    simple: {
      hi: 'Aapne dabbe ke andar naya khilona daal diya, par dabba wahi hai. Angular sirf dabba dekhta hai — "dabba to wahi hai, kuch nahi badla". Naya dabba do (new array), tab Angular samjhega ki kuch naya aaya.',
      en: 'You put a new toy inside the box, but it\'s the same box. Angular only looks at the box — "same box, nothing changed". Give it a new box (new array) and Angular will understand something new arrived.',
      bn: 'তুমি বাক্সের ভেতরে নতুন খেলনা রাখলে, কিন্তু বাক্সটা একই। Angular শুধু বাক্স দেখে — "বাক্স তো একই, কিছু বদলায়নি"। নতুন বাক্স দাও (new array), তবেই Angular বুঝবে নতুন কিছু এসেছে।',
    },
    diagram: 'change-detection',
    question:
      'You add an item with items.push(newItem) but the list on the screen does not update. Why, and how do you fix it?',
    answer:
      'The array is changed in place, so its reference stays the same. OnPush inputs, pure pipes and signals compare by reference, so Angular thinks nothing changed.',
    points: [
      'Create a new array: [...list, newItem] — or filter / map, which also return new arrays.',
      'With signals: items.update(list => [...list, newItem]). Calling set() with the same array does not notify anyone.',
      'Same for objects: { ...user, name: "New" } instead of user.name = "New".',
      'Immutable updates make OnPush and change tracking predictable.',
    ],
    code: `// ❌ same reference — OnPush child / signal does not update
this.items().push(newItem);

// ✅ new reference
this.items.update((list) => [...list, newItem]);`,
  },
  {
    id: 'sc-4',
    level: 'junior',
    topic: 'scenarios',
    difficulty: 'medium',
    simple: {
      hi: 'Lift ka button 5 baar dabane se lift 5 baar nahi aati. Waise hi "Save" ek baar dabaya to jab tak kaam ho raha hai, button band (disabled) kar do.',
      en: 'Pressing the lift button 5 times doesn\'t bring the lift 5 times. Likewise, once "Save" is pressed, switch the button off (disabled) while the work is happening.',
      bn: 'লিফটের বোতাম ৫ বার টিপলে লিফট ৫ বার আসে না। তেমনই "Save" একবার টিপলে, কাজ চলাকালীন বোতামটা বন্ধ (disabled) করে দাও।',
    },
    question: 'A user double-clicks "Place order" and two orders are created. How do you prevent it?',
    answer:
      'Each click starts a new request and nothing blocks a second submit while the first is still running. Block it on the client and make the server safe too.',
    points: [
      'Keep a saving signal: disable the button and ignore clicks while a request is in flight.',
      'RxJS alternative: exhaustMap on the click stream ignores clicks until the request completes.',
      'The backend should be idempotent — send an idempotency key so duplicate requests are rejected.',
      'Show feedback (spinner / "Saving…") so the user does not click again.',
    ],
    code: `saving = signal(false);

save() {
  if (this.saving()) return;
  this.saving.set(true);
  this.api
    .createOrder(this.form.getRawValue())
    .pipe(finalize(() => this.saving.set(false)))
    .subscribe(() => this.router.navigate(['/orders']));
}

<!-- template -->
<button (click)="save()" [disabled]="saving()">
  {{ saving() ? 'Saving…' : 'Place order' }}
</button>`,
  },
  {
    id: 'sc-5',
    level: 'mid',
    topic: 'scenarios',
    difficulty: 'medium',
    simple: {
      hi: 'Aap dukaan wale ko ek-ek letter bol rahe ho — "a"… "an"… "ang"… aur wo har baar godown bhaagta hai. Smart tareeka: jab aap bolna band karo tab jaaye, aur naya word aaye to purani trip cancel kar de.',
      en: 'You\'re telling the shopkeeper one letter at a time — "a"… "an"… "ang"… and he runs to the warehouse every time. The smart way: he goes when you stop talking, and when a new word comes he cancels the old trip.',
      bn: 'তুমি দোকানদারকে একটা একটা অক্ষর বলছ — "a"… "an"… "ang"… আর সে প্রতিবার গুদামে ছুটছে। বুদ্ধিমানের উপায়: তুমি বলা থামালে তবে যাবে, আর নতুন শব্দ এলে পুরনো যাত্রা বাতিল।',
    },
    diagram: 'flattening',
    question:
      'A search box calls the API on every keystroke, the server gets flooded, and sometimes old results replace newer ones. How do you fix it?',
    answer:
      'Treat the input as a stream: wait until typing pauses, skip repeated terms, and cancel requests that are no longer needed.',
    points: [
      'debounceTime(300) — send only after the user stops typing.',
      'distinctUntilChanged() — skip when the term did not change.',
      'switchMap — cancels the previous HTTP request, so a slow old response can never overwrite a newer one.',
      'catchError inside switchMap — one failed request must not kill the whole stream.',
    ],
    code: `results = toSignal(
  this.searchCtrl.valueChanges.pipe(
    debounceTime(300),
    map((term) => term.trim()),
    distinctUntilChanged(),
    switchMap((term) =>
      term.length < 2
        ? of([])
        : this.api.search(term).pipe(catchError(() => of([]))),
    ),
  ),
  { initialValue: [] },
);`,
  },
  {
    id: 'sc-6',
    level: 'mid',
    topic: 'scenarios',
    difficulty: 'hard',
    simple: {
      hi: 'Har baar kamre se nikalte waqt nal khula chhod do to paani bharta jaayega. Page badalte waqt subscriptions band nahi ki to memory bharti jaati hai — app pehle slow hoti hai, phir crash.',
      en: 'If you leave the tap open every time you leave a room, water keeps filling up. If subscriptions aren\'t closed when you change pages, memory keeps filling up — the app slows down first, then crashes.',
      bn: 'প্রতিবার ঘর থেকে বেরোনোর সময় কল খোলা রাখলে জল জমতেই থাকবে। পেজ বদলানোর সময় subscriptions বন্ধ না করলে মেমরি ভরতেই থাকে — অ্যাপ আগে ধীর হয়, তারপর crash।',
    },
    question:
      'Memory usage keeps growing as users navigate between pages, and the app gets slower over time. How do you find and fix the leak?',
    answer:
      'Something keeps destroyed components alive — usually subscriptions to long-lived observables, intervals or global event listeners that were never cleaned up.',
    points: [
      'Reproduce: navigate back and forth, take heap snapshots in Chrome DevTools → Memory, compare them and look for detached components.',
      'Search for subscribe() on interval, valueChanges, router events, websockets and store selects.',
      'Fix with async pipe / toSignal / takeUntilDestroyed().',
      'Remove window/document listeners (use host listeners, or Renderer2.listen and call the returned function on destroy).',
      'Clear setInterval in DestroyRef.onDestroy; call destroy() on third-party widgets (charts, maps).',
    ],
    code: `constructor() {
  // ❌ keeps running after the component is destroyed
  // interval(1000).subscribe(() => this.refresh());

  // ✅ stops automatically on destroy
  interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.refresh());

  const off = inject(Renderer2).listen('window', 'resize', () => this.layout());
  inject(DestroyRef).onDestroy(off);
}`,
  },
  {
    id: 'sc-7',
    level: 'junior',
    topic: 'scenarios',
    difficulty: 'medium',
    simple: {
      hi: 'Jaise Word file band karte waqt poochta hai "Save karna hai?", waise hi page chhodte waqt guard poochta hai "form adhoora hai, sach mein jaana hai?".',
      en: 'Just like Word asks "Do you want to save?" when you close a file, the guard asks "the form is incomplete, do you really want to leave?" when you leave the page.',
      bn: 'যেমন Word ফাইল বন্ধ করার সময় জিজ্ঞেস করে "Save করবে?", তেমনই পেজ ছাড়ার সময় guard জিজ্ঞেস করে "ফর্ম অসম্পূর্ণ, সত্যিই যাবে?"।',
    },
    question:
      'Users complain that they lose a half-filled form when they click another menu link by mistake. What do you do?',
    answer:
      'Add a canDeactivate guard that asks for confirmation when the form has unsaved changes.',
    points: [
      'Router guards do not run on browser refresh or tab close — also add a window:beforeunload listener.',
      'Call form.markAsPristine() after a successful save so the guard stops asking.',
      'Optionally autosave a draft to localStorage.',
    ],
    code: `export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) =>
  !component.hasUnsavedChanges() || confirm('You have unsaved changes. Leave anyway?');

// routes
{ path: 'profile/edit', component: EditProfile, canDeactivate: [unsavedChangesGuard] }

// edit-profile.ts
export class EditProfile implements HasUnsavedChanges {
  form = inject(NonNullableFormBuilder).group({ name: [''] });
  hasUnsavedChanges() {
    return this.form.dirty;
  }
}`,
  },
  {
    id: 'sc-8',
    level: 'mid',
    topic: 'scenarios',
    difficulty: 'hard',
    simple: {
      hi: 'Movie ka ticket (token) beech mein expire ho gaya. Guard aapko bahar nikaalne ki jagah counter se naya ticket le aata hai (refresh) aur aap wapas usi seat par baith jaate ho. Naya ticket bhi na mile, tabhi bahar (logout).',
      en: 'Your movie ticket (token) expired in the middle of the film. Instead of throwing you out, the guard gets a new ticket from the counter (refresh) and you sit back in the same seat. Only if no new ticket can be had do you go out (logout).',
      bn: 'সিনেমার মাঝখানে তোমার টিকিট (token) মেয়াদ পেরিয়ে গেল। গার্ড তোমাকে বের করে না দিয়ে কাউন্টার থেকে নতুন টিকিট এনে দেয় (refresh) আর তুমি আবার একই সিটে বসো। নতুন টিকিটও না মিললে তবেই বাইরে (logout)।',
    },
    diagram: 'interceptors',
    question:
      'The access token expires while the user is working, and suddenly every API call fails with 401. How do you handle it?',
    answer:
      'Use an interceptor that catches 401, refreshes the token once, and retries the original request. If the refresh fails, log the user out.',
    points: [
      'Parallel requests must share ONE refresh call (shareReplay in AuthService), otherwise /refresh is called many times.',
      'Never intercept the refresh request itself — that causes an infinite loop.',
      'Keep the access token in memory and the refresh token in an httpOnly cookie when possible.',
      'On refresh failure: clear the session and navigate to /login with a returnUrl.',
    ],
    code: `export const refreshInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status !== 401 || req.url.includes('/auth/refresh')) {
        return throwError(() => err);
      }
      // auth.refresh() returns ONE shared observable for parallel calls
      return auth.refresh().pipe(
        switchMap((token) =>
          next(req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })),
        ),
        catchError((refreshErr) => {
          auth.logout();
          router.navigate(['/login']);
          return throwError(() => refreshErr);
        }),
      );
    }),
  );
};`,
  },
  {
    id: 'sc-9',
    level: 'mid',
    topic: 'scenarios',
    difficulty: 'medium',
    simple: {
      hi: 'Teen bachche alag-alag market jaakar doodh laa rahe hain. Ek bachcha laaye aur fridge (cache) mein rakh de — baaki do fridge se le lein.',
      en: 'Three children go to the market separately to buy milk. Let one child bring it and put it in the fridge (cache) — the other two take it from the fridge.',
      bn: 'তিনটে বাচ্চা আলাদা আলাদা বাজারে গিয়ে দুধ আনছে। একজন এনে ফ্রিজে (cache) রেখে দিক — বাকি দুজন ফ্রিজ থেকে নিয়ে নিক।',
    },
    question:
      'Three components on the same page each need the logged-in user, and the Network tab shows /api/me being called three times. How do you fix it?',
    answer:
      'Each component subscribes to its own cold HTTP observable. Put the request in one shared service and cache the result.',
    points: [
      'shareReplay(1) shares one request between all subscribers and replays the result to late ones.',
      'Or store it in a signal / toSignal in a root service, so components just read the signal.',
      'Clear or refresh the cache on logout and after the profile is updated.',
      'Other options: a parent fetches once and passes data down as inputs, or a route resolver.',
    ],
    code: `@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);

  // one request, shared by every subscriber, cached for late subscribers
  readonly profile$ = this.http.get<Profile>('/api/me').pipe(shareReplay(1));
  readonly profile = toSignal(this.profile$);
}`,
  },
  {
    id: 'sc-10',
    level: 'senior',
    topic: 'scenarios',
    difficulty: 'hard',
    simple: {
      hi: 'Aap trip par 10 bag le ja rahe ho, isliye nikalne mein der hoti hai. Pehle dekho kaunsa bag sabse bhaari hai (measure), phir sirf zaroori bag lo (lazy loading), baaki baad mein mangwa lo (@defer).',
      en: 'You\'re taking 10 bags on a trip, so leaving takes ages. First see which bag is heaviest (measure), then take only the essential bags (lazy loading) and have the rest sent later (@defer).',
      bn: 'বেড়াতে ১০টা ব্যাগ নিয়ে যাচ্ছ, তাই বেরোতে দেরি। আগে দেখো কোন ব্যাগ সবচেয়ে ভারী (measure), তারপর শুধু দরকারি ব্যাগ নাও (lazy loading), বাকিটা পরে আনিয়ে নাও (@defer)।',
    },
    diagram: 'lazy-loading',
    question: 'The first load of your Angular app takes 8 seconds on mobile. Walk through how you would fix it.',
    answer:
      'Measure first, then shrink what is downloaded and rendered on the critical path, and make the server deliver it faster.',
    points: [
      'Measure: Lighthouse / PageSpeed, Web Vitals (LCP, INP, CLS), Network tab with 4G throttling.',
      'Find heavy code: ng build --stats-json and a bundle analyzer / source-map-explorer.',
      'Lazy load every feature route; @defer heavy widgets (charts, editors, maps).',
      'Replace heavy libraries (moment → Intl / date-fns, full lodash → native) and remove unused ones.',
      'SSR or prerendering + hydration for a fast first paint.',
      'Images: NgOptimizedImage, WebP/AVIF, priority on the LCP image.',
      'Delivery: brotli/gzip, CDN, long cache for hashed files, preconnect to the API; avoid API waterfalls.',
      'Add bundle budgets in angular.json so CI fails if the bundle grows again.',
    ],
  },
  {
    id: 'sc-11',
    level: 'senior',
    topic: 'scenarios',
    difficulty: 'hard',
    simple: {
      hi: 'Aapke paas mall ka purana map hai jismein "Shop 12" likha hai, par shop shift ho gayi. Map (index.html) ko cache mat hone do, aur galat dukaan mile to naya map le lo (reload).',
      en: 'You have an old mall map that says "Shop 12", but the shop has moved. Don\'t let the map (index.html) be cached, and if you reach the wrong shop, get a new map (reload).',
      bn: 'তোমার কাছে মলের পুরনো ম্যাপ, তাতে লেখা "Shop 12", কিন্তু দোকান সরে গেছে। ম্যাপ (index.html) cache হতে দিও না, আর ভুল দোকানে পৌঁছালে নতুন ম্যাপ নাও (reload)।',
    },
    question:
      'Right after a deployment some users see a blank page or the error "Failed to fetch dynamically imported module". What is the cause and the fix?',
    answer:
      'Those users still have the old index.html cached. It points to old lazy-chunk files that no longer exist on the server, so loading a route fails.',
    points: [
      'Serve index.html with Cache-Control: no-cache; hashed JS/CSS files with a long max-age (immutable).',
      'Keep the previous build\'s chunks on the CDN for some time after deploying.',
      'In a global ErrorHandler, detect chunk-load errors and reload the page once.',
      'With a service worker, use SwUpdate.versionUpdates to show "New version available — reload".',
      'Monitor errors (e.g. Sentry) so you notice it within minutes.',
    ],
    code: `@Injectable()
export class AppErrorHandler implements ErrorHandler {
  handleError(error: unknown) {
    const message = String((error as Error)?.message ?? error);
    const isChunkError = /Failed to fetch dynamically imported module|Loading chunk/.test(message);

    // old index.html refers to deleted chunks — load the new version once
    if (isChunkError && !sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', '1');
      location.reload();
      return;
    }
    console.error(error);
  }
}

// app.config.ts
{ provide: ErrorHandler, useClass: AppErrorHandler }`,
  },
  {
    id: 'sc-12',
    level: 'mid',
    topic: 'scenarios',
    difficulty: 'hard',
    simple: {
      hi: '5000 bachchon ki class mein teacher har baar sabka naam bole to bahut time lagega. Sirf jo bachche saamne dikh rahe hain unka naam bolo (virtual scroll), aur jo badla hi nahi use dobara mat bulao (OnPush, track).',
      en: 'In a class of 5000 children, if the teacher calls out every name each time, it takes forever. Call only the children visible in front (virtual scroll), and don\'t call again the ones who haven\'t changed (OnPush, track).',
      bn: '৫০০০ বাচ্চার ক্লাসে শিক্ষক প্রতিবার সবার নাম ডাকলে অনেক সময় লাগবে। শুধু যারা সামনে দেখা যাচ্ছে তাদের নাম ডাকো (virtual scroll), আর যার কিছু বদলায়নি তাকে আবার ডেকো না (OnPush, track)।',
    },
    diagram: 'change-detection',
    question:
      'A page with a 5,000-row table feels laggy — typing in its filter box freezes the UI. How do you investigate and fix it?',
    answer:
      'Profile to see where time goes, then do less work per change and render fewer DOM nodes.',
    points: [
      'Angular DevTools → Profiler shows which components re-render and how long they take.',
      'Chrome Performance tab shows long tasks on the main thread.',
      'Track by row.id in @for; use OnPush + signals for row components.',
      'Compute the filtered list in computed() (memoized) instead of a method called in the template.',
      'Debounce the filter input.',
      'Render only visible rows: CDK virtual scroll, or pagination.',
      'Move very heavy calculations to a Web Worker.',
    ],
    code: `filter = signal('');
rows = input.required<Row[]>();
visible = computed(() => {
  const f = this.filter().toLowerCase();
  return this.rows().filter((r) => r.name.toLowerCase().includes(f));
});

<!-- template: only the rows in view are in the DOM -->
<cdk-virtual-scroll-viewport itemSize="48" style="height: 600px">
  <div *cdkVirtualFor="let row of visible(); trackBy: trackById">{{ row.name }}</div>
</cdk-virtual-scroll-viewport>`,
  },
];
