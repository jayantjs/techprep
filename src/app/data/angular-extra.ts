import { Question } from './models';

/** Additional Angular 21 questions beyond the core bank. */
export const ANGULAR_EXTRA_QUESTIONS: Question[] = [
  {
    id: 'ax-1',
    level: 'mid',
    topic: 'templates',
    difficulty: 'medium',
    simple: {
      hi: 'TemplateRef ek cake ka saancha (mould) hai aur ViewContainerRef dukaan ka shelf. Structural directive decide karta hai ki saanche se cake banakar shelf par rakhna hai ya shelf khaali karna hai.',
      en: 'TemplateRef is like a cake mould and ViewContainerRef is the shop shelf. The structural directive decides whether to make a cake from the mould and put it on the shelf, or to clear the shelf.',
      bn: 'TemplateRef হলো কেকের ছাঁচ আর ViewContainerRef হলো দোকানের তাক। Structural directive ঠিক করে ছাঁচ থেকে কেক বানিয়ে তাকে রাখবে, নাকি তাক খালি করে দেবে।',
    },
    question: 'How do you create a custom structural directive with TemplateRef and ViewContainerRef?',
    answer: 'A structural directive is an attribute directive applied with the * shorthand, which makes Angular wrap the host element in an <ng-template>. The directive injects TemplateRef (the blueprint of that template) and ViewContainerRef (the place where views can be inserted), then calls createEmbeddedView() to stamp the template out or clear() to remove it. With signal inputs you usually react to the input inside an effect().',
    points: [
      '*appX="expr" desugars to <ng-template [appX]="expr">, so the input name must match the selector',
      'TemplateRef = what to render; ViewContainerRef = where to render it',
      'createEmbeddedView(tpl, context) can pass a context object ($implicit and named values for let-)',
      'Track whether the view already exists to avoid creating duplicates',
      'Add a static ngTemplateContextGuard for typed context in strict templates',
    ],
    code: `import { Directive, TemplateRef, ViewContainerRef, effect, inject, input } from '@angular/core';

@Directive({ selector: '[appUnless]' })
export class UnlessDirective {
  private tpl = inject(TemplateRef<unknown>);
  private vcr = inject(ViewContainerRef);
  appUnless = input.required<boolean>();
  private hasView = false;

  constructor() {
    effect(() => {
      const hide = this.appUnless();
      if (!hide && !this.hasView) {
        this.vcr.createEmbeddedView(this.tpl);
        this.hasView = true;
      } else if (hide && this.hasView) {
        this.vcr.clear();
        this.hasView = false;
      }
    });
  }
}

<!-- template -->
<p *appUnless="isLoggedIn()">Please log in</p>`,
  },
  {
    id: 'ax-2',
    level: 'senior',
    topic: 'templates',
    difficulty: 'hard',
    simple: {
      hi: 'Jaise naya phone kharido to charger aur earphones box mein hi aa jaate hain, waise hi hostDirectives se component apne saath extra directives ki power le aata hai. Use karne wale ko alag se kuch lagana nahi padta.',
      en: 'When you buy a new phone, the charger and earphones come in the same box. Similarly, with hostDirectives a component brings extra directive powers with it, so the user doesn\'t have to add them separately.',
      bn: 'নতুন ফোন কিনলে চার্জার আর ইয়ারফোন একই বাক্সে চলে আসে। তেমনি hostDirectives দিয়ে component নিজের সঙ্গে বাড়তি directive-এর ক্ষমতা নিয়ে আসে, ব্যবহারকারীকে আলাদা করে কিছু লাগাতে হয় না।',
    },
    question: 'What is the Directive Composition API (hostDirectives)?',
    answer: 'The Directive Composition API lets a component or directive apply other standalone directives to its own host element through the hostDirectives metadata, instead of asking every user to add them in the template. You pick which inputs and outputs of each host directive to expose (and can alias them); by default none are exposed. It is composition instead of inheritance: you reuse behaviour such as focus handling, tooltips or ARIA logic without class hierarchies.',
    points: [
      'Declared in @Component/@Directive: hostDirectives: [ { directive, inputs, outputs } ]',
      'Host directives must be standalone and are applied statically at compile time',
      'Inputs/outputs are private unless listed; aliasing syntax is \'inputName: alias\'',
      'Host directives are created before the host, and the host can inject them',
      'Good for design systems: one <app-button> brings ripple, focus and a11y behaviour with it',
    ],
    code: `import { Component, Directive, input } from '@angular/core';

@Directive({ selector: '[appTooltip]', host: { '[attr.title]': 'text()' } })
export class TooltipDirective {
  text = input('');
}

@Component({
  selector: 'app-icon-button',
  hostDirectives: [{ directive: TooltipDirective, inputs: ['text: tooltip'] }],
  template: \`<ng-content />\`,
})
export class IconButton {}

<!-- template -->
<app-icon-button tooltip="Delete item">X</app-icon-button>`,
  },
  {
    id: 'ax-3',
    level: 'junior',
    topic: 'templates',
    difficulty: 'easy',
    simple: {
      hi: 'Class mein har bachche ka roll number hota hai taaki teacher seedha bula sake. #name bhi waise hi template mein kisi element ka roll number hai, aur exportAs batata hai ki kis naam se directive ko bulana hai.',
      en: 'In class every child has a roll number so the teacher can call them directly. #name is like a roll number for an element in the template, and exportAs tells which name to use to call a directive.',
      bn: 'ক্লাসে প্রত্যেক বাচ্চার রোল নম্বর থাকে যাতে টিচার সরাসরি ডাকতে পারেন। #name-ও template-এ কোনো element-এর রোল নম্বরের মতো, আর exportAs বলে দেয় directive-কে কোন নামে ডাকতে হবে।',
    },
    question: 'Template reference variables and exportAs.',
    answer: 'A template reference variable (#name) gives you a handle to something in the template: on a plain element it refers to the DOM element, on a component it refers to the component instance. If you want the variable to point to a directive instead, the directive declares exportAs and you write #name="exportName", for example #f="ngForm". The variable can be used anywhere in the same template scope or queried with viewChild().',
    points: [
      '#input on <input> gives the HTMLInputElement (input.value)',
      '#cmp on a component tag gives the component instance',
      'exportAs: \'tooltip\' + #t="tooltip" gives the directive instance',
      'Variables are scoped to their template: one declared inside @if/@for or ng-template is not visible outside it',
      'Can be passed to event handlers: (click)="save(nameInput.value)"',
    ],
    code: `import { Directive, signal } from '@angular/core';

@Directive({ selector: '[appToggle]', exportAs: 'toggle' })
export class ToggleDirective {
  on = signal(false);
  flip() { this.on.update(v => !v); }
}

<!-- template -->
<input #name placeholder="Name" />
<button (click)="greet(name.value)">Greet</button>

<div appToggle #t="toggle">
  <button (click)="t.flip()">{{ t.on() ? 'ON' : 'OFF' }}</button>
</div>`,
  },
  {
    id: 'ax-4',
    level: 'senior',
    topic: 'templates',
    difficulty: 'hard',
    simple: {
      hi: 'ng-content ek ready tiffin hai jo maa hamesha pack karti hai, chahe aap khao ya na khao. ng-template ek recipe card hai — khana tabhi banta hai jab bhookh lage. ngProjectAs tiffin par alag label lagane jaisa hai taaki sahi dabbe mein jaaye.',
      en: 'ng-content is a ready tiffin that mom always packs, whether you eat it or not. ng-template is a recipe card — the food is cooked only when you are hungry. ngProjectAs is like putting a different label on the tiffin so it goes into the right box.',
      bn: 'ng-content হলো তৈরি টিফিন যা মা সবসময় প্যাক করে দেন, তুমি খাও বা না খাও। ng-template হলো রেসিপি কার্ড — খিদে পেলে তবেই রান্না হয়। ngProjectAs হলো টিফিনে অন্য লেবেল লাগানো, যাতে সেটা ঠিক বাক্সে যায়।',
    },
    question: 'ngProjectAs and conditional content projection with ng-template.',
    answer: 'ngProjectAs lets an element pretend to match a different <ng-content select> slot, which is useful when you wrap content in an <ng-container> but still want it to land in a named slot. For conditional or repeated projection, <ng-content> is the wrong tool: projected content is always created and initialised by the parent, even if the child hides the slot with @if. Instead the parent passes an <ng-template>, the child grabs it with contentChild(TemplateRef) or a marker directive, and renders it lazily with ngTemplateOutlet only when needed.',
    points: [
      'select matches on the element as written, so a wrapper ng-container needs ngProjectAs="[card-title]"',
      'ng-content inside @if only hides content; it is still instantiated and its lifecycle runs',
      'ng-content cannot project the same content twice; ng-template + ngTemplateOutlet can render many times',
      'ngTemplateOutlet accepts a context so the child can pass data back to the template (let-item)',
      '<ng-content> can have fallback content shown when nothing is projected',
    ],
    code: `import { Component, TemplateRef, contentChild, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-expander',
  imports: [NgTemplateOutlet],
  template: \`
    <ng-content select="[title]" />
    <button (click)="open.set(!open())">Toggle</button>
    @if (open()) {
      <ng-container [ngTemplateOutlet]="body() ?? null" />
    }\`,
})
export class Expander {
  open = signal(false);
  body = contentChild(TemplateRef); // created only when opened
}

<!-- template -->
<app-expander>
  <ng-container ngProjectAs="[title]"><h3>FAQ</h3></ng-container>
  <ng-template><heavy-chart /></ng-template>
</app-expander>`,
  },
  {
    id: 'ax-5',
    level: 'junior',
    topic: 'templates',
    difficulty: 'easy',
    simple: {
      hi: 'Lambe naam wale dost ko hum chhota nickname de dete hain, jaise \'Sachin Ramesh Tendulkar\' ko \'Sachin\'. @let bhi template mein lambe expression ko ek chhota naam de deta hai.',
      en: 'We give a friend with a long name a short nickname, like calling \'Sachin Ramesh Tendulkar\' just \'Sachin\'. @let gives a long template expression a short name in the same way.',
      bn: 'লম্বা নামের বন্ধুকে আমরা ছোট ডাকনাম দিই, যেমন \'Sachin Ramesh Tendulkar\'-কে শুধু \'Sachin\'। @let-ও template-এ লম্বা expression-কে একটা ছোট নাম দিয়ে দেয়।',
    },
    question: 'What is @let in templates and when is it useful?',
    answer: '@let declares a read-only local variable inside a template, e.g. @let total = price() * qty();. It is re-evaluated on every change detection of that view, so it always holds the current value. It is useful to avoid repeating long expressions, to unwrap an async pipe once, or to give a meaningful name to a deeply nested property.',
    points: [
      'Syntax: @let name = expression; (semicolon required)',
      'Read-only: you cannot reassign it from the template or an event handler',
      'Scoped to the view where it is declared and its children, and only usable after the declaration',
      'Handy with the async pipe: @let user = user$ | async;',
      'Not a replacement for computed(): heavy logic still belongs in the component',
    ],
    code: `<!-- template -->
@let user = user$ | async;
@let fullName = user?.firstName + ' ' + user?.lastName;

@if (user) {
  <h2>Welcome, {{ fullName }}</h2>
  <p>Orders: {{ user.orders.length }}</p>
}`,
  },
  {
    id: 'ax-6',
    level: 'fresher',
    topic: 'templates',
    difficulty: 'easy',
    simple: {
      hi: 'School uniform mein ek badge lagana ho to seedha pin kar do — yeh [class.x] hai. Puri list ke hisaab se kai badge lagane hon to ek helper rakh lo — yeh ngClass hai. Aaj kal seedha pin karna hi zyada pasand kiya jaata hai.',
      en: 'To put one badge on a school uniform you just pin it — that\'s [class.x]. To put many badges from a list you keep a helper — that\'s ngClass. Nowadays, pinning directly is the preferred way.',
      bn: 'স্কুল ইউনিফর্মে একটা ব্যাজ লাগাতে হলে সোজা পিন করে দাও — এটাই [class.x]। একটা লিস্ট দেখে অনেক ব্যাজ লাগাতে হলে একজন হেল্পার রাখো — এটাই ngClass। এখন সোজা পিন করাটাই বেশি পছন্দের।',
    },
    question: 'ngClass / ngStyle vs [class.x] / [style.x] bindings.',
    answer: 'NgClass and NgStyle are built-in directives (imported from @angular/common) that add or remove many classes or styles from an object, array or string. Native bindings like [class.active]="isActive()" and [style.width.px]="w()" do the same for one class or style without any directive. The [class] and [style] bindings also accept objects, so the Angular team now recommends plain bindings over NgClass/NgStyle in new code.',
    points: [
      '[class.active]="cond" toggles one class; [class]="{ a: x, b: y }" handles many',
      '[style.width.px]="100" supports a unit suffix; [style]="{ color: c }" handles many',
      'NgClass/NgStyle must be imported into a standalone component; bindings need no import',
      'Bindings are slightly faster and simpler because no directive instance is created',
      'Static class="..." and dynamic bindings are merged by Angular',
    ],
    code: `<!-- template -->
<!-- directive style -->
<div [ngClass]="{ active: isActive(), disabled: isDisabled() }"
     [ngStyle]="{ 'font-size.px': size() }">Old way</div>

<!-- binding style (recommended) -->
<div [class.active]="isActive()"
     [class.disabled]="isDisabled()"
     [style.font-size.px]="size()">New way</div>`,
  },
  {
    id: 'ax-7',
    level: 'junior',
    topic: 'templates',
    difficulty: 'easy',
    simple: {
      hi: 'Async pipe ek newspaper subscription jaisa hai. Har subah naya akhbaar (value) apne aap aa jaata hai, aur ghar chhodte waqt (destroy) subscription khud band ho jaata hai.',
      en: 'The async pipe is like a newspaper subscription. Every morning the new paper (value) arrives by itself, and when you move out (destroy) the subscription is cancelled automatically.',
      bn: 'Async pipe হলো খবরের কাগজের subscription-এর মতো। প্রতিদিন সকালে নতুন কাগজ (value) নিজে থেকেই চলে আসে, আর বাড়ি ছাড়লে (destroy) subscription নিজেই বন্ধ হয়ে যায়।',
    },
    question: 'How does the async pipe work?',
    answer: 'The async pipe subscribes to an Observable or Promise from the template and returns the latest emitted value. Whenever a new value arrives it calls markForCheck(), so it works with OnPush and zoneless apps. When the component is destroyed, or the source reference changes, it unsubscribes automatically, which prevents memory leaks.',
    points: [
      'Returns null until the first value arrives',
      'Calls markForCheck() on each emission, so OnPush/zoneless views update',
      'Auto-unsubscribes on destroy and when a new Observable instance is bound',
      'Each | async creates its own subscription; use @let or shareReplay to avoid duplicate HTTP calls',
      'Don\'t bind a method that returns a new Observable each time, e.g. getUser() | async',
    ],
    code: `import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  imports: [AsyncPipe],
  template: \`
    @let users = users$ | async;
    @for (u of users ?? []; track u.id) {
      <li>{{ u.name }}</li>
    } @empty { <li>Loading...</li> }\`,
})
export class Users {
  users$ = inject(HttpClient).get<{ id: number; name: string }[]>('/api/users');
}`,
  },
  {
    id: 'ax-8',
    level: 'fresher',
    topic: 'templates',
    difficulty: 'easy',
    simple: {
      hi: '?. waise hai jaise dukaan jaane se pehle check karna ki dukaan khuli hai ya nahi — band ho to chupchaap wapas aa jao. ! waise hai jaise kehna \'mujhe pata hai dukaan khuli hai\' — galat nikla to dhakka lagega.',
      en: '?. is like checking whether the shop is open before going in — if it\'s closed, you quietly come back. ! is like saying \'I know the shop is open\' — if you\'re wrong, you bump into the shutter.',
      bn: '?. হলো দোকানে ঢোকার আগে দেখে নেওয়া দোকান খোলা কিনা — বন্ধ থাকলে চুপচাপ ফিরে আসো। ! হলো বলা \'আমি জানি দোকান খোলা\' — ভুল হলে শাটারে ধাক্কা খাবে।',
    },
    question: 'Safe navigation (?.) and non-null assertion (!) in templates.',
    answer: 'The safe navigation operator ?. stops evaluation and returns undefined (rendered as empty) when the left side is null or undefined, so {{ user?.name }} does not throw while data is loading. The non-null assertion ! has no runtime effect; it only tells the template type checker (strictTemplates) "trust me, this is not null". Use ?. for values that really can be null and ! only when you know better than the compiler.',
    points: [
      'user?.address?.city avoids \'Cannot read properties of undefined\'',
      '! is compile-time only; if the value is actually null you still get a runtime error',
      'Inside @if (user) { ... } the type is already narrowed, so neither is needed',
      'With strictTemplates, unnecessary ?. on a non-nullable value gives a warning',
      '?? can supply a fallback: {{ user?.name ?? \'Guest\' }}',
    ],
    code: `<!-- template -->
<p>{{ user?.name ?? 'Guest' }}</p>
<p>{{ order?.items?.length }}</p>

<!-- compiler thinks form could be null, we know it is not -->
<button [disabled]="form!.invalid">Save</button>

@if (user) {
  <p>{{ user.email }}</p> <!-- narrowed, no ?. needed -->
}`,
  },
  {
    id: 'ax-9',
    level: 'mid',
    topic: 'lifecycle',
    difficulty: 'medium',
    simple: {
      hi: 'Shaadi ka pandal poora sajne ke baad hi photographer photo leta hai. afterNextRender pehli baar sajne ke baad ek photo hai, aur afterEveryRender har baar sajawat badalne ke baad nayi photo.',
      en: 'The photographer clicks pictures only after the wedding pandal is fully decorated. afterNextRender is one photo after the first decoration, and afterEveryRender is a new photo after every change in decoration.',
      bn: 'বিয়ের প্যান্ডেল পুরো সাজানো হলে তবেই ফটোগ্রাফার ছবি তোলেন। afterNextRender হলো প্রথমবার সাজানোর পর একটা ছবি, আর afterEveryRender হলো প্রতিবার সাজ বদলানোর পর নতুন ছবি।',
    },
    question: 'afterNextRender and afterEveryRender — use cases and phases.',
    answer: 'afterNextRender registers a callback that runs once after the next time the whole application finishes rendering; afterEveryRender runs after every render. Both run only in the browser (never during SSR), so they are the right place for DOM measurement, third-party libraries like charts or maps, and manual focus. They must be called in an injection context and accept phase callbacks — earlyRead, write, mixedReadWrite and read — so Angular can batch DOM reads and writes and avoid layout thrashing.',
    points: [
      'afterNextRender: one-time setup (init a chart, focus an input); afterEveryRender: keep something in sync after each render',
      'Never run on the server, unlike ngAfterViewInit, so DOM APIs are safe',
      'Phase order: earlyRead -> write -> mixedReadWrite -> read; each phase receives the previous phase\'s return value',
      'Prefer specific phases over mixedReadWrite for performance',
      'Return value is an AfterRenderRef with destroy(); they are also cleaned up when the component is destroyed',
      'afterEveryRender is the newer name of afterRender',
    ],
    code: `import { Component, ElementRef, afterNextRender, viewChild } from '@angular/core';

@Component({
  selector: 'app-box',
  template: \`<div #box>Resizable</div>\`,
})
export class Box {
  box = viewChild.required<ElementRef<HTMLElement>>('box');

  constructor() {
    afterNextRender({
      earlyRead: () => this.box().nativeElement.offsetWidth,
      write: (width) => {
        this.box().nativeElement.style.height = \`\${width / 2}px\`;
      },
    });
  }
}`,
  },
  {
    id: 'ax-10',
    level: 'senior',
    topic: 'lifecycle',
    difficulty: 'hard',
    simple: {
      hi: 'Agar koi tiffin box wahi rakhe par andar ka khana badal de, to bahar se dekhkar pata nahi chalta. KeyValueDiffers har baar dabba khol kar dekhta hai ki kaunsi sabzi nayi aayi, kaunsi nikal gayi.',
      en: 'If someone keeps the same tiffin box but changes the food inside, you can\'t tell from the outside. KeyValueDiffers opens the box every time to see which dish was added and which was removed.',
      bn: 'কেউ যদি একই টিফিন বাক্স রেখে ভেতরের খাবার বদলে দেয়, বাইরে থেকে বোঝা যায় না। KeyValueDiffers প্রতিবার বাক্স খুলে দেখে কোন তরকারি নতুন এল আর কোনটা বাদ গেল।',
    },
    question: 'ngDoCheck with KeyValueDiffers / IterableDiffers — when would you need them?',
    answer: 'ngOnChanges only fires when an input\'s reference changes, so if a parent mutates an object or array in place (obj.x = 1, arr.push()), the child never hears about it. ngDoCheck runs on every change detection pass, and inside it you can use KeyValueDiffers (for objects/Maps) or IterableDiffers (for arrays) to cheaply compute exactly what was added, changed or removed since last time. It is how NgClass, NgStyle and the old NgFor worked; in modern code prefer immutable updates and signals, and keep ngDoCheck very cheap because it runs constantly.',
    points: [
      'Problem: in-place mutation keeps the same reference, so ngOnChanges does not fire',
      'differs.find(value).create() once, then differ.diff(value) in ngDoCheck; it returns null if nothing changed',
      'Changes API: forEachAddedItem, forEachChangedItem, forEachRemovedItem (iterable differ also has forEachMovedItem)',
      'IterableDiffers can take a trackBy function',
      'ngDoCheck runs very often — no heavy work inside it',
      'Better long-term fix: immutable data, signals and computed()',
    ],
    code: `import { Directive, DoCheck, KeyValueDiffer, KeyValueDiffers, inject, input } from '@angular/core';

@Directive({ selector: '[appWatch]' })
export class WatchDirective implements DoCheck {
  appWatch = input.required<Record<string, unknown>>();
  private differs = inject(KeyValueDiffers);
  private differ?: KeyValueDiffer<string, unknown>;

  ngDoCheck() {
    const value = this.appWatch();
    this.differ ??= this.differs.find(value).create();
    const changes = this.differ.diff(value);
    changes?.forEachChangedItem(r =>
      console.log(r.key, r.previousValue, '->', r.currentValue));
    changes?.forEachAddedItem(r => console.log('added', r.key));
  }
}`,
  },
  {
    id: 'ax-11',
    level: 'mid',
    topic: 'lifecycle',
    difficulty: 'medium',
    simple: {
      hi: 'Picnic khatam hone par jo bhi saaf-safai karni hai, wo pehle se ek list mein likh do — yeh DestroyRef hai. onCleanup aisa hai jaise har game ke baad agla game shuru karne se pehle pichla saamaan samet lena.',
      en: 'Write down in advance everything that must be cleaned up when the picnic ends — that\'s DestroyRef. onCleanup is like packing away the old game\'s things before starting the next game.',
      bn: 'পিকনিক শেষে কী কী পরিষ্কার করতে হবে, আগে থেকেই একটা লিস্টে লিখে রাখো — এটাই DestroyRef। onCleanup হলো পরের খেলা শুরু করার আগে আগের খেলার জিনিস গুছিয়ে রাখা।',
    },
    question: 'DestroyRef in services and directives; cleanup in effects (onCleanup).',
    answer: 'DestroyRef is an injectable handle to the lifecycle of the current injector: in a component or directive it is tied to that instance, in a service it is tied to the injector that created the service (e.g. the root injector or a route\'s injector). You call destroyRef.onDestroy(cb) to register cleanup without implementing ngOnDestroy, and takeUntilDestroyed() uses it under the hood for RxJS. Effects receive an onCleanup function; the registered callback runs before the effect re-runs and when the effect is destroyed, which is perfect for timers or subscriptions started inside the effect.',
    points: [
      'inject(DestroyRef).onDestroy(fn) returns a function to unregister the callback',
      'Lets reusable helper functions register cleanup themselves (they just call inject(DestroyRef))',
      'takeUntilDestroyed() works in an injection context; outside it, pass a DestroyRef explicitly',
      'effect((onCleanup) => { ... onCleanup(() => ...) }) — runs before the next run and on destroy',
      'Root services are only destroyed when the application is destroyed',
    ],
    code: `import { Component, DestroyRef, effect, inject, signal } from '@angular/core';

@Component({ selector: 'app-clock', template: \`{{ ticks() }}\` })
export class Clock {
  intervalMs = signal(1000);
  ticks = signal(0);

  constructor() {
    inject(DestroyRef).onDestroy(() => console.log('Clock destroyed'));

    effect((onCleanup) => {
      const id = setInterval(() => this.ticks.update(t => t + 1), this.intervalMs());
      onCleanup(() => clearInterval(id)); // runs before re-run and on destroy
    });
  }
}`,
  },
  {
    id: 'ax-12',
    level: 'junior',
    topic: 'communication',
    difficulty: 'medium',
    simple: {
      hi: 'Train ticket par naam likhna zaroori hai (required). Ghar ka naam \'Bablu\' aur school ka naam \'Rahul\' — yeh alias hai. Aur transform waise hai jaise ticket checker \'haan\' likha dekh kar use \'true\' samajh le.',
      en: 'Writing your name on a train ticket is compulsory (required). Being \'Bablu\' at home and \'Rahul\' at school is an alias. A transform is like the ticket checker reading \'yes\' and understanding it as \'true\'.',
      bn: 'ট্রেনের টিকিটে নাম লেখা বাধ্যতামূলক (required)। বাড়িতে \'বাবলু\' আর স্কুলে \'রাহুল\' — এটাই alias। আর transform হলো টিকিট চেকার \'হ্যাঁ\' লেখা দেখে সেটাকে \'true\' বুঝে নেওয়া।',
    },
    question: 'Signal inputs: required inputs, aliases and input transforms (booleanAttribute, numberAttribute).',
    answer: 'input.required<T>() declares an input the parent must bind; the compiler reports an error if it is missing, and it has no default value. The alias option exposes the input under a different public name, e.g. input(false, { alias: \'disabled\' }). The transform option converts the raw bound value before it is stored; booleanAttribute turns attribute-style values like <app-btn disabled> (empty string) into true, and numberAttribute turns "5" into 5.',
    points: [
      'input.required<string>() — missing binding is a compile error; reading it before it is set throws',
      'Signal inputs are read-only inside the child (no .set()); use model() for two-way',
      'alias changes the template name, not the class property name',
      'transform must be a pure function; booleanAttribute / numberAttribute come from @angular/core',
      'With a transform the input accepts a wider type (e.g. string | boolean) than it stores',
    ],
    code: `import { Component, booleanAttribute, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-rating',
  template: \`{{ label() }}: {{ stars() }} @if (isReadonly()) { (locked) }\`,
})
export class Rating {
  label = input.required<string>();
  stars = input(0, { transform: numberAttribute });
  isReadonly = input(false, { alias: 'readonly', transform: booleanAttribute });
}

<!-- template -->
<app-rating label="Food" stars="4" readonly />`,
  },
  {
    id: 'ax-13',
    level: 'mid',
    topic: 'communication',
    difficulty: 'medium',
    simple: {
      hi: 'outputFromObservable ek nal (Observable) ko seedha ghar ki tanki (output) se jod deta hai. outputToObservable ulta karta hai — tanki se paani nikal kar ek pipe mein daal deta hai jahan aap filter laga sako.',
      en: 'outputFromObservable connects a water pipe (Observable) straight to the house tank (output). outputToObservable does the reverse — it takes water from the tank and sends it into a pipe where you can add filters.',
      bn: 'outputFromObservable একটা জলের পাইপ (Observable) সোজা বাড়ির ট্যাঙ্কের (output) সঙ্গে জুড়ে দেয়। outputToObservable উল্টোটা করে — ট্যাঙ্ক থেকে জল নিয়ে পাইপে পাঠায়, যেখানে তুমি ফিল্টার লাগাতে পারো।',
    },
    question: 'outputFromObservable and outputToObservable.',
    answer: 'Both live in @angular/core/rxjs-interop and bridge the output() API with RxJS. outputFromObservable(obs$) declares a component output whose events are whatever the Observable emits, so you don\'t need a manual subscribe-and-emit. outputToObservable(ref) does the reverse: it turns an output (an OutputRef from output() or outputFromObservable) into an Observable you can pipe, e.g. from a child you got via a query or ComponentRef.instance.',
    points: [
      'outputFromObservable: Angular subscribes and forwards values; it unsubscribes when the component is destroyed',
      'The source Observable should not error — errors are not handled for you',
      'outputToObservable: the resulting Observable completes when the owning directive is destroyed',
      'Useful when the event source is already a stream (debounced search, form valueChanges)',
      'Parents bind to both kinds of outputs the same way: (search)="..."',
    ],
    code: `import { Component } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  template: \`<input [formControl]="query" />\`,
})
export class Search {
  query = new FormControl('', { nonNullable: true });
  search = outputFromObservable(
    this.query.valueChanges.pipe(debounceTime(300), distinctUntilChanged()),
  );
}

// elsewhere, given a Search instance:
// outputToObservable(searchCmp.search).pipe(filter(q => q.length > 2)).subscribe(...)`,
  },
  {
    id: 'ax-14',
    level: 'junior',
    topic: 'communication',
    difficulty: 'easy',
    simple: {
      hi: 'Host binding aisa hai jaise khilaadi apni jersey par khud number aur colour tay kare. Decorator wala tareeka har cheez alag-alag likhta hai, host property sab kuch ek hi form mein bhar deti hai.',
      en: 'Host binding is like a player deciding the number and colour on their own jersey. The decorator way writes each item separately; the host property fills everything into one single form.',
      bn: 'Host binding হলো খেলোয়াড় নিজের জার্সির নম্বর আর রং নিজেই ঠিক করা। Decorator পদ্ধতিতে প্রতিটা জিনিস আলাদা আলাদা লেখা হয়, host property সবকিছু একটাই ফর্মে ভরে দেয়।',
    },
    question: '@HostBinding/@HostListener vs the host metadata property.',
    answer: 'All three bind to the component\'s or directive\'s own host element. @HostBinding(\'class.active\') decorates a property and @HostListener(\'click\', [\'$event\']) decorates a method; the host property in @Component/@Directive declares the same bindings in one object: { \'[class.active]\': \'isActive()\', \'(click)\': \'onClick($event)\' }. The Angular style guide now recommends the host property; the decorators still work and exist mainly for backward compatibility.',
    points: [
      'host keys: \'[prop]\' for property/class/style/attr bindings, \'(event)\' for listeners, plain keys for static attributes',
      'Global targets work in both: \'(window:resize)\', \'(document:keydown.escape)\'',
      'host works naturally with signals: \'[class.open]\': \'open()\'',
      'host bindings are type-checked like template expressions',
      'Prefer host bindings over Renderer2/ElementRef for simple class, attribute and event work',
    ],
    code: `import { Directive, signal } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  host: {
    role: 'button',
    '[class.highlighted]': 'on()',
    '(mouseenter)': 'on.set(true)',
    '(mouseleave)': 'on.set(false)',
    '(document:keydown.escape)': 'on.set(false)',
  },
})
export class Highlight {
  on = signal(false);
}

// Old style equivalent:
// @HostBinding('class.highlighted') get h() { return this.on(); }
// @HostListener('mouseenter') enter() { this.on.set(true); }`,
  },
  {
    id: 'ax-15',
    level: 'junior',
    topic: 'communication',
    difficulty: 'medium',
    simple: {
      hi: 'ElementRef se DOM chhoona aisa hai jaise khud bijli ke taar jodna — kaam hota hai par khatra hai. Renderer2 ek certified electrician jaisa hai jo har ghar (browser ya server) mein sahi tareeke se kaam karta hai.',
      en: 'Touching the DOM with ElementRef is like joining electric wires yourself — it works but it\'s risky. Renderer2 is like a certified electrician who does the job correctly in every house (browser or server).',
      bn: 'ElementRef দিয়ে DOM ছোঁয়া মানে নিজে নিজে বিদ্যুতের তার জোড়া — কাজ হয়, কিন্তু ঝুঁকি আছে। Renderer2 হলো সার্টিফায়েড ইলেকট্রিশিয়ান, যে প্রতিটা বাড়িতে (browser বা server) ঠিকভাবে কাজ করে।',
    },
    question: 'Renderer2 vs direct DOM access via ElementRef.',
    answer: 'ElementRef.nativeElement gives you the raw DOM node, so you can call any browser API directly, but that code assumes a real browser DOM and bypasses Angular\'s sanitization. Renderer2 is Angular\'s abstraction for DOM operations (setStyle, addClass, setAttribute, listen, createElement, appendChild), which keeps code platform-agnostic and safer for server-side rendering. In practice: prefer template/host bindings first, Renderer2 for imperative changes, and nativeElement only for read-only browser APIs like focus() or measuring, ideally inside afterNextRender.',
    points: [
      'nativeElement.innerHTML = userInput is an XSS risk; Renderer2 and bindings do not use raw innerHTML',
      'Renderer2.listen() returns an unlisten function — call it on destroy',
      'Renderer2 is injected with inject(Renderer2) in a component or directive',
      'Direct DOM code may break on the server where browser APIs are limited',
      'Order of preference: bindings > Renderer2 > nativeElement',
    ],
    code: `import { Directive, DestroyRef, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({ selector: '[appAutoColor]' })
export class AutoColor {
  private el = inject(ElementRef<HTMLElement>);
  private r = inject(Renderer2);

  constructor() {
    this.r.setStyle(this.el.nativeElement, 'color', 'teal');
    this.r.addClass(this.el.nativeElement, 'ready');
    const unlisten = this.r.listen(this.el.nativeElement, 'click', () =>
      this.r.setStyle(this.el.nativeElement, 'color', 'crimson'));
    inject(DestroyRef).onDestroy(unlisten);
  }
}`,
  },
  {
    id: 'ax-16',
    level: 'mid',
    topic: 'di',
    difficulty: 'medium',
    simple: {
      hi: 'Class ki picnic mein har bachcha ek dish laata hai aur sab ek hi table par rakh di jaati hain. Multi provider bhi waisa hai — kai jagah se cheezein aati hain aur inject karne par poori list milti hai.',
      en: 'At a class picnic every child brings one dish and they are all put on one table. A multi provider is the same — things come from many places and when you inject it you get the whole list.',
      bn: 'ক্লাসের পিকনিকে প্রত্যেক বাচ্চা একটা করে খাবার আনে, আর সব একটাই টেবিলে রাখা হয়। Multi provider-ও তেমন — অনেক জায়গা থেকে জিনিস আসে, আর inject করলে পুরো লিস্টটা পাওয়া যায়।',
    },
    question: 'What are multi providers? Give an example.',
    answer: 'Normally, providing the same token twice means the last provider wins. With multi: true, every provider for that token is collected and inject(TOKEN) returns an array of all the values. This is a plugin/extension pattern: many independent parts of the app can contribute to one list, and Angular itself uses it for NG_VALIDATORS, NG_VALUE_ACCESSOR and HTTP_INTERCEPTORS.',
    points: [
      'multi: true on every provider of that token, otherwise you get an error/override',
      'inject() returns T[] in registration order',
      'Usually used with an InjectionToken<T[]>',
      'Child injectors with multi providers for the same token create a new array; they don\'t append to the parent\'s',
      'Real uses: validators, value accessors, class-based HTTP interceptors, initializers',
    ],
    code: `import { InjectionToken, inject, Injectable } from '@angular/core';

export interface Logger { log(msg: string): void; }
export const LOGGERS = new InjectionToken<Logger[]>('LOGGERS');

// app.config.ts
export const providers = [
  { provide: LOGGERS, multi: true, useValue: { log: (m: string) => console.log(m) } },
  { provide: LOGGERS, multi: true, useValue: { log: (m: string) => sendToServer(m) } },
];
declare function sendToServer(m: string): void;

@Injectable({ providedIn: 'root' })
export class LogService {
  private loggers = inject(LOGGERS); // Logger[] with 2 items
  log(msg: string) { this.loggers.forEach(l => l.log(msg)); }
}`,
  },
  {
    id: 'ax-17',
    level: 'senior',
    topic: 'di',
    difficulty: 'hard',
    simple: {
      hi: 'Shaadi ke card par likha hota hai \'dulha: Rahul\', jabki Rahul abhi pahuncha bhi nahi. forwardRef bhi bas itna kehta hai — \'naam yaad rakho, insaan baad mein aa jaayega\'.',
      en: 'A wedding card says \'groom: Rahul\' even though Rahul hasn\'t arrived yet. forwardRef says the same — \'remember the name, the person will come later\'.',
      bn: 'বিয়ের কার্ডে লেখা থাকে \'বর: রাহুল\', যদিও রাহুল তখনও এসে পৌঁছায়নি। forwardRef-ও এটাই বলে — \'নামটা মনে রাখো, মানুষটা পরে আসবে\'।',
    },
    question: 'What is forwardRef and when do you need it?',
    answer: 'forwardRef(() => SomeClass) wraps a reference in a function so Angular resolves it lazily, after the class actually exists. You need it when a class is referenced before its declaration has been evaluated: a class used in a provider or decorator metadata that is declared later in the same file, a class referencing itself in its own decorator (the classic NG_VALUE_ACCESSOR / NG_VALIDATORS useExisting case), or some circular references between files. Without it the reference is undefined at evaluation time because ES classes are not hoisted.',
    points: [
      'Root cause: class declarations are in the temporal dead zone until evaluated',
      'Classic case: providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => MyInput), multi: true }]',
      'Also used with inject(forwardRef(() => Parent)) style circular parent/child lookups',
      'It only delays the reference; it doesn\'t fix a real circular dependency between services',
      'If you can, reorder code or split files instead of using forwardRef',
    ],
    code: `import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stars-input',
  template: \`<button (click)="set(5)">5 stars</button>\`,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarsInput),
    multi: true,
  }],
})
export class StarsInput implements ControlValueAccessor {
  private onChange: (v: number) => void = () => {};
  set(v: number) { this.onChange(v); }
  writeValue(_: number) {}
  registerOnChange(fn: (v: number) => void) { this.onChange = fn; }
  registerOnTouched() {}
}`,
  },
  {
    id: 'ax-18',
    level: 'mid',
    topic: 'di',
    difficulty: 'medium',
    simple: {
      hi: 'Dukaan ka shutter uthane se pehle maalik light jalata hai, galla check karta hai aur saamaan sajata hai. provideAppInitializer wahi taiyaari hai jo app khulne se pehle hoti hai.',
      en: 'Before raising the shop shutter, the owner switches on the lights, checks the cash box and arranges the goods. provideAppInitializer is that preparation done before the app opens.',
      bn: 'দোকানের শাটার তোলার আগে মালিক আলো জ্বালান, ক্যাশবাক্স দেখেন আর জিনিস সাজান। provideAppInitializer হলো app খোলার আগের সেই প্রস্তুতি।',
    },
    question: 'provideAppInitializer / APP_INITIALIZER — running code before the app starts.',
    answer: 'provideAppInitializer(fn) registers a function that runs during bootstrap, in an injection context, before the root component is rendered. If it returns a Promise or Observable, Angular waits for it to finish, which makes it ideal for loading runtime config, restoring an auth session or loading translations. It replaces the older APP_INITIALIZER multi-provider token, which needed a factory and deps and is now deprecated.',
    points: [
      'Function runs in an injection context, so inject() works directly inside it',
      'Returning a Promise/Observable blocks bootstrap until it resolves — keep it fast',
      'If it rejects/errors, bootstrap fails, so handle errors (e.g. fall back to defaults)',
      'Old style: { provide: APP_INITIALIZER, useFactory, deps, multi: true }',
      'Related: provideEnvironmentInitializer and providePlatformInitializer',
    ],
    code: `import { ApplicationConfig, inject, provideAppInitializer } from '@angular/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ConfigStore } from './config.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(async () => {
      const http = inject(HttpClient);
      const store = inject(ConfigStore);
      const cfg = await firstValueFrom(http.get<{ apiUrl: string }>('/assets/config.json'));
      store.set(cfg);
    }),
  ],
};`,
  },
  {
    id: 'ax-19',
    level: 'senior',
    topic: 'di',
    difficulty: 'hard',
    simple: {
      hi: 'Injector ek godown jaisa hai jahan saamaan (services) rakha hota hai. EnvironmentInjector bada company godown hai, Injector.create ek chhota temporary godown, aur runInInjectionContext matlab kisi ko godown ki chaabi dekar kehna \'ab tum andar se saamaan le sakte ho\'.',
      en: 'An injector is like a warehouse where goods (services) are kept. EnvironmentInjector is the big company warehouse, Injector.create is a small temporary one, and runInInjectionContext is handing someone the warehouse key so they can take goods from inside.',
      bn: 'Injector হলো গুদামের মতো, যেখানে মাল (services) রাখা থাকে। EnvironmentInjector হলো কোম্পানির বড় গুদাম, Injector.create হলো ছোট অস্থায়ী গুদাম, আর runInInjectionContext মানে কাউকে গুদামের চাবি দিয়ে বলা \'এবার ভেতর থেকে মাল নিতে পারো\'।',
    },
    question: 'EnvironmentInjector, runInInjectionContext and Injector.create.',
    answer: 'An EnvironmentInjector holds non-element providers: the root injector from app config, and child injectors created for lazy-loaded routes; you can create one with createEnvironmentInjector(providers, parent). runInInjectionContext(injector, fn) runs fn with that injector as the current injection context, so inject() works inside callbacks, tests or helper functions that run outside constructors. Injector.create({ providers, parent }) creates a lightweight standalone injector, commonly used to pass custom tokens or data into dynamically created components or embedded views.',
    points: [
      'inject() only works in an injection context: constructors, field initializers, factories, provider functions, or runInInjectionContext',
      'EnvironmentInjector is used for createComponent(Cmp, { environmentInjector }) and by the router for lazy routes',
      'Injector.create builds an element-independent injector; useful for portals/dialogs to pass DATA tokens',
      'assertInInjectionContext(fn) helps library functions give a clear error',
      'Created environment injectors should be destroyed (injector.destroy()) when no longer needed',
    ],
    code: `import { EnvironmentInjector, Injectable, InjectionToken, Injector, inject, runInInjectionContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const DIALOG_DATA = new InjectionToken<{ title: string }>('DIALOG_DATA');

@Injectable({ providedIn: 'root' })
export class Helper {
  private env = inject(EnvironmentInjector);

  later() {
    setTimeout(() => {
      runInInjectionContext(this.env, () => {
        const http = inject(HttpClient); // works: we are in a context
        http.get('/api/ping').subscribe();
      });
    });
  }

  dialogInjector(parent: Injector) {
    return Injector.create({ providers: [{ provide: DIALOG_DATA, useValue: { title: 'Hi' } }], parent });
  }
}`,
  },
  {
    id: 'ax-20',
    level: 'senior',
    topic: 'di',
    difficulty: 'hard',
    simple: {
      hi: 'Ghar mein providers aise hain jaise khana ghar walon aur aaye hue mehmaanon dono ko milta hai. viewProviders aise hain jaise kuch special mithai sirf ghar walon ke liye rakhi ho, mehmaan ko nahi milti.',
      en: 'providers are like food served to both family members and visiting guests. viewProviders are like special sweets kept only for the family — guests don\'t get them.',
      bn: 'providers হলো এমন খাবার যা বাড়ির লোক আর অতিথি দুজনেই পায়। viewProviders হলো কিছু বিশেষ মিষ্টি যা শুধু বাড়ির লোকের জন্য রাখা — অতিথিরা পায় না।',
    },
    question: 'viewProviders vs providers.',
    answer: 'Both create a provider on the component\'s element injector, but they differ in who can see it. providers are visible to the component, its own template (view children) and any content projected into it via <ng-content>. viewProviders are visible only to the component and its own view — projected content from the parent cannot inject them, so library components can keep internal services private and avoid leaking or overriding services for user content.',
    points: [
      'providers: component + view children + content children (projected)',
      'viewProviders: component + view children only',
      'Projected content resolves DI from where it is declared (the parent\'s template), not where it is rendered',
      'Use viewProviders to hide internal helper services of a reusable component',
      'Only components have viewProviders; directives only have providers',
    ],
    code: `import { Component, Injectable, inject } from '@angular/core';

@Injectable() export class TabState { active = 0; }

@Component({ selector: 'app-tab-label', template: \`label\` })
export class TabLabel {
  state = inject(TabState, { optional: true }); // null if projected and only in viewProviders
}

@Component({
  selector: 'app-tabs',
  imports: [TabLabel],
  viewProviders: [TabState], // try providers: [TabState] to expose it to projected content
  template: \`<app-tab-label /> <ng-content />\`,
})
export class Tabs {}

<!-- template -->
<app-tabs><app-tab-label /></app-tabs>
<!-- inner (view) label gets TabState; projected label gets null -->`,
  },
  {
    id: 'ax-21',
    level: 'mid',
    topic: 'change-detection',
    difficulty: 'medium',
    simple: {
      hi: 'Har ball par scoreboard update karne ki zaroorat nahi, sirf run ya wicket par karo. runOutsideAngular har chhoti harkat par scoreboard (change detection) ko pareshan nahi karta, aur zone.run() tabhi bulata hai jab sach mein score badla.',
      en: 'You don\'t need to update the scoreboard on every ball, only on a run or a wicket. runOutsideAngular doesn\'t disturb the scoreboard (change detection) on every tiny movement, and zone.run() is called only when the score really changes.',
      bn: 'প্রতিটা বলে স্কোরবোর্ড আপডেট করার দরকার নেই, শুধু রান বা উইকেট হলে। runOutsideAngular প্রতিটা ছোট নড়াচড়ায় স্কোরবোর্ডকে (change detection) বিরক্ত করে না, আর zone.run() তখনই ডাকা হয় যখন সত্যিই স্কোর বদলায়।',
    },
    question: 'NgZone.runOutsideAngular — when and why (in zone-based apps)?',
    answer: 'In a Zone.js app, every async event (click, setTimeout, scroll, requestAnimationFrame, XHR) inside the Angular zone triggers change detection for the whole app. ngZone.runOutsideAngular(fn) runs fn in the parent zone, so high-frequency work like mousemove/scroll handlers, animation loops, polling or chart libraries doesn\'t trigger change detection hundreds of times per second. When you do need the UI to update, re-enter with ngZone.run() or update a signal.',
    points: [
      'Use for high-frequency events and third-party libraries that schedule lots of timers',
      'Event listeners added inside runOutsideAngular stay outside the zone',
      'Re-enter with ngZone.run(() => ...) only when something visible changes',
      'In zoneless apps this is unnecessary: NgZone is a no-op and CD is driven by signals/markForCheck',
      'Also helps tests/SSR stability when long-running timers would keep the zone unstable',
    ],
    code: `import { Component, ElementRef, NgZone, inject, signal, afterNextRender } from '@angular/core';

@Component({ selector: 'app-tracker', template: \`<p>Far right? {{ right() }}</p>\` })
export class Tracker {
  private zone = inject(NgZone);
  private host = inject(ElementRef<HTMLElement>);
  right = signal(false);

  constructor() {
    afterNextRender(() => {
      this.zone.runOutsideAngular(() => {
        this.host.nativeElement.addEventListener('mousemove', (e: MouseEvent) => {
          const isRight = e.clientX > window.innerWidth - 100;
          if (isRight !== this.right()) this.zone.run(() => this.right.set(isRight));
        });
      });
    });
  }
}`,
  },
  {
    id: 'ax-22',
    level: 'senior',
    topic: 'change-detection',
    difficulty: 'hard',
    simple: {
      hi: 'Zoneless app mein waiter tabhi aata hai jab aap ghanti bajaate ho (signal ya event). PendingTasks restaurant ko batata hai \'abhi khana ban raha hai, bill mat banao\' — kaam khatam hone par hi plate (HTML) table par jaati hai.',
      en: 'In a zoneless app the waiter comes only when you ring the bell (a signal or event). PendingTasks tells the restaurant \'food is still cooking, don\'t make the bill yet\' — the plate (HTML) goes to the table only when the work is done.',
      bn: 'Zoneless app-এ ওয়েটার তখনই আসে যখন তুমি ঘণ্টা বাজাও (signal বা event)। PendingTasks রেস্টুরেন্টকে বলে \'খাবার এখনও রান্না হচ্ছে, বিল বানিও না\' — কাজ শেষ হলে তবেই প্লেট (HTML) টেবিলে যায়।',
    },
    question: 'What schedules change detection in a zoneless app, and what is PendingTasks used for?',
    answer: 'Without Zone.js, Angular schedules change detection only when it is told something changed: a signal read in a template is updated, markForCheck() is called (the async pipe does this), a template or host event listener fires, ComponentRef.setInput() is called, or a view is attached/removed. Plain setTimeout or a mutated class field does nothing on its own. PendingTasks lets you tell Angular "the app is not stable yet" for async work it can\'t see — SSR waits for those tasks before serializing HTML, and tests can await stability; HttpClient and the router already register their own tasks.',
    points: [
      'Triggers: signal set/update read by a view, markForCheck(), async pipe, bound DOM events, setInput(), attach/detach of views',
      'Not triggers: setTimeout, Promise.then or mutating a plain property by itself',
      'Fix legacy code by moving state to signals or calling markForCheck()',
      'PendingTasks.add() returns a function you call when the work is done; PendingTasks.run(fn) wraps an async function',
      'Important for SSR: without a pending task the server may render before your data arrives',
    ],
    code: `import { Component, PendingTasks, inject, signal } from '@angular/core';

@Component({ selector: 'app-quote', template: \`<p>{{ quote() }}</p>\` })
export class Quote {
  private tasks = inject(PendingTasks);
  quote = signal('Loading...');

  constructor() {
    const done = this.tasks.add(); // app is NOT stable yet
    fetch('/api/quote')
      .then(r => r.text())
      .then(text => this.quote.set(text)) // signal update schedules CD
      .finally(done);                      // now SSR can serialize
  }
}`,
  },
  {
    id: 'ax-23',
    level: 'mid',
    topic: 'signals',
    difficulty: 'medium',
    simple: {
      hi: 'untracked aisa hai jaise match dekhte hue ghadi par nazar daal lena — time pata chal gaya par aap ghadi ke fan nahi bane. Custom equality aisa hai jaise naya par same design ka school bag — maa kehti hai \'koi badlaav nahi\'.',
      en: 'untracked is like glancing at the clock while watching a match — you learn the time but you don\'t start following the clock. Custom equality is like a new school bag with the exact same design — mom says \'nothing changed\'.',
      bn: 'untracked হলো ম্যাচ দেখতে দেখতে ঘড়ির দিকে একবার তাকানো — সময় জানলে, কিন্তু ঘড়ির ভক্ত হয়ে গেলে না। Custom equality হলো একই ডিজাইনের নতুন স্কুলব্যাগ — মা বলেন \'কিছুই বদলায়নি\'।',
    },
    question: 'untracked() and custom equality functions for signals.',
    answer: 'untracked(() => sig()) reads a signal inside a computed or effect without making it a dependency, so changes to that signal won\'t re-run the effect; it is useful when you need a current value (like a user id for logging) but only want to react to some other signal. Every signal and computed decides whether a new value is a change using an equality function, Object.is by default. Passing { equal: fn } lets you treat structurally-equal values as unchanged, so dependents don\'t recompute and views don\'t re-render.',
    points: [
      'untracked also prevents accidental dependencies from code called inside an effect (e.g. a service method that reads signals)',
      'Default equal is Object.is: a new object with the same contents IS a change',
      'signal(value, { equal }) and computed(fn, { equal }) both accept it',
      'If equal returns true, set() is ignored and nothing downstream is notified',
      'Don\'t mutate an object and set the same reference — with Object.is that is not a change',
    ],
    code: `import { computed, effect, signal, untracked } from '@angular/core';

const userId = signal(7);
const page = signal(1);

effect(() => {
  const p = page(); // tracked
  const id = untracked(() => userId()); // not tracked
  console.log(\`user \${id} opened page \${p}\`);
});

type Point = { x: number; y: number };
const pos = signal<Point>({ x: 0, y: 0 }, {
  equal: (a, b) => a.x === b.x && a.y === b.y,
});
const label = computed(() => \`\${pos().x},\${pos().y}\`);
pos.set({ x: 0, y: 0 }); // treated as unchanged: label not recomputed`,
  },
  {
    id: 'ax-24',
    level: 'junior',
    topic: 'signals',
    difficulty: 'medium',
    simple: {
      hi: 'Purane tareeke mein aapko khud baar-baar class mein jaakar ginna padta tha ki kitne bachche aaye. Signal query ek smart attendance board jaisa hai jo bachcha aate-jaate hi apne aap update ho jaata hai.',
      en: 'With the old way you had to keep walking into the class to count how many children came. A signal query is like a smart attendance board that updates by itself whenever a child comes or goes.',
      bn: 'পুরোনো পদ্ধতিতে তোমাকে বারবার ক্লাসে গিয়ে গুনতে হতো কতজন বাচ্চা এসেছে। Signal query হলো স্মার্ট অ্যাটেনডেন্স বোর্ড, যা বাচ্চা আসা-যাওয়া করলেই নিজে থেকে আপডেট হয়ে যায়।',
    },
    question: 'Signal queries: viewChild(), viewChildren(), contentChild() vs decorator queries.',
    answer: 'viewChild(), viewChildren(), contentChild() and contentChildren() are function-based queries that return signals instead of plain properties. viewChild() gives Signal<T | undefined> (or Signal<T> with .required), viewChildren() gives Signal<readonly T[]>, and they update automatically when elements appear or disappear in @if/@for. Compared to @ViewChild/@ViewChildren you don\'t need ngAfterViewInit, QueryList.changes or the static flag — you can just use the query in computed() or effect().',
    points: [
      'viewChild(\'ref\') / viewChild(MyCmp) — look in the component\'s own template',
      'contentChild()/contentChildren() — look in projected content; descendants option for deep search',
      'read option: viewChild(\'box\', { read: ElementRef })',
      '.required variants throw if read when no result exists',
      'Decorator queries return QueryList and need lifecycle timing; signal queries are reactive and type-safe',
    ],
    code: `import { Component, ElementRef, computed, effect, signal, viewChild, viewChildren } from '@angular/core';

@Component({
  selector: 'app-list',
  template: \`
    <input #search />
    @for (item of items(); track item) { <li #row>{{ item }}</li> }\`,
})
export class List {
  items = signal(['a', 'b', 'c']);
  search = viewChild.required<ElementRef<HTMLInputElement>>('search');
  rows = viewChildren<ElementRef<HTMLLIElement>>('row');
  rowCount = computed(() => this.rows().length);

  constructor() {
    effect(() => this.search().nativeElement.focus());
  }
}`,
  },
  {
    id: 'ax-25',
    level: 'mid',
    topic: 'signals',
    difficulty: 'medium',
    simple: {
      hi: 'Teeno khana mangwane ke tareeke hain: resource khud dukaan jaakar laana (Promise), rxResource tiffin service jo roz deti hai (Observable), aur httpResource Swiggy jaisa app jo apne aap sab rules (interceptors) follow karta hai.',
      en: 'All three are ways to get food: resource is going to the shop yourself (Promise), rxResource is a tiffin service that delivers regularly (Observable), and httpResource is an app like Swiggy that follows all the rules (interceptors) automatically.',
      bn: 'তিনটেই খাবার আনানোর উপায়: resource হলো নিজে দোকানে গিয়ে আনা (Promise), rxResource হলো টিফিন সার্ভিস যা নিয়মিত দিয়ে যায় (Observable), আর httpResource হলো Swiggy-র মতো app, যা নিজে থেকেই সব নিয়ম (interceptors) মেনে চলে।',
    },
    question: 'resource vs rxResource vs httpResource — which one when?',
    answer: 'All three turn async data into signals (value, status, isLoading, error, reload) that refetch when their reactive params change. resource() takes a Promise-based loader, so it fits fetch(), IndexedDB or any async function, and passes an AbortSignal for cancellation. rxResource() takes a stream function that returns an Observable, which suits existing RxJS-based services. httpResource() is built on HttpClient: you give it a URL or request object as a reactive function, and it goes through interceptors, with extra signals like headers and statusCode.',
    points: [
      'resource({ params, loader: ({ params, abortSignal }) => Promise })',
      'rxResource({ params, stream: ({ params }) => Observable }) from @angular/core/rxjs-interop',
      'httpResource(() => `/api/users/${id()}`) from @angular/common/http — interceptors, testing tools apply',
      'If params returns undefined, the resource stays idle and doesn\'t load',
      'They are meant for reading data; use HttpClient directly for POST/PUT mutations',
      'These APIs are newer and some are still marked experimental — check the docs for your version',
    ],
    code: `import { Component, inject, resource, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient, httpResource } from '@angular/common/http';

type User = { id: number; name: string };

@Component({ selector: 'app-user', template: \`{{ viaHttp.value()?.name }}\` })
export class UserCmp {
  private http = inject(HttpClient);
  id = signal(1);

  viaFetch = resource({
    params: () => ({ id: this.id() }),
    loader: ({ params, abortSignal }) =>
      fetch(\`/api/users/\${params.id}\`, { signal: abortSignal }).then(r => r.json() as Promise<User>),
  });

  viaRx = rxResource({
    params: () => this.id(),
    stream: ({ params }) => this.http.get<User>(\`/api/users/\${params}\`),
  });

  viaHttp = httpResource<User>(() => \`/api/users/\${this.id()}\`);
}`,
  },
  {
    id: 'ax-26',
    level: 'senior',
    topic: 'signals',
    difficulty: 'hard',
    simple: {
      hi: 'Reactive form ek register jaisa hai jismein har cheez alag se likhni aur milani padti hai. Signal Forms ek smart notebook jaisi hai — jo likho wahi asli data hai, aur galti hote hi apne aap laal nishaan lag jaata hai.',
      en: 'A reactive form is like a register where you write and match every entry separately. Signal Forms are like a smart notebook — what you write is the real data, and a red mark appears by itself as soon as there\'s a mistake.',
      bn: 'Reactive form হলো একটা রেজিস্টার খাতা, যেখানে প্রতিটা জিনিস আলাদা করে লিখে মিলিয়ে নিতে হয়। Signal Forms হলো স্মার্ট নোটবুক — যা লিখবে সেটাই আসল data, আর ভুল হলেই নিজে থেকে লাল দাগ পড়ে যায়।',
    },
    question: 'What are Signal Forms (experimental in Angular 21)? How do they differ from reactive forms?',
    answer: 'Signal Forms (from @angular/forms/signals) build a form on top of a writable signal that holds your data model. You call form(modelSignal, schema) and get a typed field tree where each field exposes its state as signals — value(), valid(), errors(), touched(), dirty() — and validation is declared with schema functions like required(), email(), minLength() or custom validate(). Unlike reactive forms, there are no FormGroup/FormControl classes to build and keep in sync, no valueChanges Observables, and the model signal is the single source of truth; the API is experimental, so names may still change.',
    points: [
      'Model-first: the signal you pass in IS the form value; field edits write straight back to it',
      'Schema-based, reusable validation rules; conditional rules (e.g. only when another field has a value)',
      'Everything is a signal, so it works naturally with computed(), effect() and zoneless change detection',
      'Bound in the template with a field directive (e.g. [field]="f.email") instead of formControlName',
      'Reactive forms remain stable and recommended for production; Signal Forms are experimental',
    ],
    code: `import { Component, signal } from '@angular/core';
import { form, Field, required, email } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [Field],
  template: \`
    <input [field]="loginForm.email" />
    @if (loginForm.email().invalid()) { <small>Valid email required</small> }
    <input type="password" [field]="loginForm.password" />
    <button [disabled]="loginForm().invalid()">Login</button>\`,
})
export class Login {
  model = signal({ email: '', password: '' });
  loginForm = form(this.model, (p) => {
    required(p.email);
    email(p.email);
    required(p.password);
  });
}`,
  },
  {
    id: 'ax-27',
    level: 'mid',
    topic: 'signals',
    difficulty: 'medium',
    simple: {
      hi: 'toSignal ek TV recorder jaisa hai jo channel (Observable) ka latest scene dikhata hai. initialValue matlab shuru mein ek default photo, requireSync matlab \'TV on karte hi picture aani hi chahiye\', aur manualCleanup matlab ghar chhodne par bhi recording chalti rahe jab tak show khatam na ho.',
      en: 'toSignal is like a TV recorder that always shows the latest scene of a channel (Observable). initialValue is a default photo at the start, requireSync means \'the picture must appear the moment the TV is on\', and manualCleanup means recording continues even after you leave home, until the show ends.',
      bn: 'toSignal হলো একটা TV রেকর্ডার, যা চ্যানেলের (Observable) সর্বশেষ দৃশ্য দেখায়। initialValue মানে শুরুতে একটা ডিফল্ট ছবি, requireSync মানে \'TV চালু করলেই ছবি আসতেই হবে\', আর manualCleanup মানে বাড়ি ছেড়ে গেলেও শো শেষ না হওয়া পর্যন্ত রেকর্ডিং চলবে।',
    },
    question: 'toSignal options: initialValue, requireSync and manualCleanup.',
    answer: 'toSignal(obs$) subscribes to an Observable and exposes its latest value as a signal; by default the signal is undefined until the first emission and the subscription ends when the injection context (component/service) is destroyed. initialValue gives a starting value so the type doesn\'t include undefined. requireSync: true asserts the Observable emits synchronously on subscribe (like a BehaviorSubject or startWith), removing undefined from the type and throwing if it doesn\'t. manualCleanup: true keeps the subscription alive until the Observable completes, instead of tying it to DestroyRef.',
    points: [
      'Must be called in an injection context, or pass { injector }',
      'initialValue and requireSync are alternatives — use one or the other',
      'requireSync throws an error if no value is emitted synchronously',
      'manualCleanup is for Observables that complete on their own or need to outlive the component',
      'If the Observable errors, reading the signal throws that error',
      'There is also an equal option for custom equality',
    ],
    code: `import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, interval, map } from 'rxjs';

@Component({ selector: 'app-demo', template: \`{{ tick() }} {{ theme() }} {{ id() }}\` })
export class Demo {
  tick = toSignal(interval(1000), { initialValue: 0 });         // Signal<number>

  private theme$ = new BehaviorSubject<'light' | 'dark'>('light');
  theme = toSignal(this.theme$, { requireSync: true });          // Signal<'light' | 'dark'>

  id = toSignal(inject(ActivatedRoute).paramMap.pipe(map(p => p.get('id'))));
  // Signal<string | null | undefined>
}`,
  },
  {
    id: 'ax-28',
    level: 'mid',
    topic: 'rxjs',
    difficulty: 'medium',
    simple: {
      hi: 'Socho cricket scoreboard. combineLatest wo board hai jo kisi bhi team ka score badalte hi update hota hai. forkJoin wo result hai jo match khatam hone par hi aata hai, zip ek-ek ball ka jodi banata hai, aur withLatestFrom tab hi bolta hai jab umpire signal de, saath mein latest score bata deta hai.',
      en: 'Think of a cricket scoreboard. combineLatest is the board that updates whenever either team\'s score changes. forkJoin is the final result that comes only when the match is over, zip pairs things ball by ball, and withLatestFrom speaks only when the umpire signals, telling the latest score along with it.',
      bn: 'একটা cricket scoreboard ভাবো। combineLatest হলো সেই বোর্ড যেটা যেকোনো দলের রান বদলালেই আপডেট হয়। forkJoin হলো ফাইনাল রেজাল্ট যেটা ম্যাচ শেষ হলে তবেই আসে, zip বল ধরে ধরে জোড়া বানায়, আর withLatestFrom শুধু আম্পায়ার সিগন্যাল দিলে কথা বলে, সঙ্গে সর্বশেষ স্কোর জানিয়ে দেয়।',
    },
    question: 'combineLatest vs forkJoin vs zip vs withLatestFrom.',
    answer: 'All four combine streams but differ in WHEN they emit. combineLatest emits the latest value of every input whenever any input emits (after each has emitted at least once). forkJoin waits until every input completes and emits only their last values once — ideal for parallel HTTP calls. zip pairs values by index (1st with 1st, 2nd with 2nd), and withLatestFrom emits only when the source emits, attaching the latest value of the other streams.',
    points: [
      'combineLatest: re-emits on every change of any input; good for filters + data, form values',
      'forkJoin: one emission after all complete; never emits if an input never completes, and errors if any input errors',
      'zip: strict pairing by index; buffers values of the faster stream (watch memory)',
      'withLatestFrom: source-driven; other streams only provide context and do not trigger emissions',
      'withLatestFrom drops source values until every other stream has emitted once',
    ],
    code: `const filter$ = new BehaviorSubject('all');
const page$ = new BehaviorSubject(1);

// re-runs whenever filter OR page changes
combineLatest([filter$, page$]).pipe(
  switchMap(([filter, page]) => api.list(filter, page))
);

// parallel HTTP calls, one result when both complete
forkJoin({ user: api.user(1), orders: api.orders(1) })
  .subscribe(({ user, orders }) => console.log(user, orders));

// zip: pairs by index -> [1,'a'], [2,'b']
zip(of(1, 2, 3), of('a', 'b')).subscribe(console.log);

// save click carries the latest form value; form changes alone do nothing
saveClick$.pipe(withLatestFrom(form.valueChanges))
  .subscribe(([, value]) => api.save(value));`,
  },
  {
    id: 'ax-29',
    level: 'junior',
    topic: 'rxjs',
    difficulty: 'medium',
    simple: {
      hi: 'Train mein ek dibba kharab ho jaye to puri train rok dena galat hai. catchError ko andar wale request par lagao, taki sirf wahi dibba alag ho aur baaki train (stream) chalti rahe. retry matlab ek-do baar dobara try karna, phir bhi na chale to backup plan.',
      en: 'If one coach of a train breaks down, stopping the whole train is a bad idea. Put catchError on the inner request so only that coach is detached and the rest of the train (the stream) keeps running. retry means trying again once or twice before switching to a backup plan.',
      bn: 'ট্রেনের একটা কামরা খারাপ হলে পুরো ট্রেন থামিয়ে দেওয়া ভুল। catchError ভেতরের request-এ লাগাও, যাতে শুধু সেই কামরাটা আলাদা হয় আর বাকি ট্রেন (stream) চলতে থাকে। retry মানে এক-দুবার আবার চেষ্টা করা, তারপরও না হলে ব্যাকআপ প্ল্যান।',
    },
    question: 'Error handling in streams: catchError, retry, throwError, EMPTY — where to put catchError.',
    answer: 'An error terminates an Observable, so after an error the stream emits nothing more. catchError intercepts the error and must return a replacement Observable: of(fallback) to continue with a value, EMPTY to just complete silently, or throwError(() => err) to rethrow. retry re-subscribes before giving up, so it goes before catchError. For long-lived streams (search box, clicks), put catchError INSIDE the inner switchMap pipe so only that one request fails and the outer stream stays alive.',
    points: [
      'Errors complete the stream — no more values after an error',
      'catchError must return an Observable (of, EMPTY, throwError)',
      'Order matters: retry(...) first, then catchError',
      'catchError on the outer pipe kills the whole effect after the first failure; put it inside the inner Observable',
      'throwError takes a factory: throwError(() => new Error(\'...\'))',
    ],
    code: `// WRONG: one failed request kills the whole search stream
// term$.pipe(switchMap(t => api.search(t)), catchError(() => of([])))

// RIGHT: handle the error per request, outer stream keeps working
results$ = this.term$.pipe(
  debounceTime(300),
  switchMap(term =>
    this.api.search(term).pipe(
      retry({ count: 2, delay: 1000 }),
      catchError(err => {
        this.error.set('Search failed');
        return of([]);          // or EMPTY to emit nothing
      })
    )
  )
);

// rethrow after logging
// catchError(err => { log(err); return throwError(() => err); })`,
  },
  {
    id: 'ax-30',
    level: 'junior',
    topic: 'rxjs',
    difficulty: 'easy',
    simple: {
      hi: 'Golgappa wale ki tarah socho. take(3) matlab sirf 3 golgappe. takeWhile matlab jab tak teekha sahan ho tab tak khao. takeUntil matlab jab tak mummy bulaye nahi tab tak khao, aur first matlab pehla golgappa khaya aur chal diye.',
      en: 'Think of a pani-puri stall. take(3) means only 3 puris. takeWhile means keep eating while you can handle the spice. takeUntil means keep eating until mummy calls you, and first means eat the first puri and leave.',
      bn: 'ফুচকাওয়ালার কথা ভাবো। take(3) মানে শুধু ৩টে ফুচকা। takeWhile মানে যতক্ষণ ঝাল সহ্য হয় ততক্ষণ খাও। takeUntil মানে যতক্ষণ না মা ডাকছে ততক্ষণ খাও, আর first মানে প্রথম ফুচকাটা খেয়েই চলে যাও।',
    },
    question: 'take, takeUntil, first, takeWhile — differences.',
    answer: 'All of them complete a stream early and unsubscribe from the source. take(n) completes after n values; first() takes the first value (or first matching a predicate) but throws EmptyError if the source completes without one, whereas take(1) just completes quietly. takeWhile(pred) emits while the condition is true and completes on the first false value (pass true as the second argument to include that value). takeUntil(notifier$) completes when another Observable emits — in Angular, takeUntilDestroyed() is the built-in version tied to the component\'s DestroyRef.',
    points: [
      'take(n): count based',
      'first(): first value or first matching value; EmptyError if none',
      'take(1) vs first(): take(1) never errors on an empty stream',
      'takeWhile(pred, inclusive?): condition on the value itself',
      'takeUntil(notifier$) / takeUntilDestroyed(): driven by an external event; keep it last in the pipe',
    ],
    code: `interval(1000).pipe(take(3));                  // 0,1,2 then complete
interval(1000).pipe(first(n => n > 2));        // 3 then complete
EMPTY.pipe(first());                           // error: EmptyError
EMPTY.pipe(take(1));                           // just completes
interval(1000).pipe(takeWhile(n => n < 3));    // 0,1,2 (3 is dropped)
interval(1000).pipe(takeWhile(n => n < 3, true)); // 0,1,2,3

@Component({ selector: 'app-clock', template: '' })
export class Clock {
  constructor() {
    interval(1000)
      .pipe(takeUntilDestroyed())  // stops when component is destroyed
      .subscribe(n => console.log(n));
  }
}`,
  },
  {
    id: 'ax-31',
    level: 'senior',
    topic: 'rxjs',
    difficulty: 'hard',
    simple: {
      hi: 'Custom operator ek chhoti chai ki machine jaisa hai. Ek taraf se paani (source stream) aata hai, machine apna kaam karti hai aur doosri taraf se chai (naya stream) nikalti hai. Ek baar bana lo, phir har dukaan (har pipe) mein laga sakte ho.',
      en: 'A custom operator is like a small tea machine. Water (the source stream) goes in on one side, the machine does its job, and tea (a new stream) comes out the other side. Build it once and you can fit it into every shop (every pipe).',
      bn: 'Custom operator একটা ছোট চা-মেশিনের মতো। একদিক দিয়ে জল (source stream) ঢোকে, মেশিন নিজের কাজ করে আর অন্যদিক দিয়ে চা (নতুন stream) বেরোয়। একবার বানিয়ে নিলে সব দোকানে (সব pipe-এ) লাগানো যায়।',
    },
    question: 'How do you write a custom RxJS operator?',
    answer: 'An operator is just a function that takes a source Observable and returns a new Observable — type OperatorFunction<T, R> or MonoTypeOperatorFunction<T>. The easiest way is to compose existing operators: return source => source.pipe(...). For behaviour that cannot be composed, create a new Observable that subscribes to the source, forwards next/error/complete, and returns a teardown that unsubscribes. Wrapping it in a factory function (filterNil()) lets it take arguments and keeps it lazy and reusable.',
    points: [
      'Signature: (source: Observable<T>) => Observable<R>',
      'Prefer composition with pipe() over hand-written subscribers',
      'When hand-written: forward error and complete, and return teardown logic',
      'Use type guards in filter for proper narrowing (v is T)',
      'Keep operators pure and lazy — no work until someone subscribes',
    ],
    code: `import { Observable, OperatorFunction, MonoTypeOperatorFunction, filter } from 'rxjs';

// 1. Composition: removes null/undefined and narrows the type
export function filterNil<T>(): OperatorFunction<T | null | undefined, T> {
  return source => source.pipe(filter((v): v is T => v != null));
}

// 2. From scratch: logs every notification
export function debugTap<T>(tag: string): MonoTypeOperatorFunction<T> {
  return source => new Observable<T>(subscriber => {
    const sub = source.subscribe({
      next: v => { console.log(tag, v); subscriber.next(v); },
      error: e => { console.error(tag, e); subscriber.error(e); },
      complete: () => subscriber.complete(),
    });
    return () => sub.unsubscribe();   // teardown
  });
}

// usage
user$.pipe(filterNil(), debugTap('user')).subscribe();`,
  },
  {
    id: 'ax-32',
    level: 'mid',
    topic: 'rxjs',
    difficulty: 'medium',
    simple: {
      hi: 'scan ek dukaan ki khata-bahi jaisa hai. Har naye saude par dukaandaar purane hisaab mein jodta ya ghatata hai aur naya total likhta hai. startWith matlab subah dukaan khulte hi pehle page par \'0\' likh dena, taki kuch dikhe.',
      en: 'scan is like a shopkeeper\'s account book. With every new sale the shopkeeper adds or subtracts from the old total and writes the new total. startWith means writing \'0\' on the first page as soon as the shop opens, so there is always something to show.',
      bn: 'scan হলো দোকানের হিসাবের খাতার মতো। প্রতিটা নতুন বিক্রিতে দোকানদার পুরনো হিসাবে যোগ বা বিয়োগ করে নতুন মোট লেখে। startWith মানে সকালে দোকান খুলতেই প্রথম পাতায় \'0\' লিখে রাখা, যাতে কিছু একটা দেখা যায়।',
    },
    question: 'scan and startWith — building state from a stream.',
    answer: 'scan is like Array.reduce over time: it keeps an accumulator and emits the new state on every value, while reduce emits only once when the source completes. Feeding a stream of actions into scan gives a tiny Redux-style store without a library. startWith emits an initial value immediately on subscription, so the UI has a state before the first action arrives (scan\'s seed is not emitted by itself). The result can be turned into a signal with toSignal.',
    points: [
      'scan(reducer, seed) emits the accumulated state on every emission',
      'reduce only emits on complete — useless for endless UI streams',
      'startWith gives an immediate first value (e.g. empty list, loading state)',
      'Keep the reducer pure and return new objects/arrays (immutability)',
      'Combine with toSignal() or async pipe to render the state',
    ],
    code: `type Action =
  | { type: 'add'; item: string }
  | { type: 'remove'; item: string };

const actions$ = new Subject<Action>();

const cart$ = actions$.pipe(
  scan((items: string[], a: Action) =>
    a.type === 'add' ? [...items, a.item] : items.filter(i => i !== a.item),
  [] as string[]),
  startWith([] as string[])
);

cart$.subscribe(console.log);
actions$.next({ type: 'add', item: 'tea' });
actions$.next({ type: 'add', item: 'samosa' });
actions$.next({ type: 'remove', item: 'tea' });
// [] -> ['tea'] -> ['tea','samosa'] -> ['samosa']`,
  },
  {
    id: 'ax-33',
    level: 'junior',
    topic: 'routing',
    difficulty: 'easy',
    simple: {
      hi: 'School building socho. Main gate (app ka router-outlet) se aap school mein aate ho, phir class 8 ke andar alag-alag period (child routes) badalte rehte hain. Classroom wahi rehta hai, sirf blackboard (nested router-outlet) par subject badalta hai.',
      en: 'Think of a school building. You enter through the main gate (the app\'s router-outlet), and inside class 8 the periods (child routes) keep changing. The classroom stays the same; only the subject on the blackboard (the nested router-outlet) changes.',
      bn: 'একটা স্কুল বিল্ডিং ভাবো। মেইন গেট (app-এর router-outlet) দিয়ে স্কুলে ঢোকো, তারপর ক্লাস ৮-এর ভেতরে আলাদা আলাদা পিরিয়ড (child routes) বদলাতে থাকে। ক্লাসঘর একই থাকে, শুধু ব্ল্যাকবোর্ডে (nested router-outlet) বিষয় বদলায়।',
    },
    question: 'Child routes and nested <router-outlet>.',
    answer: 'Child routes let a parent page keep its own layout (tabs, sidebar) while only an inner area changes. You define them in the parent route\'s children array, and the parent component\'s template contains its own <router-outlet> where the child component is rendered. An empty-path child acts as the default tab, and child routes can also be lazy loaded with loadChildren or loadComponent. Child routes inherit parent params and resolved data through the ActivatedRoute tree.',
    points: [
      'children: [...] on the parent route',
      'Parent component must import RouterOutlet and have its own <router-outlet>',
      'URL is parent path + child path, e.g. /settings/profile',
      'path: \'\' child (or a redirect) acts as the default child',
      'routerLink without a leading slash is relative to the current route',
    ],
    code: `export const routes: Routes = [
  {
    path: 'settings',
    component: Settings,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: Profile },
      { path: 'security', loadComponent: () => import('./security').then(m => m.Security) },
    ],
  },
];

@Component({
  selector: 'app-settings',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: \`
    <nav>
      <a routerLink="profile" routerLinkActive="active">Profile</a>
      <a routerLink="security" routerLinkActive="active">Security</a>
    </nav>
    <router-outlet />  <!-- child renders here -->
  \`,
})
export class Settings {}`,
  },
  {
    id: 'ax-34',
    level: 'senior',
    topic: 'routing',
    difficulty: 'hard',
    simple: {
      hi: 'Ghar mein ek bada TV (primary outlet) hai aur kone mein ek chhota radio (named outlet). TV par channel badalte raho, radio par alag se cricket commentary chalti rahegi. Dono ka apna remote hai.',
      en: 'At home there is a big TV (the primary outlet) and a small radio in the corner (the named outlet). Keep changing TV channels and the cricket commentary on the radio keeps playing separately. Each has its own remote.',
      bn: 'বাড়িতে একটা বড় TV (primary outlet) আর কোণে একটা ছোট রেডিও (named outlet)। TV-তে চ্যানেল বদলাতে থাকো, রেডিওতে আলাদা করে ক্রিকেট কমেন্ট্রি চলতে থাকবে। দুটোর আলাদা রিমোট।',
    },
    question: 'Named (auxiliary) router outlets.',
    answer: 'A named outlet (<router-outlet name="chat" />) is a secondary outlet that is routed independently of the primary one, so you can show a chat panel, side drawer or popup that survives navigation of the main content. Routes target it with outlet: \'chat\', and the URL encodes it in parentheses, e.g. /inbox(chat:support). You open or close it with the outlets object in navigate or routerLink; setting the outlet to null closes it. Because the state is in the URL, it is bookmarkable and works with the back button.',
    points: [
      'Template: <router-outlet name="side" /> next to the primary outlet',
      'Route config: { path: \'chat\', component: Chat, outlet: \'side\' }',
      'URL shape: /primary/path(side:chat)',
      'Open: router.navigate([{ outlets: { side: [\'chat\'] } }]); close with side: null',
      'Useful for panels/modals that must stay open while the main page changes; adds URL complexity so use sparingly',
    ],
    code: `export const routes: Routes = [
  { path: 'inbox', component: Inbox },
  { path: 'support', component: SupportChat, outlet: 'side' },
];

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: \`
    <a [routerLink]="[{ outlets: { side: ['support'] } }]">Open chat</a>
    <button (click)="close()">Close chat</button>
    <router-outlet />              <!-- primary -->
    <router-outlet name="side" />  <!-- auxiliary -->
  \`,
})
export class App {
  private router = inject(Router);
  // URL: /inbox(side:support)  ->  /inbox
  close() { this.router.navigate([{ outlets: { side: null } }]); }
}`,
  },
  {
    id: 'ax-35',
    level: 'junior',
    topic: 'routing',
    difficulty: 'easy',
    simple: {
      hi: 'Query params railway ticket par likhi extra details jaise hain — coach number, seat number. Fragment matlab platform par kis jagah khade hona. navigate matlab \'yahan se agle station chalo\', aur navigateByUrl matlab poora address bata kar seedha wahan jao.',
      en: 'Query params are like extra details on a train ticket — coach number, seat number. The fragment is which spot on the platform to stand at. navigate means \'go to the next station from here\', and navigateByUrl means giving the full address and going straight there.',
      bn: 'Query params হলো ট্রেনের টিকিটে লেখা বাড়তি তথ্যের মতো — কোচ নম্বর, সিট নম্বর। Fragment মানে প্ল্যাটফর্মের কোন জায়গায় দাঁড়াতে হবে। navigate মানে \'এখান থেকে পরের স্টেশনে চলো\', আর navigateByUrl মানে পুরো ঠিকানা বলে সোজা সেখানে যাও।',
    },
    question: 'Query params and fragments; router.navigate vs navigateByUrl.',
    answer: 'Query params (?page=2&sort=name) carry optional state like filters and paging, and the fragment (#reviews) points to a section of the page; both are set via routerLink inputs or navigation extras and read from ActivatedRoute (queryParamMap, fragment) or bound to component inputs with withComponentInputBinding. router.navigate takes an array of commands and can be relative (relativeTo) with options like queryParamsHandling: \'merge\'. router.navigateByUrl takes a full string or UrlTree and is always absolute. Both return Promise<boolean>.',
    points: [
      'routerLink + [queryParams] + fragment in templates',
      'queryParamsHandling: \'merge\' keeps existing params, \'preserve\' keeps them unchanged',
      'navigate([\'../edit\'], { relativeTo: route }) — commands, relative',
      'navigateByUrl(\'/products?page=2\') — absolute string or UrlTree',
      'Read with route.queryParamMap (Observable) or input() + withComponentInputBinding()',
    ],
    code: `<!-- template -->
<a routerLink="/products" [queryParams]="{ page: 2, sort: 'price' }" fragment="reviews">Next</a>

// component
export class ProductList {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  page = input<string>();        // bound from ?page= with withComponentInputBinding()

  nextPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge',   // keep sort, change page
    });
  }

  goHome() {
    this.router.navigateByUrl('/home#top');  // always absolute
  }
}`,
  },
  {
    id: 'ax-36',
    level: 'mid',
    topic: 'routing',
    difficulty: 'medium',
    simple: {
      hi: 'Railway station ka announcement board socho. Train chalne lagi to \'Departed\' (NavigationStart), pahunchi to \'Arrived\' (NavigationEnd), cancel hui to \'Cancelled\'. Loading bar tab tak dikhao jab tak train raste mein hai — aur cancel hone par bhi band karna mat bhoolna.',
      en: 'Think of the announcement board at a railway station. When the train leaves it shows \'Departed\' (NavigationStart), when it reaches \'Arrived\' (NavigationEnd), and if cancelled, \'Cancelled\'. Show the loading bar while the train is on the way — and do not forget to hide it when the train is cancelled too.',
      bn: 'রেলস্টেশনের ঘোষণা বোর্ডের কথা ভাবো। ট্রেন ছাড়লে \'Departed\' (NavigationStart), পৌঁছালে \'Arrived\' (NavigationEnd), বাতিল হলে \'Cancelled\'। যতক্ষণ ট্রেন রাস্তায় ততক্ষণ loading bar দেখাও — আর বাতিল হলেও সেটা বন্ধ করতে ভুলো না।',
    },
    question: 'Router events — show a loading bar during navigation.',
    answer: 'Router.events is an Observable of every navigation lifecycle event: NavigationStart, RoutesRecognized, GuardsCheckStart/End, ResolveStart/End, and finally one of NavigationEnd, NavigationCancel, NavigationError (or NavigationSkipped). To show a loading bar, map NavigationStart to true and any terminating event to false, and convert it to a signal with toSignal. Handling Cancel and Error is essential — otherwise the bar stays forever when a guard returns false or a lazy chunk fails to load.',
    points: [
      'router.events emits typed event classes; narrow with instanceof',
      'Start -> true; End / Cancel / Error -> false',
      'Forgetting NavigationCancel/Error leaves the spinner stuck',
      'toSignal gives a zoneless-friendly signal for the template',
      'Lazy loading and resolvers are the slow parts the bar covers',
    ],
    code: `import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, RouterOutlet } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: \`
    @if (loading()) { <div class="top-loading-bar"></div> }
    <router-outlet />
  \`,
})
export class App {
  private router = inject(Router);
  loading = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd ||
                  e instanceof NavigationCancel || e instanceof NavigationError),
      map(e => e instanceof NavigationStart)
    ),
    { initialValue: false }
  );
}`,
  },
  {
    id: 'ax-37',
    level: 'senior',
    topic: 'routing',
    difficulty: 'hard',
    simple: {
      hi: 'Library se book lekar padhte padhte beech mein kisi aur kaam se jaana pade, to bookmark laga kar book side mein rakh dete ho. Wapas aaye to wahi page khula milta hai. RouteReuseStrategy wahi bookmark hai — page ko destroy karne ke bajaye sambhal kar rakhta hai.',
      en: 'When you are reading a library book and have to leave for some other work, you put a bookmark and keep the book aside. When you come back, the same page is open. RouteReuseStrategy is that bookmark — it keeps the page safe instead of destroying it.',
      bn: 'লাইব্রেরির বই পড়তে পড়তে মাঝপথে অন্য কাজে যেতে হলে বুকমার্ক দিয়ে বইটা পাশে রেখে দাও। ফিরে এলে সেই পাতাটাই খোলা পাও। RouteReuseStrategy হলো সেই বুকমার্ক — পাতাটাকে destroy না করে যত্ন করে রেখে দেয়।',
    },
    question: 'What is RouteReuseStrategy and when would you customise it?',
    answer: 'RouteReuseStrategy decides whether the router reuses, destroys, or detaches-and-stores a route\'s component when navigating. By default Angular reuses a component only when the route config stays the same (e.g. /users/1 to /users/2), and destroys components when you leave a route. A custom strategy can detach a page (store its component tree) and reattach it later, which keeps a long list\'s scroll position, filters and loaded data when the user comes back from a detail page. You implement shouldDetach, store, shouldAttach, retrieve and shouldReuseRoute (or extend BaseRouteReuseStrategy) and provide it in place of the default.',
    points: [
      'Default: reuse when future.routeConfig === curr.routeConfig, else destroy',
      'Customise to keep-alive heavy pages (list -> detail -> back) or to force re-creation on param change',
      'Methods: shouldDetach/store (on leave), shouldAttach/retrieve (on return), shouldReuseRoute',
      'Stored components are not destroyed: ngOnDestroy does not run and memory grows — clear the cache (e.g. on logout)',
      'Provide with { provide: RouteReuseStrategy, useClass: MyStrategy }; mark routes via data',
    ],
    code: `@Injectable()
export class KeepAliveStrategy extends BaseRouteReuseStrategy {
  private cache = new Map<string, DetachedRouteHandle>();

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.data['keepAlive'] === true;
  }
  override store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle | null): void {
    const key = route.routeConfig?.path;
    if (key !== undefined && handle) this.cache.set(key, handle);
  }
  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && this.cache.has(route.routeConfig.path ?? '');
  }
  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return route.routeConfig ? this.cache.get(route.routeConfig.path ?? '') ?? null : null;
  }
}

// routes: { path: 'products', component: ProductList, data: { keepAlive: true } }
// app.config.ts: { provide: RouteReuseStrategy, useClass: KeepAliveStrategy }`,
  },
  {
    id: 'ax-38',
    level: 'junior',
    topic: 'routing',
    difficulty: 'easy',
    simple: {
      hi: 'Har classroom ke darwaze par naam ki plate hoti hai — \'Class 5-A\'. Route title wahi plate hai jo browser tab par dikhti hai. Route data ek chhota note hai jo andar chipka hota hai — jaise \'sirf teachers allowed\'.',
      en: 'Every classroom has a name plate on the door — \'Class 5-A\'. The route title is that plate, shown on the browser tab. Route data is a small note stuck inside — like \'teachers only\'.',
      bn: 'প্রতিটা ক্লাসঘরের দরজায় একটা নামের প্লেট থাকে — \'Class 5-A\'। Route title হলো সেই প্লেট যেটা browser tab-এ দেখা যায়। Route data হলো ভেতরে আটকানো একটা ছোট নোট — যেমন \'শুধু শিক্ষকদের জন্য\'।',
    },
    question: 'Route titles (title / TitleStrategy) and static route data.',
    answer: 'Every route can set a title property — a static string or a ResolveFn<string> for dynamic titles like a product name — and the router updates document.title after each successful navigation. To apply a global pattern such as \'Page | MyShop\', extend TitleStrategy, override updateTitle using buildTitle(snapshot), and provide it. The data property holds static, read-only route metadata (roles, breadcrumb text, feature flags) that guards, components or strategies can read from the route snapshot or as component inputs with withComponentInputBinding.',
    points: [
      'title: \'Home\' or title: resolverFn for dynamic titles',
      'Custom TitleStrategy: extend it, use buildTitle(snapshot), set via Title service',
      'Provide: { provide: TitleStrategy, useClass: AppTitleStrategy }',
      'data: static config, e.g. { roles: [\'admin\'], breadcrumb: \'Orders\' }',
      'Read data via route.snapshot.data, guards\' route.data, or input() with withComponentInputBinding',
    ],
    code: `const productTitle: ResolveFn<string> = route =>
  inject(ProductService).getName(route.paramMap.get('id')!);

export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'product/:id', component: ProductPage, title: productTitle },
  { path: 'admin', component: Admin, title: 'Admin', data: { roles: ['admin'] } },
];

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private title = inject(Title);
  override updateTitle(snapshot: RouterStateSnapshot): void {
    const t = this.buildTitle(snapshot);
    this.title.setTitle(t ? \`\${t} | MyShop\` : 'MyShop');
  }
}
// providers: [provideRouter(routes), { provide: TitleStrategy, useClass: AppTitleStrategy }]`,
  },
  {
    id: 'ax-39',
    level: 'junior',
    topic: 'routing',
    difficulty: 'medium',
    simple: {
      hi: 'Post office mein agar koi purane address par chitthi bheje to postman naye address par bhej deta hai — yeh redirect hai. Jo chitthi kisi bhi address se match na ho wo \'Dead Letter\' counter par jaati hai — yeh wildcard \'**\' hai.',
      en: 'At the post office, if someone sends a letter to an old address, the postman forwards it to the new one — that is a redirect. A letter that matches no address at all goes to the \'Dead Letter\' counter — that is the wildcard \'**\'.',
      bn: 'পোস্ট অফিসে কেউ পুরনো ঠিকানায় চিঠি পাঠালে পোস্টম্যান সেটা নতুন ঠিকানায় পাঠিয়ে দেয় — এটা redirect। যে চিঠি কোনো ঠিকানার সঙ্গেই মেলে না সেটা \'Dead Letter\' কাউন্টারে যায় — এটা wildcard \'**\'।',
    },
    question: 'Redirects, wildcard routes, pathMatch and redirectTo functions.',
    answer: 'redirectTo sends the user from one path to another, and \'**\' is the wildcard route that matches anything not matched earlier, so it must be the last route (typically a 404 page). pathMatch: \'prefix\' (default) matches when the URL starts with the path, while \'full\' requires the whole remaining URL to match — an empty-path redirect needs \'full\', otherwise it would match every URL. redirectTo can also be a function that receives route info (params, queryParams, data) and returns a string or UrlTree; it runs in an injection context, so it can use inject() for logic like role-based landing pages.',
    points: [
      'Routes are matched in order — first match wins',
      '\'**\' last; usually a NotFound component',
      '{ path: \'\', redirectTo: \'home\', pathMatch: \'full\' }',
      'redirectTo function returns string | UrlTree and may call inject()',
      'Redirects are for URL rewriting; use guards for access control',
    ],
    code: `export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'users/:id', component: UserPage },

  // old URL -> new URL, keeps the param
  { path: 'profile/:id', redirectTo: ({ params }) => \`/users/\${params['id']}\` },

  // decide the landing page in code
  {
    path: 'dashboard',
    pathMatch: 'full',
    redirectTo: () => inject(AuthService).isAdmin() ? '/admin' : '/home',
  },

  { path: '**', component: NotFound },   // always last
];`,
  },
  {
    id: 'ax-40',
    level: 'fresher',
    topic: 'forms',
    difficulty: 'easy',
    simple: {
      hi: 'School form bharne jaisa. setValue matlab poora form naye sire se bharna — ek bhi khana khaali chhoda to teacher wapas kar degi. patchValue matlab sirf address badalna. reset matlab naya blank form le lena.',
      en: 'Like filling a school form. setValue means filling the whole form again — leave even one box empty and the teacher sends it back. patchValue means changing only the address. reset means taking a fresh blank form.',
      bn: 'স্কুলের ফর্ম ভরার মতো। setValue মানে পুরো ফর্ম নতুন করে ভরা — একটা ঘরও ফাঁকা রাখলে টিচার ফেরত দেবে। patchValue মানে শুধু ঠিকানাটা বদলানো। reset মানে একটা নতুন ফাঁকা ফর্ম নেওয়া।',
    },
    question: 'setValue vs patchValue vs reset.',
    answer: 'setValue replaces the value of the whole control or group and is strict: for a FormGroup you must pass every key, otherwise it throws an error. patchValue updates only the keys you pass and silently ignores the rest, which suits partial API data. reset clears the value (to null, or to the initial value for nonNullable controls, or to a value you pass) and also marks the control pristine and untouched. All three accept options like { emitEvent: false } to avoid triggering valueChanges.',
    points: [
      'setValue: all keys required, throws if one is missing or unknown',
      'patchValue: partial update, forgiving',
      'reset(value?): resets value AND pristine/untouched state',
      'nonNullable controls reset to their initial value instead of null',
      '{ emitEvent: false } skips valueChanges/statusChanges',
    ],
    code: `const fb = inject(NonNullableFormBuilder);
form = fb.group({ name: 'Ravi', city: 'Pune' });

this.form.setValue({ name: 'Asha', city: 'Delhi' });  // OK
// this.form.setValue({ name: 'Asha' });              // Error: must supply a value for 'city'

this.form.patchValue({ city: 'Kolkata' });             // only city changes

this.form.reset();                     // back to { name: 'Ravi', city: 'Pune' } (nonNullable)
this.form.reset({ name: '', city: '' }); // reset to specific values

this.form.patchValue({ name: 'X' }, { emitEvent: false }); // no valueChanges`,
  },
  {
    id: 'ax-41',
    level: 'junior',
    topic: 'forms',
    difficulty: 'medium',
    simple: {
      hi: 'Dosa wale ki tarah: \'change\' matlab har ingredient daalte hi taste check karna, \'blur\' matlab dosa tawe se utarne par check karna, \'submit\' matlab plate customer ko dene se pehle ek baar check. valueChanges batata hai dosa mein kya hai, statusChanges batata hai dosa theek bana ya nahi.',
      en: 'Like a dosa maker: \'change\' means tasting after every ingredient, \'blur\' means checking when the dosa comes off the tawa, \'submit\' means checking once before serving the plate. valueChanges tells what is in the dosa, statusChanges tells whether it turned out fine.',
      bn: 'দোসাওয়ালার মতো: \'change\' মানে প্রতিটা উপকরণ দিয়েই স্বাদ চেখে দেখা, \'blur\' মানে দোসা তাওয়া থেকে নামালে দেখা, \'submit\' মানে প্লেট খদ্দেরকে দেওয়ার আগে একবার দেখা। valueChanges বলে দোসায় কী আছে, statusChanges বলে দোসা ঠিকঠাক হয়েছে কিনা।',
    },
    question: 'updateOn, valueChanges and statusChanges.',
    answer: 'updateOn controls when a control\'s value and validity are updated: \'change\' (default, every keystroke), \'blur\' (when the field loses focus) or \'submit\' (when the form is submitted). It can be set per control or for a whole group, and \'blur\' is handy for expensive or async validators. valueChanges is an Observable that emits the new value on every update, and statusChanges emits \'VALID\', \'INVALID\', \'PENDING\' or \'DISABLED\'. Newer Angular also offers a unified control.events stream (ValueChangeEvent, StatusChangeEvent, TouchedChangeEvent, PristineChangeEvent, FormSubmittedEvent, FormResetEvent).',
    points: [
      'updateOn: \'change\' | \'blur\' | \'submit\'; set on control or group',
      '\'blur\' reduces validator/HTTP calls for async validators',
      'valueChanges: new value; statusChanges: VALID/INVALID/PENDING/DISABLED',
      'Inside a child\'s valueChanges use the emitted value — the parent\'s value may not be updated yet',
      'Unsubscribe via takeUntilDestroyed or convert with toSignal',
    ],
    code: `form = new FormGroup({
  email: new FormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: [this.emailTakenValidator],
    updateOn: 'blur',            // validate only when the user leaves the field
  }),
  search: new FormControl(''),
});

constructor() {
  this.form.controls.search.valueChanges
    .pipe(debounceTime(300), takeUntilDestroyed())
    .subscribe(term => this.load(term));

  this.form.statusChanges
    .pipe(takeUntilDestroyed())
    .subscribe(status => console.log(status)); // 'VALID' | 'INVALID' | 'PENDING' | 'DISABLED'
}`,
  },
  {
    id: 'ax-42',
    level: 'mid',
    topic: 'forms',
    difficulty: 'medium',
    simple: {
      hi: 'Dynamic form ek thali jaisa hai jismein menu card (JSON config) dekh kar katoriyan rakhi jaati hain. Aaj menu mein dal, sabzi, raita hai to teen katori; kal paneer bhi aaya to chaar. Thali wahi, katoriyan menu ke hisaab se.',
      en: 'A dynamic form is like a thali where bowls are placed by looking at the menu card (the JSON config). Today the menu has dal, sabzi and raita, so three bowls; tomorrow paneer is added, so four. Same thali, bowls according to the menu.',
      bn: 'Dynamic form একটা থালার মতো, যেখানে মেনু কার্ড (JSON config) দেখে বাটি সাজানো হয়। আজ মেনুতে ডাল, সবজি, রায়তা তাই তিনটে বাটি; কাল পনির এলে চারটে। থালা একই, বাটি মেনু অনুযায়ী।',
    },
    question: 'How do you build a dynamic form from a JSON configuration?',
    answer: 'Describe each field in a typed config (key, label, type, validators, options), usually loaded from an API. In the component, loop over the config to create a FormControl per field and add it to a FormGroup or FormRecord, mapping config flags like required or minLength to Validators. In the template, use @for over the config and @switch on the field type to render the right input, binding each with [formControlName]="field.key". For larger apps, extract each field type into its own component and keep validation rules in the config so the backend can drive the form.',
    points: [
      'Typed config interface — the single source of truth',
      'Build controls in a loop; map config rules to Validators',
      'FormRecord fits dynamic keys of the same control type',
      'Template: @for + @switch, [formControlName] bound to field.key',
      'Rebuild the form when the config changes (computed from an input signal)',
    ],
    code: `interface Field { key: string; label: string; type: 'text' | 'email' | 'select'; required?: boolean; options?: string[]; }

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule],
  template: \`
    <form [formGroup]="form()">
      @for (f of fields(); track f.key) {
        <label>{{ f.label }}</label>
        @switch (f.type) {
          @case ('select') { <select [formControlName]="f.key">
            @for (o of f.options ?? []; track o) { <option [value]="o">{{ o }}</option> }
          </select> }
          @default { <input [type]="f.type" [formControlName]="f.key" /> }
        } }
    </form>\`,
})
export class DynamicForm {
  fields = input.required<Field[]>();
  form = computed(() => {
    const group = new FormRecord<FormControl<string | null>>({});
    for (const f of this.fields()) group.addControl(f.key, new FormControl('', f.required ? Validators.required : null));
    return group;
  });
}`,
  },
  {
    id: 'ax-43',
    level: 'mid',
    topic: 'forms',
    difficulty: 'medium',
    simple: {
      hi: 'Attendance register socho — har roz kitne bachche aayenge pata nahi, par har naam ke aage sirf \'P\' ya \'A\' likhna hai. FormRecord wahi register hai: naam (keys) badalte rahein, par har khaane ka type same rehta hai.',
      en: 'Think of an attendance register — you don\'t know how many children will come each day, but next to every name you write only \'P\' or \'A\'. FormRecord is that register: the names (keys) can change, but every box has the same type.',
      bn: 'হাজিরা খাতার কথা ভাবো — রোজ কতজন বাচ্চা আসবে জানা নেই, কিন্তু প্রতিটা নামের পাশে শুধু \'P\' বা \'A\' লিখতে হবে। FormRecord হলো সেই খাতা: নাম (keys) বদলাতে পারে, কিন্তু প্রতিটা ঘরের type একই থাকে।',
    },
    question: 'FormRecord and typed dynamic controls.',
    answer: 'Since typed forms, a FormGroup has a fixed set of known keys, so TypeScript won\'t let you add arbitrary controls to it. FormRecord<TControl> is a typed group with dynamic string keys where every control has the same type, e.g. FormRecord<FormControl<boolean>> for a permissions checklist loaded from an API; addControl and removeControl stay type-safe and value is typed. If the keys are known but some are optional, declare them optional in the FormGroup type (nick?: FormControl<string>) so they can be added or removed. UntypedFormGroup is only an escape hatch for legacy code.',
    points: [
      'FormGroup: fixed, known keys with mixed control types',
      'FormRecord: dynamic keys, single control type',
      'value of FormRecord<FormControl<boolean>> is a partial string-to-boolean record',
      'Optional keys in a FormGroup type allow addControl/removeControl',
      'Use nonNullable controls so reset() does not introduce null',
    ],
    code: `// dynamic keys, same type
const permissions = new FormRecord<FormControl<boolean>>({});
for (const p of ['read', 'write', 'delete']) {
  permissions.addControl(p, new FormControl(false, { nonNullable: true }));
}
permissions.controls['read'].setValue(true);
permissions.removeControl('delete');
const v = permissions.value;     // Partial<{ [key: string]: boolean }>
// permissions.addControl('x', new FormControl('text')); // type error

// known keys, one optional
const profile = new FormGroup<{ name: FormControl<string>; nick?: FormControl<string> }>({
  name: new FormControl('', { nonNullable: true }),
});
profile.addControl('nick', new FormControl('', { nonNullable: true })); // allowed: optional key
// profile.removeControl('name');  // type error: required key`,
  },
  {
    id: 'ax-44',
    level: 'junior',
    topic: 'forms',
    difficulty: 'easy',
    simple: {
      hi: 'Class mein jo bachcha chhutti par hai (disabled), uska naam roll call (value) mein nahi bola jaata. Par school register (getRawValue) mein sab ka naam hota hai, chhutti wale ka bhi.',
      en: 'A child who is on leave (disabled) is not called during roll call (value). But the school register (getRawValue) has everyone\'s name, including the child on leave.',
      bn: 'ক্লাসে যে বাচ্চা ছুটিতে আছে (disabled), রোল কলে (value) তার নাম ডাকা হয় না। কিন্তু স্কুলের রেজিস্টারে (getRawValue) সবার নাম থাকে, ছুটিতে থাকা বাচ্চারও।',
    },
    question: 'Disabled controls — value vs getRawValue.',
    answer: 'A disabled control is excluded from its parent group\'s value and is skipped by validation, so it never makes the form invalid and its status is \'DISABLED\'. form.getRawValue() returns all values including disabled ones, which is what you usually send when a field like an auto-generated ID is shown but locked. In reactive forms, disable controls with control.disable() / enable() or create them with { value, disabled: true } instead of binding the [disabled] attribute, which Angular warns about. If you only want to block editing but keep the value in form.value, use the readonly attribute instead.',
    points: [
      'form.value excludes disabled controls',
      'form.getRawValue() includes everything',
      'Disabled controls are not validated; status = \'DISABLED\'',
      'Use new FormControl({ value: \'x\', disabled: true }) or .disable(), not [disabled] with formControlName',
      'Edge case: if every control in a group is disabled, value includes them all',
    ],
    code: `form = new FormGroup({
  id: new FormControl({ value: 'EMP-101', disabled: true }),
  name: new FormControl('Priya', Validators.required),
});

console.log(this.form.value);        // { name: 'Priya' }
console.log(this.form.getRawValue()); // { id: 'EMP-101', name: 'Priya' }

this.form.controls.name.disable();
console.log(this.form.status);        // 'DISABLED' (all controls disabled)
console.log(this.form.value);         // { id: 'EMP-101', name: 'Priya' } — all disabled, so all included

this.form.controls.name.enable();`,
  },
  {
    id: 'ax-45',
    level: 'fresher',
    topic: 'forms',
    difficulty: 'easy',
    simple: {
      hi: 'Railway reservation form par hi likha hota hai \'Naam zaroori\', \'PIN 6 digit ka\'. Template-driven form mein bhi niyam seedhe input par likh dete ho (required, pattern), aur galti hone par chhota sa laal message dikhta hai.',
      en: 'The railway reservation form itself says \'Name required\', \'PIN must be 6 digits\'. In a template-driven form you also write the rules directly on the input (required, pattern), and a small red message appears when something is wrong.',
      bn: 'রেলের রিজার্ভেশন ফর্মেই লেখা থাকে \'নাম আবশ্যিক\', \'PIN ৬ সংখ্যার\'। Template-driven form-এও নিয়মগুলো সরাসরি input-এ লিখে দাও (required, pattern), আর ভুল হলে একটা ছোট লাল মেসেজ দেখা যায়।',
    },
    question: 'Validation in template-driven forms with ngModel.',
    answer: 'In template-driven forms you import FormsModule, give each input a name and [(ngModel)], and add HTML validation attributes like required, minlength, maxlength, pattern or email — Angular turns them into validator directives. Export the control with a template reference (#email="ngModel") to read invalid, touched and errors, and the whole form with #f="ngForm" to check f.invalid or read f.value on (ngSubmit). Show messages only after the user touches the field, and for custom rules create a validator directive that provides NG_VALIDATORS.',
    points: [
      'Import FormsModule; every ngModel inside a form needs a name',
      'Validators come from attributes: required, minlength, pattern, email',
      '#ctrl="ngModel" gives access to errors, touched, dirty',
      '#f="ngForm" for form-level validity and value',
      'Angular adds CSS classes like ng-invalid and ng-touched for styling',
    ],
    code: `<!-- template -->
<form #f="ngForm" (ngSubmit)="save(f.value)">
  <input name="email" [(ngModel)]="email" required email #emailCtrl="ngModel" />
  @if (emailCtrl.invalid && emailCtrl.touched) {
    @if (emailCtrl.errors?.['required']) { <small>Email is required</small> }
    @if (emailCtrl.errors?.['email']) { <small>Enter a valid email</small> }
  }

  <input name="pin" [(ngModel)]="pin" required pattern="[0-9]{6}" #pinCtrl="ngModel" />
  @if (pinCtrl.errors?.['pattern']) { <small>PIN must be 6 digits</small> }

  <button type="submit" [disabled]="f.invalid">Save</button>
</form>

// component: imports: [FormsModule]
// email = ''; pin = '';`,
  },
  {
    id: 'ax-46',
    level: 'junior',
    topic: 'http',
    difficulty: 'medium',
    simple: {
      hi: 'Courier bhejne jaisa: HttpParams parcel ke address par likhi details hain, HttpHeaders parcel ke upar chipke stickers (jaise \'Fragile\'). HttpContext courier office ke andar ka note hai — \'is parcel ko jaldi bhejo\' — jo customer tak kabhi nahi jaata.',
      en: 'Like sending a courier: HttpParams are the details in the address, HttpHeaders are the stickers on top of the parcel (like \'Fragile\'). HttpContext is an internal note at the courier office — \'send this one fast\' — which never reaches the customer.',
      bn: 'কুরিয়ার পাঠানোর মতো: HttpParams হলো ঠিকানায় লেখা তথ্য, HttpHeaders হলো পার্সেলের উপর লাগানো স্টিকার (যেমন \'Fragile\')। HttpContext হলো কুরিয়ার অফিসের ভেতরের নোট — \'এটা তাড়াতাড়ি পাঠাও\' — যেটা কখনো খদ্দেরের কাছে যায় না।',
    },
    question: 'HttpParams, HttpHeaders and HttpContext.',
    answer: 'HttpParams builds the query string and HttpHeaders builds request headers; both are immutable, so set() and append() return a new instance that you must reassign (or simply pass plain objects in the request options). append adds repeated keys like ?tag=a&tag=b. HttpContext carries per-request metadata to interceptors using typed HttpContextToken keys — it is never sent to the server — so you can say \'skip auth\', \'skip cache\' or \'show no spinner\' for one request without hacky custom headers.',
    points: [
      'Immutable: params = params.set(\'page\', 2) — reassign!',
      'Plain objects also work: { params: { page: 2 } }, { headers: { \'X-Client\': \'web\' } }',
      'append for repeated keys, set to replace',
      'HttpContextToken<T>(() => default) defines a typed flag',
      'Interceptors read req.context.get(TOKEN); context stays client-side',
    ],
    code: `export const SKIP_AUTH = new HttpContextToken<boolean>(() => false);

// service
getUsers(page: number) {
  const params = new HttpParams().set('page', page).append('tag', 'a').append('tag', 'b');
  const headers = new HttpHeaders({ 'X-Client': 'web' });
  return this.http.get<User[]>('/api/users', {
    params,                                    // ?page=1&tag=a&tag=b
    headers,
    context: new HttpContext().set(SKIP_AUTH, true),
  });
}

// interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_AUTH)) return next(req);
  const token = inject(AuthService).token();
  return next(req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }));
};`,
  },
  {
    id: 'ax-47',
    level: 'mid',
    topic: 'http',
    difficulty: 'medium',
    simple: {
      hi: 'Paani ki tanki bharne jaisa. Pipe se paani (file) ja raha hai aur tanki par lagi meter ki sui (progress event) batati hai kitni bhar gayi — 20%, 50%, 100%. Poori bharne par ghanti bajti hai (Response).',
      en: 'Like filling a water tank. Water (the file) flows through the pipe and the meter needle on the tank (progress event) shows how full it is — 20%, 50%, 100%. When it is full, a bell rings (the Response).',
      bn: 'জলের ট্যাঙ্ক ভরার মতো। পাইপ দিয়ে জল (file) যাচ্ছে আর ট্যাঙ্কের মিটারের কাঁটা (progress event) দেখায় কতটা ভরল — ২০%, ৫০%, ১০০%। পুরো ভরলে ঘণ্টা বাজে (Response)।',
    },
    question: 'File upload with progress events.',
    answer: 'Put the file in a FormData object and POST it with { reportProgress: true, observe: \'events\' }, so HttpClient emits a stream of HttpEvent objects instead of just the body. Check event.type: HttpEventType.UploadProgress gives loaded and total bytes for a percentage, and HttpEventType.Response carries the final server response. Do not set Content-Type yourself — the browser adds the multipart boundary. Note that the fetch backend (withFetch) does not report upload progress, so upload-progress screens need the default XHR backend.',
    points: [
      'FormData + post(url, body, { reportProgress: true, observe: \'events\' })',
      'HttpEventType.UploadProgress -> event.loaded / event.total (total may be undefined)',
      'HttpEventType.Response -> final body',
      'Never set Content-Type manually for multipart',
      'withFetch() doesn\'t support upload progress; unsubscribe to cancel the upload',
    ],
    code: `@Component({
  selector: 'app-upload',
  template: \`
    <input type="file" (change)="upload($any($event.target).files[0])" />
    <progress max="100" [value]="progress()"></progress> {{ progress() }}%
  \`,
})
export class Upload {
  private http = inject(HttpClient);
  progress = signal(0);

  upload(file: File) {
    const body = new FormData();
    body.append('file', file);
    this.http.post('/api/upload', body, { reportProgress: true, observe: 'events' })
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.progress.set(Math.round((100 * event.loaded) / event.total));
        } else if (event.type === HttpEventType.Response) {
          this.progress.set(100);
        }
      });
  }
}`,
  },
  {
    id: 'ax-48',
    level: 'mid',
    topic: 'http',
    difficulty: 'medium',
    simple: {
      hi: 'Chaiwala bhaiya ko pata hai ki aap roz cutting chai mangte ho, to wo pehle se bana ke rakhta hai aur turant de deta hai. Caching interceptor bhi waise hi: same sawal dobara aaya to server tak jaaye bina purana jawab de deta hai — par chai thandi (stale) ho jaye to nayi banani padti hai.',
      en: 'The tea seller knows you order cutting chai every day, so he keeps it ready and hands it over instantly. A caching interceptor does the same: if the same request comes again it returns the saved answer without going to the server — but if the tea gets cold (stale), a fresh one must be made.',
      bn: 'চা-ওয়ালা দাদা জানেন তুমি রোজ এক কাপ চা নাও, তাই আগে থেকে বানিয়ে রাখেন আর সঙ্গে সঙ্গে দিয়ে দেন। Caching interceptor-ও তাই করে: একই request আবার এলে server-এ না গিয়ে আগের উত্তর দিয়ে দেয় — কিন্তু চা ঠান্ডা (stale) হয়ে গেলে নতুন বানাতে হয়।',
    },
    question: 'Write a caching interceptor.',
    answer: 'A caching interceptor checks GET requests against a cache (usually a Map in a root service keyed by urlWithParams): on a hit it returns of(cachedResponse) without calling the server, and on a miss it calls next(req) and stores the HttpResponse with tap. Only cache safe, idempotent GET requests, allow opting out per request with an HttpContextToken, and add a TTL or clear entries after mutations (POST/PUT/DELETE) so users don\'t see stale data. Interceptor order matters, and for duplicate in-flight requests you can also cache the shared Observable (shareReplay) instead of the response.',
    points: [
      'Cache only GET; key by req.urlWithParams',
      'Hit: return of(response.clone()); miss: next(req).pipe(tap(store))',
      'Store only HttpResponse events, not progress events',
      'Opt out per request with HttpContextToken; add TTL/invalidation',
      'Keep cache in a providedIn: \'root\' service; never cache user-specific data across logins',
    ],
    code: `export const CACHEABLE = new HttpContextToken<boolean>(() => true);
const TTL = 60_000;

@Injectable({ providedIn: 'root' })
export class HttpCache {
  readonly store = new Map<string, { res: HttpResponse<unknown>; at: number }>();
}

export const cachingInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET' || !req.context.get(CACHEABLE)) return next(req);

  const cache = inject(HttpCache).store;
  const hit = cache.get(req.urlWithParams);
  if (hit && Date.now() - hit.at < TTL) return of(hit.res.clone());

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) cache.set(req.urlWithParams, { res: event, at: Date.now() });
    })
  );
};
// provideHttpClient(withInterceptors([cachingInterceptor, authInterceptor]))`,
  },
  {
    id: 'ax-49',
    level: 'senior',
    topic: 'http',
    difficulty: 'hard',
    simple: {
      hi: 'Shaadi mein halwai (server) pehle se khana bana ke dabbe mein pack kar deta hai (transfer cache). Ghar pahunch kar aapko dobara khana banana nahi padta, bas dabba khol kar kha lo (hydration). withFetch matlab halwai naye, tez chulhe (fetch API) par khana banata hai.',
      en: 'At a wedding the caterer (server) cooks the food in advance and packs it in boxes (transfer cache). When you reach home you don\'t cook again, you just open the box and eat (hydration). withFetch means the caterer cooks on a new, faster stove (the fetch API).',
      bn: 'বিয়েবাড়িতে ক্যাটারার (server) আগে থেকে রান্না করে বাক্সে প্যাক করে দেয় (transfer cache)। বাড়ি ফিরে আর রান্না করতে হয় না, শুধু বাক্স খুলে খেয়ে নাও (hydration)। withFetch মানে ক্যাটারার নতুন, দ্রুত উনুনে (fetch API) রান্না করে।',
    },
    question: 'withFetch and the HTTP transfer cache in SSR.',
    answer: 'provideHttpClient(withFetch()) switches HttpClient\'s backend from XMLHttpRequest to the native fetch API, which is recommended for SSR because fetch is available natively on the server and performs better there. The HTTP transfer cache, enabled by provideClientHydration(), stores responses of GET and HEAD requests made during server rendering into the HTML (via TransferState); during hydration the browser reuses them instead of calling the API again, avoiding a duplicate request and a flicker. You tune it with withHttpTransferCacheOptions (includePostRequests, includeHeaders, filter, includeRequestsWithAuthHeaders) or per request with the transferCache option; requests with auth headers are not cached by default.',
    points: [
      'withFetch(): fetch backend; good for SSR and service workers, but no upload progress',
      'Transfer cache is on by default with provideClientHydration()',
      'Default: only GET/HEAD, no responses to requests with Authorization headers',
      'Configure globally via withHttpTransferCacheOptions, per request via { transferCache: false | {...} }',
      'Cache is used only for the initial hydration; later requests hit the network normally',
      'Don\'t cache personal or fast-changing data into the HTML — it is visible in page source',
    ],
    code: `// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideClientHydration(
      withHttpTransferCacheOptions({
        includePostRequests: true,        // e.g. POST /graphql queries
        includeHeaders: ['ETag'],         // headers to keep in the cached response
        filter: req => !req.url.includes('/live/'),
      })
    ),
  ],
};

// per request: always fetch fresh in the browser
price$ = this.http.get<number>('/api/live/price', { transferCache: false });`,
  },
  {
    id: 'ax-50',
    level: 'mid',
    topic: 'http',
    difficulty: 'medium',
    simple: {
      hi: 'Society ka watchman (HTTP interceptor) gate par aane wali har problem sambhalta hai — jaise bina pass wale ko wapas bhejna (401). Society ka CCTV control room (ErrorHandler) andar kahin bhi kuch galat ho to record karta hai aur report bhejta hai. Ghar ki apni problem ghar wale (component) sambhalte hain.',
      en: 'The society watchman (HTTP interceptor) handles every problem at the gate — like sending back someone without a pass (401). The society\'s CCTV control room (ErrorHandler) records anything that goes wrong anywhere inside and sends a report. Each home\'s own problems are handled by the family (the component).',
      bn: 'সোসাইটির দারোয়ান (HTTP interceptor) গেটে আসা সব সমস্যা সামলায় — যেমন পাস ছাড়া কাউকে ফেরত পাঠানো (401)। সোসাইটির CCTV কন্ট্রোল রুম (ErrorHandler) ভেতরে কোথাও কিছু ভুল হলে রেকর্ড করে আর রিপোর্ট পাঠায়। বাড়ির নিজের সমস্যা বাড়ির লোকেরা (component) সামলায়।',
    },
    question: 'Global ErrorHandler vs HTTP error interceptor — who handles what?',
    answer: 'An HTTP error interceptor sees every failed request, so it handles HTTP-specific, cross-cutting concerns: 401 -> refresh token or redirect to login, 403 -> forbidden page, 0/5xx -> a generic toast, then rethrows with throwError so callers can still react. The global ErrorHandler is the last line of defence for uncaught errors anywhere — template errors, lifecycle hooks, unhandled Observable or Promise rejections — and its job is logging and reporting (e.g. to Sentry), not recovery. Feature-specific handling, like showing a \'username taken\' message for a 409, stays in the component or service.',
    points: [
      'Interceptor: HTTP status-based, cross-cutting, rethrow after handling',
      'ErrorHandler: uncaught errors of all kinds, log/report, don\'t swallow silently',
      'Component/service: business-specific recovery (catchError in the feature)',
      'provideBrowserGlobalErrorListeners() routes window error/unhandledrejection to ErrorHandler (important without Zone.js)',
      'Avoid double toasts: decide one layer per error type',
    ],
    code: `@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private logger = inject(LoggerService);
  handleError(error: unknown): void {
    this.logger.report(error);   // e.g. send to Sentry
    console.error(error);
  }
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toast = inject(ToastService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) router.navigate(['/login']);
      else if (err.status === 0 || err.status >= 500) toast.show('Server problem, please retry');
      return throwError(() => err);   // let the caller decide too
    })
  );
};

// providers: provideBrowserGlobalErrorListeners(),
//   { provide: ErrorHandler, useClass: GlobalErrorHandler },
//   provideHttpClient(withInterceptors([errorInterceptor]))`,
  },
  {
    id: 'ax-51',
    level: 'junior',
    topic: 'performance',
    difficulty: 'easy',
    simple: {
      hi: 'NgOptimizedImage ek samajhdar delivery boy jaisa hai. Jo parcel (image) abhi chahiye, wo sabse pehle laata hai (priority), baaki parcel tab laata hai jab aap neeche scroll karke unke paas pahunchte ho (lazy). Aur pehle se jagah bata deta hai (width/height) taaki ghar ka saamaan idhar-udhar na khiske.',
      en: 'NgOptimizedImage is like a smart delivery boy. The parcel (image) you need right now comes first (priority), the rest arrive only when you scroll near them (lazy). He also tells you the box size in advance (width/height) so nothing in the room gets pushed around.',
      bn: 'NgOptimizedImage একজন বুদ্ধিমান ডেলিভারি বয়ের মতো। যে পার্সেল (image) এখনই দরকার সেটা সবার আগে আনে (priority), বাকিগুলো আনে যখন তুমি scroll করে কাছে যাও (lazy)। আর আগে থেকেই বাক্সের মাপ (width/height) বলে দেয়, যাতে ঘরের জিনিস এদিক-ওদিক সরে না যায়।',
    },
    question: 'What is NgOptimizedImage and what does it do for you?',
    answer: 'NgOptimizedImage is a built-in standalone directive from @angular/common that you turn on by using ngSrc instead of src on an <img>. It applies image best practices for you: lazy loading by default, high fetch priority for images marked priority, automatic srcset generation through an image loader, and enforced width/height (or fill) so the layout does not shift. In development it also warns about common mistakes, such as an LCP image without priority or an image that gets visibly distorted.',
    points: [
      'Import NgOptimizedImage and replace src with ngSrc',
      'width and height are required (or use fill inside a positioned parent), which prevents layout shift (CLS)',
      'Images are loading="lazy" by default; add priority to the LCP/hero image so it loads eagerly with fetchpriority="high"',
      'Loaders such as provideImgixLoader / provideCloudinaryLoader (or a custom IMAGE_LOADER) build a responsive srcset from the sizes attribute',
      'placeholder shows a blurred low-res preview while the image loads',
    ],
    code: `import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  template: \`
    <!-- template -->
    <!-- LCP image: loaded eagerly with high priority -->
    <img ngSrc="banner.jpg" width="1200" height="400" priority alt="Diwali sale" />

    <!-- below the fold: lazy by default, responsive srcset -->
    <img ngSrc="thumb.jpg" width="300" height="200" sizes="(max-width: 600px) 100vw, 300px" alt="Product" />

    <!-- unknown size: fill the positioned parent -->
    <div style="position: relative; height: 240px">
      <img ngSrc="cover.jpg" fill alt="Cover" />
    </div>
  \`,
})
export class HeroComponent {}`,
  },
  {
    id: 'ax-52',
    level: 'mid',
    topic: 'performance',
    difficulty: 'medium',
    simple: {
      hi: 'Bundle analysis aisa hai jaise school bag ka wazan check karna aur dekhna ki kaunsi kitaab sabse bhaari hai. Budget ek rule hai: \'bag 5 kg se zyada hua to teacher rok degi\' — build bhi limit cross hone par warning ya error de deta hai.',
      en: 'Bundle analysis is like weighing a school bag and finding which book is the heaviest. A budget is a rule: \'if the bag is over 5 kg, the teacher stops you\' — the build warns or fails when a limit is crossed.',
      bn: 'Bundle analysis হলো স্কুল ব্যাগের ওজন মেপে দেখা কোন বইটা সবচেয়ে ভারী। Budget একটা নিয়ম: \'ব্যাগ ৫ কেজির বেশি হলে টিচার আটকাবে\' — limit পার হলে build-ও warning বা error দেয়।',
    },
    question: 'How do you analyse bundle size and set budgets?',
    answer: 'Build with ng build --stats-json to get a stats.json (an esbuild metafile with the application builder) and load it into a visualiser such as the esbuild bundle analyzer, or build with source maps and run source-map-explorer. That shows which libraries and files make up the initial and lazy chunks, so you can lazy-load routes, @defer heavy components, replace large libraries or fix imports that defeat tree-shaking. Budgets in angular.json make the build warn or fail when a bundle grows past a limit, so regressions get caught in CI instead of production.',
    points: [
      'ng build --stats-json -> stats.json -> open in the esbuild analyzer (esbuild.github.io/analyze)',
      'Alternative: ng build --source-map, then npx source-map-explorer dist/<app>/browser/*.js',
      'The build output table already lists initial vs lazy chunk sizes (raw and estimated transfer size)',
      'Budget types include initial, bundle, anyComponentStyle, allScript, any; each takes maximumWarning / maximumError',
      'Common wins: lazy routes, @defer, removing moment-style heavy libs, importing only what you use, avoiding CommonJS deps (the CLI warns about them)',
    ],
    code: `// angular.json -> projects.my-app.architect.build.configurations.production
"budgets": [
  { "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" },
  { "type": "anyComponentStyle", "maximumWarning": "4kB", "maximumError": "8kB" },
  { "type": "bundle", "name": "admin", "maximumWarning": "200kB" }
]

# analyse
ng build --stats-json
# -> upload dist/my-app/stats.json to https://esbuild.github.io/analyze/

# or with source maps
ng build --source-map
npx source-map-explorer "dist/my-app/browser/*.js"`,
  },
  {
    id: 'ax-53',
    level: 'senior',
    topic: 'performance',
    difficulty: 'hard',
    simple: {
      hi: 'Hydration aisa hai jaise server ne train ke coach ka seat chart bana ke diya, aur browser wahi seats pe passengers bitha raha hai. Agar koi beech mein seat hi hata de (DOM manipulation) ya galat chart bana de (invalid HTML), to gadbad ho jaati hai. ngSkipHydration bolta hai: \'is coach ka chart chhodo, naya bana lo\'.',
      en: 'Hydration is like the server handing over a train coach seat chart and the browser seating passengers by it. If someone removes a seat (DOM manipulation) or the chart was drawn wrong (invalid HTML), things go wrong. ngSkipHydration says: \'ignore the chart for this coach, make a fresh one\'.',
      bn: 'Hydration হলো যেন server ট্রেনের কোচের seat chart বানিয়ে দিল, আর browser সেই অনুযায়ী যাত্রী বসাচ্ছে। কেউ মাঝখানে seat সরিয়ে দিলে (DOM manipulation) বা chart ভুল আঁকলে (invalid HTML) গোলমাল হয়। ngSkipHydration বলে: \'এই কোচের chart বাদ দাও, নতুন করে বানাও\'।',
    },
    question: 'Hydration mismatches — causes and ngSkipHydration.',
    answer: 'During hydration Angular reuses the DOM produced by the server and walks it expecting exactly the node structure the template would create; if the real DOM differs, it throws an NG05xx hydration error in development (for example NG0500) describing the expected and actual node. The usual causes are invalid HTML that the browser parser rewrites, direct DOM manipulation (innerHTML, appendChild, jQuery/D3 or other third-party widgets), CDN or proxy optimisations that strip comment nodes or rewrite markup, and server/client data that differs. Fix the root cause first; ngSkipHydration on a component host is the escape hatch that makes Angular discard that component\'s server DOM and render it fresh on the client.',
    points: [
      'Invalid HTML: <div> inside <p>, <tr> without <tbody>, nested <a> — the browser fixes it and the DOM no longer matches',
      'Direct DOM manipulation: use Renderer2/bindings instead, or run browser-only code in afterNextRender',
      'Browser-only values (window size, localStorage, Date.now) should be read after render; share fetched data via HttpClient transfer cache/TransferState so both sides render the same',
      'Keep comment nodes and whitespace intact in CDN/HTML minifiers — hydration relies on them',
      'ngSkipHydration works only on component host elements (attribute or host: { ngSkipHydration: \'true\' }); that subtree loses the hydration benefit, so use it sparingly',
      'Putting it on the root component effectively disables hydration for the whole app',
    ],
    code: `import { Component, afterNextRender, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [LegacyChartComponent],
  template: \`
    <!-- template -->
    <!-- BAD: <p><div>..</div></p> is invalid HTML, the browser rewrites it -->
    <div><div>Today: {{ visits() }}</div></div>

    <!-- chart lib edits the DOM itself: re-render on the client -->
    <app-legacy-chart ngSkipHydration />
  \`,
})
export class DashboardComponent {
  visits = signal<number | null>(null);
  constructor() {
    // browser-only work runs after hydration
    afterNextRender(() => this.visits.set(Number(localStorage.getItem('visits') ?? 0)));
  }
}`,
  },
  {
    id: 'ax-54',
    level: 'mid',
    topic: 'performance',
    difficulty: 'medium',
    simple: {
      hi: 'Service worker ek dukaan ke godown jaisa hai. Dukaan (server) band ho ya network na ho, phir bhi godown mein rakha saamaan (cache) mil jaata hai. Naya maal aaye to chupchaap godown mein rakh deta hai aur bolta hai \'naya stock aa gaya, refresh karo\'.',
      en: 'A service worker is like a shop\'s storeroom. Even if the shop (server) is closed or there is no network, you still get the goods kept in the storeroom (cache). When new stock arrives, it quietly stores it and tells you \'new stock is here, refresh\'.',
      bn: 'Service worker হলো দোকানের গুদামঘরের মতো। দোকান (server) বন্ধ থাকলে বা network না থাকলেও গুদামে রাখা জিনিস (cache) পাওয়া যায়। নতুন মাল এলে চুপচাপ গুদামে রেখে বলে \'নতুন stock এসেছে, refresh করো\'।',
    },
    question: 'Service workers and PWA support in Angular.',
    answer: 'Running ng add @angular/pwa adds @angular/service-worker, a web app manifest, icons, an ngsw-config.json and provideServiceWorker() in the app config. The Angular service worker caches the app shell and assets according to ngsw-config.json, so the app loads fast and works offline, and it updates atomically: a new version is downloaded in the background and served only when it is fully ready. SwUpdate lets you detect a new version and prompt the user to reload, and SwPush handles web push notifications.',
    points: [
      'It runs only in production builds served over HTTPS (or localhost) — not with ng serve',
      'assetGroups cache your app files: installMode prefetch (download upfront) or lazy (cache on first use)',
      'dataGroups cache API responses: strategy performance (cache first) or freshness (network first, with timeout), plus maxSize and maxAge',
      'SwUpdate.versionUpdates emits VERSION_READY; call document.location.reload() (or activateUpdate()) to switch',
      'registrationStrategy such as \'registerWhenStable:30000\' avoids delaying the first load',
      'Handle SwUpdate.unrecoverable to recover from a broken cache state',
    ],
    code: `// app.config.ts
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';
export const appConfig = {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

// update-prompt.service.ts
@Injectable({ providedIn: 'root' })
export class UpdatePromptService {
  constructor() {
    const sw = inject(SwUpdate);
    if (!sw.isEnabled) return;
    sw.versionUpdates
      .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))
      .subscribe(() => {
        if (confirm('New version available. Reload?')) document.location.reload();
      });
  }
}`,
  },
  {
    id: 'ax-55',
    level: 'senior',
    topic: 'performance',
    difficulty: 'hard',
    simple: {
      hi: 'Web Worker ek extra helper jaisa hai. Restaurant mein waiter (main thread) customers se baat karta rehta hai, aur bhaari kaam — sabzi kaatna — kitchen mein helper (worker) karta hai. Dono parchi (postMessage) se baat karte hain, helper dining hall (DOM) mein nahi aata.',
      en: 'A Web Worker is like an extra helper. In a restaurant the waiter (main thread) keeps talking to customers, while the heavy work — chopping vegetables — is done by a helper in the kitchen (worker). They talk only through order slips (postMessage); the helper never enters the dining hall (DOM).',
      bn: 'Web Worker হলো একজন বাড়তি সাহায্যকারীর মতো। রেস্টুরেন্টে waiter (main thread) খদ্দেরদের সঙ্গে কথা বলে, আর ভারী কাজ — সবজি কাটা — রান্নাঘরে helper (worker) করে। ওরা শুধু চিরকুট (postMessage) দিয়ে কথা বলে, helper খাওয়ার ঘরে (DOM) আসে না।',
    },
    question: 'Using Web Workers in an Angular app.',
    answer: 'A Web Worker runs JavaScript on a separate thread, so CPU-heavy work (parsing a large CSV, image processing, complex filtering, crypto) does not freeze the UI. ng generate web-worker <location> creates a .worker.ts file, a tsconfig.worker.json and wires webWorkerTsConfig in angular.json; you then create it with new Worker(new URL(\'./x.worker\', import.meta.url)) so the CLI bundles it. The worker has no DOM and no Angular DI, communicates only through postMessage (data is structured-cloned, or transferred for ArrayBuffers), and is not available during SSR, so guard with typeof Worker !== \'undefined\'.',
    points: [
      'Use for CPU-bound work, not for HTTP calls (those are already async)',
      'No access to DOM, window, components or services — pass plain data in, get plain data back',
      'Large binary data: pass Transferable objects (ArrayBuffer) to avoid copying',
      'Guard for SSR/old browsers and keep a main-thread fallback',
      'Terminate workers you no longer need (worker.terminate()) e.g. in DestroyRef.onDestroy',
      'Libraries like Comlink give a promise-based RPC style over postMessage',
    ],
    code: `// src/app/primes.worker.ts
/// <reference lib="webworker" />
addEventListener('message', ({ data }) => {
  let count = 0;
  for (let n = 2; n < (data as number); n++) {
    let prime = true;
    for (let d = 2; d * d <= n; d++) if (n % d === 0) { prime = false; break; }
    if (prime) count++;
  }
  postMessage(count);
});

// primes.component.ts
export class PrimesComponent {
  result = signal<number | null>(null);
  run(limit: number) {
    if (typeof Worker === 'undefined') return; // SSR / unsupported
    const worker = new Worker(new URL('./primes.worker', import.meta.url));
    worker.onmessage = ({ data }) => { this.result.set(data); worker.terminate(); };
    worker.postMessage(limit);
  }
}`,
  },
  {
    id: 'ax-56',
    level: 'mid',
    topic: 'performance',
    difficulty: 'medium',
    simple: {
      hi: 'CSR matlab ghar pe khud khana banana (browser sab karta hai). SSR matlab har order pe restaurant taaza khana bana ke bhejta hai. Prerender (SSG) matlab tiffin subah hi pack ho gaya — jaldi milta hai, par aaj ki nayi dish usme nahi hogi jab tak dobara pack na karo.',
      en: 'CSR is cooking at home yourself (the browser does everything). SSR is a restaurant cooking fresh for every order. Prerender (SSG) is a tiffin packed in the morning — you get it instantly, but today\'s new dish is not in it until you pack again (rebuild).',
      bn: 'CSR মানে বাড়িতে নিজে রান্না করা (browser সব করে)। SSR মানে প্রতিটা অর্ডারে রেস্টুরেন্ট টাটকা রান্না করে পাঠায়। Prerender (SSG) মানে টিফিন সকালেই প্যাক করা — সঙ্গে সঙ্গে পাওয়া যায়, কিন্তু আবার প্যাক (rebuild) না করলে আজকের নতুন পদ তাতে থাকবে না।',
    },
    question: 'Prerendering (SSG) vs SSR vs CSR — route render modes.',
    answer: 'CSR renders everything in the browser, SSR renders HTML on the server for every request, and prerendering (SSG) renders HTML once at build time and serves it as static files. With @angular/ssr you can choose per route through server routes: RenderMode.Prerender for static pages like home, about or blog posts, RenderMode.Server for personalised or frequently changing pages, and RenderMode.Client for pages that do not need SEO, such as an authenticated dashboard. For parameterised prerendered routes, getPrerenderParams returns the list of parameter values to generate at build time.',
    points: [
      'Prerender: fastest TTFB, cheap CDN hosting, but content is only as fresh as the last build',
      'Server: fresh per-request HTML and SEO, but needs a Node (or edge) server and adds server cost',
      'Client: plain SPA behaviour, simplest, weakest for SEO and first paint',
      'Server routes are registered with provideServerRendering(withRoutes(serverRoutes)) in app.config.server.ts',
      'getPrerenderParams can use inject() to fetch the ids/slugs; a fallback decides what happens for params not prerendered',
      'Prerendered and server-rendered pages still hydrate on the client',
    ],
    code: `// app.routes.server.ts
import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const slugs = await inject(BlogService).getAllSlugs(); // Promise<string[]>
      return slugs.map((slug) => ({ slug }));
    },
  },
  { path: 'dashboard/**', renderMode: RenderMode.Client },
  { path: '**', renderMode: RenderMode.Server },
];`,
  },
  {
    id: 'ax-57',
    level: 'mid',
    topic: 'testing',
    difficulty: 'medium',
    simple: {
      hi: 'fakeAsync ya fake timers ek cricket match ki recording jaisa hai — aap fast-forward karke seedha 20th over dekh sakte ho (tick), poora match intezaar nahi karna padta. Real async test live match dekhne jaisa hai — jab tak match khatam (whenStable) na ho, rukna padta hai.',
      en: 'fakeAsync or fake timers are like a recorded cricket match — you can fast-forward straight to the 20th over (tick) instead of waiting. A real async test is like watching live — you wait until the match is over (whenStable).',
      bn: 'fakeAsync বা fake timers হলো রেকর্ড করা ক্রিকেট ম্যাচের মতো — fast-forward করে সোজা ২০তম ওভারে চলে যাওয়া যায় (tick), অপেক্ষা করতে হয় না। Real async test হলো লাইভ ম্যাচ দেখা — ম্যাচ শেষ (whenStable) না হওয়া পর্যন্ত অপেক্ষা করতে হয়।',
    },
    question: 'fakeAsync/tick vs waitForAsync vs real async tests (and Vitest fake timers).',
    answer: 'fakeAsync runs the test in a fake Zone.js zone where time does not pass by itself: tick(ms) advances timers, flushMicrotasks() resolves promises and flush() drains everything, which makes debounce and setTimeout tests fast and deterministic. waitForAsync wraps the test in a zone and waits for all pending async work before finishing; today plain async/await with await fixture.whenStable() does the same more readably. Both fakeAsync and waitForAsync need zone.js (zone.js/testing) loaded, so in zoneless Angular 21 projects using Vitest you normally use vi.useFakeTimers() with vi.advanceTimersByTime(Async) for time, and real async/await with whenStable() for everything else.',
    points: [
      'fakeAsync + tick: synchronous-looking control of time; errors if timers are left pending at the end',
      'waitForAsync: legacy style; prefer async/await',
      'Real async: await fixture.whenStable() waits for Angular\'s pending tasks (works zoneless)',
      'Vitest: vi.useFakeTimers(), await vi.advanceTimersByTimeAsync(ms), vi.runAllTimers(), then vi.useRealTimers()',
      'Use the Async variants of Vitest timer helpers when promises are chained after the timer',
      'Do not mix fakeAsync with Vitest fake timers in the same test',
    ],
    code: `// 1) Zone-based fakeAsync (requires zone.js/testing)
it('fires after 300ms (fakeAsync)', fakeAsync(() => {
  let fired = false;
  setTimeout(() => (fired = true), 300);
  tick(299); expect(fired).toBe(false);
  tick(1);   expect(fired).toBe(true);
}));

// 2) Vitest fake timers (works in zoneless apps)
it('fires after 300ms (vitest)', async () => {
  vi.useFakeTimers();
  let fired = false;
  setTimeout(() => (fired = true), 300);
  await vi.advanceTimersByTimeAsync(300);
  expect(fired).toBe(true);
  vi.useRealTimers();
});

// 3) Real async: let Angular finish its pending work
it('renders loaded user', async () => {
  const fixture = TestBed.createComponent(UserComponent);
  await fixture.whenStable();
  expect(fixture.nativeElement.textContent).toContain('Asha');
});`,
  },
  {
    id: 'ax-58',
    level: 'junior',
    topic: 'testing',
    difficulty: 'easy',
    simple: {
      hi: 'Spy ek dummy cricket bowler jaisa hai practice ke liye. Asli bowler (real service) ki jagah machine wahi ball phenkti hai jo aap set karo, aur gin bhi leti hai kitni balls phenki (toHaveBeenCalled).',
      en: 'A spy is like a bowling machine at cricket practice. Instead of the real bowler (real service), it throws exactly the ball you set, and it also counts how many balls it threw (toHaveBeenCalled).',
      bn: 'Spy হলো ক্রিকেট প্র্যাকটিসের বোলিং মেশিনের মতো। আসল বোলারের (real service) বদলে মেশিন ঠিক সেই বল ছোড়ে যা তুমি সেট করো, আর গুনেও রাখে কটা বল ছুড়েছে (toHaveBeenCalled)।',
    },
    question: 'Mocking services with spies (vi.fn / jasmine.createSpyObj).',
    answer: 'A spy is a fake function that records how it was called and returns whatever you tell it to, so a component can be tested without real HTTP calls or other dependencies. In Vitest (the default in Angular 21) you build a mock object with vi.fn() or wrap an existing method with vi.spyOn(); in Jasmine/Karma projects jasmine.createSpyObj creates an object whose methods are all spies. You then hand the mock to TestBed with { provide: RealService, useValue: mock } and assert with toHaveBeenCalled / toHaveBeenCalledWith.',
    points: [
      'vi.fn().mockReturnValue(of(data)) — Vitest; spy.and.returnValue(of(data)) — Jasmine',
      'vi.spyOn(service, \'method\') keeps the real object and replaces one method',
      'Provide mocks through providers: [{ provide: UserService, useValue: mock }]',
      'Assert interactions: toHaveBeenCalledTimes(1), toHaveBeenCalledWith(\'42\')',
      'Reset between tests (vi.clearAllMocks / restoreAllMocks or fresh mocks in beforeEach)',
      'Mock at the boundary (services), not the component\'s own internals',
    ],
    code: `// Vitest
const userService = { getUser: vi.fn().mockReturnValue(of({ id: '42', name: 'Asha' })) };

// Jasmine equivalent:
// const userService = jasmine.createSpyObj<UserService>('UserService', ['getUser']);
// userService.getUser.and.returnValue(of({ id: '42', name: 'Asha' }));

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ProfileComponent],
    providers: [{ provide: UserService, useValue: userService }],
  });
});

it('loads the user by id', async () => {
  const fixture = TestBed.createComponent(ProfileComponent);
  fixture.componentRef.setInput('userId', '42');
  await fixture.whenStable();
  expect(userService.getUser).toHaveBeenCalledWith('42');
  expect(fixture.nativeElement.textContent).toContain('Asha');
});`,
  },
  {
    id: 'ax-59',
    level: 'mid',
    topic: 'testing',
    difficulty: 'medium',
    simple: {
      hi: 'Harness ek TV remote jaisa hai. Aapko TV ke andar ke wires (DOM) nahi pata hone chahiye — bas \'volume badhao\' ya \'channel badlo\' button dabao. TV company andar ka design badal de, remote phir bhi waise hi kaam karta hai.',
      en: 'A harness is like a TV remote. You don\'t need to know the wires inside the TV (DOM) — you just press \'volume up\' or \'next channel\'. Even if the company changes the inside design, the remote works the same way.',
      bn: 'Harness হলো TV-র রিমোটের মতো। TV-র ভেতরের তার (DOM) জানার দরকার নেই — শুধু \'volume বাড়াও\' বা \'channel বদলাও\' বোতাম টেপো। কোম্পানি ভেতরের ডিজাইন বদলালেও রিমোট একইভাবে কাজ করে।',
    },
    question: 'What are component harnesses (CDK testing)?',
    answer: 'A component harness is a class from @angular/cdk/testing that wraps a component and exposes a user-level async API such as click(), setValue() or getText(), hiding its internal DOM structure. Tests ask a HarnessLoader (TestbedHarnessEnvironment.loader(fixture)) for a harness, and the harness automatically runs change detection and waits for the component to be stable after each interaction. Angular Material ships harnesses for its components, and you can write your own by extending ComponentHarness, so tests do not break when the component\'s markup changes.',
    points: [
      'Tests read like user actions and do not depend on CSS classes inside third-party components',
      'Every harness method returns a Promise; always await',
      'Filter harnesses with .with({ text, selector, ... }); getHarness throws if none match, getAllHarnesses returns an array',
      'Custom harness: extend ComponentHarness, set static hostSelector, use locatorFor/locatorForAll',
      'The same harness can run in unit tests (TestbedHarnessEnvironment) and in e2e environments',
    ],
    code: `import { ComponentHarness } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

// custom harness for <app-counter>
export class CounterHarness extends ComponentHarness {
  static hostSelector = 'app-counter';
  private value = this.locatorFor('.value');
  async getValue() { return (await this.value()).text(); }
}

it('increments when Add is clicked', async () => {
  const fixture = TestBed.createComponent(CartComponent);
  const loader = TestbedHarnessEnvironment.loader(fixture);

  const add = await loader.getHarness(MatButtonHarness.with({ text: 'Add' }));
  await add.click();

  const counter = await loader.getHarness(CounterHarness);
  expect(await counter.getValue()).toBe('1');
});`,
  },
  {
    id: 'ax-60',
    level: 'mid',
    topic: 'testing',
    difficulty: 'medium',
    simple: {
      hi: 'Component ek vending machine jaisa hai. Input matlab aap coin daalte ho (setInput), output matlab machine se chocolate nikalti hai (subscribe karke pakdo). model() do-taraf wala hai — aap button se number set karo, aur machine khud badle to bhi aapko dikh jaata hai.',
      en: 'A component is like a vending machine. An input is the coin you put in (setInput); an output is the chocolate that comes out (catch it by subscribing). model() works both ways — you can set the number, and if the machine changes it, you see that too.',
      bn: 'Component হলো একটা vending machine-এর মতো। Input মানে তুমি কয়েন ফেলছ (setInput), output মানে মেশিন থেকে চকলেট বেরোয় (subscribe করে ধরো)। model() দুই দিকেই কাজ করে — তুমি সংখ্যা সেট করতে পারো, আর মেশিন নিজে বদলালেও তুমি দেখতে পাও।',
    },
    question: 'Testing signal inputs, outputs and model() in components.',
    answer: 'Signal inputs are read-only from outside, so in a test you set them with fixture.componentRef.setInput(\'name\', value) and then await fixture.whenStable() (or call detectChanges) before checking the DOM. Outputs created with output() return an OutputEmitterRef that has subscribe(), so you subscribe a spy and trigger the user action. A model() is both: set its value with setInput, and observe changes the component makes by subscribing to it (it emits through the generated nameChange output); alternatively test through a small host component that binds [(value)].',
    points: [
      'Never call .set() on an input() — InputSignal is read-only; use setInput',
      'setInput uses the public (alias) name, the same one used in templates',
      'component.saved.subscribe(spy), then click the button and expect(spy).toHaveBeenCalledWith(...)',
      'model(): setInput(\'value\', 3) in; component.value.subscribe(spy) to see value going out',
      'Newer TestBed versions also accept bindings: [inputBinding(...), outputBinding(...), twoWayBinding(...)] in createComponent',
      'A host component test is closest to real usage for two-way binding',
    ],
    code: `@Component({
  selector: 'app-qty',
  template: \`<span>{{ label() }}: {{ value() }}</span>
             <button (click)="inc()">+</button>\`,
})
export class QtyComponent {
  label = input.required<string>();
  value = model(0);
  maxed = output<void>();
  inc() { this.value.update((v) => v + 1); if (this.value() >= 5) this.maxed.emit(); }
}
it('handles input, model and output', async () => {
  const fixture = TestBed.createComponent(QtyComponent);
  fixture.componentRef.setInput('label', 'Mangoes');
  fixture.componentRef.setInput('value', 4);
  await fixture.whenStable();
  expect(fixture.nativeElement.textContent).toContain('Mangoes: 4');
  const changed = vi.fn(); const maxed = vi.fn();
  fixture.componentInstance.value.subscribe(changed);
  fixture.componentInstance.maxed.subscribe(maxed);
  fixture.nativeElement.querySelector('button').click();
  expect(changed).toHaveBeenCalledWith(5);
  expect(maxed).toHaveBeenCalledTimes(1);
});`,
  },
  {
    id: 'ax-61',
    level: 'mid',
    topic: 'testing',
    difficulty: 'medium',
    simple: {
      hi: 'Guard ek school gate ke chowkidar jaisa hai. Test mein hum ek nakli student (mock AuthService) bhejte hain — ID card hai to andar jaane do, nahi to office (/login) bhej do. Interceptor post office jaisa hai jo har chitthi pe stamp (header) lagata hai, aur test mein hum chitthi khol ke stamp check karte hain.',
      en: 'A guard is like the school gate watchman. In the test we send a pretend student (mock AuthService) — with an ID card he goes in, without one he is sent to the office (/login). An interceptor is like a post office stamping every letter (header), and in the test we open the letter and check the stamp.',
      bn: 'Guard হলো স্কুলের গেটের দারোয়ানের মতো। Test-এ আমরা একজন নকল ছাত্র (mock AuthService) পাঠাই — ID card থাকলে ভেতরে যেতে দাও, না থাকলে অফিসে (/login) পাঠাও। Interceptor হলো পোস্ট অফিস, যে প্রতিটা চিঠিতে স্ট্যাম্প (header) লাগায়, আর test-এ আমরা চিঠি খুলে স্ট্যাম্প চেক করি।',
    },
    question: 'Testing functional guards and interceptors.',
    answer: 'Functional guards and interceptors are plain functions that call inject(), so they must run inside an injection context; in a test you configure providers with TestBed and call the function inside TestBed.runInInjectionContext(), then assert on the return value (true, false or a UrlTree). For a full routing check, RouterTestingHarness can navigate to a URL and verify where you end up. For interceptors, register them with provideHttpClient(withInterceptors([...])) plus provideHttpClientTesting(), make a request through HttpClient and use HttpTestingController to inspect the outgoing request (for example its headers) or to simulate error responses.',
    points: [
      'Guards: TestBed.runInInjectionContext(() => authGuard(route, state))',
      'Compare redirects with router.serializeUrl(result as UrlTree) === \'/login\'',
      'Mock dependencies (AuthService) with useValue providers',
      'Interceptors: assert req.request.headers.get(\'Authorization\'), then req.flush(...) or flush with status 401 to test retry/logout logic',
      'provideHttpClient(...) must come before provideHttpClientTesting()',
      'Call httpTesting.verify() in afterEach to catch unexpected requests',
    ],
    code: `export const authGuard: CanActivateFn = () =>
  inject(AuthService).isLoggedIn() || inject(Router).createUrlTree(['/login']);

describe('authGuard', () => {
  const run = () => TestBed.runInInjectionContext(() =>
    authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));

  function setup(loggedIn: boolean) {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: { isLoggedIn: () => loggedIn } }],
    });
  }

  it('allows logged-in users', () => { setup(true); expect(run()).toBe(true); });

  it('redirects guests to /login', () => {
    setup(false);
    const router = TestBed.inject(Router);
    expect(router.serializeUrl(run() as UrlTree)).toBe('/login');
  });
});`,
  },
  {
    id: 'ax-62',
    level: 'mid',
    topic: 'architecture',
    difficulty: 'medium',
    simple: {
      hi: 'NgRx ek bank jaisa hai. Aap form bharte ho (action), cashier register mein entry update karta hai (reducer), passbook mein sirf aapka balance dikhta hai (selector). Agar cheque doosre bank bhejna ho, to ek alag clerk (effect) wo kaam karta hai aur wapas aakar nayi entry ka form deta hai.',
      en: 'NgRx is like a bank. You fill a form (action), the cashier updates the register (reducer), and your passbook shows just your balance (selector). If a cheque must go to another bank, a separate clerk (effect) does that and comes back with a new form for the result.',
      bn: 'NgRx হলো একটা ব্যাংকের মতো। তুমি ফর্ম ভরো (action), ক্যাশিয়ার রেজিস্টারে এন্ট্রি আপডেট করে (reducer), পাসবইয়ে শুধু তোমার ব্যালান্স দেখায় (selector)। চেক অন্য ব্যাংকে পাঠাতে হলে আলাদা একজন ক্লার্ক (effect) সেই কাজ করে ফলাফলের নতুন ফর্ম নিয়ে ফেরে।',
    },
    question: 'Explain the NgRx flow: actions, reducers, selectors and effects.',
    answer: 'In NgRx Store, components dispatch actions, which are plain objects describing an event such as \'[Products] Load\'. Reducers are pure functions that take the current state and an action and return a new immutable state; selectors are memoized functions that read and derive slices of that state for components (store.select or store.selectSignal). Effects listen to the action stream for side effects such as HTTP calls and dispatch new actions with the result (for example loadSuccess or loadFailure), so reducers and components stay free of side effects.',
    points: [
      'Flow: component -> dispatch(action) -> reducer -> new state -> selector -> component; effects branch off for async work',
      'createActionGroup / createAction, createReducer + on(), createSelector / createFeature, createEffect',
      'Reducers must be pure and synchronous; never call APIs in them',
      'Pick the flattening operator in effects deliberately: switchMap (cancel old), exhaustMap (ignore while busy), concatMap (queue)',
      'Always catchError inside the inner observable so the effect stream does not die',
      'Register with provideStore(), provideState(feature) and provideEffects()',
    ],
    code: `export const ProductsActions = createActionGroup({
  source: 'Products',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ products: Product[] }>(),
    'Load Failure': props<{ error: string }>(),
  },
});

export const productsReducer = createReducer(initialState,
  on(ProductsActions.load, (s) => ({ ...s, loading: true })),
  on(ProductsActions.loadSuccess, (s, { products }) => ({ ...s, loading: false, products })),
  on(ProductsActions.loadFailure, (s, { error }) => ({ ...s, loading: false, error })),
);

export const selectProducts = createSelector(selectProductsState, (s) => s.products);

export const loadProducts = createEffect(
  (actions$ = inject(Actions), api = inject(ProductApi)) => actions$.pipe(
    ofType(ProductsActions.load),
    switchMap(() => api.getAll().pipe(
      map((products) => ProductsActions.loadSuccess({ products })),
      catchError((e) => of(ProductsActions.loadFailure({ error: e.message })))))),
  { functional: true },
);`,
  },
  {
    id: 'ax-63',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'hard',
    simple: {
      hi: 'SignalStore ek school ka class register jaisa hai. Register mein naam aur haazri (state) likhi hai, \'aaj kitne absent\' turant gin jaata hai (computed), aur sirf class teacher (methods) hi entry badal sakti hai — koi bhi student khud register mein nahi likh sakta.',
      en: 'SignalStore is like a class attendance register. It holds names and attendance (state), \'how many are absent today\' is counted instantly (computed), and only the class teacher (methods) may change entries — no student can write in it directly.',
      bn: 'SignalStore হলো ক্লাসের হাজিরা খাতার মতো। খাতায় নাম আর হাজিরা (state) লেখা থাকে, \'আজ কতজন অনুপস্থিত\' সঙ্গে সঙ্গে গোনা হয় (computed), আর শুধু ক্লাস টিচার (methods) এন্ট্রি বদলাতে পারেন — কোনো ছাত্র নিজে খাতায় লিখতে পারে না।',
    },
    question: 'Build a small store with NgRx SignalStore.',
    answer: 'NgRx SignalStore (@ngrx/signals) builds a store as an injectable class from composable features: signalStore(withState(...), withComputed(...), withMethods(...), withHooks(...)). Each state property becomes a read-only signal, computed values are derived signals, and state changes go through patchState() inside methods, with rxMethod used for RxJS-based async flows such as debounced searches or HTTP loads. It has far less boilerplate than classic actions/reducers/effects, can be provided globally (providedIn: \'root\') or per component, and custom features (signalStoreFeature) plus withEntities let you reuse patterns across stores.',
    points: [
      'withState: initial state -> signals (store.todos(), store.filter())',
      'withComputed: derived signals with computed()',
      'withMethods: the only place that updates state, via patchState(store, partial | updater)',
      'rxMethod (from @ngrx/signals/rxjs-interop) accepts a value, signal or observable and runs an RxJS pipeline',
      'withHooks onInit/onDestroy for loading data or cleanup',
      'State is protected by default: outside code cannot patch it directly',
    ],
    code: `import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

type Todo = { id: number; title: string; done: boolean };

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState({ todos: [] as Todo[], loading: false }),
  withComputed(({ todos }) => ({
    pending: computed(() => todos().filter((t) => !t.done).length),
  })),
  withMethods((store, api = inject(TodoApi)) => ({
    toggle(id: number) {
      patchState(store, (s) => ({ todos: s.todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)) }));
    },
    load: rxMethod<void>(pipe(
      tap(() => patchState(store, { loading: true })),
      switchMap(() => api.getAll()),
      tap((todos) => patchState(store, { todos, loading: false })),
    )),
  })),
  withHooks({ onInit: (store) => store.load() }),
);`,
  },
  {
    id: 'ax-64',
    level: 'junior',
    topic: 'architecture',
    difficulty: 'easy',
    simple: {
      hi: 'Environment file aisa hai jaise ghar aur school ke liye alag tiffin. Code hamesha \'tiffin\' maangta hai, par mummy (CLI build) din dekh ke decide karti hai — school day (production) ko ek dabba, chhutti (development) ko doosra. Par tiffin ke andar paisa (secret) mat rakhna, koi bhi khol ke dekh sakta hai.',
      en: 'An environment file is like a different tiffin for school day and holiday. The code always asks for \'the tiffin\', but Mummy (the CLI build) decides which box to give — one for school days (production), another for holidays (development). Never hide money (secrets) in it — anyone can open it.',
      bn: 'Environment file হলো স্কুলের দিন আর ছুটির দিনের আলাদা টিফিনের মতো। Code সবসময় \'টিফিন\' চায়, কিন্তু মা (CLI build) দিন দেখে ঠিক করেন — স্কুলের দিনে (production) এক বাক্স, ছুটিতে (development) আরেক বাক্স। তবে টিফিনে টাকা (secret) রেখো না, যে কেউ খুলে দেখতে পারে।',
    },
    question: 'Environment configuration and fileReplacements.',
    answer: 'Environment files are TypeScript files that hold build-time settings such as the API URL or feature flags. New projects do not include them by default; ng generate environments creates src/environments/environment.ts and environment.development.ts and adds a fileReplacements entry to the development configuration in angular.json. When you build with a configuration, the CLI swaps the file listed in replace with the one in with, so your code always imports \'../environments/environment\' and gets the right values.',
    points: [
      'The values are baked into the JavaScript bundle at build time — anyone can read them, so never put secrets there',
      'Add more configurations (staging, uat) each with their own fileReplacements and run ng build -c staging',
      'ng serve uses the development configuration by default; ng build uses production',
      'For \'build once, deploy everywhere\', load a runtime config.json with provideAppInitializer instead',
      'The application builder also supports define for simple compile-time constants',
    ],
    code: `// src/environments/environment.ts  (used by production builds)
export const environment = { production: true, apiUrl: 'https://api.myshop.in' };

// src/environments/environment.development.ts
export const environment = { production: false, apiUrl: 'http://localhost:3000' };

// angular.json -> architect.build.configurations.development
"fileReplacements": [
  { "replace": "src/environments/environment.ts",
    "with": "src/environments/environment.development.ts" }
]

// product.service.ts
import { environment } from '../environments/environment';
getAll() { return this.http.get<Product[]>(\`\${environment.apiUrl}/products\`); }`,
  },
  {
    id: 'ax-65',
    level: 'mid',
    topic: 'architecture',
    difficulty: 'medium',
    simple: {
      hi: 'i18n aisa hai jaise ek hi kahani ki kitaab Hindi, Bengali aur English mein alag-alag chhapna. Angular har bhasha ki alag kitaab (build) chhaapta hai, isliye padhne mein tez hai — par bhasha badalni ho to doosri kitaab uthani padti hai.',
      en: 'i18n is like printing the same storybook separately in Hindi, Bengali and English. Angular prints a separate book (build) for each language, so reading is fast — but to change language you pick up the other book.',
      bn: 'i18n হলো একই গল্পের বই হিন্দি, বাংলা আর ইংরেজিতে আলাদা আলাদা ছাপানোর মতো। Angular প্রতিটা ভাষার জন্য আলাদা বই (build) ছাপে, তাই পড়া তাড়াতাড়ি হয় — কিন্তু ভাষা বদলাতে হলে অন্য বইটা তুলতে হয়।',
    },
    question: 'Internationalisation (i18n) in Angular.',
    answer: 'Angular\'s built-in i18n uses @angular/localize: you mark template text with the i18n attribute (optionally meaning|description@@customId) and TypeScript strings with the $localize tagged template, run ng extract-i18n to produce a source file such as XLIFF, get it translated, and configure locales in angular.json. ng build --localize then compiles a separate, fully translated build per locale, so there is no runtime translation cost, but switching language means loading a different build (usually a different URL like /hi/ or /bn/). Plurals and gender use ICU expressions, and locale-aware pipes (date, currency, number) follow LOCALE_ID.',
    points: [
      'ng add @angular/localize to set it up',
      'i18n attributes for text, i18n-title / i18n-placeholder for attributes',
      'Custom ids (@@id) keep translations stable when text changes',
      'ICU: {count, plural, =0 {...} =1 {...} other {...}} and select for gender/options',
      'Built-in approach is compile-time; libraries like Transloco or ngx-translate give runtime language switching from JSON files',
      'Remember right-to-left layouts and locale data (dates, currency such as INR formatting)',
    ],
    code: `<!-- template -->
<h1 i18n="Home page|Welcome heading@@homeTitle">Welcome to our shop</h1>
<input i18n-placeholder placeholder="Search products" />
<span i18n>{count, plural, =0 {Your cart is empty} =1 {One item in cart} other {{{count}} items in cart}}</span>
<p>{{ total | currency: 'INR' }}</p>

// TypeScript
const msg = $localize\`:@@orderPlaced:Order placed successfully\`;

# commands
ng extract-i18n --output-path src/locale
ng build --localize

// angular.json -> projects.my-app
"i18n": {
  "sourceLocale": "en-US",
  "locales": { "hi": "src/locale/messages.hi.xlf", "bn": "src/locale/messages.bn.xlf" }
}`,
  },
  {
    id: 'ax-66',
    level: 'mid',
    topic: 'architecture',
    difficulty: 'medium',
    simple: {
      hi: 'animate.enter/leave ek school function ke stage jaisa hai. Bachcha stage pe aata hai to spotlight jalti hai (enter class). Jaate waqt Angular parda girne tak rukta hai (leave animation khatam), uske baad hi bachche ko stage se hatata hai.',
      en: 'animate.enter/leave is like the stage at a school function. When a child comes on stage, the spotlight turns on (enter class). When leaving, Angular waits until the curtain fully drops (leave animation ends) and only then takes the child off the stage.',
      bn: 'animate.enter/leave হলো স্কুলের অনুষ্ঠানের মঞ্চের মতো। বাচ্চা মঞ্চে এলে spotlight জ্বলে (enter class)। চলে যাওয়ার সময় Angular পর্দা পুরো নামা পর্যন্ত (leave animation শেষ) অপেক্ষা করে, তারপরই বাচ্চাকে মঞ্চ থেকে সরায়।',
    },
    question: 'Animations in modern Angular.',
    answer: 'Modern Angular favours native CSS animations. Angular 20.2 introduced animate.enter and animate.leave: you put them on an element and Angular adds the given CSS class when the element is inserted, and on removal adds the leave class and waits for the CSS animation or transition to finish before taking the element out of the DOM. In the same release the @angular/animations package (trigger, state, transition with provideAnimationsAsync) was deprecated in favour of this approach, so existing code still works but new code should use CSS plus animate.enter/leave. There is also an event-binding form, (animate.enter)/(animate.leave), for driving a JavaScript animation library.',
    points: [
      'animate.enter="class" / animate.leave="class" — values can also be bound, e.g. [animate.enter]="cls()"',
      'Leave animations are the hard part CSS alone cannot do; Angular delays removal until the animation ends',
      'No extra package or provider needed, and it runs on the browser\'s compositor (smooth, tree-shakable)',
      'Toggle state-based effects with plain class bindings and CSS transitions',
      'Route transitions: provideRouter(routes, withViewTransitions()) uses the View Transitions API',
      'Respect prefers-reduced-motion in your CSS',
    ],
    code: `@Component({
  selector: 'app-toast',
  template: \`
    <!-- template -->
    <button (click)="show.set(!show())">Toggle</button>
    @if (show()) {
      <div class="toast" animate.enter="slide-in" animate.leave="fade-out">Saved!</div>
    }
  \`,
  styles: \`
    .slide-in { animation: slide-in 200ms ease-out; }
    .fade-out { animation: fade-out 150ms ease-in forwards; }
    @keyframes slide-in { from { opacity: 0; transform: translateY(-10px); } }
    @keyframes fade-out { to { opacity: 0; } }
    @media (prefers-reduced-motion: reduce) {
      .slide-in, .fade-out { animation: none; }
    }
  \`,
})
export class ToastComponent {
  show = signal(false);
}`,
  },
  {
    id: 'ax-67',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'hard',
    simple: {
      hi: 'Angular Elements ek universal charger jaisa hai. Aapne Angular mein component banaya, aur use aisa plug bana diya jo kisi bhi socket — React, WordPress ya simple HTML page — mein lag jaaye. Andar Angular hi chal raha hai, par bahar sabko normal HTML tag dikhta hai.',
      en: 'Angular Elements is like a universal charger. You build a component in Angular and turn it into a plug that fits any socket — React, WordPress or a plain HTML page. Inside it is still Angular, but from outside everyone sees a normal HTML tag.',
      bn: 'Angular Elements হলো একটা ইউনিভার্সাল চার্জারের মতো। তুমি Angular-এ component বানালে, আর সেটাকে এমন প্লাগ বানিয়ে দিলে যা যেকোনো সকেটে — React, WordPress বা সাধারণ HTML পেজে — লাগে। ভেতরে Angular-ই চলছে, কিন্তু বাইরে সবাই একটা সাধারণ HTML tag দেখে।',
    },
    question: 'What are Angular Elements (custom elements)?',
    answer: 'Angular Elements (@angular/elements) packages an Angular component as a standard Web Component (custom element) that the browser itself knows how to create. createCustomElement(Component, { injector }) returns a class you register with customElements.define(\'tag-name\', ...); after that the tag works in any HTML page or framework (plain HTML, a CMS, React, Vue), and Angular bootstraps the component whenever the tag appears. Inputs map to element properties and dash-case attributes, and outputs are dispatched as DOM CustomEvents with the emitted value in event.detail.',
    points: [
      'Bootstrap without a root component using createApplication({ providers }) and use app.injector',
      'Tag names must contain a hyphen (rating-widget)',
      'Inputs: property el.maxStars = 5 or attribute max-stars="5" (attributes are strings)',
      'Outputs: el.addEventListener(\'rated\', (e) => e.detail)',
      'Good for embedding widgets in non-Angular sites and some micro-frontend setups',
      'Costs: each separately built bundle carries Angular\'s runtime; use ViewEncapsulation.ShadowDom if you need <slot> projection and style isolation',
    ],
    code: `// main.ts of the widget project
import { createApplication } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { provideHttpClient } from '@angular/common/http';
import { RatingWidgetComponent } from './rating-widget.component';

createApplication({ providers: [provideHttpClient()] }).then((app) => {
  const RatingElement = createCustomElement(RatingWidgetComponent, { injector: app.injector });
  customElements.define('rating-widget', RatingElement);
});

<!-- any page, no Angular code needed -->
<rating-widget max-stars="5"></rating-widget>
<script>
  document.querySelector('rating-widget')
    .addEventListener('rated', (e) => console.log('stars:', e.detail));
</script>`,
  },
  {
    id: 'ax-68',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'hard',
    simple: {
      hi: 'Library banana aisa hai jaise apni masala company kholna — masala (components) ek packet (npm package) mein band karke doosre dukaandaron ko bechna. Schematics us packet ke saath aane wala \'recipe card\' hai jo khud hi kitchen set kar deta hai (ng add) aur naya version aane par purane dabbe update kar deta hai (ng update).',
      en: 'Making a library is like starting your own masala brand — packing your spices (components) into a packet (npm package) for other shops. Schematics are the recipe card that comes with it: it sets up the kitchen for you (ng add) and updates old jars when a new version comes (ng update).',
      bn: 'Library বানানো হলো নিজের মশলার ব্র্যান্ড খোলার মতো — মশলা (components) প্যাকেটে (npm package) ভরে অন্য দোকানে বিক্রি করা। Schematics হলো প্যাকেটের সঙ্গে আসা রেসিপি কার্ড, যা নিজেই রান্নাঘর সাজিয়ে দেয় (ng add) আর নতুন version এলে পুরনো বয়াম আপডেট করে দেয় (ng update)।',
    },
    question: 'Creating an Angular library (ng-packagr) and schematics.',
    answer: 'ng generate library my-lib creates a project under projects/my-lib with a public-api.ts (the only things consumers can import) and an ng-package.json, and ng build my-lib uses ng-packagr to produce an npm-ready package in dist/my-lib in the Angular Package Format. Libraries are compiled in partial-Ivy mode so they work across compatible Angular versions, Angular packages go in peerDependencies, and you publish with npm publish from the dist folder. Schematics (@angular-devkit/schematics) add CLI integration: an ng-add schematic runs on ng add my-lib, generation schematics power ng generate my-lib:thing, and migration schematics registered under ng-update run during ng update.',
    points: [
      'Only export what is in public-api.ts; keep everything else private',
      'Declare @angular/core etc. as peerDependencies, not dependencies, to avoid duplicate Angular copies',
      'Secondary entry points (my-lib/testing) are folders with their own ng-package.json — consumers import only what they need',
      'Develop with ng build my-lib --watch and test in a demo app in the same workspace',
      'Schematics are Rules that transform a virtual Tree of files; collection.json lists them and package.json points to it with "schematics"',
      'Migrations under "ng-update": { "migrations": ... } let you auto-fix consumers\' code on breaking changes',
    ],
    code: `ng generate library my-ui
ng build my-ui            # ng-packagr -> dist/my-ui
cd dist/my-ui && npm publish

// projects/my-ui/src/public-api.ts
export * from './lib/button/button.component';

// projects/my-ui/schematics/collection.json
{ "schematics": { "ng-add": { "description": "Set up my-ui", "factory": "./ng-add/index#ngAdd" } } }

// projects/my-ui/schematics/ng-add/index.ts
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!tree.exists('src/my-ui.theme.scss')) {
      tree.create('src/my-ui.theme.scss', '@use "my-ui/theme";\\n');
    }
    context.logger.info('my-ui is ready to use');
    return tree;
  };
}
// projects/my-ui/package.json: "schematics": "./schematics/collection.json"`,
  },
  {
    id: 'ax-69',
    level: 'senior',
    topic: 'architecture',
    difficulty: 'hard',
    simple: {
      hi: 'CSP ek shaadi ke gate pe guest list jaisa hai — sirf list mein jinke naam hain (allowed scripts) wahi andar aa sakte hain. Nonce us din ka secret pass hai jo har function ke liye naya banta hai. Trusted Types bolta hai ki kitchen mein sirf wahi khana jaayega jo pehle food inspector (sanitizer) ne check kiya ho.',
      en: 'CSP is like the guest list at a wedding gate — only names on the list (allowed scripts) get in. A nonce is that day\'s secret pass, newly made for every event. Trusted Types says only food checked by the food inspector (sanitizer) may enter the kitchen.',
      bn: 'CSP হলো বিয়েবাড়ির গেটে অতিথি তালিকার মতো — শুধু তালিকায় যাদের নাম আছে (allowed scripts) তারাই ঢুকতে পারে। Nonce হলো সেদিনের গোপন পাস, প্রতিটা অনুষ্ঠানে নতুন বানানো হয়। Trusted Types বলে, রান্নাঘরে শুধু সেই খাবার ঢুকবে যা আগে food inspector (sanitizer) পরীক্ষা করেছে।',
    },
    question: 'Content Security Policy in Angular (nonce, autoCsp, Trusted Types).',
    answer: 'A Content Security Policy is an HTTP header that tells the browser which scripts and styles may run, which greatly limits the damage of an XSS bug. Angular injects component styles into <style> tags, so with a strict style-src you give Angular a per-request nonce, either through the ngCspNonce attribute on the root element or the CSP_NONCE injection token, and the server puts the same nonce in the header. The CLI\'s autoCsp option (security.autoCsp in angular.json) generates a hash-based, strict-dynamic CSP for the inline scripts in index.html, and Angular supports Trusted Types through the angular policy (plus angular#bundler for lazy chunks), so DOM sinks only accept values that went through Angular\'s sanitizer.',
    points: [
      'Nonce must be random and unique per request — normally generated by your SSR/Node server or reverse proxy, never hard-coded',
      'ngCspNonce="..." on <app-root> or providers: [{ provide: CSP_NONCE, useValue: nonce }]',
      'autoCsp hashes inline scripts at build time and adds a CSP meta tag; it covers scripts, not styles',
      'Trusted Types header: require-trusted-types-for \'script\'; trusted-types angular angular#bundler',
      'Policy angular#unsafe-bypass is needed only if you use bypassSecurityTrust*; angular#unsafe-jit only for JIT',
      'AOT builds do not need \'unsafe-eval\'',
    ],
    code: `# HTTP response header (one line in practice)
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM}';
  style-src 'self' 'nonce-{RANDOM}';
  require-trusted-types-for 'script';
  trusted-types angular angular#bundler;

<!-- index.html, server replaces {RANDOM} per request -->
<app-root ngCspNonce="{RANDOM}"></app-root>

// or provide it from code (e.g. on the server)
bootstrapApplication(App, { providers: [{ provide: CSP_NONCE, useValue: nonce }] });

// angular.json -> architect.build.options
"security": { "autoCsp": true }`,
  },
  {
    id: 'ax-70',
    level: 'mid',
    topic: 'architecture',
    difficulty: 'medium',
    simple: {
      hi: 'Accessibility aisa hai jaise railway station pe ramp, Braille boards aur announcements lagana, taaki har koi — wheelchair wale ya kam dekhne wale bhi — train pakad sake. LiveAnnouncer station ka announcement hai (\'Train platform 2 pe aa gayi\'), aur focus trap ek guide hai jo aapko sahi coach ke darwaze tak le jaata hai.',
      en: 'Accessibility is like adding ramps, Braille boards and announcements at a railway station so everyone — including wheelchair users and people who can\'t see well — can catch the train. LiveAnnouncer is the station announcement (\'Train has arrived on platform 2\'), and a focus trap is a guide who keeps you at the right coach door.',
      bn: 'Accessibility হলো রেলস্টেশনে র‍্যাম্প, ব্রেইল বোর্ড আর ঘোষণার ব্যবস্থা করা, যাতে সবাই — হুইলচেয়ার ব্যবহারকারী বা কম দেখতে পান এমন মানুষও — ট্রেন ধরতে পারেন। LiveAnnouncer হলো স্টেশনের ঘোষণা (\'ট্রেন ২ নম্বর প্ল্যাটফর্মে এসেছে\'), আর focus trap হলো একজন গাইড যে তোমাকে ঠিক কোচের দরজায় রাখে।',
    },
    question: 'Accessibility (a11y) in Angular apps — CDK a11y, focus management, ARIA.',
    answer: 'Start with semantic native HTML (button, label, nav, headings) because it gives keyboard support and screen-reader meaning for free, and add ARIA only where HTML has no equivalent, binding dynamic values with [attr.aria-expanded] and similar. In a single-page app you must manage focus yourself: trap focus inside dialogs, return it to the trigger when they close, and move focus to the main heading after route changes (and set the page title via the route title property). The CDK a11y package helps with cdkTrapFocus, LiveAnnouncer for screen-reader announcements, FocusMonitor to know whether focus came from keyboard or mouse, ListKeyManager/FocusKeyManager for arrow-key navigation, and the cdk-visually-hidden class.',
    points: [
      'Prefer <button> over <div (click)>; if you must, add role, tabindex and key handlers',
      '[attr.aria-*] bindings for dynamic ARIA; aria-live regions or LiveAnnouncer for async updates such as \'Saved\'',
      'cdkTrapFocus with cdkTrapFocusAutoCapture moves focus in and restores it on destroy',
      'Route title + focusing an <h1 tabindex="-1"> after NavigationEnd helps screen-reader users',
      'Angular Material components follow WAI-ARIA patterns; newer Angular versions also offer @angular/aria headless patterns',
      'Check with angular-eslint template accessibility rules, axe/Lighthouse and a real screen reader',
    ],
    code: `import { Component, inject, output } from '@angular/core';
import { A11yModule, LiveAnnouncer } from '@angular/cdk/a11y';

@Component({
  selector: 'app-confirm-dialog',
  imports: [A11yModule],
  template: \`
    <!-- template -->
    <div role="dialog" aria-modal="true" aria-labelledby="dlg-title"
         cdkTrapFocus [cdkTrapFocusAutoCapture]="true">
      <h2 id="dlg-title">Delete this address?</h2>
      <button type="button" (click)="confirm()">Delete</button>
      <button type="button" (click)="closed.emit()">Cancel</button>
    </div>
  \`,
})
export class ConfirmDialogComponent {
  private announcer = inject(LiveAnnouncer);
  closed = output<void>();

  confirm() {
    this.announcer.announce('Address deleted', 'polite');
    this.closed.emit();
  }
}`,
  },
];
