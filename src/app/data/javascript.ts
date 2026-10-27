import { Question } from './models';

/** JavaScript interview questions. */
export const JS_QUESTIONS: Question[] = [
  {
    id: 'ja-1',
    level: 'junior',
    topic: 'js-async',
    difficulty: 'easy',
    simple: {
      hi: 'JavaScript ek akela waiter hai. Woh order leke kitchen (Web APIs) ko de deta hai aur khaana banne tak khada nahi rehta, agle customer ka order leta hai; khaana ready hone par bell bajti hai aur woh serve kar deta hai.',
      en: 'JavaScript is a single waiter. He takes your order, hands it to the kitchen (Web APIs), and instead of standing there waiting, takes the next customer\'s order; when the bell rings, he serves the ready food.',
      bn: 'JavaScript হলো একজনই ওয়েটার। সে অর্ডার নিয়ে রান্নাঘরে (Web APIs) দিয়ে দেয়, রান্না হওয়া পর্যন্ত দাঁড়িয়ে থাকে না, পরের কাস্টমারের অর্ডার নেয়; খাবার তৈরি হলে ঘণ্টা বাজে আর সে পরিবেশন করে।',
    },
    question: 'JavaScript is single-threaded — so how does asynchronous code work?',
    answer: 'The JavaScript engine runs your code on one thread with one call stack, but the host environment (browser or Node.js) provides APIs like timers, network, file I/O and events that do their work outside that thread. When such work finishes, its callback is put into a queue, and the event loop runs it once the call stack is empty. So JavaScript never waits on I/O, but long synchronous code still blocks everything, including UI rendering.',
    points: [
      'One call stack: only one piece of JS runs at a time',
      'Browser Web APIs / Node libuv handle timers, network, I/O in the background',
      'Completed work queues callbacks (task and microtask queues)',
      'Event loop pushes queued callbacks when the stack is empty',
      'CPU-heavy sync code blocks the thread - use Web Workers for that',
    ],
    code: `console.log('order placed');

setTimeout(() => console.log('food ready'), 1000);

console.log('next customer');

// order placed
// next customer
// food ready   (after ~1s)`,
  },
  {
    id: 'ja-2',
    level: 'mid',
    topic: 'js-async',
    difficulty: 'hard',
    simple: {
      hi: 'Event loop ek railway platform ka station master hai. Ek line VIP coaches (microtasks) ki hai aur ek normal trains (macrotasks) ki; har normal train jaane ke baad station master pehle saare VIP coaches nikalta hai, tab agli normal train ko signal deta hai.',
      en: 'The event loop is a railway station master. There is a line of VIP coaches (microtasks) and a line of normal trains (macrotasks); after each normal train leaves, he sends off all the VIP coaches first, and only then signals the next normal train.',
      bn: 'Event loop হলো রেলস্টেশনের স্টেশন মাস্টার। একটা লাইনে VIP কোচ (microtasks), আরেকটায় সাধারণ ট্রেন (macrotasks); প্রতিটা সাধারণ ট্রেন যাওয়ার পর সে আগে সব VIP কোচ পাঠায়, তারপর পরের সাধারণ ট্রেনকে সিগন্যাল দেয়।',
    },
    diagram: 'event-loop',
    question: 'Explain the event loop: call stack, Web APIs, task (macrotask) queue and microtask queue.',
    answer: 'Synchronous code runs on the call stack. Async operations (setTimeout, fetch, DOM events) are handed to Web APIs; when they complete, their callbacks go to the task (macrotask) queue, while promise reactions (then/catch/finally, await continuations), queueMicrotask and MutationObserver go to the microtask queue. The event loop repeatedly takes one macrotask, runs it to completion, then drains the entire microtask queue, and then the browser may render before the next macrotask.',
    points: [
      'Call stack runs one frame at a time; must be empty for queued callbacks',
      'Macrotasks: setTimeout/setInterval, I/O, UI events, MessageChannel',
      'Microtasks: Promise reactions, await continuation, queueMicrotask, MutationObserver',
      'After each macrotask, ALL microtasks run (including newly added ones)',
      'Rendering happens between tasks, so endless microtasks can freeze the UI',
      'Node adds phases (timers, poll, check) plus process.nextTick before promises',
    ],
    code: `setTimeout(() => console.log('macrotask: setTimeout'), 0);

Promise.resolve().then(() => console.log('microtask: promise'));
queueMicrotask(() => console.log('microtask: queueMicrotask'));

console.log('sync');

// sync
// microtask: promise
// microtask: queueMicrotask
// macrotask: setTimeout`,
  },
  {
    id: 'ja-3',
    level: 'mid',
    topic: 'js-async',
    difficulty: 'hard',
    simple: {
      hi: 'School mein pehle assembly (sync code) hoti hai, sab line mein. Phir monitor ki chhoti-chhoti announcements (microtasks) ek ke baad ek, aur sabse aakhir mein lunch break wali bell (setTimeout) bajti hai.',
      en: 'At school, assembly (sync code) happens first, with everyone in line. Then the monitor makes small announcements (microtasks) one after another, and only at the very end does the lunch bell (setTimeout) ring.',
      bn: 'স্কুলে আগে প্রার্থনা (sync code) হয়, সবাই লাইনে। তারপর মনিটরের ছোট ছোট ঘোষণা (microtasks) একটার পর একটা, আর একদম শেষে টিফিনের ঘণ্টা (setTimeout) বাজে।',
    },
    diagram: 'event-loop',
    question: 'Microtasks vs macrotasks — predict the output of console.log + setTimeout + Promise.then.',
    answer: 'The output is 1 5 7 3 6 4 2. First all synchronous logs run: 1, then 5 (the async function body runs synchronously until its first await), then 7. Then the microtask queue drains in order: 3 (first then), 6 (the await continuation), and 4 (the second then, queued only after 3 ran). Only after all microtasks does the setTimeout macrotask run and print 2.',
    points: [
      'Sync code first: 1, 5, 7',
      'async function runs synchronously until the first await',
      'Microtasks run FIFO: 3, then 6; 3\'s chained then queues 4 last',
      'setTimeout(fn, 0) is a macrotask -> runs after all microtasks: 2',
      'Rule: sync -> all microtasks -> one macrotask -> repeat',
    ],
    code: `console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve()
  .then(() => console.log('3'))
  .then(() => console.log('4'));

(async () => {
  console.log('5');
  await null;
  console.log('6');
})();

console.log('7');
// Output: 1 5 7 3 6 4 2`,
  },
  {
    id: 'ja-4',
    level: 'fresher',
    topic: 'js-async',
    difficulty: 'easy',
    simple: {
      hi: 'Callback aisa hai jaise tum dost ko bolo \'ghar pahunch kar mujhe call karna.\' Callback hell tab hai jab har call ke andar ek aur \'phir mujhe call karna, phir use call karna...\' ho jaaye, aur poori baat ek uljhi hui patang ki dor ban jaaye.',
      en: 'A callback is like telling a friend, \'call me when you reach home.\' Callback hell is when inside every call there is another \'then call me, then call him...\', and the whole thing becomes a tangled kite string.',
      bn: 'Callback হলো বন্ধুকে বলার মতো, \'বাড়ি পৌঁছে আমাকে ফোন করিস।\' Callback hell হলো যখন প্রতিটা ফোনের ভেতরে আরেকটা \'তারপর আমাকে ফোন কর, তারপর ওকে ফোন কর...\' থাকে, আর পুরোটা একটা জট পাকানো ঘুড়ির সুতো হয়ে যায়।',
    },
    question: 'What is a callback and what is callback hell?',
    answer: 'A callback is a function passed to another function to be called when some work finishes, which is how async code was traditionally written (Node uses error-first callbacks: (err, result)). Callback hell, or the pyramid of doom, happens when many dependent async steps are nested inside each other, making the code hard to read, handle errors in and maintain. It is solved with named functions, Promises with chaining, and especially async/await.',
    points: [
      'Callback = function invoked later by another function',
      'Error-first convention in Node: cb(err, data)',
      'Callback hell: deep nesting, repeated error handling, hard to follow',
      'Inversion of control: you trust the other code to call your callback once',
      'Fixes: Promises, async/await, small named functions',
    ],
    code: `const getUser = (id, cb) => setTimeout(() => cb(null, { id, name: 'Asha' }), 100);
const getOrders = (user, cb) => setTimeout(() => cb(null, ['tea', 'samosa']), 100);
const getBill = (orders, cb) => setTimeout(() => cb(null, orders.length * 20), 100);

// pyramid of doom
getUser(1, (err, user) => {
  if (err) return console.error(err);
  getOrders(user, (err, orders) => {
    if (err) return console.error(err);
    getBill(orders, (err, total) => {
      if (err) return console.error(err);
      console.log(\`\${user.name} pays Rs \${total}\`); // Asha pays Rs 40
    });
  });
});`,
  },
  {
    id: 'ja-5',
    level: 'fresher',
    topic: 'js-async',
    difficulty: 'easy',
    simple: {
      hi: 'Promise ek online order ki receipt jaisa hai. Pehle \'pending\' hota hai, phir ya to parcel aa jaata hai (fulfilled) ya order cancel ho jaata hai (rejected); aur ek baar result aa gaya to badalta nahi.',
      en: 'A Promise is like the receipt for an online order. First it is \'pending\', then either the parcel arrives (fulfilled) or the order is cancelled (rejected); once the result comes, it never changes.',
      bn: 'Promise হলো অনলাইন অর্ডারের রসিদের মতো। প্রথমে \'pending\' থাকে, তারপর হয় পার্সেল আসে (fulfilled), নয়তো অর্ডার বাতিল হয় (rejected); একবার ফল এসে গেলে আর বদলায় না।',
    },
    question: 'What is a Promise? Its states and chaining.',
    answer: 'A Promise is an object representing the eventual result of an async operation. It has three states: pending, fulfilled (with a value) or rejected (with a reason); once it is settled it can never change. then() returns a new promise, so you can chain steps: the value you return goes to the next then, a returned promise is waited for, and a thrown error skips to the nearest catch; finally runs either way.',
    points: [
      'States: pending -> fulfilled or rejected (settled is final)',
      'Create with new Promise((resolve, reject) => ...)',
      'then(onFulfilled, onRejected) returns a NEW promise -> chaining',
      'Returning a promise inside then flattens it (waits for it)',
      'catch handles errors from any earlier step; finally always runs',
      'Always return or handle promises to avoid unhandled rejections',
    ],
    code: `const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve(10), 100);
});

p.then(x => x * 2)
  .then(x => {
    console.log(x);            // 20
    throw new Error('oops');
  })
  .then(() => console.log('skipped'))
  .catch(err => console.log(err.message)) // oops
  .finally(() => console.log('done'));    // done`,
  },
  {
    id: 'ja-6',
    level: 'mid',
    topic: 'js-async',
    difficulty: 'medium',
    simple: {
      hi: 'Socho 4 dost tiffin la rahe hain. all: sabke aane par hi khaana shuru, ek bhi bhool gaya to plan cancel. allSettled: sab aa jaayein, phir dekho kaun laaya kaun nahi. race: jo pehle pahunche (khaane ke saath ya khaali haath) wahi decide karega. any: jo pehla tiffin ke saath aaye, usi se khaa lo.',
      en: 'Imagine 4 friends are bringing tiffin. all: start eating only when everyone arrives; if one forgets, the plan is cancelled. allSettled: wait for everyone, then see who brought food and who didn\'t. race: whoever arrives first (with food or empty-handed) decides. any: eat from the first friend who actually brings food.',
      bn: 'ভাবো ৪ জন বন্ধু টিফিন আনছে। all: সবাই এলে তবেই খাওয়া শুরু, একজনও ভুলে গেলে প্ল্যান বাতিল। allSettled: সবাই আসুক, তারপর দেখো কে এনেছে কে আনেনি। race: যে আগে পৌঁছায় (খাবার নিয়ে বা খালি হাতে) সেই ঠিক করবে। any: যে প্রথম খাবার নিয়ে আসে, তার থেকেই খেয়ে নাও।',
    },
    question: 'Promise.all vs Promise.allSettled vs Promise.race vs Promise.any.',
    answer: 'Promise.all fulfills with an array of all values when every promise fulfills, but rejects as soon as any one rejects (fail-fast). Promise.allSettled waits for all and always fulfills with an array of {status, value | reason} objects. Promise.race settles with the first promise that settles, whether it fulfills or rejects, while Promise.any fulfills with the first fulfilled value and rejects with an AggregateError only if all reject.',
    points: [
      'all: all-or-nothing, results in input order, fail-fast',
      'allSettled: never rejects, gives status of each',
      'race: first to settle wins (often used for timeouts)',
      'any: first success wins; AggregateError if all fail',
      'None of them cancel the other promises - use AbortController for that',
    ],
    code: `const ok = (v, ms) => new Promise(r => setTimeout(() => r(v), ms));
const fail = (e, ms) => new Promise((_, r) => setTimeout(() => r(new Error(e)), ms));

Promise.all([ok('a', 100), fail('x', 50)])
  .catch(e => console.log('all:', e.message));          // all: x

Promise.allSettled([ok('a', 100), fail('x', 50)])
  .then(r => console.log(r.map(s => s.status)));       // ['fulfilled', 'rejected']

Promise.race([ok('a', 100), fail('x', 50)])
  .catch(e => console.log('race:', e.message));         // race: x

Promise.any([ok('a', 100), fail('x', 50)])
  .then(v => console.log('any:', v));                   // any: a`,
  },
  {
    id: 'ja-7',
    level: 'junior',
    topic: 'js-async',
    difficulty: 'medium',
    simple: {
      hi: 'async/await aise hai jaise tum chai ki dukaan par order dekar \'ruko\' bolte ho, par sirf tum rukte ho, dukaan baaki customers ko serve karti rehti hai. Agar doodh khatam ho gaya (error), to try/catch ek backup plan hai: \'theek hai, coffee de do.\'',
      en: 'async/await is like ordering at a tea stall and saying \'I\'ll wait\'; only you wait, while the stall keeps serving other customers. If the milk runs out (an error), try/catch is your backup plan: \'okay, give me coffee instead.\'',
      bn: 'async/await হলো চায়ের দোকানে অর্ডার দিয়ে \'অপেক্ষা করছি\' বলার মতো, শুধু তুমি অপেক্ষা করো, দোকান অন্য কাস্টমারদের দিতে থাকে। দুধ ফুরিয়ে গেলে (error), try/catch হলো ব্যাকআপ প্ল্যান: \'ঠিক আছে, কফি দাও।\'',
    },
    question: 'async/await — how does it work and how do you handle errors?',
    answer: 'An async function always returns a Promise, and inside it await pauses that function (not the whole thread) until the awaited promise settles, then resumes it as a microtask with the fulfilled value or throws the rejection reason. It is syntax sugar over promises that makes async code read like synchronous code. Errors are handled with try/catch/finally around awaits, or with .catch() on the returned promise; note that fetch only rejects on network errors, so check res.ok yourself.',
    points: [
      'async function -> always returns a Promise',
      'await unwraps a promise; rejection becomes a thrown error',
      'Only the async function pauses; other code keeps running',
      'Use try/catch/finally, or .catch() on the call',
      'fetch does not reject on 404/500 - check response.ok',
      'Top-level await works in ES modules',
    ],
    code: `async function loadUser(id) {
  try {
    const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } catch (err) {
    console.error('Failed:', err.message);
    return null;
  } finally {
    console.log('request finished');
  }
}

loadUser(1).then(user => console.log(user?.name));`,
  },
  {
    id: 'ja-8',
    level: 'mid',
    topic: 'js-async',
    difficulty: 'hard',
    simple: {
      hi: 'Sequence mein kaam aise hai jaise ek hi bacche ko pehle doodh, phir sabzi, phir bread laane bhejna. Parallel matlab teen bacchon ko ek saath teen dukaanon par bhejna, sab jaldi aa jaata hai. forEach + await aisa hai jaise teeno ko bhej kar bina intezaar kiye khaana banana shuru kar dena.',
      en: 'Sequential work is like sending one child to buy milk, then vegetables, then bread. Parallel means sending three children to three shops at once, so everything comes back faster. forEach + await is like sending them all out and starting to cook without waiting for anyone to return.',
      bn: 'Sequential কাজ হলো একটা বাচ্চাকে আগে দুধ, তারপর সবজি, তারপর পাউরুটি আনতে পাঠানোর মতো। Parallel মানে তিনটে বাচ্চাকে একসাথে তিনটে দোকানে পাঠানো, সব তাড়াতাড়ি চলে আসে। forEach + await হলো সবাইকে পাঠিয়ে কারো ফেরার অপেক্ষা না করেই রান্না শুরু করে দেওয়া।',
    },
    question: 'Running promises in parallel vs in sequence with await (and the forEach + await trap).',
    answer: 'Awaiting one call after another runs them in sequence, so total time is the sum; that is right only when each step depends on the previous one. For independent work, start all promises first and await them together with Promise.all (or allSettled), so total time is roughly the slowest one. Array.prototype.forEach ignores the promises returned by an async callback, so it does not wait and its errors go unhandled; use for...of for sequential work or Promise.all(arr.map(...)) for parallel work.',
    points: [
      'Sequential awaits: time = sum of all calls',
      'Parallel with Promise.all: time = slowest call',
      'Start promises before awaiting to run them concurrently',
      'forEach does not await async callbacks - code after it runs immediately',
      'Sequential loop: for...of with await; parallel: Promise.all(items.map(fn))',
      'For many items, limit concurrency (batching or a pool)',
    ],
    code: `const wait = (ms, v) => new Promise(r => setTimeout(() => r(v), ms));

async function demo() {
  console.time('sequential');
  await wait(500); await wait(500);
  console.timeEnd('sequential'); // ~1000ms

  console.time('parallel');
  await Promise.all([wait(500), wait(500)]);
  console.timeEnd('parallel');   // ~500ms

  [1, 2, 3].forEach(async id => { await wait(100); console.log('forEach', id); });
  console.log('after forEach');  // logs BEFORE the forEach items

  for (const id of [1, 2, 3]) {  // truly waits for each one
    await wait(100);
    console.log('for...of', id);
  }
}
demo();`,
  },
  {
    id: 'ja-9',
    level: 'junior',
    topic: 'js-async',
    difficulty: 'medium',
    simple: {
      hi: 'setTimeout(fn, 0) aisa hai jaise tum teacher ko bolo \'abhi nahi, current period khatam hone ke baad mera sawaal lena.\' Zero ka matlab \'turant\' nahi, \'line mein sabse pehle mauka milte hi\' hai.',
      en: 'setTimeout(fn, 0) is like telling the teacher, \'not now, take my question after the current period ends.\' Zero doesn\'t mean \'immediately\'; it means \'at the first chance once my turn comes.\'',
      bn: 'setTimeout(fn, 0) হলো টিচারকে বলার মতো, \'এখন না, এই পিরিয়ড শেষ হলে আমার প্রশ্নটা নেবেন।\' Zero মানে \'সঙ্গে সঙ্গে\' নয়, মানে \'সুযোগ পেলেই প্রথমে\'।',
    },
    question: 'What does setTimeout(fn, 0) actually do?',
    answer: 'It does not run fn immediately; it schedules fn as a macrotask to run after at least 0 ms, which means after the current synchronous code finishes and after all pending microtasks (promise callbacks) have run, and possibly after a render. The delay is a minimum, not a guarantee: browsers clamp nested timers to about 4 ms and throttle timers in background tabs. It is used to defer work or let the UI update, though queueMicrotask, requestAnimationFrame or Web Workers are often better fits.',
    points: [
      'Schedules a macrotask; never runs synchronously',
      'Runs after current sync code and all microtasks',
      'Delay is a minimum; nested timers are clamped (~4ms), background tabs throttled',
      'Useful to yield to the browser so it can render',
      'Alternatives: queueMicrotask, requestAnimationFrame, setImmediate (Node)',
    ],
    code: `setTimeout(() => console.log('timeout 0'), 0);

Promise.resolve().then(() => console.log('promise'));

console.log('sync');

// sync
// promise
// timeout 0`,
  },
  {
    id: 'ja-10',
    level: 'mid',
    topic: 'js-async',
    difficulty: 'medium',
    simple: {
      hi: 'AbortController ek remote control jaisa hai jo tum Swiggy order ke saath rakhte ho. Mann badal gaya to \'cancel\' button dabao, delivery wala raaste se hi wapas chala jaata hai.',
      en: 'An AbortController is like a remote control you keep with your food delivery order. If you change your mind, you press \'cancel\' and the delivery person turns back on the way.',
      bn: 'AbortController হলো একটা রিমোট কন্ট্রোলের মতো, যেটা তুমি খাবারের ডেলিভারি অর্ডারের সঙ্গে রাখো। মন বদলালে \'cancel\' বোতাম টেপো, ডেলিভারির লোক রাস্তা থেকেই ফিরে যায়।',
    },
    question: 'How do you cancel a fetch request? (AbortController)',
    answer: 'Create an AbortController, pass controller.signal in the fetch options, and call controller.abort() to cancel; the fetch promise then rejects with a DOMException named \'AbortError\'. For timeouts you can pass AbortSignal.timeout(ms), which rejects with a \'TimeoutError\', and AbortSignal.any() combines several signals. A controller can abort only once, so create a new one per request; this pattern is common for search-as-you-type and cleaning up when a component is destroyed (Angular HttpClient cancels when you unsubscribe).',
    points: [
      'new AbortController(); fetch(url, { signal: controller.signal })',
      'controller.abort() -> fetch rejects with name \'AbortError\'',
      'AbortSignal.timeout(ms) for built-in timeouts (\'TimeoutError\')',
      'One controller per request - once aborted, it stays aborted',
      'Same signal works with addEventListener and many other APIs',
      'Use cases: typeahead search, route change, component destroy',
    ],
    code: `const controller = new AbortController();

fetch('https://jsonplaceholder.typicode.com/posts', { signal: controller.signal })
  .then(res => res.json())
  .then(data => console.log('posts:', data.length))
  .catch(err => {
    if (err.name === 'AbortError') console.log('Request cancelled');
    else console.error(err);
  });

setTimeout(() => controller.abort(), 10); // cancel after 10ms

// Timeout variant:
// fetch(url, { signal: AbortSignal.timeout(5000) }) // rejects with 'TimeoutError'`,
  },
  {
    id: 'ja-11',
    level: 'mid',
    topic: 'js-async',
    difficulty: 'medium',
    simple: {
      hi: 'Promisify ek purane landline ko smartphone mein badalne jaisa hai. Pehle tum number dekar wait karte the ki koi call back kare; ab tumhe ek proper receipt (promise) milti hai jise tum then aur await se track kar sakte ho.',
      en: 'Promisify is like upgrading an old landline to a smartphone. Before, you left your number and waited for someone to call back; now you get a proper receipt (a promise) that you can track with then and await.',
      bn: 'Promisify হলো পুরনো ল্যান্ডলাইনকে স্মার্টফোনে বদলানোর মতো। আগে নম্বর দিয়ে অপেক্ষা করতে, কেউ ফোন করবে; এখন একটা ঠিকঠাক রসিদ (promise) পাও, যেটা then আর await দিয়ে ট্র্যাক করা যায়।',
    },
    question: 'How do you convert a callback-based function into a Promise (promisify)?',
    answer: 'Wrap the call in new Promise and pass the original function a callback that calls reject on error and resolve on success, following the error-first (err, result) convention. A generic promisify returns a new function that does this for any such API and preserves this. In Node.js you can use util.promisify or, better, the built-in promise APIs like fs/promises.',
    points: [
      'Wrap in new Promise((resolve, reject) => ...)',
      'Error-first callback: err -> reject, result -> resolve',
      'Generic helper returns a wrapper function using rest args',
      'Preserve this with fn.call(this, ...)',
      'Node: util.promisify, or use fs/promises, timers/promises directly',
      'Resolve/reject only once - extra calls are ignored',
    ],
    code: `function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn.call(this, ...args, (err, result) => (err ? reject(err) : resolve(result)));
    });
  };
}

const legacyDivide = (a, b, cb) =>
  setTimeout(() => (b === 0 ? cb(new Error('Divide by zero')) : cb(null, a / b)), 50);

const divide = promisify(legacyDivide);

divide(10, 2).then(console.log);                  // 5
divide(1, 0).catch(err => console.log(err.message)); // Divide by zero

// Node.js: const { promisify } = require('node:util');`,
  },
  {
    id: 'ja-12',
    level: 'senior',
    topic: 'js-async',
    difficulty: 'hard',
    simple: {
      hi: 'Web Worker ek restaurant ke peeche wale kitchen helper jaisa hai. Waiter (main thread) customers se baat karta rehta hai, aur bhaari kaam jaise pyaaz kaatna helper peeche karta hai; helper customers ke table (DOM) tak nahi jaata, sirf message bhejta hai.',
      en: 'A Web Worker is like a kitchen helper at the back of a restaurant. The waiter (main thread) keeps talking to customers, while the helper does heavy work like chopping onions at the back; the helper never goes to the customers\' tables (the DOM), he only sends messages.',
      bn: 'Web Worker হলো রেস্তোরাঁর পেছনের রান্নাঘরের সহকারীর মতো। ওয়েটার (main thread) কাস্টমারদের সঙ্গে কথা বলতে থাকে, আর পেঁয়াজ কাটার মতো ভারী কাজ সহকারী পেছনে করে; সে কাস্টমারের টেবিলে (DOM) যায় না, শুধু মেসেজ পাঠায়।',
    },
    question: 'What are Web Workers and when would you use them?',
    answer: 'Web Workers run JavaScript on a separate background thread with its own event loop and global scope, so heavy computation does not block the main thread and the UI stays responsive. Workers cannot touch the DOM; they communicate with the page through postMessage, where data is structured-cloned (or transferred without copying for ArrayBuffers), and SharedArrayBuffer with Atomics is possible only on cross-origin-isolated pages. Use them for CPU-bound work like image/video processing, parsing large files, encryption, compression or search indexing, not for network calls, which are already async.',
    points: [
      'Separate thread, own global (self), no DOM / window access',
      'Communicate via postMessage + onmessage; data is structured-cloned',
      'Transferable objects (ArrayBuffer) move data without copying',
      'Use for CPU-heavy tasks; I/O is already non-blocking',
      'Types: dedicated, shared; service workers are a different thing (network proxy, offline)',
      'Angular CLI: ng generate web-worker; startup and messaging have overhead',
    ],
    code: `// main.js
const worker = new Worker(new URL('./prime.worker.js', import.meta.url), { type: 'module' });
worker.onmessage = (e) => console.log('Primes found:', e.data); // 9592
worker.postMessage(100000);

// prime.worker.js
self.onmessage = (e) => {
  const n = e.data;
  let count = 0;
  for (let i = 2; i <= n; i++) {
    let isPrime = true;
    for (let j = 2; j * j <= i; j++) {
      if (i % j === 0) { isPrime = false; break; }
    }
    if (isPrime) count++;
  }
  self.postMessage(count);
};`,
  },
  {
    id: 'ja-13',
    level: 'senior',
    topic: 'js-async',
    difficulty: 'hard',
    simple: {
      hi: 'Generator ek token machine jaisa hai jo bank mein lagi hoti hai: button dabao to agla number milta hai, saare number pehle se print nahi hote. Async iterator aisa hai jaise har token aane mein thoda time lage, aur for await...of shaanti se har token ka intezaar karta hai.',
      en: 'A generator is like the token machine at a bank: press the button and you get the next number; the numbers are not all printed in advance. An async iterator is like each token taking a little time to come out, and for await...of patiently waits for each one.',
      bn: 'Generator হলো ব্যাংকের টোকেন মেশিনের মতো: বোতাম টিপলে পরের নম্বর পাও, সব নম্বর আগে থেকে ছাপানো থাকে না। Async iterator হলো যখন প্রতিটা টোকেন বেরোতে একটু সময় লাগে, আর for await...of ধৈর্য ধরে প্রতিটার জন্য অপেক্ষা করে।',
    },
    question: 'What are generators and async iterators (for await...of)?',
    answer: 'A generator function (function*) returns an iterator; each next() call runs it until the next yield, which pauses it and returns {value, done}, so values are produced lazily, even infinitely, and you can pass values back in through next(value). An async generator (async function*) can await inside and yields promises; it implements Symbol.asyncIterator and is consumed with for await...of. This is ideal for paginated APIs, streams (Node streams are async iterable) and processing data piece by piece.',
    points: [
      'function* + yield: pausable function returning an iterator',
      'next() returns { value, done }; generators are lazy',
      'Generators are iterable: for...of, spread work',
      'async function* can await and yield; consumed by for await...of',
      'Use cases: infinite IDs, pagination, streams, chunked processing',
      'for await...of works in async functions and module top level',
    ],
    code: `function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
const ids = idGenerator();
console.log(ids.next().value, ids.next().value); // 1 2

async function* fetchPages(total) {
  for (let page = 1; page <= total; page++) {
    await new Promise(r => setTimeout(r, 100)); // fake API call
    yield [\`item-\${page}a\`, \`item-\${page}b\`];
  }
}

(async () => {
  for await (const items of fetchPages(3)) {
    console.log(items); // ['item-1a','item-1b'] ... ['item-3a','item-3b']
  }
})();`,
  },
  {
    id: 'ja-14',
    level: 'senior',
    topic: 'js-async',
    difficulty: 'hard',
    simple: {
      hi: 'Exponential backoff aise hai jaise busy number par call karna: pehli baar fail hua to 1 minute ruko, phir 2, phir 4 minute, har baar thoda zyada. Aur agar number hi galat hai (400 error), to baar-baar call karne ka koi fayda nahi.',
      en: 'Exponential backoff is like calling a busy phone number: if it fails, wait 1 minute, then 2, then 4, a little longer each time. And if the number itself is wrong (a 400 error), calling again and again is pointless.',
      bn: 'Exponential backoff হলো ব্যস্ত নম্বরে ফোন করার মতো: প্রথমবার না লাগলে ১ মিনিট অপেক্ষা, তারপর ২, তারপর ৪ মিনিট, প্রতিবার একটু বেশি। আর যদি নম্বরটাই ভুল হয় (400 error), বারবার ফোন করে লাভ নেই।',
    },
    question: 'Implement retry with exponential backoff for an async function.',
    answer: 'Call the function in a loop; on failure, if attempts remain and the error is retryable, wait for a delay that doubles each time (base * 2^attempt), capped at a maximum, then try again, and rethrow the last error when attempts run out. Add random jitter so many clients don\'t retry at the same moment (thundering herd). Retry only transient failures such as network errors, 5xx and 429 (respecting Retry-After), never validation errors like 400/401; in Angular, RxJS retry({ count, delay }) gives the same behaviour for HttpClient.',
    points: [
      'Delay grows exponentially: base * 2^attempt, capped by maxDelay',
      'Add jitter (random delay) to avoid synchronised retries',
      'Limit attempts and rethrow the final error',
      'Retry only transient errors: network, 5xx, 429 - not 4xx validation/auth',
      'Respect Retry-After headers and support cancellation with AbortSignal',
      'Make sure the operation is idempotent before retrying',
    ],
    code: `const sleep = ms => new Promise(r => setTimeout(r, ms));

async function retry(fn, { retries = 3, baseMs = 300, maxMs = 5000 } = {}) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn(attempt);
    } catch (err) {
      if (attempt >= retries || err.retryable === false) throw err;
      const backoff = Math.min(maxMs, baseMs * 2 ** attempt);
      const delay = Math.random() * backoff; // full jitter
      console.log(\`Attempt \${attempt + 1} failed, retrying in \${Math.round(delay)}ms\`);
      await sleep(delay);
    }
  }
}

let calls = 0;
retry(async () => {
  if (++calls < 3) throw new Error('flaky network');
  return 'ok';
}).then(console.log); // 'ok' on the 3rd attempt`,
  },
  {
    id: 'jb-1',
    level: 'fresher',
    topic: 'js-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Primitive ek chhota sikka jaisa hai — aap dost ko sikka doge to uske paas apna alag sikka hoga. Object ek ghar ka address jaisa hai — address share karoge to dono same ghar mein jaate ho, aur ek ne kuch badla to dusre ko bhi dikhega.',
      en: 'A primitive is like a coin — if you give your friend a coin, they have their own separate coin. An object is like a house address — if you share the address, you both go to the same house, so if one changes something, the other sees it too.',
      bn: 'Primitive হলো একটা ছোট কয়েনের মতো — বন্ধুকে কয়েন দিলে তার কাছে আলাদা একটা কয়েন থাকে। Object হলো বাড়ির ঠিকানার মতো — ঠিকানা share করলে দুজনেই একই বাড়িতে যাও, তাই একজন কিছু বদলালে অন্যজনও সেটা দেখতে পায়।',
    },
    question: 'What are the data types in JavaScript? Primitive vs reference types.',
    answer: 'JavaScript has 7 primitive types — string, number, bigint, boolean, undefined, null and symbol — and one non-primitive type, object (which includes arrays, functions, dates, maps, etc.). Primitives are immutable and are copied by value. Objects are reference types: a variable holds a reference to the object, so copying the variable copies the reference, not the object.',
    points: [
      '7 primitives: string, number, bigint, boolean, undefined, null, symbol',
      'Everything else is an object (arrays, functions, Date, Map, Set...)',
      'Primitives are immutable and compared by value',
      'Objects are compared by reference: {} === {} is false',
      'Primitives get temporary wrapper objects for methods, e.g. \'abc\'.toUpperCase()',
    ],
    code: `let a = 10;
let b = a;      // copy of the value
b = 20;
console.log(a); // 10

const o1 = { n: 1 };
const o2 = o1;  // copy of the reference
o2.n = 2;
console.log(o1.n); // 2
console.log({} === {}); // false`,
  },
  {
    id: 'jb-2',
    level: 'fresher',
    topic: 'js-basics',
    difficulty: 'easy',
    simple: {
      hi: '== ek dhila teacher hai jo kehta hai \'answer 5 hai, chahe likha ho ya number mein — dono chalega\'. === ek strict teacher hai jo answer aur format dono check karta hai.',
      en: '== is like a relaxed teacher who says \'the answer is 5, whether you wrote it in words or digits — both are fine\'. === is a strict teacher who checks both the answer and the format.',
      bn: '== হলো একজন ঢিলেঢালা teacher যিনি বলেন \'উত্তর 5, কথায় লেখো বা সংখ্যায় — দুটোই চলবে\'। === হলো একজন কড়া teacher যিনি উত্তর আর format দুটোই check করেন।',
    },
    question: 'What is the difference between == and ===?',
    answer: '=== is strict equality: it returns true only if both value and type are the same, with no conversion. == is loose equality: if the types differ, it first converts (coerces) the operands to a common type and then compares. In practice you should use === almost always; a common accepted exception is x == null, which checks for both null and undefined.',
    points: [
      '=== compares value and type, no coercion',
      '== coerces types before comparing',
      '\'5\' == 5 is true, \'5\' === 5 is false',
      'null == undefined is true, null === undefined is false',
      'NaN is not equal to anything with either operator, including itself',
      'Prefer ===; x == null is a common shortcut for null-or-undefined',
    ],
    code: `console.log('5' == 5);           // true
console.log('5' === 5);          // false
console.log(0 == false);         // true
console.log(0 === false);        // false
console.log(null == undefined);  // true
console.log(null === undefined); // false
console.log(NaN == NaN);         // false`,
  },
  {
    id: 'jb-3',
    level: 'fresher',
    topic: 'js-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Socho school mein ek bench hai. undefined matlab bench lagi hai par abhi koi baitha nahi. null matlab teacher ne jaan-boojh kar bench khaali rakhi hai. Undeclared matlab woh bench class mein hai hi nahi.',
      en: 'Think of a bench in a classroom. undefined means the bench is there but nobody has sat on it yet. null means the teacher has purposely kept the bench empty. Undeclared means that bench does not exist in the class at all.',
      bn: 'ক্লাসের একটা বেঞ্চের কথা ভাবো। undefined মানে বেঞ্চ আছে কিন্তু এখনো কেউ বসেনি। null মানে teacher ইচ্ছে করে বেঞ্চটা খালি রেখেছেন। Undeclared মানে সেই বেঞ্চটা ক্লাসে নেই-ই।',
    },
    question: 'null vs undefined vs undeclared variables.',
    answer: 'undefined means a variable has been declared but not assigned a value (it is also the default return value of functions and the value of missing properties). null is an intentional \'no value\' that a developer assigns explicitly. An undeclared variable was never declared at all — reading it throws a ReferenceError, although typeof on it safely returns \'undefined\'.',
    points: [
      'undefined: declared but not assigned; set by the JS engine',
      'null: deliberately assigned \'empty\' value; set by the developer',
      'undeclared: never declared; reading it throws ReferenceError',
      'typeof undefined is \'undefined\', typeof null is \'object\' (historic bug)',
      'null == undefined is true, null === undefined is false',
      'Assigning to an undeclared variable creates a global in sloppy mode, throws in strict mode',
    ],
    code: `let a;
console.log(a);            // undefined
let b = null;
console.log(b);            // null
console.log(typeof c);     // 'undefined' (c is undeclared)
try {
  console.log(c);
} catch (e) {
  console.log(e.name);     // ReferenceError
}`,
  },
  {
    id: 'jb-4',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Coercion ek dukaandaar jaisa hai jo aapki cheez ko apne hisaab se badal deta hai. Aap \'5\' (likha hua) aur 1 do aur + bolo, to woh dono ko chit pe saath likh deta hai — \'51\'. Par - bolo to woh samajh jaata hai ki hisaab karna hai aur 4 deta hai.',
      en: 'Coercion is like a shopkeeper who converts your things in his own way. If you give \'5\' (written text) and 1 and say +, he writes them side by side on a slip — \'51\'. But if you say -, he understands it is maths and gives 4.',
      bn: 'Coercion হলো এমন এক দোকানদারের মতো যে তোমার জিনিস নিজের মতো করে বদলে নেয়। তুমি \'5\' (লেখা) আর 1 দিয়ে + বললে সে দুটো পাশাপাশি লিখে দেয় — \'51\'। কিন্তু - বললে সে বোঝে এটা অঙ্ক, আর 4 দেয়।',
    },
    question: 'What is type coercion? Implicit vs explicit, with tricky examples ("5" + 1, "5" - 1, [] + {}).',
    answer: 'Type coercion is the automatic or manual conversion of a value from one type to another. Explicit coercion is when you convert on purpose, e.g. Number(\'5\'), String(5), Boolean(x). Implicit coercion happens when operators do it for you: + with a string operand does string concatenation, while -, *, / convert operands to numbers. Objects are first converted to primitives (via valueOf/toString), which is why [] + {} gives \'[object Object]\'.',
    points: [
      'Explicit: Number(), String(), Boolean(), parseInt()',
      'Implicit: triggered by operators like +, -, ==, if()',
      '\'5\' + 1 → \'51\' (+ concatenates if either side is a string)',
      '\'5\' - 1 → 4 (- always converts to number)',
      '[] + {} → \'[object Object]\' ([] becomes \'\' and {} becomes \'[object Object]\')',
      '\'abc\' - 1 → NaN; true + 1 → 2',
    ],
    code: `console.log('5' + 1);   // '51'
console.log('5' - 1);   // 4
console.log('5' * '2'); // 10
console.log(true + 1);  // 2
console.log([] + []);   // '' (empty string)
console.log([] + {});   // '[object Object]'
console.log(Number('42'), String(42), Boolean('')); // 42 '42' false`,
  },
  {
    id: 'jb-5',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'typeof ek naya station master jaisa hai jo dabbe dekh kar train ka type batata hai, par kabhi galti karta hai — khaali dabba (null) dekh ke bhi \'object\' bol deta hai. Pakka jaanna ho ki train array hai ya nahi, to Array.isArray se ticket check karo.',
      en: 'typeof is like a new station master who tells the train type by looking at the coaches, but sometimes makes mistakes — he even calls an empty coach (null) an \'object\'. If you want to be sure a train is an array, check its ticket with Array.isArray.',
      bn: 'typeof হলো এক নতুন স্টেশন মাস্টারের মতো যে কামরা দেখে ট্রেনের ধরন বলে, কিন্তু মাঝে মাঝে ভুল করে — খালি কামরা (null) দেখেও \'object\' বলে দেয়। ট্রেনটা array কিনা নিশ্চিত হতে চাইলে Array.isArray দিয়ে টিকিট check করো।',
    },
    question: 'What are the quirks of typeof (typeof null, NaN, arrays, functions)? How do you check for an array?',
    answer: 'typeof returns a string describing the type, but it has quirks: typeof null is \'object\' (a long-standing bug kept for compatibility), typeof NaN is \'number\', typeof [] is \'object\', and typeof of a function is \'function\' even though functions are objects. To reliably check for an array use Array.isArray(value), which also works across iframes/realms unlike instanceof Array.',
    points: [
      'typeof null === \'object\' — historic bug',
      'typeof NaN === \'number\'',
      'typeof [] === \'object\' — arrays are objects',
      'typeof function(){} === \'function\'',
      'typeof undeclaredVar === \'undefined\' (no error)',
      'Use Array.isArray() to check arrays; check null with === null',
    ],
    code: `console.log(typeof null);         // 'object'
console.log(typeof NaN);          // 'number'
console.log(typeof []);           // 'object'
console.log(typeof function(){}); // 'function'
console.log(typeof 10n);          // 'bigint'
console.log(typeof Symbol());     // 'symbol'
console.log(Array.isArray([]));   // true
console.log(Array.isArray({}));   // false`,
  },
  {
    id: 'jb-6',
    level: 'fresher',
    topic: 'js-basics',
    difficulty: 'easy',
    simple: {
      hi: 'var ek purana ghar ka almirah hai jo pure ghar (function) mein kahin se bhi khul jaata hai. let ek kamre ka almirah hai — sirf us kamre (block) mein, aur saman badal sakte ho. const ek tala laga almirah hai — almirah badal nahi sakte, par andar ke kapde ulat-palat kar sakte ho.',
      en: 'var is like an old cupboard that can be opened from anywhere in the whole house (function). let is a cupboard in one room — only in that room (block), and you can change what is in it. const is a locked cupboard — you cannot replace the cupboard, but you can still rearrange the clothes inside.',
      bn: 'var হলো পুরনো একটা আলমারির মতো যেটা পুরো বাড়ির (function) যেকোনো জায়গা থেকে খোলা যায়। let হলো একটা ঘরের আলমারি — শুধু সেই ঘরে (block), আর ভেতরের জিনিস বদলানো যায়। const হলো তালা দেওয়া আলমারি — আলমারিটা বদলানো যায় না, কিন্তু ভেতরের জামাকাপড় সাজানো-গোছানো যায়।',
    },
    question: 'var vs let vs const — scope, re-declaration, re-assignment.',
    answer: 'var is function-scoped, can be re-declared and re-assigned, and is hoisted and initialised to undefined. let and const are block-scoped and live in the Temporal Dead Zone until their declaration line. let can be re-assigned but not re-declared in the same scope; const can be neither re-assigned nor re-declared and must be initialised — but a const object or array can still be mutated.',
    points: [
      'var: function scope, re-declare yes, re-assign yes, hoisted as undefined',
      'let: block scope, re-declare no, re-assign yes, TDZ',
      'const: block scope, re-declare no, re-assign no, must be initialised, TDZ',
      'const makes the binding constant, not the value — objects can be mutated',
      'Top-level var creates a property on the global object; let/const do not',
      'Default to const, use let when re-assignment is needed, avoid var',
    ],
    code: `if (true) {
  var a = 1;
  let b = 2;
  const c = 3;
}
console.log(a);            // 1 (var leaks out of the block)
console.log(typeof b);     // 'undefined' (b is block-scoped)

const arr = [1, 2];
arr.push(3);               // allowed: mutating
console.log(arr);          // [1, 2, 3]
// arr = [];               // TypeError: Assignment to constant variable`,
  },
  {
    id: 'jb-7',
    level: 'fresher',
    topic: 'js-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Hoisting cricket match se pehle team list jaisa hai. Umpire ko pehle se pata hota hai ki kaun-kaun khilaadi hai (declarations), chahe woh abhi ground pe na aaye ho. Function poori taiyari ke saath aata hai, par var ka khilaadi khaali haath (undefined) khada hota hai.',
      en: 'Hoisting is like the team list before a cricket match. The umpire already knows who the players are (declarations), even if they have not come onto the field yet. A function arrives fully ready, but a var player stands there empty-handed (undefined).',
      bn: 'Hoisting হলো ক্রিকেট ম্যাচের আগের টিম লিস্টের মতো। খেলোয়াড়রা মাঠে না এলেও আম্পায়ার আগে থেকেই জানেন কারা খেলবে (declarations)। Function পুরো তৈরি হয়ে আসে, কিন্তু var-এর খেলোয়াড় খালি হাতে (undefined) দাঁড়িয়ে থাকে।',
    },
    question: 'What is hoisting? (variables vs functions)',
    answer: 'Hoisting is the behaviour where declarations are processed before the code runs, so they behave as if moved to the top of their scope. Function declarations are hoisted completely, so you can call them before they appear. var declarations are hoisted and initialised to undefined, while let, const and class declarations are hoisted but not initialised, so accessing them early throws a ReferenceError (Temporal Dead Zone). Function expressions and arrow functions follow the rules of the variable they are assigned to.',
    points: [
      'Declarations are registered during the creation phase, before execution',
      'Function declarations: fully hoisted, callable before definition',
      'var: hoisted and initialised to undefined',
      'let/const/class: hoisted but uninitialised → ReferenceError (TDZ)',
      'Function expressions/arrows assigned to var are undefined before assignment',
      'Only declarations are hoisted, not assignments',
    ],
    code: `console.log(sum(2, 3)); // 5 (function declaration hoisted)
function sum(a, b) { return a + b; }

console.log(x);         // undefined (var hoisted)
var x = 10;

try {
  greet();              // greet is undefined at this point
} catch (e) {
  console.log(e.name);  // TypeError
}
var greet = () => 'hi';`,
  },
  {
    id: 'jb-8',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'TDZ train ke reserved seat jaisa hai. Seat aapke naam pe book hai (variable hoisted hai), par jab tak aapka station nahi aata aur aap baithte nahi, koi us seat ko use nahi kar sakta — koshish ki to TC (ReferenceError) pakad lega.',
      en: 'The TDZ is like a reserved train seat. The seat is booked in your name (the variable is hoisted), but until your station comes and you actually sit down, nobody can use it — if someone tries, the TC (ReferenceError) catches them.',
      bn: 'TDZ হলো ট্রেনের রিজার্ভ করা সিটের মতো। সিটটা তোমার নামে বুক করা আছে (variable hoisted), কিন্তু তোমার স্টেশন এসে তুমি না বসা পর্যন্ত কেউ সেটা ব্যবহার করতে পারবে না — চেষ্টা করলে TC (ReferenceError) ধরে ফেলবে।',
    },
    question: 'What is the Temporal Dead Zone?',
    answer: 'The Temporal Dead Zone (TDZ) is the period between entering a scope and the line where a let, const or class binding is declared. The binding exists (it is hoisted) but is uninitialised, so any read or write during this time throws a ReferenceError. It exists to catch bugs where a variable is used before it is defined, unlike var which silently gives undefined.',
    points: [
      'Applies to let, const and class declarations',
      'Starts at the beginning of the scope, ends at the declaration line',
      'Accessing the variable in the TDZ throws ReferenceError',
      'The variable is hoisted, just not initialised',
      'It is about time of execution, not position in code — a function using the variable is fine if called after declaration',
      'typeof is not safe inside the TDZ (it throws too)',
    ],
    code: `function demo() {
  try {
    console.log(value); // inside TDZ
  } catch (e) {
    console.log(e.name); // ReferenceError
  }
  let value = 5;        // TDZ ends here
  console.log(value);   // 5
}
demo();

const show = () => console.log(later);
const later = 'ok';
show();                 // 'ok' — called after TDZ ended`,
  },
  {
    id: 'jb-9',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Scope chain ghar mein cheez dhoondhne jaisa hai. Pehle apne kamre mein dhoondho, nahi mila to ghar ke hall mein, phir bhi nahi mila to mohalle ki dukaan mein. Lekin hall wale log aapke kamre ke andar ki cheez nahi dekh sakte.',
      en: 'The scope chain is like searching for something at home. First you look in your own room, if it is not there you look in the hall, and if still not found, in the neighbourhood shop. But people in the hall cannot see what is inside your room.',
      bn: 'Scope chain হলো বাড়িতে কিছু খোঁজার মতো। প্রথমে নিজের ঘরে খোঁজো, না পেলে বসার ঘরে, তাও না পেলে পাড়ার দোকানে। কিন্তু বসার ঘরের লোকেরা তোমার ঘরের ভেতরের জিনিস দেখতে পায় না।',
    },
    question: 'Explain scope and the scope chain (global, function, block, lexical scope).',
    answer: 'Scope decides where a variable is accessible. Global scope is visible everywhere, function scope is created by each function (var lives here), and block scope is created by {} for let and const. JavaScript uses lexical (static) scope: a function\'s access to variables is determined by where it is written, not where it is called. When a variable is looked up, the engine searches the current scope, then each outer scope in turn up to global — this is the scope chain; if it is not found, a ReferenceError is thrown.',
    points: [
      'Global, function, block (let/const) and module scope',
      'Lexical scope: decided by where code is written',
      'Scope chain: look up current scope, then outer scopes, until global',
      'Inner scopes can see outer variables, not the other way round',
      'Variable shadowing: inner declaration hides an outer one with the same name',
      'Lexical scope is the basis of closures',
    ],
    code: `const city = 'Kolkata';         // global
function outer() {
  const team = 'KKR';           // function scope
  function inner() {
    if (true) {
      const player = 'Rinku';   // block scope
      console.log(player, team, city); // looks up the chain
    }
  }
  inner();
}
outer(); // Rinku KKR Kolkata`,
  },
  {
    id: 'jb-10',
    level: 'fresher',
    topic: 'js-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Truthy aur falsy school attendance jaisa hai. Kuch hi bacche \'absent\' maane jaate hain — jaise 0, khaali string, null, undefined, NaN, false. Baaki sab, chahe khaali bag ([]) leke aaye, \'present\' (truthy) maane jaate hain.',
      en: 'Truthy and falsy are like school attendance. Only a few kids are marked \'absent\' — like 0, empty string, null, undefined, NaN and false. Everyone else, even someone who comes with an empty bag ([]), is marked \'present\' (truthy).',
      bn: 'Truthy আর falsy হলো স্কুলের হাজিরার মতো। মাত্র কয়েকজনকে \'অনুপস্থিত\' ধরা হয় — যেমন 0, খালি string, null, undefined, NaN আর false। বাকি সবাই, এমনকি খালি ব্যাগ ([]) নিয়ে এলেও, \'উপস্থিত\' (truthy) ধরা হয়।',
    },
    question: 'What are truthy and falsy values?',
    answer: 'When a value is used in a boolean context (if, &&, ||, !, ternary), JavaScript converts it to true or false. There is a fixed list of falsy values: false, 0, -0, 0n, \'\' (empty string), null, undefined and NaN. Every other value is truthy — including \'0\', \'false\', [], {} and functions.',
    points: [
      'Falsy: false, 0, -0, 0n, \'\', null, undefined, NaN',
      'Everything else is truthy',
      'Surprising truthy values: \'0\', \'false\', \' \', [], {}',
      'Convert explicitly with Boolean(x) or !!x',
      'Be careful with 0 and \'\' when using || for defaults — use ?? instead',
    ],
    code: `const values = [0, '', null, undefined, NaN, '0', [], {}, 'false'];
for (const v of values) {
  console.log(v, Boolean(v));
}
// 0 false | '' false | null false | undefined false | NaN false
// '0' true | [] true | {} true | 'false' true

if ([]) console.log('empty array is truthy'); // runs`,
  },
  {
    id: 'jb-11',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'NaN ek galat bana hua hisaab jaisa hai — jaise dukaandaar se \'aam guna 2\' poocho. isNaN() thoda jaldbaaz hai — har cheez ko pehle number banane ki koshish karta hai. Number.isNaN() samajhdaar hai — sirf tab \'haan\' bolta hai jab cheez sach mein NaN ho.',
      en: 'NaN is like a broken calculation — like asking a shopkeeper for \'mango times 2\'. isNaN() is a bit hasty — it tries to turn everything into a number first. Number.isNaN() is wise — it only says \'yes\' when the thing really is NaN.',
      bn: 'NaN হলো একটা ভুল হিসাবের মতো — যেমন দোকানদারকে \'আম গুণ 2\' জিজ্ঞেস করা। isNaN() একটু তাড়াহুড়ো করে — সবকিছুকে আগে number বানানোর চেষ্টা করে। Number.isNaN() বুদ্ধিমান — শুধু তখনই \'হ্যাঁ\' বলে যখন জিনিসটা সত্যিই NaN।',
    },
    question: 'What is NaN? isNaN() vs Number.isNaN().',
    answer: 'NaN (\'Not a Number\') is a special value of type number that represents an invalid numeric result, such as \'abc\' * 2 or 0 / 0. It is the only value not equal to itself, so NaN === NaN is false. The global isNaN() first coerces its argument to a number, so isNaN(\'abc\') is true even though \'abc\' is a string. Number.isNaN() does no coercion and returns true only if the value is actually NaN, so it is the reliable choice.',
    points: [
      'typeof NaN is \'number\'',
      'NaN !== NaN — it is not equal to itself',
      'isNaN() coerces: isNaN(\'abc\') → true, isNaN(\'\') → false',
      'Number.isNaN() does not coerce: Number.isNaN(\'abc\') → false',
      'Object.is(NaN, NaN) → true; [NaN].includes(NaN) → true, but indexOf returns -1',
      'Prefer Number.isNaN()',
    ],
    code: `console.log(0 / 0);                 // NaN
console.log(NaN === NaN);           // false
console.log(isNaN('abc'));          // true  (coerced to NaN)
console.log(Number.isNaN('abc'));   // false (not actually NaN)
console.log(Number.isNaN(NaN));     // true
console.log(Object.is(NaN, NaN));   // true
console.log([NaN].includes(NaN));   // true
console.log([NaN].indexOf(NaN));    // -1`,
  },
  {
    id: 'jb-12',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Primitive dena matlab dost ko apne notes ki photocopy dena — woh usme kuch bhi likhe, aapke notes safe hain. Object dena matlab apne ghar ki chaabi ki copy dena — woh ghar mein saman badlega to aapko bhi dikhega, par woh apni chaabi kisi aur ghar ki bana le to aapka ghar nahi badlega.',
      en: 'Passing a primitive is like giving a friend a photocopy of your notes — whatever they write on it, your notes are safe. Passing an object is like giving a copy of your house key — if they rearrange the house, you see it too, but if they change their key to another house, your house does not change.',
      bn: 'Primitive দেওয়া মানে বন্ধুকে নিজের নোটসের ফটোকপি দেওয়া — সে তাতে যা খুশি লিখুক, তোমার নোটস ঠিক থাকে। Object দেওয়া মানে বাড়ির চাবির একটা কপি দেওয়া — সে বাড়ির জিনিস সরালে তুমিও দেখবে, কিন্তু সে নিজের চাবি অন্য বাড়ির বানিয়ে নিলে তোমার বাড়ি বদলায় না।',
    },
    question: 'Pass by value vs pass by reference in JavaScript.',
    answer: 'JavaScript is always pass by value. For primitives, the value itself is copied, so changes inside a function do not affect the caller. For objects, the value that is copied is a reference to the object (often called \'pass by sharing\'), so mutating the object\'s properties inside the function is visible outside, but re-assigning the parameter to a new object does not affect the caller\'s variable.',
    points: [
      'Technically everything is pass by value',
      'Primitives: the value is copied',
      'Objects: the reference is copied (pass by sharing)',
      'Mutating a passed object affects the original',
      'Re-assigning the parameter does not change the caller\'s variable',
      'Copy objects (spread/structuredClone) to avoid accidental mutation',
    ],
    code: `function update(num, obj) {
  num = 100;          // local copy only
  obj.score = 100;    // mutates shared object
  obj = { score: 0 }; // re-assigns local reference only
}
let n = 1;
const player = { score: 1 };
update(n, player);
console.log(n);            // 1
console.log(player.score); // 100`,
  },
  {
    id: 'jb-13',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Shallow copy aisa hai jaise dost ka tiffin box naya le liya, par andar ka dabba wahi purana — usme se aapne roti khaayi to dost ki bhi kam ho gayi. Deep copy matlab poora naya tiffin, andar ke har dabbe ke saath — dono alag-alag.',
      en: 'A shallow copy is like getting a new tiffin box for your friend but keeping the same inner container — if you eat a roti from it, your friend\'s roti is gone too. A deep copy is a completely new tiffin with every inner container new — the two are fully separate.',
      bn: 'Shallow copy হলো বন্ধুর জন্য নতুন টিফিন বাক্স নেওয়া, কিন্তু ভেতরের কৌটোটা সেই পুরনোটাই — তুমি তা থেকে রুটি খেলে বন্ধুরটাও কমে যায়। Deep copy মানে ভেতরের প্রতিটা কৌটোসহ একদম নতুন টিফিন — দুটো পুরোপুরি আলাদা।',
    },
    question: 'Shallow copy vs deep copy (spread, Object.assign, JSON, structuredClone).',
    answer: 'A shallow copy creates a new top-level object but nested objects are still shared by reference; spread ({...obj}, [...arr]) and Object.assign make shallow copies. A deep copy recursively copies every nested level so the copy is fully independent. JSON.parse(JSON.stringify(obj)) is an old deep-copy trick but loses functions, undefined, Symbols, turns Dates into strings and fails on circular references. structuredClone() is the modern built-in deep copy: it handles Dates, Maps, Sets and circular references, but cannot clone functions, DOM nodes or class prototypes.',
    points: [
      'Shallow: only top level copied, nested objects shared',
      'Spread and Object.assign are shallow',
      'JSON method: loses functions/undefined/Symbol, Date → string, breaks on circular refs',
      'structuredClone(): deep, supports Date, Map, Set, circular refs',
      'structuredClone throws on functions; class instances become plain objects',
      'Libraries like lodash cloneDeep are another option',
    ],
    code: `const original = { name: 'Asha', marks: { maths: 90 }, dob: new Date(2000, 0, 1) };

const shallow = { ...original };
shallow.marks.maths = 50;
console.log(original.marks.maths);  // 50 (shared)

const deep = structuredClone(original);
deep.marks.maths = 99;
console.log(original.marks.maths);  // 50 (independent)
console.log(deep.dob instanceof Date); // true

const viaJson = JSON.parse(JSON.stringify(original));
console.log(typeof viaJson.dob);    // 'string'`,
  },
  {
    id: 'jb-14',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Strict mode ek sakht PT teacher jaisa hai. Normal teacher chhoti galtiyan chupchap ignore kar deta hai, par strict teacher turant seeti bajata hai aur galti bata deta hai — isse aage chal ke badi galtiyan nahi hoti.',
      en: 'Strict mode is like a strict PT teacher. A normal teacher silently ignores small mistakes, but the strict teacher blows the whistle immediately and points out the mistake — so bigger problems do not happen later.',
      bn: 'Strict mode হলো একজন কড়া PT teacher-এর মতো। সাধারণ teacher ছোট ভুল চুপচাপ এড়িয়ে যান, কিন্তু কড়া teacher সঙ্গে সঙ্গে বাঁশি বাজিয়ে ভুলটা ধরিয়ে দেন — তাই পরে বড় সমস্যা হয় না।',
    },
    question: 'What is strict mode and what does it change?',
    answer: 'Strict mode is an opt-in restricted variant of JavaScript enabled with \'use strict\' at the top of a script or function. It turns silent errors into thrown errors and removes some confusing features. ES modules and class bodies are always in strict mode automatically, so most modern code (including Angular/TypeScript output) already runs strict.',
    points: [
      'Enable with \'use strict\'; automatic in ES modules and classes',
      'Assigning to an undeclared variable throws ReferenceError instead of creating a global',
      'this is undefined in plain function calls (not the global object)',
      'Writing to read-only/non-writable properties or frozen objects throws TypeError',
      'Duplicate parameter names, the with statement and legacy octal literals (010) are syntax errors',
      'delete on a non-configurable property throws',
    ],
    code: `'use strict';

try {
  total = 10;               // undeclared
} catch (e) {
  console.log(e.name);      // ReferenceError
}

function whoAmI() { return this; }
console.log(whoAmI());      // undefined

const frozen = Object.freeze({ a: 1 });
try { frozen.a = 2; } catch (e) { console.log(e.name); } // TypeError`,
  },
  {
    id: 'jb-15',
    level: 'junior',
    topic: 'js-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Socho aap 1 rupaye ko 3 dosto mein barabar baantna chahte ho — 33.333... paise, kabhi exact nahi hota. Computer ke liye 0.1 bhi waisa hi hai, isliye thoda sa farak reh jaata hai. Isliye paiso mein (integers) hisaab karo ya \'lagbhag barabar\' check karo.',
      en: 'Imagine you want to split 1 rupee equally among 3 friends — 33.333... paise, it never comes out exact. For a computer, 0.1 is like that too, so a tiny difference remains. That is why we count in paise (integers) or check if values are \'almost equal\'.',
      bn: 'ভাবো তুমি 1 টাকা 3 বন্ধুর মধ্যে সমান ভাগ করতে চাও — 33.333... পয়সা, কখনো ঠিকঠাক হয় না। Computer-এর কাছে 0.1-ও সেরকম, তাই একটু পার্থক্য থেকে যায়। তাই পয়সায় (integers) হিসাব করো বা \'প্রায় সমান\' কিনা check করো।',
    },
    question: 'Why is 0.1 + 0.2 !== 0.3 and how do you compare decimals safely?',
    answer: 'JavaScript numbers are IEEE 754 double-precision binary floating point. Numbers like 0.1 and 0.2 cannot be represented exactly in binary, so 0.1 + 0.2 evaluates to 0.30000000000000004. To compare decimals, check that the difference is within a small tolerance (e.g. Number.EPSILON for values near 1), round to a fixed number of decimals, or avoid the problem by working in integers (e.g. paise instead of rupees) or using a decimal library for money.',
    points: [
      'Numbers are 64-bit IEEE 754 floating point',
      '0.1 and 0.2 have no exact binary representation',
      '0.1 + 0.2 === 0.30000000000000004',
      'Compare with a tolerance: Math.abs(a - b) < Number.EPSILON (scale the tolerance for larger values)',
      'For money, use integers (paise/cents) or a decimal library',
      'toFixed() returns a string — useful for display, not for maths',
    ],
    code: `console.log(0.1 + 0.2);            // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3);    // false

const nearlyEqual = (a, b, eps = Number.EPSILON) => Math.abs(a - b) < eps;
console.log(nearlyEqual(0.1 + 0.2, 0.3)); // true

// Money in paise (integers)
const totalPaise = 10 + 20;        // Rs 0.10 + Rs 0.20
console.log(totalPaise / 100);     // 0.3
console.log((0.1 + 0.2).toFixed(2)); // '0.30' (string)`,
  },
  {
    id: 'jb-16',
    level: 'fresher',
    topic: 'js-basics',
    difficulty: 'easy',
    simple: {
      hi: '?. ek samajhdaar delivery boy jaisa hai — ghar ka address hi nahi hai to woh gir ke chot nahi khaata, bas \'nahi mila\' (undefined) bol deta hai. ?? sirf tab backup tiffin deta hai jab tiffin bilkul nahi hai (null/undefined), par || tab bhi backup de deta hai jab tiffin khaali (0 ya \'\') ho.',
      en: '?. is like a smart delivery boy — if there is no address at all, he does not fall and get hurt, he just says \'not found\' (undefined). ?? gives a backup tiffin only when there is no tiffin at all (null/undefined), but || gives a backup even when the tiffin is just empty (0 or \'\').',
      bn: '?. হলো একজন বুদ্ধিমান ডেলিভারি বয়ের মতো — ঠিকানাই না থাকলে সে পড়ে গিয়ে ব্যথা পায় না, শুধু বলে \'পাওয়া যায়নি\' (undefined)। ?? শুধু তখনই backup টিফিন দেয় যখন টিফিন একদমই নেই (null/undefined), কিন্তু || টিফিন খালি (0 বা \'\') হলেও backup দিয়ে দেয়।',
    },
    question: 'Optional chaining (?.) and nullish coalescing (??) — and ?? vs ||.',
    answer: 'Optional chaining (?.) safely accesses a property, array index or method call: if the value on the left is null or undefined, the expression short-circuits to undefined instead of throwing a TypeError. Nullish coalescing (??) returns the right-hand side only when the left side is null or undefined. || returns the right side for any falsy value, so it wrongly replaces valid values like 0, \'\' or false — use ?? for defaults when those values are meaningful.',
    points: [
      'obj?.prop, obj?.[key], fn?.() — short-circuit to undefined on null/undefined',
      'Prevents \'Cannot read properties of undefined\' errors',
      'a ?? b → b only if a is null or undefined',
      'a || b → b if a is any falsy value (0, \'\', false, NaN...)',
      '0 ?? 10 → 0, but 0 || 10 → 10',
      'Cannot mix ?? with || or && without parentheses (SyntaxError); ??= assigns only if nullish',
    ],
    code: `const user = { name: 'Ravi', address: null, settings: { volume: 0 } };

console.log(user.address?.city);         // undefined (no error)
console.log(user.getAge?.());            // undefined (method missing)

console.log(user.settings.volume || 50); // 50 (wrong, 0 is valid)
console.log(user.settings.volume ?? 50); // 0  (correct)
console.log(user.nickname ?? 'Guest');   // 'Guest'

user.theme ??= 'dark';
console.log(user.theme);                 // 'dark'`,
  },
  {
    id: 'jc-1',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: 'Debounce ek lift ke darwaze jaisa hai. Har baar koi naya aadmi aata hai to darwaza phir se ruk jaata hai, aur lift tabhi chalti hai jab thodi der tak koi naya nahi aata.',
      en: 'Debounce is like a lift door. Every time a new person walks in, the door waits again, and the lift moves only when nobody new comes for a little while.',
      bn: 'Debounce হলো লিফটের দরজার মতো। প্রতিবার নতুন কেউ ঢুকলে দরজা আবার অপেক্ষা করে, আর কিছুক্ষণ কেউ না এলে তবেই লিফট চলে।',
    },
    question: 'Implement debounce(fn, delay).',
    answer: 'Debounce delays calling fn until delay ms have passed since the LAST call. Each new call clears the pending timer with clearTimeout and starts a fresh setTimeout, so a burst of calls results in one execution with the latest arguments. It is used for search-as-you-type, window resize and auto-save.',
    points: [
      'Keep the timer id in a closure so every call can cancel the previous one',
      'Use a regular function plus fn.apply(this, args) to preserve `this` and arguments',
      'Trailing-edge by default; a leading option runs on the first call instead',
      'Production versions add cancel()/flush() and a maxWait (lodash.debounce)',
      'Debounce = wait for silence; throttle = at most once per interval',
    ],
    code: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // cancel the previous pending call
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const search = debounce((q) => console.log('search:', q), 300);
search('a');
search('ab');
search('abc');
// after 300 ms of silence → "search: abc" (logged only once)`,
  },
  {
    id: 'jc-2',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: 'Throttle school ki ghanti jaisa hai. Bachche kitna bhi shor machayein, ghanti sirf har period ke baad ek baar hi bajti hai.',
      en: 'Throttle is like the school bell. No matter how much noise the children make, the bell rings only once every period.',
      bn: 'Throttle হলো স্কুলের ঘণ্টার মতো। বাচ্চারা যতই হইচই করুক, ঘণ্টা প্রতি পিরিয়ডে একবারই বাজে।',
    },
    question: 'Implement throttle(fn, interval).',
    answer: 'Throttle guarantees fn runs at most once per interval, no matter how often it is called. The timestamp version stores the time of the last run and only calls fn when Date.now() - last >= interval; calls inside the window are dropped. It suits scroll, mousemove and resize handlers where you want regular updates, not just the final one.',
    points: [
      'Closure keeps `last` (or a timer flag) between calls',
      'Leading-edge timestamp version is simplest; a timer version can also fire a trailing call with the latest args',
      'Preserve `this` and arguments with fn.apply(this, args)',
      'Throttle gives steady execution during continuous events; debounce waits until events stop',
      'For animations, requestAnimationFrame is often a better throttle',
    ],
    code: `function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

const onScroll = throttle((n) => console.log('call', n), 100);
onScroll(1); // runs → "call 1"
onScroll(2); // ignored (inside the 100 ms window)
onScroll(3); // ignored
setTimeout(() => onScroll(4), 150); // runs → "call 4"`,
  },
  {
    id: 'jc-3',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: 'Map ek tiffin factory jaisa hai. Har dabba line mein aata hai, usme ek hi kaam hota hai (jaise sabzi daalna), aur ek nayi line ban jaati hai; purane dabbe waise hi rehte hain.',
      en: 'Map is like a tiffin factory. Each box comes down the line, the same job is done to it (like adding curry), and a new line of boxes comes out; the old boxes stay as they were.',
      bn: 'Map হলো টিফিন কারখানার মতো। প্রতিটা বাক্স লাইনে আসে, প্রত্যেকটায় একই কাজ হয় (যেমন তরকারি দেওয়া), আর নতুন এক লাইন বাক্স তৈরি হয়; পুরোনো বাক্সগুলো যেমন ছিল তেমনই থাকে।',
    },
    question: 'Write a polyfill for Array.prototype.map.',
    answer: 'Add a function to Array.prototype that creates a new array of the same length and fills each index with callback(element, index, array), called with the optional thisArg. A spec-like polyfill validates that callback is a function, uses Object(this) and length >>> 0 so it works on array-likes, and skips holes in sparse arrays. The original array is never mutated.',
    points: [
      'Callback receives (value, index, array); second parameter of map is thisArg',
      'Throw TypeError if callback is not a function',
      'Use `i in O` to skip holes, so [1, , 3] keeps its empty slot',
      'Must use a regular function (not arrow) so `this` is the array',
      'Real polyfills guard with if (!Array.prototype.map) and use Object.defineProperty to keep it non-enumerable',
    ],
    code: `Array.prototype.myMap = function (callback, thisArg) {
  if (this == null) throw new TypeError('myMap called on null or undefined');
  if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');
  const O = Object(this);
  const len = O.length >>> 0;
  const result = new Array(len);
  for (let i = 0; i < len; i++) {
    if (i in O) result[i] = callback.call(thisArg, O[i], i, O); // skip holes
  }
  return result;
};

console.log([1, 2, 3].myMap((x) => x * 2)); // [ 2, 4, 6 ]
console.log([1, , 3].myMap((x) => x * 10)); // [ 10, <1 empty item>, 30 ]
console.log(['a', 'b'].myMap(function (x, i) { return this.p + x + i; }, { p: '#' })); // [ '#a0', '#b1' ]`,
  },
  {
    id: 'jc-4',
    level: 'senior',
    topic: 'js-coding',
    difficulty: 'hard',
    simple: {
      hi: 'Promise.all ek cricket team ke bus jaisa hai. Bus tabhi chalti hai jab saare 11 khiladi aa jaayein, aur agar ek bhi khiladi mana kar de to trip cancel ho jaati hai.',
      en: 'Promise.all is like a cricket team bus. The bus leaves only when all 11 players have arrived, and if even one player says no, the trip is cancelled.',
      bn: 'Promise.all হলো ক্রিকেট টিমের বাসের মতো। ১১ জন খেলোয়াড় এলে তবেই বাস ছাড়ে, আর একজনও না বললে পুরো ট্রিপ বাতিল।',
    },
    question: 'Write a polyfill for Promise.all.',
    answer: 'Return a new Promise; wrap every input with Promise.resolve so plain values and thenables work, store each result at its original index, and resolve when a counter of pending items reaches zero. Reject immediately on the first rejection. An empty iterable resolves to [] right away.',
    points: [
      'Results keep input order, not completion order (index-based assignment)',
      'Use a counter, not results.length, because slots fill out of order',
      'Promise.resolve(item) handles non-promise values and thenables',
      'Fail-fast: first rejection rejects the whole thing; other promises still run (no cancellation)',
      'Accept any iterable (Array.from); empty input resolves to []',
      'Compare with allSettled (never rejects), race (first settled) and any (first fulfilled)',
    ],
    code: `function promiseAll(iterable) {
  return new Promise((resolve, reject) => {
    const items = Array.from(iterable);
    const results = new Array(items.length);
    let remaining = items.length;
    if (remaining === 0) return resolve(results);
    items.forEach((item, i) => {
      Promise.resolve(item).then((value) => {
        results[i] = value; // keep input order, not finish order
        if (--remaining === 0) resolve(results);
      }, reject); // first rejection wins
    });
  });
}

const wait = (v, ms) => new Promise((r) => setTimeout(() => r(v), ms));
promiseAll([wait('a', 50), 42, wait('c', 10)]).then(console.log); // [ 'a', 42, 'c' ]
promiseAll([wait(1, 10), Promise.reject(new Error('boom'))])
  .catch((e) => console.log(e.message)); // boom
promiseAll([]).then(console.log); // []`,
  },
  {
    id: 'jc-5',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'hard',
    simple: {
      hi: 'Deep clone apne school project ki poori photocopy banane jaisa hai, har page aur har chipka hua photo bhi. Agar ek page doosre page ka reference deta hai, to copy mein bhi wahi naya page refer hota hai.',
      en: 'Deep clone is like photocopying your whole school project, every page and every pasted photo too. If one page points to another page, the copy points to the new copied page.',
      bn: 'Deep clone হলো তোমার স্কুল প্রোজেক্টের পুরো ফটোকপি করার মতো, প্রতিটা পাতা আর সাঁটানো ছবিও। এক পাতা অন্য পাতার কথা বললে, কপিতেও সেটা নতুন কপি করা পাতাকেই বোঝায়।',
    },
    question: 'Implement a deep clone function (handle arrays, objects, Date, circular references).',
    answer: 'Recursively copy: return primitives as-is, create a new Date for dates, and create a new array or object for everything else, copying each own key by calling deepClone again. To handle circular references keep a WeakMap from original to copy; register the copy before recursing, and if an object is seen again return the stored copy. In modern code, structuredClone() does this natively.',
    points: [
      'Primitives (and functions) are returned as-is',
      'WeakMap of original -> copy breaks infinite recursion on cycles and preserves shared references',
      'Set the WeakMap entry BEFORE recursing into children',
      'Special-case Date (and Map, Set, RegExp if needed)',
      'JSON.parse(JSON.stringify(x)) loses Date, undefined, functions and throws on cycles',
      'structuredClone() handles Date, Map, Set and cycles but not functions or DOM nodes',
    ],
    code: `function deepClone(value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') return value; // primitives, functions
  if (value instanceof Date) return new Date(value.getTime());
  if (seen.has(value)) return seen.get(value); // circular reference
  const copy = Array.isArray(value) ? [] : Object.create(Object.getPrototypeOf(value));
  seen.set(value, copy); // register BEFORE recursing
  for (const key of Reflect.ownKeys(value)) {
    copy[key] = deepClone(value[key], seen);
  }
  return copy;
}

const a = { n: 1, d: new Date(0), list: [1, { x: 2 }] };
a.self = a;
const b = deepClone(a);
console.log(b.list[1] !== a.list[1]); // true (new nested object)
console.log(b.d instanceof Date, b.d !== a.d); // true true
console.log(b.self === b); // true (cycle preserved)`,
  },
  {
    id: 'jc-6',
    level: 'junior',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'Flatten karna matryoshka ya dabbe ke andar dabbe kholne jaisa hai. Tum har dabba kholte jaate ho aur saari toffees ek hi plate mein rakh dete ho.',
      en: 'Flattening is like opening boxes inside boxes. You keep opening every box and put all the toffees on one single plate.',
      bn: 'Flatten করা হলো বাক্সের ভেতরে বাক্স খোলার মতো। তুমি প্রতিটা বাক্স খুলতে থাকো আর সব টফি একটাই প্লেটে রাখো।',
    },
    question: 'Flatten a nested array without using .flat().',
    answer: 'Loop over the array; if an item is an array (Array.isArray), recursively flatten it and push its items, otherwise push the item itself. A depth parameter lets you mimic .flat(depth). An iterative version uses a stack to avoid recursion limits on very deep nesting.',
    points: [
      'Use Array.isArray, not typeof (typeof [] is "object")',
      'Recursion with depth - 1 mimics .flat(depth); default Infinity flattens fully',
      'Stack-based version avoids call-stack overflow for very deep arrays',
      'Time O(n) over total elements, extra space O(n)',
      'reduce + concat is another common one-liner',
    ],
    code: `// Recursive, with optional depth (like .flat(depth))
function flatten(arr, depth = Infinity) {
  const result = [];
  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) result.push(...flatten(item, depth - 1));
    else result.push(item);
  }
  return result;
}

// Iterative with a stack (no recursion limit)
function flattenIterative(arr) {
  const stack = [...arr];
  const result = [];
  while (stack.length) {
    const item = stack.pop();
    if (Array.isArray(item)) stack.push(...item);
    else result.push(item);
  }
  return result.reverse();
}

console.log(flatten([1, [2, [3, [4]], 5]])); // [ 1, 2, 3, 4, 5 ]
console.log(flatten([1, [2, [3, [4]]]], 1)); // [ 1, 2, [ 3, [ 4 ] ] ]
console.log(flattenIterative([1, [2, [3, [4]], 5]])); // [ 1, 2, 3, 4, 5 ]`,
  },
  {
    id: 'jc-7',
    level: 'fresher',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'Palindrome ek aisa shabd hai jo aage se aur peeche se ek jaisa padha jaata hai, jaise "madam" ya "naman". Do dost shabd ke dono kinaron se ek-ek letter milate hue beech tak aate hain.',
      en: 'A palindrome reads the same from the front and the back, like "madam" or "naman". Two friends start at both ends of the word and match letters one by one until they meet in the middle.',
      bn: 'Palindrome এমন শব্দ যা সামনে থেকে আর পেছন থেকে একই পড়া যায়, যেমন "madam" বা "naman"। দুই বন্ধু শব্দের দুই প্রান্ত থেকে একটা একটা অক্ষর মিলিয়ে মাঝখান পর্যন্ত আসে।',
    },
    question: 'Reverse a string and check if it is a palindrome.',
    answer: 'Reverse with [...str].reverse().join(\'\') (spread splits by code point, so emoji survive better than split(\'\')). For a palindrome, normalise the string (lowercase, remove non-alphanumerics) and compare characters with two pointers from both ends, which is O(n) time and O(1) extra space. Comparing with the reversed string also works but uses O(n) extra space.',
    points: [
      'Strings are immutable, so reversing builds a new string',
      'split(\'\') breaks emoji/surrogate pairs; [...str] or Array.from is safer',
      'Normalise case and strip punctuation for sentence palindromes',
      'Two pointers: O(n) time, O(1) extra space, exits early on mismatch',
    ],
    code: `const reverse = (str) => [...str].reverse().join(''); // spread is Unicode-safe

function isPalindrome(str) {
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let i = 0;
  let j = clean.length - 1;
  while (i < j) {
    if (clean[i++] !== clean[j--]) return false;
  }
  return true;
}

console.log(reverse('hello')); // olleh
console.log(isPalindrome('madam')); // true
console.log(isPalindrome('A man, a plan, a canal: Panama')); // true
console.log(isPalindrome('hello')); // false`,
  },
  {
    id: 'jc-8',
    level: 'fresher',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'Duplicate hatana class ki attendance jaisa hai. Agar ek bachche ka naam do baar likha hai, to register mein usse sirf ek baar hi rakha jaata hai.',
      en: 'Removing duplicates is like class attendance. If a child\'s name is written twice, the register keeps it only once.',
      bn: 'Duplicate সরানো হলো ক্লাসের হাজিরার মতো। কোনো বাচ্চার নাম দুবার লেখা থাকলে রেজিস্টারে সেটা একবারই রাখা হয়।',
    },
    question: 'Remove duplicates from an array (show 2 ways).',
    answer: 'The simplest way is [...new Set(arr)], since a Set stores only unique values and keeps insertion order; it runs in O(n). A second way is arr.filter((x, i) => arr.indexOf(x) === i), which keeps only the first occurrence but is O(n²). For arrays of objects, dedupe by a key using a Set of seen keys or a Map.',
    points: [
      'Set uses SameValueZero: NaN is de-duplicated, but objects are compared by reference',
      'filter + indexOf is O(n²) and cannot find NaN (indexOf uses ===)',
      'reduce with includes is another option, also O(n²)',
      'For objects, dedupe by a key (id) with a Set or Map',
      'Both approaches preserve the order of first occurrence',
    ],
    code: `const nums = [1, 2, 2, 3, 1, 4];

// Way 1: Set (O(n))
console.log([...new Set(nums)]); // [ 1, 2, 3, 4 ]

// Way 2: filter + indexOf (O(n^2), keeps first occurrence)
console.log(nums.filter((n, i) => nums.indexOf(n) === i)); // [ 1, 2, 3, 4 ]

// Bonus: objects, unique by a key (keeps first occurrence)
const users = [{ id: 1, n: 'A' }, { id: 2, n: 'B' }, { id: 1, n: 'C' }];
const seen = new Set();
console.log(users.filter((u) => !seen.has(u.id) && seen.add(u.id)));
// [ { id: 1, n: 'A' }, { id: 2, n: 'B' } ]`,
  },
  {
    id: 'jc-9',
    level: 'fresher',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'Ye cricket match mein har player ke runs ginne jaisa hai. Har ball par us player ke khaate mein run jodte jao, aur aakhir mein sabse zyada runs wala man of the match.',
      en: 'This is like counting each player\'s runs in a cricket match. Add a run to the player\'s score on every ball, and at the end the one with the most runs is man of the match.',
      bn: 'এটা ক্রিকেট ম্যাচে প্রত্যেক খেলোয়াড়ের রান গোনার মতো। প্রতি বলে সেই খেলোয়াড়ের খাতায় রান যোগ করো, আর শেষে সবচেয়ে বেশি রান যার, সেই ম্যান অফ দ্য ম্যাচ।',
    },
    question: 'Count the frequency of each character in a string and find the most frequent one.',
    answer: 'Loop through the string once and keep a count per character in a Map (or object): freq.set(ch, (freq.get(ch) || 0) + 1). Then loop over the entries and track the character with the highest count. Both passes are O(n) time, and space is O(k) for k distinct characters.',
    points: [
      'for...of iterates by code point, so emoji count as one character',
      'Map keeps insertion order for all keys; plain objects put integer-like keys ("1", "2") first',
      'Decide tie-breaking (here: first seen wins because of strict >)',
      'Normalise case / ignore spaces if the question asks for it',
      'O(n) time, O(k) space',
    ],
    code: `function charFrequency(str) {
  const freq = new Map(); // Map keeps insertion order for every key
  for (const ch of str) freq.set(ch, (freq.get(ch) || 0) + 1);
  return freq;
}

function mostFrequent(str) {
  let best = null;
  let max = 0;
  for (const [ch, count] of charFrequency(str)) {
    if (count > max) { max = count; best = ch; } // ties → first seen wins
  }
  return { char: best, count: max };
}

console.log(charFrequency('banana')); // Map(3) { 'b' => 1, 'a' => 3, 'n' => 2 }
console.log(mostFrequent('banana')); // { char: 'a', count: 3 }
console.log(mostFrequent('javascript')); // { char: 'a', count: 2 }`,
  },
  {
    id: 'jc-10',
    level: 'senior',
    topic: 'js-coding',
    difficulty: 'hard',
    simple: {
      hi: 'Bind ek tiffin par naam ki sticker lagane jaisa hai. Ab ye tiffin hamesha usi bachche ka hai, chahe koi bhi use class mein le jaaye.',
      en: 'Bind is like sticking a name label on a tiffin box. Now the tiffin always belongs to that child, no matter who carries it to class.',
      bn: 'Bind হলো টিফিন বাক্সে নামের স্টিকার লাগানোর মতো। এখন টিফিনটা সবসময় সেই বাচ্চারই, যে-ই সেটা ক্লাসে নিয়ে যাক।',
    },
    question: 'Write a polyfill for Function.prototype.bind.',
    answer: 'myBind returns a new function that, when called, invokes the original with the fixed thisArg and the pre-filled arguments followed by the new ones (partial application). A correct polyfill also supports `new`: if the bound function is called as a constructor, `this instanceof bound` is true, so the newly created object is used instead of thisArg. Setting bound.prototype to Object.create(fn.prototype) keeps instanceof working.',
    points: [
      'Store `this` (the original function) in a variable; throw TypeError if it is not callable',
      'Merge arguments: [...boundArgs, ...callArgs]',
      'With `new`, the bound thisArg is ignored and a new object is created',
      'Link prototypes so `new Bound() instanceof Original` is true',
      'Native bind also sets name ("bound greet") and length, and has no prototype property',
      'bind returns a function; call/apply invoke immediately',
    ],
    code: `Function.prototype.myBind = function (thisArg, ...boundArgs) {
  if (typeof this !== 'function') throw new TypeError('myBind must be called on a function');
  const fn = this;
  function bound(...args) {
    const isNew = this instanceof bound; // called with \`new\`? then ignore thisArg
    return fn.apply(isNew ? this : thisArg, [...boundArgs, ...args]);
  }
  if (fn.prototype) bound.prototype = Object.create(fn.prototype);
  return bound;
};

const user = { name: 'Asha' };
function greet(greeting, punct) { return \`\${greeting}, \${this.name}\${punct}\`; }
const hi = greet.myBind(user, 'Hi'); // partial application
console.log(hi('!')); // Hi, Asha!

function Point(x, y) { this.x = x; this.y = y; }
const P = Point.myBind(null, 1);
const p = new P(2);
console.log(p.x, p.y, p instanceof Point); // 1 2 true`,
  },
  {
    id: 'jc-11',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: 'Curry ek dosa counter jaisa hai jahan order teen hisson mein dete ho: pehle dosa, phir chutney, phir sambar. Jab teeno mil jaate hain tabhi plate milti hai, chahe tum ek saath bolo ya ek-ek karke.',
      en: 'Curry is like a dosa counter where your order has three parts: dosa, chutney, sambar. You get the plate only when all three are given, whether you say them together or one by one.',
      bn: 'Curry হলো দোসার কাউন্টারের মতো, যেখানে অর্ডারের তিনটে অংশ: দোসা, চাটনি, সাম্বার। তিনটেই বলা হলে তবেই প্লেট মেলে, একসঙ্গে বলো বা একটা একটা করে।',
    },
    question: 'Implement curry so that sum(1)(2)(3) and sum(1, 2)(3) both return 6.',
    answer: 'curry(fn) returns a function that collects arguments; when the collected count reaches fn.length (the number of declared parameters) it calls fn, otherwise it returns another function that remembers the arguments so far via closure. Because each step accepts any number of arguments, sum(1)(2)(3), sum(1, 2)(3) and sum(1, 2, 3) all give 6.',
    points: [
      'Relies on closures to remember previously supplied arguments',
      'fn.length gives the arity; it ignores default and rest parameters, so pass arity explicitly for those',
      'Each call can accept one or many arguments',
      'Infinite currying (sum(1)(2)(3)() ) needs an empty call or valueOf/toString to end',
      'Useful for partial application and reusable helpers',
    ],
    code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args); // enough args → call
    return (...next) => curried.apply(this, [...args, ...next]); // else collect more
  };
}

