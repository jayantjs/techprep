import { Question } from './models';

/** Core Angular concept questions. */
export const ANGULAR_CORE_QUESTIONS: Question[] = [
  // ───────────── Fundamentals ─────────────
  {
    id: 'fu-1',
    level: 'fresher',
    topic: 'fundamentals',
    difficulty: 'easy',
    simple: {
      hi: 'Angular ko ek ready-made "ghar banane ka kit" samjho. Sirf eent (JavaScript) nahi deta — darwaze (routing), khidkiyan (forms), bijli ka connection (HTTP) sab kit mein pehle se hai. AngularJS us kit ka purana model tha; Angular naya, tez aur TypeScript wala model hai.',
      en: 'Think of Angular as a ready-made "house-building kit". It doesn\'t just give you bricks (JavaScript) — doors (routing), windows (forms) and the electricity connection (HTTP) are already in the kit. AngularJS was the old model of that kit; Angular is the new, faster, TypeScript-based model.',
      bn: 'Angular-কে একটা রেডিমেড "বাড়ি বানানোর কিট" ভাবো। এটা শুধু ইট (JavaScript) দেয় না — দরজা (routing), জানলা (forms), বিদ্যুতের কানেকশন (HTTP) সব আগে থেকেই কিটে আছে। AngularJS ছিল সেই কিটের পুরনো মডেল; Angular হলো নতুন, দ্রুত, TypeScript-ওয়ালা মডেল।',
    },
    question: 'What is Angular and how is it different from AngularJS?',
    answer:
      'Angular is a TypeScript-based, component-driven framework from Google for building single-page applications. It is a "batteries included" platform: routing, forms, HTTP client, dependency injection, testing utilities and the CLI ship with it.',
    points: [
      'AngularJS (1.x) used JavaScript, controllers + $scope and a digest cycle; Angular (2+) is a complete rewrite built on components and TypeScript.',
      'Angular compiles templates ahead of time (AOT) with the Ivy compiler, giving smaller and faster bundles.',
      'Angular has hierarchical DI, a powerful router, RxJS integration and, in recent versions, signals for fine-grained reactivity.',
      'AngularJS reached end of life in January 2022.',
    ],
  },
  {
    id: 'fu-2',
    level: 'fresher',
    topic: 'fundamentals',
    difficulty: 'easy',
    simple: {
      hi: 'Component ek LEGO block jaisa hai. Har block ka apna shape (HTML template), apna rang (CSS) aur apna dimaag (TypeScript class) hota hai. Chhote-chhote blocks jod kar poori app banti hai — header ek block, sidebar ek block, user card ek block.',
      en: 'A component is like a LEGO block. Each block has its own shape (HTML template), its own colour (CSS) and its own brain (TypeScript class). You join small blocks to build the whole app — the header is one block, the sidebar another, a user card another.',
      bn: 'Component হলো একটা LEGO ব্লকের মতো। প্রতিটা ব্লকের নিজের আকার (HTML template), নিজের রং (CSS) আর নিজের মাথা (TypeScript class) থাকে। ছোট ছোট ব্লক জুড়ে পুরো অ্যাপ তৈরি হয় — header একটা ব্লক, sidebar একটা, user card আরেকটা।',
    },
    question: 'What is a component? Explain the important @Component metadata.',
    answer:
      'A component is a TypeScript class decorated with @Component that controls a piece of the UI. It combines a template (view), styles and logic.',
    points: [
      'selector: the custom HTML tag used to render the component.',
      'template / templateUrl: the view markup.',
      'styles / styleUrl: component-scoped CSS.',
      'imports: other standalone components, directives and pipes used in the template.',
      'changeDetection: Default or OnPush.',
      'providers: services scoped to this component and its children.',
    ],
    code: `@Component({
  selector: 'app-user-card',
  imports: [DatePipe],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCard {
  user = input.required<User>();
}`,
  },
  {
    id: 'fu-3',
    level: 'junior',
    topic: 'fundamentals',
    difficulty: 'medium',
    simple: {
      hi: 'Pehle har component ko ek "class register" (NgModule) mein naam likhwana padta tha, tabhi wo kaam karta tha. Standalone mein har component apna school bag khud pack karta hai — jo cheez chahiye (pipes, doosre components) wo seedha apne imports mein rakh leta hai. Kam paperwork, kam confusion.',
      en: 'Earlier, every component had to be written into a "class register" (NgModule) before it could work. A standalone component packs its own school bag — whatever it needs (pipes, other components) goes straight into its own imports. Less paperwork, less confusion.',
      bn: 'আগে প্রতিটা component-কে একটা "ক্লাস রেজিস্টার" (NgModule)-এ নাম লেখাতে হতো, তবেই কাজ করত। Standalone-এ প্রতিটা component নিজের স্কুলব্যাগ নিজেই গোছায় — যা দরকার (pipes, অন্য components) সরাসরি নিজের imports-এ রেখে দেয়। কম কাগজপত্র, কম গোলমাল।',
    },
    question: 'Standalone components vs NgModules — what changed and why?',
    answer:
      'Standalone components declare their own dependencies in the `imports` array instead of being declared inside an NgModule. Since Angular 19, components are standalone by default.',
    points: [
      'Less boilerplate: no need to create a module for every feature.',
      'Better tree-shaking and simpler lazy loading with loadComponent.',
      'Apps are bootstrapped with bootstrapApplication(App, appConfig) and configured with provide* functions (provideRouter, provideHttpClient).',
      'NgModules are still supported, and standalone components can import NgModules and vice-versa, so migration can be incremental.',
    ],
    code: `// main.ts
bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient()],
});`,
  },
  {
    id: 'fu-4',
    level: 'fresher',
    topic: 'fundamentals',
    difficulty: 'easy',
    simple: {
      hi: 'Class aur template do dost hain jo baat kar rahe hain. {{ }} aur [ ] mein class bolti hai, template sunta hai. ( ) mein template bolta hai "user ne click kiya!", class sunti hai. [( )] mein dono ek doosre ko sunte hain — jaise phone call.',
      en: 'The class and the template are two friends talking. With {{ }} and [ ] the class speaks and the template listens. With ( ) the template says "the user clicked!" and the class listens. With [( )] both listen to each other — like a phone call.',
      bn: 'Class আর template দুই বন্ধু, কথা বলছে। {{ }} আর [ ]-এ class বলে, template শোনে। ( )-এ template বলে "ইউজার ক্লিক করেছে!", class শোনে। [( )]-এ দুজনেই দুজনকে শোনে — যেন ফোন কল।',
    },
    diagram: 'data-binding',
    question: 'What are the different types of data binding in Angular?',
    answer:
      'Data binding connects the component class with its template. There are four forms: interpolation, property binding, event binding and two-way binding.',
    points: [
      'Interpolation {{ value }} — class → view (text).',
      'Property binding [prop]="expr" — class → view (DOM property / input).',
      'Event binding (event)="handler($event)" — view → class.',
      'Two-way binding [(ngModel)] or [(value)] with model() — "banana in a box", combines property + event binding.',
      'Also attribute [attr.x], class [class.active] and style [style.width.px] bindings.',
    ],
    code: `<h1>{{ title }}</h1>
<img [src]="avatarUrl" [attr.aria-label]="name" />
<button (click)="save()" [class.active]="isActive">Save</button>
<input [(ngModel)]="username" />`,
  },
  {
    id: 'fu-5',
    level: 'junior',
    topic: 'fundamentals',
    difficulty: 'medium',
    simple: {
      hi: 'Har component ke kapde (CSS) sirf usi ko fit hone chahiye. Emulated mode mein Angular har component ke kapdon par uske naam ka tag laga deta hai, taaki ek component ki .title class ka style doosre component ke .title par na lage.',
      en: 'Each component\'s clothes (CSS) should fit only that component. In Emulated mode Angular sticks a name tag on each component\'s clothes, so the .title style of one component never lands on another component\'s .title.',
      bn: 'প্রতিটা component-এর জামাকাপড় (CSS) শুধু তারই মাপে হওয়া উচিত। Emulated mode-এ Angular প্রতিটা component-এর জামায় তার নামের ট্যাগ লাগিয়ে দেয়, যাতে এক component-এর .title-এর স্টাইল অন্য component-এর .title-এ না লাগে।',
    },
    question: 'Explain ViewEncapsulation modes.',
    answer:
      'ViewEncapsulation controls how component styles are scoped so they do not leak to the rest of the page.',
    points: [
      'Emulated (default): Angular adds unique attributes (_ngcontent-xxx) and rewrites selectors to emulate scoping.',
      'ShadowDom: uses the browser native Shadow DOM, styles are truly isolated.',
      'None: styles become global — useful for theming, but they can leak.',
      ':host, :host-context() and ::ng-deep (deprecated) are special selectors related to encapsulation.',
    ],
  },
  {
    id: 'fu-6',
    level: 'mid',
    topic: 'fundamentals',
    difficulty: 'medium',
    simple: {
      hi: 'JIT matlab khana mehmaan ke aane ke baad banana — mehmaan (user) ko wait karna padta hai. AOT matlab khana pehle se bana kar rakhna (build time par) — mehmaan aaya, turant serve. Isliye AOT wali app jaldi khulti hai.',
      en: 'JIT is cooking after the guest arrives — the guest (user) has to wait. AOT is cooking in advance (at build time) — the guest arrives and food is served instantly. That is why AOT apps open faster.',
      bn: 'JIT মানে অতিথি আসার পর রান্না শুরু — অতিথিকে (ইউজার) অপেক্ষা করতে হয়। AOT মানে আগে থেকেই রান্না করে রাখা (build time-এ) — অতিথি এলেই সঙ্গে সঙ্গে পরিবেশন। তাই AOT অ্যাপ তাড়াতাড়ি খোলে।',
    },
    question: 'What is AOT compilation and what is Ivy?',
    answer:
      'AOT (Ahead-of-Time) compiles HTML templates and TypeScript into efficient JavaScript during the build, instead of in the browser at runtime (JIT). Ivy is Angular\'s current compilation and rendering engine (default since v9).',
    points: [
      'AOT gives faster startup, smaller bundles (no compiler shipped), and catches template errors at build time.',
      'Ivy compiles each component into instructions that are tree-shakable and supports locality — each component compiles independently.',
      'ng build and ng serve use AOT by default.',
    ],
  },

  {
    id: 'fu-7',
    level: 'fresher',
    topic: 'fundamentals',
    difficulty: 'easy',
    simple: {
      hi: 'JavaScript ek aisa dabba hai jismein kuch bhi daal do — kabhi number, kabhi text — galti baad mein pata chalti hai. TypeScript har dabbe par label lagata hai: "isme sirf number aayega". Galat cheez daali to code likhte waqt hi laal line aa jaati hai, bug user tak nahi pahunchta.',
      en: 'JavaScript is a box you can put anything into — sometimes a number, sometimes text — and you discover mistakes later. TypeScript puts a label on every box: "only numbers go here". Put the wrong thing in and you get a red line while writing code, so the bug never reaches the user.',
      bn: 'JavaScript এমন একটা বাক্স যেখানে যা খুশি রাখা যায় — কখনো সংখ্যা, কখনো লেখা — ভুলটা পরে ধরা পড়ে। TypeScript প্রতিটা বাক্সে লেবেল লাগায়: "এখানে শুধু সংখ্যা"। ভুল জিনিস রাখলে কোড লেখার সময়ই লাল দাগ আসে, বাগ ইউজার পর্যন্ত পৌঁছায় না।',
    },
    question: 'What is TypeScript and why does Angular use it?',
    answer:
      'TypeScript is a superset of JavaScript that adds static types. It compiles to plain JavaScript. Angular is written in TypeScript and uses it for every project.',
    points: [
      'Catches errors at compile time instead of at runtime.',
      'Better editor support: autocomplete, refactoring, go-to-definition.',
      'Interfaces and generics describe data shapes (e.g. HttpClient.get<User[]>()).',
      'Decorators (@Component, @Injectable) are a TypeScript feature that Angular relies on.',
    ],
    code: `interface User {
  id: number;
  name: string;
  email?: string; // optional
}

function greet(user: User): string {
  return 'Hello ' + user.name;
}`,
  },
  {
    id: 'fu-8',
    level: 'fresher',
    topic: 'fundamentals',
    difficulty: 'easy',
    simple: {
      hi: 'Angular CLI aapka helper robot hai. "ng new" bolo to poora project bana deta hai, "ng g c" bolo to component ki files bana deta hai, "ng serve" bolo to app chala deta hai. Haath se files aur config banane ki zaroorat nahi.',
      en: 'The Angular CLI is your helper robot. Say "ng new" and it creates the whole project, "ng g c" and it creates a component\'s files, "ng serve" and it runs the app. No need to create files and config by hand.',
      bn: 'Angular CLI তোমার হেল্পার রোবট। "ng new" বললে পুরো প্রজেক্ট বানিয়ে দেয়, "ng g c" বললে component-এর ফাইল বানায়, "ng serve" বললে অ্যাপ চালু করে। হাতে ফাইল আর config বানানোর দরকার নেই।',
    },
    question: 'What is the Angular CLI? Name the commands you use most.',
    answer:
      'The Angular CLI (ng) is the command-line tool to create, develop, build, test and update Angular projects. It applies best-practice configuration for you.',
    points: [
      'ng new my-app — create a new workspace.',
      'ng serve — start the dev server with live reload (default http://localhost:4200).',
      'ng generate component user-list (ng g c) — also service, pipe, directive, guard, interceptor.',
      'ng build — production build into dist/.',
      'ng test — run unit tests.',
      'ng update — upgrade Angular and run automatic migrations.',
      'ng add @angular/material — install and configure a library.',
    ],
  },
  {
    id: 'fu-9',
    level: 'fresher',
    topic: 'fundamentals',
    difficulty: 'easy',
    simple: {
      hi: 'Component dukaan ka counter hai jahan customer (user) aata hai. Service godown hai jahan saaman (data, API calls) rakha hai. Har counter apna alag godown nahi banata — sab ek hi godown se saaman mangwate hain. Isse code saaf aur reusable rehta hai.',
      en: 'A component is the shop counter where the customer (user) comes. A service is the warehouse where the goods (data, API calls) are kept. Every counter doesn\'t build its own warehouse — they all order from the same one. This keeps code clean and reusable.',
      bn: 'Component হলো দোকানের কাউন্টার, যেখানে খদ্দের (ইউজার) আসে। Service হলো গুদাম, যেখানে মাল (data, API calls) রাখা থাকে। প্রতিটা কাউন্টার নিজের আলাদা গুদাম বানায় না — সবাই একই গুদাম থেকে মাল আনায়। এতে কোড পরিষ্কার আর বারবার ব্যবহারযোগ্য থাকে।',
    },
    question: 'What is a service and why do we use it?',
    answer:
      'A service is a class (decorated with @Injectable) that holds logic or data that is not tied to a single view — API calls, shared state, logging, validation helpers. Components get it through dependency injection.',
    points: [
      'Keeps components thin: components handle the view, services handle business logic.',
      'providedIn: "root" makes it a single shared instance across the app.',
      'Easy to replace with a mock in tests.',
    ],
    code: `@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('/api/todos');
  }
}

export class TodoList {
  private todoService = inject(TodoService);
  todos = toSignal(this.todoService.getTodos(), { initialValue: [] });
}`,
  },
  {
    id: 'fu-10',
    level: 'fresher',
    topic: 'fundamentals',
    difficulty: 'easy',
    simple: {
      hi: 'Normal website mein har page ke liye nayi kitaab kholni padti hai (poora page reload). SPA ek magic kitaab hai — ek baar khulti hai, phir sirf andar ke pages badalte hain. Isliye app tez lagti hai.',
      en: 'On a normal website you open a new book for every page (full page reload). An SPA is a magic book — it opens once, and then only the pages inside change. That is why the app feels fast.',
      bn: 'সাধারণ ওয়েবসাইটে প্রতিটা পেজের জন্য নতুন বই খুলতে হয় (পুরো পেজ রিলোড)। SPA একটা ম্যাজিক বই — একবার খোলে, তারপর শুধু ভেতরের পাতা বদলায়। তাই অ্যাপ দ্রুত মনে হয়।',
    },
    diagram: 'spa-bootstrap',
    question: 'What is a Single Page Application (SPA) and how does an Angular app start?',
    answer:
      'An SPA loads one HTML page and then updates the content in the browser with JavaScript, instead of loading a new page from the server on every navigation.',
    points: [
      'index.html contains the root tag <app-root>.',
      'main.ts calls bootstrapApplication(App, appConfig).',
      'Angular renders the root App component into <app-root>.',
      'The router swaps components inside <router-outlet> as the URL changes — no full page reload.',
    ],
  },

  // ───────────── Templates & Directives ─────────────
  {
    id: 'td-1',
    level: 'fresher',
    topic: 'templates',
    difficulty: 'easy',
    simple: {
      hi: 'Structural directive mistri hai — wo deewar khadi karta hai ya tod deta hai (element DOM mein add/remove). Attribute directive painter hai — deewar wahi rehti hai, bas uska rang ya behaviour badal jaata hai.',
      en: 'A structural directive is a mason — it builds a wall or knocks it down (adds/removes elements in the DOM). An attribute directive is a painter — the wall stays, only its colour or behaviour changes.',
      bn: 'Structural directive হলো রাজমিস্ত্রি — দেয়াল তোলে বা ভেঙে দেয় (DOM-এ element যোগ/বাদ)। Attribute directive হলো রংমিস্ত্রি — দেয়াল একই থাকে, শুধু তার রং বা আচরণ বদলায়।',
    },
    question: 'What is the difference between structural and attribute directives?',
    answer:
      'Structural directives change the DOM layout by adding or removing elements (they work with templates). Attribute directives change the appearance or behaviour of an existing element.',
    points: [
      'Structural: *ngIf, *ngFor, *ngSwitchCase — now mostly replaced by built-in control flow @if / @for / @switch.',
      'Structural directives are written with the * micro-syntax which desugars to <ng-template>.',
      'Attribute: ngClass, ngStyle, or any custom directive such as [appHighlight].',
      'Components are technically directives with a template.',
    ],
  },
  {
    id: 'td-2',
    level: 'fresher',
    topic: 'templates',
    difficulty: 'easy',
    simple: {
      hi: '@if ek chowkidar hai: "condition true hai to andar aao, warna nahi". @for line mein khade bachchon ko ek-ek karke dikhata hai. track har bachche ka roll number hai — list badle to Angular roll number se pehchaan leta hai kaun naya hai, aur poori class dobara nahi banata.',
      en: '@if is a security guard: "if the condition is true, come in; otherwise not". @for shows children standing in a line one by one. track is each child\'s roll number — when the list changes, Angular recognises who is new by roll number and doesn\'t rebuild the whole class.',
      bn: '@if একজন দারোয়ান: "শর্ত সত্যি হলে ভেতরে এসো, নাহলে না"। @for লাইনে দাঁড়ানো বাচ্চাদের একে একে দেখায়। track হলো প্রতিটা বাচ্চার রোল নম্বর — লিস্ট বদলালে Angular রোল নম্বর দেখে চেনে কে নতুন, পুরো ক্লাস আবার বানায় না।',
    },
    question: 'Explain built-in control flow (@if, @for, @switch). Why is `track` required in @for?',
    answer:
      'Since Angular 17, templates have a built-in control flow syntax that does not need imports, is faster and gives better type narrowing than *ngIf / *ngFor.',
    points: [
      '`track` tells Angular how to identify each item, so it can reuse DOM nodes instead of re-creating them when the list changes.',
      'Track by a unique id (track item.id); use $index only for static lists.',
      '@for exposes $index, $first, $last, $even, $odd, $count, and supports an @empty block.',
      '@if supports @else if / @else and the "as" alias.',
    ],
    code: `@if (user(); as u) {
  <p>Welcome {{ u.name }}</p>
} @else {
  <app-login />
}

@for (item of items(); track item.id; let i = $index) {
  <li>{{ i + 1 }}. {{ item.name }}</li>
} @empty {
  <li>No items found</li>
}`,
  },
  {
    id: 'td-3',
    level: 'junior',
    topic: 'templates',
    difficulty: 'medium',
    simple: {
      hi: 'Pipe ek juice machine hai: santra (data) daalo, juice (formatted value) niklega. Pure pipe smart machine hai — wahi santra dobara daaloge to purana juice de degi, dobara nahi nichodegi. Impure pipe har baar nichodti hai, chahe santra wahi ho — isliye slow.',
      en: 'A pipe is a juice machine: put in an orange (data), get juice (formatted value). A pure pipe is a smart machine — put the same orange in again and it gives you the old juice without squeezing again. An impure pipe squeezes every single time, even for the same orange — so it is slow.',
      bn: 'Pipe হলো একটা জুস মেশিন: কমলা (data) দাও, জুস (formatted value) বেরোবে। Pure pipe চালাক মেশিন — একই কমলা আবার দিলে আগের জুসটাই দিয়ে দেয়, আবার চিপে না। Impure pipe প্রতিবার চিপে, কমলা একই হলেও — তাই ধীর।',
    },
    question: 'What are pure and impure pipes? How do you create a custom pipe?',
    answer:
      'A pipe transforms a value in the template. Pipes are pure by default: Angular re-runs them only when the input is a new primitive value or a new object reference. Impure pipes (pure: false) run on every change detection cycle.',
    points: [
      'Pure pipes are memoized and cheap — prefer them.',
      'Mutating an array (push) will NOT re-run a pure pipe; create a new array instead.',
      'The async pipe is impure because it must check for new emissions.',
      'Built-in pipes: date, currency, uppercase, json, async, percent, slice, keyvalue.',
    ],
    code: `@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 20): string {
    return value.length > limit ? value.slice(0, limit) + '…' : value;
  }
}

// usage: {{ description | truncate: 50 }}`,
  },
  {
    id: 'td-4',
    level: 'junior',
    topic: 'templates',
    difficulty: 'medium',
    simple: {
      hi: 'Component ek photo frame hai. ng-content frame ke andar ki khaali jagah hai — photo (content) parent deta hai. Multi-slot frame mein alag-alag khaane hote hain: upar title ke liye, neeche body ke liye.',
      en: 'A component is a photo frame. ng-content is the empty space inside the frame — the parent provides the photo (content). A multi-slot frame has separate compartments: one at the top for the title, one below for the body.',
      bn: 'Component হলো একটা ফটো ফ্রেম। ng-content হলো ফ্রেমের ভেতরের ফাঁকা জায়গা — ছবি (content) দেয় parent। Multi-slot ফ্রেমে আলাদা আলাদা খোপ থাকে: উপরে title-এর জন্য, নিচে body-র জন্য।',
    },
    question: 'What is content projection? Explain single-slot and multi-slot ng-content.',
    answer:
      'Content projection lets a parent pass markup into a child component. The child marks where the content goes with <ng-content>.',
    points: [
      'Single-slot: one <ng-content /> receives all projected content.',
      'Multi-slot: <ng-content select="[card-title]" /> picks content by CSS selector.',
      'Projected content is created by the parent, so it is initialized even if the child hides it. Use ng-template + ngTemplateOutlet for conditional / lazy projection.',
      'Projected elements can be queried in the child with contentChild() / @ContentChild.',
    ],
    code: `<!-- card.html -->
<div class="card">
  <header><ng-content select="[card-title]" /></header>
  <ng-content />
</div>

<!-- usage -->
<app-card>
  <h2 card-title>Profile</h2>
  <p>Body content</p>
</app-card>`,
  },
  {
    id: 'td-5',
    level: 'junior',
    topic: 'templates',
    difficulty: 'medium',
    simple: {
      hi: 'ng-template ek recipe card hai — rakha hai, par jab tak koi use na kare khana nahi banta. ng-container ek invisible thaili hai — cheezein group karti hai par khud dikhti nahi. ngTemplateOutlet woh rasoiya hai jo recipe card utha kar khana bana deta hai.',
      en: 'ng-template is a recipe card — it sits there, and no food is cooked until someone uses it. ng-container is an invisible bag — it groups things but is not visible itself. ngTemplateOutlet is the cook who picks up the recipe card and makes the dish.',
      bn: 'ng-template হলো একটা রেসিপি কার্ড — রাখা আছে, কেউ ব্যবহার না করা পর্যন্ত রান্না হয় না। ng-container একটা অদৃশ্য থলি — জিনিস একসাথে রাখে কিন্তু নিজে দেখা যায় না। ngTemplateOutlet হলো সেই রাঁধুনি যে রেসিপি কার্ড তুলে রান্না করে ফেলে।',
    },
    question: 'Difference between ng-template, ng-container and ngTemplateOutlet?',
    answer:
      'All three help structure templates without adding unnecessary DOM elements.',
    points: [
      '<ng-template>: defines a template fragment that is NOT rendered until something instantiates it.',
      '<ng-container>: a logical grouping element that is not rendered in the DOM — handy for applying a directive without an extra wrapper div.',
      'ngTemplateOutlet: renders an ng-template at a location, optionally passing a context object.',
    ],
    code: `<ng-template #userRow let-user let-i="index">
  <span>{{ i }} - {{ user.name }}</span>
</ng-template>

<ng-container
  *ngTemplateOutlet="userRow; context: { $implicit: currentUser, index: 1 }" />`,
  },
  {
    id: 'td-6',
    level: 'junior',
    topic: 'templates',
    difficulty: 'medium',
    simple: {
      hi: 'Custom directive ek sticker hai — kisi bhi element par chipka do aur usmein nayi power aa jaati hai. appHighlight sticker lagao to mouse le jaane par element highlight ho jaayega. Ek baar banao, har jagah chipkao.',
      en: 'A custom directive is a sticker — stick it on any element and it gains a new power. Stick the appHighlight sticker on and the element highlights when the mouse moves over it. Make it once, stick it everywhere.',
      bn: 'Custom directive একটা স্টিকার — যেকোনো element-এ লাগাও, তাতে নতুন ক্ষমতা চলে আসে। appHighlight স্টিকার লাগালে মাউস নিয়ে গেলেই element হাইলাইট হবে। একবার বানাও, সব জায়গায় লাগাও।',
    },
    question: 'How do you create a custom attribute directive?',
    answer:
      'Create a class with @Directive and an attribute selector. Use the `host` metadata (preferred over @HostListener / @HostBinding) to listen to events and bind properties on the host element.',
    code: `@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'active.set(true)',
    '(mouseleave)': 'active.set(false)',
    '[style.backgroundColor]': 'active() ? color() : null',
  },
})
export class Highlight {
  color = input('yellow', { alias: 'appHighlight' });
  protected active = signal(false);
}

// <p appHighlight="lightblue">Hover me</p>`,
  },

  // ───────────── Lifecycle ─────────────
  {
    id: 'lh-1',
    level: 'fresher',
    topic: 'lifecycle',
    difficulty: 'easy',
    simple: {
      hi: 'Component ki life ek insaan jaisi hai: paida hona (constructor), naam-pata milna (ngOnChanges), school ka pehla din (ngOnInit), roz ka routine check (ngDoCheck), ghar sajna (AfterContent / AfterView), aur jaane se pehle saaman samet lena (ngOnDestroy).',
      en: 'A component\'s life is like a person\'s: being born (constructor), getting a name and address (ngOnChanges), the first day of school (ngOnInit), the daily routine check (ngDoCheck), the home getting decorated (AfterContent / AfterView), and packing up before leaving (ngOnDestroy).',
      bn: 'Component-এর জীবন মানুষের মতো: জন্ম (constructor), নাম-ঠিকানা পাওয়া (ngOnChanges), স্কুলের প্রথম দিন (ngOnInit), রোজকার রুটিন চেক (ngDoCheck), ঘর সাজানো (AfterContent / AfterView), আর চলে যাওয়ার আগে জিনিসপত্র গুছিয়ে নেওয়া (ngOnDestroy)।',
    },
    diagram: 'lifecycle',
    question: 'List the component lifecycle hooks in order.',
    answer:
      'After the constructor, Angular calls lifecycle hooks in this order:',
    points: [
      'ngOnChanges — when an input changes (before ngOnInit and on every input change).',
      'ngOnInit — once, after the first ngOnChanges. Good place for initialization logic.',
      'ngDoCheck — on every change detection run, for custom change detection.',
      'ngAfterContentInit / ngAfterContentChecked — after projected content is initialized / checked.',
      'ngAfterViewInit / ngAfterViewChecked — after the component view and child views are initialized / checked.',
      'ngOnDestroy — just before the component is destroyed. Clean up here.',
      'Also afterNextRender() and afterEveryRender() for DOM work after rendering.',
    ],
  },
  {
    id: 'lh-2',
    level: 'fresher',
    topic: 'lifecycle',
    difficulty: 'easy',
    simple: {
      hi: 'Constructor matlab naya ghar mila aur saaman (services) andar rakh diya. ngOnInit matlab ghar ka address (inputs) bhi aa gaya — ab doston ko bulao (data fetch karo). Address aane se pehle party plan nahi kar sakte.',
      en: 'Constructor means you got a new house and put your stuff (services) inside. ngOnInit means the house address (inputs) has also arrived — now invite friends (fetch data). You can\'t plan the party before you have the address.',
      bn: 'Constructor মানে নতুন বাড়ি পেলে আর জিনিসপত্র (services) ভেতরে রাখলে। ngOnInit মানে বাড়ির ঠিকানাও (inputs) এসে গেছে — এবার বন্ধুদের ডাকো (data fetch করো)। ঠিকানা আসার আগে পার্টির প্ল্যান করা যায় না।',
    },
    question: 'Constructor vs ngOnInit — what should go where?',
    answer:
      'The constructor is a TypeScript feature that runs when the class is instantiated; ngOnInit is an Angular hook that runs after the first ngOnChanges, when inputs are available.',
    points: [
      'Constructor: dependency injection and simple field setup. Decorator-based @Input values are NOT available yet.',
      'ngOnInit: logic that needs input values, starting data fetches.',
      'With signal inputs and inject(), much logic can be expressed with computed() / effect() in the constructor or field initializers.',
    ],
  },
  {
    id: 'lh-3',
    level: 'mid',
    topic: 'lifecycle',
    difficulty: 'hard',
    simple: {
      hi: 'Angular ek photo kheenchta hai (check), phir confirm karne ke liye doosri photo leta hai. Dono photos mein value alag mili to Angular bolta hai "photo lete waqt kisi ne hila diya!" — yahi error hai. Value photo lene se pehle set karo, beech mein nahi.',
      en: 'Angular takes a photo (check), then takes a second photo to confirm. If the value is different in the two photos, Angular says "someone moved while I was taking the photo!" — that is this error. Set values before the photo, not in between.',
      bn: 'Angular একটা ছবি তোলে (check), তারপর নিশ্চিত হতে দ্বিতীয় ছবি তোলে। দুই ছবিতে মান আলাদা হলে Angular বলে "ছবি তোলার সময় কেউ নড়ে গেছে!" — এটাই এই error। মান ছবি তোলার আগে সেট করো, মাঝখানে নয়।',
    },
    question: 'What causes ExpressionChangedAfterItHasBeenCheckedError and how do you fix it?',
    answer:
      'In development mode Angular runs an extra check after change detection to verify that bound values did not change. If a value changes during the check (typically in ngAfterViewInit or a child modifying parent state), Angular throws this error, because the view would be inconsistent.',
    points: [
      'Common causes: updating a bound property in ngAfterViewInit, a child emitting an event that changes parent state during rendering, getters that return new values each call.',
      'Fixes: move the logic to ngOnInit, derive the value with computed(), use signals, or restructure data flow.',
      'Avoid hiding it with setTimeout or detectChanges unless you understand the cause.',
    ],
  },
  {
    id: 'lh-4',
    level: 'junior',
    topic: 'lifecycle',
    difficulty: 'medium',
    simple: {
      hi: 'Hotel room chhodne se pehle pankha, light, AC band karte ho. Component destroy hone se pehle bhi subscriptions aur timers band karne hote hain, warna wo background mein chalte rehte hain aur memory khaate hain. takeUntilDestroyed() ye switch apne aap band kar deta hai.',
      en: 'Before leaving a hotel room you switch off the fan, lights and AC. Before a component is destroyed you must also stop subscriptions and timers, otherwise they keep running in the background and eat memory. takeUntilDestroyed() flips these switches off for you automatically.',
      bn: 'হোটেলের ঘর ছাড়ার আগে ফ্যান, লাইট, AC বন্ধ করো। Component destroy হওয়ার আগেও subscriptions আর timers বন্ধ করতে হয়, নাহলে ব্যাকগ্রাউন্ডে চলতেই থাকে আর মেমরি খায়। takeUntilDestroyed() এই সুইচগুলো নিজে থেকেই বন্ধ করে দেয়।',
    },
    question: 'How do you clean up subscriptions and resources? Explain DestroyRef and takeUntilDestroyed.',
    answer:
      'DestroyRef is an injectable that lets you register cleanup callbacks for when the component, directive or service is destroyed. takeUntilDestroyed() is an RxJS operator from @angular/core/rxjs-interop that completes an observable on destroy.',
    points: [
      'takeUntilDestroyed() without args must be called in an injection context (constructor / field initializer); otherwise pass a DestroyRef.',
      'It replaces the classic "destroy$ Subject + takeUntil" pattern.',
      'Alternatives: async pipe, toSignal(), take(1).',
    ],
    code: `export class Clock {
  private destroyRef = inject(DestroyRef);

  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe((tick) => console.log(tick));

    const id = setInterval(() => {}, 1000);
    this.destroyRef.onDestroy(() => clearInterval(id));
  }
}`,
  },

  // ───────────── Communication ─────────────
  {
    id: 'cc-1',
    level: 'fresher',
    topic: 'communication',
    difficulty: 'easy',
    simple: {
      hi: 'Parent bachche ko pocket money deta hai — input (data neeche jaata hai). Bachcha parent ko awaaz deta hai "mujhe bhookh lagi!" — output (event upar jaata hai). model() dono taraf ki baat hai — jaise walkie-talkie.',
      en: 'The parent gives the child pocket money — input (data goes down). The child calls out to the parent "I\'m hungry!" — output (event goes up). model() is talking both ways — like a walkie-talkie.',
      bn: 'Parent বাচ্চাকে হাতখরচ দেয় — input (data নিচে যায়)। বাচ্চা parent-কে ডাকে "খিদে পেয়েছে!" — output (event উপরে যায়)। model() হলো দুই দিকেই কথা — যেন walkie-talkie।',
    },
    diagram: 'communication',
    question: 'How do parent and child components communicate?',
    answer:
      'Parent → child via inputs; child → parent via outputs (events). Two-way binding combines both. Modern Angular uses the signal-based input(), output() and model() functions.',
    points: [
      'input() / input.required() returns a read-only signal.',
      'output<T>() returns an OutputEmitterRef; call .emit(value).',
      'model() creates a writable signal input that supports [(value)] binding.',
      'Decorator-based @Input() and @Output() with EventEmitter still work.',
    ],
    code: `// child
export class Counter {
  start = input(0);            // parent -> child
  changed = output<number>();  // child -> parent
  value = model(0);            // two-way: [(value)]

  inc() {
    this.value.update((v) => v + 1);
    this.changed.emit(this.value());
  }
}

// parent template
<app-counter [start]="5" (changed)="log($event)" [(value)]="count" />`,
  },
  {
    id: 'cc-2',
    level: 'junior',
    topic: 'communication',
    difficulty: 'medium',
    simple: {
      hi: 'Do padosi jo ek doosre ko nahi jaante, society ke notice board (shared service) par likh kar baat karte hain. Ek likhta hai, doosra padhta hai. Signal wala notice board khud bata deta hai jab kuch naya likha jaaye.',
      en: 'Two neighbours who don\'t know each other talk by writing on the society notice board (shared service). One writes, the other reads. A signal-based notice board even tells you when something new has been written.',
      bn: 'দুই প্রতিবেশী যারা একে অপরকে চেনে না, সোসাইটির নোটিশ বোর্ডে (shared service) লিখে কথা বলে। একজন লেখে, অন্যজন পড়ে। Signal-ওয়ালা নোটিশ বোর্ড নতুন কিছু লেখা হলে নিজেই জানিয়ে দেয়।',
    },
    question: 'How do sibling or unrelated components share data?',
    answer:
      'Use a shared service (usually providedIn: "root" or provided at a common ancestor) that holds state in a signal or a BehaviorSubject. Components inject the service and read / update the state.',
    points: [
      'Expose read-only state (asReadonly() or asObservable()) and update through methods.',
      'For larger apps consider a state library (NgRx Store / SignalStore).',
      'Router state (params, query params) is another way to share state between routes.',
    ],
    code: `@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly items = signal<Item[]>([]);
  readonly all = this.items.asReadonly();
  readonly total = computed(() => this.items().reduce((s, i) => s + i.price, 0));

  add(item: Item) {
    this.items.update((list) => [...list, item]);
  }
}`,
  },
  {
    id: 'cc-3',
    level: 'junior',
    topic: 'communication',
    difficulty: 'medium',
    simple: {
      hi: 'viewChild matlab apne ghar ke andar ki cheez dhoondhna (apne template mein). contentChild matlab mehmaan jo gift laaye (ng-content se aaya content), usmein dhoondhna.',
      en: 'viewChild means searching for something inside your own house (your own template). contentChild means searching inside the gift a guest brought (content that came through ng-content).',
      bn: 'viewChild মানে নিজের বাড়ির ভেতরের জিনিস খোঁজা (নিজের template-এ)। contentChild মানে অতিথি যে উপহার এনেছে (ng-content দিয়ে আসা content), তার মধ্যে খোঁজা।',
    },
    question: 'Explain view queries vs content queries (viewChild / contentChild).',
    answer:
      'View queries find elements/components in the component\'s own template. Content queries find elements projected into the component through <ng-content>.',
    points: [
      'viewChild(), viewChildren() — results available after the view is initialized (ngAfterViewInit).',
      'contentChild(), contentChildren() — results available after content init (ngAfterContentInit).',
      'Signal queries return signals, so you can use them in computed() and they update automatically.',
      'Decorator versions: @ViewChild, @ViewChildren, @ContentChild, @ContentChildren (with { static: true } for elements outside *ngIf).',
    ],
    code: `export class SearchBox {
  input = viewChild.required<ElementRef<HTMLInputElement>>('box');

  focus() {
    this.input().nativeElement.focus();
  }
}
// template: <input #box />`,
  },

  // ───────────── DI ─────────────
  {
    id: 'di-1',
    level: 'junior',
    topic: 'di',
    difficulty: 'easy',
    simple: {
      hi: 'Restaurant mein aap khud kitchen mein jaakar khana nahi banate — waiter (injector) ko order dete ho aur wo laa deta hai. DI bhi yahi hai: class bolti hai "mujhe UserService chahiye", Angular laa kar de deta hai. Paas wale counter par nahi mila to upar wale manager se maangta hai.',
      en: 'In a restaurant you don\'t go into the kitchen and cook yourself — you order from the waiter (injector) and he brings it. DI is the same: the class says "I need UserService" and Angular brings it. If the nearest counter doesn\'t have it, it asks the manager upstairs.',
      bn: 'রেস্টুরেন্টে তুমি নিজে রান্নাঘরে গিয়ে রান্না করো না — ওয়েটারকে (injector) অর্ডার দাও, সে এনে দেয়। DI-ও তাই: class বলে "আমার UserService চাই", Angular এনে দেয়। কাছের কাউন্টারে না পেলে উপরের ম্যানেজারের কাছে চায়।',
    },
    diagram: 'di-hierarchy',
    question: 'What is Dependency Injection and how does Angular\'s injector hierarchy work?',
    answer:
      'DI is a design pattern where a class receives its dependencies from outside instead of creating them. Angular has a hierarchy of injectors and resolves a token by walking up the tree until a provider is found.',
    points: [
      'Element injectors: created for components/directives that have providers. Searched first, up the DOM tree.',
      'Environment injectors: root injector (providedIn: "root" / app config), lazy-loaded route injectors, platform injector.',
      'If nothing provides the token, Angular throws NullInjectorError (unless optional).',
      'Benefits: loose coupling, easy testing (swap with mocks), reuse of singletons.',
    ],
  },
  {
    id: 'di-2',
    level: 'junior',
    topic: 'di',
    difficulty: 'medium',
    simple: {
      hi: 'providedIn root poore shehar ki ek hi paani ki tanki hai — sab ghar wahi paani use karte hain. Component providers har ghar ki apni tanki hai — har ghar ka paani alag, aur ghar tootne par tanki bhi chali jaati hai.',
      en: 'providedIn: root is one water tank for the whole city — every house uses the same water. Component providers are each house\'s own tank — every house has separate water, and when the house is demolished the tank goes too.',
      bn: 'providedIn: root হলো পুরো শহরের একটাই জলের ট্যাংক — সব বাড়ি একই জল ব্যবহার করে। Component providers হলো প্রতিটা বাড়ির নিজের ট্যাংক — প্রতিটা বাড়ির জল আলাদা, আর বাড়ি ভাঙলে ট্যাংকও চলে যায়।',
    },
    question: 'providedIn: "root" vs adding a service to a component\'s providers array?',
    answer:
      'providedIn: "root" registers one application-wide singleton and is tree-shakable (removed if never injected). Providing in a component creates a new instance for each component instance, shared with its children, and destroyed with it.',
    points: [
      'Use root for app-wide state, API services, caches.',
      'Use component providers for state that should be per-instance (e.g. a form wizard store per dialog).',
      'Providers on a lazy route create a separate instance for that route subtree.',
    ],
  },
  {
    id: 'di-3',
    level: 'mid',
    topic: 'di',
    difficulty: 'medium',
    simple: {
      hi: 'Token ek order slip hai, provider batata hai slip par kya milega: useClass = "ye naya bana ke do", useValue = "ye ready cheez de do", useFactory = "is recipe se bana ke do", useExisting = "jo pehle se diya hai wahi de do, naya mat banao".',
      en: 'A token is an order slip; the provider says what you get for that slip: useClass = "make a new one", useValue = "give this ready-made thing", useFactory = "make it with this recipe", useExisting = "give the one you already gave, don\'t make a new one".',
      bn: 'Token হলো একটা অর্ডার স্লিপ, provider বলে দেয় স্লিপে কী মিলবে: useClass = "নতুন বানিয়ে দাও", useValue = "এই তৈরি জিনিসটা দাও", useFactory = "এই রেসিপিতে বানিয়ে দাও", useExisting = "আগে যেটা দিয়েছ সেটাই দাও, নতুন বানিও না"।',
    },
    question: 'Explain provider types: useClass, useValue, useFactory, useExisting and InjectionToken.',
    answer:
      'A provider tells the injector how to create a value for a token. InjectionToken is used when the dependency is not a class (strings, config objects, functions).',
    points: [
      'useClass: create an instance of a (possibly different) class.',
      'useValue: use a fixed value — configs, constants, mocks.',
      'useFactory: call a function to build the value; can use inject() inside.',
      'useExisting: alias one token to another existing instance.',
      'multi: true lets several providers contribute to one token (e.g. HTTP_INTERCEPTORS).',
    ],
    code: `export const API_URL = new InjectionToken<string>('API_URL');

providers: [
  { provide: API_URL, useValue: 'https://api.example.com' },
  { provide: Logger, useClass: ConsoleLogger },
  { provide: OldLogger, useExisting: Logger },
  { provide: Cache, useFactory: () => new Cache(inject(API_URL)) },
];`,
  },
  {
    id: 'di-4',
    level: 'senior',
    topic: 'di',
    difficulty: 'hard',
    simple: {
      hi: 'Ye dhoondhne ke rules hain. self = "sirf apni jeb mein dekho". skipSelf = "apni jeb chhodo, papa ki jeb se shuru karo". optional = "na mile to koi baat nahi, error mat do". host = "ghar ki boundary ke bahar mat jaana".',
      en: 'These are search rules. self = "look only in your own pocket". skipSelf = "skip your pocket, start with dad\'s pocket". optional = "if you don\'t find it, no problem, don\'t throw an error". host = "don\'t go beyond the house boundary".',
      bn: 'এগুলো খোঁজার নিয়ম। self = "শুধু নিজের পকেটে দেখো"। skipSelf = "নিজের পকেট বাদ দাও, বাবার পকেট থেকে শুরু করো"। optional = "না পেলে অসুবিধা নেই, error দিও না"। host = "বাড়ির সীমানার বাইরে যেও না"।',
    },
    question: 'What are the DI resolution modifiers: optional, self, skipSelf, host?',
    answer:
      'They change how the injector looks up a dependency. They can be passed as options to inject() or used as decorators (@Optional, @Self, @SkipSelf, @Host).',
    points: [
      'optional: return null instead of throwing when not found.',
      'self: only look in the current element injector.',
      'skipSelf: start the search from the parent injector (e.g. nested menus finding their parent).',
      'host: stop searching at the host component of the current template.',
    ],
    code: `const parent = inject(MenuService, { skipSelf: true, optional: true });
const local = inject(FormState, { self: true });`,
  },
  {
    id: 'di-5',
    level: 'mid',
    topic: 'di',
    difficulty: 'medium',
    simple: {
      hi: 'inject() ek special counter hai jo sirf dukaan khulte waqt (constructor / field banate waqt) khula rehta hai. Baad mein jaoge (setTimeout ya subscribe ke andar) to shutter band milega — error NG0203.',
      en: 'inject() is a special counter that is open only while the shop is opening (constructor / field creation). Come later (inside setTimeout or subscribe) and the shutter is down — error NG0203.',
      bn: 'inject() একটা বিশেষ কাউন্টার যেটা শুধু দোকান খোলার সময় (constructor / field তৈরির সময়) খোলা থাকে। পরে গেলে (setTimeout বা subscribe-এর ভেতরে) শাটার বন্ধ পাবে — error NG0203।',
    },
    question: 'inject() function vs constructor injection — what is an injection context?',
    answer:
      'inject() retrieves a dependency from the current injector. It works only in an injection context: field initializers, constructors, provider factories, functional guards/interceptors/resolvers, or inside runInInjectionContext().',
    points: [
      'inject() works well with inheritance (no super() argument passing) and functional APIs.',
      'Calling inject() inside a setTimeout, subscribe callback or ngOnInit throws NG0203.',
      'Constructor injection is still valid; Angular offers a migration to inject().',
    ],
  },

  // ───────────── Change Detection ─────────────
  {
    id: 'cd-1',
    level: 'mid',
    topic: 'change-detection',
    difficulty: 'medium',
    simple: {
      hi: 'Change detection ek teacher hai jo attendance leta hai — pehli bench se shuru karke aakhri tak har bachche ko dekhta hai ki kuch badla to nahi. Zone.js wo ghanti hai jo har async kaam ke baad teacher ko bulati hai. Zoneless mein bachcha khud haath uthata hai (signal) — "mere paas kuch naya hai".',
      en: 'Change detection is a teacher taking attendance — starting from the first bench to the last, checking every child to see if anything changed. Zone.js is the bell that calls the teacher after every async task. In zoneless mode the child raises their own hand (signal) — "I have something new".',
      bn: 'Change detection হলো একজন শিক্ষক যিনি হাজিরা নেন — প্রথম বেঞ্চ থেকে শেষ বেঞ্চ পর্যন্ত প্রতিটা বাচ্চাকে দেখেন কিছু বদলেছে কিনা। Zone.js হলো সেই ঘণ্টা যেটা প্রতিটা async কাজের পর শিক্ষককে ডাকে। Zoneless-এ বাচ্চা নিজেই হাত তোলে (signal) — "আমার কাছে নতুন কিছু আছে"।',
    },
    diagram: 'change-detection',
    question: 'How does change detection work in Angular?',
    answer:
      'Change detection keeps the DOM in sync with component state. Angular walks the component tree from the root down, re-evaluates template bindings and updates the DOM where values changed.',
    points: [
      'With Zone.js, Angular patches async APIs (events, setTimeout, XHR, promises) and runs change detection after each async task.',
      'In zoneless mode, CD is scheduled by explicit notifications: signal updates read in templates, template event handlers, async pipe, markForCheck(), setting inputs via setInput().',
      'Each component can choose a strategy: Default (always checked) or OnPush (checked only when marked dirty).',
    ],
  },
  {
    id: 'cd-2',
    level: 'mid',
    topic: 'change-detection',
    difficulty: 'medium',
    simple: {
      hi: 'OnPush component ek busy bachcha hai jisne board lagaya hai "disturb mat karo". Teacher use tabhi check karta hai jab: naya parcel mile (new input reference), wo khud haath uthaye (event), ya uska signal badle. Purane parcel ke andar kuch badal diya (mutation) to teacher ko pata hi nahi chalega.',
      en: 'An OnPush component is a busy child with a "do not disturb" sign. The teacher checks it only when: it gets a new parcel (new input reference), it raises its hand (event), or its signal changes. If you change something inside the old parcel (mutation), the teacher will never know.',
      bn: 'OnPush component হলো একটা ব্যস্ত বাচ্চা যে "বিরক্ত কোরো না" বোর্ড ঝুলিয়েছে। শিক্ষক তাকে তখনই দেখেন যখন: নতুন পার্সেল আসে (new input reference), সে নিজে হাত তোলে (event), বা তার signal বদলায়। পুরনো পার্সেলের ভেতরে কিছু বদলালে (mutation) শিক্ষক জানতেই পারবেন না।',
    },
    diagram: 'change-detection',
    question: 'When does an OnPush component get re-rendered?',
    answer:
      'An OnPush component is skipped during change detection unless it has been marked dirty. It is marked dirty when:',
    points: [
      'An input receives a new reference (mutating an object does NOT count).',
      'An event handler bound in its template (or a child) fires.',
      'A signal read in its template changes.',
      'The async pipe in its template receives a new value.',
      'markForCheck() is called manually.',
      'Tip: use immutable updates — spread arrays/objects — with OnPush.',
    ],
  },
  {
    id: 'cd-3',
    level: 'senior',
    topic: 'change-detection',
    difficulty: 'hard',
    simple: {
      hi: 'Zone.js ek CCTV hai jo har kone par nazar rakhta hai aur har chhoti harkat par alarm bajata hai — bahut saare alarm. Zoneless mein CCTV hata diya; ab sirf jo cheez sach mein badli (signal), wahi ghanti bajati hai. Kam shor, tez app, chhota bundle.',
      en: 'Zone.js is a CCTV that watches every corner and rings an alarm at every tiny movement — lots of alarms. Zoneless removes the CCTV; now only the thing that really changed (a signal) rings the bell. Less noise, faster app, smaller bundle.',
      bn: 'Zone.js হলো একটা CCTV যেটা প্রতিটা কোণে নজর রাখে আর প্রতিটা ছোট নড়াচড়ায় অ্যালার্ম বাজায় — অনেক অ্যালার্ম। Zoneless-এ CCTV সরিয়ে দেওয়া হয়েছে; এখন শুধু যেটা সত্যিই বদলেছে (signal), সেটাই ঘণ্টা বাজায়। কম হইচই, দ্রুত অ্যাপ, ছোট bundle।',
    },
    question: 'What is zoneless Angular and why does it matter?',
    answer:
      'Zoneless Angular runs without Zone.js. Instead of patching every async API, Angular relies on explicit notifications (mostly signals) to schedule change detection. New projects in Angular 21 are zoneless by default.',
    points: [
      'Benefits: smaller bundle, faster startup, fewer unnecessary CD cycles, cleaner stack traces, better interop with native async/await.',
      'Enabled with provideZonelessChangeDetection() (default in v21 new apps), and zone.js is removed from polyfills.',
      'Code that mutates plain fields inside setTimeout or subscribe will not update the view — use signals or markForCheck().',
      'Use PendingTasks to tell SSR when the app is stable.',
    ],
  },
  {
    id: 'cd-4',
    level: 'mid',
    topic: 'change-detection',
    difficulty: 'medium',
    simple: {
      hi: 'markForCheck = notebook par sticky note lagana "agli baar mujhe zaroor check karna". detectChanges = "abhi isi waqt sirf mujhe check karo". tick() = "poori class ko abhi check karo".',
      en: 'markForCheck = putting a sticky note on the notebook: "check me next time for sure". detectChanges = "check only me, right now". tick() = "check the whole class right now".',
      bn: 'markForCheck = খাতায় স্টিকি নোট লাগানো "পরের বার আমাকে অবশ্যই চেক কোরো"। detectChanges = "এখনই শুধু আমাকে চেক করো"। tick() = "এখনই পুরো ক্লাস চেক করো"।',
    },
    question: 'markForCheck() vs detectChanges() vs ApplicationRef.tick()?',
    answer:
      'All three come from ChangeDetectorRef / ApplicationRef but behave differently.',
    points: [
      'markForCheck(): marks the component and all ancestors as dirty; they are checked on the next CD run. Typical for OnPush.',
      'detectChanges(): synchronously runs CD for this component and its children right now.',
      'ApplicationRef.tick(): runs change detection for the whole application.',
      'Detach() / reattach() can remove a component from CD entirely for heavy, rarely-changing views.',
    ],
  },

  // ───────────── Signals ─────────────
  {
    id: 'si-1',
    level: 'junior',
    topic: 'signals',
    difficulty: 'easy',
    simple: {
      hi: 'Signal ek Excel cell jaisa hai. A1 mein 2 likha (signal). B1 mein formula =A1*2 (computed). A1 ko 5 karo, B1 apne aap 10 ho jaata hai. effect ek alarm hai jo A1 badalte hi bajta hai — jaise "value save kar do".',
      en: 'A signal is like an Excel cell. You write 2 in A1 (signal). B1 has the formula =A1*2 (computed). Change A1 to 5 and B1 becomes 10 by itself. effect is an alarm that rings as soon as A1 changes — like "save the value".',
      bn: 'Signal হলো Excel-এর একটা cell-এর মতো। A1-এ লিখলে 2 (signal)। B1-এ ফর্মুলা =A1*2 (computed)। A1-কে 5 করলে B1 নিজে থেকেই 10 হয়ে যায়। effect হলো একটা অ্যালার্ম যেটা A1 বদলালেই বাজে — যেমন "মানটা save করে দাও"।',
    },
    diagram: 'signals',
    question: 'What are signals? Explain signal, computed and effect.',
    answer:
      'A signal is a reactive value wrapper that notifies consumers when it changes. Angular tracks where signals are read, so it can update exactly what depends on them.',
    points: [
      'signal(initial): writable — read with count(), write with .set() or .update().',
      'computed(fn): derived, read-only, lazily evaluated and memoized.',
      'effect(fn): runs side effects whenever signals it reads change (logging, localStorage, manual DOM).',
      'untracked(fn) reads signals without creating a dependency.',
    ],
    code: `count = signal(0);
double = computed(() => this.count() * 2);

constructor() {
  effect(() => console.log('count is', this.count()));
}

increment() {
  this.count.update((c) => c + 1);
}`,
  },
  {
    id: 'si-2',
    level: 'mid',
    topic: 'signals',
    difficulty: 'medium',
    simple: {
      hi: 'Signal ek scoreboard hai — kabhi bhi dekho, current score dikhega. Observable live commentary hai — events ek ke baad ek aate hain (goal hua, foul hua). Screen ki state ke liye scoreboard, aate-jaate events (HTTP, typing) ke liye commentary.',
      en: 'A signal is a scoreboard — look at it anytime and you see the current score. An Observable is live commentary — events come one after another (goal, foul). Use the scoreboard for screen state, the commentary for things that keep happening (HTTP, typing).',
      bn: 'Signal হলো স্কোরবোর্ড — যখন খুশি দেখো, বর্তমান স্কোর দেখাবে। Observable হলো লাইভ ধারাভাষ্য — ঘটনা একের পর এক আসে (গোল, ফাউল)। স্ক্রিনের state-এর জন্য স্কোরবোর্ড, আসা-যাওয়া ঘটনার (HTTP, typing) জন্য ধারাভাষ্য।',
    },
    question: 'Signals vs Observables — when should you use each?',
    answer:
      'Signals are synchronous, always have a current value and are ideal for state that the UI reads. Observables model streams of events over time and shine at async orchestration.',
    points: [
      'Signals: component state, derived values, template bindings, glitch-free updates.',
      'Observables: HTTP calls, websockets, debouncing, cancellation, combining multiple async sources.',
      'Bridge them with toSignal(obs$) and toObservable(sig) from @angular/core/rxjs-interop.',
      'toSignal subscribes immediately and unsubscribes on destroy automatically.',
    ],
    code: `users = toSignal(this.http.get<User[]>('/api/users'), { initialValue: [] });
query$ = toObservable(this.query);`,
  },
  {
    id: 'si-3',
    level: 'senior',
    topic: 'signals',
    difficulty: 'hard',
    simple: {
      hi: 'linkedSignal: restaurant ka menu badla to "aaj ki special dish" apne aap naye menu ki pehli dish ho jaati hai, par customer chahe to badal sakta hai. resource ek delivery boy hai — ID badlo to purana order cancel karke naya laata hai, aur batata rehta hai "raaste mein hoon (loading)", "pahunch gaya (value)", "gaadi kharab (error)".',
      en: 'linkedSignal: when the restaurant menu changes, "today\'s special" automatically becomes the first dish of the new menu, but the customer can still change it. resource is a delivery boy — change the ID and he cancels the old order and brings the new one, and keeps telling you "on the way (loading)", "arrived (value)", "bike broke down (error)".',
      bn: 'linkedSignal: রেস্টুরেন্টের মেনু বদলালে "আজকের স্পেশাল" নিজে থেকেই নতুন মেনুর প্রথম পদ হয়ে যায়, তবে খদ্দের চাইলে বদলাতে পারে। resource হলো ডেলিভারি বয় — ID বদলালে পুরনো অর্ডার বাতিল করে নতুনটা আনে, আর জানাতে থাকে "রাস্তায় আছি (loading)", "পৌঁছে গেছি (value)", "গাড়ি খারাপ (error)"।',
    },
    question: 'What are linkedSignal() and resource()?',
    answer:
      'linkedSignal creates a writable signal whose value is reset whenever a source signal changes. resource() loads async data based on reactive params and exposes value, status, error and isLoading as signals.',
    points: [
      'linkedSignal: e.g. "selected option" that resets to the first option when the options list changes, but the user can still change it.',
      'resource: re-runs the loader when params change and aborts the previous request.',
      'httpResource() is a resource built on HttpClient (so interceptors apply).',
      'rxResource() uses an Observable-returning loader.',
    ],
    code: `options = input.required<string[]>();
selected = linkedSignal(() => this.options()[0]);

userId = signal(1);
user = resource({
  params: () => ({ id: this.userId() }),
  loader: ({ params, abortSignal }) =>
    fetch('/api/users/' + params.id, { signal: abortSignal }).then((r) => r.json()),
});
// template: @if (user.isLoading()) { ... } {{ user.value()?.name }}`,
  },
  {
    id: 'si-4',
    level: 'mid',
    topic: 'signals',
    difficulty: 'medium',
    simple: {
      hi: 'effect ek alarm clock hai — uska kaam bahar ki duniya ko batana hai (localStorage, logging). Usse ek signal se doosra signal bharna aisa hai jaise alarm clock se chai banwana — galat tool. Derived value ke liye computed() use karo.',
      en: 'effect is an alarm clock — its job is to tell the outside world (localStorage, logging). Using it to fill one signal from another is like asking an alarm clock to make tea — wrong tool. Use computed() for derived values.',
      bn: 'effect হলো অ্যালার্ম ঘড়ি — তার কাজ বাইরের দুনিয়াকে জানানো (localStorage, logging)। এক signal থেকে আরেক signal ভরতে ওটা ব্যবহার করা মানে অ্যালার্ম ঘড়ি দিয়ে চা বানানো — ভুল যন্ত্র। Derived value-র জন্য computed() ব্যবহার করো।',
    },
    question: 'What are common mistakes with effect()?',
    answer:
      'effect() is meant for side effects that sync Angular state to the outside world. Using it to copy one signal into another is an anti-pattern.',
    points: [
      'Do not use effect to derive state — use computed() or linkedSignal() instead.',
      'Writing to signals inside effects can create loops and extra CD cycles.',
      'Effects run asynchronously during change detection, not immediately when a signal changes.',
      'Use untracked() for values you read but should not trigger the effect.',
      'Effects created in components are destroyed automatically with the component.',
    ],
  },

  // ───────────── RxJS ─────────────
  {
    id: 'rx-1',
    level: 'fresher',
    topic: 'rxjs',
    difficulty: 'easy',
    simple: {
      hi: 'Promise ek courier parcel hai — ek baar aata hai, bas. Observable newspaper subscription hai — roz naya paper aata hai, aur jab chaho cancel kar sakte ho. Aur newspaper tab tak aana shuru nahi hota jab tak aap subscribe na karo (lazy).',
      en: 'A Promise is a courier parcel — it comes once, that\'s it. An Observable is a newspaper subscription — a new paper comes every day, and you can cancel whenever you want. And the newspaper doesn\'t start coming until you subscribe (lazy).',
      bn: 'Promise হলো কুরিয়ার পার্সেল — একবারই আসে, ব্যস। Observable হলো খবরের কাগজের সাবস্ক্রিপশন — রোজ নতুন কাগজ আসে, আর যখন খুশি বন্ধ করা যায়। আর subscribe না করা পর্যন্ত কাগজ আসাই শুরু হয় না (lazy)।',
    },
    question: 'Observable vs Promise?',
    answer:
      'Both handle async work, but an Observable is a lazy stream that can emit many values over time and can be cancelled; a Promise is eager and resolves once.',
    points: [
      'Promise: single value, eager (runs immediately), not cancellable.',
      'Observable: 0..N values, lazy (runs on subscribe), cancellable via unsubscribe.',
      'Observables have rich operators (map, filter, retry, debounceTime, switchMap).',
      'Convert: from(promise) and firstValueFrom(obs$) / lastValueFrom(obs$).',
    ],
  },
  {
    id: 'rx-2',
    level: 'junior',
    topic: 'rxjs',
    difficulty: 'medium',
    simple: {
      hi: 'Subject live radio hai — baad mein tune kiya to pehle ka gaana miss. BehaviorSubject tune karte hi abhi chal raha gaana suna deta hai. ReplaySubject pichhle kuch gaane record karke sunata hai. AsyncSubject sirf show khatam hone par aakhri gaana sunata hai.',
      en: 'Subject is live radio — tune in late and you missed the earlier song. BehaviorSubject plays the song that is on right now as soon as you tune in. ReplaySubject records the last few songs and plays them for you. AsyncSubject plays only the last song, and only when the show ends.',
      bn: 'Subject হলো লাইভ রেডিও — দেরিতে টিউন করলে আগের গান মিস। BehaviorSubject টিউন করলেই এখন যে গান চলছে সেটা শুনিয়ে দেয়। ReplaySubject শেষ কয়েকটা গান রেকর্ড করে শোনায়। AsyncSubject শুধু শো শেষ হলে শেষ গানটা শোনায়।',
    },
    question: 'Explain Subject, BehaviorSubject, ReplaySubject and AsyncSubject.',
    answer:
      'A Subject is both an Observable and an Observer — it multicasts values to many subscribers. The variants differ in what late subscribers receive.',
    points: [
      'Subject: no initial value; late subscribers only get future values.',
      'BehaviorSubject: requires an initial value and emits the latest value to new subscribers. Has .value / getValue().',
      'ReplaySubject(n): replays the last n values to new subscribers.',
      'AsyncSubject: emits only the last value, and only when it completes.',
    ],
  },
  {
    id: 'rx-3',
    level: 'mid',
    topic: 'rxjs',
    difficulty: 'hard',
    simple: {
      hi: 'Bachcha baar-baar mummy se cheez maang raha hai. switchMap: mummy purani maang chhod kar sirf latest sunti hai. mergeMap: sab ek saath laati hai. concatMap: line mein ek-ek karke. exhaustMap: ek kaam chal raha hai to beech ki nayi maang ignore. Neeche diagram dekho.',
      en: 'A child keeps asking mum for things. switchMap: mum drops the old request and listens only to the latest. mergeMap: she brings everything at once. concatMap: one by one, in a queue. exhaustMap: if she is busy with one task, new requests in between are ignored. See the diagram below.',
      bn: 'বাচ্চা বারবার মায়ের কাছে জিনিস চাইছে। switchMap: মা পুরনো চাওয়া ছেড়ে শুধু সর্বশেষটা শোনে। mergeMap: সব একসাথে এনে দেয়। concatMap: লাইনে একে একে। exhaustMap: একটা কাজ চলছে তো মাঝের নতুন চাওয়া উপেক্ষা। নিচের diagram দেখো।',
    },
    diagram: 'flattening',
    question: 'switchMap vs mergeMap vs concatMap vs exhaustMap?',
    answer:
      'All four map each source value to an inner Observable and flatten the results. They differ in how they handle overlapping inner Observables.',
    points: [
      'switchMap: cancels the previous inner observable — perfect for search/type-ahead, route param changes.',
      'mergeMap: runs all inner observables in parallel — e.g. uploading many files.',
      'concatMap: queues them and runs one after another, preserving order — e.g. sequential saves.',
      'exhaustMap: ignores new values while an inner is active — e.g. prevent double login submit.',
    ],
  },
  {
    id: 'rx-4',
    level: 'mid',
    topic: 'rxjs',
    difficulty: 'medium',
    simple: {
      hi: 'Google search box socho. Har letter par search mat bhejo — user ke rukne ka 300ms wait karo (debounceTime). Wahi text dobara aaya to skip (distinctUntilChanged). Naya text aaya to purani search cancel (switchMap), taaki purana result naye ko overwrite na kare.',
      en: 'Think of the Google search box. Don\'t send a search for every letter — wait 300ms for the user to pause (debounceTime). Skip it if the same text comes again (distinctUntilChanged). When new text arrives, cancel the old search (switchMap), so an old result never overwrites the new one.',
      bn: 'Google-এর search box ভাবো। প্রতিটা অক্ষরে সার্চ পাঠিও না — ইউজার থামার জন্য 300ms অপেক্ষা করো (debounceTime)। একই লেখা আবার এলে বাদ দাও (distinctUntilChanged)। নতুন লেখা এলে পুরনো সার্চ বাতিল (switchMap), যাতে পুরনো রেজাল্ট নতুনটাকে মুছে না দেয়।',
    },
    question: 'Implement a type-ahead search with RxJS.',
    answer:
      'Combine debounceTime to wait for the user to stop typing, distinctUntilChanged to skip duplicates, and switchMap to cancel outdated requests.',
    code: `results$ = this.searchCtrl.valueChanges.pipe(
  debounceTime(300),
  map((v) => v.trim()),
  distinctUntilChanged(),
  filter((v) => v.length > 1),
  switchMap((term) =>
    this.api.search(term).pipe(catchError(() => of([]))),
  ),
);`,
  },
  {
    id: 'rx-5',
    level: 'senior',
    topic: 'rxjs',
    difficulty: 'medium',
    simple: {
      hi: 'Cold observable Netflix hai — har user ke liye movie shuru se chalti hai (har subscriber ki alag HTTP call). Hot observable TV channel hai — sab ek hi live broadcast dekhte hain. shareReplay ek recorder hai — ek baar record kiya, baad mein aane wale ko bhi wahi dikha do, dobara download nahi.',
      en: 'A cold observable is Netflix — the movie starts from the beginning for every user (a separate HTTP call per subscriber). A hot observable is a TV channel — everyone watches the same live broadcast. shareReplay is a recorder — record once and show the same thing to latecomers, no new download.',
      bn: 'Cold observable হলো Netflix — প্রতিটা ইউজারের জন্য সিনেমা শুরু থেকে চলে (প্রতিটা subscriber-এর আলাদা HTTP call)। Hot observable হলো TV চ্যানেল — সবাই একই লাইভ সম্প্রচার দেখে। shareReplay হলো রেকর্ডার — একবার রেকর্ড করো, পরে যে আসবে তাকেও সেটাই দেখাও, আবার ডাউনলোড নয়।',
    },
    question: 'What are hot and cold observables? What does shareReplay do?',
    answer:
      'A cold observable starts a new producer for each subscriber (e.g. each subscription to http.get sends a new request). A hot observable shares one producer among subscribers (e.g. DOM events, Subjects).',
    points: [
      'share() makes a cold observable hot while it has subscribers.',
      'shareReplay({ bufferSize: 1, refCount: true }) shares and caches the latest value for late subscribers — useful for caching HTTP results.',
      'Without refCount: true, shareReplay keeps the source subscribed forever.',
    ],
  },
  {
    id: 'rx-6',
    level: 'junior',
    topic: 'rxjs',
    difficulty: 'easy',
    simple: {
      hi: 'Subscribe karna nal kholna hai. Kaam ho gaya aur nal khula chhod diya to paani (memory) bahta rahega. async pipe aur toSignal automatic nal hain — component jaate hi khud band. Manual subscribe kiya to takeUntilDestroyed() lagao.',
      en: 'Subscribing is opening a tap. If the job is done and you leave the tap open, water (memory) keeps flowing. The async pipe and toSignal are automatic taps — they close by themselves when the component goes away. If you subscribe manually, add takeUntilDestroyed().',
      bn: 'Subscribe করা মানে কল খোলা। কাজ শেষ, অথচ কল খোলা রেখে দিলে জল (মেমরি) পড়তেই থাকবে। async pipe আর toSignal হলো অটোমেটিক কল — component চলে গেলে নিজেই বন্ধ হয়। নিজে subscribe করলে takeUntilDestroyed() লাগাও।',
    },
    question: 'How do you avoid memory leaks with subscriptions?',
    answer:
      'Long-lived observables (intervals, store selects, valueChanges) must be unsubscribed when the component is destroyed.',
    points: [
      'Prefer the async pipe or toSignal() — they unsubscribe automatically.',
      'Use takeUntilDestroyed() for manual subscriptions.',
      'Use take(1) / first() when you need only one value.',
      'HttpClient observables complete after the response, so they usually do not leak — but cancelling on destroy is still good.',
    ],
  },

  // ───────────── Routing ─────────────
  {
    id: 'ro-1',
    level: 'junior',
    topic: 'routing',
    difficulty: 'easy',
    simple: {
      hi: 'Mall mein ghuste hi saari dukaanein aapke saamne laa kar nahi rakhi jaati — jis floor par jaate ho wahi dikhta hai. Lazy loading mein bhi jo page user khole, sirf uska code download hota hai, isliye pehli screen jaldi khulti hai.',
      en: 'When you enter a mall, they don\'t bring every shop to you — you see the floor you go to. With lazy loading, only the code for the page the user opens is downloaded, so the first screen opens quickly.',
      bn: 'মলে ঢুকলেই সব দোকান তোমার সামনে এনে রাখা হয় না — যে ফ্লোরে যাও, সেটাই দেখো। Lazy loading-এও ইউজার যে পেজ খোলে, শুধু তার কোড ডাউনলোড হয়, তাই প্রথম স্ক্রিন তাড়াতাড়ি খোলে।',
    },
    diagram: 'lazy-loading',
    question: 'How do you configure lazy loading in Angular routing?',
    answer:
      'Use loadComponent for a single standalone component or loadChildren for a set of child routes. The code is split into a separate chunk and downloaded only when the route is visited.',
    code: `export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'admin',
    canMatch: [adminGuard],
    loadChildren: () => import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
  {
    path: 'profile/:id',
    loadComponent: () => import('./profile/profile').then((m) => m.Profile),
  },
  { path: '**', component: NotFound },
];`,
  },
  {
    id: 'ro-2',
    level: 'junior',
    topic: 'routing',
    difficulty: 'medium',
    simple: {
      hi: 'Guard building ka security guard hai. canActivate: "ID card dikhao tabhi andar". canDeactivate: "form adhoora hai, sach mein jaana hai?". canMatch: "aap is floor ke liye allowed hi nahi, lift wahan rukegi bhi nahi" — us page ka code download bhi nahi hota.',
      en: 'A guard is the building\'s security guard. canActivate: "show your ID card, then come in". canDeactivate: "your form is incomplete, do you really want to leave?". canMatch: "you are not allowed on this floor, the lift won\'t even stop there" — that page\'s code isn\'t even downloaded.',
      bn: 'Guard হলো বিল্ডিংয়ের সিকিউরিটি গার্ড। canActivate: "আইডি কার্ড দেখাও, তবেই ভেতরে"। canDeactivate: "ফর্ম অসম্পূর্ণ, সত্যিই যাবে?"। canMatch: "এই ফ্লোরে তোমার অনুমতি নেই, লিফট ওখানে থামবেই না" — সেই পেজের কোড ডাউনলোডও হয় না।',
    },
    question: 'What route guards exist? Write a functional auth guard.',
    answer:
      'Guards decide whether navigation can proceed. They return boolean, UrlTree (redirect), RedirectCommand, or an Observable/Promise of these.',
    points: [
      'canActivate: can the route be entered?',
      'canActivateChild: same, for child routes.',
      'canDeactivate: can the user leave? (unsaved changes)',
      'canMatch: should this route config even match? Prevents lazy chunk download.',
      'resolve: pre-fetch data before activation.',
      'Functional guards (CanActivateFn) are the recommended style; class-based guards still work (their v15.2 deprecation was reverted in v16).',
    ],
    code: `export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};`,
  },
  {
    id: 'ro-3',
    level: 'junior',
    topic: 'routing',
    difficulty: 'medium',
    simple: {
      hi: 'URL ek address hai: /profile/42 mein 42 ghar number hai. snapshot ek photo hai — ek baar dekha, bas. paramMap live CCTV hai — number badla to pata chalega. withComponentInputBinding matlab postman ghar number seedha aapke haath (input) mein de deta hai.',
      en: 'The URL is an address: in /profile/42, 42 is the house number. snapshot is a photo — you look once, that\'s it. paramMap is live CCTV — if the number changes, you\'ll know. withComponentInputBinding means the postman puts the house number straight into your hand (input).',
      bn: 'URL হলো ঠিকানা: /profile/42-এ 42 হলো বাড়ির নম্বর। snapshot হলো একটা ছবি — একবার দেখলে, ব্যস। paramMap হলো লাইভ CCTV — নম্বর বদলালে জানতে পারবে। withComponentInputBinding মানে পিওন বাড়ির নম্বর সরাসরি তোমার হাতে (input) দিয়ে দেয়।',
    },
    question: 'How do you read route params? Snapshot vs observable vs component input binding.',
    answer:
      'ActivatedRoute gives access to route params, query params and data.',
    points: [
      'route.snapshot.paramMap.get("id") — read once; it will not update if the same component is reused for another id.',
      'route.paramMap observable — updates when params change on the same component.',
      'withComponentInputBinding() in provideRouter binds params, query params and data directly to component inputs — the cleanest option.',
    ],
    code: `// app.config.ts
provideRouter(routes, withComponentInputBinding());

// profile.ts — route 'profile/:id'
export class Profile {
  id = input.required<string>();
  user = httpResource<User>(() => '/api/users/' + this.id());
}`,
  },
  {
    id: 'ro-4',
    level: 'mid',
    topic: 'routing',
    difficulty: 'medium',
    simple: {
      hi: 'Resolver waiter hai jo kehta hai "table tabhi dikhaunga jab khana ready ho" — page data ke saath khulta hai par thoda wait. Preloading matlab jab aap starter kha rahe ho, waiter main course pehle hi la kar rakh deta hai — baad mein turant milta hai.',
      en: 'A resolver is a waiter who says "I\'ll show you the table only when the food is ready" — the page opens with data, but you wait a bit. Preloading means while you eat the starter, the waiter brings the main course out of the kitchen in advance — later you get it instantly.',
      bn: 'Resolver হলো এমন ওয়েটার যে বলে "খাবার তৈরি হলে তবেই টেবিল দেখাব" — পেজ data নিয়ে খোলে কিন্তু একটু অপেক্ষা। Preloading মানে তুমি স্টার্টার খাচ্ছ, ওয়েটার মেইন কোর্স আগেই রান্নাঘর থেকে এনে রাখছে — পরে সঙ্গে সঙ্গে পাও।',
    },
    question: 'What are resolvers and preloading strategies?',
    answer:
      'A resolver fetches data before a route activates, so the component receives ready data. Preloading strategies download lazy chunks in the background after the app loads.',
    points: [
      'ResolveFn<T> functional resolvers; data is available via route data or component inputs.',
      'Downside of resolvers: navigation waits for data — show a skeleton instead when UX matters.',
      'PreloadAllModules preloads all lazy routes; custom strategies can preload by flag or network quality.',
      'withPreloading(PreloadAllModules) in provideRouter.',
    ],
  },

  // ───────────── Forms ─────────────
  {
    id: 'fo-1',
    level: 'fresher',
    topic: 'forms',
    difficulty: 'easy',
    simple: {
      hi: 'Template-driven form kaagaz ka form hai — sab kuch form par hi likha hai, chhote kaam ke liye theek. Reactive form Excel sheet jaisa hai — rules aur values code mein control hote hain. Bade, dynamic forms ke liye best, aur test karna aasaan.',
      en: 'A template-driven form is a paper form — everything is written on the form itself, fine for small jobs. A reactive form is like an Excel sheet — rules and values are controlled in code. Best for big, dynamic forms, and easy to test.',
      bn: 'Template-driven form হলো কাগজের ফর্ম — সবকিছু ফর্মেই লেখা, ছোট কাজের জন্য ঠিক আছে। Reactive form হলো Excel শিটের মতো — নিয়ম আর মান কোডে নিয়ন্ত্রিত হয়। বড়, ডায়নামিক ফর্মের জন্য সেরা, আর টেস্ট করা সহজ।',
    },
    question: 'Template-driven vs Reactive forms?',
    answer:
      'Template-driven forms define the form model implicitly in the template with ngModel. Reactive forms define the model explicitly in the component with FormControl / FormGroup.',
    points: [
      'Template-driven: simple forms, less code, asynchronous model, harder to unit test.',
      'Reactive: complex/dynamic forms, synchronous access, strongly typed, easy to test, observable valueChanges.',
      'Angular 21 introduces experimental Signal Forms (@angular/forms/signals) where the model is a signal.',
    ],
  },
  {
    id: 'fo-2',
    level: 'junior',
    topic: 'forms',
    difficulty: 'medium',
    simple: {
      hi: 'FormGroup poora form hai, FormControl ek input box, aur FormArray ek list jismein aur boxes jod sakte ho — jaise "Add another phone number" button. Validators har box ke rules hain: "zaroori hai", "sahi email ho", "kam se kam 8 letters".',
      en: 'FormGroup is the whole form, FormControl is one input box, and FormArray is a list you can add more boxes to — like an "Add another phone number" button. Validators are each box\'s rules: "required", "must be a valid email", "at least 8 letters".',
      bn: 'FormGroup হলো পুরো ফর্ম, FormControl একটা input box, আর FormArray একটা লিস্ট যেখানে আরও box যোগ করা যায় — যেমন "আরেকটা ফোন নম্বর যোগ করো" বোতাম। Validators হলো প্রতিটা box-এর নিয়ম: "আবশ্যক", "সঠিক email হতে হবে", "অন্তত ৮টা অক্ষর"।',
    },
    question: 'Build a typed reactive form with validation and a FormArray.',
    answer:
      'Use NonNullableFormBuilder for strongly typed controls that reset to their initial value instead of null.',
    code: `private fb = inject(NonNullableFormBuilder);

form = this.fb.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]],
  phones: this.fb.array([this.fb.control('')]),
});

get phones() {
  return this.form.controls.phones;
}

addPhone() {
  this.phones.push(this.fb.control(''));
}

submit() {
  if (this.form.invalid) return this.form.markAllAsTouched();
  console.log(this.form.getRawValue());
}`,
  },
  {
    id: 'fo-3',
    level: 'mid',
    topic: 'forms',
    difficulty: 'hard',
    simple: {
      hi: 'Validator ek ticket checker hai. Sync validator turant check karta hai (email ka format sahi hai?). Async validator server se poochta hai (ye username pehle se liya hua to nahi?) — jawab aane tak form PENDING. Cross-field validator do cheezein milata hai — password aur confirm password same hain?',
      en: 'A validator is a ticket checker. A sync validator checks instantly (is the email format right?). An async validator asks the server (is this username already taken?) — until the answer comes, the form is PENDING. A cross-field validator compares two things — do password and confirm password match?',
      bn: 'Validator হলো টিকিট চেকার। Sync validator সঙ্গে সঙ্গে চেক করে (email-এর ফরম্যাট ঠিক আছে?)। Async validator সার্ভারকে জিজ্ঞেস করে (এই username কি আগেই নেওয়া?) — উত্তর না আসা পর্যন্ত ফর্ম PENDING। Cross-field validator দুটো জিনিস মেলায় — password আর confirm password কি এক?',
    },
    question: 'How do you write custom sync, async and cross-field validators?',
    answer:
      'A validator is a function that receives an AbstractControl and returns null (valid) or an error object. Async validators return an Observable/Promise of the same.',
    points: [
      'Cross-field validators are attached to the FormGroup, not to a single control.',
      'Async validators run only after all sync validators pass; the control status is PENDING meanwhile.',
      'Use updateOn: "blur" to reduce async validator calls.',
    ],
    code: `export const matchPasswords: ValidatorFn = (group) => {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirm')?.value;
  return pass === confirm ? null : { mismatch: true };
};

export function usernameTaken(api: UserApi): AsyncValidatorFn {
  return (ctrl) =>
    timer(400).pipe(
      switchMap(() => api.exists(ctrl.value)),
      map((taken) => (taken ? { taken: true } : null)),
    );
}`,
  },
  {
    id: 'fo-4',
    level: 'senior',
    topic: 'forms',
    difficulty: 'hard',
    simple: {
      hi: 'Aapne ek naya star-rating widget banaya, par Angular forms ko nahi pata usse value kaise padhein. ControlValueAccessor ek adapter plug hai (jaise Indian plug ko UK socket mein lagane wala), taaki aapka widget formControlName ke saath normal input jaisa kaam kare.',
      en: 'You built a new star-rating widget, but Angular forms don\'t know how to read a value from it. ControlValueAccessor is an adapter plug (like the one that lets an Indian plug fit a UK socket), so your widget works with formControlName just like a normal input.',
      bn: 'তুমি একটা নতুন star-rating widget বানালে, কিন্তু Angular forms জানে না ওটা থেকে মান কীভাবে পড়বে। ControlValueAccessor হলো একটা অ্যাডাপ্টার প্লাগ (যেমন ভারতীয় প্লাগ UK সকেটে লাগানোর অ্যাডাপ্টার), যাতে তোমার widget formControlName-এর সাথে সাধারণ input-এর মতো কাজ করে।',
    },
    question: 'What is ControlValueAccessor and when do you need it?',
    answer:
      'ControlValueAccessor (CVA) is the bridge between the Angular forms API and a custom form component, so it can be used with formControlName or ngModel like a native input.',
    points: [
      'writeValue(value): model → view.',
      'registerOnChange(fn): call fn when the view value changes.',
      'registerOnTouched(fn): call fn on blur.',
      'setDisabledState(isDisabled): optional.',
      'Register it with the NG_VALUE_ACCESSOR token using useExisting + multi: true.',
    ],
    code: `@Component({
  selector: 'app-rating',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: Rating, multi: true }],
  template: '...',
})
export class Rating implements ControlValueAccessor {
  value = signal(0);
  private onChange = (v: number) => {};
  private onTouched = () => {};

  writeValue(v: number) { this.value.set(v ?? 0); }
  registerOnChange(fn: (v: number) => void) { this.onChange = fn; }
  registerOnTouched(fn: () => void) { this.onTouched = fn; }

  rate(v: number) {
    this.value.set(v);
    this.onChange(v);
    this.onTouched();
  }
}`,
  },

  // ───────────── HTTP ─────────────
  {
    id: 'ht-1',
    level: 'fresher',
    topic: 'http',
    difficulty: 'easy',
    simple: {
      hi: 'HttpClient aapka delivery boy hai jo server se data laata hai. provideHttpClient() se use naukri par rakhte ho. Mazedaar baat: jab tak subscribe na karo, wo nikalta hi nahi — order confirm karna padta hai.',
      en: 'HttpClient is your delivery boy who fetches data from the server. provideHttpClient() hires him. Fun fact: he doesn\'t leave until you subscribe — you have to confirm the order.',
      bn: 'HttpClient হলো তোমার ডেলিভারি বয় যে সার্ভার থেকে data আনে। provideHttpClient() দিয়ে তাকে চাকরিতে রাখো। মজার কথা: subscribe না করা পর্যন্ত সে বেরোয়ই না — অর্ডার কনফার্ম করতে হয়।',
    },
    question: 'How do you set up and use HttpClient in a standalone app?',
    answer:
      'Register it with provideHttpClient() in the application config, then inject HttpClient into services. HttpClient methods return cold Observables — the request is sent only on subscribe.',
    code: `// app.config.ts
provideHttpClient(withFetch(), withInterceptors([authInterceptor]));

// user-api.ts
@Injectable({ providedIn: 'root' })
export class UserApi {
  private http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('/api/users', { params: { page: 1 } });
  }
}`,
  },
  {
    id: 'ht-2',
    level: 'junior',
    topic: 'http',
    difficulty: 'medium',
    simple: {
      hi: 'Interceptor airport ke security checkpoint jaisa hai. Har request (passenger) ek-ek checkpoint se guzarti hai: ek token ka stamp lagata hai, ek log likhta hai, ek error sambhalta hai. Har API call mein alag code likhne ki zaroorat nahi.',
      en: 'An interceptor is like an airport security checkpoint. Every request (passenger) passes through the checkpoints one by one: one stamps the token, one writes a log, one handles errors. No need to write separate code in every API call.',
      bn: 'Interceptor হলো এয়ারপোর্টের সিকিউরিটি চেকপয়েন্টের মতো। প্রতিটা request (যাত্রী) একে একে চেকপয়েন্ট পেরোয়: একটা token-এর স্ট্যাম্প দেয়, একটা লগ লেখে, একটা error সামলায়। প্রতিটা API call-এ আলাদা কোড লিখতে হয় না।',
    },
    diagram: 'interceptors',
    question: 'What are HTTP interceptors? Write one that adds an auth token.',
    answer:
      'Interceptors are middleware for HttpClient: they can modify requests and responses, add headers, log, cache, retry or handle errors globally. Requests are immutable, so use req.clone().',
    points: [
      'Functional interceptors (HttpInterceptorFn) are registered with withInterceptors([...]).',
      'They run in the order provided for requests, and in reverse order for responses.',
      'inject() works at the top of a functional interceptor (injection context) — not inside RxJS callbacks.',
    ],
    code: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  const router = inject(Router);

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } })
    : req;

  return next(authReq).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) router.navigate(['/login']);
      return throwError(() => err);
    }),
  );
};`,
  },
  {
    id: 'ht-3',
    level: 'mid',
    topic: 'http',
    difficulty: 'medium',
    simple: {
      hi: 'Network kabhi-kabhi atak jaata hai, jaise phone call drop ho jaaye. retry matlab "dobara call karo, 3 baar tak". catchError matlab "phir bhi na lage to user ko pyaar se batao, app crash mat karo".',
      en: 'Sometimes the network gets stuck, like a dropped phone call. retry means "call again, up to 3 times". catchError means "if it still fails, tell the user nicely — don\'t crash the app".',
      bn: 'নেটওয়ার্ক মাঝে মাঝে আটকে যায়, যেন ফোন কল কেটে গেল। retry মানে "আবার কল করো, ৩ বার পর্যন্ত"। catchError মানে "তারপরও না হলে ইউজারকে সুন্দর করে জানাও, অ্যাপ crash কোরো না"।',
    },
    question: 'How do you handle HTTP errors and retries?',
    answer:
      'Use RxJS operators on the request Observable and a global ErrorHandler for unexpected errors.',
    points: [
      'catchError to recover (return fallback data) or rethrow with throwError.',
      'retry({ count: 3, delay: 1000 }) for transient network errors — avoid retrying non-idempotent POSTs blindly.',
      'An error interceptor centralizes 401/403/500 handling and toasts.',
      'Provide a custom ErrorHandler class to log uncaught errors to a monitoring service.',
    ],
  },

  // ───────────── Performance ─────────────
  {
    id: 'pe-1',
    level: 'mid',
    topic: 'performance',
    difficulty: 'medium',
    simple: {
      hi: 'App ko fast karna matlab teen kaam: kam saaman download karo (lazy loading, @defer), kam baar dobara banao (OnPush, signals, track), aur bhaari kaam baad mein karo. Jaise trip par sirf zaroori bag le jaate ho, baaki baad mein mangwa lete ho.',
      en: 'Making an app fast means three things: download less (lazy loading, @defer), rebuild less often (OnPush, signals, track), and do heavy work later. Like packing only the essential bags for a trip and having the rest sent later.',
      bn: 'অ্যাপ দ্রুত করা মানে তিনটে কাজ: কম জিনিস ডাউনলোড (lazy loading, @defer), কম বার আবার বানানো (OnPush, signals, track), আর ভারী কাজ পরে করা। যেমন বেড়াতে গেলে শুধু দরকারি ব্যাগ নাও, বাকিটা পরে আনিয়ে নাও।',
    },
    question: 'How would you optimize the performance of an Angular application?',
    answer:
      'Reduce what is downloaded, reduce what is re-rendered and reduce work on the main thread.',
    points: [
      'Lazy load routes and use @defer for heavy, below-the-fold components.',
      'Use OnPush + signals (or zoneless) to minimize change detection.',
      'Always track by a stable id in @for; virtual scrolling (CDK) for long lists.',
      'Pure pipes / computed() instead of functions called in templates.',
      'NgOptimizedImage (ngSrc) for images: lazy loading, priority hints, srcset.',
      'SSR + hydration for faster first paint and SEO.',
      'Watch bundle budgets, analyze with source-map-explorer, avoid large libraries.',
    ],
  },
  {
    id: 'pe-2',
    level: 'mid',
    topic: 'performance',
    difficulty: 'medium',
    simple: {
      hi: '@defer matlab "ye bhaari cheez abhi mat laao, zaroorat ho tab laana". Lambe page par neeche wala chart — user scroll karke wahan pahunche (on viewport) tabhi uska code download ho. Tab tak placeholder dikhao.',
      en: '@defer means "don\'t bring this heavy thing now, bring it when it\'s needed". For a chart at the bottom of a long page, its code downloads only when the user scrolls there (on viewport). Show a placeholder until then.',
      bn: '@defer মানে "এই ভারী জিনিসটা এখন এনো না, দরকার হলে এনো"। লম্বা পেজের নিচের chart — ইউজার স্ক্রল করে ওখানে পৌঁছালে (on viewport) তবেই তার কোড ডাউনলোড হবে। ততক্ষণ placeholder দেখাও।',
    },
    question: 'What are @defer blocks?',
    answer:
      '@defer lazily loads the components, directives and pipes inside the block. Angular splits them into a separate chunk and loads it when a trigger fires.',
    points: [
      'Triggers: on idle (default), on viewport, on interaction, on hover, on immediate, on timer(2s), when condition.',
      'prefetch can download the chunk earlier than it renders.',
      '@placeholder, @loading and @error sub-blocks control what is shown meanwhile.',
      'Dependencies inside must be standalone and not referenced elsewhere in the file to be deferred.',
    ],
    code: `@defer (on viewport; prefetch on idle) {
  <app-heavy-chart [data]="data()" />
} @placeholder (minimum 300ms) {
  <div class="skeleton"></div>
} @loading (after 100ms) {
  <app-spinner />
} @error {
  <p>Failed to load the chart</p>
}`,
  },
  {
    id: 'pe-3',
    level: 'senior',
    topic: 'performance',
    difficulty: 'hard',
    simple: {
      hi: 'SSR matlab restaurant khana plate mein laga kar deta hai — user ko turant dikhta hai (HTML server se aaya). Hydration matlab plate mein chammach rakh dena — ab page click ke liye ready hai. Incremental hydration: chammach sirf us dish mein jo customer khane wala hai.',
      en: 'SSR means the restaurant serves food already plated — the user sees it instantly (HTML comes from the server). Hydration means putting a spoon on the plate — now the page is ready to be clicked. Incremental hydration: a spoon only in the dish the customer is about to eat.',
      bn: 'SSR মানে রেস্টুরেন্ট খাবার প্লেটে সাজিয়ে দেয় — ইউজার সঙ্গে সঙ্গে দেখে (HTML সার্ভার থেকে আসে)। Hydration মানে প্লেটে চামচ রেখে দেওয়া — এবার পেজ ক্লিকের জন্য তৈরি। Incremental hydration: চামচ শুধু সেই পদে যেটা খদ্দের এখন খাবে।',
    },
    question: 'Explain SSR, hydration and incremental hydration.',
    answer:
      'Server-Side Rendering renders HTML on the server so users and crawlers see content immediately. Hydration reuses that server DOM on the client instead of destroying and re-rendering it.',
    points: [
      'Enable with ng add @angular/ssr; hydration via provideClientHydration().',
      'Incremental hydration (withIncrementalHydration()) keeps @defer blocks dehydrated until a trigger: @defer (hydrate on viewport).',
      'Event replay captures user clicks before hydration finishes.',
      'Avoid direct DOM/window access on the server — use afterNextRender or isPlatformBrowser.',
      'Route-level render modes: server, client or prerender (SSG).',
    ],
  },

  // ───────────── Testing ─────────────
  {
    id: 'te-1',
    level: 'junior',
    topic: 'testing',
    difficulty: 'medium',
    simple: {
      hi: 'Unit test car ka crash test hai — road par jaane se pehle check karo ki brake (button) dabane par gaadi rukti hai. TestBed ek nakli garage hai jahan component ko asli services ki jagah dummy parts (mocks) ke saath chala kar dekhte ho.',
      en: 'A unit test is a car\'s crash test — before going on the road, check that pressing the brake (button) stops the car. TestBed is a fake garage where you run the component with dummy parts (mocks) instead of real services.',
      bn: 'Unit test হলো গাড়ির crash test — রাস্তায় নামার আগে দেখে নাও brake (বোতাম) চাপলে গাড়ি থামে কিনা। TestBed হলো একটা নকল গ্যারেজ, যেখানে আসল services-এর বদলে ডামি পার্টস (mocks) দিয়ে component চালিয়ে দেখো।',
    },
    question: 'How do you unit test a component with TestBed?',
    answer:
      'TestBed creates a testing module where you import the standalone component and provide mocks. Angular 21 CLI uses Vitest as the default test runner (Karma/Jasmine is still possible).',
    points: [
      'TestBed.createComponent returns a ComponentFixture with componentInstance and nativeElement.',
      'await fixture.whenStable() (zoneless) or fixture.detectChanges() to render.',
      'fixture.componentRef.setInput("name", value) to set signal inputs.',
      'Mock dependencies with { provide: Service, useValue: mock }.',
    ],
    code: `describe('Greeting', () => {
  it('renders the user name', async () => {
    await TestBed.configureTestingModule({
      imports: [Greeting],
      providers: [{ provide: UserService, useValue: { name: signal('Asha') } }],
    }).compileComponents();

    const fixture = TestBed.createComponent(Greeting);
    await fixture.whenStable();

    expect(fixture.nativeElement.textContent).toContain('Asha');
  });
});`,
  },
  {
    id: 'te-2',
    level: 'mid',
    topic: 'testing',
    difficulty: 'medium',
    simple: {
      hi: 'Test mein asli server ko call karna slow aur risky hai. HttpTestingController ek nakli server hai: aap bolte ho "agar /api/users/1 maange to ye fake data de dena", aur check karte ho ki sahi request gayi.',
      en: 'Calling the real server in a test is slow and risky. HttpTestingController is a fake server: you say "if someone asks for /api/users/1, give them this fake data", and you check that the right request was sent.',
      bn: 'টেস্টে আসল সার্ভার কল করা ধীর আর ঝুঁকির। HttpTestingController হলো নকল সার্ভার: তুমি বলো "কেউ /api/users/1 চাইলে এই নকল data দিয়ে দিও", আর চেক করো ঠিক request গেছে কিনা।',
    },
    question: 'How do you test a service that uses HttpClient?',
    answer:
      'Provide provideHttpClient() and provideHttpClientTesting(), then use HttpTestingController to expect requests and flush fake responses.',
    code: `TestBed.configureTestingModule({
  providers: [provideHttpClient(), provideHttpClientTesting()],
});
const http = TestBed.inject(HttpTestingController);
const api = TestBed.inject(UserApi);

