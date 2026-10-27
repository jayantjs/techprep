import { Question } from './models';

/** Hands-on "build this" machine-coding questions with full solutions. */
export const CODING_QUESTIONS: Question[] = [
  {
    id: 'co-1',
    level: 'fresher',
    topic: 'coding',
    difficulty: 'easy',
    simple: {
      hi: 'Ek ginti wali machine banao: "+" dabao to number badhe, "-" dabao to ghate, "Reset" dabao to 0. Number ek signal mein rakho — signal badla to screen apne aap update.',
      en: 'Build a counting machine: press "+" and the number goes up, "-" and it goes down, "Reset" and it\'s 0. Keep the number in a signal — when the signal changes, the screen updates by itself.',
      bn: 'একটা গোনার মেশিন বানাও: "+" টিপলে সংখ্যা বাড়বে, "-" টিপলে কমবে, "Reset" টিপলে 0। সংখ্যাটা signal-এ রাখো — signal বদলালে স্ক্রিন নিজেই আপডেট হয়।',
    },
    diagram: 'signals',
    question:
      'Build a counter component with +, - and Reset buttons. The count must never go below 0 and "-" should be disabled at 0.',
    answer:
      'Keep the count in a signal, derive "is zero" with computed(), and update the signal from click handlers.',
    points: [
      'signal(0) holds the state; update() changes it based on the old value.',
      'computed() derives isZero, so the template stays simple.',
      'Math.max(0, …) guarantees the value never goes negative even if the button is not disabled.',
    ],
    code: `// counter.ts
@Component({
  selector: 'app-counter',
  templateUrl: './counter.html',
})
export class Counter {
  count = signal(0);
  isZero = computed(() => this.count() === 0);

  increment() {
    this.count.update((c) => c + 1);
  }
  decrement() {
    this.count.update((c) => Math.max(0, c - 1));
  }
  reset() {
    this.count.set(0);
  }
}

<!-- counter.html -->
<h2>Count: {{ count() }}</h2>
<button (click)="decrement()" [disabled]="isZero()">-</button>
<button (click)="increment()">+</button>
<button (click)="reset()">Reset</button>`,
  },
  {
    id: 'co-2',
    level: 'fresher',
    topic: 'coding',
    difficulty: 'easy',
    simple: {
      hi: 'Ek to-do diary banao: kaam likho aur Enter dabao to list mein jud jaaye, checkbox se "ho gaya" mark karo, ✕ se hatao, aur neeche likha ho kitne kaam baaki hain.',
      en: 'Build a to-do diary: type a task and press Enter to add it to the list, mark it "done" with the checkbox, remove it with ✕, and show at the bottom how many tasks are left.',
      bn: 'একটা to-do ডায়েরি বানাও: কাজ লিখে Enter টিপলে লিস্টে যোগ হবে, checkbox দিয়ে "হয়ে গেছে" মার্ক করো, ✕ দিয়ে সরাও, আর নিচে লেখা থাকুক কতগুলো কাজ বাকি।',
    },
    question:
      'Build a todo list: add a task with Enter, toggle it done, delete it, and show how many tasks are left.',
    answer:
      'Store todos in a signal array and always update it immutably (new array). The "remaining" count is a computed().',
    points: [
      'Give each todo a unique id and track by it in @for.',
      'update() with spread / map / filter returns a new array, so the view updates.',
      '@empty shows a friendly message when the list is empty.',
      'Template reference variable #box gives direct access to the input.',
    ],
    code: `// todo-list.ts
interface Todo {
  id: number;
  title: string;
  done: boolean;
}

export class TodoList {
  todos = signal<Todo[]>([]);
  remaining = computed(() => this.todos().filter((t) => !t.done).length);
  private nextId = 1;

  add(input: HTMLInputElement) {
    const title = input.value.trim();
    if (!title) return;
    this.todos.update((list) => [...list, { id: this.nextId++, title, done: false }]);
    input.value = '';
  }

  toggle(id: number) {
    this.todos.update((list) => list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: number) {
    this.todos.update((list) => list.filter((t) => t.id !== id));
  }
}

<!-- todo-list.html -->
<input #box (keyup.enter)="add(box)" placeholder="What needs to be done?" />
<button (click)="add(box)">Add</button>

<ul>
  @for (todo of todos(); track todo.id) {
    <li [class.done]="todo.done">
      <input type="checkbox" [checked]="todo.done" (change)="toggle(todo.id)" />
      {{ todo.title }}
      <button (click)="remove(todo.id)">✕</button>
    </li>
  } @empty {
    <li>Nothing to do 🎉</li>
  }
</ul>
<p>{{ remaining() }} items left</p>`,
  },
  {
    id: 'co-3',
    level: 'junior',
    topic: 'coding',
    difficulty: 'easy',
    simple: {
      hi: 'Products ki list ke upar ek search box lagao. User jo type kare, sirf wahi products dikhein jinke naam mein wo shabd ho. computed() ek smart chhalni hai — search ya list badle tabhi dobara chhaanti hai.',
      en: 'Put a search box above a product list. As the user types, show only the products whose name contains that word. computed() is a smart sieve — it sifts again only when the search or the list changes.',
      bn: 'প্রোডাক্টের লিস্টের উপরে একটা search box লাগাও। ইউজার যা টাইপ করবে, শুধু সেই প্রোডাক্ট দেখাবে যার নামে ওই শব্দ আছে। computed() একটা চালাক ছাঁকনি — search বা লিস্ট বদলালে তবেই আবার ছাঁকে।',
    },
    question: 'Show a list of products with a search box that filters the list as the user types.',
    answer:
      'Keep the search term in a signal and derive the filtered list with computed(). It recalculates only when the term or the products change.',
    points: [
      'Why not a pipe? A pure pipe does not notice array mutations; an impure pipe runs on every change detection.',
      'Why not a method in the template? It runs on every change detection; computed() is memoized.',
      'Lower-case both sides for a case-insensitive search.',
    ],
    code: `// product-list.ts
export class ProductList {
  products = input.required<Product[]>();
  search = signal('');

  filtered = computed(() => {
    const term = this.search().toLowerCase().trim();
    return this.products().filter((p) => p.name.toLowerCase().includes(term));
  });
}

<!-- product-list.html -->
<input
  [value]="search()"
  (input)="search.set($any($event.target).value)"
  placeholder="Search products"
/>

@for (p of filtered(); track p.id) {
  <p>{{ p.name }} — {{ p.price | currency: 'INR' }}</p>
} @empty {
  <p>No products match "{{ search() }}"</p>
}`,
  },
  {
    id: 'co-4',
    level: 'junior',
    topic: 'coding',
    difficulty: 'medium',
    simple: {
      hi: 'Ek star-rating component banao jo kisi bhi page par lag sake. Parent bole "3 star dikhao", user 5 par click kare to parent ko bhi 5 pata chal jaaye — ye do-tarfa baat model() se hoti hai.',
      en: 'Build a star-rating component that can go on any page. The parent says "show 3 stars", the user clicks 5, and the parent learns it\'s 5 too — this two-way talk happens with model().',
      bn: 'একটা star-rating component বানাও যেটা যেকোনো পেজে বসানো যায়। Parent বলে "৩টা স্টার দেখাও", ইউজার ৫-এ ক্লিক করলে parent-ও জানতে পারে ৫ — এই দুই দিকের কথা হয় model() দিয়ে।',
    },
    diagram: 'communication',
    question:
      'Create a reusable star-rating component that supports two-way binding: <app-star-rating [(value)]="rating" />.',
    answer:
      'Use model() for the value — it is an input that the child can also write, and Angular wires up [(value)] automatically. Use input() for configuration such as max.',
    points: [
      'model() = input + output (valueChange) in one signal.',
      'computed() builds the [1..max] array for @for.',
      'A hover signal gives a preview without changing the real value.',
      'aria-label keeps the buttons accessible.',
    ],
    code: `// star-rating.ts
@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.html',
})
export class StarRating {
  value = model(0); // two-way: [(value)]
  max = input(5);
  stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));
  hovered = signal(0);
}

<!-- star-rating.html -->
@for (star of stars(); track star) {
  <button
    type="button"
    [class.filled]="star <= (hovered() || value())"
    [attr.aria-label]="star + ' stars'"
    (click)="value.set(star)"
    (mouseenter)="hovered.set(star)"
    (mouseleave)="hovered.set(0)"
  >★</button>
}

<!-- parent -->
rating = signal(3);
<app-star-rating [(value)]="rating" />
<p>You rated {{ rating() }} / 5</p>`,
  },
  {
    id: 'co-5',
    level: 'junior',
    topic: 'coding',
    difficulty: 'medium',
    simple: {
      hi: 'Login form banao jo galat cheez par pyaar se bataye: "email zaroori hai", "email sahi nahi", "password kam se kam 8 letters". Submit dabate hi saare galat box laal dikhein, aur login chalte waqt button band rahe.',
      en: 'Build a login form that gently tells you what\'s wrong: "email is required", "email is not valid", "password needs at least 8 letters". On submit, all the wrong boxes turn red, and the button stays off while logging in.',
      bn: 'এমন একটা login form বানাও যেটা ভুল হলে নরম করে বলে: "email আবশ্যক", "email সঠিক নয়", "password অন্তত ৮ অক্ষরের"। Submit টিপলেই সব ভুল box লাল দেখাবে, আর লগইন চলাকালীন বোতাম বন্ধ থাকবে।',
    },
    question:
      'Build a login form with email + password validation, error messages, and a disabled button while submitting.',
    answer:
      'Use a typed reactive form with built-in validators. Show errors only after the control is touched, mark everything touched on submit, and keep a submitting signal.',
    points: [
      'Import ReactiveFormsModule in the component.',
      'markAllAsTouched() reveals all errors when the user submits an invalid form.',
      'finalize() resets the submitting flag on both success and error.',
      'getRawValue() returns a fully typed { email, password } object.',
    ],
    code: `// login.ts
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private auth = inject(AuthService);
  submitting = signal(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.auth
      .login(this.form.getRawValue())
      .pipe(finalize(() => this.submitting.set(false)))
      .subscribe();
  }
}

<!-- login.html -->
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="email" type="email" placeholder="Email" />
  @if (form.controls.email.touched && form.controls.email.errors; as e) {
    @if (e['required']) { <small>Email is required</small> }
    @if (e['email']) { <small>Enter a valid email</small> }
  }

  <input formControlName="password" type="password" placeholder="Password" />
  @if (form.controls.password.touched && form.controls.password.hasError('minlength')) {
    <small>Minimum 8 characters</small>
  }

  <button [disabled]="submitting()">{{ submitting() ? 'Logging in…' : 'Login' }}</button>
</form>`,
  },
  {
    id: 'co-6',
    level: 'mid',
    topic: 'coding',
    difficulty: 'medium',
    simple: {
      hi: 'User search box banao jo server se naam dhoondhe — par har letter par nahi, user ke rukne par. Naya shabd aaye to purani khoj cancel. Khoj chalte waqt "Searching…" dikhao.',
      en: 'Build a user search box that finds names on the server — but not on every letter, only when the user pauses. When a new word comes, cancel the old search. Show "Searching…" while it runs.',
      bn: 'একটা user search box বানাও যেটা সার্ভার থেকে নাম খোঁজে — প্রতিটা অক্ষরে নয়, ইউজার থামলে। নতুন শব্দ এলে পুরনো খোঁজ বাতিল। খোঁজ চলাকালীন "Searching…" দেখাও।',
    },
    diagram: 'flattening',
    question:
      'Build a user search that calls an API with debounce, cancels stale requests, shows a loading state and handles errors.',
    answer:
      'Pipe the FormControl valueChanges through debounceTime, distinctUntilChanged and switchMap, then expose the result as a signal with toSignal().',
    points: [
      'Set loading inside switchMap — switchMap cancels the previous request first, so its finalize() runs before the new loading flag is set.',
      'catchError inside switchMap keeps the stream alive after a failed request.',
      'toSignal unsubscribes automatically when the component is destroyed.',
      'Alternative in Angular 20+: httpResource(() => "/api/users?q=" + query()) with a debounced query signal.',
    ],
    code: `// user-search.ts
export class UserSearch {
  private api = inject(UserApi);
  query = new FormControl('', { nonNullable: true });
  loading = signal(false);

  results = toSignal(
    this.query.valueChanges.pipe(
      debounceTime(300),
      map((q) => q.trim()),
      distinctUntilChanged(),
      switchMap((q) => {
        if (q.length < 2) return of([]);
        this.loading.set(true);
        return this.api.search(q).pipe(
          catchError(() => of([])),
          finalize(() => this.loading.set(false)),
        );
      }),
    ),
    { initialValue: [] as User[] },
  );
}

<!-- user-search.html -->
<input [formControl]="query" placeholder="Search users" />
@if (loading()) { <p>Searching…</p> }
@for (u of results(); track u.id) {
  <p>{{ u.name }}</p>
}`,
  },
  {
    id: 'co-7',
    level: 'mid',
    topic: 'coding',
    difficulty: 'medium',
    simple: {
      hi: 'Admin page sirf admin ke liye hai. Guard darwaze par khada hai: login nahi kiya to login page bhejo, login hai par admin nahi to "Not allowed" page. Ek hi guard function alag-alag role ke liye reuse ho.',
      en: 'The admin page is only for admins. The guard stands at the door: not logged in → send them to the login page; logged in but not an admin → "Not allowed" page. One guard function is reused for different roles.',
      bn: 'Admin পেজ শুধু admin-দের জন্য। Guard দরজায় দাঁড়িয়ে: লগইন না করলে login পেজে পাঠাও, লগইন আছে কিন্তু admin নয় তো "Not allowed" পেজ। একটাই guard function আলাদা আলাদা role-এর জন্য বারবার ব্যবহার হয়।',
    },
    question:
      'Write a reusable role-based route guard: roleGuard("admin") — redirect to /login when logged out and /forbidden when the role is missing.',
    answer:
      'Write a function that takes the role and returns a CanActivateFn / CanMatchFn. Return a UrlTree to redirect instead of navigating manually.',
    points: [
      'Returning a UrlTree lets the router cancel the current navigation cleanly.',
      'Use canMatch on lazy routes so unauthorised users never download the admin bundle.',
      'Guards are UX only — the server must still check permissions on every API call.',
    ],
    code: `export type Role = 'admin' | 'editor' | 'user';

export const roleGuard = (role: Role): CanMatchFn => () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isLoggedIn()) return router.createUrlTree(['/login']);
  return auth.user()?.roles.includes(role) ? true : router.createUrlTree(['/forbidden']);
};

// app.routes.ts
{
  path: 'admin',
  canMatch: [roleGuard('admin')],
  loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
}`,
  },
  {
    id: 'co-8',
    level: 'mid',
    topic: 'coding',
    difficulty: 'medium',
    simple: {
      hi: 'Dropdown menu khula hai aur user bahar kahin click kare to menu band ho jaana chahiye. Ek "click-outside" sticker (directive) banao — jis box par lagao, uske bahar click hone par wo awaaz de.',
      en: 'A dropdown menu is open and the user clicks somewhere outside — the menu should close. Make a "click-outside" sticker (directive) — whichever box you stick it on calls out when someone clicks outside it.',
      bn: 'একটা dropdown মেনু খোলা, আর ইউজার বাইরে কোথাও ক্লিক করল — মেনু বন্ধ হওয়া উচিত। একটা "click-outside" স্টিকার (directive) বানাও — যে box-এ লাগাবে, তার বাইরে ক্লিক হলে সে জানান দেবে।',
    },
    question: 'Write an appClickOutside directive that emits when the user clicks outside the host element (e.g. to close a dropdown).',
    answer:
      'Listen to clicks on document via host metadata and check whether the click target is inside the host element with contains().',
    points: [
      'host: { "(document:click)": ... } adds and removes the listener automatically.',
      'The same click that opens the menu may reach document and close it instantly — call event.stopPropagation() on the toggle button, or ignore that first click.',
      'output() with the same name as the selector allows (appClickOutside)="..." syntax.',
    ],
    code: `@Directive({
  selector: '[appClickOutside]',
  host: { '(document:click)': 'onDocumentClick($event)' },
})
export class ClickOutside {
  private el = inject<ElementRef<HTMLElement>>(ElementRef);
  appClickOutside = output<void>();

  onDocumentClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target as Node)) {
      this.appClickOutside.emit();
    }
  }
}

<!-- usage -->
<button (click)="menuOpen.set(!menuOpen()); $event.stopPropagation()">Menu</button>
@if (menuOpen()) {
  <div class="dropdown" (appClickOutside)="menuOpen.set(false)">…</div>
}`,
  },
  {
    id: 'co-9',
    level: 'mid',
    topic: 'coding',
    difficulty: 'hard',
    simple: {
      hi: 'Jab bhi koi API call chal rahi ho, upar ek loading bar dikhe. Har call ke shuru mein counter +1, khatam hone par -1. Counter 0 se zyada hai matlab kuch chal raha hai. Saath mein GET call fail ho to 2 baar dobara try karo.',
      en: 'Whenever any API call is running, show a loading bar at the top. At the start of each call the counter goes +1, at the end -1. If the counter is above 0, something is running. And if a GET call fails, try again twice.',
      bn: 'যখনই কোনো API call চলছে, উপরে একটা loading bar দেখাও। প্রতিটা call শুরু হলে counter +1, শেষ হলে -1। Counter 0-এর বেশি মানে কিছু চলছে। আর GET call ফেল হলে আরও ২ বার চেষ্টা করো।',
    },
    diagram: 'interceptors',
    question:
      'Create an HTTP interceptor that shows a global loading indicator while any request is running and retries failed GET requests twice.',
    answer:
      'A root LoadingService keeps a counter signal. The interceptor increments it before the request and decrements it in finalize(). Retry only idempotent GET requests.',
    points: [
      'A counter (not a boolean) handles several parallel requests correctly.',
      'finalize() runs on success, error and cancellation.',
      'Never auto-retry POST/PUT — it can create duplicates.',
      'Register with provideHttpClient(withInterceptors([loadingInterceptor])).',
    ],
    code: `@Injectable({ providedIn: 'root' })
export class LoadingService {
  private active = signal(0);
  readonly isLoading = computed(() => this.active() > 0);
  start() { this.active.update((n) => n + 1); }
  stop() { this.active.update((n) => Math.max(0, n - 1)); }
}

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  loading.start();

  const request$ =
    req.method === 'GET' ? next(req).pipe(retry({ count: 2, delay: 1000 })) : next(req);

  return request$.pipe(finalize(() => loading.stop()));
};

// app.config.ts
provideHttpClient(withInterceptors([loadingInterceptor]));

<!-- app.html -->
@if (loading.isLoading()) { <div class="top-progress-bar"></div> }`,
  },
  {
    id: 'co-10',
    level: 'senior',
    topic: 'coding',
    difficulty: 'hard',
    simple: {
      hi: 'Online shopping ki cart banao: product add karo, quantity badlo, total price apne aap update ho, aur page refresh karne par bhi cart bachi rahe. Ek service (store) saare components ke liye ek hi cart sambhaalti hai.',
      en: 'Build an online shopping cart: add products, change quantities, the total price updates by itself, and the cart survives a page refresh. One service (store) manages the same cart for every component.',
      bn: 'অনলাইন শপিংয়ের কার্ট বানাও: প্রোডাক্ট যোগ করো, পরিমাণ বদলাও, মোট দাম নিজেই আপডেট হবে, আর পেজ রিফ্রেশ করলেও কার্ট থেকে যাবে। একটা service (store) সব component-এর জন্য একই কার্ট সামলায়।',
    },
    diagram: 'signals',
    question:
      'Implement a signal-based CartStore service: add item, change quantity, remove at 0, total and count, persisted to localStorage.',
    answer:
      'Keep a private writable signal, expose read-only state and computed totals, change state only through methods with immutable updates, and persist with an effect().',
    points: [
      'Private signal + asReadonly() = components cannot change state directly (encapsulation).',
      'computed() for count and total — always correct, never stored twice.',
      'effect() is the right tool for syncing to localStorage (a side effect).',
      'try/catch around storage — it can be unavailable in private mode.',
      'Same idea scales to NgRx SignalStore (withState, withComputed, withMethods).',
    ],
    code: `export interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly items = signal<CartItem[]>(this.load());

  readonly list = this.items.asReadonly();
  readonly count = computed(() => this.items().reduce((n, i) => n + i.qty, 0));
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));

  constructor() {
    effect(() => localStorage.setItem('cart', JSON.stringify(this.items())));
  }

  add(product: Omit<CartItem, 'qty'>) {
    this.items.update((list) =>
      list.some((i) => i.id === product.id)
        ? list.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...list, { ...product, qty: 1 }],
    );
  }

  setQty(id: number, qty: number) {
    this.items.update((list) =>
      qty <= 0
        ? list.filter((i) => i.id !== id)
        : list.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }

  clear() {
    this.items.set([]);
  }

  private load(): CartItem[] {
    try {
      return JSON.parse(localStorage.getItem('cart') ?? '[]');
    } catch {
      return [];
    }
  }
}`,
  },
  {
    id: 'co-11',
    level: 'mid',
    topic: 'coding',
    difficulty: 'medium',
    simple: {
      hi: 'Server se users ki list laao aur teen haalaat sambhaalo: aa rahi hai (Loading…), aa gayi (list), ya fail ho gayi (error + Retry button). Next/Prev dabao to page number badle aur nayi list apne aap aaye.',
      en: 'Fetch a list of users from the server and handle three situations: it\'s coming (Loading…), it arrived (the list), or it failed (error + Retry button). Press Next/Prev and the page number changes and the new list comes automatically.',
      bn: 'সার্ভার থেকে users-এর লিস্ট আনো আর তিনটে অবস্থা সামলাও: আসছে (Loading…), এসে গেছে (লিস্ট), বা ফেল করেছে (error + Retry বোতাম)। Next/Prev টিপলে পেজ নম্বর বদলাবে আর নতুন লিস্ট নিজেই আসবে।',
    },
    question:
      'Fetch a paginated list of users and handle loading, error (with retry) and empty states. Changing the page should refetch automatically.',
    answer:
      'httpResource() fetches whenever the signals it reads change (the page) and exposes isLoading(), error(), value() and reload() as signals.',
    points: [
      'httpResource uses HttpClient, so interceptors still apply (it is still marked experimental).',
      'The previous request is cancelled when the page changes quickly.',
      'reload() re-runs the request for the Retry button.',
      'Before Angular 19: page$ + switchMap + catchError + a status signal does the same job.',
    ],
    code: `// user-list.ts
export class UserList {
  page = signal(1);
  users = httpResource<User[]>(() => '/api/users?page=' + this.page());
}

<!-- user-list.html -->
@if (users.isLoading()) {
  <p>Loading…</p>
} @else if (users.error()) {
  <p>Could not load users.</p>
  <button (click)="users.reload()">Retry</button>
} @else {
  @for (u of users.value() ?? []; track u.id) {
    <p>{{ u.name }}</p>
  } @empty {
    <p>No users found</p>
  }
}

<button (click)="page.update((p) => p - 1)" [disabled]="page() === 1">Prev</button>
<span>Page {{ page() }}</span>
<button (click)="page.update((p) => p + 1)">Next</button>`,
  },
  {
    id: 'co-12',
    level: 'junior',
    topic: 'coding',
    difficulty: 'medium',
    simple: {
      hi: 'Upar wale counter ka test likho: robot ki tarah button dabao aur check karo ki screen par sahi number aaya, aur 0 par "-" button band hai. Test aapka chowkidar hai — kal koi galti se code tode to test turant pakad lega.',
      en: 'Write a test for the counter above: press the buttons like a robot and check that the right number shows on screen, and that the "-" button is off at 0. A test is your watchman — if someone breaks the code by mistake tomorrow, the test catches it immediately.',
      bn: 'উপরের counter-এর test লেখো: রোবটের মতো বোতাম টিপে দেখো স্ক্রিনে ঠিক সংখ্যা এল কিনা, আর 0-তে "-" বোতাম বন্ধ কিনা। Test হলো তোমার পাহারাদার — কাল কেউ ভুল করে কোড ভাঙলে test সঙ্গে সঙ্গে ধরে ফেলবে।',
    },
    question: 'Write unit tests for the Counter component (co-1): it increments, and "-" is disabled at 0.',
    answer:
      'Create the component with TestBed, click real buttons in the DOM, wait for the view to update, and assert on the rendered text — test behaviour, not private details.',
    points: [
      'await fixture.whenStable() lets a zoneless app finish rendering.',
      'Query by visible text/role so tests survive refactors.',
      'Angular 21 runs these with Vitest by default (ng test).',
    ],
    code: `describe('Counter', () => {
  let fixture: ComponentFixture<Counter>;
  let el: HTMLElement;

  const button = (label: string) =>
    [...el.querySelectorAll('button')].find((b) => b.textContent?.trim() === label)!;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [Counter] }).compileComponents();
    fixture = TestBed.createComponent(Counter);
    el = fixture.nativeElement;
    await fixture.whenStable();
  });

  it('increments when + is clicked', async () => {
    button('+').click();
    await fixture.whenStable();
    expect(el.querySelector('h2')?.textContent).toContain('Count: 1');
  });

  it('disables - at zero', () => {
    expect(button('-').disabled).toBe(true);
  });
});`,
  },
];