const sum = curry((a, b, c) => a + b + c);
console.log(sum(1)(2)(3)); // 6
console.log(sum(1, 2)(3)); // 6
console.log(sum(1)(2, 3)); // 6
console.log(sum(1, 2, 3)); // 6`,
  },
  {
    id: 'jc-12',
    level: 'junior',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'var wala loop ek hi blackboard jaisa hai jispe teacher number mitaakar badalti rehti hai; baad mein sab bachche dekhte hain to sabko aakhri number 3 dikhta hai. let mein har bachche ko apni alag slate milti hai, isliye 0, 1, 2 dikhta hai.',
      en: 'The var loop is like one blackboard where the teacher keeps erasing and changing the number; when the children look later, they all see the last number, 3. With let, each child gets their own slate, so they see 0, 1, 2.',
      bn: 'var-এর loop একটাই ব্ল্যাকবোর্ডের মতো, যেখানে টিচার সংখ্যা মুছে মুছে বদলান; পরে সব বাচ্চা দেখলে শেষ সংখ্যা 3-ই দেখে। let-এ প্রত্যেক বাচ্চা নিজের আলাদা স্লেট পায়, তাই 0, 1, 2 দেখে।',
    },
    question: 'Output question: for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)) — and with let.',
    answer: 'With var the output is 3, 3, 3; with let it is 0, 1, 2. var is function-scoped, so all three callbacks close over the same i, which is already 3 when the timers run after the loop finishes. let creates a new binding for every iteration, so each callback captures its own value. Full output of the snippet: var: 3 ×3, then let: 0, let: 1, let: 2, then iife: 0, 1, 2.',
    points: [
      'setTimeout callbacks run after the synchronous loop has finished',
      'var: one shared binding → 3 3 3',
      'let: fresh binding per iteration → 0 1 2',
      'Pre-ES6 fix: IIFE or setTimeout(fn, 0, i) to capture the current value',
      'This is a closure + event loop question',
    ],
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var:', i));
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let:', j));
}