api.getUser(1).subscribe((u) => expect(u.name).toBe('Asha'));

const req = http.expectOne('/api/users/1');
expect(req.request.method).toBe('GET');
req.flush({ id: 1, name: 'Asha' });

http.verify(); // no unexpected requests`,
  },
  {
    id: 'te-3',
    level: 'junior',
    topic: 'testing',
    difficulty: 'easy',
    simple: {
      hi: 'Unit test = ek eent check karna. Integration test = deewar check karna (kai eent saath). E2E test = poora ghar ghoom kar dekhna ki darwaze, light, nal sab kaam karte hain — asli browser mein, asli user ki tarah.',
      en: 'Unit test = checking one brick. Integration test = checking a wall (many bricks together). E2E test = walking through the whole house to see that the doors, lights and taps all work — in a real browser, like a real user.',
      bn: 'Unit test = একটা ইট চেক করা। Integration test = দেয়াল চেক করা (অনেক ইট একসাথে)। E2E test = পুরো বাড়ি ঘুরে দেখা দরজা, আলো, কল সব কাজ করছে কিনা — আসল ব্রাউজারে, আসল ইউজারের মতো।',
    },
    question: 'Unit vs integration vs end-to-end tests in Angular?',
    answer:
      'Unit tests check a single class (service, pipe, component) in isolation with mocks. Integration tests render components together with real children/services. E2E tests drive the real app in a browser.',
    points: [
      'Unit/integration: Vitest or Jasmine with TestBed.',
      'E2E: Playwright or Cypress (Protractor is deprecated).',
      'Component harnesses (CDK testing) make tests resilient to DOM changes.',
    ],
  },

  // ───────────── Architecture ─────────────
  {
    id: 'ar-1',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'hard',
    simple: {
      hi: 'Chhote ghar mein har kamre ka apna saaman (component signals). Bade ghar mein ek common store room (service). Bahut bade mall mein proper inventory system (NgRx) — har entry register, kaun kya le gaya sab track.',
      en: 'In a small house each room keeps its own stuff (component signals). A bigger house has a common store room (service). A huge mall needs a proper inventory system (NgRx) — every entry registered, who took what all tracked.',
      bn: 'ছোট বাড়িতে প্রতিটা ঘরের নিজের জিনিস (component signals)। বড় বাড়িতে একটা কমন স্টোররুম (service)। বিশাল মলে লাগে ঠিকঠাক ইনভেন্টরি সিস্টেম (NgRx) — প্রতিটা এন্ট্রি রেজিস্টার, কে কী নিল সব ট্র্যাক করা।',
    },
    question: 'How do you manage state in a large Angular application?',
    answer:
      'Start simple and scale up: local component signals → shared services with signals → a state library when many features share complex state.',
    points: [
      'Service + signals: private writable signal, public readonly + computed, methods for updates.',
      'NgRx Store: Redux pattern (actions, reducers, selectors, effects) — predictable, great devtools, more boilerplate.',
      'NgRx SignalStore: lightweight, signal-based store with withState, withComputed, withMethods.',
      'Keep server state (cache of API data) separate from UI state.',
    ],
  },
  {
    id: 'ar-2',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'medium',
    simple: {
      hi: 'Dynamic component matlab dukaan mein khaali shelf rakhna aur zaroorat padne par us par product rakh dena — jaise button dabane par popup ya alert box runtime par banana. ViewContainerRef woh khaali shelf hai.',
      en: 'A dynamic component is like keeping an empty shelf in a shop and placing a product on it when needed — like creating a popup or alert box at runtime when a button is clicked. ViewContainerRef is that empty shelf.',
      bn: 'Dynamic component মানে দোকানে একটা ফাঁকা তাক রেখে দরকার হলে তাতে জিনিস রাখা — যেমন বোতাম চাপলে runtime-এ popup বা alert box তৈরি করা। ViewContainerRef হলো সেই ফাঁকা তাক।',
    },
    question: 'How do you create components dynamically?',
    answer:
      'Use ViewContainerRef.createComponent() or the NgComponentOutlet directive. No entryComponents are needed since Ivy.',
    code: `export class Host {
  private vcr = viewChild.required('slot', { read: ViewContainerRef });

  open() {
    const ref = this.vcr().createComponent(AlertBox);
    ref.setInput('message', 'Saved!');
    ref.instance.closed.subscribe(() => ref.destroy());
  }
}

// or in a template:
<ng-container *ngComponentOutlet="widget; inputs: { title: 'Hi' }" />`,
  },
  {
    id: 'ar-3',
    level: 'mid',
    topic: 'architecture',
    difficulty: 'medium',
    simple: {
      hi: 'Smart component restaurant ka manager hai — orders leta hai, kitchen (services) se baat karta hai. Dumb component waiter hai — jo plate di gayi (inputs) wo serve karta hai aur customer ki baat (outputs) manager tak pahunchata hai. Achha waiter kisi bhi restaurant mein kaam kar sakta hai — reusable.',
      en: 'A smart component is the restaurant manager — takes orders and talks to the kitchen (services). A dumb component is the waiter — serves the plate it is given (inputs) and passes the customer\'s words (outputs) to the manager. A good waiter can work in any restaurant — reusable.',
      bn: 'Smart component হলো রেস্টুরেন্টের ম্যানেজার — অর্ডার নেয়, রান্নাঘরের (services) সাথে কথা বলে। Dumb component হলো ওয়েটার — যে প্লেট দেওয়া হয় (inputs) সেটা পরিবেশন করে আর খদ্দেরের কথা (outputs) ম্যানেজারের কাছে পৌঁছায়। ভালো ওয়েটার যেকোনো রেস্টুরেন্টে কাজ করতে পারে — reusable।',
    },
    question: 'What are smart (container) and dumb (presentational) components?',
    answer:
      'Smart components know about services, state and routing; they fetch data and handle side effects. Presentational components only receive inputs and emit outputs, making them reusable and easy to test.',
    points: [
      'Presentational components are perfect candidates for OnPush.',
      'Organize by feature folders (core, shared, features/*) with lazy-loaded feature routes.',
      'Keep business logic in services, not in templates.',
    ],
  },
  {
    id: 'ar-4',
    level: 'mid',
    topic: 'architecture',
    difficulty: 'easy',
    simple: {
      hi: 'Angular pichhle kuch saalon mein bahut badla — jaise keypad phone se smartphone. Naya syntax (@if, @for), lazy @defer, signals, bina Zone.js ke app, aur naya fast test runner (Vitest). Interview mein ye batana dikhata hai ki aap updated ho.',
      en: 'Angular has changed a lot in the last few years — like going from a keypad phone to a smartphone. New syntax (@if, @for), lazy @defer, signals, apps without Zone.js, and a new fast test runner (Vitest). Mentioning these in an interview shows you are up to date.',
      bn: 'গত কয়েক বছরে Angular অনেক বদলেছে — যেন কিপ্যাড ফোন থেকে স্মার্টফোন। নতুন syntax (@if, @for), lazy @defer, signals, Zone.js ছাড়া অ্যাপ, আর নতুন দ্রুত test runner (Vitest)। ইন্টারভিউতে এগুলো বললে বোঝা যায় তুমি আপডেটেড।',
    },
    question: 'What are the major features added in recent Angular versions (v17 – v21)?',
    answer:
      'Angular has gone through a "renaissance" focused on simplicity and performance.',
    points: [
      'v17: built-in control flow, @defer, new application builder (esbuild + Vite), new angular.dev docs.',
      'v18–v19: zoneless (experimental), standalone by default, incremental hydration, linkedSignal, resource.',
      'v20: signals APIs stable (effect, linkedSignal, toSignal), zoneless developer preview, new style guide without suffixes.',
      'v21: zoneless by default for new apps, Vitest default test runner, experimental Signal Forms, Angular Aria.',
    ],
  },
  {
    id: 'ar-5',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'hard',
    simple: {
      hi: 'Ek company mein 10 teams ek hi app bana rahi hain. Monorepo ek bada office hai jahan sab alag cabin (libraries) mein hain par building ek hai. Micro-frontend matlab har team ki alag building, jo alag time par khul-band hoti hai (alag deploy) — azaadi zyada, par taalmel mushkil.',
      en: 'Ten teams in one company are building the same app. A monorepo is one big office where everyone sits in separate cabins (libraries) but in one building. Micro-frontends mean each team has its own building that opens and closes on its own schedule (separate deploys) — more freedom, but harder coordination.',
      bn: 'এক কোম্পানিতে ১০টা টিম একই অ্যাপ বানাচ্ছে। Monorepo হলো একটা বড় অফিস যেখানে সবাই আলাদা কেবিনে (libraries) কিন্তু বিল্ডিং একটাই। Micro-frontend মানে প্রতিটা টিমের আলাদা বিল্ডিং, যেটা নিজের সময়ে খোলে-বন্ধ হয় (আলাদা deploy) — স্বাধীনতা বেশি, কিন্তু সমন্বয় কঠিন।',
    },
    question: 'How would you structure a very large Angular application or multiple teams? (Monorepo, micro-frontends)',
    answer:
      'Split the codebase by domain with clear boundaries. Start with a monorepo of libraries; move to micro-frontends only when teams truly need independent deployments.',
    points: [
      'Monorepo (Nx or Angular CLI workspaces): apps + libraries per domain (feature, data-access, ui, util), with lint rules enforcing dependency boundaries.',
      'Micro-frontends: Module Federation / Native Federation load remote apps at runtime; each team deploys independently.',
      'Trade-offs of micro-frontends: shared dependency versioning, larger bundles, cross-app state and consistent design are harder.',
      'Share a design system library and a typed API client generated from OpenAPI.',
      'Enforce standards with a shared ESLint config, CI checks and code owners.',
    ],
  },
  {
    id: 'ar-6',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'hard',
    simple: {
      hi: 'Purane ghar ka renovation — saari deewarein ek saath nahi todte. Ek-ek kamra (ek-ek version) theek karte ho, aur har kamre ke baad check karte ho ki bijli-paani chal raha hai (tests pass). Angular ke schematics aapke mistri hain jo bahut kaam apne aap kar dete hain.',
      en: 'Renovating an old house — you don\'t knock down every wall at once. You fix one room (one version) at a time and after each room check that the electricity and water still work (tests pass). Angular\'s schematics are your workers who do a lot of the job automatically.',
      bn: 'পুরনো বাড়ি সংস্কার — সব দেয়াল একসাথে ভাঙো না। একটা একটা ঘর (একটা একটা version) ঠিক করো, আর প্রতিটা ঘরের পর দেখে নাও বিদ্যুৎ-জল চলছে কিনা (tests pass)। Angular-এর schematics হলো তোমার মিস্ত্রি, যারা অনেক কাজ নিজে থেকেই করে দেয়।',
    },
    question: 'How do you migrate a large app to the latest Angular version and modern APIs?',
    answer:
      'Upgrade one major version at a time with ng update, then adopt modern APIs incrementally using the official schematics, keeping tests green at every step.',
    points: [
      'Check update.angular.dev for version-specific steps; update third-party libraries (Material, NgRx) in lockstep.',
      'ng update @angular/core@N @angular/cli@N — runs automatic code migrations.',
      'Schematics: standalone migration, control-flow migration (@if/@for), inject() migration, signal inputs/outputs/queries migrations.',
      'Go zoneless last: first move state to signals/OnPush, then enable provideZonelessChangeDetection().',
      'Ship in small PRs behind good test coverage and monitor errors after each release.',
    ],
    code: `ng update @angular/core@21 @angular/cli@21
ng generate @angular/core:standalone
ng generate @angular/core:control-flow
ng generate @angular/core:inject
ng generate @angular/core:signal-input-migration`,
  },
  {
    id: 'ar-7',
    level: 'mid',
    topic: 'architecture',
    difficulty: 'medium',
    simple: {
      hi: 'XSS matlab koi user comment mein chupke se <script> daal de jo doosre users ke browser mein chal jaaye. Angular har text ko shak ki nazar se dekhta hai aur khatarnaak cheez saaf kar deta hai — jaise airport scanner. bypassSecurityTrust matlab scanner band karna — sirf bharose wali cheez ke liye.',
      en: 'XSS is when a user sneaks a <script> into a comment and it runs in other users\' browsers. Angular looks at every piece of text with suspicion and cleans out anything dangerous — like an airport scanner. bypassSecurityTrust means switching the scanner off — only for things you truly trust.',
      bn: 'XSS মানে কেউ কমেন্টে চুপিচুপি <script> ঢুকিয়ে দেয়, যেটা অন্য ইউজারদের ব্রাউজারে চলে যায়। Angular প্রতিটা লেখাকে সন্দেহের চোখে দেখে আর বিপজ্জনক জিনিস সাফ করে দেয় — যেন এয়ারপোর্টের স্ক্যানার। bypassSecurityTrust মানে স্ক্যানার বন্ধ করা — শুধু বিশ্বস্ত জিনিসের জন্য।',
    },
    question: 'How does Angular protect against XSS and other security issues?',
    answer:
      'Angular treats all values as untrusted by default and sanitizes them when binding to the DOM, so interpolated strings cannot inject scripts.',
    points: [
      'Interpolation escapes HTML; [innerHTML] is sanitized (script tags and dangerous attributes removed).',
      'DomSanitizer.bypassSecurityTrust...() turns off protection — use only for trusted content.',
      'Avoid direct DOM APIs (nativeElement.innerHTML) which skip sanitization.',
      'HttpClient supports XSRF tokens via withXsrfConfiguration(); the server must validate them.',
      'Use a Content Security Policy and Trusted Types for defence in depth; AOT avoids template injection.',
    ],
  },
];