// Fix for var without let: capture the value with an IIFE
for (var k = 0; k < 3; k++) {
  ((k) => setTimeout(() => console.log('iife:', k)))(k);
}`,
  },
  {
    id: 'jc-13',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: 'Socho railway ticket counter: pehle line mein khade log (sync code) ticket lete hain, phir VIP/urgent wale (microtasks: promise, await), aur sabse aakhir mein jo baad mein aane ka token lekar gaye the (setTimeout).',
      en: 'Think of a railway ticket counter: first the people already in the line (sync code) are served, then the urgent ones (microtasks: promise, await), and last the people who took a "come back later" token (setTimeout).',
      bn: 'রেলের টিকিট কাউন্টারের কথা ভাবো: আগে লাইনে দাঁড়ানো লোকেরা (sync code) টিকিট পায়, তারপর জরুরি লোকেরা (microtasks: promise, await), আর সবার শেষে যারা "পরে এসো" টোকেন নিয়েছিল (setTimeout)।',
    },
    diagram: 'event-loop',
    question: 'Output question: order of console.log, setTimeout, Promise.then and async/await.',
    answer: 'Output: 1: start, 4: async fn (sync part), 6: end, 3: promise.then, 5: after await, 2: setTimeout. Synchronous code runs first, including the body of an async function up to its first await. Then the microtask queue is drained in the order tasks were queued (the .then callback, then the continuation after await). Only after that does the event loop pick the setTimeout macrotask.',
    points: [
      'Call stack (sync code) → all microtasks → next macrotask',
      'An async function runs synchronously until its first await',
      'Code after await is queued as a microtask, like .then',
      'Promise callbacks and queueMicrotask are microtasks; setTimeout/setInterval are macrotasks',
      'setTimeout(fn, 0) is never before already-queued microtasks',
    ],
    code: `console.log('1: start');

setTimeout(() => console.log('2: setTimeout'), 0);

Promise.resolve().then(() => console.log('3: promise.then'));

async function run() {
  console.log('4: async fn (sync part)');
  await null;
  console.log('5: after await');
}
run();

console.log('6: end');`,
  },
  {
    id: 'jc-14',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: '`this` matlab "abhi kaun bula raha hai". Jab monitor class ke andar "mera naam" bolta hai to class samajh jaati hai; agar wahi line baahar sadak par bolo bina bataaye ki kis class se ho, to koi nahi samjhega. Arrow function hamesha apne ghar wala naam hi yaad rakhta hai.',
      en: '`this` means "who is calling right now". When the class monitor says "my name" inside the class, everyone understands; say the same line on the street without saying which class you belong to, and nobody knows. An arrow function always remembers the name from where it was created.',
      bn: '`this` মানে "এখন কে ডাকছে"। ক্লাস মনিটর ক্লাসের ভেতরে "আমার নাম" বললে সবাই বোঝে; রাস্তায় কোন ক্লাসের না বলে একই কথা বললে কেউ বোঝে না। Arrow function সবসময় যেখানে তৈরি হয়েছে সেখানকার নামটাই মনে রাখে।',
    },
    question: 'Output question: `this` inside an object method vs an arrow function vs a detached method.',
    answer: 'Output: Ravi, false, Ravi, TypeError: Cannot read properties of undefined (reading \'name\'), Priya, Ravi. A regular method gets `this` from how it is called (user.regular() → user). An arrow function has no own `this`; it uses the enclosing scope\'s this, so the arrow property is not user, while an arrow inside a method inherits the method\'s this. A detached method called as a plain function has this === undefined in strict mode (globalThis in sloppy mode), so reading .name throws; call/apply/bind fix it.',
    points: [
      'Regular function: `this` = object left of the dot at call time',
      'Arrow function: lexical `this`, cannot be changed by call/apply/bind',
      'Do not use arrows as object methods if you need the object',
      'Detached method (const f = obj.m; f()) loses `this`; same bug with callbacks like setTimeout(obj.m)',
      'Strict mode → undefined (TypeError); sloppy mode → globalThis (usually undefined property)',
      'Fix with bind, call/apply, or wrap: () => obj.m()',
    ],
    code: `'use strict';
const user = {
  name: 'Ravi',
  regular() { return this.name; },
  arrow: () => this, // \`this\` of the surrounding scope, NOT user
  nested() { return [1].map(() => this.name)[0]; }, // arrow inherits method's this
};

console.log(user.regular()); // Ravi
console.log(user.arrow() === user); // false
console.log(user.nested()); // Ravi

const detached = user.regular;
try {
  console.log(detached());
} catch (e) {
  console.log(e.constructor.name + ': ' + e.message);
}
console.log(detached.call({ name: 'Priya' })); // Priya
console.log(user.regular.bind(user)()); // Ravi`,
  },
  {
    id: 'jc-15',
    level: 'junior',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: 'Hoisting school ke roll call jaisa hai. Register mein sabka naam pehle se likha hai (var), par jo abhi tak class mein nahi aaya uske aage "undefined" hai; let wale bachche gate par khade hain, unko naam bulane par "abhi andar nahi aa sakte" error milta hai.',
      en: 'Hoisting is like a school roll call. Everyone\'s name is already in the register (var), but those who have not arrived show "undefined"; let students are waiting at the gate, so calling them gives an "not allowed in yet" error.',
      bn: 'Hoisting হলো স্কুলের রোল কলের মতো। রেজিস্টারে সবার নাম আগে থেকেই লেখা (var), কিন্তু যারা এখনও আসেনি তাদের পাশে "undefined"; let-এর বাচ্চারা গেটে দাঁড়িয়ে, তাদের ডাকলে "এখনও ঢোকা যাবে না" error আসে।',
    },
    question: 'Output question: a hoisting puzzle with var, let and function declarations.',
    answer: 'Output: undefined, function, hello, ReferenceError: Cannot access \'b\' before initialization, TypeError: bar is not a function. var declarations are hoisted and initialised to undefined; function declarations are hoisted with their body, so foo can be called early. let/const are hoisted but stay in the Temporal Dead Zone until their line runs, so reading b throws ReferenceError. bar is a var holding a function expression, so it is undefined at that point and calling it is a TypeError.',
    points: [
      'var: hoisted + initialised to undefined',
      'Function declaration: hoisted fully (name and body)',
      'let/const/class: hoisted but in TDZ → ReferenceError',
      'Function expression assigned to var: only the variable is hoisted → TypeError when called',
      'Hoisting happens per scope during the creation phase',
    ],
    code: `console.log(a);          // ?
console.log(typeof foo); // ?
console.log(foo());      // ?
try { console.log(b); } catch (e) { console.log(e.name + ': ' + e.message); }
try { bar(); } catch (e) { console.log(e.name + ': ' + e.message); }

var a = 1;
let b = 2;
function foo() { return 'hello'; }
var bar = function () { return 'bar'; };`,
  },
  {
    id: 'jc-16',
    level: 'mid',
    topic: 'js-coding',
    difficulty: 'medium',
    simple: {
      hi: 'Memoize ek student ki rough copy jaisa hai. Ek baar 17 × 23 ka jawab nikal liya to copy mein likh liya; agli baar wahi sawaal aaye to seedha copy se padh lo, dobara calculate nahi karna.',
      en: 'Memoize is like a student\'s rough notebook. Once you work out 17 × 23, you write the answer down; next time the same sum comes, you just read it from the notebook instead of calculating again.',
      bn: 'Memoize হলো ছাত্রের রাফ খাতার মতো। একবার 17 × 23-এর উত্তর বের করলে খাতায় লিখে রাখো; পরের বার একই অঙ্ক এলে খাতা থেকে পড়ে নাও, আবার হিসেব করতে হয় না।',
    },
    question: 'Implement memoize(fn) for functions with primitive arguments.',
    answer: 'memoize returns a wrapper with a private Map cache in its closure. On each call it builds a key from the arguments (the value itself for one argument, JSON.stringify(args) for several), returns the cached result if present, otherwise calls fn, stores the result and returns it. It only makes sense for pure functions, and turns recursive problems like fib(50) from exponential to linear time.',
    points: [
      'Cache lives in a closure; Map keys keep 1 and "1" distinct for single arguments',
      'Use cache.has(key), not a truthy check, so results like 0 or undefined are cached',
      'JSON.stringify turns undefined/NaN into null, so keys can collide; fine for simple primitives',
      'Only for pure functions (same input → same output, no side effects)',
      'Unbounded cache can leak memory; use an LRU or size limit in production',
      'Recursive calls must go through the memoized function (fib calls fib)',
    ],
    code: `function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = args.length === 1 ? args[0] : JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

let calls = 0;
const square = memoize((n) => { calls++; return n * n; });
console.log(square(9), square(9), calls); // 81 81 1

const add = memoize((a, b) => a + b);
console.log(add(2, 3), add(2, 3)); // 5 5

const fib = memoize((n) => (n < 2 ? n : fib(n - 1) + fib(n - 2)));
console.log(fib(50)); // 12586269025 (instant; naive version takes minutes)`,
  },
  {
    id: 'jc-17',
    level: 'fresher',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'Socho tumhare paas 9 rupaye ka chocolate lena hai aur jeb mein alag-alag sikke hain. Har sikka nikalte hi tum sochte ho "isko 9 banane ke liye kitna chahiye?" aur notebook mein dekhte ho ki wo sikka pehle mila tha ya nahi.',
      en: 'Imagine you need exactly 9 rupees for a chocolate and have different coins in your pocket. Each time you take out a coin you ask "how much more do I need to make 9?" and check your notebook to see if you already found that coin.',
      bn: 'ভাবো 9 টাকার চকলেট কিনতে হবে আর পকেটে নানা রকম কয়েন। প্রতিটা কয়েন বের করেই ভাবো "9 করতে আর কত লাগবে?" আর খাতায় দেখো সেই কয়েনটা আগে পেয়েছিলে কি না।',
    },
    question: 'Two-sum: find two numbers in an array that add up to a target (O(n)).',
    answer: 'Walk the array once with a Map from value to index. For each number compute need = target - num; if need is already in the Map, return [map.get(need), i], otherwise store the current number and index. This is O(n) time and O(n) space, compared with O(n²) for the nested-loop brute force.',
    points: [
      'Brute force: two nested loops, O(n²)',
      'Hash map: one pass, O(n) time, O(n) space',
      'Check before inserting so the same element is not used twice ([3, 3] still works)',
      'If the array is sorted, two pointers give O(n) time and O(1) space',
      'Clarify: return indices or values, and what to return if no pair exists',
    ],
    code: `function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i); // store AFTER checking, so an element isn't used twice
  }
  return []; // no pair
}

console.log(twoSum([2, 7, 11, 15], 9)); // [ 0, 1 ]
console.log(twoSum([3, 2, 4], 6)); // [ 1, 2 ]
console.log(twoSum([3, 3], 6)); // [ 0, 1 ]
console.log(twoSum([1, 2], 10)); // []`,
  },
  {
    id: 'jc-18',
    level: 'junior',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'Ye school ke sports day jaisa hai jahan bachchon ko unke house ke hisaab se line mein lagaya jaata hai: Red house ek line, Blue house doosri line. Har bachcha aata hai aur apne house ki line mein khada ho jaata hai.',
      en: 'This is like sports day at school, where children line up by their house: Red house in one line, Blue house in another. Each child arrives and joins the line of their own house.',
      bn: 'এটা স্কুলের স্পোর্টস ডে-র মতো, যেখানে বাচ্চারা নিজেদের হাউস অনুযায়ী লাইনে দাঁড়ায়: Red হাউস এক লাইনে, Blue হাউস আরেক লাইনে। প্রত্যেক বাচ্চা এসে নিজের হাউসের লাইনে দাঁড়ায়।',
    },
    question: 'Group an array of objects by a property using reduce.',
    answer: 'Use reduce with an empty object as the accumulator: for each item read its key (item[key] or a key function), create an empty array for that key if missing, push the item, and return the accumulator. The result maps each key to the list of matching items. ES2024 also adds the built-in Object.groupBy(array, callback) (and Map.groupBy).',
    points: [
      'Initial accumulator {} is essential; always return acc',
      '(acc[k] ||= []).push(item) creates the bucket on first use',
      'Supporting a callback key makes it flexible (e.g. group by age range)',
      'Object.groupBy returns a null-prototype object; Map.groupBy allows non-string keys',
      'O(n) time',
    ],
    code: `const employees = [
  { name: 'Amit', dept: 'IT' },
  { name: 'Neha', dept: 'HR' },
  { name: 'Ravi', dept: 'IT' },
];

const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    const k = typeof key === 'function' ? key(item) : item[key];
    (acc[k] ||= []).push(item);
    return acc;
  }, {});

console.log(groupBy(employees, 'dept'));
// { IT: [ { name: 'Amit', dept: 'IT' }, { name: 'Ravi', dept: 'IT' } ], HR: [ { name: 'Neha', dept: 'HR' } ] }

// Built-in since ES2024 (returns a null-prototype object):
console.log(Object.groupBy(employees, (e) => e.dept).IT.length); // 2`,
  },
  {
    id: 'jc-19',
    level: 'senior',
    topic: 'js-coding',
    difficulty: 'hard',
    simple: {
      hi: 'EventEmitter ek school ke WhatsApp group jaisa hai. Jo parents join (on) karte hain unhe har message (emit) milta hai, koi group chhod (off) sakta hai, aur kuch log sirf ek message ke liye judte hain aur phir khud nikal jaate hain (once).',
      en: 'An EventEmitter is like a school WhatsApp group. Parents who join (on) get every message (emit), anyone can leave (off), and some join for just one message and then leave by themselves (once).',
      bn: 'EventEmitter হলো স্কুলের WhatsApp গ্রুপের মতো। যে অভিভাবকরা যোগ দেন (on) তাঁরা প্রতিটা মেসেজ (emit) পান, যে কেউ গ্রুপ ছাড়তে পারেন (off), আর কেউ কেউ শুধু একটা মেসেজের জন্য যোগ দিয়ে নিজেই বেরিয়ে যান (once)।',
    },
    question: 'Implement an EventEmitter with on, off, once and emit.',
    answer: 'Keep a Map from event name to an array of listeners. on pushes a listener, off filters it out, emit calls every listener with the arguments, and once registers a wrapper that removes itself before calling the real listener. Store the original function on the wrapper so off(name, fn) can also remove a once-listener, and iterate over a copy in emit so listeners that unsubscribe during emit do not break the loop.',
    points: [
      'Map<string, Function[]> registry; private field (#events) hides internals',
      'Return this from on/off/once for chaining',
      'once = self-removing wrapper; keep wrapper.original for off()',
      'emit iterates a copy of the listener array and returns whether anyone listened',
      'Extras: error handling per listener, max-listener warnings, removeAllListeners',
      'This is the observer / pub-sub pattern behind Node\'s EventEmitter and DOM events',
    ],
    code: `class EventEmitter {
  #events = new Map(); // eventName -> array of listeners
  on(name, fn) {
    if (!this.#events.has(name)) this.#events.set(name, []);
    this.#events.get(name).push(fn);
    return this; // allow chaining
  }
  off(name, fn) {
    const list = this.#events.get(name) || [];
    this.#events.set(name, list.filter((l) => l !== fn && l.original !== fn));
    return this;
  }
  once(name, fn) {
    const wrapper = (...args) => { this.off(name, wrapper); fn.apply(this, args); };
    wrapper.original = fn; // lets off(name, fn) remove a once-listener too
    return this.on(name, wrapper);
  }
  emit(name, ...args) {
    const list = this.#events.get(name);
    if (!list?.length) return false;
    [...list].forEach((l) => l.apply(this, args)); // copy: listeners may unsubscribe
    return true;
  }
}
const bus = new EventEmitter(), hello = (n) => console.log('hello', n);
bus.on('greet', hello).once('greet', (n) => console.log('once', n));
bus.emit('greet', 'Asha'); bus.emit('greet', 'Ravi'); // hello Asha, once Asha, hello Ravi
console.log(bus.off('greet', hello).emit('greet', 'Zoya')); // false`,
  },
  {
    id: 'jc-20',
    level: 'junior',
    topic: 'js-coding',
    difficulty: 'easy',
    simple: {
      hi: 'Chunk karna cricket ke overs jaisa hai: har over mein 6 ball. 20 balls ho to 3 poore over bante hain aur aakhri over mein bachi hui 2 ball.',
      en: 'Chunking is like overs in cricket: 6 balls in every over. With 20 balls you get 3 full overs and a last over with the 2 leftover balls.',
      bn: 'Chunk করা হলো ক্রিকেটের ওভারের মতো: প্রতি ওভারে 6টা বল। 20টা বল হলে 3টে পুরো ওভার আর শেষ ওভারে বাকি 2টো বল।',
    },
    question: 'Split an array into chunks of size n.',
    answer: 'Loop from 0 to the array length in steps of size and push arr.slice(i, i + size) into a result array. slice never goes out of bounds, so the last chunk simply contains the leftover items. Validate that size is a positive integer, otherwise the loop would never end.',
    points: [
      'Step the index by size: i += size',
      'slice(i, i + size) handles the last partial chunk automatically',
      'Guard against size <= 0 or non-integers (infinite loop)',
      'Does not mutate the input (splice-based versions do)',
      'O(n) time; Array.from({ length: Math.ceil(len / n) }) is a one-liner alternative',
    ],
    code: `function chunk(arr, size) {
  if (!Number.isInteger(size) || size < 1) throw new RangeError('size must be a positive integer');
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

console.log(chunk([1, 2, 3, 4, 5], 2)); // [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]
console.log(chunk([1, 2, 3], 5)); // [ [ 1, 2, 3 ] ]
console.log(chunk([], 3)); // []

// One-liner alternative
const chunk2 = (arr, n) =>
  Array.from({ length: Math.ceil(arr.length / n) }, (_, i) => arr.slice(i * n, i * n + n));
console.log(chunk2([1, 2, 3, 4, 5], 2)); // [ [ 1, 2 ], [ 3, 4 ], [ 5 ] ]`,
  },
  {
    id: 'jd-1',
    level: 'fresher',
    topic: 'js-dom',
    difficulty: 'easy',
    simple: {
      hi: 'DOM ek ghar ke family tree jaisa hai. Dadaji (document) sabse upar, unke neeche bachche (elements), aur JavaScript is tree mein kisi ko bhi badal sakta hai, jaise naya member jodna ya naam badalna.',
      en: 'The DOM is like a family tree of the web page. Grandfather (document) is at the top, the children (elements) are below, and JavaScript can change anyone in the tree, like adding a new member or changing a name.',
      bn: 'DOM হলো ওয়েব পেজের একটা বংশতালিকার (family tree) মতো। দাদু (document) সবার উপরে, নিচে ছেলেমেয়েরা (elements), আর JavaScript এই tree-তে যে কাউকে বদলাতে পারে, যেমন নতুন সদস্য যোগ করা বা নাম বদলানো।',
    },
    question: 'What is the DOM?',
    answer: 'The DOM (Document Object Model) is a tree of objects (nodes) that the browser builds from an HTML document, with document at the root and elements, text and comments as nodes. It is a Web API, not part of the JavaScript language, that lets scripts read and change the page\'s structure, content and styles and react to events. Changing the DOM updates what the user sees, which is why frameworks like Angular manage DOM updates efficiently.',
    points: [
      'DOM = live, in-memory tree representation of the page',
      'Built by the browser by parsing HTML; it can differ from the original source (scripts, error fixes)',
      'APIs: querySelector, createElement, append, remove, classList, textContent, addEventListener',
      'Node types: Document, Element, Text, Comment; children vs childNodes',
      'DOM updates can trigger layout and paint, so batch changes',
    ],
    code: `const title = document.querySelector('h1');
title.textContent = 'Welcome to Chai Point';

const li = document.createElement('li');
li.textContent = 'Masala Chai';
li.classList.add('item');
document.querySelector('#menu').append(li);

console.log(document.querySelectorAll('#menu li').length);`,
  },
  {
    id: 'jd-2',
    level: 'junior',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'Capturing aise hai jaise principal ka order upar se neeche aata hai: principal, teacher, phir student. Bubbling ulta hai: student ki shikayat neeche se upar jaati hai. stopPropagation matlab teacher ne baat wahi rok di, aage principal tak nahi gayi.',
      en: 'Capturing is like an order from the principal coming down: principal, then teacher, then student. Bubbling is the opposite: a student\'s complaint goes up from the bottom. stopPropagation means the teacher stops it right there, so it never reaches the principal.',
      bn: 'Capturing হলো প্রিন্সিপালের আদেশ উপর থেকে নিচে আসার মতো: প্রিন্সিপাল, টিচার, তারপর ছাত্র। Bubbling উল্টো: ছাত্রের নালিশ নিচ থেকে উপরে যায়। stopPropagation মানে টিচার সেখানেই থামিয়ে দিল, প্রিন্সিপাল পর্যন্ত গেল না।',
    },
    diagram: 'event-bubbling',
    question: 'Event bubbling vs capturing; stopPropagation.',
    answer: 'A DOM event travels in three phases: capturing (from window down to the target\'s parent), target, and bubbling (from the target back up to window). By default addEventListener listens in the bubbling phase; passing { capture: true } listens during capturing. event.stopPropagation() stops the event from reaching further elements in the path, while stopImmediatePropagation() also stops other listeners on the same element.',
    points: [
      'Order: capture (top-down) -> target -> bubble (bottom-up)',
      'addEventListener(type, fn, { capture: true }) for the capture phase',
      'stopPropagation does not cancel the default action (that is preventDefault)',
      'Some events don\'t bubble: focus, blur, mouseenter, mouseleave (use focusin/focusout)',
      'Use stopPropagation sparingly; it can break delegation and analytics listeners higher up',
    ],
    code: `// HTML: <div id="outer"><button id="inner">Click</button></div>
const outer = document.getElementById('outer');
const inner = document.getElementById('inner');

outer.addEventListener('click', () => console.log('outer capture'), { capture: true });
outer.addEventListener('click', () => console.log('outer bubble'));
inner.addEventListener('click', (e) => {
  console.log('inner');
  // e.stopPropagation(); // uncomment: 'outer bubble' won't log
});
// Clicking the button logs: outer capture, inner, outer bubble`,
  },
  {
    id: 'jd-3',
    level: 'junior',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'Event delegation ek society ke gate wale guard jaisa hai. Har flat ke bahar alag guard rakhne ke bajaye ek hi guard gate pe baithta hai aur dekhta hai parcel kis flat ka hai; naye flat bane to bhi wahi guard sambhal leta hai.',
      en: 'Event delegation is like the main-gate guard of a housing society. Instead of a guard outside every flat, one guard sits at the gate and checks which flat a parcel is for; even new flats are handled by the same guard.',
      bn: 'Event delegation হলো আবাসনের মেন গেটের দারোয়ানের মতো। প্রতিটা ফ্ল্যাটের বাইরে আলাদা দারোয়ান না রেখে একজনই গেটে বসে দেখে parcel কোন ফ্ল্যাটের; নতুন ফ্ল্যাট হলেও সেই একজনই সামলায়।',
    },
    diagram: 'event-bubbling',
    question: 'What is event delegation and why is it useful?',
    answer: 'Event delegation means attaching one listener to a common parent instead of to every child, and using event.target (often with closest()) to find which child triggered the event. It works because most events bubble up. It reduces the number of listeners and memory, and automatically handles elements added later, such as new list items or table rows.',
    points: [
      'Relies on event bubbling',
      'Use e.target.closest(selector) to find the intended element; e.currentTarget is the parent',
      'One listener instead of hundreds -> less memory, simpler cleanup',
      'Works for dynamically added children without re-binding',
      'Doesn\'t work directly for non-bubbling events (focus/blur); use focusin/focusout',
    ],
    code: `// HTML: <ul id="todo"><li data-id="1">Buy milk <button class="del">x</button></li></ul>
const list = document.getElementById('todo');

list.addEventListener('click', (e) => {
  const btn = e.target.closest('.del');
  if (!btn || !list.contains(btn)) return;
  const li = btn.closest('li');
  console.log('Delete item', li.dataset.id);
  li.remove();
});

// Items added later are handled automatically
list.insertAdjacentHTML('beforeend',
  '<li data-id="2">Buy bread <button class="del">x</button></li>');`,
  },
  {
    id: 'jd-4',
    level: 'fresher',
    topic: 'js-dom',
    difficulty: 'easy',
    simple: {
      hi: 'preventDefault aise hai jaise school bell bajne par bhi teacher bole \'ruko, abhi chhutti nahi\' (default kaam roka). stopPropagation aise hai jaise baat class ke andar hi rakhi gayi, principal tak nahi pahunchi.',
      en: 'preventDefault is like the teacher saying \'wait, no break yet\' even though the bell rang (the default action is stopped). stopPropagation is like keeping the news inside the classroom so it never reaches the principal.',
      bn: 'preventDefault হলো ঘণ্টা বাজার পরও টিচারের বলা \'দাঁড়াও, এখন ছুটি নয়\' (default কাজ থামানো)। stopPropagation হলো খবরটা ক্লাসের ভেতরেই রাখা, প্রিন্সিপাল পর্যন্ত পৌঁছায় না।',
    },
    question: 'preventDefault vs stopPropagation.',
    answer: 'preventDefault() cancels the browser\'s default action for an event, such as a form submitting and reloading the page, a link navigating or a checkbox toggling, but the event still propagates. stopPropagation() stops the event from travelling to other elements (parents during bubbling), but the default action still happens. They solve different problems and can be used together.',
    points: [
      'preventDefault: stop the browser\'s built-in behaviour',
      'stopPropagation: stop other elements\' listeners from receiving the event',
      'event.defaultPrevented tells you if preventDefault was called',
      'Only works on cancelable events; passive listeners (e.g. { passive: true } on touch/wheel) cannot preventDefault',
      'return false inside addEventListener does nothing (it only works in onclick attributes / jQuery)',
    ],
    code: `const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();          // no page reload
  console.log('Submitting via fetch...');
});

const link = document.querySelector('a.help');
link.addEventListener('click', (e) => {
  e.stopPropagation();         // parent click handlers won't run
  // the link still navigates (default action not prevented)
});`,
  },
  {
    id: 'jd-5',
    level: 'junior',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'localStorage ghar ki almirah jaisa hai, cheez tab tak rehti hai jab tak tum khud na nikaalo. sessionStorage train ki seat jaisa hai, safar (tab) khatam to jagah khaali. Cookie ek chhoti parchi hai jo har baar dukaan (server) jaate waqt saath le jaate ho.',
      en: 'localStorage is like a cupboard at home: things stay until you remove them. sessionStorage is like a train seat: when the journey (tab) ends, the seat is empty. A cookie is a small chit you carry to the shop (server) every single time you visit.',
      bn: 'localStorage হলো বাড়ির আলমারির মতো, তুমি নিজে না সরালে জিনিস থেকে যায়। sessionStorage হলো ট্রেনের সিটের মতো, যাত্রা (tab) শেষ তো জায়গা খালি। Cookie হলো ছোট্ট একটা চিরকুট, যা প্রতিবার দোকানে (server) যাওয়ার সময় সঙ্গে নিয়ে যাও।',
    },
    question: 'localStorage vs sessionStorage vs cookies.',
    answer: 'localStorage stores string key-value data per origin with no expiry, so it survives tab closes and browser restarts (typically around 5 MB). sessionStorage has the same API but is scoped to a single tab and is cleared when that tab closes. Cookies are small (about 4 KB), have an expiry, and are automatically sent to the server with every matching HTTP request; they can be flagged HttpOnly, Secure and SameSite, which makes them the safer choice for session/auth tokens.',
    points: [
      'Web Storage (local/session): synchronous, strings only (use JSON.stringify/parse), never sent to the server',
      'localStorage: persistent, shared across tabs of the same origin; \'storage\' event fires in other tabs',
      'sessionStorage: per tab, cleared on tab close',
      'Cookies: sent with requests, size ~4 KB, attributes Expires/Max-Age, Path, Domain, Secure, HttpOnly, SameSite',
      'Any JS (including XSS) can read Web Storage; prefer HttpOnly cookies for auth tokens',
    ],
    code: `localStorage.setItem('theme', 'dark');
localStorage.setItem('cart', JSON.stringify([{ id: 1, qty: 2 }]));
const cart = JSON.parse(localStorage.getItem('cart') ?? '[]');
console.log(cart[0].qty);                  // 2

sessionStorage.setItem('step', '2');       // gone when the tab closes

document.cookie = 'lang=en; max-age=86400; path=/; SameSite=Lax; Secure';
console.log(document.cookie);              // includes "lang=en" (HttpOnly cookies are hidden)`,
  },
  {
    id: 'jd-6',
    level: 'junior',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'Debounce lift ke darwaze jaisa hai: jab tak log aate rehte hain darwaza ruka rehta hai, sab aa gaye to hi lift chalti hai. Throttle ek bus jaisa hai jo har 10 minute mein ek baar hi chalti hai, chahe stop pe kitni bhi bheed ho.',
      en: 'Debounce is like a lift door: it keeps waiting while people keep coming in, and moves only after everyone has entered. Throttle is like a bus that leaves only once every 10 minutes, no matter how big the crowd at the stop.',
      bn: 'Debounce হলো লিফটের দরজার মতো: লোক আসতে থাকলে দরজা অপেক্ষা করে, সবাই ঢুকলে তবেই লিফট চলে। Throttle হলো এমন বাসের মতো যা প্রতি ১০ মিনিটে একবারই ছাড়ে, স্টপে যত ভিড়ই হোক।',
    },
    question: 'Debouncing vs throttling — concept and use cases.',
    answer: 'Both limit how often a function runs for rapid events. Debouncing delays the call until the events stop for a given wait time, so only the last call runs, which suits search-as-you-type, auto-save and window resize end. Throttling runs the function at most once per interval no matter how many events fire, which suits scroll handlers, mouse-move tracking, and rate-limiting button clicks.',
    points: [
      'Debounce: wait for a pause, then run once (trailing)',
      'Throttle: run at a steady maximum rate during continuous events',
      'Both reduce API calls and expensive DOM work',
      'Implemented with closures and setTimeout / timestamps',
      'In Angular/RxJS use debounceTime and throttleTime operators',
    ],
    code: `function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function throttle(fn, interval) {
  let last = 0;
  return function (...args) {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn.apply(this, args);
    }
  };
}

const input = document.querySelector('#search');
input.addEventListener('input', debounce(e => console.log('API call for', e.target.value), 300));
window.addEventListener('scroll', throttle(() => console.log('y =', window.scrollY), 200));`,
  },
  {
    id: 'jd-7',
    level: 'junior',
    topic: 'js-dom',
    difficulty: 'easy',
    simple: {
      hi: 'defer aise hai jaise school assembly ke baad hi sab class mein line se jaate hain, order mein. async aise hai jaise jo bachcha pehle aa gaya woh seedha class mein ghus gaya, bina line ke.',
      en: 'defer is like students going to class only after assembly ends, in proper line order. async is like whichever student arrives first walking straight into class without waiting in line.',
      bn: 'defer হলো অ্যাসেম্বলি শেষ হলে তবেই সবাই লাইন করে ক্রমানুসারে ক্লাসে যাওয়া। async হলো যে ছাত্র আগে এল সে লাইন ছাড়াই সোজা ক্লাসে ঢুকে পড়ল।',
    },
    question: '<script> defer vs async.',
    answer: 'A plain <script src> blocks HTML parsing while it downloads and executes. With defer, the script downloads in parallel and runs after the HTML is fully parsed, in document order, just before DOMContentLoaded. With async, the script downloads in parallel and runs as soon as it arrives, pausing parsing at that moment, with no guaranteed order, so it suits independent scripts like analytics.',
    points: [
      'No attribute: parser-blocking download + execution',
      'defer: parallel download, runs after parsing, keeps order, before DOMContentLoaded',
      'async: parallel download, runs ASAP, order not guaranteed, may run before or after DOMContentLoaded',
      'type="module" scripts are deferred by default (async can be added)',
      'defer/async apply to external scripts; defer is ignored on inline classic scripts',
    ],
    code: `<!-- runs after HTML is parsed, in this order -->
<script src="vendor.js" defer></script>
<script src="app.js" defer></script>

<!-- runs as soon as downloaded, order not guaranteed -->
<script src="analytics.js" async></script>

<!-- module scripts are deferred by default -->
<script type="module" src="main.js"></script>

<!-- no attribute: blocks parsing while downloading and executing -->
<script src="legacy.js"></script>`,
  },
  {
    id: 'jd-8',
    level: 'mid',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'Reflow aise hai jaise class mein ek bench hilane par poori class ki seating dobara arrange karni pade. Repaint sirf deewar ka rang badalna hai. Layout thrashing tab hota hai jab tum baar-baar ek bench hilao aur turant naap lo, har baar poori class ko rearrange karna padta hai.',
      en: 'Reflow is like moving one bench in class and having to rearrange the whole seating plan. Repaint is just changing the wall colour. Layout thrashing is moving one bench and measuring right away, again and again, so the whole class is rearranged every time.',
      bn: 'Reflow হলো ক্লাসে একটা বেঞ্চ সরালে পুরো ক্লাসের বসার ব্যবস্থা নতুন করে সাজানোর মতো। Repaint শুধু দেওয়ালের রং বদলানো। Layout thrashing হয় যখন বারবার একটা বেঞ্চ সরিয়েই সঙ্গে সঙ্গে মাপো, তাই প্রতিবার পুরো ক্লাস নতুন করে সাজাতে হয়।',
    },
    question: 'Reflow vs repaint — how do you avoid layout thrashing?',
    answer: 'Reflow (layout) is when the browser recalculates the size and position of elements, for example after changing width, font-size or adding nodes; repaint is redrawing pixels without geometry changes, such as changing color or background. Layout thrashing happens when code alternates DOM writes with layout reads like offsetHeight or getBoundingClientRect, forcing a synchronous reflow each time. Avoid it by batching all reads before writes, using requestAnimationFrame, toggling classes instead of many inline styles, and animating transform/opacity, which can be handled by the compositor.',
    points: [
      'Reflow is more expensive than repaint and can cascade to children/ancestors',
      'Forced sync layout: reading offsetWidth/clientHeight/getComputedStyle after a write',
      'Batch: read all values first, then write all (or use rAF)',
      'Prefer transform and opacity for animations; use will-change sparingly',
      'Use DocumentFragment or build markup once; check the Performance panel for \'Forced reflow\' warnings',
    ],
    code: `const boxes = document.querySelectorAll('.box');

// BAD: read + write in each iteration -> forced reflow every time
boxes.forEach(b => { b.style.width = b.offsetWidth + 10 + 'px'; });

// GOOD: read all, then write all in the next frame
const widths = [...boxes].map(b => b.offsetWidth);
requestAnimationFrame(() => {
  boxes.forEach((b, i) => { b.style.width = widths[i] + 10 + 'px'; });
});

// Animate with compositor-friendly properties
boxes[0].style.transform = 'translateX(100px)';`,
  },
  {
    id: 'jd-9',
    level: 'mid',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'Same-origin policy school ke rule jaisa hai: dusre school ka bachcha tumhari class ki copy nahi dekh sakta. CORS principal ki permission letter jaisa hai: agar principal (server) likh de \'is school ke bachche aa sakte hain\', to watchman (browser) andar jaane deta hai.',
      en: 'The same-origin policy is like a school rule: a student from another school can\'t look at your class notebooks. CORS is like a permission letter from the principal (server): if it says \'students from this school may enter\', the watchman (browser) lets them in.',
      bn: 'Same-origin policy হলো স্কুলের নিয়মের মতো: অন্য স্কুলের ছাত্র তোমার ক্লাসের খাতা দেখতে পারবে না। CORS হলো প্রিন্সিপালের (server) অনুমতিপত্রের মতো: যদি লেখা থাকে \'এই স্কুলের ছাত্ররা আসতে পারে\', তবে দারোয়ান (browser) ঢুকতে দেয়।',
    },
    question: 'What is CORS and the same-origin policy?',
    answer: 'The same-origin policy is a browser rule that stops a script from one origin (scheme + host + port) from reading responses from another origin. CORS (Cross-Origin Resource Sharing) is the standard way a server opts in to cross-origin access using headers like Access-Control-Allow-Origin. For non-simple requests (e.g. PUT/DELETE, JSON content type or custom headers) the browser first sends an OPTIONS preflight and only sends the real request if the server allows it. CORS is enforced by the browser, so it is fixed on the server (or with a dev proxy), not in frontend code.',
    points: [
      'Origin = protocol + domain + port; http://a.com and https://a.com are different',
      'Server headers: Access-Control-Allow-Origin, -Methods, -Headers, -Credentials, -Max-Age',
      'Preflight: OPTIONS request for non-simple methods/headers/content types',
      'With credentials (cookies), Allow-Origin cannot be * and Allow-Credentials must be true',
      'CORS is not server protection (curl/Postman ignore it); in Angular dev use proxy.conf.json',
    ],
    code: `// Frontend at https://shop.example.com
fetch('https://api.example.com/orders', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ item: 'tea' })
});

// Express server at https://api.example.com
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://shop.example.com');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods', 'GET,POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});`,
  },
  {
    id: 'jd-10',
    level: 'mid',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'Page render karna ek ghar banane jaisa hai. Pehle naksha (DOM), phir decoration plan (CSSOM), dono milake final design (render tree), phir naap-jokh (layout), phir rang-rogan (paint) aur aakhir mein sab hisse jodna (composite).',
      en: 'Rendering a page is like building a house. First the floor plan (DOM), then the decoration plan (CSSOM), both combined into a final design (render tree), then measurements (layout), then painting (paint), and finally putting all the parts together (composite).',
      bn: 'পেজ render করা হলো বাড়ি বানানোর মতো। আগে নকশা (DOM), তারপর সাজসজ্জার পরিকল্পনা (CSSOM), দুটো মিলিয়ে final ডিজাইন (render tree), তারপর মাপজোক (layout), তারপর রং করা (paint), আর শেষে সব অংশ জোড়া (composite)।',
    },
    question: 'How does the browser render a page (critical rendering path)?',
    answer: 'The browser parses HTML into the DOM and CSS into the CSSOM, combines them into a render tree of visible nodes, runs layout to compute each element\'s geometry, paints pixels into layers and finally composites the layers on screen. CSS is render-blocking and classic synchronous scripts are parser-blocking, so they delay first paint. Optimising the critical rendering path means minimising and inlining critical CSS, deferring non-critical JS, preloading key resources and reducing the bytes and round trips needed for the first view.',
    points: [
      'Steps: DOM -> CSSOM -> render tree -> layout -> paint -> composite',
      'CSS blocks rendering; sync <script> blocks parsing (and waits for preceding CSS)',
      'display:none elements are not in the render tree; visibility:hidden ones are',
      'Optimise: critical CSS inline, defer/async JS, preload/preconnect, compress, font-display: swap',
      'Measure with Lighthouse / Core Web Vitals (LCP, INP, CLS)',
    ],
    code: `<head>
  <link rel="preconnect" href="https://cdn.example.com">
  <!-- critical above-the-fold CSS inlined -->
  <style>header { background: #f60; height: 64px; }</style>
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
  <!-- non-critical CSS loaded without blocking render -->
  <link rel="stylesheet" href="/styles.css" media="print" onload="this.media='all'">
  <script src="/app.js" defer></script>
</head>`,
  },
  {
    id: 'jd-11',
    level: 'senior',
    topic: 'js-dom',
    difficulty: 'hard',
    simple: {
      hi: 'Memory leak aise hai jaise ghar mein purane akhbaar jamaa karte jaana aur kabhi raddiwale ko na dena; dheere-dheere ghar bhar jaata hai. DevTools heap snapshot ek inspection jaisa hai jo batata hai kaun sa dher kis kone mein pada hai aur kisne rakha.',
      en: 'A memory leak is like piling up old newspapers at home and never giving them to the raddiwala; slowly the house fills up. A DevTools heap snapshot is like an inspection that shows which pile is lying in which corner and who left it there.',
      bn: 'Memory leak হলো বাড়িতে পুরোনো খবরের কাগজ জমাতে থাকা আর কখনো কাগজওয়ালাকে না দেওয়ার মতো; ধীরে ধীরে বাড়ি ভরে যায়। DevTools heap snapshot হলো একটা পরিদর্শনের মতো, যা দেখায় কোন স্তূপ কোন কোণে পড়ে আছে আর কে রেখেছে।',
    },
    question: 'Common memory leaks in JavaScript and how to find them.',
    answer: 'A memory leak happens when objects that are no longer needed stay reachable, so the garbage collector cannot free them. Common causes are event listeners, timers and observers never removed, uncompleted RxJS subscriptions, detached DOM nodes still referenced from JS, closures capturing large data, accidental globals and unbounded caches or Maps. Find them with Chrome DevTools: watch the JS heap grow in the Performance/Memory panels, take heap snapshots before and after repeating an action, compare them, filter for \'Detached\' nodes and follow the retainers path to the code holding the reference.',
    points: [
      'Remove listeners (removeEventListener or AbortController signal), clear intervals/timeouts, disconnect observers',
      'Angular: async pipe, takeUntilDestroyed(), DestroyRef.onDestroy, or signals instead of manual subscribe',
      'Detached DOM: elements removed from the page but still stored in variables/arrays',
      'Use WeakMap/WeakRef or bounded LRU caches instead of ever-growing Maps',
      'Tools: heap snapshot comparison, allocation timeline, Performance monitor, retainers tree',
    ],
    code: `function startWidget(el) {
  const bigData = new Array(1e6).fill('x');
  const controller = new AbortController();
  window.addEventListener('resize', () => console.log(bigData.length),
    { signal: controller.signal });
  const id = setInterval(() => { el.textContent = Date.now(); }, 1000);

  // Without this cleanup, bigData, el and the handlers stay in memory forever
  return () => {
    controller.abort();   // removes the listener
    clearInterval(id);
  };
}
const stop = startWidget(document.querySelector('#clock'));
// when the widget is removed:
stop();

// Angular: this.data$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(...)`,
  },
  {
    id: 'jd-12',
    level: 'mid',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'XSS aise hai jaise koi chor school ke notice board pe naqli notice chipka de aur sab use asli maan lein. CSRF aise hai jaise koi tumhare naam ki naqli chitthi bank bheje aur bank tumhara signature (cookie) dekhkar paise de de. Bachav: notice check karo (escape) aur chitthi pe secret code (CSRF token) maango.',
      en: 'XSS is like a thief sticking a fake notice on the school notice board that everyone believes is real. CSRF is like someone sending a fake letter in your name to the bank, and the bank pays because it sees your signature (cookie). Protection: check every notice (escape) and ask for a secret code on letters (CSRF token).',
      bn: 'XSS হলো কোনো চোর স্কুলের নোটিস বোর্ডে নকল নোটিস লাগিয়ে দিল আর সবাই সেটা আসল ভাবল। CSRF হলো কেউ তোমার নামে ব্যাংকে নকল চিঠি পাঠাল আর ব্যাংক তোমার সই (cookie) দেখে টাকা দিয়ে দিল। বাঁচার উপায়: নোটিস যাচাই করো (escape) আর চিঠিতে গোপন কোড (CSRF token) চাও।',
    },
    question: 'XSS and CSRF basics — how do you protect a web app?',
    answer: 'XSS (Cross-Site Scripting) is when an attacker gets their script to run inside your page, for example via unescaped user input in innerHTML, letting them steal data or act as the user. Prevent it by escaping output, using textContent or framework binding, sanitising any HTML you must render (Angular sanitises [innerHTML] automatically; avoid bypassSecurityTrust* with untrusted data), and adding a Content-Security-Policy. CSRF (Cross-Site Request Forgery) is when another site makes the user\'s browser send an authenticated request with their cookies; prevent it with SameSite cookies, anti-CSRF tokens, Origin/Referer checks and never changing state on GET.',
    points: [
      'XSS types: stored, reflected, DOM-based',
      'XSS defences: output encoding, textContent, sanitiser (e.g. DOMPurify), CSP, HttpOnly cookies limit damage',
      'Angular escapes {{ }} interpolation and sanitises [innerHTML], [href], [src] by default',
      'CSRF defences: SameSite=Lax/Strict, CSRF token (Angular HttpClient sends X-XSRF-TOKEN from the XSRF-TOKEN cookie), check Origin',
      'Token in Authorization header (not cookies) is not vulnerable to CSRF but must be protected from XSS',
    ],
    code: `const div = document.querySelector('#comment');
const comment = '<img src=x onerror="alert(document.cookie)">';

// BAD: the browser executes the attacker's onerror handler
// div.innerHTML = comment;

// GOOD: rendered as plain text
div.textContent = comment;

// Server response headers:
// Set-Cookie: sid=abc123; HttpOnly; Secure; SameSite=Lax
// Content-Security-Policy: default-src 'self'; script-src 'self'`,
  },
  {
    id: 'jd-13',
    level: 'mid',
    topic: 'js-dom',
    difficulty: 'medium',
    simple: {
      hi: 'IntersectionObserver ek railway signalman jaisa hai jo batata hai \'train platform pe aa gayi\'. Lazy loading matlab chai wala tabhi chai banata hai jab train platform pe pahunchti hai, pehle se sab chai thandi nahi karta.',
      en: 'IntersectionObserver is like a railway signalman who calls out \'the train has reached the platform\'. Lazy loading means the chaiwala makes tea only when the train arrives, instead of making all the tea early and letting it go cold.',
      bn: 'IntersectionObserver হলো রেলের signalman-এর মতো, যে জানায় \'ট্রেন প্ল্যাটফর্মে এসে গেছে\'। Lazy loading মানে চা-ওয়ালা তখনই চা বানায় যখন ট্রেন প্ল্যাটফর্মে পৌঁছায়, আগে থেকে সব চা বানিয়ে ঠান্ডা করে না।',
    },
    question: 'IntersectionObserver and lazy-loading images.',
    answer: 'IntersectionObserver asynchronously notifies you when an element enters or leaves the viewport (or another root element) past a threshold, without scroll listeners or repeated getBoundingClientRect calls that cause layout work. For lazy-loading, you keep the real URL in data-src, observe the images, set src when entry.isIntersecting is true and then unobserve. For plain images, native loading="lazy" is usually enough; Angular\'s NgOptimizedImage lazy-loads non-priority images and @defer (on viewport) uses IntersectionObserver for components.',
    points: [
      'Options: root (null = viewport), rootMargin to preload early, threshold (0-1 or array)',
      'Callback gets entries with isIntersecting, intersectionRatio, target',
      'More efficient than scroll + getBoundingClientRect (no main-thread polling)',
      'Use cases: lazy images, infinite scroll, ad/analytics impressions, scroll animations',
      'Always set width/height on images to avoid layout shift (CLS); call unobserve/disconnect',
    ],
    code: `// HTML: <img class="lazy" data-src="/img/thali.jpg" width="400" height="300" alt="Thali">
const io = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const img = entry.target;
    img.src = img.dataset.src;
    observer.unobserve(img);
  });
}, { rootMargin: '200px 0px', threshold: 0 });

document.querySelectorAll('img.lazy').forEach(img => io.observe(img));

// Simplest option for most cases:
// <img src="/img/thali.jpg" loading="lazy" width="400" height="300" alt="Thali">`,
  },
  {
    id: 'jd-14',
    level: 'senior',
    topic: 'js-dom',
    difficulty: 'hard',
    simple: {
      hi: 'URL type karna aise hai jaise courier se kisi dost ko chitthi bhejna. Pehle address se pin code dhundhte ho (DNS), phir courier wala raasta pakka karta hai (TCP/TLS), chitthi pahunchti hai (request), jawab ka parcel aata hai (response), aur tum use kholke saja dete ho (rendering).',
      en: 'Typing a URL is like sending a letter to a friend by courier. First you find the pin code from the address (DNS), the courier fixes a safe route (TCP/TLS), the letter is delivered (request), a reply parcel comes back (response), and you open it and arrange everything nicely (rendering).',
      bn: 'URL টাইপ করা হলো courier দিয়ে বন্ধুকে চিঠি পাঠানোর মতো। আগে ঠিকানা থেকে পিন কোড খোঁজো (DNS), courier নিরাপদ রাস্তা ঠিক করে (TCP/TLS), চিঠি পৌঁছায় (request), উত্তরের parcel ফেরত আসে (response), আর তুমি সেটা খুলে সুন্দর করে সাজাও (rendering)।',
    },
    question: 'What happens when you type a URL in the browser and press Enter?',
    answer: 'The browser parses the input as a URL (or a search), checks HSTS, service worker and HTTP caches, then resolves the domain to an IP through DNS (browser, OS and router caches, then a recursive resolver querying root, TLD and authoritative servers). It opens a connection (TCP + TLS handshake, or QUIC for HTTP/3), sends the HTTP request with headers and cookies, and the server or CDN returns a response, possibly a redirect. The browser then parses HTML into the DOM, fetches CSS, JS, images and fonts, builds the CSSOM and render tree, runs layout, paint and composite, executes scripts, and fires DOMContentLoaded and load.',
    points: [
      'URL parsing, HSTS upgrade to HTTPS, cache / service worker lookup',
      'DNS resolution: caches -> recursive resolver -> root -> TLD -> authoritative',
      'Connection: TCP 3-way handshake + TLS handshake (certificate check), or QUIC/HTTP3; connection reuse with keep-alive/HTTP2',
      'HTTP request/response: status codes, redirects (301/302), caching headers, compression',
      'Rendering: DOM, CSSOM, render tree, layout, paint, composite; JS execution; DOMContentLoaded and load events',
      'Performance levers: CDN, caching, preconnect, HTTP/2-3, smaller bundles, SSR',
    ],
  },
  {
    id: 'je-1',
    level: 'fresher',
    topic: 'js-es6',
    difficulty: 'easy',
    simple: {
      hi: 'ES6+ features ek naye smartphone ke update jaise hain. Phone wahi hai (JavaScript), par naye features aa gaye jaise arrow function, destructuring, promise, jisse kaam jaldi aur aasaani se ho jaata hai.',
      en: 'ES6+ features are like a big update to your smartphone. The phone is the same (JavaScript), but it gets new tools like arrow functions, destructuring and promises that make daily work faster and easier.',
      bn: 'ES6+ features হলো স্মার্টফোনের একটা বড় update-এর মতো। ফোন একই আছে (JavaScript), কিন্তু নতুন tools এসেছে যেমন arrow function, destructuring, promise, যাতে রোজকার কাজ সহজে আর তাড়াতাড়ি হয়।',
    },
    question: 'What are the most important ES6+ features?',
    answer: 'ES6 (ES2015) modernised JavaScript with let/const block scoping, arrow functions, template literals, destructuring, spread/rest, default parameters, classes, ES modules, Promises, Map/Set, Symbol, iterators and generators. Later yearly releases added async/await (ES2017), optional chaining ?. and nullish coalescing ?? (ES2020), Array.prototype.at (ES2022), non-mutating array methods like toSorted (ES2023) and Object.groupBy / Promise.withResolvers (ES2024). Together they make code shorter, safer and easier to read.',
    points: [
      'let/const: block scope, no accidental re-declaration; const prevents re-assignment, not mutation',
      'Arrow functions: short syntax and lexical this (no own this/arguments)',
      'Destructuring, spread/rest, default params, template literals for cleaner code',
      'Classes, ES modules (import/export), Promises and async/await for structure and async code',
      'Map/Set, Symbol, iterators/generators; ?. and ?? for safe property access and defaults',
    ],
    code: `const user = { name: 'Asha', address: { city: 'Pune' } };
const { name, age = 25 } = user;
const greet = (n) => \`Hello, \${n}!\`;
console.log(greet(name), age);          // Hello, Asha! 25
console.log(user.address?.pin ?? 'NA'); // NA
const nums = [3, 1, 2];
console.log([...nums, 4]);              // [3, 1, 2, 4]
console.log(nums.toSorted());           // [1, 2, 3]`,
  },
  {
    id: 'je-2',
    level: 'fresher',
    topic: 'js-es6',
    difficulty: 'easy',
    simple: {
      hi: 'Destructuring tiffin box kholne jaisa hai. Ek hi baar mein roti, sabzi aur dal alag-alag plate mein nikaal lo; agar dal nahi hai to default mein achaar le lo.',
      en: 'Destructuring is like opening a tiffin box. In one go you take out the roti, sabzi and dal into separate plates, and if the dal is missing you take pickle as the default.',
      bn: 'Destructuring হলো টিফিন বাক্স খোলার মতো। এক বারেই রুটি, সবজি আর ডাল আলাদা আলাদা প্লেটে বের করে নাও; ডাল না থাকলে default হিসেবে আচার নাও।',
    },
    question: 'Destructuring of arrays and objects (defaults, renaming, nested).',
    answer: 'Destructuring unpacks values from arrays (by position) or objects (by property name) into variables. You can give defaults (used only when the value is undefined), rename object properties with { key: newName }, skip array items with empty commas, collect the remainder with ...rest, and destructure nested structures in one pattern. Destructuring null or undefined throws a TypeError.',
    points: [
      'Array destructuring is positional; object destructuring is by key name',
      'Defaults apply only for undefined, not for null',
      'Renaming: const { id: userId } = obj creates userId, not id',
      'Nested patterns like { profile: { city } } create city but not profile',
      'Handy for swapping variables, function parameters and React/Angular inputs',
    ],
    code: `const [a, , b = 10, ...rest] = [1, 2, undefined, 4, 5];
console.log(a, b, rest);         // 1 10 [4, 5]

const user = { id: 7, profile: { city: 'Kolkata' } };
const { id: userId, role = 'guest', profile: { city } } = user;
console.log(userId, role, city); // 7 guest Kolkata

function show({ name = 'Guest', age } = {}) {
  return \`\${name} \${age}\`;
}
console.log(show({ age: 20 }));  // Guest 20

let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);               // 2 1`,
  },
  {
    id: 'je-3',
    level: 'fresher',
    topic: 'js-es6',
    difficulty: 'easy',
    simple: {
      hi: 'Spread aise hai jaise ladoo ka dabba khol ke sab ladoo plate mein phaila dena. Rest ulta hai: bache hue saare ladoo ek dabbe mein wapas samet lena.',
      en: 'Spread is like opening a box of laddoos and spreading them all on a plate. Rest is the opposite: gathering all the remaining laddoos back into one box.',
      bn: 'Spread হলো লাড্ডুর বাক্স খুলে সব লাড্ডু প্লেটে ছড়িয়ে দেওয়ার মতো। Rest তার উল্টো: বাকি সব লাড্ডু আবার একটা বাক্সে গুছিয়ে রাখা।',
    },
    question: 'Spread vs rest operator.',
    answer: 'Both use the same ... syntax but do opposite jobs. Spread expands an iterable or object into individual elements, for example in function calls, array literals or object literals (copying and merging). Rest collects multiple elements into one array or object, used in function parameters and destructuring, and it must be the last item.',
    points: [
      'Spread = expand; rest = collect',
      'Spread in calls/literals: fn(...arr), [...a, ...b], { ...obj, key: val }',
      'Rest in params/destructuring: function f(...args), const { a, ...others } = obj',
      'Spread makes only a shallow copy; nested objects are still shared',
      'Only one rest element is allowed and it must be last; later keys win when spreading objects',
    ],
    code: `function sum(...nums) {          // rest: collects arguments
  return nums.reduce((a, b) => a + b, 0);
}
const arr = [1, 2, 3];
console.log(sum(...arr));        // spread: expands -> 6

const base = { a: 1, b: 2 };
const copy = { ...base, b: 3 };  // spread: copy + override
const { a, ...others } = copy;   // rest in destructuring
console.log(copy, others);       // { a: 1, b: 3 } { b: 3 }`,
  },
  {
    id: 'je-4',
    level: 'junior',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'Template literal ek form jaisa hai jisme khaali jagah (${}) mein naam aur amount bhar dete ho. Tagged template mein form pehle clerk (function) ke paas jaata hai, jo use check karke apne tareeke se final copy banata hai.',
      en: 'A template literal is like a printed form where you fill the blanks (${}) with name and amount. With a tagged template, the form first goes to a clerk (the function), who checks it and prepares the final copy in his own way.',
      bn: 'Template literal হলো একটা ছাপানো form-এর মতো, যার ফাঁকা জায়গায় (${}) নাম আর টাকা বসাও। Tagged template-এ form আগে clerk (function)-এর কাছে যায়, সে দেখে নিজের মতো করে final কপি বানায়।',
    },
    question: 'Template literals and tagged templates.',
    answer: 'Template literals use backticks and support ${expression} interpolation and real multi-line strings without concatenation. A tagged template calls a function with the literal: the function receives an array of the static string parts (with a .raw property) followed by the evaluated values, and can return anything. Tags are used for escaping/sanitising, i18n, CSS-in-JS and query builders such as lit html or GraphQL gql.',
    points: [
      'Backticks allow ${} interpolation of any expression and multi-line strings',
      'Tag function signature: (strings, ...values); strings.length is values.length + 1',
      'strings.raw gives the unprocessed text; String.raw is a built-in tag',
      'A tag can return non-strings (e.g. DOM templates, query objects)',
      'Useful for safe HTML escaping, formatting currency, styled-components, gql',
    ],
    code: `const item = 'Samosa', price = 15;
console.log(\`Item: \${item}
Total: \${price * 2}\`);

function rupee(strings, ...values) {
  return strings.reduce((out, str, i) =>
    out + str + (i < values.length ? \`₹\${values[i]}\` : ''), '');
}
console.log(rupee\`Tea costs \${10} and coffee \${25}\`);
// Tea costs ₹10 and coffee ₹25

console.log(String.raw\`C:\\new\\folder\`.length > 0); // true`,
  },
  {
    id: 'je-5',
    level: 'junior',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'Map ek railway cloakroom jaisa hai jahan kisi bhi cheez ka token (key) ban sakta hai, sirf naam wala nahi. Set ek class ki attendance list jaisa hai jahan ek bachche ka naam do baar nahi likha jaata.',
      en: 'A Map is like a railway cloakroom where anything can get a token (key), not just a name tag. A Set is like a class attendance list where the same student\'s name is never written twice.',
      bn: 'Map হলো রেলওয়ে cloakroom-এর মতো, যেখানে যে কোনো জিনিসের token (key) হতে পারে, শুধু নাম নয়। Set হলো ক্লাসের attendance list-এর মতো, যেখানে একই ছাত্রের নাম দুবার লেখা হয় না।',
    },
    question: 'Map vs Object, Set vs Array — when to use which?',
    answer: 'Use a Map when keys are dynamic or not strings (objects, numbers), when you add/remove entries often, or need insertion order, size and easy iteration; use a plain Object for fixed-shape records and JSON data. Use a Set when you need unique values and fast membership checks (has is on average O(1) versus includes which is O(n)); use an Array when order, duplicates, indexing and array methods like map/filter matter.',
    points: [
      'Object keys are only strings/symbols; Map keys can be any value, including objects',
      'Map has size, keeps insertion order, is directly iterable and has no prototype key clashes',
      'Object is better for JSON serialisation and fixed structures (Map needs conversion)',
      'Set stores unique values (SameValueZero); [...new Set(arr)] removes duplicates',
      'Array for ordered lists, index access and rich methods; Set for fast lookups',
    ],
    code: `const m = new Map();
const keyObj = { id: 1 };
m.set(keyObj, 'user data').set(1, 'number key');
console.log(m.get(keyObj), m.size); // user data 2

const o = {};
o[keyObj] = 'x';
console.log(Object.keys(o));        // ['[object Object]']

const ids = [1, 2, 2, 3, 3];
const unique = [...new Set(ids)];
console.log(unique);                // [1, 2, 3]
console.log(new Set(ids).has(2));   // true`,
  },
  {
    id: 'je-6',
    level: 'mid',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'WeakMap ek school ke lost-and-found register jaisa hai. Jab tak bachcha (object) school mein hai, uski entry rehti hai; bachcha school chhod de to safai wale (garbage collector) entry khud mita dete hain.',
      en: 'A WeakMap is like a school\'s lost-and-found register. While the student (object) is in school the entry stays, but once the student leaves, the cleaners (garbage collector) quietly remove the entry.',
      bn: 'WeakMap হলো স্কুলের lost-and-found রেজিস্টারের মতো। ছাত্র (object) যতদিন স্কুলে আছে ততদিন entry থাকে; ছাত্র চলে গেলে সাফাইকর্মী (garbage collector) নিজেই entry মুছে দেয়।',
    },
    question: 'WeakMap and WeakSet — how do they relate to garbage collection?',
    answer: 'WeakMap and WeakSet hold their keys (WeakMap) or values (WeakSet) weakly, so they do not prevent those objects from being garbage-collected. When no other reference to a key object exists, the engine can remove it and its entry automatically. Because entries can vanish at any time, keys must be objects (or non-registered symbols), and these collections are not iterable and have no size or clear.',
    points: [
      'Keys must be objects (or non-registered symbols), never strings/numbers',
      'Weak reference: the entry does not keep the key alive; GC can collect it',
      'No iteration, no size, no clear: only get/set/has/delete (WeakSet: add/has/delete)',
      'Use cases: caching/memoising per object, private data for instances, metadata on DOM nodes, tracking visited objects',
      'A normal Map would keep keys alive forever and leak memory',
    ],
    code: `const cache = new WeakMap();
function getArea(rect) {
  if (cache.has(rect)) return cache.get(rect);
  const area = rect.w * rect.h;
  cache.set(rect, area);
  return area;
}
let r = { w: 4, h: 5 };
console.log(getArea(r)); // 20 (computed)
console.log(getArea(r)); // 20 (from cache)
r = null; // entry is now eligible for garbage collection

const seen = new WeakSet();
const node = {};
seen.add(node);
console.log(seen.has(node)); // true`,
  },
  {
    id: 'je-7',
    level: 'mid',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'Symbol ek Aadhaar number jaisa hai. Do log ka naam same \'Rahul\' ho sakta hai, par Aadhaar number hamesha alag hota hai, isliye kabhi galti se mix nahi hota.',
      en: 'A Symbol is like an Aadhaar number. Two people can both be called \'Rahul\', but their Aadhaar numbers are always different, so they never get mixed up.',
      bn: 'Symbol হলো Aadhaar নম্বরের মতো। দুজনের নাম একই \'রাহুল\' হতে পারে, কিন্তু Aadhaar নম্বর সবসময় আলাদা, তাই কখনো গুলিয়ে যায় না।',
    },
    question: 'What is a Symbol and where is it used?',
    answer: 'A Symbol is a primitive whose every value is unique, created with Symbol(\'description\'); two symbols with the same description are never equal. Symbols are used as collision-free object keys that are skipped by for...in, Object.keys and JSON.stringify, and Symbol.for(key) gives shared symbols from a global registry. Well-known symbols like Symbol.iterator, Symbol.asyncIterator and Symbol.toPrimitive let you customise built-in language behaviour.',
    points: [
      'typeof Symbol() === \'symbol\'; created without new',
      'Unique: Symbol(\'a\') !== Symbol(\'a\'); Symbol.for(\'a\') === Symbol.for(\'a\')',
      'Symbol keys are hidden from Object.keys/for...in/JSON, but visible via Object.getOwnPropertySymbols or Reflect.ownKeys',
      'Not truly private, just non-colliding; use #private fields for real privacy',
      'Well-known symbols: Symbol.iterator, Symbol.toPrimitive, Symbol.hasInstance, Symbol.toStringTag',
    ],
    code: `const id = Symbol('id');
const user = { name: 'Ravi', [id]: 101 };
console.log(user[id]);                    // 101
console.log(Object.keys(user));           // ['name']
console.log(JSON.stringify(user));        // {"name":"Ravi"}
console.log(Symbol('a') === Symbol('a')); // false
console.log(Symbol.for('a') === Symbol.for('a')); // true

const price = {
  [Symbol.toPrimitive](hint) {
    return hint === 'number' ? 99 : '₹99';
  }
};
console.log(+price, \`\${price}\`);          // 99 ₹99`,
  },
  {
    id: 'je-8',
    level: 'mid',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'Iterator ek bank token machine jaisa hai. Har baar button (next) dabao to agla number milta hai, aur jab number khatam ho jaate hain to machine bolti hai \'done\'.',
      en: 'An iterator is like a token machine at a bank. Each time you press the button (next) you get the next number, and when the numbers run out the machine says \'done\'.',
      bn: 'Iterator হলো ব্যাংকের token মেশিনের মতো। প্রতিবার বোতাম (next) টিপলে পরের নম্বর পাও, আর নম্বর শেষ হলে মেশিন বলে \'done\'।',
    },
    question: 'What are iterators and the iterable protocol?',
    answer: 'An object is iterable if it has a [Symbol.iterator]() method that returns an iterator. An iterator is an object with a next() method returning { value, done }. for...of, spread, array destructuring, Array.from, new Map/Set and Promise.all all consume this protocol. Generator functions (function*) are the easiest way to create iterators, and they produce values lazily.',
    points: [
      'Iterable protocol: [Symbol.iterator]() returns an iterator',
      'Iterator protocol: next() returns { value, done }',
      'Built-in iterables: Array, String, Map, Set, arguments, NodeList, TypedArray; plain objects are not',
      'Generators (function*, yield) implement both protocols and allow lazy/infinite sequences',
      'Async version: Symbol.asyncIterator with for await...of',
    ],
    code: `const range = {
  from: 1, to: 3,
  [Symbol.iterator]() {
    let cur = this.from;
    const last = this.to;
    return {
      next: () => cur <= last
        ? { value: cur++, done: false }
        : { value: undefined, done: true }
    };
  }
};
console.log([...range]);   // [1, 2, 3]

function* evens() {
  let n = 0;
  while (true) { yield n; n += 2; }
}
const it = evens();
console.log(it.next().value, it.next().value); // 0 2`,
  },
  {
    id: 'je-9',
    level: 'junior',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'Named export ek dukaan ke menu jaisa hai jahan har item ka naam fix hai, naam lekar hi order karte ho. Default export dukaan ki \'special thali\' hai, jise tum kisi bhi naam se bula sakte ho.',
      en: 'Named exports are like a shop menu where every item has a fixed name and you order by that name. The default export is the shop\'s \'special thali\', which you can call by any name you like.',
      bn: 'Named export হলো দোকানের menu-র মতো, যেখানে প্রতিটা item-এর নাম ঠিক করা, নাম ধরে order দিতে হয়। Default export হলো দোকানের \'special থালি\', যাকে যে কোনো নামে ডাকতে পারো।',
    },
    question: 'ES modules vs CommonJS; default vs named exports.',
    answer: 'ES modules use static import/export that is analysed before execution, so bundlers can tree-shake; they load asynchronously, are strict mode by default, support top-level await and export live bindings. CommonJS uses require() and module.exports, loads synchronously at runtime and is the older Node.js format. A module can have many named exports (imported with the exact name or aliased with as) but only one default export, which can be imported under any name.',
    points: [
      'ESM: import/export, static structure, live bindings, top-level await, browser + Node native',
      'CJS: require/module.exports, synchronous and dynamic, Node legacy default',
      'In Node, ESM is enabled with .mjs or "type": "module" in package.json',
      'Named exports: many per file, exact names, better for tree shaking and refactoring',
      'Default export: one per file, any import name; many teams prefer named exports for consistency',
    ],
    code: `// math.js (ES module)
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default function multiply(a, b) { return a * b; }

// app.js
import mul, { add, PI as pi } from './math.js';
console.log(add(2, 3), mul(2, 3), pi); // 5 6 3.14

// CommonJS equivalent (math.cjs / app.cjs)
// module.exports = { add };
// const { add } = require('./math.cjs');`,
  },
  {
    id: 'je-10',
    level: 'fresher',
    topic: 'js-es6',
    difficulty: 'easy',
    simple: {
      hi: 'Socho teacher ke paas answer sheets ka dher hai. map har sheet pe marks likhna hai, filter sirf pass wali sheets alag karna, reduce sab marks jodkar total nikalna, find pehli topper sheet dhoondhna, some poochta hai \'koi fail hua?\' aur every poochta hai \'sab pass hue?\'.',
      en: 'Imagine a teacher with a pile of answer sheets. map writes marks on every sheet, filter keeps only the pass sheets, reduce adds all marks into one total, find picks the first topper\'s sheet, some asks \'did anyone fail?\' and every asks \'did everyone pass?\'.',
      bn: 'ভাবো টিচারের কাছে খাতার স্তূপ আছে। map প্রতিটা খাতায় নম্বর লেখা, filter শুধু পাস করা খাতা আলাদা করা, reduce সব নম্বর যোগ করে মোট বের করা, find প্রথম topper-এর খাতা খোঁজা, some জিজ্ঞেস করে \'কেউ ফেল করেছে?\' আর every জিজ্ঞেস করে \'সবাই পাস করেছে?\'।',
    },
    question: 'Array methods: map, filter, reduce, find, some, every.',
    answer: 'map returns a new array of the same length with each element transformed; filter returns a new array of elements that pass a test; reduce combines all elements into a single value using an accumulator. find returns the first matching element (or undefined); some returns true if at least one element passes and every returns true only if all pass, and both stop early. None of these mutate the original array.',
    points: [
      'map: transform 1-to-1, same length',
      'filter: keep items where callback returns truthy',
      'reduce: always pass an initial value; reduce on an empty array without one throws TypeError',
      'find/findIndex/findLast return first match or undefined / -1',
      'some/every short-circuit; on an empty array some is false and every is true',
    ],
    code: `const orders = [
  { item: 'Tea', price: 20, paid: true },
  { item: 'Vada Pav', price: 30, paid: false },
  { item: 'Samosa', price: 15, paid: true },
];
const names = orders.map(o => o.item);       // ['Tea', 'Vada Pav', 'Samosa']
const paid = orders.filter(o => o.paid);     // 2 orders
const total = orders.reduce((sum, o) => sum + o.price, 0); // 65
const vada = orders.find(o => o.item === 'Vada Pav');
const anyUnpaid = orders.some(o => !o.paid); // true
const allCheap = orders.every(o => o.price < 50); // true
console.log(names, paid.length, total, vada.price, anyUnpaid, allCheap);`,
  },
  {
    id: 'je-11',
    level: 'junior',
    topic: 'js-es6',
    difficulty: 'easy',
    simple: {
      hi: 'forEach ek peon jaisa hai jo har class mein jaakar notice padh deta hai, par wapas kuch nahi laata. map ek monitor jaisa hai jo har bachche se copy leta hai, check karta hai aur nayi checked copies ka bundle wapas laata hai.',
      en: 'forEach is like a peon who goes to every class and reads out a notice but brings nothing back. map is like a monitor who collects every student\'s copy, checks it, and brings back a new bundle of checked copies.',
      bn: 'forEach হলো একজন পিওনের মতো, যে প্রতিটা ক্লাসে গিয়ে notice পড়ে দেয়, কিন্তু কিছু ফেরত আনে না। map হলো মনিটরের মতো, যে সবার খাতা নেয়, দেখে, আর নতুন দেখা খাতার একটা বান্ডিল ফেরত আনে।',
    },
    question: 'forEach vs map.',
    answer: 'forEach runs a callback for each element purely for side effects and always returns undefined. map runs a callback for each element and returns a new array of the same length containing the callback results. Use map when you need a transformed array (it can be chained), and forEach (or for...of) when you just want to do something like logging or updating the DOM.',
    points: [
      'forEach returns undefined, so it cannot be chained',
      'map returns a new array; don\'t use map if you ignore the result',
      'Neither mutates the array by itself (the callback could)',
      'You cannot break out of forEach (except by throwing); use for...of, some or find instead',
      'Neither awaits async callbacks; use for...of with await or Promise.all(arr.map(...))',
    ],
    code: `const prices = [10, 20, 30];
const r1 = prices.forEach(p => p * 2);
console.log(r1);                  // undefined
const r2 = prices.map(p => p * 2);
console.log(r2);                  // [20, 40, 60]
console.log(prices);              // [10, 20, 30] (unchanged)
prices.forEach(p => console.log('Price:', p)); // side effect only`,
  },
  {
    id: 'je-12',
    level: 'junior',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'slice cake ki photo kheenchne jaisa hai, asli cake waisa hi rehta hai. splice asli cake se tukda kaat lena hai, cake badal jaata hai. sort cake ko hi rearrange karta hai, toSorted ek nayi plate mein sajaakar deta hai.',
      en: 'slice is like taking a photo of part of a cake: the real cake stays the same. splice is cutting a piece out of the real cake, so the cake changes. sort rearranges the original cake, while toSorted arranges a copy on a new plate.',
      bn: 'slice হলো কেকের একটা অংশের ছবি তোলার মতো, আসল কেক একই থাকে। splice হলো আসল কেক থেকে টুকরো কেটে নেওয়া, কেক বদলে যায়। sort আসল কেকটাই সাজায়, toSorted নতুন প্লেটে সাজিয়ে দেয়।',
    },
    question: 'slice vs splice; mutating vs non-mutating array methods (sort vs toSorted).',
    answer: 'slice(start, end) returns a shallow copy of a portion of the array without changing it; splice(start, deleteCount, ...items) changes the original array by removing/inserting items and returns the removed items. sort mutates the array in place (and by default compares items as strings), while ES2023\'s toSorted returns a new sorted array and leaves the original untouched. Non-mutating methods matter in Angular signals, OnPush and React state, where a new reference signals a change.',
    points: [
      'slice: non-mutating, end index excluded, negative indexes allowed',
      'splice: mutating, returns removed elements, can insert',
      'Mutating: push, pop, shift, unshift, splice, sort, reverse, fill, copyWithin',
      'Non-mutating: map, filter, slice, concat, toSorted, toReversed, toSpliced, with',
      'Default sort compares strings: [10, 1, 5].sort() gives [1, 10, 5]; pass (a, b) => a - b',
    ],
    code: `const a = [1, 2, 3, 4, 5];
console.log(a.slice(1, 3));      // [2, 3]  (a unchanged)
console.log(a.slice(-2));        // [4, 5]
const removed = a.splice(1, 2, 'x', 'y', 'z');
console.log(removed, a);         // [2, 3] [1, 'x', 'y', 'z', 4, 5]

const nums = [10, 1, 5];
const sorted = nums.toSorted((x, y) => x - y);
console.log(sorted, nums);       // [1, 5, 10] [10, 1, 5]
nums.sort((x, y) => x - y);
console.log(nums);               // [1, 5, 10]
console.log([10, 1, 5].sort());  // [1, 10, 5] (string compare)`,
  },
  {
    id: 'je-13',
    level: 'junior',
    topic: 'js-es6',
    difficulty: 'easy',
    simple: {
      hi: 'Socho tumhare paas dabbon ke andar dabbe hain (nested array). flat sab dabbe khol ke ek line mein rakh deta hai, includes poochta hai \'kya isme rasgulla hai?\', aur at(-1) seedha line ka aakhri item de deta hai, jaise train ka last dabba.',
      en: 'Imagine you have boxes inside boxes (a nested array). flat opens them and lines everything up in one row, includes asks \'is there a rasgulla here?\', and at(-1) directly gives you the last item, like the last coach of a train.',
      bn: 'ভাবো তোমার কাছে বাক্সের ভেতর বাক্স আছে (nested array)। flat সব বাক্স খুলে এক লাইনে রাখে, includes জিজ্ঞেস করে \'এখানে কি রসগোল্লা আছে?\', আর at(-1) সোজা শেষ item দেয়, যেমন ট্রেনের শেষ কামরা।',
    },
    question: 'Array.from, flat, flatMap, includes and at().',
    answer: 'Array.from creates a real array from an iterable or array-like (string, Set, Map, NodeList, { length }) and accepts an optional map function. flat(depth) flattens nested arrays (default depth 1, Infinity for all levels) and flatMap maps then flattens one level. includes checks whether a value exists using SameValueZero (so it finds NaN, unlike indexOf), and at(index) reads an element with support for negative indexes, e.g. at(-1) for the last item.',
    points: [
      'Array.from(iterable, mapFn): Array.from({ length: 3 }, (_, i) => i)',
      'flat() default depth is 1; flat(Infinity) flattens fully',
      'flatMap = map + flat(1); great for one-to-many mapping or filtering out items by returning []',
      'includes returns a boolean and handles NaN; indexOf returns an index and uses ===',
      'at(-1) replaces arr[arr.length - 1]; also works on strings and typed arrays',
    ],
    code: `console.log(Array.from('abc'));                         // ['a', 'b', 'c']
console.log(Array.from({ length: 3 }, (_, i) => i * 2)); // [0, 2, 4]
console.log([1, [2, [3, [4]]]].flat());                 // [1, 2, [3, [4]]]
console.log([1, [2, [3, [4]]]].flat(Infinity));         // [1, 2, 3, 4]
const words = ['hello world', 'hi'];
console.log(words.flatMap(s => s.split(' ')));          // ['hello', 'world', 'hi']
console.log([1, 2, NaN].includes(NaN));                 // true
console.log([1, 2, NaN].indexOf(NaN));                  // -1
console.log([10, 20, 30].at(-1));                       // 30`,
  },
  {
    id: 'je-14',
    level: 'mid',
    topic: 'js-es6',
    difficulty: 'medium',
    simple: {
      hi: 'Dynamic import ek shaadi ke caterer jaisa hai jo meetha sirf tab laata hai jab koi maange, shuru mein sab kuch nahi laata. Tree shaking packing ke time woh saare bartan nikaal dena hai jo kabhi use hi nahi honge.',
      en: 'Dynamic import is like a wedding caterer who brings the sweets only when someone asks for them, instead of carrying everything at the start. Tree shaking is removing all the utensils from the packing that will never be used.',
      bn: 'Dynamic import হলো বিয়েবাড়ির caterer-এর মতো, যে মিষ্টি তখনই আনে যখন কেউ চায়, শুরুতেই সব নিয়ে আসে না। Tree shaking হলো প্যাকিং-এর সময় সেই সব বাসন বাদ দেওয়া যা কখনো ব্যবহারই হবে না।',
    },
    question: 'Dynamic import() and tree shaking.',
    answer: 'Dynamic import() loads an ES module at runtime and returns a Promise of its module namespace, so bundlers split it into a separate chunk that downloads only when needed. This powers lazy loading, e.g. Angular routes with loadComponent/loadChildren and @defer blocks. Tree shaking is the bundler removing exports that are never imported; it relies on the static structure of import/export, so it works best with ES modules, side-effect-free code ("sideEffects": false in package.json) and named imports.',
    points: [
      'import(\'./x.js\') returns a Promise; works in classic scripts and modules',
      'Creates a separate lazily-loaded chunk -> smaller initial bundle, faster first load',
      'Angular: loadComponent: () => import(\'./admin.component\').then(m => m.AdminComponent)',
      'Tree shaking needs static ESM; CommonJS and code with top-level side effects are hard to shake',
      'Avoid importing whole libraries (import _ from \'lodash\'); import only what you use',
    ],
    code: `// utils.js
export function used() { return 'kept'; }
export function unused() { return 'dropped by tree shaking'; }

// main.js
import { used } from './utils.js';
console.log(used());

const btn = document.querySelector('#show-chart');
btn.addEventListener('click', async () => {
  const { renderChart } = await import('./chart.js'); // separate chunk
  renderChart();
});

// Angular route:
// { path: 'admin', loadComponent: () =>
//     import('./admin.component').then(m => m.AdminComponent) }`,
  },
  {
    id: 'jf-1',
    level: 'fresher',
    topic: 'js-functions',
    difficulty: 'easy',
    simple: {
      hi: 'Function declaration ek pehle se print hua school timetable jaisa hai, din shuru hote hi sabko pata hota hai. Function expression aur arrow function class mein board par baad mein likhe notice jaise hain, likhne ke baad hi padh sakte ho. Arrow function bas chhota aur short-cut wala notice hai.',
      en: 'A function declaration is like a school timetable printed in advance; everyone knows it from the start of the day. A function expression or arrow function is like a notice written on the board later; you can read it only after it is written. The arrow function is just a shorter notice.',
      bn: 'Function declaration হলো আগে থেকে ছাপানো স্কুলের রুটিনের মতো, দিনের শুরু থেকেই সবাই জানে। Function expression আর arrow function হলো পরে বোর্ডে লেখা নোটিশের মতো, লেখার পরেই পড়া যায়। Arrow function হলো শুধু একটা ছোট করে লেখা নোটিশ।',
    },
    question: 'Function declaration vs function expression vs arrow function.',
    answer: 'A function declaration (function add() {}) is fully hoisted, so it can be called before it appears in the code. A function expression assigns a function to a variable, so it can only be used after that line runs (with let/const it is in the temporal dead zone before that). An arrow function is a shorter expression syntax that has no own this, arguments, super or prototype and cannot be used with new.',
    points: [
      'Declarations are hoisted with their body; expressions are not',
      'Expressions can be anonymous or named (named helps stack traces and recursion)',
      'Arrow functions take this lexically from the surrounding scope',
      'Arrow functions cannot be constructors and have no arguments object',
      'Arrow functions allow implicit return: x => x * 2',
    ],
    code: `console.log(add(2, 3)); // 5 - declaration is hoisted

function add(a, b) { return a + b; }

const sub = function (a, b) { return a - b; }; // expression
const mul = (a, b) => a * b;                   // arrow, implicit return

console.log(sub(5, 2), mul(2, 3)); // 3 6`,
  },
  {
    id: 'jf-2',
    level: 'junior',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'Normal function ek naye cricket player jaisa hai jo jis team ke liye khele, usi team ki jersey pehen leta hai (this call se decide hota hai). Arrow function apne ghar ki team ki jersey hamesha pehne rehta hai, chahe kahin bhi khele. Isliye arrow ka this kabhi nahi badalta.',
      en: 'A normal function is like a cricket player who wears the jersey of whichever team he plays for (this depends on the call). An arrow function always wears the jersey of his home team, wherever he plays. So an arrow\'s this never changes.',
      bn: 'Normal function হলো এমন এক ক্রিকেট খেলোয়াড়ের মতো যে যে দলের হয়ে খেলে, সেই দলের জার্সি পরে (this কল থেকে ঠিক হয়)। Arrow function সবসময় নিজের পাড়ার দলের জার্সি পরে থাকে, যেখানেই খেলুক। তাই arrow-এর this কখনো বদলায় না।',
    },
    question: 'Arrow functions vs normal functions (this, arguments, new, methods).',
    answer: 'Normal functions get their this from how they are called, have their own arguments object and can be used as constructors with new. Arrow functions capture this (and arguments) lexically from the enclosing scope, cannot be called with new, have no prototype, and call/apply/bind cannot change their this. So arrows are great for callbacks inside methods, but should not be used as object methods or prototype methods that need this.',
    points: [
      'Arrow: lexical this, fixed at definition time',
      'Arrow: no own arguments - use rest parameters (...args)',
      'Arrow: new throws TypeError, no prototype property',
      'Using an arrow as an object method makes this the outer scope, not the object',
      'Arrows are ideal for setTimeout / array callbacks inside methods',
      'Arrows cannot be generators (no yield)',
    ],
    code: `const obj = {
  name: 'Asha',
  regular() { return this.name; },
  arrow: () => this === obj, // this comes from outer scope
  later() { setTimeout(() => console.log(this.name), 0); }
};

console.log(obj.regular()); // Asha
console.log(obj.arrow());   // false
obj.later();                // Asha (arrow keeps method's this)

const A = () => {};
try { new A(); } catch (e) { console.log(e instanceof TypeError); } // true`,
  },
  {
    id: 'jf-3',
    level: 'junior',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'Closure ek tiffin box jaisa hai. Function bahar chala jaata hai, par apne saath ghar ka khana (bahar ke variables) le jaata hai, aur baad mein bhi wo khana kha sakta hai.',
      en: 'A closure is like a tiffin box. The function goes out into the world but carries food from home (the outer variables), and can still eat it later.',
      bn: 'Closure হলো একটা টিফিন বাক্সের মতো। Function বাইরে চলে যায়, কিন্তু বাড়ির খাবার (বাইরের variables) সঙ্গে নিয়ে যায়, আর পরেও সেটা খেতে পারে।',
    },
    question: 'What is a closure? Give real use cases.',
    answer: 'A closure is a function bundled with references to the variables of the scope where it was created, so it can still read and update them after that outer function has returned. Every function in JavaScript forms a closure. It is used for data privacy (private state), factory functions, memoization caches, once/debounce/throttle helpers, event handlers and callbacks that remember context.',
    points: [
      'Inner function keeps access to outer variables after outer function returns',
      'Variables are captured by reference, not copied',
      'Use cases: private counters, module pattern, debounce/throttle, memoize, once',
      'Each call of the outer function creates a fresh closure scope',
      'Can cause memory retention if large objects are captured unnecessarily',
    ],
    code: `function createCounter() {
  let count = 0; // private - not reachable from outside
  return {
    inc: () => ++count,
    get: () => count
  };
}

const c1 = createCounter();
c1.inc(); c1.inc();
console.log(c1.get()); // 2

const c2 = createCounter();
console.log(c2.get()); // 0 - separate closure`,
  },
  {
    id: 'jf-4',
    level: 'junior',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'var ke saath poori class ek hi blackboard par roll number likhti hai, aur teacher end mein dekhti hai to sirf aakhri number dikhta hai. let ke saath har bacche ki apni alag copy hoti hai, isliye har ek ka apna number bacha rehta hai.',
      en: 'With var, the whole class writes roll numbers on one single blackboard, so when the teacher looks at the end, only the last number is visible. With let, every child has their own notebook, so each one keeps their own number.',
      bn: 'var-এর ক্ষেত্রে পুরো ক্লাস একটাই ব্ল্যাকবোর্ডে রোল নম্বর লেখে, তাই শেষে টিচার দেখলে শুধু শেষ নম্বরটাই দেখা যায়। let-এর ক্ষেত্রে প্রত্যেক বাচ্চার নিজের আলাদা খাতা থাকে, তাই সবার নিজের নম্বর থেকে যায়।',
    },
    question: 'The classic closure-in-a-loop problem: for (var i...) with setTimeout — why and how to fix?',
    answer: 'With var there is only one i for the whole function, and the setTimeout callbacks run after the loop has finished, so they all see the final value: the output is 3 3 3. Using let fixes it because let creates a new binding of i for every iteration, so each callback closes over its own value and the output is 0 1 2. Older fixes are wrapping the body in an IIFE that receives i, or passing i as the third argument of setTimeout.',
    points: [
      'var is function-scoped: one shared variable for all iterations',
      'Callbacks run after the loop ends (macrotasks), when i is already 3',
      'let creates a fresh binding per iteration -> 0 1 2',
      'Pre-ES6 fix: IIFE (function (j) {...})(i)',
      'Alternative: setTimeout(fn, 0, i) passes the value as an argument',
    ],
    code: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var', i), 0);
}
// var 3, var 3, var 3

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let', j), 0);
}
// let 0, let 1, let 2

for (var k = 0; k < 3; k++) {
  (function (x) { setTimeout(() => console.log('iife', x), 0); })(k);
}
// iife 0, iife 1, iife 2`,
  },
  {
    id: 'jf-5',
    level: 'mid',
    topic: 'js-functions',
    difficulty: 'hard',
    simple: {
      hi: 'this ek sawaal jaisa hai: \'yeh kaam kis ke liye ho raha hai?\' Jab dukaan ka naukar Sharma ji ke kehne par saamaan laata hai to \'this\' Sharma ji hain; jab koi aur bulata hai to woh banda. Arrow function wala naukar hamesha apne pehle maalik ke liye hi kaam karta hai.',
      en: 'this is the question \'who is this job being done for?\' When a shop helper fetches goods because Sharma ji called him, this is Sharma ji; when someone else calls, it is that person. The arrow-function helper always works for his original boss.',
      bn: 'this হলো এই প্রশ্নের মতো: \'কাজটা কার জন্য হচ্ছে?\' দোকানের কর্মচারী যখন শর্মাজির ডাকে জিনিস আনে, তখন this হলো শর্মাজি; অন্য কেউ ডাকলে সেই লোক। Arrow function-এর কর্মচারী সবসময় তার প্রথম মালিকের জন্যই কাজ করে।',
    },
    question: 'How does `this` work? Explain the binding rules (default, implicit, explicit, new, arrow).',
    answer: 'For normal functions, this is decided by how the function is called, not where it is defined. Precedence: new binding (this is the new object) > explicit binding with call/apply/bind > implicit binding (obj.method() makes this obj) > default binding (undefined in strict mode, globalThis in sloppy mode). Arrow functions ignore all these rules and use this from the enclosing lexical scope.',
    points: [
      'Default: plain call f() -> undefined in strict mode / modules / classes, globalThis otherwise',
      'Implicit: obj.f() -> this is obj; lost when the method is extracted (const g = obj.f)',
      'Explicit: f.call(x), f.apply(x), f.bind(x) -> this is x',
      'new: this is the freshly created object; new overrides bind\'s this',
      'Arrow: lexical this, cannot be changed by call/apply/bind',
    ],
    code: `'use strict';
function show() { return this?.name; }

const user = { name: 'Ravi', show };
console.log(user.show());                  // Ravi    (implicit)
console.log(show.call({ name: 'Priya' })); // Priya   (explicit)
const bound = show.bind({ name: 'Kiran' });
console.log(bound());                      // Kiran   (bind)

function Person(name) { this.name = name; }
console.log(new Person('Neha').name);      // Neha    (new)

const loose = user.show;
console.log(loose());                      // undefined (default, strict)`,
  },
  {
    id: 'jf-6',
    level: 'mid',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'call aur apply turant phone karke order dena hai: call mein items ek-ek karke bolte ho, apply mein poori list ek saath de dete ho. bind ek pehle se bhara hua order slip hai jo tum baad mein kabhi bhi dukaan par de sakte ho.',
      en: 'call and apply are like phoning the shop and ordering right now: with call you say items one by one, with apply you hand over the whole list at once. bind is a pre-filled order slip that you can give to the shop any time later.',
      bn: 'call আর apply হলো এখনই দোকানে ফোন করে অর্ডার দেওয়ার মতো: call-এ জিনিসগুলো একটা একটা করে বলো, apply-এ পুরো লিস্ট একসাথে দাও। bind হলো আগে থেকে ভরা একটা অর্ডার স্লিপ, যেটা পরে যেকোনো সময় দোকানে দেওয়া যায়।',
    },
    question: 'call vs apply vs bind.',
    answer: 'All three set this explicitly for a normal function. call invokes the function immediately with this and arguments passed one by one; apply invokes it immediately with arguments as an array (or array-like). bind does not invoke the function; it returns a new function with this (and optionally some leading arguments) permanently fixed, which is useful for callbacks and partial application.',
    points: [
      'call(thisArg, a, b) - invokes now, comma-separated args',
      'apply(thisArg, [a, b]) - invokes now, array of args',
      'bind(thisArg, a) - returns a new bound function, invoke later',
      'A bound function\'s this cannot be changed again by call/apply (only new overrides it)',
      'Spread (fn(...arr)) has mostly replaced apply in modern code',
      'None of them affect arrow functions\' this',
    ],
    code: `function greet(greeting, punct) {
  return \`\${greeting}, \${this.name}\${punct}\`;
}
const user = { name: 'Amit' };

console.log(greet.call(user, 'Hi', '!'));      // Hi, Amit!
console.log(greet.apply(user, ['Hello', '.'])); // Hello, Amit.

const hey = greet.bind(user, 'Hey'); // partial application
console.log(hey('?'));                // Hey, Amit?

console.log(Math.max.apply(null, [1, 5, 3])); // 5
console.log(Math.max(...[1, 5, 3]));          // 5 (modern)`,
  },
  {
    id: 'jf-7',
    level: 'fresher',
    topic: 'js-functions',
    difficulty: 'easy',
    simple: {
      hi: 'Callback woh phone number hai jo tum darzi ko dete ho: \'kapde ready ho jaayein to is number par call karna.\' Darzi ek higher-order function jaisa hai jo tumhara number (function) leta hai aur sahi waqt par use karta hai.',
      en: 'A callback is the phone number you give the tailor: \'call this number when my clothes are ready.\' The tailor is like a higher-order function: he takes your number (a function) and uses it at the right time.',
      bn: 'Callback হলো সেই ফোন নম্বর যেটা তুমি দর্জিকে দাও: \'জামা তৈরি হলে এই নম্বরে ফোন কোরো।\' দর্জি হলো higher-order function-এর মতো, যে তোমার নম্বর (function) নেয় আর ঠিক সময়ে সেটা ব্যবহার করে।',
    },
    question: 'What are higher-order functions and callbacks?',
    answer: 'A higher-order function is a function that takes another function as an argument, returns a function, or both; this is possible because functions are first-class values in JavaScript. A callback is the function you pass into another function so it can be called later, either synchronously (like in map) or asynchronously (like in setTimeout or an event listener).',
    points: [
      'Functions are first-class: can be stored, passed and returned',
      'Built-in HOFs: map, filter, reduce, forEach, sort, addEventListener',
      'Callback = function passed in to be called by someone else',
      'Callbacks can be sync (array methods) or async (timers, events)',
      'Returning functions enables factories, currying and closures',
    ],
    code: `const nums = [1, 2, 3, 4];

// filter and map are higher-order functions; the arrows are callbacks
const result = nums.filter(n => n % 2 === 0).map(n => n * 10);
console.log(result); // [20, 40]

// a HOF that returns a function
function multiplier(factor) {
  return n => n * factor;
}
const double = multiplier(2);
console.log(double(5)); // 10`,
  },
  {
    id: 'jf-8',
    level: 'mid',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'Currying chai banane jaisa hai: pehle paani daalo, phir patti, phir doodh, har step alag-alag. Jab saari cheezein aa jaati hain tabhi chai (result) ready hoti hai, aur beech mein ruk kar \'adhi bani chai\' kisi aur ke liye bhi istemaal kar sakte ho.',
      en: 'Currying is like making chai: first add water, then tea leaves, then milk, one step at a time. Only when everything is added is the chai (result) ready, and you can pause midway and reuse the half-made chai for someone else.',
      bn: 'Currying হলো চা বানানোর মতো: আগে জল, তারপর চা পাতা, তারপর দুধ, একটা একটা ধাপে। সব কিছু দেওয়া হলে তবেই চা (result) তৈরি হয়, আর মাঝপথে থেমে সেই আধা-বানানো চা অন্য কারো জন্যও ব্যবহার করা যায়।',
    },
    question: 'What is currying? Write a curried function.',
    answer: 'Currying transforms a function that takes several arguments, f(a, b, c), into a chain of functions that each take one argument, f(a)(b)(c). It is built on closures: each returned function remembers the arguments collected so far. It helps create reusable, specialised functions (for example a logger with a fixed level) and fits well with function composition.',
    points: [
      'f(a, b, c) becomes f(a)(b)(c)',
      'Relies on closures to remember earlier arguments',
      'Generic curry can use fn.length to know when all args are collected',
      'fn.length ignores default and rest parameters',
      'Partial application (fixing some args, e.g. bind) is related but not the same',
    ],
    code: `function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...next) => curried.apply(this, [...args, ...next]);
  };
}

const add3 = (a, b, c) => a + b + c;
const curriedAdd = curry(add3);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6

const add10 = curriedAdd(4)(6);
console.log(add10(5));            // 15`,
  },
  {
    id: 'jf-9',
    level: 'junior',
    topic: 'js-functions',
    difficulty: 'easy',
    simple: {
      hi: 'IIFE ek shaadi ke tent jaisa hai: turant lagaya, kaam hua, aur wahi khatam. Andar jo bhi saaman (variables) tha woh mohalle ki sadak par nahi bikhra, sab tent ke andar hi raha.',
      en: 'An IIFE is like a wedding tent: put up immediately, the event happens, and it is over. Whatever was inside (the variables) did not spill onto the neighbourhood road; it all stayed inside the tent.',
      bn: 'IIFE হলো বিয়েবাড়ির প্যান্ডেলের মতো: সঙ্গে সঙ্গে খাটানো হলো, অনুষ্ঠান হলো, আর সেখানেই শেষ। ভেতরের জিনিসপত্র (variables) পাড়ার রাস্তায় ছড়ায়নি, সব প্যান্ডেলের ভেতরেই থেকেছে।',
    },
    question: 'What is an IIFE and why was it used?',
    answer: 'An IIFE (Immediately Invoked Function Expression) is a function expression that is defined and executed right away, like (function () { ... })(). Before let/const and ES modules, it was the main way to create a private scope, avoid polluting the global namespace and build the module pattern with private variables. Today modules and block scope cover most of this, but IIFEs are still seen in legacy code, bundler output and async IIFEs for using await in non-module scripts.',
    points: [
      'Syntax: (function () {...})() or (() => {...})()',
      'Parentheses make it an expression so it can be invoked immediately',
      'Creates a private scope; variables do not leak to global',
      'Basis of the classic module pattern (revealing module)',
      'Modern replacements: ES modules and block scope; async IIFE still useful',
    ],
    code: `const counter = (function () {
  let count = 0; // private
  return { inc() { return ++count; } };
})();

console.log(counter.inc()); // 1
console.log(counter.inc()); // 2
console.log(typeof count);  // 'undefined' - not global

(async () => {
  const value = await Promise.resolve(42);
  console.log(value); // 42
})();`,
  },
  {
    id: 'jf-10',
    level: 'junior',
    topic: 'js-functions',
    difficulty: 'easy',
    simple: {
      hi: 'Pure function ek calculator jaisa hai: 2 + 2 dabao to hamesha 4 aata hai, aur woh tumhari copy mein kuch nahi likhta. Side effect wala function us dost jaisa hai jo jawab ke saath-saath tumhari copy mein kuch likh bhi deta hai.',
      en: 'A pure function is like a calculator: press 2 + 2 and you always get 4, and it never writes anything in your notebook. A function with side effects is like a friend who gives you the answer but also scribbles in your notebook.',
      bn: 'Pure function হলো ক্যালকুলেটরের মতো: 2 + 2 টিপলে সবসময় 4 আসে, আর সে তোমার খাতায় কিছু লেখে না। Side effect-ওয়ালা function হলো সেই বন্ধুর মতো যে উত্তর দেওয়ার সাথে সাথে তোমার খাতায় কিছু লিখেও দেয়।',
    },
    question: 'What are pure functions and side effects?',
    answer: 'A pure function always returns the same output for the same input and does not change anything outside itself. A side effect is any observable interaction with the outside world: mutating external variables or arguments, DOM updates, HTTP calls, logging, storage, or reading changing values like Date.now() and Math.random(). Pure functions are easy to test, cache and reason about; real apps need side effects, so we keep them isolated at the edges.',
    points: [
      'Pure = deterministic + no side effects',
      'Side effects: mutation, I/O, DOM, network, console, timers, randomness',
      'Pure functions are easy to unit test and memoize',
      'Return new objects/arrays instead of mutating inputs (immutability)',
      'Reducers, Angular pure pipes and computed() signals should be pure',
    ],
    code: `// pure
const add = (a, b) => a + b;
const addItem = (cart, item) => [...cart, item]; // does not mutate cart

// impure - depends on and changes outside state
let total = 0;
function addToTotal(x) {
  total += x;
  return total;
}

console.log(add(2, 3), add(2, 3));       // 5 5 (always same)
console.log(addToTotal(5), addToTotal(5)); // 5 10 (different!)`,
  },
  {
    id: 'jf-11',
    level: 'mid',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'Memoization pahade (multiplication tables) yaad karne jaisa hai. Pehli baar 12 x 13 calculate karna padta hai, par yaad ho jaane ke baad jab bhi koi poochhe, turant jawab de dete ho.',
      en: 'Memoization is like memorising times tables. The first time you have to work out 12 x 13, but once you remember it, you answer instantly whenever someone asks.',
      bn: 'Memoization হলো নামতা মুখস্থ করার মতো। প্রথমবার 12 x 13 হিসাব করতে হয়, কিন্তু মনে থাকার পর যখনই কেউ জিজ্ঞেস করে, সঙ্গে সঙ্গে উত্তর দিয়ে দাও।',
    },
    question: 'What is memoization? When is it useful?',
    answer: 'Memoization is an optimisation where a function caches its results keyed by its arguments, so repeated calls with the same input return the cached value instead of recomputing. It is useful for pure, expensive functions called repeatedly with the same inputs, such as recursive algorithms (Fibonacci, dynamic programming), heavy calculations or derived data. It trades memory for speed and is wrong for impure functions.',
    points: [
      'Cache results by input, usually in a Map or object',
      'Only safe for pure functions',
      'Classic win: fib goes from exponential to linear time',
      'Watch memory growth; consider LRU or WeakMap for object keys',
      'Multiple args need a cache key strategy (nested Map or serialisation)',
      'Angular computed() signals and pure pipes are built-in memoization',
    ],
    code: `function memoize(fn) {
  const cache = new Map();
  return function (n) {
    if (cache.has(n)) return cache.get(n);
    const result = fn.call(this, n);
    cache.set(n, result);
    return result;
  };
}

const fib = memoize(n => (n < 2 ? n : fib(n - 1) + fib(n - 2)));

console.log(fib(50)); // 12586269025 - instant`,
  },
  {
    id: 'jf-12',
    level: 'fresher',
    topic: 'js-functions',
    difficulty: 'easy',
    simple: {
      hi: 'Default parameter dhaba ke \'normal thali\' jaisa hai: tumne kuch nahi bataya to normal thali aa jaayegi. Rest parameter ek bada thaila hai jismein baaki saari sabziyan daal di jaati hain, aur arguments purane zamane ki potli hai jo poori tarah thaila jaisi kaam nahi karti.',
      en: 'A default parameter is like the dhaba\'s \'regular thali\': if you don\'t say anything, you get the regular one. A rest parameter is a big bag that holds all the remaining vegetables, and arguments is an old-style cloth bundle that doesn\'t fully work like a proper bag.',
      bn: 'Default parameter হলো ধাবার \'সাধারণ থালি\'-র মতো: তুমি কিছু না বললে সাধারণ থালিই আসবে। Rest parameter হলো একটা বড় থলে যেখানে বাকি সব সবজি রাখা হয়, আর arguments হলো পুরনো দিনের পুঁটলি যেটা ঠিক আসল থলের মতো কাজ করে না।',
    },
    question: 'Default parameters, rest parameters and the arguments object.',
    answer: 'Default parameters give a parameter a value when the argument is undefined (missing or explicitly undefined, but not null); they are evaluated at call time and can use earlier parameters. Rest parameters (...args) collect the remaining arguments into a real array and must be the last parameter. The arguments object is an older, array-like object of all passed arguments; it does not exist in arrow functions and rest parameters are preferred in modern code.',
    points: [
      'Defaults apply only for undefined, not for null',
      'Defaults can reference earlier params: (a, b = a * 2)',
      'Rest gives a real Array; only one rest param and it must be last',
      'arguments is array-like (no map/filter) and not available in arrows',
      'fn.length counts only params before the first default/rest',
    ],
    code: `function greet(name = 'Guest', msg = \`Hello \${name}\`) {
  return msg;
}
console.log(greet());          // Hello Guest
console.log(greet(undefined)); // Hello Guest
console.log(greet(null));      // Hello null

function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3)); // 6

function legacy() {
  return Array.from(arguments).join('-');
}
console.log(legacy(1, 2, 3)); // 1-2-3`,
  },
  {
    id: 'jf-13',
    level: 'mid',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'Function composition ek factory line jaisa hai: pehli machine aaloo dhoti hai, doosri kaat-ti hai, teesri tal-ti hai, aur end mein chips nikalte hain. pipe mein machines left se right chalti hain, compose mein list right se left padhi jaati hai.',
      en: 'Function composition is like a factory line: the first machine washes potatoes, the second slices them, the third fries them, and chips come out at the end. In pipe the machines run left to right; in compose the list is read right to left.',
      bn: 'Function composition হলো কারখানার লাইনের মতো: প্রথম মেশিন আলু ধোয়, দ্বিতীয়টা কাটে, তৃতীয়টা ভাজে, আর শেষে চিপস বেরোয়। pipe-এ মেশিন বাঁ থেকে ডানে চলে, compose-এ লিস্ট ডান থেকে বাঁয়ে পড়া হয়।',
    },
    question: 'What is function composition (compose / pipe)?',
    answer: 'Function composition combines small single-purpose functions into a new function where the output of one becomes the input of the next. compose(f, g, h)(x) applies right to left, f(g(h(x))), while pipe(h, g, f)(x) applies left to right, which usually reads more naturally. Both are easy to write with reduceRight and reduce, and the idea is the same one used by RxJS pipe().',
    points: [
      'compose: right-to-left, like mathematical f(g(x))',
      'pipe: left-to-right, reads like a data flow',
      'Works best with small, pure, single-argument (unary) functions',
      'Implemented with reduceRight / reduce',
      'RxJS observable.pipe(map(), filter()) uses the same concept',
    ],
    code: `const compose = (...fns) => x => fns.reduceRight((acc, f) => f(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, f) => f(acc), x);

const trim = s => s.trim();
const upper = s => s.toUpperCase();
const exclaim = s => s + '!';

console.log(pipe(trim, upper, exclaim)('  hi  '));    // HI!
console.log(compose(exclaim, upper, trim)('  hi  ')); // HI!`,
  },
  {
    id: 'jf-14',
    level: 'junior',
    topic: 'js-functions',
    difficulty: 'medium',
    simple: {
      hi: 'Recursion Russian doll ya ek dabbe ke andar chhota dabba kholne jaisa hai, jab tak sabse chhota dabba (base case) na mile. Agar dabbe bahut zyada ho jaayein to tumhare haath mein jagah khatam ho jaati hai, yahi stack overflow hai.',
      en: 'Recursion is like opening a box that has a smaller box inside, again and again, until you reach the smallest box (the base case). If there are far too many boxes, your hands run out of space to hold them, and that is a stack overflow.',
      bn: 'Recursion হলো একটা বাক্সের ভেতর ছোট বাক্স, তার ভেতর আরও ছোট বাক্স খোলার মতো, যতক্ষণ না সবচেয়ে ছোটটা (base case) পাওয়া যায়। বাক্স যদি অনেক বেশি হয়ে যায়, হাতে আর জায়গা থাকে না, এটাই stack overflow।',
    },
    question: 'What is recursion? What are its risks (stack overflow) and alternatives?',
    answer: 'Recursion is when a function calls itself to solve a smaller version of the same problem, and it must have a base case to stop. Every call adds a frame to the call stack, so very deep recursion throws RangeError: Maximum call stack size exceeded, and naive recursion can also repeat work (exponential time). Alternatives are converting to a loop, using an explicit stack/queue, memoization for repeated subproblems, or a trampoline; proper tail calls are in the spec but only Safari implements them, so don\'t rely on them.',
    points: [
      'Needs a base case and progress towards it',
      'Natural fit for trees, nested data, DOM, divide-and-conquer',
      'Each call uses a stack frame -> stack overflow on deep input',
      'Naive recursion (e.g. fib) can be exponential - memoize it',
      'Alternatives: iteration, explicit stack, trampoline',
      'Tail-call optimisation is not supported in V8/Node/Chrome',
    ],
    code: `function factorial(n) {
  if (n <= 1) return 1;        // base case
  return n * factorial(n - 1); // recursive case
}
console.log(factorial(5)); // 120

const depth = n => (n === 0 ? 0 : 1 + depth(n - 1));
try { depth(1e6); } catch (e) { console.log(e.name); } // RangeError

function sumTo(n) { // iterative - no stack risk
  let total = 0;
  for (let i = 1; i <= n; i++) total += i;
  return total;
}
console.log(sumTo(1e6)); // 500000500000`,
  },
  {
    id: 'jo-1',
    level: 'fresher',
    topic: 'js-objects',
    difficulty: 'easy',
    simple: {
      hi: 'Object banana roti banane jaisa hai — haath se seedha bana lo (literal), ek saancha/machine use karo (constructor ya class), ya maa ki purani roti dekh ke uske jaisi banao (Object.create). Tareeke alag hain, par roti har baar roti hi hai.',
      en: 'Creating an object is like making a roti — make it directly by hand (literal), use a mould or machine (constructor or class), or copy the style of mom\'s roti (Object.create). The methods differ, but it is always a roti in the end.',
      bn: 'Object বানানো রুটি বানানোর মতো — সরাসরি হাতে বানাও (literal), ছাঁচ বা মেশিন ব্যবহার করো (constructor বা class), অথবা মায়ের রুটি দেখে সেরকম বানাও (Object.create)। পদ্ধতি আলাদা, কিন্তু শেষে রুটি রুটিই।',
    },
    question: 'What are the different ways to create an object in JavaScript?',
    answer: 'The most common way is an object literal ({}). You can also use a constructor function with new, an ES6 class with new, Object.create(proto) to create an object with a specific prototype (or Object.create(null) for an object with no prototype), Object.fromEntries() to build from key-value pairs, a factory function that returns a literal, or new Object() (rarely used).',
    points: [
      'Object literal: const o = { a: 1 } — most common',
      'Constructor function + new',
      'ES6 class + new',
      'Object.create(proto) — sets the prototype explicitly; Object.create(null) has no prototype',
      'Factory function returning an object literal',
      'Object.fromEntries([[\'a\', 1]]) and new Object()',
    ],
    code: `const lit = { name: 'Asha' };

function Person(name) { this.name = name; }
const p1 = new Person('Ravi');

class Student { constructor(name) { this.name = name; } }
const s1 = new Student('Meena');

const proto = { greet() { return 'Hi ' + this.name; } };
const p2 = Object.create(proto);
p2.name = 'Kiran';

const makeUser = (name) => ({ name });
const fromPairs = Object.fromEntries([['name', 'Dev']]);

console.log(lit.name, p1.name, s1.name, p2.greet(), makeUser('Sam').name, fromPairs.name);`,
  },
  {
    id: 'jo-2',
    level: 'mid',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'Prototype chain parivaar jaisa hai. Agar aapko kisi recipe ka pata nahi, to aap maa se poochte ho, maa ko nahi pata to daadi se, aur daadi ko bhi nahi pata to \'pata nahi\' (undefined). Har bachcha khud sab nahi seekhta, parivaar se share karta hai.',
      en: 'The prototype chain is like a family. If you do not know a recipe, you ask your mother; if she does not know, she asks grandmother; and if grandmother does not know either, the answer is \'not known\' (undefined). Each child does not learn everything alone, it shares from the family.',
      bn: 'Prototype chain হলো একটা পরিবারের মতো। তুমি কোনো রান্নার রেসিপি না জানলে মাকে জিজ্ঞেস করো, মা না জানলে ঠাকুমাকে, আর ঠাকুমাও না জানলে উত্তর \'জানা নেই\' (undefined)। প্রতিটা বাচ্চা নিজে সব শেখে না, পরিবার থেকে share করে।',
    },
    diagram: 'prototype-chain',
    question: 'What is a prototype and the prototype chain?',
    answer: 'Every JavaScript object has an internal [[Prototype]] link to another object (or null). When you read a property that is not on the object itself, the engine looks it up on its prototype, then the prototype\'s prototype, and so on until it reaches null — this is the prototype chain. It is how inheritance works in JavaScript: methods like toString come from Object.prototype, and array methods come from Array.prototype. Functions have a .prototype property, which becomes the [[Prototype]] of objects created with new.',
    points: [
      'Each object has a hidden [[Prototype]] link (access with Object.getPrototypeOf)',
      'Property lookup walks up the chain until found or null',
      'Chain ends at Object.prototype, whose prototype is null',
      'F.prototype becomes the [[Prototype]] of new F() instances',
      'Methods on the prototype are shared, saving memory',
      'Writing a property creates it on the object itself (shadowing), it does not modify the prototype',
    ],
    code: `const animal = { eats: true, describe() { return 'eats: ' + this.eats; } };
const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks);       // true (own property)
console.log(dog.eats);        // true (from prototype)
console.log(dog.describe());  // 'eats: true'
console.log(Object.getPrototypeOf(dog) === animal);            // true
console.log(Object.getPrototypeOf(animal) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype));          // null
console.log(Object.hasOwn(dog, 'eats'));                       // false`,
  },
  {
    id: 'jo-3',
    level: 'mid',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'Classical inheritance ek factory ke naksha (blueprint) jaisa hai — har cheez naksha dekh ke banti hai. JavaScript mein bacche seedha bade bhai se seekhte hain (prototype link). ES6 class bas is purane tareeke pe naya sundar cover hai — andar wahi prototype hai.',
      en: 'Classical inheritance is like a factory blueprint — every item is made by looking at the plan. In JavaScript, children learn directly from their elder sibling (the prototype link). An ES6 class is just a nice new cover on this old method — inside, it is still prototypes.',
      bn: 'Classical inheritance হলো কারখানার নকশার (blueprint) মতো — প্রতিটা জিনিস নকশা দেখে বানানো হয়। JavaScript-এ বাচ্চারা সরাসরি বড় দাদার কাছ থেকে শেখে (prototype link)। ES6 class হলো এই পুরনো পদ্ধতির উপর একটা সুন্দর নতুন মলাট — ভেতরে সেই prototype-ই।',
    },
    question: 'Prototypal vs classical inheritance — are ES6 classes "real" classes?',
    answer: 'In classical inheritance (Java, C#) classes are blueprints and objects are instances copied from them. In prototypal inheritance, objects inherit directly from other objects through a live prototype link. ES6 classes are mostly syntactic sugar over constructor functions and prototypes — typeof a class is \'function\' and methods live on Class.prototype — so they are not classes in the Java sense. However they are not pure sugar either: classes must be called with new, are not initialised before their declaration (TDZ), run in strict mode, have non-enumerable methods, and support features like private #fields and super that are hard to replicate manually.',
    points: [
      'Classical: class is a blueprint; prototypal: objects link to other objects',
      'ES6 class compiles to a constructor function + prototype methods',
      'typeof MyClass === \'function\'',
      'Prototype links are live — adding to the prototype affects existing instances',
      'Differences from plain functions: must use new, TDZ, strict mode, non-enumerable methods, #private, super',
      'extends sets up the prototype chain between both the prototypes and the constructors',
    ],
    code: `class Animal {
  constructor(name) { this.name = name; }
  speak() { return this.name + ' makes a sound'; }
}
class Dog extends Animal {
  speak() { return super.speak() + ' (woof)'; }
}
const d = new Dog('Tommy');

console.log(typeof Animal);                                   // 'function'
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
console.log(d.speak());                                       // 'Tommy makes a sound (woof)'

Animal.prototype.sleep = function () { return 'zzz'; };
console.log(d.sleep());                                       // 'zzz' (live link)
try { Animal('x'); } catch (e) { console.log(e.name); }       // TypeError`,
  },
  {
    id: 'jo-4',
    level: 'junior',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'Class ek bank jaisa hai. constructor naya account kholta hai, static cheez bank ki apni hai (jaise total accounts ki ginti), getter/setter cashier window hai jahan se paisa check ya jama hota hai, aur #private locker hai jise sirf bank ke andar se khola ja sakta hai.',
      en: 'A class is like a bank. The constructor opens a new account, static things belong to the bank itself (like the count of all accounts), the getter/setter is the cashier window where you check or deposit money, and a #private field is the locker that can only be opened from inside the bank.',
      bn: 'Class হলো একটা ব্যাংকের মতো। constructor নতুন account খোলে, static জিনিস ব্যাংকের নিজের (যেমন মোট account-এর গোনা), getter/setter হলো ক্যাশিয়ারের জানালা যেখানে টাকা দেখা বা জমা হয়, আর #private হলো লকার যেটা শুধু ব্যাংকের ভেতর থেকেই খোলা যায়।',
    },
    question: 'ES6 classes: constructor, static members, getters/setters and private #fields.',
    answer: 'The constructor runs when you call new and initialises the instance. Static members (static method / static field) belong to the class itself, not to instances, and are called as ClassName.method(). Getters and setters (get / set) let you expose computed or validated properties that look like normal fields. Private fields and methods prefixed with # are truly private — accessible only inside the class body, and accessing them from outside is a SyntaxError — unlike TypeScript\'s private, which is only a compile-time check.',
    points: [
      'constructor(): runs on new, sets up instance fields; only one per class',
      'static: belongs to the class, e.g. Math-like helpers, counters, factory methods',
      'get/set: accessor properties with computed values or validation',
      '#field / #method(): hard private, enforced by the engine at runtime',
      'Public class fields can be declared without the constructor (count = 0)',
      'static { } blocks allow complex static initialisation; #x in obj checks for a private field',
    ],
    code: `class BankAccount {
  static count = 0;
  #balance = 0;                       // private field

  constructor(owner) {
    this.owner = owner;
    BankAccount.count++;
  }
  get balance() { return this.#balance; }
  set balance(v) {
    if (v < 0) throw new Error('Negative balance');
    this.#balance = v;
  }
  static create(owner) { return new BankAccount(owner); }
}

const acc = BankAccount.create('Priya');
acc.balance = 500;
console.log(acc.balance, BankAccount.count); // 500 1
console.log(acc.owner);                      // 'Priya'
// acc.#balance -> SyntaxError outside the class`,
  },
  {
    id: 'jo-5',
    level: 'junior',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'const ek steel ka tiffin hai jiska naam pe sticker laga hai — tiffin nahi badal sakte, par khana badal sakte ho. seal matlab dabba band, naya dabba add ya nikal nahi sakte, par andar ka khana badal sakte ho. freeze matlab poora tiffin seal-pack — kuch bhi nahi badlega.',
      en: 'const is a steel tiffin with your name sticker — you cannot swap the tiffin, but you can change the food. seal means the boxes are fixed — you cannot add or remove a box, but you can change the food inside. freeze means the whole tiffin is sealed and packed — nothing can change.',
      bn: 'const হলো নাম লেখা স্টিকার লাগানো স্টিলের টিফিন — টিফিন বদলানো যায় না, কিন্তু খাবার বদলানো যায়। seal মানে কৌটোগুলো ঠিক করা — নতুন কৌটো যোগ বা বাদ দেওয়া যায় না, কিন্তু ভেতরের খাবার বদলানো যায়। freeze মানে পুরো টিফিন সিল-প্যাক — কিছুই বদলাবে না।',
    },
    question: 'Object.freeze vs Object.seal vs const.',
    answer: 'const only prevents re-assigning the variable binding; the object it points to can still be changed. Object.seal prevents adding or deleting properties but allows changing the values of existing writable properties. Object.freeze prevents adding, deleting and changing properties — the object becomes fully read-only. Both seal and freeze are shallow: nested objects are not affected unless you freeze them recursively. Violations fail silently in sloppy mode and throw a TypeError in strict mode.',
    points: [
      'const: binding cannot be re-assigned; object is still mutable',
      'seal: no add/delete, but existing values can change',
      'freeze: no add/delete/change — read-only',
      'Both seal and freeze are shallow',
      'Strict mode throws TypeError; sloppy mode ignores silently',
      'Check with Object.isFrozen() / Object.isSealed()',
    ],
    code: `'use strict';
const sealed = Object.seal({ a: 1 });
sealed.a = 2;                        // allowed
try { sealed.b = 3; } catch (e) { console.log('seal add:', e.name); }   // TypeError

const frozen = Object.freeze({ a: 1, inner: { x: 1 } });
try { frozen.a = 2; } catch (e) { console.log('freeze change:', e.name); } // TypeError
frozen.inner.x = 99;                 // allowed — freeze is shallow
console.log(sealed.a, frozen.inner.x); // 2 99

const c = { n: 1 };
c.n = 2;                             // allowed with const
console.log(c.n);                    // 2`,
  },
  {
    id: 'jo-6',
    level: 'junior',
    topic: 'js-objects',
    difficulty: 'easy',
    simple: {
      hi: 'Object ek scorecard jaisa hai. Object.keys sirf khiladiyon ke naam deta hai, values sirf run, aur entries dono saath. for...in naam ginta hai aur parivaar (prototype) wale naam bhi le aata hai, jabki for...of ek line mein khade logon (iterable) ko ek-ek karke milta hai.',
      en: 'An object is like a scorecard. Object.keys gives only the player names, values gives only the runs, and entries gives both together. for...in counts names and also brings in names from the family (prototype), while for...of meets people standing in a queue (an iterable) one by one.',
      bn: 'Object হলো একটা স্কোরকার্ডের মতো। Object.keys শুধু খেলোয়াড়দের নাম দেয়, values শুধু রান, আর entries দুটোই একসাথে। for...in নাম গোনে আর পরিবারের (prototype) নামও নিয়ে আসে, যেখানে for...of লাইনে দাঁড়ানো লোকদের (iterable) একে একে দেখে।',
    },
    question: 'Object.keys/values/entries — and for...in vs for...of.',
    answer: 'Object.keys(), Object.values() and Object.entries() return arrays of an object\'s own enumerable string-keyed properties: keys, values and [key, value] pairs respectively. for...in iterates over enumerable property keys, including inherited ones from the prototype chain, so it is usually used with Object.hasOwn or avoided. for...of iterates over the values of an iterable (arrays, strings, Maps, Sets) and does not work on plain objects directly — combine it with Object.entries() instead.',
    points: [
      'Object.keys/values/entries: own, enumerable, string keys only (no Symbols)',
      'for...in: keys, includes inherited enumerable properties',
      'for...of: values of iterables (Array, String, Map, Set, arguments)',
      'Plain objects are not iterable: for...of on {} throws TypeError',
      'Use for (const [k, v] of Object.entries(obj)) for objects',
      'Avoid for...in on arrays — it gives string indices and possibly extra props',
    ],
    code: `const base = { inherited: true };
const scores = Object.create(base);
scores.virat = 80;
scores.rohit = 60;

console.log(Object.keys(scores));    // ['virat', 'rohit']
console.log(Object.values(scores));  // [80, 60]
console.log(Object.entries(scores)); // [['virat', 80], ['rohit', 60]]

for (const key in scores) console.log(key);   // virat, rohit, inherited
for (const [name, runs] of Object.entries(scores)) console.log(name, runs);
for (const ch of 'hi') console.log(ch);       // h, i`,
  },
  {
    id: 'jo-7',
    level: 'mid',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'Property descriptor school ke notice board ki settings jaisa hai. writable matlab notice badal sakte ho ya nahi, enumerable matlab sabko dikhta hai ya chhupa hai, configurable matlab principal us notice ko hata ya rules badal sakta hai ya nahi.',
      en: 'A property descriptor is like the settings of a school notice board. writable means whether the notice can be changed, enumerable means whether everyone can see it or it is hidden, and configurable means whether the principal can remove the notice or change its rules.',
      bn: 'Property descriptor হলো স্কুলের নোটিশ বোর্ডের settings-এর মতো। writable মানে নোটিশটা বদলানো যায় কিনা, enumerable মানে সবাই দেখতে পায় নাকি লুকানো, আর configurable মানে প্রিন্সিপাল নোটিশটা সরাতে বা নিয়ম বদলাতে পারেন কিনা।',
    },
    question: 'What are property descriptors? Object.defineProperty (writable, enumerable, configurable).',
    answer: 'Every property has a descriptor that controls its behaviour. A data descriptor has value, writable (can the value change), enumerable (does it show up in for...in / Object.keys / JSON.stringify) and configurable (can it be deleted or have its descriptor changed). An accessor descriptor uses get/set instead of value/writable. Properties created normally have all flags true, but Object.defineProperty defaults any omitted flag to false, which is a common gotcha.',
    points: [
      'Data descriptor: value, writable, enumerable, configurable',
      'Accessor descriptor: get, set, enumerable, configurable',
      'Normal assignment → all flags true',
      'defineProperty → omitted flags default to false',
      'Read with Object.getOwnPropertyDescriptor(obj, key)',
      'Used for hidden/read-only properties; Object.freeze sets writable and configurable to false',
    ],
    code: `const user = { name: 'Asha' };
Object.defineProperty(user, 'id', { value: 101 }); // flags default to false

console.log(Object.getOwnPropertyDescriptor(user, 'id'));
// { value: 101, writable: false, enumerable: false, configurable: false }

user.id = 999;                     // ignored (TypeError in strict mode)
console.log(user.id);              // 101
console.log(Object.keys(user));    // ['name'] — id is not enumerable

Object.defineProperty(user, 'upper', {
  get() { return this.name.toUpperCase(); },
  enumerable: true,
});
console.log(user.upper);           // 'ASHA'`,
  },
  {
    id: 'jo-8',
    level: 'mid',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'new ek naya school admission jaisa hai: pehle khaali file banti hai (naya object), phir use school ke rules se joda jaata hai (prototype), phir form bhara jaata hai (constructor chalta hai), aur aakhir mein bachche ko ID card mil jaata hai (object return).',
      en: 'new is like a new school admission: first an empty file is made (new object), then it is linked to the school rules (prototype), then the form is filled in (the constructor runs), and finally the child gets an ID card (the object is returned).',
      bn: 'new হলো স্কুলে নতুন ভর্তির মতো: প্রথমে একটা খালি ফাইল তৈরি হয় (নতুন object), তারপর সেটা স্কুলের নিয়মের সাথে যুক্ত হয় (prototype), তারপর ফর্ম পূরণ হয় (constructor চলে), আর শেষে বাচ্চা ID কার্ড পায় (object return হয়)।',
    },
    question: 'What happens step by step when you call a function with the new keyword?',
    answer: 'When you call new Fn(args): (1) a new empty object is created; (2) its [[Prototype]] is set to Fn.prototype; (3) Fn is called with this bound to the new object and the given arguments; (4) if Fn explicitly returns an object, that object is the result, otherwise the newly created object is returned automatically. Arrow functions and methods cannot be used with new because they have no [[Construct]] behaviour / prototype.',
    points: [
      '1. Create a new empty object',
      '2. Link its [[Prototype]] to Fn.prototype',
      '3. Run Fn with this = the new object',
      '4. Return the new object unless Fn returns its own object (primitive return values are ignored)',
      'Arrow functions cannot be called with new (TypeError)',
      'new.target lets a function detect if it was called with new',
    ],
    code: `function myNew(Fn, ...args) {
  const obj = Object.create(Fn.prototype);     // steps 1 + 2
  const result = Fn.apply(obj, args);          // step 3
  return result !== null && (typeof result === 'object' || typeof result === 'function')
    ? result : obj;                            // step 4
}

function Car(brand) { this.brand = brand; }
Car.prototype.drive = function () { return this.brand + ' is driving'; };

const c1 = myNew(Car, 'Tata');
const c2 = new Car('Maruti');
console.log(c1.drive(), c1 instanceof Car);  // 'Tata is driving' true
console.log(c2.drive());                     // 'Maruti is driving'`,
  },
  {
    id: 'jo-9',
    level: 'senior',
    topic: 'js-objects',
    difficulty: 'hard',
    simple: {
      hi: 'Proxy ek building ke security guard jaisa hai — har aane-jaane wale (get/set) ko pehle check karta hai, register mein likhta hai, aur galat aadmi ko rok deta hai. Reflect woh normal darwaza hai jisse guard check karne ke baad aapko andar bhej deta hai.',
      en: 'A Proxy is like the security guard of a building — he checks everyone coming and going (get/set), writes them in a register, and stops the wrong person. Reflect is the normal door through which the guard sends you in after checking.',
      bn: 'Proxy হলো একটা বিল্ডিংয়ের security guard-এর মতো — যে আসে-যায় (get/set) সবাইকে আগে check করে, খাতায় লিখে রাখে, আর ভুল লোককে আটকে দেয়। Reflect হলো সেই সাধারণ দরজা যেটা দিয়ে guard check করার পর তোমাকে ভেতরে পাঠায়।',
    },
    question: 'What are Proxy and Reflect? Give a practical use case.',
    answer: 'A Proxy wraps a target object and lets you intercept fundamental operations — get, set, has, deleteProperty, apply, construct and more — through handler functions called traps. Reflect is a built-in object with static methods that mirror each trap (Reflect.get, Reflect.set, ...), so inside a trap you can forward the default behaviour correctly, including the receiver. Practical uses include validation, logging/auditing, default values, read-only views, and reactivity systems — Vue 3\'s reactivity, for example, is built on Proxy.',
    points: [
      'Proxy(target, handler) — handler traps intercept operations',
      'Common traps: get, set, has, deleteProperty, apply, construct, ownKeys',
      'Reflect methods match traps 1:1 and return booleans instead of throwing',
      'Use Reflect inside traps to keep default behaviour and correct this/receiver',
      'Use cases: validation, logging, default values, reactivity (Vue 3), mocks',
      'Proxies add overhead and are not transparent to private #fields — avoid in hot paths',
    ],
    code: `const validator = {
  set(target, prop, value, receiver) {
    if (prop === 'age' && (!Number.isInteger(value) || value < 0)) {
      throw new TypeError('age must be a non-negative integer');
    }
    console.log('set ' + String(prop) + ' = ' + value);
    return Reflect.set(target, prop, value, receiver);
  },
  get(target, prop, receiver) {
    return prop in target ? Reflect.get(target, prop, receiver) : 'N/A';
  },
};

const person = new Proxy({}, validator);
person.age = 25;              // logs: set age = 25
console.log(person.age);      // 25
console.log(person.city);     // 'N/A'
try { person.age = -1; } catch (e) { console.log(e.message); }`,
  },
  {
    id: 'jo-10',
    level: 'junior',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'Do tiffin ka khana ek plate mein daalna merge jaisa hai — agar dono mein sabzi hai to baad wali sabzi pehle wali ko hata deti hai. Spread nayi plate leta hai, Object.assign pehli plate mein hi daal deta hai. Aur andar ke chhote dabbe mix nahi hote, poora dabba badal jaata hai.',
      en: 'Putting food from two tiffins onto one plate is like merging — if both have sabzi, the later sabzi replaces the first. Spread takes a new plate, Object.assign puts everything into the first plate itself. And the small inner boxes do not mix, the whole box gets replaced.',
      bn: 'দুটো টিফিনের খাবার একটা থালায় রাখা হলো merge-এর মতো — দুটোতেই তরকারি থাকলে পরেরটা আগেরটাকে সরিয়ে দেয়। Spread নতুন থালা নেয়, Object.assign প্রথম থালাতেই সব রেখে দেয়। আর ভেতরের ছোট কৌটোগুলো মেশে না, পুরো কৌটোটাই বদলে যায়।',
    },
    question: 'Object.assign vs spread — how do you merge objects, and what are the pitfalls?',
    answer: 'Both {...a, ...b} and Object.assign(target, a, b) copy own enumerable properties from left to right, so later sources overwrite earlier ones. Spread always creates a new object, while Object.assign mutates and returns its first argument — so use Object.assign({}, a, b) to avoid mutating a. A key difference is that Object.assign invokes setters on the target, whereas spread defines new properties. Pitfalls: both are shallow (nested objects are shared or replaced, not merged), they skip non-enumerable and inherited properties, and getters are evaluated into plain values.',
    points: [
      'Later sources override earlier ones',
      'Spread creates a new object; Object.assign mutates the target',
      'Object.assign triggers setters on the target; spread does not',
      'Both are shallow — nested objects are replaced, not deep-merged',
      'Only own enumerable properties are copied (Symbols included)',
      'For deep merge use structuredClone + custom logic or a library',
    ],
    code: `const defaults = { theme: 'light', layout: { sidebar: true, header: true } };
const userPrefs = { theme: 'dark', layout: { sidebar: false } };

const merged = { ...defaults, ...userPrefs };
console.log(merged.theme);   // 'dark'
console.log(merged.layout);  // { sidebar: false } — header lost (shallow)

const target = { a: 1 };
const result = Object.assign(target, { b: 2 });
console.log(result === target, target); // true { a: 1, b: 2 } (mutated)

const deepish = { ...defaults, layout: { ...defaults.layout, ...userPrefs.layout } };
console.log(deepish.layout); // { sidebar: false, header: true }`,
  },
  {
    id: 'jo-11',
    level: 'mid',
    topic: 'js-objects',
    difficulty: 'medium',
    simple: {
      hi: 'typeof sirf batata hai ki cheez kis \'type\' ki hai — jaise \'yeh phal hai\'. instanceof parivaar ka shajra (family tree) check karta hai — \'kya yeh bachcha Sharma parivaar ka hai?\' — aur papa, dada, pardada tak upar jaake dekhta hai.',
      en: 'typeof only tells you what \'type\' a thing is — like \'this is a fruit\'. instanceof checks the family tree — \'is this child from the Sharma family?\' — and goes up through father, grandfather and great-grandfather to check.',
      bn: 'typeof শুধু বলে জিনিসটা কোন \'type\'-এর — যেমন \'এটা একটা ফল\'। instanceof পরিবারের বংশতালিকা (family tree) check করে — \'এই বাচ্চাটা কি শর্মা পরিবারের?\' — আর বাবা, দাদু, প্রপিতামহ পর্যন্ত উপরে উঠে দেখে।',
    },
    question: 'instanceof vs typeof — how does instanceof work internally?',
    answer: 'typeof returns a string for the basic type of a value (\'string\', \'number\', \'object\', \'function\', etc.) and is best for primitives. instanceof checks whether an object was created by a constructor by walking the object\'s prototype chain and checking whether Constructor.prototype appears anywhere in it. It returns false for primitives, can be customised with Symbol.hasInstance, and can fail across realms (e.g. arrays from an iframe), which is why Array.isArray exists.',
    points: [
      'typeof → string type name; good for primitives, weak for objects',
      'instanceof → walks the prototype chain looking for Constructor.prototype',
      'Primitives: \'abc\' instanceof String is false',
      'Can be fooled by changing prototypes (Object.setPrototypeOf)',
      'Customisable via static [Symbol.hasInstance]',
      'Fails across realms/iframes — use Array.isArray or duck typing',
    ],
    code: `function myInstanceOf(obj, Ctor) {
  let proto = Object.getPrototypeOf(obj);
  while (proto !== null) {
    if (proto === Ctor.prototype) return true;
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

class Animal {}
class Dog extends Animal {}
const d = new Dog();

console.log(d instanceof Animal, myInstanceOf(d, Animal)); // true true
console.log(typeof d);                                     // 'object'
console.log('abc' instanceof String, typeof 'abc');        // false 'string'
console.log([] instanceof Object);                         // true`,
  },
  {
    id: 'jo-12',
    level: 'senior',
    topic: 'js-objects',
    difficulty: 'hard',
    simple: {
      hi: 'Inheritance aisa hai jaise poori joint family ka ghar virasat mein milna — kamra chahiye tha par saath mein saare rules aur jhagde bhi mil gaye. Composition LEGO blocks jaisa hai — jo chahiye wahi block jodo: tairna, udna, bolna. Isliye zyaadatar composition behtar hai.',
      en: 'Inheritance is like inheriting a whole joint-family house — you only wanted a room, but you also got all the rules and quarrels. Composition is like LEGO blocks — join only the blocks you need: swim, fly, speak. That is why composition is usually better.',
      bn: 'Inheritance হলো উত্তরাধিকারে পুরো যৌথ পরিবারের বাড়ি পাওয়ার মতো — তোমার শুধু একটা ঘর দরকার ছিল, কিন্তু সাথে সব নিয়ম আর ঝগড়াও পেলে। Composition হলো LEGO block-এর মতো — যেটা দরকার শুধু সেই block জোড়ো: সাঁতার, ওড়া, কথা বলা। তাই বেশিরভাগ সময় composition ভালো।',
    },
    question: 'Composition vs inheritance in JavaScript — which do you prefer and why?',
    answer: 'Inheritance models an \'is-a\' relationship through class hierarchies (extends); composition models a \'has-a\' or \'can-do\' relationship by building objects from smaller, independent pieces. I generally prefer composition because deep inheritance trees create tight coupling, the fragile base class problem and the \'gorilla-banana\' problem (you want a banana but get the whole jungle). Composition — via small functions, mixins/object spreading, or injecting collaborators (as Angular does with dependency injection) — is more flexible and easier to test. Inheritance is still fine for shallow, stable \'is-a\' hierarchies, such as extending a framework base class or Error.',
    points: [
      'Inheritance: is-a, extends, shares behaviour through the prototype chain',
      'Composition: has-a / can-do, assemble behaviour from small parts',
      'Deep hierarchies → tight coupling, fragile base class, hard to change',
      'Composition is more flexible, testable and avoids diamond-like problems',
      'In Angular: services injected via DI, standalone component imports, host directives = composition',
      'Use inheritance for shallow, stable hierarchies (e.g. class ValidationError extends Error)',
    ],
    code: `const canSwim = (state) => ({ swim: () => state.name + ' is swimming' });
const canFly  = (state) => ({ fly:  () => state.name + ' is flying' });
const canQuack = (state) => ({ quack: () => state.name + ' says quack' });

function createDuck(name) {
  const state = { name };
  return { ...state, ...canSwim(state), ...canFly(state), ...canQuack(state) };
}
function createFish(name) {
  const state = { name };
  return { ...state, ...canSwim(state) };
}

const duck = createDuck('Donald');
console.log(duck.fly(), '|', duck.quack());
console.log(createFish('Nemo').swim());
console.log('fly' in createFish('Nemo')); // false`,
  },
];
