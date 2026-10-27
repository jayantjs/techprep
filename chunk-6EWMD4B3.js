import{a as e}from"./chunk-YR3K2D3X.js";import"./chunk-MNCRUE4M.js";var t=[{id:"ra-1",level:"fresher",topic:"react-advanced",difficulty:"medium",simple:{hi:"Reconciliation ek teacher jaisa hai jo nayi aur purani attendance list milaata hai aur sirf jo badla hai wahi register mein theek karta hai - poora register dobara nahi likhta. Agar kisi bench par bilkul naya bachcha aa gaya ho, to uski poori entry nayi banti hai.",en:"Reconciliation is like a teacher comparing the new and old attendance lists and correcting only what changed in the register - she doesn't rewrite the whole register. If a totally new child sits on a bench, that entry is written fresh.",bn:"Reconciliation \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995 \u099F\u09BF\u099A\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09BF\u09A8\u09BF \u09A8\u09A4\u09C1\u09A8 \u0986\u09B0 \u09AA\u09C1\u09B0\u09A8\u09CB \u09B9\u09BE\u099C\u09BF\u09B0\u09BE \u0996\u09BE\u09A4\u09BE \u09AE\u09BF\u09B2\u09BF\u09AF\u09BC\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09AF\u09BE \u09AC\u09A6\u09B2\u09C7\u099B\u09C7 \u09B8\u09C7\u099F\u09C1\u0995\u09C1\u0987 \u09A0\u09BF\u0995 \u0995\u09B0\u09C7\u09A8 - \u09AA\u09C1\u09B0\u09CB \u0996\u09BE\u09A4\u09BE \u0986\u09AC\u09BE\u09B0 \u09B2\u09C7\u0996\u09C7\u09A8 \u09A8\u09BE\u0964 \u0995\u09CB\u09A8\u09CB \u09AC\u09C7\u099E\u09CD\u099A\u09C7 \u098F\u0995\u09A6\u09AE \u09A8\u09A4\u09C1\u09A8 \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u098F\u09B2\u09C7 \u09A4\u09BE\u09B0 \u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF \u09A8\u09A4\u09C1\u09A8 \u0995\u09B0\u09C7 \u09B2\u09C7\u0996\u09BE \u09B9\u09AF\u09BC\u0964"},question:"What is reconciliation in React and how does the diffing algorithm work?",answer:"Reconciliation is the process where React compares the new element tree returned by render with the previous one and works out the minimum DOM changes to apply. Because a perfect tree diff is O(n^3), React uses an O(n) heuristic: elements of a different type replace the whole subtree (state is lost), elements of the same type keep the DOM node and component state and only update changed props, and children in lists are matched by key. The work happens in an interruptible render phase (Fiber) followed by a synchronous commit phase that touches the DOM.",points:["Virtual DOM = plain JS objects describing the UI; the diff runs on these, not on the real DOM","Different type (div -> span, A -> B) => unmount old subtree, mount new one","Same type => keep the instance and state, patch only the changed attributes/props","Lists are matched by key; same component + different key = fresh instance","Render phase (pure, can be paused) vs commit phase (DOM updates, effects)"],code:`// Same type at the same position: DOM node and state are kept, only className changes
<input className={dark ? 'dark' : 'light'} />
// Different component types at the same position: old subtree destroyed, state lost
{isAdmin ? <AdminPanel /> : <UserPanel />}
// Same component, different key: treated as a brand-new instance (state reset)
<ProfileForm key={userId} userId={userId} />`},{id:"ra-2",level:"fresher",topic:"react-advanced",difficulty:"easy",simple:{hi:"Key ek school ke roll number jaisa hai. Agar bachchon ko bench number se pehchaanoge aur koi bachcha chhutti par chala gaya, to sab ek bench khisak jaayenge aur marks galat bachche ko mil jaayenge. Roll number (unique id) se pehchaanoge to galti nahi hogi.",en:"A key is like a roll number in school. If you identify children by bench number and one child is absent, everyone shifts one bench and marks go to the wrong child. Identify them by roll number (unique id) and there's no mix-up.",bn:"Key \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09B0\u09CB\u09B2 \u09A8\u09AE\u09CD\u09AC\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09A6\u09C7\u09B0 \u09AC\u09C7\u099E\u09CD\u099A \u09A8\u09AE\u09CD\u09AC\u09B0 \u09A6\u09BF\u09AF\u09BC\u09C7 \u099A\u09BF\u09A8\u09B2\u09C7, \u0995\u09C7\u0989 \u099B\u09C1\u099F\u09BF\u09A4\u09C7 \u0997\u09C7\u09B2\u09C7 \u09B8\u09AC\u09BE\u0987 \u098F\u0995 \u09AC\u09C7\u099E\u09CD\u099A \u09B8\u09B0\u09C7 \u09AF\u09BE\u09AC\u09C7 \u0986\u09B0 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09AD\u09C1\u09B2 \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u09AA\u09BE\u09AC\u09C7\u0964 \u09B0\u09CB\u09B2 \u09A8\u09AE\u09CD\u09AC\u09B0 (unique id) \u09A6\u09BF\u09AF\u09BC\u09C7 \u099A\u09BF\u09A8\u09B2\u09C7 \u09AD\u09C1\u09B2 \u09B9\u09AC\u09C7 \u09A8\u09BE\u0964"},question:"Why do keys matter when rendering lists, and why is using the array index as a key risky?",answer:"Keys tell React which list item is which between renders, so it can reorder, insert or remove DOM nodes and keep each item's state attached to the right data. If you use the index as key and items are inserted, deleted or sorted, the same key now points to a different item, so React reuses the wrong DOM node and component state (inputs show wrong text, animations jump) and does extra work. Use a stable, unique id from the data; the index is acceptable only for static lists that never reorder.",points:["Keys must be unique among siblings and stable across renders","Prefer database ids; don't generate keys with Math.random() or crypto.randomUUID() during render","Index keys break state of uncontrolled inputs / child components on insert, delete or sort","key is not passed as a prop to the component","Changing key on purpose remounts a component - a handy way to reset its state"],code:`// BAD: index as key. Delete the first todo and React keeps row 0's DOM and <input> state
// for what is now a different todo, so typed text appears next to the wrong item.
{todos.map((t, i) => (
  <li key={i}>{t.text} <input placeholder="note" /></li>
))}
// GOOD: stable unique id from the data
{todos.map((t) => (
  <li key={t.id}>{t.text} <input placeholder="note" /></li>
))}`},{id:"ra-3",level:"junior",topic:"react-advanced",difficulty:"medium",simple:{hi:"Re-render aisa hai jaise class monitor ne 'sab khade ho jao' bola to sab bachche khade ho jaate hain, chahe baat unse judi ho ya nahi. React.memo ek bachche ko kehta hai: 'pehle check karo, tumhara naam bola gaya ya nahi - nahi to baithe raho.'",en:"A re-render is like the class monitor saying 'everyone stand up' - all children stand, whether it concerns them or not. React.memo tells a child: 'first check if your name was actually called - if not, stay seated.'",bn:"Re-render \u09B9\u09B2\u09CB \u09AF\u09C7\u09A8 \u0995\u09CD\u09B2\u09BE\u09B8 \u09AE\u09A8\u09BF\u099F\u09B0 \u09AC\u09B2\u09B2 '\u09B8\u09AC\u09BE\u0987 \u09A6\u09BE\u0981\u09A1\u09BC\u09BE\u0993' - \u09B8\u09AC\u09BE\u0987 \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC, \u0995\u09A5\u09BE\u099F\u09BE \u09A4\u09BE\u09A6\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09BF\u09A4 \u09B9\u09CB\u0995 \u09AC\u09BE \u09A8\u09BE \u09B9\u09CB\u0995\u0964 React.memo \u098F\u0995\u099C\u09A8 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u0995\u09C7 \u09AC\u09B2\u09C7: '\u0986\u0997\u09C7 \u09A6\u09C7\u0996\u09CB \u09A4\u09CB\u09AE\u09BE\u09B0 \u09A8\u09BE\u09AE \u09A1\u09BE\u0995\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7 \u0995\u09BF\u09A8\u09BE - \u09A8\u09BE \u09B9\u09B2\u09C7 \u09AC\u09B8\u09C7 \u09A5\u09BE\u0995\u09CB\u0964'"},question:"What causes a React component to re-render, and how does React.memo help?",answer:"A component re-renders when its own state changes, when a context it reads changes, or when its parent re-renders - by default children re-render with the parent even if their props are identical. React.memo wraps a component so that, on a parent re-render, React shallow-compares the old and new props and skips rendering if they are equal. It only works if props are referentially stable, so inline objects, arrays and arrow functions must be memoised with useMemo/useCallback (or by the React Compiler).",points:["Triggers: state update, parent re-render, context value change (props changing alone isn't a trigger - the parent's render is)","Re-render != DOM update; React still diffs and may change nothing","React.memo does a shallow Object.is comparison of each prop; optional custom compare function","New {} / [] / () => {} each render breaks memo - stabilise with useMemo/useCallback","memo doesn't block re-renders from the component's own state or context","Measure with React DevTools Profiler before optimising"],code:`import { memo, useCallback, useState } from 'react';
const Row = memo(function Row({ item, onDelete }) {
  console.log('render row', item.id);
  return <li>{item.name} <button onClick={() => onDelete(item.id)}>x</button></li>;
});
export default function List({ items }) {
  const [count, setCount] = useState(0);
  // without useCallback a new function each render would make every Row re-render
  const handleDelete = useCallback((id) => console.log('delete', id), []);
  return (
    <>
      <button onClick={() => setCount(count + 1)}>Clicked {count}</button>
      <ul>{items.map((it) => <Row key={it.id} item={it} onDelete={handleDelete} />)}</ul>
    </>
  );
}
// Clicking the button re-renders List, but no "render row" logs appear.`},{id:"ra-4",level:"junior",topic:"react-advanced",difficulty:"easy",simple:{hi:"Code splitting ek shaadi ke khaane jaisa hai - saari dishes ek saath plate mein nahi daalte, mithai tab laate hain jab koi maange. Jab tak mithai aa rahi hai, Suspense 'bas aa raha hai' wala board dikhata hai.",en:"Code splitting is like food at a wedding - you don't pile every dish on the plate at once; sweets are brought when someone asks. While the sweets are coming, Suspense shows a 'coming soon' sign.",bn:"Code splitting \u09B9\u09B2\u09CB \u09AC\u09BF\u09AF\u09BC\u09C7\u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB - \u09B8\u09AC \u09AA\u09A6 \u098F\u0995\u09B8\u09BE\u09A5\u09C7 \u09AA\u09BE\u09A4\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09B9\u09AF\u09BC \u09A8\u09BE, \u09AE\u09BF\u09B7\u09CD\u099F\u09BF \u0986\u09A8\u09BE \u09B9\u09AF\u09BC \u09AF\u0996\u09A8 \u0995\u09C7\u0989 \u099A\u09BE\u09AF\u09BC\u0964 \u09AE\u09BF\u09B7\u09CD\u099F\u09BF \u0986\u09B8\u09BE \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 Suspense '\u098F\u0987 \u0986\u09B8\u099B\u09C7' \u09AC\u09CB\u09B0\u09CD\u09A1 \u09A6\u09C7\u0996\u09BE\u09AF\u09BC\u0964"},question:"How do you do code splitting in React with lazy and Suspense?",answer:"React.lazy takes a function that calls a dynamic import() and returns a component whose code is downloaded only when it is first rendered, so the bundler puts it in a separate chunk. You render it inside a <Suspense fallback={...}> boundary, which shows the fallback while the chunk loads. Typical places are route-level pages, heavy charts/editors and rarely opened modals; wrap with an error boundary to handle chunk-load failures.",points:["lazy(() => import('./Page')) - the module must have a default export (or map a named export)","Declare lazy components at module top level, not inside another component","Suspense shows the nearest fallback while loading; boundaries can be nested","Route-based splitting gives the biggest win; split heavy libraries too","Pair with an error boundary for network/chunk errors; preload on hover if needed"],code:`import { lazy, Suspense, useState } from 'react';
// Chart code goes into its own chunk, downloaded on first render only
const SalesChart = lazy(() => import('./SalesChart'));
// Named export? Map it to default:
// const Editor = lazy(() => import('./editors').then((m) => ({ default: m.Editor })));
export default function Dashboard() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button onClick={() => setShow(true)}>Show chart</button>
      {show && (
        <Suspense fallback={<p>Loading chart...</p>}>
          <SalesChart />
        </Suspense>
      )}
    </>
  );
}`},{id:"ra-5",level:"junior",topic:"react-advanced",difficulty:"medium",simple:{hi:"Error boundary ghar ke fuse jaisa hai. Ek kamre mein short circuit hua to sirf us kamre ki light jaati hai, poora ghar andhere mein nahi doobta. Par agar aap khud switch dabate waqt (event handler) galti karo, to fuse use nahi pakadta.",en:"An error boundary is like a fuse in a house. If one room has a short circuit, only that room goes dark, not the whole house. But mistakes made while you press a switch (event handler) are not caught by the fuse.",bn:"Error boundary \u09B9\u09B2\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u09AB\u09BF\u0989\u099C\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u098F\u0995\u099F\u09BE \u0998\u09B0\u09C7 \u09B6\u09B0\u09CD\u099F \u09B8\u09BE\u09B0\u09CD\u0995\u09BF\u099F \u09B9\u09B2\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C7\u0987 \u0998\u09B0\u09C7\u09B0 \u0986\u09B2\u09CB \u09AF\u09BE\u09AF\u09BC, \u09AA\u09C1\u09B0\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF \u0985\u09A8\u09CD\u09A7\u0995\u09BE\u09B0 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09B8\u09C1\u0987\u099A \u099F\u09C7\u09AA\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC (event handler) \u09AD\u09C1\u09B2 \u09B9\u09B2\u09C7 \u09AB\u09BF\u0989\u099C \u09B8\u09C7\u099F\u09BE \u09A7\u09B0\u09C7 \u09A8\u09BE\u0964"},question:"What are error boundaries, and what errors do they not catch?",answer:"An error boundary is a component that catches JavaScript errors thrown while rendering its children (and in their lifecycle methods/constructors), shows a fallback UI instead of unmounting the whole app, and lets you log the error. It is still written as a class with static getDerivedStateFromError and/or componentDidCatch; in function-component code people use the react-error-boundary package. It does not catch errors in event handlers, in async code like setTimeout or promises, during server-side rendering, or errors thrown inside the boundary itself.",points:["getDerivedStateFromError -> set state to show fallback; componentDidCatch -> log (with componentStack)","Not caught: event handlers, async callbacks, SSR, the boundary's own errors - use try/catch there","Place boundaries around independent widgets/routes so one failure doesn't blank the page","react-error-boundary gives <ErrorBoundary fallbackRender> and resetKeys","React 19 adds root options onCaughtError / onUncaughtError for central reporting"],code:`import { Component } from 'react';
export class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true }; // render the fallback next
  }
  componentDidCatch(error, info) {
    console.error(error, info.componentStack); // send to your logging service
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? <p>Something went wrong.</p>;
    return this.props.children;
  }
}
// usage
// <ErrorBoundary fallback={<p>Could not load comments</p>}>
//   <Comments />
// </ErrorBoundary>`},{id:"ra-6",level:"junior",topic:"react-advanced",difficulty:"medium",simple:{hi:"Portal ek school ke announcement jaisa hai jo principal ke office se banta hai par stage (body) par jaakar sunaaya jaata hai, taaki sab dekh sakein. Bolne wala ab bhi principal ka banda hai - jawab principal tak hi aata hai.",en:"A portal is like a school announcement prepared in the principal's office but read out on the main stage (body) so everyone can see it. The speaker still belongs to the principal's office - replies still go back to the principal.",bn:"Portal \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u0998\u09CB\u09B7\u09A3\u09BE\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7\u099F\u09BE \u09AA\u09CD\u09B0\u09BF\u09A8\u09CD\u09B8\u09BF\u09AA\u09BE\u09B2\u09C7\u09B0 \u0985\u09AB\u09BF\u09B8\u09C7 \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09B8\u09AC\u09BE\u0987 \u09AF\u09BE\u09A4\u09C7 \u09A6\u09C7\u0996\u09A4\u09C7 \u09AA\u09BE\u09AF\u09BC \u09A4\u09BE\u0987 \u09AE\u099E\u09CD\u099A\u09C7 (body) \u09AA\u09A1\u09BC\u09BE \u09B9\u09AF\u09BC\u0964 \u09AC\u0995\u09CD\u09A4\u09BE \u09A4\u09AC\u09C1 \u09AA\u09CD\u09B0\u09BF\u09A8\u09CD\u09B8\u09BF\u09AA\u09BE\u09B2\u09C7\u09B0 \u0985\u09AB\u09BF\u09B8\u09C7\u09B0\u0987 \u09B2\u09CB\u0995 - \u0989\u09A4\u09CD\u09A4\u09B0 \u09AA\u09CD\u09B0\u09BF\u09A8\u09CD\u09B8\u09BF\u09AA\u09BE\u09B2\u09C7\u09B0 \u0995\u09BE\u099B\u09C7\u0987 \u09AB\u09C7\u09B0\u09C7\u0964"},question:"What is a portal in React and when would you use one?",answer:"createPortal(children, domNode) renders children into a different DOM node, usually document.body, while keeping them in the same place in the React tree. It is used for modals, tooltips, dropdowns and toasts that must escape a parent's overflow: hidden, z-index or stacking context. Because the React tree is unchanged, context still works and events bubble to React ancestors, not to DOM ancestors.",points:["import { createPortal } from 'react-dom'","Solves CSS clipping/stacking issues (overflow hidden, z-index, transform parents)","Context, state and props behave as if the portal content were rendered in place","Synthetic events bubble through the React tree - a click in the portal reaches the parent's onClick","Handle accessibility yourself: focus management, aria-modal, Escape to close"],code:`import { useState } from 'react';
import { createPortal } from 'react-dom';
function Tooltip({ text }) {
  // rendered into <body>, so the parent's overflow: hidden can't clip it
  return createPortal(<div className="tooltip">{text}</div>, document.body);
}
export default function Card() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ overflow: 'hidden' }} onClick={() => console.log('Card saw the click')}>
      <button onClick={() => setShow((s) => !s)}>Info</button>
      {show && <Tooltip text="Clicks on me still bubble to Card's onClick" />}
    </div>
  );
}`},{id:"ra-7",level:"mid",topic:"react-advanced",difficulty:"medium",simple:{hi:"Ref ek TV remote jaisa hai. Remote se aap seedha TV (DOM element) ko 'on' ya 'volume up' bol sakte ho, bina poora ghar (re-render) hilaaye. useImperativeHandle aisa remote hai jisme sirf zaroori buttons hi diye gaye hain.",en:"A ref is like a TV remote. With it you can tell the TV (DOM element) directly to turn on or raise the volume, without disturbing the whole house (re-render). useImperativeHandle is a remote that has only the buttons you need.",bn:"Ref \u09B9\u09B2\u09CB \u099F\u09BF\u09AD\u09BF\u09B0 \u09B0\u09BF\u09AE\u09CB\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09B0\u09BF\u09AE\u09CB\u099F \u09A6\u09BF\u09AF\u09BC\u09C7 \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u099F\u09BF\u09AD\u09BF\u0995\u09C7 (DOM element) \u099A\u09BE\u09B2\u09C1 \u09AC\u09BE \u09AD\u09B2\u09BF\u0989\u09AE \u09AC\u09BE\u09A1\u09BC\u09BE\u09A4\u09C7 \u09AC\u09B2\u09BE \u09AF\u09BE\u09AF\u09BC, \u09AA\u09C1\u09B0\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF (re-render) \u09A8\u09BE \u09A8\u09BE\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7\u0964 useImperativeHandle \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u09B0\u09BF\u09AE\u09CB\u099F, \u09AF\u09BE\u09A4\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09A6\u09B0\u0995\u09BE\u09B0\u09BF \u09AC\u09CB\u09A4\u09BE\u09AE\u0997\u09C1\u09B2\u09CB\u0987 \u0986\u099B\u09C7\u0964"},question:"Explain refs in React: useRef, forwardRef, useImperativeHandle and the React 19 change of ref as a prop.",answer:"useRef returns a mutable { current } object that survives re-renders without causing one; it is used to access DOM nodes and to store values like timer ids. Previously a function component could only receive a ref from its parent via forwardRef; in React 19 ref is a normal prop for function components, so you destructure it directly and forwardRef is no longer needed (it will be deprecated). useImperativeHandle lets a component expose a small custom API (focus, play) instead of the raw DOM node.",points:["Changing ref.current does not re-render; don't read/write refs during render","DOM refs are set after commit - use them in effects or event handlers","React 19: function Input({ ref, ...props }) - no forwardRef; ref callbacks can return a cleanup function","useImperativeHandle(ref, () => ({ focus() {...} })) to expose a limited API","Prefer state/props; use refs as an escape hatch (focus, scroll, measuring, third-party widgets)"],code:`import { useImperativeHandle, useRef } from 'react';
// React 19: ref is a regular prop (older: const TextInput = forwardRef((props, ref) => ...))
function TextInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
// Expose only play/pause, not the whole <video> element
function VideoPlayer({ ref, src }) {
  const videoRef = useRef(null);
  useImperativeHandle(ref, () => ({
    play: () => videoRef.current.play(),
    pause: () => videoRef.current.pause(),
  }));
  return <video ref={videoRef} src={src} />;
}
export default function Form() {
  const inputRef = useRef(null);
  return (
    <>
      <TextInput ref={inputRef} placeholder="Name" />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}`},{id:"ra-8",level:"mid",topic:"react-advanced",difficulty:"hard",simple:{hi:"Concurrent rendering ek dhaba cook jaisa hai jo badi biryani (heavy render) bana raha hai, par koi sirf chai maange to biryani beech mein rok kar pehle chai de deta hai. useTransition bolta hai 'biryani baad mein chalegi', aur chai (typing) turant milti hai.",en:"Concurrent rendering is like a dhaba cook making a big biryani (heavy render) who pauses it to hand over a quick chai when someone asks. useTransition says 'the biryani can wait', so the chai (typing) is served immediately.",bn:"Concurrent rendering \u09B9\u09B2\u09CB \u09A7\u09BE\u09AC\u09BE\u09B0 \u09B0\u09BE\u0981\u09A7\u09C1\u09A8\u09BF\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7 \u09AC\u09A1\u09BC \u09AC\u09BF\u09B0\u09BF\u09AF\u09BC\u09BE\u09A8\u09BF (heavy render) \u09B0\u09BE\u0981\u09A7\u099B\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0995\u09C7\u0989 \u09B6\u09C1\u09A7\u09C1 \u099A\u09BE \u099A\u09BE\u0987\u09B2\u09C7 \u09AC\u09BF\u09B0\u09BF\u09AF\u09BC\u09BE\u09A8\u09BF \u09A5\u09BE\u09AE\u09BF\u09AF\u09BC\u09C7 \u0986\u0997\u09C7 \u099A\u09BE \u09A6\u09C7\u09AF\u09BC\u0964 useTransition \u09AC\u09B2\u09C7 '\u09AC\u09BF\u09B0\u09BF\u09AF\u09BC\u09BE\u09A8\u09BF \u09AA\u09B0\u09C7 \u09B9\u09B2\u09C7\u0993 \u099A\u09B2\u09AC\u09C7', \u09A4\u09BE\u0987 \u099A\u09BE (typing) \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What is concurrent rendering, and how do useTransition and useDeferredValue use it?",answer:"Concurrent rendering lets React prepare a new UI in the background and interrupt or abandon that work when something more urgent, like typing or clicking, happens, so the page stays responsive during heavy renders. useTransition marks a state update as non-urgent: startTransition(() => setTab(x)) keeps the current UI interactive, and isPending lets you show a hint; in React 19 the callback can be async (Actions). useDeferredValue gives you a lagging copy of a value so an expensive child can re-render with the old value first and catch up later.",points:["Enabled automatically with createRoot when you use concurrent features","Urgent updates (input value) vs transition updates (filtered list, tab content)","useTransition when you own the setState; useDeferredValue when you only receive the value","Transitions don't debounce network calls - they just make rendering interruptible","The slow child must be memoised (memo / React Compiler) for useDeferredValue to help","Suspense + transitions keep old content visible instead of showing a fallback again"],code:`import { memo, useDeferredValue, useState, useTransition } from 'react';
export function Tabs() {
  const [tab, setTab] = useState('home');
  const [isPending, startTransition] = useTransition();
  const select = (next) => startTransition(() => setTab(next)); // interruptible render
  return (
    <>
      <button onClick={() => select('posts')}>Posts {isPending && '...'}</button>
      {tab === 'posts' ? <SlowPosts /> : <p>Home</p>}
    </>
  );
}
export function Search({ query }) {
  const deferredQuery = useDeferredValue(query); // lags behind while the user types
  const isStale = query !== deferredQuery;
  return (
    <div style={{ opacity: isStale ? 0.5 : 1 }}>
      <SlowResults query={deferredQuery} />
    </div>
  );
}
const SlowResults = memo(function SlowResults({ query }) { /* expensive list */ return <p>{query}</p>; });`},{id:"ra-9",level:"mid",topic:"react-advanced",difficulty:"medium",simple:{hi:"SSR ek ready-made thali jaisa hai jo server kitchen se sajaakar aati hai - turant dikhti hai. Hydration tab hai jab waiter aakar chammach aur pani rakhta hai, taaki aap khaana shuru (click, type) kar sako. Mismatch tab hota hai jab menu card mein kuch aur likha ho aur thali mein kuch aur aaye.",en:"SSR is like a ready thali served from the server kitchen - you see it immediately. Hydration is when the waiter brings the spoon and water so you can actually start eating (click, type). A mismatch is when the menu card says one thing and the thali has something else.",bn:"SSR \u09B9\u09B2\u09CB \u09B8\u09BE\u09B0\u09CD\u09AD\u09BE\u09B0\u09C7\u09B0 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0 \u09A5\u09C7\u0995\u09C7 \u09B8\u09BE\u099C\u09BF\u09AF\u09BC\u09C7 \u0986\u09B8\u09BE \u09B0\u09C7\u09A1\u09BF\u09AE\u09C7\u09A1 \u09A5\u09BE\u09B2\u09BF\u09B0 \u09AE\u09A4\u09CB - \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 Hydration \u09B9\u09B2\u09CB \u09AF\u0996\u09A8 \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0 \u099A\u09BE\u09AE\u099A \u0986\u09B0 \u099C\u09B2 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC, \u09AF\u09BE\u09A4\u09C7 \u0996\u09BE\u0993\u09AF\u09BC\u09BE (click, type) \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 Mismatch \u09B9\u09AF\u09BC \u09AF\u0996\u09A8 \u09AE\u09C7\u09A8\u09C1 \u0995\u09BE\u09B0\u09CD\u09A1\u09C7 \u098F\u0995 \u099C\u09BF\u09A8\u09BF\u09B8 \u09B2\u09C7\u0996\u09BE \u0986\u09B0 \u09A5\u09BE\u09B2\u09BE\u09AF\u09BC \u0986\u09B8\u09C7 \u0985\u09A8\u09CD\u09AF \u0995\u09BF\u099B\u09C1\u0964"},question:"Explain CSR, SSR, SSG and hydration. What is a hydration mismatch?",answer:"With client-side rendering (CSR) the browser gets an almost empty HTML and JavaScript builds the UI. Server-side rendering (SSR) renders HTML on the server per request, and static site generation (SSG) renders it once at build time; both give faster first paint and better SEO. Hydration is when React on the client (hydrateRoot) attaches event handlers and state to that existing HTML instead of re-creating it. A hydration mismatch happens when the first client render differs from the server HTML, for example because of Date.now(), Math.random(), window checks or locale formatting; React warns and may re-render that part on the client.",points:["CSR: simple hosting, slower first paint, weaker SEO","SSR: fresh per request (personalised pages); SSG: fastest, for content that rarely changes; ISR revalidates static pages","Hydration needs the JS bundle - page is visible before it is interactive","Streaming SSR (renderToPipeableStream + Suspense) sends HTML in chunks and hydrates selectively","Avoid mismatches: same data on both sides, browser-only values in useEffect, suppressHydrationWarning for unavoidable text"],code:`// client entry: reuse the server HTML instead of rendering from scratch
import { hydrateRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
hydrateRoot(document.getElementById('root'), <App />);
// Mismatch: the server's time differs from the browser's time
function Clock() {
  return <p>{new Date().toLocaleTimeString()}</p>;
}
// Fix: render the same placeholder on both sides, fill in after hydration
function ClockFixed() {
  const [time, setTime] = useState(null);
  useEffect(() => setTime(new Date().toLocaleTimeString()), []);
  return <p>{time ?? '--:--'}</p>;
}
// server (Node): renderToPipeableStream(<App />, { bootstrapScripts: ['/main.js'],
//   onShellReady() { pipe(res); } }) from 'react-dom/server'`},{id:"ra-10",level:"senior",topic:"react-advanced",difficulty:"hard",simple:{hi:"Server Component restaurant ki kitchen jaisa hai - khaana wahin banta hai aur sirf taiyaar plate aapki table par aati hai, kitchen ke bartan nahi. Client Component table par rakhe ketchup jaisa hai, jise aap khud daba kar use karte ho (click, state).",en:"A Server Component is like a restaurant kitchen - the food is cooked there and only the ready plate comes to your table, not the kitchen utensils. A Client Component is like the ketchup bottle on your table that you squeeze yourself (click, state).",bn:"Server Component \u09B9\u09B2\u09CB \u09B0\u09C7\u09B8\u09CD\u099F\u09C1\u09B0\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB - \u0996\u09BE\u09AC\u09BE\u09B0 \u09B8\u09C7\u0996\u09BE\u09A8\u09C7\u0987 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE \u09B9\u09AF\u09BC, \u09A4\u09CB\u09AE\u09BE\u09B0 \u099F\u09C7\u09AC\u09BF\u09B2\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09A4\u09C8\u09B0\u09BF \u09AA\u09CD\u09B2\u09C7\u099F \u0986\u09B8\u09C7, \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u09B0 \u09AC\u09BE\u09B8\u09A8 \u09A8\u09AF\u09BC\u0964 Client Component \u09B9\u09B2\u09CB \u099F\u09C7\u09AC\u09BF\u09B2\u09C7 \u09B0\u09BE\u0996\u09BE \u0995\u09C7\u099A\u09BE\u09AA\u09C7\u09B0 \u09AC\u09CB\u09A4\u09B2\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7\u099F\u09BE \u09A4\u09C1\u09AE\u09BF \u09A8\u09BF\u099C\u09C7 \u099A\u09C7\u09AA\u09C7 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09CB (click, state)\u0964"},question:"What are React Server Components, and how do server and client components work together in the Next.js App Router?",answer:"React Server Components (RSC) run only on the server (at build or request time); they can be async, read databases or secrets directly, and send their rendered output to the client without shipping their JavaScript. In the Next.js App Router every component is a Server Component by default; you add 'use client' at the top of a file to make it and its imports Client Components, which can use state, effects and browser APIs and are hydrated. Server Components can render Client Components and pass them serialisable props or other server-rendered JSX as children, and Server Functions marked 'use server' handle mutations from forms.",points:["Server Components: no useState/useEffect/event handlers, but can be async and access the backend directly","'use client' marks a boundary - everything imported below it ships to the browser","Props from server to client must be serialisable (no functions, except Server Functions)","Pattern: keep pages/layouts on the server, push 'use client' down to small interactive leaves","Pass server components as children into client components to avoid pulling them into the bundle","Streaming with Suspense / loading.js; mutations via Server Functions ('use server') + revalidation"],code:`// app/products/page.tsx - Server Component (default)
import { db } from '@/lib/db';
import AddToCart from './AddToCart';
export default async function ProductsPage() {
  const products = await db.product.findMany(); // runs on the server only
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.name} <AddToCart id={p.id} /></li>
      ))}
    </ul>
  );
}
// app/products/AddToCart.tsx - Client Component
'use client';
import { useState } from 'react';
export default function AddToCart({ id }: { id: string }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>{added ? 'Added' : \`Add \${id}\`}</button>;
}`},{id:"ra-11",level:"senior",topic:"react-advanced",difficulty:"hard",simple:{hi:"React Compiler ek smart class monitor jaisa hai jo khud yaad rakhta hai ki kaunse sawaal ka jawab pehle hi nikal chuka hai, taaki teacher (React) ko dobara solve na karna pade. Pehle yeh kaam har bachche ko khud notebook mein likhna padta tha (useMemo, useCallback).",en:"The React Compiler is like a smart class monitor who remembers which answers were already worked out, so the teacher (React) doesn't solve them again. Earlier every child had to write this down in their own notebook (useMemo, useCallback).",bn:"React Compiler \u09B9\u09B2\u09CB \u098F\u0995 \u099A\u09BE\u09B2\u09BE\u0995 \u0995\u09CD\u09B2\u09BE\u09B8 \u09AE\u09A8\u09BF\u099F\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7 \u09A8\u09BF\u099C\u09C7\u0987 \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09C7 \u0995\u09CB\u09A8 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 \u0986\u0997\u09C7\u0987 \u09AC\u09C7\u09B0 \u09B9\u09AF\u09BC\u09C7 \u0997\u09C7\u099B\u09C7, \u09AF\u09BE\u09A4\u09C7 \u099F\u09BF\u099A\u09BE\u09B0\u0995\u09C7 (React) \u0986\u09AC\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 \u09A8\u09BE \u09B9\u09AF\u09BC\u0964 \u0986\u0997\u09C7 \u098F\u099F\u09BE \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u0995\u09C7 \u09A8\u09BF\u099C\u09C7\u09B0 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09BF\u0996\u09C7 \u09B0\u09BE\u0996\u09A4\u09C7 \u09B9\u09A4\u09CB (useMemo, useCallback)\u0964"},question:"What is the React Compiler, and do we still need useMemo, useCallback and React.memo?",answer:"The React Compiler is a build-time tool (a Babel plugin, also integrated into frameworks like Next.js and Vite setups) that analyses components and hooks and automatically memoises values, callbacks and JSX, so unchanged parts skip re-rendering without manual useMemo/useCallback/React.memo. It relies on code following the Rules of React - pure render, no mutation of props/state, hooks rules - and skips or bails out of code it cannot prove safe. Manual memo hooks are mostly unnecessary in new code, but remain valid as escape hatches, for example to keep an effect dependency stable on purpose; the compiler also does not fix slow algorithms, huge lists that need virtualization, or poor state placement.",points:["Build-time auto-memoisation, often more granular than hand-written memoisation","Requires the Rules of React; the eslint-plugin-react-hooks compiler rules flag violations","Opt out per component/hook with the 'use no memo' directive; can be adopted incrementally","Existing useMemo/useCallback keep working; don't rush to delete them, measure first","Still need: virtualization, colocating state, splitting contexts, efficient algorithms"],code:`// You write plain code...
function ProductList({ products, filter, onSelect }) {
  const visible = products.filter((p) => p.category === filter);
  const handleClick = (id) => onSelect(id);
  return visible.map((p) => <Row key={p.id} product={p} onClick={handleClick} />);
}
// ...the compiler caches \`visible\`, \`handleClick\` and the JSX, recomputing only
// when products / filter / onSelect change - like hand-written useMemo + useCallback + memo.
// Opt a component out if it breaks the Rules of React
function LegacyWidget() {
  'use no memo';
  return <div />;
}
// vite.config.js
// plugins: [react({ babel: { plugins: ['babel-plugin-react-compiler'] } })]`},{id:"ra-12",level:"senior",topic:"react-advanced",difficulty:"medium",simple:{hi:"RTL test aisa hai jaise naya customer ban kar dukaan check karna - aap shelf ke andar ka hisaab nahi dekhte, bas button dabate ho aur dekhte ho ki sahi saamaan mila ya nahi. Vitest woh supervisor hai jo saare checks chalaata hai aur result batata hai.",en:"An RTL test is like checking a shop as a new customer - you don't look at the shop's internal accounts, you just press the button and see if you got the right item. Vitest is the supervisor who runs all the checks and reports the result.",bn:"RTL test \u09B9\u09B2\u09CB \u09A8\u09A4\u09C1\u09A8 \u0996\u09A6\u09CD\u09A6\u09C7\u09B0 \u09B8\u09C7\u099C\u09C7 \u09A6\u09CB\u0995\u09BE\u09A8 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB - \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u09AD\u09C7\u09A4\u09B0\u09C7\u09B0 \u09B9\u09BF\u09B8\u09BE\u09AC \u09A6\u09C7\u0996\u09CB \u09A8\u09BE, \u09B6\u09C1\u09A7\u09C1 \u09AC\u09CB\u09A4\u09BE\u09AE \u099F\u09BF\u09AA\u09C7 \u09A6\u09C7\u0996\u09CB \u09A0\u09BF\u0995 \u099C\u09BF\u09A8\u09BF\u09B8 \u09AA\u09C7\u09B2\u09C7 \u0995\u09BF\u09A8\u09BE\u0964 Vitest \u09B9\u09B2\u09CB \u09B8\u09C7\u0987 \u09B8\u09C1\u09AA\u09BE\u09B0\u09AD\u09BE\u0987\u099C\u09BE\u09B0, \u09AF\u09C7 \u09B8\u09AC \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE \u099A\u09BE\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AB\u09B2\u09BE\u09AB\u09B2 \u099C\u09BE\u09A8\u09BE\u09AF\u09BC\u0964"},question:"How do you test React components with React Testing Library and Vitest (or Jest), including async data loading?",answer:"React Testing Library (RTL) renders a component into a jsdom DOM and encourages testing behaviour the way a user sees it: query by role, label or text, interact with user-event, and assert on what appears, not on internal state. Vitest (or Jest) is the test runner that provides test/expect, mocking (vi.fn, vi.spyOn) and the jsdom environment. For async UI you mock the network (vi.spyOn on fetch or MSW), trigger the action, and use findBy* or waitFor, which retry until the element appears.",points:["Query priority: getByRole > getByLabelText > getByText > getByTestId","getBy throws if missing, queryBy returns null (for 'not present'), findBy is async and waits","userEvent.setup() + await user.click/type simulates real user interactions","Mock at the network edge (MSW or fetch spy), not the component's internals","jest-dom matchers (toBeInTheDocument, toBeDisabled) via a setup file; restore mocks after each test","Wrap providers (router, query client, store) in a custom render helper"],code:`// UserGreeting.test.jsx  (Vitest, environment: 'jsdom', jest-dom in setup file)
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, test, vi } from 'vitest';
import UserGreeting from './UserGreeting';
afterEach(() => vi.restoreAllMocks());
test('shows the user after clicking Load', async () => {
  vi.spyOn(globalThis, 'fetch').mockResolvedValue(
    new Response(JSON.stringify({ name: 'Priya' }), { status: 200 })
  );
  const user = userEvent.setup();
  render(<UserGreeting />);
  await user.click(screen.getByRole('button', { name: /load/i }));
  expect(await screen.findByText('Hello, Priya')).toBeInTheDocument(); // waits
  expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  expect(globalThis.fetch).toHaveBeenCalledWith('/api/user');
});`},{id:"rb-1",level:"fresher",topic:"react-basics",difficulty:"easy",simple:{hi:"React ek LEGO set jaisa hai. Chhote-chhote blocks (components) banao aur unhe jodkar poora ghar (website) bana lo. Jab kuch badalna ho, sirf wahi block badlo, poora ghar todne ki zaroorat nahi.",en:"React is like a LEGO set. You make small blocks (components) and join them to build a whole house (website). When something changes, you only change that block, not the whole house.",bn:"React \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE LEGO \u09B8\u09C7\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u099B\u09CB\u099F \u099B\u09CB\u099F block (components) \u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09C7 \u099C\u09C1\u09A1\u09BC\u09C7 \u09AA\u09C1\u09B0\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF (website) \u09AC\u09BE\u09A8\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u0964 \u0995\u09BF\u099B\u09C1 \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09B9\u09B2\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C7\u0987 block \u09AC\u09A6\u09B2\u09BE\u0993, \u09AA\u09C1\u09B0\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF \u09AD\u09BE\u0999\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"What is React and why is it so widely used?",answer:"React is an open-source JavaScript library from Meta for building user interfaces out of reusable components. You describe what the UI should look like for a given state (declarative), and React works out the minimal DOM updates when that state changes. It is popular because of its component model, one-way data flow, huge ecosystem, and because the same model works for the web (react-dom), native apps (React Native) and server rendering.",points:["A UI library (the 'view' layer), not a full framework \u2014 routing, data fetching etc. come from libraries or frameworks like Next.js / React Router","Declarative: UI = f(state); you describe the result, React updates the DOM","Component-based: small reusable pieces composed into pages","One-way data flow makes data changes predictable","Large ecosystem, React Native for mobile, server rendering and Server Components"],code:`function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

export default function App() {
  return (
    <main>
      <Greeting name="Asha" />
      <Greeting name="Ravi" />
    </main>
  );
}`},{id:"rb-2",level:"fresher",topic:"react-basics",difficulty:"easy",simple:{hi:"Socho teacher ke paas class ki seating ka ek rough chart (Virtual DOM) hai. Kisi ki seat badalni ho to pehle chart par compare karti hai ki kya badla, phir sirf usi bacche ko uthaati hai \u2014 poori class ko dobara nahi bithaati.",en:"Imagine a teacher has a rough seating chart (the Virtual DOM). When seats change, she first compares the old and new chart, then moves only the children whose seat changed \u2014 not the whole class.",bn:"\u09AD\u09BE\u09AC\u09CB \u099F\u09BF\u099A\u09BE\u09B0\u09C7\u09B0 \u0995\u09BE\u099B\u09C7 \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09AC\u09B8\u09BE\u09B0 \u098F\u0995\u099F\u09BE \u0996\u09B8\u09A1\u09BC\u09BE \u099A\u09BE\u09B0\u09CD\u099F (Virtual DOM) \u0986\u099B\u09C7\u0964 \u09B8\u09BF\u099F \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09B9\u09B2\u09C7 \u0986\u0997\u09C7 \u09AA\u09C1\u09B0\u09CB\u09A8\u09CB \u0986\u09B0 \u09A8\u09A4\u09C1\u09A8 \u099A\u09BE\u09B0\u09CD\u099F \u09AE\u09BF\u09B2\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u0996\u09C7\u09A8 \u0995\u09C0 \u09AC\u09A6\u09B2\u09C7\u099B\u09C7, \u09A4\u09BE\u09B0\u09AA\u09B0 \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C7\u0987 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09A6\u09C7\u09B0\u0987 \u09B8\u09B0\u09BE\u09A8 \u2014 \u09AA\u09C1\u09B0\u09CB \u0995\u09CD\u09B2\u09BE\u09B8\u0995\u09C7 \u09A8\u09AF\u09BC\u0964"},question:"What is the Virtual DOM and how does React use it?",answer:"The Virtual DOM is a lightweight JavaScript object tree (React elements) that describes what the UI should look like. When state changes, React renders a new tree, compares it with the previous one (this diffing is called reconciliation), and then applies only the necessary changes to the real DOM in the commit phase. This avoids manual DOM manipulation and batches updates, though the main benefit is a simple declarative model rather than raw speed.",points:["Virtual DOM = plain JS objects describing the UI, cheap to create","Render phase builds the new tree; reconciliation diffs it against the old one","Commit phase applies the minimal set of real DOM changes","Diff heuristics: different element type => replace subtree; keys identify list items","Not 'always faster than the DOM' \u2014 it makes declarative updates efficient enough"],code:`// JSX
const el = <h1 className="title">Hi</h1>;

// is just an object, roughly:
// {
//   type: 'h1',
//   props: { className: 'title', children: 'Hi' },
//   key: null
// }`},{id:"rb-3",level:"fresher",topic:"react-basics",difficulty:"easy",simple:{hi:"JSX ek Hinglish message jaisa hai \u2014 aapko easy lagta hai, par computer ko seedha samajh nahi aata. Compiler ek translator ki tarah use pure JavaScript function calls mein badal deta hai.",en:"JSX is like writing a message in an easy mix of languages \u2014 easy for you, but the computer doesn't understand it directly. The compiler acts like a translator and turns it into plain JavaScript function calls.",bn:"JSX \u09B9\u09B2\u09CB \u09B8\u09B9\u099C \u09AE\u09BF\u09B6\u09CD\u09B0 \u09AD\u09BE\u09B7\u09BE\u09AF\u09BC \u09B2\u09C7\u0996\u09BE \u099A\u09BF\u09A0\u09BF\u09B0 \u09AE\u09A4\u09CB \u2014 \u09A4\u09CB\u09AE\u09BE\u09B0 \u09AA\u09A1\u09BC\u09A4\u09C7 \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 computer \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09AC\u09CB\u099D\u09C7 \u09A8\u09BE\u0964 Compiler \u0985\u09A8\u09C1\u09AC\u09BE\u09A6\u0995\u09C7\u09B0 \u09AE\u09A4\u09CB \u09B8\u09C7\u099F\u09BE\u0995\u09C7 \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 JavaScript function call-\u098F \u09AC\u09A6\u09B2\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964"},question:"What is JSX and what does it compile to?",answer:`JSX is a syntax extension that lets you write HTML-like markup inside JavaScript. Browsers cannot run it directly, so a compiler (Babel, SWC, esbuild via Vite, TypeScript) turns it into function calls: with the modern automatic runtime, <h1 className="x">Hi</h1> becomes jsx('h1', { className: 'x', children: 'Hi' }) imported from react/jsx-runtime; the older classic transform produced React.createElement(...). Those calls return plain objects called React elements.`,points:["JSX is syntax sugar, not HTML and not a template language","Compiled to jsx()/jsxs() from react/jsx-runtime (automatic runtime) or React.createElement (classic)","With the automatic runtime you no longer need `import React` in every file","Use className and htmlFor, camelCase attributes, and {} for any JS expression","Must return a single root (or a Fragment); all tags must be closed"],code:`// Source
const el = <button className="btn" onClick={save}>Save</button>;

// Compiled (automatic runtime)
import { jsx as _jsx } from 'react/jsx-runtime';
const el2 = _jsx('button', {
  className: 'btn',
  onClick: save,
  children: 'Save',
});`},{id:"rb-4",level:"junior",topic:"react-basics",difficulty:"easy",simple:{hi:"Class component purane zamaane ka landline phone hai \u2014 kaam karta hai par bhaari aur complicated. Function component smartphone jaisa hai \u2014 chhota, simple, aur saare naye features (hooks) isi mein milte hain.",en:"A class component is like an old landline phone \u2014 it works but is bulky and complicated. A function component is like a smartphone \u2014 small, simple, and all the new features (hooks) come on it.",bn:"Class component \u09B9\u09B2\u09CB \u09AA\u09C1\u09B0\u09CB\u09A8\u09CB \u09A6\u09BF\u09A8\u09C7\u09B0 landline \u09AB\u09CB\u09A8 \u2014 \u0995\u09BE\u099C \u0995\u09B0\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AD\u09BE\u09B0\u09C0 \u0986\u09B0 \u099C\u099F\u09BF\u09B2\u0964 Function component \u09B9\u09B2\u09CB smartphone \u2014 \u099B\u09CB\u099F, \u09B8\u09B9\u099C, \u0986\u09B0 \u09B8\u09AC \u09A8\u09A4\u09C1\u09A8 feature (hooks) \u098F\u09A4\u09C7\u0987 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What is the difference between function components and class components? Which should you use today?",answer:"A function component is a plain function that takes props and returns JSX; it uses hooks such as useState for state and side effects. A class component extends React.Component, keeps state in this.state, updates it with this.setState and uses lifecycle methods like componentDidMount. Modern React (including React 19) is written with function components; class components are legacy and kept mainly for old code and error boundaries, which still need a class (or a library wrapper).",points:["Function component: function(props) => JSX, hooks for state/effects","Class component: extends Component, render(), this.state, this.setState, lifecycle methods","Functions are shorter, have no `this` binding issues and share logic via custom hooks","New React features (hooks, Server Components, Actions) target function components","Error boundaries still require a class component (componentDidCatch / getDerivedStateFromError)"],code:`import { useState, Component } from 'react';

// Modern
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Legacy equivalent
class OldCounter extends Component {
  state = { count: 0 };
  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}`},{id:"rb-5",level:"fresher",topic:"react-basics",difficulty:"easy",simple:{hi:"Props school ki uniform jaisi hai \u2014 school (parent) deta hai, bachcha khud nahi badal sakta. State bachche ki apni pencil box hai \u2014 usme kya rakhna hai wo khud decide karta hai aur badal sakta hai.",en:"Props are like a school uniform \u2014 the school (parent) gives it and the child can't change it. State is the child's own pencil box \u2014 the child decides what goes in it and can change it any time.",bn:"Props \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u0987\u0989\u09A8\u09BF\u09AB\u09B0\u09CD\u09AE\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09B8\u09CD\u0995\u09C1\u09B2 (parent) \u09A6\u09C7\u09AF\u09BC, \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u09A8\u09BF\u099C\u09C7 \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 \u09A8\u09BE\u0964 State \u09B9\u09B2\u09CB \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0 \u09A8\u09BF\u099C\u09C7\u09B0 \u09AA\u09C7\u09A8\u09CD\u09B8\u09BF\u09B2 \u09AC\u0995\u09CD\u09B8 \u2014 \u09AD\u09C7\u09A4\u09B0\u09C7 \u0995\u09C0 \u09B0\u09BE\u0996\u09AC\u09C7 \u09B8\u09C7 \u09A8\u09BF\u099C\u09C7\u0987 \u09A0\u09BF\u0995 \u0995\u09B0\u09C7 \u0986\u09B0 \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964"},question:"What is the difference between props and state?",answer:"Props are inputs passed from a parent to a child component; they are read-only inside the child. State is data a component owns and manages itself (for example with useState), and updating it with the setter causes the component to re-render. If a value comes from outside, it is a prop; if the component needs to remember and change it over time, it is state.",points:["Props: passed down by the parent, read-only (never mutate props)","State: owned locally, changed only through its setter function","Changing state re-renders that component (and its children)","A parent's state is often passed to children as props","Derive values from props/state during render instead of copying them into extra state"],code:`import { useState } from 'react';

function Score({ team, runs }) {      // props: read-only
  return <p>{team}: {runs}</p>;
}

export default function Match() {
  const [runs, setRuns] = useState(0);  // state: owned here
  return (
    <>
      <Score team="India" runs={runs} />
      <button onClick={() => setRuns(runs + 4)}>Four!</button>
    </>
  );
}`},{id:"rb-6",level:"junior",topic:"react-basics",difficulty:"easy",simple:{hi:"props.children ek tiffin box jaisa hai. Tiffin box (component) ko pata nahi ki andar roti hai ya biryani \u2014 maa (parent) jo bhi andar rakhti hai, box use safely le jaata hai.",en:"props.children is like a tiffin box. The box (component) doesn't know whether it holds roti or biryani \u2014 whatever mum (the parent) puts inside, the box carries it safely.",bn:"props.children \u09B9\u09B2\u09CB \u099F\u09BF\u09AB\u09BF\u09A8 \u09AC\u09BE\u0995\u09CD\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AC\u09BE\u0995\u09CD\u09B8 (component) \u099C\u09BE\u09A8\u09C7 \u09A8\u09BE \u09AD\u09C7\u09A4\u09B0\u09C7 \u09B0\u09C1\u099F\u09BF \u09A8\u09BE \u09AC\u09BF\u09B0\u09BF\u09AF\u09BC\u09BE\u09A8\u09BF \u2014 \u09AE\u09BE (parent) \u09AF\u09BE \u09AD\u09B0\u09C7 \u09A6\u09C7\u09A8, \u09AC\u09BE\u0995\u09CD\u09B8 \u09B8\u09C7\u099F\u09BE\u0987 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6\u09C7 \u09AC\u09AF\u09BC\u09C7 \u09A8\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What is props.children and how is it used for composition?",answer:"children is a special prop that holds whatever JSX you put between a component's opening and closing tags. It lets you build wrapper components like Card, Modal or Layout that don't need to know their content in advance. For multiple 'holes' you can also pass JSX through named props (slots), such as header or footer.",points:["Content between <Card>...</Card> arrives as props.children","children can be a string, element, array, function or nothing \u2014 treat it as opaque","Use named props (header={<Title />}) for multiple slots","Helps avoid prop drilling: the parent passes ready-made elements directly","Prefer composition with children over the legacy React.Children / cloneElement helpers"],code:`function Card({ title, children, footer }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="body">{children}</div>
      {footer && <footer>{footer}</footer>}
    </section>
  );
}

export default function App() {
  return (
    <Card title="Order" footer={<button>Pay</button>}>
      <p>2 x Masala Dosa</p>
    </Card>
  );
}`},{id:"rb-7",level:"junior",topic:"react-basics",difficulty:"medium",simple:{hi:"Synthetic event ek school ke receptionist jaisa hai. Har parent (browser) alag tarike se baat karta hai, par receptionist sab messages ek hi format mein teacher (aapke handler) tak pahunchata hai.",en:"A synthetic event is like a school receptionist. Every parent (browser) talks in a slightly different way, but the receptionist passes every message to the teacher (your handler) in the same format.",bn:"Synthetic event \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09B0\u09BF\u09B8\u09C7\u09AA\u09B6\u09A8\u09BF\u09B8\u09CD\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u0985\u09AD\u09BF\u09AD\u09BE\u09AC\u0995 (browser) \u098F\u0995\u099F\u09C1 \u0986\u09B2\u09BE\u09A6\u09BE \u09AD\u09BE\u09AC\u09C7 \u0995\u09A5\u09BE \u09AC\u09B2\u09C7\u09A8, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09B0\u09BF\u09B8\u09C7\u09AA\u09B6\u09A8\u09BF\u09B8\u09CD\u099F \u09B8\u09AC \u09AE\u09C7\u09B8\u09C7\u099C \u098F\u0995\u0987 format-\u098F \u099F\u09BF\u099A\u09BE\u09B0\u09C7\u09B0 (\u09A4\u09CB\u09AE\u09BE\u09B0 handler) \u0995\u09BE\u099B\u09C7 \u09AA\u09CC\u0981\u099B\u09C7 \u09A6\u09C7\u09A8\u0964"},question:"How does event handling work in React? What are synthetic events?",answer:"React event props are camelCase (onClick, onChange) and take a function, not a string. React wraps the browser's native event in a SyntheticEvent that has the same interface (target, preventDefault, stopPropagation) and works consistently across browsers; the original is available as e.nativeEvent. Instead of attaching a listener to every element, React attaches listeners at the root container and dispatches events through the component tree (delegation).",points:["Pass a function reference: onClick={handleClick}, not onClick={handleClick()}","Use an arrow function to pass arguments: onClick={() => remove(id)}","Call e.preventDefault() explicitly \u2014 returning false does not prevent default","SyntheticEvent is cross-browser; e.nativeEvent gives the DOM event","Listeners are delegated to the root container (since React 17), and event pooling was removed","Events bubble through the React tree; use onClickCapture for the capture phase"],code:`function TodoItem({ id, text, onRemove }) {
  function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    console.log('saved', id);
  }
  return (
    <form onSubmit={handleSubmit}>
      <span>{text}</span>
      <button type="button" onClick={() => onRemove(id)}>Delete</button>
      <button type="submit">Save</button>
    </form>
  );
}`},{id:"rb-8",level:"junior",topic:"react-basics",difficulty:"medium",simple:{hi:"Conditional rendering train ke signal jaisa hai \u2014 hara (true) to train (component) chalegi, laal (false) to nahi. Par agar signal par galti se '0' likha ho, to log wahi '0' padh lenge \u2014 isliye signal hamesha saaf true/false hona chahiye.",en:"Conditional rendering is like a railway signal \u2014 green (true) and the train (component) goes, red (false) and it doesn't. But if someone writes '0' on the signal by mistake, people will just see '0' \u2014 so the signal must be a clear true/false.",bn:"Conditional rendering \u09B9\u09B2\u09CB \u09B0\u09C7\u09B2\u09C7\u09B0 \u09B8\u09BF\u0997\u09A8\u09CD\u09AF\u09BE\u09B2\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09B8\u09AC\u09C1\u099C (true) \u09B9\u09B2\u09C7 \u099F\u09CD\u09B0\u09C7\u09A8 (component) \u099A\u09B2\u09AC\u09C7, \u09B2\u09BE\u09B2 (false) \u09B9\u09B2\u09C7 \u09A8\u09BE\u0964 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AD\u09C1\u09B2 \u0995\u09B0\u09C7 \u09B8\u09BF\u0997\u09A8\u09CD\u09AF\u09BE\u09B2\u09C7 '0' \u09B2\u09C7\u0996\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 \u09B2\u09CB\u0995\u09C7 \u09B8\u09C7\u0987 '0'-\u0987 \u09A6\u09C7\u0996\u09AC\u09C7 \u2014 \u09A4\u09BE\u0987 \u09B8\u09BF\u0997\u09A8\u09CD\u09AF\u09BE\u09B2 \u09B8\u09AC\u09B8\u09AE\u09AF\u09BC \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 true/false \u09B9\u0993\u09AF\u09BC\u09BE \u099A\u09BE\u0987\u0964"},question:"What are the ways to do conditional rendering in React, and what is the common pitfall with &&?",answer:"Because JSX is just JavaScript, you use normal JS: if/else with early return, the ternary operator (cond ? <A /> : <B />), logical && for 'show or nothing', or return null to render nothing. The classic pitfall is {count && <Badge />}: when count is 0, React renders the number 0 because 0 is a valid child. Use a real boolean, e.g. {count > 0 && <Badge />}.",points:["Early return / if-else for big branches","Ternary for either-or inside JSX","&& for show-or-nothing \u2014 left side must be a boolean","null, undefined, true and false render nothing; 0 and '' are not booleans (0 shows up as text)","Hiding with CSS keeps the component mounted (and its state); conditional rendering unmounts it"],code:`function Cart({ items, loading }) {
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {items.length > 0 && <span className="badge">{items.length}</span>}
      {/* bug: {items.length && ...} would print 0 */}
      {items.length === 0 ? <p>Cart is empty</p> : <ul>{/* items */}</ul>}
    </div>
  );
}`},{id:"rb-9",level:"junior",topic:"react-basics",difficulty:"medium",simple:{hi:"Key cricket team ke jersey number jaisa hai. Agar players ko line mein khade hone ki position (index) se pehchaanoge, to ek player ke jaane par sabki position badal jaayegi aur galat player ko galat cap mil jaayegi. Jersey number (id) se pehchaan hamesha sahi rehti hai.",en:"A key is like a cricketer's jersey number. If you identify players by their position in the line (index), then when one player leaves, everyone's position shifts and the wrong player gets the wrong cap. The jersey number (id) always identifies the right person.",bn:"Key \u09B9\u09B2\u09CB \u0995\u09CD\u09B0\u09BF\u0995\u09C7\u099F\u09BE\u09B0\u09C7\u09B0 \u099C\u09BE\u09B0\u09CD\u09B8\u09BF \u09A8\u09AE\u09CD\u09AC\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09B2\u09BE\u0987\u09A8\u09C7 \u09A6\u09BE\u0981\u09A1\u09BC\u09BE\u09A8\u09CB\u09B0 \u099C\u09BE\u09AF\u09BC\u0997\u09BE (index) \u09A6\u09BF\u09AF\u09BC\u09C7 \u099A\u09BF\u09A8\u09B2\u09C7 \u098F\u0995\u099C\u09A8 \u099A\u09B2\u09C7 \u0997\u09C7\u09B2\u09C7 \u09B8\u09AC\u09BE\u09B0 \u099C\u09BE\u09AF\u09BC\u0997\u09BE \u09B8\u09B0\u09C7 \u09AF\u09BE\u09AF\u09BC, \u0986\u09B0 \u09AD\u09C1\u09B2 \u0996\u09C7\u09B2\u09CB\u09AF\u09BC\u09BE\u09A1\u09BC \u09AD\u09C1\u09B2 \u099F\u09C1\u09AA\u09BF \u09AA\u09BE\u09AF\u09BC\u0964 \u099C\u09BE\u09B0\u09CD\u09B8\u09BF \u09A8\u09AE\u09CD\u09AC\u09B0 (id) \u09A6\u09BF\u09AF\u09BC\u09C7 \u099A\u09BF\u09A8\u09B2\u09C7 \u09B8\u09AC\u09B8\u09AE\u09AF\u09BC \u09A0\u09BF\u0995 \u09AE\u09BE\u09A8\u09C1\u09B7\u0995\u09C7\u0987 \u099A\u09C7\u09A8\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"Why does React need keys when rendering lists, and why is using the array index as key a problem?",answer:"When you render an array with map, each element needs a key that is unique among its siblings and stable across renders. React uses keys to match items between the old and new list, so it can keep the right DOM nodes and component state attached to the right item. Index keys break when items are inserted, deleted or reordered: the index of an item changes, so React reuses the wrong component, causing stale input values, wrong state or extra re-renders.",points:["Key must be unique among siblings, not globally","Use a stable id from the data (database id, generated id at creation time)","Index is acceptable only for static lists that never reorder, insert or delete","Never generate keys during render (Math.random(), crypto.randomUUID()) \u2014 they change every render","key is not passed as a prop to the child; changing a key forces a remount"],code:`function Players({ players }) {
  return (
    <ul>
      {players.map((p) => (
        <li key={p.id}>
          {p.name} <input defaultValue={p.role} />
        </li>
      ))}
    </ul>
  );
}
// key={index} here would keep input text on the wrong row
// after a player is removed from the middle of the list.`},{id:"rb-10",level:"junior",topic:"react-basics",difficulty:"medium",simple:{hi:"Controlled input aisa hai jaise dukaandaar har item khud register mein likhta hai \u2014 har cheez uske control mein. Uncontrolled input aisa hai jaise customer apni list khud rakhta hai, aur dukaandaar sirf bill banate waqt (submit) dekh leta hai.",en:"A controlled input is like a shopkeeper who writes every item in his own register \u2014 everything is under his control. An uncontrolled input is like the customer keeping their own list, and the shopkeeper only looks at it while making the bill (on submit).",bn:"Controlled input \u09AE\u09BE\u09A8\u09C7 \u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u099C\u09BF\u09A8\u09BF\u09B8 \u09A8\u09BF\u099C\u09C7\u09B0 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09BF\u0996\u09C7 \u09B0\u09BE\u0996\u09C7\u09A8 \u2014 \u09B8\u09AC\u0995\u09BF\u099B\u09C1 \u09A4\u09BE\u0981\u09B0 \u09A8\u09BF\u09AF\u09BC\u09A8\u09CD\u09A4\u09CD\u09B0\u09A3\u09C7\u0964 Uncontrolled input \u09AE\u09BE\u09A8\u09C7 \u0996\u09A6\u09CD\u09A6\u09C7\u09B0 \u09A8\u09BF\u099C\u09C7\u09B0 \u09B2\u09BF\u09B8\u09CD\u099F \u09A8\u09BF\u099C\u09C7\u09B0 \u0995\u09BE\u099B\u09C7 \u09B0\u09BE\u0996\u09C7\u09A8, \u0986\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0 \u09B6\u09C1\u09A7\u09C1 \u09AC\u09BF\u09B2 \u09AC\u09BE\u09A8\u09BE\u09A8\u09CB\u09B0 \u09B8\u09AE\u09AF\u09BC (submit) \u09B8\u09C7\u099F\u09BE \u09A6\u09C7\u0996\u09C7 \u09A8\u09C7\u09A8\u0964"},question:"What is the difference between controlled and uncontrolled inputs?",answer:"In a controlled input, React state is the single source of truth: you pass value (or checked) and update the state in onChange, so every keystroke goes through React. In an uncontrolled input, the DOM keeps the value; you give an initial defaultValue and read the current value when needed, via a ref or from FormData on submit. Controlled inputs suit live validation, formatting and dependent fields; uncontrolled inputs are simpler and fine for plain submit-only forms.",points:["Controlled: value + onChange, state drives the input","Uncontrolled: defaultValue / defaultChecked, read via ref or FormData","value without onChange makes the field read-only (React warns)","Don't switch between controlled and uncontrolled (e.g. value from undefined to a string) \u2014 React warns",'File inputs (<input type="file">) are always uncontrolled'],code:`import { useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');   // controlled

  function handleSubmit(e) {
    e.preventDefault();
    const city = new FormData(e.currentTarget).get('city'); // uncontrolled
    console.log(email, city);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input name="city" defaultValue="Kolkata" />
      <button>Submit</button>
    </form>
  );
}`},{id:"rb-11",level:"fresher",topic:"react-basics",difficulty:"easy",simple:{hi:"Fragment ek rubber band jaisa hai. Kuch pencils ko saath rakhne ke liye unhe ek extra dabbe (div) mein daalne ki zaroorat nahi \u2014 rubber band se baandh do, dabba nahi badhta aur jagah bhi nahi leta.",en:"A Fragment is like a rubber band. To keep a few pencils together you don't need an extra box (div) \u2014 just put a rubber band around them; no extra box, no extra space.",bn:"Fragment \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09B0\u09BE\u09AC\u09BE\u09B0 \u09AC\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u0995\u09AF\u09BC\u09C7\u0995\u099F\u09BE \u09AA\u09C7\u09A8\u09CD\u09B8\u09BF\u09B2 \u098F\u0995\u09B8\u09BE\u09A5\u09C7 \u09B0\u09BE\u0996\u09A4\u09C7 \u0986\u09B2\u09BE\u09A6\u09BE \u09AC\u09BE\u0995\u09CD\u09B8 (div) \u09B2\u09BE\u0997\u09C7 \u09A8\u09BE \u2014 \u09B0\u09BE\u09AC\u09BE\u09B0 \u09AC\u09CD\u09AF\u09BE\u09A8\u09CD\u09A1 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AC\u09C7\u0981\u09A7\u09C7 \u09A6\u09BE\u0993, \u09AC\u09BE\u09A1\u09BC\u09A4\u09BF \u09AC\u09BE\u0995\u09CD\u09B8\u0993 \u09A8\u09C7\u0987, \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u0993 \u09B2\u09BE\u0997\u09C7 \u09A8\u09BE\u0964"},question:"What are Fragments in React and why are they used?",answer:"A component must return a single root element, but adding an extra <div> just for that can break CSS layouts (flex, grid, tables) and clutters the DOM. A Fragment groups children without adding any DOM node. You write it as <>...</> or <Fragment>...</Fragment>; the long form is needed when you must pass a key, for example inside a list.",points:["Groups multiple elements without an extra wrapper node","Short syntax <></> cannot take any attributes","<Fragment key={id}> is used when mapping lists of groups","Keeps valid HTML, e.g. returning several <td> or <dt>/<dd> pairs","Avoids 'div soup' that breaks flex/grid styling"],code:`import { Fragment } from 'react';

function Glossary({ items }) {
  return (
    <dl>
      {items.map((item) => (
        <Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.meaning}</dd>
        </Fragment>
      ))}
    </dl>
  );
}`},{id:"rb-12",level:"junior",topic:"react-basics",difficulty:"medium",simple:{hi:"Ghar mein TV ka remote ek hi hona chahiye aur wo papa (common parent) ke paas ho. Bhai-behen ko channel badalna ho to papa se kehte hain \u2014 isse dono ke paas alag-alag remote se jhagda nahi hota. Yahi lifting state up hai.",en:"At home there should be one TV remote, kept with dad (the common parent). If brother or sister want to change the channel, they ask dad \u2014 so there's no fight over two different remotes. That is lifting state up.",bn:"\u09AC\u09BE\u09A1\u09BC\u09BF\u09A4\u09C7 TV-\u09B0 \u09B0\u09BF\u09AE\u09CB\u099F \u098F\u0995\u099F\u09BE\u0987 \u09A5\u09BE\u0995\u09BE \u0989\u099A\u09BF\u09A4, \u0986\u09B0 \u09B8\u09C7\u099F\u09BE \u09AC\u09BE\u09AC\u09BE\u09B0 (common parent) \u0995\u09BE\u099B\u09C7\u0964 \u09AD\u09BE\u0987-\u09AC\u09CB\u09A8 \u099A\u09CD\u09AF\u09BE\u09A8\u09C7\u09B2 \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u099A\u09BE\u0987\u09B2\u09C7 \u09AC\u09BE\u09AC\u09BE\u0995\u09C7 \u09AC\u09B2\u09C7 \u2014 \u09A4\u09BE\u0987 \u09A6\u09C1\u099F\u09CB \u0986\u09B2\u09BE\u09A6\u09BE \u09B0\u09BF\u09AE\u09CB\u099F \u09A8\u09BF\u09AF\u09BC\u09C7 \u099D\u0997\u09A1\u09BC\u09BE \u09B9\u09AF\u09BC \u09A8\u09BE\u0964 \u098F\u099F\u09BE\u0987 lifting state up\u0964"},question:"What does 'lifting state up' mean, and what is one-way data flow?",answer:"In React, data flows one way: from parent to child through props. When two sibling components need the same data, you move (lift) that state up to their closest common parent, which then passes the value down as props and passes callback functions down so children can request changes. This keeps a single source of truth and makes it easy to trace where a value comes from and who can change it.",points:["Data goes down via props; changes go up via callback props","Lift state to the closest common parent of the components that need it","Single source of truth avoids two copies of the same data getting out of sync","Children become simpler, 'controlled' by the parent","If lifting causes deep prop drilling, consider composition (children) or Context"],code:`import { useState } from 'react';

function TempInput({ label, value, onChange }) {
  return <label>{label} <input value={value} onChange={(e) => onChange(e.target.value)} /></label>;
}

export default function Converter() {
  const [celsius, setCelsius] = useState('');   // lifted state
  const fahrenheit = celsius === '' ? '' : String(Number(celsius) * 9 / 5 + 32);
  return (
    <>
      <TempInput label="C" value={celsius} onChange={setCelsius} />
      <TempInput label="F" value={fahrenheit}
        onChange={(f) => setCelsius(f === '' ? '' : String((Number(f) - 32) * 5 / 9))} />
    </>
  );
}`},{id:"rb-13",level:"mid",topic:"react-basics",difficulty:"medium",simple:{hi:"Composition thali jaisa hai \u2014 ek hi thali mein aap dal, sabzi, roti jo chaho rakh do aur nayi thali ban gayi. Inheritance aisa hai jaise har nayi dish ke liye poori purani recipe copy karke badalna \u2014 badi ulajhan.",en:"Composition is like a thali \u2014 put whatever dal, sabzi or roti you want in the same plate and you have a new meal. Inheritance is like copying an entire old recipe and changing it for every new dish \u2014 very messy.",bn:"Composition \u09B9\u09B2\u09CB \u09A5\u09BE\u09B2\u09BF\u09B0 \u09AE\u09A4\u09CB \u2014 \u098F\u0995\u0987 \u09A5\u09BE\u09B2\u09BE\u09AF\u09BC \u0987\u099A\u09CD\u099B\u09C7\u09AE\u09A4\u09CB \u09A1\u09BE\u09B2, \u09B8\u09AC\u099C\u09BF, \u09B0\u09C1\u099F\u09BF \u09B8\u09BE\u099C\u09BF\u09AF\u09BC\u09C7 \u09A8\u09A4\u09C1\u09A8 \u0996\u09BE\u09AC\u09BE\u09B0 \u09A4\u09C8\u09B0\u09BF\u0964 Inheritance \u09AE\u09BE\u09A8\u09C7 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09A8\u09A4\u09C1\u09A8 \u09AA\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09C1\u09B0\u09CB \u09AA\u09C1\u09B0\u09CB\u09A8\u09CB \u09B0\u09C7\u09B8\u09BF\u09AA\u09BF \u0995\u09AA\u09BF \u0995\u09B0\u09C7 \u09AC\u09A6\u09B2\u09BE\u09A8\u09CB \u2014 \u09AC\u09A1\u09CD\u09A1 \u099D\u09BE\u09AE\u09C7\u09B2\u09BE\u0964"},question:"Why does React prefer composition over inheritance?",answer:"React reuses UI by composing components \u2014 passing children, passing elements or render functions as props, and sharing logic through custom hooks \u2014 rather than by extending component classes. Inheritance creates tight coupling and fragile hierarchies, while composition lets any component be specialised by simply wrapping or configuring a more generic one. The React team has said they have not found use cases where component inheritance hierarchies are recommended.",points:["Specialisation: a WelcomeDialog renders a generic Dialog with specific props","Containment: generic boxes (Card, Modal, Layout) accept children or slot props","Shared non-UI logic goes into custom hooks or plain JS modules, not base classes","Composition keeps components loosely coupled and easy to test","Higher-order components and render props are older composition patterns, now mostly replaced by hooks"],code:`function Dialog({ title, children, actions }) {
  return (
    <div role="dialog" className="dialog">
      <h2>{title}</h2>
      {children}
      <div className="actions">{actions}</div>
    </div>
  );
}

// Specialised by composition, not 'extends Dialog'
function ConfirmDelete({ onYes, onNo }) {
  return (
    <Dialog title="Delete item?" actions={<><button onClick={onYes}>Yes</button><button onClick={onNo}>No</button></>}>
      <p>This cannot be undone.</p>
    </Dialog>
  );
}`},{id:"rb-14",level:"mid",topic:"react-basics",difficulty:"medium",simple:{hi:"StrictMode exam se pehle wale mock test jaisa hai. Teacher jaan-boojhkar ek hi sawaal do baar poochti hai \u2014 agar dono baar jawab alag aaya, to pata chal jaata hai ki kahin gadbad hai. Asli exam (production) mein ye double check nahi hota.",en:"StrictMode is like a mock test before the exam. The teacher deliberately asks the same question twice \u2014 if your two answers differ, you know something is wrong. In the real exam (production) there is no double checking.",bn:"StrictMode \u09B9\u09B2\u09CB \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09B0 \u0986\u0997\u09C7\u09B0 \u09AE\u0995 \u099F\u09C7\u09B8\u09CD\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u099F\u09BF\u099A\u09BE\u09B0 \u0987\u099A\u09CD\u099B\u09C7 \u0995\u09B0\u09C7 \u098F\u0995\u0987 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u09A6\u09C1'\u09AC\u09BE\u09B0 \u0995\u09B0\u09C7\u09A8 \u2014 \u09A6\u09C1'\u09AC\u09BE\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 \u0986\u09B2\u09BE\u09A6\u09BE \u09B9\u09B2\u09C7 \u09AC\u09CB\u099D\u09BE \u09AF\u09BE\u09AF\u09BC \u0995\u09CB\u09A5\u09BE\u0993 \u0997\u09CB\u09B2\u09AE\u09BE\u09B2 \u0986\u099B\u09C7\u0964 \u0986\u09B8\u09B2 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09AF\u09BC (production) \u098F\u0987 \u09A6\u09C1'\u09AC\u09BE\u09B0 \u09AF\u09BE\u099A\u09BE\u0987 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"What is React.StrictMode and why do components render twice in development?",answer:"StrictMode is a development-only wrapper that helps find bugs early; it renders no UI and has no effect in production builds. Inside it, React intentionally calls component functions (and state initializers, updaters and reducers) twice to expose impure rendering, runs an extra mount-unmount-mount cycle for effects and ref callbacks to catch missing cleanup, and warns about deprecated APIs. If a component behaves differently on the second call, it has a side effect during render that must be fixed.",points:["Dev-only: no extra renders or checks in production","Double-invokes render, useState/useMemo initializers, reducers and updater functions","Simulates unmount + remount to verify effect cleanup","Warns about legacy/deprecated APIs","Fix the impurity instead of removing StrictMode to 'stop the double logs'"],code:`import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);`},{id:"rb-15",level:"mid",topic:"react-basics",difficulty:"medium",simple:{hi:"React ek kitchen ke saamaan jaisa hai \u2014 tawa, kadhai mil gaye, baaki masale aap apni pasand se laao. Angular ek poora tiffin service jaisa hai \u2014 sab kuch fixed menu ke saath ready milta hai. Dono se khana achha ban sakta hai.",en:"React is like getting good kitchen utensils \u2014 you bring your own spices and ingredients as you like. Angular is like a full tiffin service \u2014 everything comes ready with a fixed menu. Both can make a great meal.",bn:"React \u09B9\u09B2\u09CB \u09AD\u09BE\u09B2\u09CB \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u09B0 \u09AC\u09BE\u09B8\u09A8\u09AA\u09A4\u09CD\u09B0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 \u09AE\u09B6\u09B2\u09BE \u0986\u09B0 \u0989\u09AA\u0995\u09B0\u09A3 \u09A8\u09BF\u099C\u09C7\u09B0 \u09AA\u099B\u09A8\u09CD\u09A6\u09AE\u09A4\u09CB \u0986\u09A8\u09A4\u09C7 \u09B9\u09AF\u09BC\u0964 Angular \u09B9\u09B2\u09CB \u09AA\u09C1\u09B0\u09CB \u099F\u09BF\u09AB\u09BF\u09A8 \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u09AE\u09C7\u09A8\u09C1\u09A4\u09C7 \u09B8\u09AC \u09A4\u09C8\u09B0\u09BF \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 \u09A6\u09C1\u099F\u09CB \u09A6\u09BF\u09AF\u09BC\u09C7\u0987 \u09AD\u09BE\u09B2\u09CB \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE \u09B9\u09AF\u09BC\u0964"},question:"How does React compare with Angular?",answer:"React is a UI library: you get components, rendering and hooks, and pick routing, forms, data fetching and state management from the ecosystem or use a framework like Next.js. Angular is a complete, opinionated framework with routing, forms, HTTP client, dependency injection and CLI built in, written in TypeScript. React uses JSX and re-runs component functions when state changes, while Angular uses HTML templates with control flow (@if, @for) and fine-grained signals. React gives more flexibility; Angular gives more consistency across large teams.",points:["Library + ecosystem (React) vs batteries-included framework (Angular)","JSX in JavaScript vs separate HTML templates with Angular syntax","React: one-way data flow; Angular: one-way by default plus optional two-way binding ([(ngModel)], model())","Angular has built-in DI and an official CLI; React projects usually start with Vite or a framework","TypeScript optional in React, standard in Angular","Both are component-based, support SSR, and are well suited to large apps"]},{id:"rb-16",level:"mid",topic:"react-basics",difficulty:"medium",simple:{hi:"Re-render class ki attendance jaisa hai. Jab teacher (parent) attendance leti hai, to har bachche ka naam bulaya jaata hai \u2014 chahe uske saath kuch naya hua ho ya nahi. Par register mein sirf wahi badalta hai jo sach mein absent ya present hua.",en:"A re-render is like taking class attendance. When the teacher (parent) takes attendance, every child's name is called \u2014 whether anything changed for them or not. But the register is only changed where someone is actually absent or present.",bn:"Re-render \u09B9\u09B2\u09CB \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09B9\u09BE\u099C\u09BF\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u099F\u09BF\u099A\u09BE\u09B0 (parent) \u09B9\u09BE\u099C\u09BF\u09B0\u09BE \u09A8\u09BF\u09B2\u09C7 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0 \u09A8\u09BE\u09AE \u09A1\u09BE\u0995\u09BE \u09B9\u09AF\u09BC \u2014 \u09A4\u09BE\u09B0 \u0995\u09BF\u099B\u09C1 \u09AC\u09A6\u09B2\u09BE\u0995 \u09AC\u09BE \u09A8\u09BE \u09AC\u09A6\u09B2\u09BE\u0995\u0964 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C7\u099F\u09BE\u0987 \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC \u09AF\u09C7\u099F\u09BE \u09B8\u09A4\u09CD\u09AF\u09BF\u0987 \u09AC\u09A6\u09B2\u09C7\u099B\u09C7\u0964"},question:"When does a React component re-render?",answer:"A component re-renders when its own state changes (setter called with a different value), when its parent re-renders, or when a context it reads changes. Note that a parent re-render re-renders all children by default even if their props are identical, unless the child is wrapped in memo (or optimised by the React Compiler). Re-rendering means calling the function again and diffing the result; the real DOM is touched only where output actually changed.",points:["Triggers: own state update, parent re-render, consumed context value change","Props 'changing' is not a trigger by itself \u2014 it happens because the parent re-rendered","Setting state to the same value (Object.is) lets React skip the update","Updates are batched automatically, even inside promises and timeouts (React 18+)","Render \u2260 DOM update: React commits only the differences","Mutating an object/array in place does not trigger a re-render"],code:`import { useState } from 'react';

function Child() {
  console.log('Child rendered');
  return <p>I am a child</p>;
}

export default function Parent() {
  const [n, setN] = useState(0);
  return (
    <>
      <button onClick={() => setN(n + 1)}>Clicked {n}</button>
      <Child /> {/* logs on every click, though it has no props */}
    </>
  );
}`},{id:"rb-17",level:"mid",topic:"react-basics",difficulty:"medium",simple:{hi:"Styling options alag-alag kapde silwaane jaise hain. Global CSS readymade dukaan ka kapda hai \u2014 kisi aur ka bhi same ho sakta hai. CSS Modules apna naam likha hua school bag hai \u2014 kisi aur se mix nahi hoga. Tailwind ek tailor ke ready kapdon ke tukde hain \u2014 jodo aur turant pehno.",en:"Styling options are like getting clothes made. Global CSS is a readymade shop shirt \u2014 someone else may wear the same one. CSS Modules is a school bag with your name on it \u2014 it won't get mixed up. Tailwind is a tailor's ready-cut pieces \u2014 join them and wear right away.",bn:"Styling-\u098F\u09B0 \u0989\u09AA\u09BE\u09AF\u09BC\u0997\u09C1\u09B2\u09CB \u099C\u09BE\u09AE\u09BE \u09AC\u09BE\u09A8\u09BE\u09A8\u09CB\u09B0 \u09AE\u09A4\u09CB\u0964 Global CSS \u09B9\u09B2\u09CB \u09B0\u09C7\u09A1\u09BF\u09AE\u09C7\u09A1 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u099C\u09BE\u09AE\u09BE \u2014 \u0985\u09A8\u09CD\u09AF \u0995\u09C7\u0989\u0993 \u098F\u0995\u0987 \u099C\u09BE\u09AE\u09BE \u09AA\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964 CSS Modules \u09B9\u09B2\u09CB \u09A8\u09BE\u09AE \u09B2\u09C7\u0996\u09BE \u09B8\u09CD\u0995\u09C1\u09B2 \u09AC\u09CD\u09AF\u09BE\u0997 \u2014 \u0995\u09BE\u09B0\u09CB \u09B8\u0999\u09CD\u0997\u09C7 \u09AE\u09BF\u09B6\u09C7 \u09AF\u09BE\u09AC\u09C7 \u09A8\u09BE\u0964 Tailwind \u09B9\u09B2\u09CB \u09A6\u09B0\u09CD\u099C\u09BF\u09B0 \u09A4\u09C8\u09B0\u09BF \u0995\u09BE\u099F\u09BE \u099F\u09C1\u0995\u09B0\u09CB \u2014 \u099C\u09C1\u09A1\u09BC\u09C7 \u09A8\u09BF\u09B2\u09C7\u0987 \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09AA\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What are the common ways to style React components, and how do you choose?",answer:"Options include plain global CSS, CSS Modules, CSS-in-JS libraries, utility-first CSS like Tailwind, and inline styles. CSS Modules (Button.module.css) scope class names to the component automatically and are supported out of the box by Vite. Runtime CSS-in-JS (styled-components, Emotion) colocates styles with JS and allows prop-based styles but adds runtime cost and has limitations with Server Components, so zero-runtime alternatives are popular. Tailwind uses utility classes in className, which is fast to build with and keeps CSS small. Choose based on team familiarity, design system, and whether you use SSR/Server Components.",points:["Global CSS: simple, but class names can clash","CSS Modules: locally scoped classes, no runtime cost, built into Vite","CSS-in-JS: dynamic styles from props; runtime cost, SSR/Server Component caveats","Tailwind: utility classes, design tokens, no naming; long className strings","Inline style={{ }}: camelCase object, fine for dynamic values but no pseudo-classes or media queries","Use a helper like clsx for conditional class names"],code:`// Button.module.css
// .primary { background: #ff6b00; color: white; }

import styles from './Button.module.css';

export function Button({ children }) {
  return <button className={styles.primary}>{children}</button>;
}

// Tailwind version
export function TwButton({ children }) {
  return <button className="rounded bg-orange-500 px-4 py-2 text-white">{children}</button>;
}`},{id:"rb-18",level:"junior",topic:"react-basics",difficulty:"easy",simple:{hi:"Vite se project banana naye ghar mein shift hone jaisa hai jahan bijli-paani pehle se ready hai. Folder structure ghar ki almirah jaisa hai \u2014 kapde ek khaane mein, kitaabein doosre mein \u2014 taaki cheezein turant mil jaayein.",en:"Creating a project with Vite is like moving into a new house where electricity and water are already ready. Folder structure is like your cupboard \u2014 clothes on one shelf, books on another \u2014 so you find things quickly.",bn:"Vite \u09A6\u09BF\u09AF\u09BC\u09C7 project \u09AC\u09BE\u09A8\u09BE\u09A8\u09CB \u09AE\u09BE\u09A8\u09C7 \u098F\u09AE\u09A8 \u09A8\u09A4\u09C1\u09A8 \u09AC\u09BE\u09A1\u09BC\u09BF\u09A4\u09C7 \u0993\u09A0\u09BE \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09AC\u09BF\u09A6\u09CD\u09AF\u09C1\u09CE-\u099C\u09B2 \u0986\u0997\u09C7 \u09A5\u09C7\u0995\u09C7\u0987 \u09A4\u09C8\u09B0\u09BF\u0964 Folder structure \u09B9\u09B2\u09CB \u0986\u09B2\u09AE\u09BE\u09B0\u09BF\u09B0 \u09AE\u09A4\u09CB \u2014 \u099C\u09BE\u09AE\u09BE \u098F\u0995 \u09A4\u09BE\u0995\u09C7, \u09AC\u0987 \u0985\u09A8\u09CD\u09AF \u09A4\u09BE\u0995\u09C7 \u2014 \u09AF\u09BE\u09A4\u09C7 \u099C\u09BF\u09A8\u09BF\u09B8 \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"How do you set up a new React project today, and what is a good folder structure?",answer:"For a client-side app, the common choice is Vite: npm create vite@latest my-app -- --template react-ts gives a fast dev server with hot module replacement and an optimised production build. Create React App is deprecated, and the React docs recommend a framework such as Next.js or React Router (framework mode) when you need routing, SSR and data loading built in. A good structure groups code by feature (features/cart, features/auth) with shared components, hooks and utilities in their own folders.",points:["npm create vite@latest my-app -- --template react-ts, then npm install and npm run dev","Entry: index.html -> src/main.tsx -> createRoot(...).render(<App />)","Create React App is deprecated; use Vite or a framework (Next.js, React Router)","Env variables in Vite must start with VITE_ and are read via import.meta.env","Organise by feature; keep components small; colocate styles and tests with components","Add ESLint (with react-hooks plugin) and Prettier; TypeScript is recommended"],code:`# create and run
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev

# suggested structure
src/
  main.tsx          # createRoot + <App />
  App.tsx
  components/       # shared UI: Button, Modal
  features/
    cart/           # CartPage.tsx, CartItem.tsx, cart.module.css
    auth/
  hooks/            # custom hooks
  services/         # API calls
  utils/
  assets/`},{id:"rb-19",level:"mid",topic:"react-basics",difficulty:"medium",simple:{hi:"Todo list kiraane ki list jaisi hai. Har item ko ek token number (id) do, taaki 'doodh' kaatne par galti se 'chini' na kat jaaye. Aur purani list par kaat-peet karne ke bajaay nayi saaf list likho \u2014 tab React turant samajh jaata hai ki kuch badla.",en:"A todo list is like a grocery list. Give every item a token number (id) so that striking off 'milk' never strikes off 'sugar' by mistake. And instead of scribbling on the old list, write a fresh clean list \u2014 then React instantly knows something changed.",bn:"Todo list \u09B9\u09B2\u09CB \u09AE\u09C1\u09A6\u09BF\u09B0 \u09AB\u09B0\u09CD\u09A6\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u099C\u09BF\u09A8\u09BF\u09B8\u0995\u09C7 \u098F\u0995\u099F\u09BE \u099F\u09CB\u0995\u09C7\u09A8 \u09A8\u09AE\u09CD\u09AC\u09B0 (id) \u09A6\u09BE\u0993, \u09AF\u09BE\u09A4\u09C7 '\u09A6\u09C1\u09A7' \u0995\u09BE\u099F\u09A4\u09C7 \u0997\u09BF\u09AF\u09BC\u09C7 \u09AD\u09C1\u09B2 \u0995\u09B0\u09C7 '\u099A\u09BF\u09A8\u09BF' \u09A8\u09BE \u0995\u09C7\u099F\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964 \u0986\u09B0 \u09AA\u09C1\u09B0\u09CB\u09A8\u09CB \u09AB\u09B0\u09CD\u09A6\u09C7 \u0995\u09BE\u099F\u09BE\u0995\u09C1\u099F\u09BF \u09A8\u09BE \u0995\u09B0\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u09AB\u09B0\u09CD\u09A6 \u09B2\u09C7\u0996\u09CB \u2014 \u09A4\u09BE\u09B9\u09B2\u09C7 React \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09AC\u09CB\u099D\u09C7 \u0995\u09BF\u099B\u09C1 \u09AC\u09A6\u09B2\u09C7\u099B\u09C7\u0964"},question:"Write a small todo list component: a controlled input to add items, a list with proper keys, and a delete button.",answer:"Keep the input text and the todos array in state, generate an id when an item is created, and render the list with that id as key. Updates must be immutable: create new arrays with spread for adding and filter for removing, so React detects the change. Trim the input and ignore empty values, and handle submit on the form so Enter works too.",points:["Controlled input: value + onChange","id created once when the item is added (crypto.randomUUID()), never during render","Immutable updates: [...todos, item] to add, filter to remove","Form onSubmit + preventDefault so Enter key adds items","Show an empty-state message with conditional rendering"],code:`import { useState } from 'react';

export default function TodoList() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  function add(e) {
    e.preventDefault();
    const title = text.trim();
    if (title) setTodos([...todos, { id: crypto.randomUUID(), title }]);
    setText('');
  }
  const remove = (id) => setTodos(todos.filter((t) => t.id !== id));
  return (
    <form onSubmit={add}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New task" />
      <button>Add</button>
      {todos.length === 0 && <p>No tasks yet</p>}
      <ul>
        {todos.map((t) => (
          <li key={t.id}>{t.title} <button type="button" onClick={() => remove(t.id)}>x</button></li>
        ))}
      </ul>
    </form>
  );
}`},{id:"rb-20",level:"senior",topic:"react-basics",difficulty:"hard",simple:{hi:"Ye bilkul train ke coach jaisa hai. Agar passengers ko 'teesra dibba' (index) se pehchaanoge, to beech ka ek dibba hatane par sab ki seat badal jaayegi aur samaan galat logon ke paas pahunchega. PNR number (stable id) se pehchaanoge to sab ka samaan sahi jagah rahega.",en:"It's just like train coaches. If you identify passengers as 'third coach' (index), removing a coach from the middle shifts everyone and luggage ends up with the wrong people. If you identify them by PNR number (a stable id), everyone's luggage stays in the right place.",bn:"\u098F\u099F\u09BE \u09A0\u09BF\u0995 \u099F\u09CD\u09B0\u09C7\u09A8\u09C7\u09B0 \u0995\u09BE\u09AE\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AF\u09BE\u09A4\u09CD\u09B0\u09C0\u09A6\u09C7\u09B0 '\u09A4\u09BF\u09A8 \u09A8\u09AE\u09CD\u09AC\u09B0 \u0995\u09BE\u09AE\u09B0\u09BE' (index) \u09A6\u09BF\u09AF\u09BC\u09C7 \u099A\u09BF\u09A8\u09B2\u09C7 \u09AE\u09BE\u099D\u09C7\u09B0 \u098F\u0995\u099F\u09BE \u0995\u09BE\u09AE\u09B0\u09BE \u09B8\u09B0\u09BE\u09B2\u09C7 \u09B8\u09AC\u09BE\u09B0 \u099C\u09BE\u09AF\u09BC\u0997\u09BE \u09AC\u09A6\u09B2\u09C7 \u09AF\u09BE\u09AF\u09BC \u0986\u09B0 \u09AE\u09BE\u09B2\u09AA\u09A4\u09CD\u09B0 \u09AD\u09C1\u09B2 \u09B2\u09CB\u0995\u09C7\u09B0 \u0995\u09BE\u099B\u09C7 \u099A\u09B2\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964 PNR \u09A8\u09AE\u09CD\u09AC\u09B0 (stable id) \u09A6\u09BF\u09AF\u09BC\u09C7 \u099A\u09BF\u09A8\u09B2\u09C7 \u09B8\u09AC\u09BE\u09B0 \u09AE\u09BE\u09B2\u09AA\u09A4\u09CD\u09B0 \u09A0\u09BF\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09A4\u09C7\u0987 \u09A5\u09BE\u0995\u09C7\u0964"},question:"Scenario: in a list of editable rows, after deleting a row the text typed in the inputs appears on the wrong rows. How do you debug and fix it?",answer:"This is almost always a key problem: the list is rendered with key={index} (or unstable keys), so after a deletion React matches the old components to new items by position and the remaining rows inherit the wrong component state and uncontrolled input values. The fix is to use a stable, unique id from the data as the key; if items have no id, assign one when they are created, not during render. A related trick is to deliberately change a key (e.g. key={userId}) to reset a component's state when its identity changes.",points:["Symptom of index or random keys: state and DOM values 'shift' to neighbouring rows","React preserves state by position + type + key in the tree","Fix: key={item.id}; generate ids once when items are created","Random keys (Math.random()) remount every render \u2014 focus and state are lost, performance drops","Alternatively make inputs controlled from the item data so values follow the data","Use key changes intentionally to reset a form when switching records"],code:`// Buggy
{rows.map((row, i) => <RowEditor key={i} row={row} />)}

// Fixed
{rows.map((row) => <RowEditor key={row.id} row={row} />)}

// Reset a form on record change
<ProfileForm key={selectedUser.id} user={selectedUser} />`},{id:"rb-21",level:"senior",topic:"react-basics",difficulty:"hard",simple:{hi:"React 19 ka form action post office ke counter jaisa hai. Aap poora bhara hua form (FormData) counter par de do, clerk khud process karta hai, 'kaam chal raha hai' board dikhata hai, aur kaam hone ke baad aapko naya khaali form de deta hai.",en:"A React 19 form action is like a post office counter. You hand over the whole filled form (FormData), the clerk processes it, shows a 'work in progress' board, and when done gives you a fresh empty form.",bn:"React 19-\u098F\u09B0 form action \u09B9\u09B2\u09CB \u09AA\u09CB\u09B8\u09CD\u099F \u0985\u09AB\u09BF\u09B8\u09C7\u09B0 \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A4\u09C1\u09AE\u09BF \u09AA\u09C1\u09B0\u09CB \u09AD\u09B0\u09BE \u09AB\u09B0\u09CD\u09AE (FormData) \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0\u09C7 \u09A6\u09BE\u0993, \u0995\u09CD\u09B2\u09BE\u09B0\u09CD\u0995 \u09A8\u09BF\u099C\u09C7\u0987 \u0995\u09BE\u099C \u0995\u09B0\u09C7\u09A8, '\u0995\u09BE\u099C \u099A\u09B2\u099B\u09C7' \u09AC\u09CB\u09B0\u09CD\u09A1 \u09A6\u09C7\u0996\u09BE\u09A8, \u0986\u09B0 \u0995\u09BE\u099C \u09B6\u09C7\u09B7\u09C7 \u09A4\u09CB\u09AE\u09BE\u0995\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09AB\u09BE\u0981\u0995\u09BE \u09AB\u09B0\u09CD\u09AE \u09A6\u09C7\u09A8\u0964"},question:"How do forms work in React 19 with the action prop, and when would you still use controlled inputs?",answer:"In React 19 you can pass a function to <form action={fn}>. On submit, React calls it with a FormData object, runs it inside a transition (so async work is supported and pending state is tracked), and resets uncontrolled fields after a successful action. Status and results can be read with useFormStatus (from react-dom, inside a child of the form) and useActionState (from react); with Server Components frameworks the action can even be a Server Function. You still use controlled inputs when you need per-keystroke behaviour: live validation, input masking, dependent fields or enabling the submit button based on the current value.",points:["<form action={fn}> receives FormData \u2014 no preventDefault or onSubmit needed","Async actions run in a transition; useFormStatus exposes pending state to child components","useActionState(action, initialState) returns [state, formAction, isPending] for results/errors","Uncontrolled fields are reset automatically after the action succeeds","Works with progressive enhancement when actions are Server Functions in a framework","Controlled inputs remain the tool for instant validation, formatting and dependent UI"],code:`import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Saving...' : 'Save'}</button>;
}

export default function Feedback({ sendFeedback }) {
  async function submit(formData) {
    await sendFeedback({
      name: formData.get('name'),
      message: formData.get('message'),
    });
  }
  return (
    <form action={submit}>
      <input name="name" required />
      <textarea name="message" />
      <SubmitButton />
    </form>
  );
}`},{id:"rb-22",level:"senior",topic:"react-basics",difficulty:"hard",simple:{hi:"Pure component ek achhe chai-wale jaisa hai \u2014 same doodh, same patti, to hamesha same chai, aur wo kisi aur ki kettle nahi chhoota. Agar aap purane cup mein chupke se chini daal do, to chai-wala ko pata nahi chalega; naya cup (nayi state) doge tabhi wo dhyaan dega.",en:"A pure component is like a good chaiwala \u2014 same milk and same tea leaves always give the same chai, and he never touches someone else's kettle. If you secretly add sugar to the old cup, he won't notice; only when you hand him a new cup (new state) does he pay attention.",bn:"Pure component \u09B9\u09B2\u09CB \u098F\u0995\u099C\u09A8 \u09AD\u09BE\u09B2\u09CB \u099A\u09BE-\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 \u098F\u0995\u0987 \u09A6\u09C1\u09A7, \u098F\u0995\u0987 \u09AA\u09BE\u09A4\u09BE \u09A6\u09BF\u09B2\u09C7 \u09B8\u09AC\u09B8\u09AE\u09AF\u09BC \u098F\u0995\u0987 \u099A\u09BE, \u0986\u09B0 \u09A4\u09BF\u09A8\u09BF \u0985\u09A8\u09CD\u09AF\u09C7\u09B0 \u0995\u09C7\u099F\u09B2\u09BF \u099B\u09CB\u0981\u09A8 \u09A8\u09BE\u0964 \u09AA\u09C1\u09B0\u09CB\u09A8\u09CB \u0995\u09BE\u09AA\u09C7 \u099A\u09C1\u09AA\u09BF\u099A\u09C1\u09AA\u09BF \u099A\u09BF\u09A8\u09BF \u09AE\u09C7\u09B6\u09BE\u09B2\u09C7 \u09A4\u09BF\u09A8\u09BF \u099F\u09C7\u09B0 \u09AA\u09BE\u09AC\u09C7\u09A8 \u09A8\u09BE; \u09A8\u09A4\u09C1\u09A8 \u0995\u09BE\u09AA (\u09A8\u09A4\u09C1\u09A8 state) \u09A6\u09BF\u09B2\u09C7 \u09A4\u09AC\u09C7\u0987 \u0996\u09C7\u09AF\u09BC\u09BE\u09B2 \u0995\u09B0\u09AC\u09C7\u09A8\u0964"},question:"Why must React components be pure during rendering, and why doesn't mutating state directly trigger a re-render?",answer:"React treats rendering as a calculation: given the same props, state and context, a component should return the same JSX and must not change anything outside itself (no mutating props, globals or the DOM during render). This lets React render components in any order, render twice in StrictMode, pause or discard renders in concurrent features, and skip work safely. State updates are detected by identity: calling the setter with a new value schedules a render, and React compares with Object.is. If you mutate an array or object and pass the same reference \u2014 or never call the setter \u2014 React sees no change, so nothing re-renders and the UI shows stale data.",points:["Render must be a pure function of props, state and context \u2014 side effects go in event handlers or effects","Purity enables StrictMode checks, concurrent rendering, memoisation and the React Compiler","React only re-renders when a setter is called with a value that differs by Object.is","todos.push(x); setTodos(todos) passes the same reference \u2014 the update is skipped","Use immutable updates: spread, map, filter, toSorted/toSpliced, or a helper like Immer","Local mutation of objects created during the same render is fine"],code:`import { useState } from 'react';

export default function Scores() {
  const [scores, setScores] = useState([10, 20]);

  function wrongAdd() {
    scores.push(30);        // mutates existing array
    setScores(scores);      // same reference -> no re-render
  }

  function rightAdd() {
    setScores([...scores, 30]); // new array -> re-render
  }

  return (
    <>
      <p>{scores.join(', ')}</p>
      <button onClick={wrongAdd}>Wrong</button>
      <button onClick={rightAdd}>Right</button>
    </>
  );
}`},{id:"rc-1",level:"fresher",topic:"react-coding",difficulty:"easy",simple:{hi:"Undo counter cricket ke scoreboard register jaisa hai - har ball ke baad naya score neeche likhte ho, purana mitaate nahi. Galti hui to bas aakhri line kaat do, aur pichhla score wapas aa jaata hai.",en:"An undo counter is like a cricket scorebook - after every ball you write the new score on a new line, you never erase the old one. If you made a mistake, just strike off the last line and the previous score is back.",bn:"Undo counter \u09B9\u09B2\u09CB \u0995\u09CD\u09B0\u09BF\u0995\u09C7\u099F\u09C7\u09B0 \u09B8\u09CD\u0995\u09CB\u09B0 \u0996\u09BE\u09A4\u09BE\u09B0 \u09AE\u09A4\u09CB - \u09AA\u09CD\u09B0\u09A4\u09BF \u09AC\u09B2\u09C7\u09B0 \u09AA\u09B0 \u09A8\u09A4\u09C1\u09A8 \u09B2\u09BE\u0987\u09A8\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09B8\u09CD\u0995\u09CB\u09B0 \u09B2\u09C7\u0996\u09CB, \u09AA\u09C1\u09B0\u09A8\u09CB\u099F\u09BE \u09AE\u09CB\u099B\u09CB \u09A8\u09BE\u0964 \u09AD\u09C1\u09B2 \u09B9\u09B2\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09B6\u09C7\u09B7 \u09B2\u09BE\u0987\u09A8\u099F\u09BE \u0995\u09C7\u099F\u09C7 \u09A6\u09BE\u0993, \u0986\u0997\u09C7\u09B0 \u09B8\u09CD\u0995\u09CB\u09B0 \u09AB\u09BF\u09B0\u09C7 \u0986\u09B8\u09C7\u0964"},question:"Build a counter with +1, -1 and an Undo button.",answer:"Instead of storing only the current count, store a history array of counts; the current value is the last item. Each change appends a new value, and Undo removes the last entry (never the initial one). Using the functional updater form keeps updates correct even when clicks happen quickly, and adding a separate 'future' stack would give Redo.",points:["State = history array, current count is derived (history.at(-1)) - not stored twice","Append immutably: [...h, next]; undo: h.slice(0, -1)","Disable Undo when only the initial value is left","Functional setState avoids stale values on rapid clicks","Redo: keep a future stack, clear it on any new change; useReducer scales better for this"],code:`import { useState } from 'react';
export default function UndoCounter() {
  const [history, setHistory] = useState([0]);
  const count = history[history.length - 1];
  const change = (delta) => setHistory((h) => [...h, h[h.length - 1] + delta]);
  const undo = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => change(1)}>+1</button>
      <button onClick={() => change(-1)}>-1</button>
      <button onClick={undo} disabled={history.length === 1}>Undo</button>
    </div>
  );
}`},{id:"rc-2",level:"fresher",topic:"react-coding",difficulty:"easy",simple:{hi:"Todo list ek maa ki shopping list jaisi hai - nayi cheez neeche jodo, jo le li uspe tick lagao, aur jo nahi chahiye use kaat do. Har cheez ki apni pehchaan (id) hai, taaki 'doodh' aur 'dahi' kabhi mix na hon.",en:"A todo list is like mom's shopping list - add new things at the bottom, tick what you've bought, and strike out what you don't need. Every item has its own identity (id) so 'milk' and 'curd' never get mixed up.",bn:"Todo list \u09B9\u09B2\u09CB \u09AE\u09BE\u09AF\u09BC\u09C7\u09B0 \u09AC\u09BE\u099C\u09BE\u09B0\u09C7\u09B0 \u09AB\u09B0\u09CD\u09A6\u09C7\u09B0 \u09AE\u09A4\u09CB - \u09A8\u09A4\u09C1\u09A8 \u099C\u09BF\u09A8\u09BF\u09B8 \u09A8\u09BF\u099A\u09C7 \u09AF\u09CB\u0997 \u0995\u09B0\u09CB, \u09AF\u09BE \u0995\u09C7\u09A8\u09BE \u09B9\u09AF\u09BC\u09C7 \u0997\u09C7\u099B\u09C7 \u09A4\u09BE\u09A4\u09C7 \u099F\u09BF\u0995 \u09A6\u09BE\u0993, \u0986\u09B0 \u09AF\u09BE \u09B2\u09BE\u0997\u09AC\u09C7 \u09A8\u09BE \u09B8\u09C7\u099F\u09BE \u0995\u09C7\u099F\u09C7 \u09A6\u09BE\u0993\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u099C\u09BF\u09A8\u09BF\u09B8\u09C7\u09B0 \u09A8\u09BF\u099C\u09B8\u09CD\u09AC \u09AA\u09B0\u09BF\u099A\u09AF\u09BC (id) \u0986\u099B\u09C7, \u09A4\u09BE\u0987 '\u09A6\u09C1\u09A7' \u0986\u09B0 '\u09A6\u0987' \u0995\u0996\u09A8\u09CB \u0997\u09C1\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC \u09A8\u09BE\u0964"},question:"Build a todo list where you can add, toggle and delete items.",answer:"Keep the todos in a state array of objects with a stable id, the text and a done flag, plus a separate state for the input text (a controlled input). Add creates a new array with the new item, toggle maps over the array returning a copied item with done flipped, and delete filters it out - all immutable updates. Use the id as the key and wrap the input in a form so Enter also submits.",points:["Controlled input: value + onChange; trim and ignore empty text","Generate ids once when the item is created (crypto.randomUUID()), never during render","Immutable updates: spread to add, map to toggle, filter to delete","key={todo.id}, not the index","form onSubmit + e.preventDefault() so Enter works; type='button' on non-submit buttons"],code:`import { useState } from 'react';
export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  function add(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos((t) => [...t, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText('');
  }
  const toggle = (id) => setTodos((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const remove = (id) => setTodos((t) => t.filter((x) => x.id !== id));
  return (
    <form onSubmit={add}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="New todo" /> <button>Add</button>
      <ul>{todos.map((t) => (
        <li key={t.id}>
          <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
          <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
          <button type="button" onClick={() => remove(t.id)}>Delete</button>
        </li>))}
      </ul>
    </form>
  );
}`},{id:"rc-3",level:"junior",topic:"react-coding",difficulty:"medium",simple:{hi:"Debounce aisa hai jaise dukaandaar tab tak saamaan nahi tolta jab tak aap poori list bol na do - har ek shabd par daudta nahi. Aur agar aapne beech mein order badal diya, to purana order cancel (abort) kar deta hai.",en:"Debounce is like a shopkeeper who waits until you finish reading out your whole list before weighing anything - he doesn't run off after every word. And if you change the order midway, he cancels (aborts) the old one.",bn:"Debounce \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7 \u09A4\u09C1\u09AE\u09BF \u09AA\u09C1\u09B0\u09CB \u09AB\u09B0\u09CD\u09A6 \u09AC\u09B2\u09BE \u09B6\u09C7\u09B7 \u09A8\u09BE \u0995\u09B0\u09BE \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09AE\u09BE\u09B2 \u0993\u099C\u09A8 \u0995\u09B0\u09C7 \u09A8\u09BE - \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09B6\u09AC\u09CD\u09A6\u09C7 \u09A6\u09CC\u09A1\u09BC\u09BE\u09AF\u09BC \u09A8\u09BE\u0964 \u0986\u09B0 \u09AE\u09BE\u099D\u09AA\u09A5\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09AC\u09A6\u09B2\u09BE\u09B2\u09C7 \u09AA\u09C1\u09B0\u09A8\u09CB \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09AC\u09BE\u09A4\u09BF\u09B2 (abort) \u0995\u09B0\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964"},question:"Implement a debounced search box that fetches results with loading and error states.",answer:"Keep the query in state and run the search in a useEffect that depends on it. Inside the effect start a setTimeout (e.g. 400 ms) and return a cleanup that clears the timer and aborts the previous request with an AbortController, so typing quickly sends only one request and stale responses can never overwrite newer ones. Track status (idle/loading/error) explicitly, check res.ok, and ignore AbortError.",points:["Debounce = wait until the user stops typing; the effect cleanup cancels the pending timer","AbortController cancels in-flight requests and prevents race conditions","fetch only rejects on network errors - check res.ok and throw for 4xx/5xx","encodeURIComponent the query; skip the request when the query is empty","In real apps TanStack Query with a debounced key gives caching for free"],code:`import { useEffect, useState } from 'react';
export default function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  useEffect(() => {
    if (!query.trim()) { setResults([]); setStatus('idle'); return; }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setStatus('loading');
      try {
        const res = await fetch(\`/api/search?q=\${encodeURIComponent(query)}\`, { signal: controller.signal });
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        setResults(await res.json()); setStatus('idle');
      } catch (err) { if (err.name !== 'AbortError') setStatus('error'); }
    }, 400);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />
      {status !== 'idle' && <p role="status">{status === 'loading' ? 'Loading...' : 'Something went wrong'}</p>}
      <ul>{results.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
    </>
  );
}`},{id:"rc-4",level:"junior",topic:"react-coding",difficulty:"medium",simple:{hi:"Form validation railway reservation counter ke clerk jaisa hai - aap form bharte ho, aur woh har khaana check karta hai ki naam aur umar sahi likhi hai ya nahi. Galti ho to wahi line par bata deta hai, form jama tabhi hota hai jab sab theek ho.",en:"Form validation is like the clerk at a railway reservation counter - you fill the form and he checks every box, like whether the name and age are filled correctly. If something is wrong he points to that line, and the form is accepted only when everything is right.",bn:"Form validation \u09B9\u09B2\u09CB \u09B0\u09C7\u09B2\u09C7\u09B0 \u09B0\u09BF\u099C\u09BE\u09B0\u09CD\u09AD\u09C7\u09B6\u09A8 \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0\u09C7\u09B0 \u0995\u09CD\u09B2\u09BE\u09B0\u09CD\u0995\u09C7\u09B0 \u09AE\u09A4\u09CB - \u09A4\u09C1\u09AE\u09BF \u09AB\u09B0\u09CD\u09AE \u09AD\u09B0\u09CB, \u0986\u09B0 \u09B8\u09C7 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u0998\u09B0 \u09A6\u09C7\u0996\u09C7 \u09A8\u09BE\u09AE \u0986\u09B0 \u09AC\u09AF\u09BC\u09B8 \u09A0\u09BF\u0995\u09AE\u09A4\u09CB \u09B2\u09C7\u0996\u09BE \u0995\u09BF\u09A8\u09BE\u0964 \u09AD\u09C1\u09B2 \u09A5\u09BE\u0995\u09B2\u09C7 \u09B8\u09C7\u0987 \u09B2\u09BE\u0987\u09A8\u099F\u09BE\u0987 \u09A6\u09C7\u0996\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC, \u09B8\u09AC \u09A0\u09BF\u0995 \u09B9\u09B2\u09C7 \u09A4\u09AC\u09C7\u0987 \u09AB\u09B0\u09CD\u09AE \u099C\u09AE\u09BE \u09B9\u09AF\u09BC\u0964"},question:"Build a signup form with client-side validation (email and password) that shows errors after the user leaves a field.",answer:"Store field values and a 'touched' map in state, and compute errors from the values on every render with a pure validate function instead of storing them. Show an error only if the field was touched (on blur) or after a submit attempt, and on submit mark all fields touched and only call onSubmit when there are no errors. For larger forms use react-hook-form with a schema library like Zod, and always re-validate on the server.",points:["Controlled inputs with a single change handler using e.target.name","Errors are derived state - compute them, don't sync them with useEffect","Touched/blur logic avoids shouting errors before the user types","noValidate to control messages yourself; aria-invalid and role='alert' for accessibility","Production: react-hook-form + Zod, or React 19 form actions with useActionState","Client validation is UX only - the server must validate again"],code:`import { useState } from 'react';
function validate({ email, password }) {
  const errors = {};
  if (!/^\\S+@\\S+\\.\\S+$/.test(email)) errors.email = 'Enter a valid email';
  if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  return errors;
}
export default function SignupForm({ onSubmit }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});
  const errors = validate(values); // derived on every render
  const change = (e) => setValues({ ...values, [e.target.name]: e.target.value });
  const blur = (e) => setTouched({ ...touched, [e.target.name]: true });
  const submit = (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (Object.keys(errors).length === 0) onSubmit(values);
  };
  const show = (f) => touched[f] && errors[f] && <p role="alert">{errors[f]}</p>;
  return (
    <form onSubmit={submit} noValidate>
      <input name="email" value={values.email} onChange={change} onBlur={blur} aria-invalid={!!(touched.email && errors.email)} />
      {show('email')}
      <input name="password" type="password" value={values.password} onChange={change} onBlur={blur} />
      {show('password')}
      <button>Sign up</button>
    </form>
  );
}`},{id:"rc-5",level:"junior",topic:"react-coding",difficulty:"medium",simple:{hi:"Infinite scroll ek paani puri wale jaisa hai - aapki plate khatam hone se pehle hi agli puri tayyar rakhta hai, ek saath saari puri nahi deta. Jab dekhta hai ki aap aakhri puri tak pahunch gaye (sentinel dikha), tab agli plate deta hai.",en:"Infinite scroll is like a pani puri seller - he gets the next puri ready just before you finish, he doesn't hand you all of them at once. When he sees you reach the last one (the sentinel is visible), he serves the next round.",bn:"Infinite scroll \u09B9\u09B2\u09CB \u09AB\u09C1\u099A\u0995\u09BE\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB - \u09A4\u09CB\u09AE\u09BE\u09B0 \u09AA\u09CD\u09B2\u09C7\u099F \u09B6\u09C7\u09B7 \u09B9\u0993\u09AF\u09BC\u09BE\u09B0 \u09A0\u09BF\u0995 \u0986\u0997\u09C7 \u09AA\u09B0\u09C7\u09B0\u099F\u09BE \u09A4\u09C8\u09B0\u09BF \u09B0\u09BE\u0996\u09C7, \u09B8\u09AC \u098F\u0995\u09B8\u09BE\u09A5\u09C7 \u09A6\u09C7\u09AF\u09BC \u09A8\u09BE\u0964 \u09AF\u0996\u09A8 \u09A6\u09C7\u0996\u09C7 \u09A4\u09C1\u09AE\u09BF \u09B6\u09C7\u09B7\u099F\u09BE\u09AF\u09BC \u09AA\u09CC\u0981\u099B\u09C7 \u0997\u09C7\u099B (sentinel \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u099A\u09CD\u099B\u09C7), \u09A4\u0996\u09A8 \u09AA\u09B0\u09C7\u09B0 \u09A6\u09AB\u09BE \u09A6\u09C7\u09AF\u09BC\u0964"},question:"Implement infinite scroll (load the next page when the user reaches the bottom of the list).",answer:"Keep items, the current page, hasMore and loading in state. One effect fetches whenever page changes and appends the new items, using an ignore flag in cleanup so a stale or double (Strict Mode) request doesn't append twice. A second effect attaches an IntersectionObserver to a sentinel element at the end of the list and increments page when it becomes visible, but only while not loading and while more data exists. The same structure works for 'Load more' or numbered pagination by changing what triggers setPage.",points:["IntersectionObserver is far cheaper than listening to scroll events","Guard with loading/hasMore so the observer can't fire repeated requests","Append immutably: setItems(prev => [...prev, ...newItems])","Cleanup: disconnect the observer and ignore stale responses","rootMargin pre-loads before the user hits the very bottom","Very long lists: add virtualization; in real apps useInfiniteQuery from TanStack Query"],code:`import { useEffect, useRef, useState } from 'react';
export default function InfiniteList() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef(null);
  useEffect(() => {
    let ignore = false;
    setLoading(true);
    fetch(\`/api/items?page=\${page}&limit=20\`)
      .then((r) => r.json())
      .then((d) => { if (!ignore) { setItems((p) => [...p, ...d.items]); setHasMore(d.hasMore); } })
      .finally(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [page]);
  useEffect(() => {
    if (!hasMore || loading) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setPage((p) => p + 1), { rootMargin: '200px' });
    io.observe(sentinelRef.current);
    return () => io.disconnect();
  }, [hasMore, loading]);
  return (
    <ul>
      {items.map((it) => <li key={it.id}>{it.title}</li>)}
      {hasMore && <li ref={sentinelRef}>{loading ? 'Loading...' : ''}</li>}
    </ul>
  );
}`},{id:"rc-6",level:"mid",topic:"react-coding",difficulty:"hard",simple:{hi:"Modal ek bank ke cabin jaisa hai - andar jaate hi darwaza band, aur aap sirf cabin ke andar ki cheezon se baat kar sakte ho (focus trap). Kaam khatam (Escape ya Close) hote hi aap wahin wapas aate ho jahan line mein khade the (focus restore).",en:"A modal is like a cabin in a bank - once you go in, the door closes and you can only deal with things inside the cabin (focus trap). When you're done (Escape or Close), you return to exactly where you were standing in the queue (focus restore).",bn:"Modal \u09B9\u09B2\u09CB \u09AC\u09CD\u09AF\u09BE\u0982\u0995\u09C7\u09B0 \u0995\u09C7\u09AC\u09BF\u09A8\u09C7\u09B0 \u09AE\u09A4\u09CB - \u09AD\u09C7\u09A4\u09B0\u09C7 \u09A2\u09C1\u0995\u09B2\u09C7\u0987 \u09A6\u09B0\u099C\u09BE \u09AC\u09A8\u09CD\u09A7, \u0986\u09B0 \u09A4\u09C1\u09AE\u09BF \u09B6\u09C1\u09A7\u09C1 \u0995\u09C7\u09AC\u09BF\u09A8\u09C7\u09B0 \u09AD\u09C7\u09A4\u09B0\u09C7\u09B0 \u099C\u09BF\u09A8\u09BF\u09B8 \u09A8\u09BF\u09AF\u09BC\u09C7\u0987 \u0995\u09BE\u099C \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09CB (focus trap)\u0964 \u0995\u09BE\u099C \u09B6\u09C7\u09B7 \u09B9\u09B2\u09C7 (Escape \u09AC\u09BE Close) \u09A4\u09C1\u09AE\u09BF \u09B2\u09BE\u0987\u09A8\u09C7 \u09A0\u09BF\u0995 \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u099B\u09BF\u09B2\u09C7 \u09B8\u09C7\u0996\u09BE\u09A8\u09C7\u0987 \u09AB\u09BF\u09B0\u09C7 \u0986\u09B8\u09CB (focus restore)\u0964"},question:"Build an accessible modal using a portal, with Escape to close, basic focus trapping and focus restore.",answer:"Render the modal with createPortal into document.body so parent overflow or z-index can't clip it. When it opens, remember the previously focused element, move focus into the dialog, and add a keydown listener: Escape closes, and Tab/Shift+Tab wrap between the first and last focusable elements so focus can't escape. On close (effect cleanup) remove the listener and return focus to the element that opened the modal; mark the dialog with role='dialog', aria-modal and aria-labelledby. The native <dialog> element with showModal() gives much of this for free and is a good alternative.",points:["createPortal(\u2026, document.body) for stacking/overflow issues","role='dialog' + aria-modal='true' + aria-labelledby pointing to the title","Focus first element on open; restore focus to the trigger on close","Trap Tab and Shift+Tab; close on Escape and on backdrop click (stopPropagation inside)","Optionally lock body scroll and set inert on the rest of the app","Native <dialog>.showModal() or libraries (Radix, React Aria) handle edge cases"],code:`import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
export function Modal({ open, onClose, title, children }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement;
    const items = () => [...dialogRef.current.querySelectorAll(FOCUSABLE)];
    items()[0]?.focus();
    function onKeyDown(e) {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab') return;
      const els = items(), first = els[0], last = els.at(-1);
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('keydown', onKeyDown); previous?.focus(); };
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div className="backdrop" onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="modal-title">{title}</h2>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}`},{id:"rc-7",level:"mid",topic:"react-coding",difficulty:"medium",simple:{hi:"useFetch ek ghar ke delivery boy jaisa hai - aap order do, woh saamaan laata hai aur batata hai 'raste mein hoon', 'aa gaya' ya 'dukaan band thi'. Agar aapne beech mein order badal diya ya ghar chhod diya, to woh purana order cancel (abort) kar deta hai.",en:"useFetch is like your family's delivery boy - you give an order, he brings it and tells you 'on the way', 'delivered' or 'the shop was closed'. If you change the order midway or leave home, he cancels (aborts) the old order.",bn:"useFetch \u09B9\u09B2\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u09AC\u09AF\u09BC\u09C7\u09B0 \u09AE\u09A4\u09CB - \u09A4\u09C1\u09AE\u09BF \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BE\u0993, \u09B8\u09C7 \u099C\u09BF\u09A8\u09BF\u09B8 \u0986\u09A8\u09C7 \u0986\u09B0 \u099C\u09BE\u09A8\u09BE\u09AF\u09BC '\u09B0\u09BE\u09B8\u09CD\u09A4\u09BE\u09AF\u09BC \u0986\u099B\u09BF', '\u098F\u09B8\u09C7 \u0997\u09C7\u099B\u09BF' \u09AC\u09BE '\u09A6\u09CB\u0995\u09BE\u09A8 \u09AC\u09A8\u09CD\u09A7 \u099B\u09BF\u09B2'\u0964 \u09AE\u09BE\u099D\u09AA\u09A5\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09AC\u09A6\u09B2\u09BE\u09B2\u09C7 \u09AC\u09BE \u09AC\u09BE\u09A1\u09BC\u09BF \u099B\u09C7\u09A1\u09BC\u09C7 \u0997\u09C7\u09B2\u09C7 \u09B8\u09C7 \u09AA\u09C1\u09B0\u09A8\u09CB \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09AC\u09BE\u09A4\u09BF\u09B2 (abort) \u0995\u09B0\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964"},question:"Write a custom useFetch hook that returns data, error and loading, and aborts the request when the URL changes or the component unmounts.",answer:"A custom hook is a function starting with 'use' that composes other hooks. useFetch keeps { data, error, loading } in state and runs fetch in a useEffect keyed on the URL; it creates an AbortController per run, passes its signal to fetch, and aborts in the cleanup. Aborting prevents race conditions (an old slow response overwriting a newer one) and setting state after unmount; AbortError is ignored, HTTP errors are turned into thrown errors by checking res.ok.",points:["One AbortController per effect run; controller.abort() in cleanup","Ignore AbortError - it is expected, not a failure","Check res.ok; fetch resolves even on 404/500","Dependencies: url (objects like options must be stable or memoised, or they refetch every render)","Strict Mode in dev mounts twice - the abort in cleanup makes this harmless","For production caching/retries prefer TanStack Query; React 19's use() + Suspense is another option"],code:`import { useEffect, useState } from 'react';
export function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: !!url });
  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((error) => {
        if (error.name !== 'AbortError') setState({ data: null, error, loading: false });
      });
    return () => controller.abort(); // URL changed or component unmounted
  }, [url]);
  return state;
}
// usage: const { data: user, error, loading } = useFetch(\`/api/users/\${id}\`);`},{id:"rc-8",level:"senior",topic:"react-coding",difficulty:"hard",simple:{hi:"Yeh aisa hai jaise har baar aap ek shabd bolo aur poori class ko ginti dobara karni pade. Hal: sirf bolne wala bachcha badle (state neeche le jao), baaki class tab tak aaraam kare jab tak sawaal sach mein na badle (memo), aur ginti thoda ruk kar ho (useDeferredValue).",en:"It's like making the whole class recount everything every time you say one word. The fix: only the child who speaks changes (move state down), the rest of the class rests until the question really changes (memo), and the counting happens a moment later (useDeferredValue).",bn:"\u098F\u099F\u09BE \u09AF\u09C7\u09A8 \u09A4\u09C1\u09AE\u09BF \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09B6\u09AC\u09CD\u09A6 \u09AC\u09B2\u09B2\u09C7\u0987 \u09AA\u09C1\u09B0\u09CB \u0995\u09CD\u09B2\u09BE\u09B8\u0995\u09C7 \u0986\u09AC\u09BE\u09B0 \u0997\u09CB\u09A8\u09BE \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC\u0964 \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8: \u09B6\u09C1\u09A7\u09C1 \u09AF\u09C7 \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u09AC\u09B2\u099B\u09C7 \u09B8\u09C7 \u09AC\u09A6\u09B2\u09BE\u0995 (state \u09A8\u09BF\u099A\u09C7 \u09A8\u09BE\u09AE\u09BE\u0993), \u09AC\u09BE\u0995\u09BF \u0995\u09CD\u09B2\u09BE\u09B8 \u09AC\u09BF\u09B6\u09CD\u09B0\u09BE\u09AE \u09A8\u09BF\u0995 \u09AF\u09A4\u0995\u09CD\u09B7\u09A3 \u09A8\u09BE \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u09B8\u09A4\u09CD\u09AF\u09BF\u0987 \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC (memo), \u0986\u09B0 \u0997\u09CB\u09A8\u09BE\u099F\u09BE \u098F\u0995\u099F\u09C1 \u09AA\u09B0\u09C7 \u09B9\u09CB\u0995 (useDeferredValue)\u0964"},question:"Scenario: a search input sits above a large product list, and the whole list re-renders on every keystroke, making typing laggy. How do you fix it?",answer:"First I profile with React DevTools Profiler to confirm what re-renders and why. The usual cause is that the input's state lives in the same component as the list, so every keystroke re-renders the list, often made worse by new inline props (arrow functions, filtered arrays) that defeat memoisation, or by index/random keys. Fixes, in order: colocate state (move the input's state into its own component if the list doesn't depend on it); otherwise memoise the list with React.memo and stable props (useMemo for the filtered array, useCallback for handlers, or the React Compiler); use useDeferredValue so the input updates urgently while the list catches up; and virtualise very long lists so only visible rows render.",points:["Measure first: Profiler's 'why did this render' and highlight updates","Colocate / move state down so keystrokes don't touch the list's parent","React.memo on the list and rows + stable props (useMemo/useCallback or React Compiler)","useDeferredValue(query) (or startTransition) keeps typing responsive","Virtualise big lists (TanStack Virtual, react-window); stable keys from ids","Debounce only if each keystroke triggers network or very expensive work"],code:`import { memo, useDeferredValue, useMemo, useState } from 'react';
const ProductList = memo(function ProductList({ items, onSelect }) {
  return (
    <ul>
      {items.map((p) => <li key={p.id} onClick={() => onSelect(p.id)}>{p.name}</li>)}
    </ul>
  );
});
// onSelect must be stable in the parent (useCallback) or memo is defeated
export default function Catalog({ products, onSelect }) {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query); // input renders first, list catches up
  const filtered = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(deferredQuery.toLowerCase())),
    [products, deferredQuery]
  );
  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
      <ProductList items={filtered} onSelect={onSelect} />
    </>
  );
}`},{id:"rh-1",level:"fresher",topic:"react-hooks",difficulty:"easy",simple:{hi:"Hooks ek school ki attendance list jaise hain. Teacher roz naam usi order mein bulati hai; agar kisi din order badal gaya to galat bachche ko galat marks mil jaate hain. Isliye hooks hamesha same order mein, top par hi call karne chahiye.",en:"Hooks are like the school attendance list. The teacher calls names in the same order every day; if the order changes one day, the wrong child gets the wrong marks. So hooks must always be called in the same order, at the top.",bn:"Hooks \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09B9\u09BE\u099C\u09BF\u09B0\u09BE \u0996\u09BE\u09A4\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u099F\u09BF\u099A\u09BE\u09B0 \u09B0\u09CB\u099C \u098F\u0995\u0987 \u0995\u09CD\u09B0\u09AE\u09C7 \u09A8\u09BE\u09AE \u09A1\u09BE\u0995\u09C7\u09A8; \u0995\u09CB\u09A8\u09CB\u09A6\u09BF\u09A8 \u0995\u09CD\u09B0\u09AE \u09AC\u09A6\u09B2\u09C7 \u0997\u09C7\u09B2\u09C7 \u09AD\u09C1\u09B2 \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u09AD\u09C1\u09B2 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09AA\u09C7\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964 \u09A4\u09BE\u0987 hooks \u09B8\u09AC\u09B8\u09AE\u09AF\u09BC \u098F\u0995\u0987 \u0995\u09CD\u09B0\u09AE\u09C7, \u098F\u0995\u09A6\u09AE \u0989\u09AA\u09B0\u09C7 call \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC\u0964"},question:"What are React hooks and what are the rules of hooks?",answer:"Hooks are functions (names starting with `use`) that let function components use React features such as state, effects, context and refs. The two rules: call hooks only at the top level of a component or custom hook (never inside conditions, loops, nested functions or after an early return), and call them only from React function components or custom hooks, not from regular JS functions or class components. React identifies each hook by its call order, so the order must be the same on every render. The one exception is the React 19 `use` API, which may be called conditionally.",points:["Hooks let function components have state, effects, context, refs","Call hooks only at the top level \u2014 no if/loops/early returns before them","Call hooks only from components or custom hooks","React tracks hooks by call order on every render","eslint-plugin-react-hooks enforces the rules","`use` (React 19) is the exception \u2014 it can be called conditionally"],code:`function Profile({ user }) {
  // WRONG: hook inside a condition changes call order
  // if (user) { const [name, setName] = useState(user.name); }

  // RIGHT: always call hooks at the top level
  const [name, setName] = useState(user?.name ?? '');
  useEffect(() => {
    if (user) document.title = user.name; // condition goes INSIDE the hook
  }, [user]);

  if (!user) return <p>Please log in</p>; // early return AFTER hooks
  return <input value={name} onChange={e => setName(e.target.value)} />;
}`},{id:"rh-2",level:"fresher",topic:"react-hooks",difficulty:"easy",simple:{hi:"useState ek scoreboard jaisa hai. Tum scorer ko bolte ho 'ek run jodo', par board turant nahi badalta \u2014 agle update (re-render) par naya score dikhta hai. Abhi jo score tum dekh rahe ho wo purana snapshot hai.",en:"useState is like a cricket scoreboard. You tell the scorer 'add one run', but the board does not change instantly \u2014 the new score shows on the next update (re-render). What you see right now is the old snapshot.",bn:"useState \u09B9\u09B2\u09CB \u0995\u09CD\u09B0\u09BF\u0995\u09C7\u099F\u09C7\u09B0 \u09B8\u09CD\u0995\u09CB\u09B0\u09AC\u09CB\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A4\u09C1\u09AE\u09BF \u09B8\u09CD\u0995\u09CB\u09B0\u09BE\u09B0\u0995\u09C7 \u09AC\u09B2\u09CB '\u098F\u0995 \u09B0\u09BE\u09A8 \u09AF\u09CB\u0997 \u0995\u09B0\u09CB', \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AC\u09CB\u09B0\u09CD\u09A1 \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC \u09A8\u09BE \u2014 \u09AA\u09B0\u09C7\u09B0 \u0986\u09AA\u09A1\u09C7\u099F\u09C7 (re-render) \u09A8\u09A4\u09C1\u09A8 \u09B8\u09CD\u0995\u09CB\u09B0 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 \u098F\u0996\u09A8 \u09AF\u09C7\u099F\u09BE \u09A6\u09C7\u0996\u099B \u09B8\u09C7\u099F\u09BE \u09AA\u09C1\u09B0\u09A8\u09CB snapshot\u0964"},question:"How does useState work, and why don't I see the new value right after calling the setter?",answer:"`useState(initial)` returns a pair: the current state value and a setter function. Calling the setter does not change the variable in the current render; it schedules a re-render, and in the next render `useState` returns the new value. Each render has its own constant snapshot of state, which is why `console.log(count)` right after `setCount(count + 1)` still prints the old value. If the initial value is expensive to compute, pass a function (lazy initializer) so it runs only on the first render.",points:["Returns [value, setter]; initial value used only on first render","Setter schedules a re-render \u2014 it does not mutate the current variable","State is a snapshot per render, so logs after set show the old value","React can bail out of the re-render if the new value is Object.is-equal to the old","Lazy initialization: useState(() => expensiveCalc())"],code:`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [todos] = useState(() => JSON.parse(localStorage.getItem('todos') ?? '[]'));

  function handleClick() {
    setCount(count + 1);
    console.log(count); // still the OLD value (snapshot of this render)
  }

  return <button onClick={handleClick}>Clicked {count} times ({todos.length} todos)</button>;
}`},{id:"rh-3",level:"fresher",topic:"react-hooks",difficulty:"easy",simple:{hi:"useEffect ek chowkidar jaisa hai jise tumne list di hai: 'jab ye cheezein badlein, tab kaam karna'. Khali list [] ho to wo sirf pehle din kaam karta hai; koi list hi na ho to har baar kaam karta hai.",en:"useEffect is like a watchman you gave a list to: 'do the job when these things change'. With an empty list [] he works only on the first day; with no list at all he works every single time.",bn:"useEffect \u09B9\u09B2\u09CB \u098F\u0995 \u09A6\u09BE\u09B0\u09CB\u09AF\u09BC\u09BE\u09A8\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09BE\u0995\u09C7 \u09A4\u09C1\u09AE\u09BF \u098F\u0995\u099F\u09BE \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09A6\u09BF\u09AF\u09BC\u09C7\u099B: '\u098F\u0987 \u099C\u09BF\u09A8\u09BF\u09B8\u0997\u09C1\u09B2\u09CB \u09AC\u09A6\u09B2\u09BE\u09B2\u09C7 \u0995\u09BE\u099C\u099F\u09BE \u0995\u09B0\u09AC\u09C7'\u0964 \u0996\u09BE\u09B2\u09BF \u09A4\u09BE\u09B2\u09BF\u0995\u09BE [] \u09B9\u09B2\u09C7 \u09B8\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09AA\u09CD\u09B0\u09A5\u09AE \u09A6\u09BF\u09A8 \u0995\u09BE\u099C \u0995\u09B0\u09C7; \u0995\u09CB\u09A8\u09CB \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u09A8\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09BE\u09B0\u0987 \u0995\u09BE\u099C \u0995\u09B0\u09C7\u0964"},question:"What is useEffect and how does the dependency array control when it runs?",answer:"`useEffect` lets a component synchronize with something outside React \u2014 network requests, subscriptions, timers, manual DOM or browser APIs. It runs after React has committed the render to the screen. With no dependency array it runs after every render; with an empty array `[]` it runs once after mount (and its cleanup on unmount); with `[a, b]` it runs after mount and again whenever `a` or `b` changes (compared with Object.is). Every reactive value (props, state, values derived from them) used inside the effect should be listed as a dependency.",points:["Used for side effects / syncing with external systems","Runs after the render is committed, not during render","No array \u2192 every render; [] \u2192 once after mount; [deps] \u2192 when deps change","Dependencies compared with Object.is (reference for objects/functions)","List every reactive value used inside \u2014 don't silence the lint rule"],code:`import { useEffect, useState } from 'react';

function ChatRoom({ roomId }) {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    console.log('Runs after every render');
  });

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []); // once after mount, cleanup on unmount

  useEffect(() => {
    document.title = \`Room: \${roomId}\`;
  }, [roomId]); // whenever roomId changes

  return <p>{roomId} - {online ? 'online' : 'offline'}</p>;
}`},{id:"rh-4",level:"fresher",topic:"react-hooks",difficulty:"easy",simple:{hi:"useRef tumhari jeb (pocket) jaisa hai. Usme tum chupke se cheez rakh sakte ho, aur kisi ko pata nahi chalta \u2014 koi announcement (re-render) nahi hota. State class ke notice board jaisa hai: badalte hi sab dekh lete hain.",en:"useRef is like your pocket. You can quietly keep something in it and nobody notices \u2014 no announcement (re-render) happens. State is like the class notice board: change it and everyone sees it.",bn:"useRef \u09B9\u09B2\u09CB \u09A4\u09CB\u09AE\u09BE\u09B0 \u09AA\u0995\u09C7\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A4\u09BE\u09A4\u09C7 \u099A\u09C1\u09AA\u099A\u09BE\u09AA \u0995\u09BF\u099B\u09C1 \u09B0\u09C7\u0996\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC, \u0995\u09C7\u0989 \u099F\u09C7\u09B0 \u09AA\u09BE\u09AF\u09BC \u09A8\u09BE \u2014 \u0995\u09CB\u09A8\u09CB \u0998\u09CB\u09B7\u09A3\u09BE (re-render) \u09B9\u09AF\u09BC \u09A8\u09BE\u0964 State \u09B9\u09B2\u09CB \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09A8\u09CB\u099F\u09BF\u09B8 \u09AC\u09CB\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB: \u09AC\u09A6\u09B2\u09BE\u09B2\u09C7\u0987 \u09B8\u09AC\u09BE\u0987 \u09A6\u09C7\u0996\u09C7 \u09AB\u09C7\u09B2\u09C7\u0964"},question:"What is useRef used for, and how is a ref different from state?",answer:"`useRef(initial)` returns a mutable object `{ current }` that stays the same across renders. It has two main uses: holding a reference to a DOM node (pass it to the `ref` attribute) and storing any mutable value that should survive re-renders \u2014 like a timer id or previous value \u2014 without causing a re-render. Changing `ref.current` does not re-render, while updating state does; so use state for anything shown on screen and refs for 'behind the scenes' values. Avoid reading or writing `ref.current` during render; do it in effects or event handlers. In React 19, function components can receive `ref` as a normal prop, so `forwardRef` is no longer needed.",points:["Returns the same { current } object on every render","DOM access: focus, scroll, measure via ref={myRef}","Mutable values (timer ids, previous values) that don't need re-render","Changing ref.current does NOT trigger a re-render; setState does","Don't read/write ref.current during render","React 19: ref can be passed as a prop \u2014 forwardRef not needed"],code:`import { useRef, useState } from 'react';

function Stopwatch() {
  const inputRef = useRef(null);   // DOM ref
  const intervalRef = useRef(null); // mutable value
  const [seconds, setSeconds] = useState(0);

  function start() {
    inputRef.current.focus();
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  }
  const stop = () => clearInterval(intervalRef.current);

  return (
    <>
      <input ref={inputRef} placeholder="Lap name" />
      <p>{seconds}s</p>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}`},{id:"rh-5",level:"fresher",topic:"react-hooks",difficulty:"easy",simple:{hi:"Context ghar ke Wi-Fi jaisa hai. Har kamre tak alag taar (props) le jaane ki zaroorat nahi \u2014 router ek baar lagao, aur ghar ka koi bhi kamra (component) seedha signal le sakta hai.",en:"Context is like the home Wi-Fi. You don't need to run a separate wire (props) to every room \u2014 set up the router once, and any room (component) in the house can pick up the signal directly.",bn:"Context \u09B9\u09B2\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 Wi-Fi-\u098F\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u0998\u09B0\u09C7 \u0986\u09B2\u09BE\u09A6\u09BE \u09A4\u09BE\u09B0 (props) \u099F\u09BE\u09A8\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE \u2014 \u098F\u0995\u09AC\u09BE\u09B0 router \u09AC\u09B8\u09BE\u0993, \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u0998\u09B0 (component) \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF signal \u09AA\u09C7\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What is useContext and how does it solve prop drilling?",answer:"Context lets a parent provide a value to every component below it in the tree without passing it through props at each level (prop drilling). You create it with `createContext(defaultValue)`, wrap a subtree in a provider with a `value`, and read it in any descendant with `useContext(MyContext)`. When the provider's value changes, every component that reads that context re-renders. In React 19 you can render `<MyContext value={...}>` directly as the provider; `<MyContext.Provider>` still works. It suits app-wide data such as theme, locale or logged-in user, not frequently changing large state.",points:["createContext \u2192 Provider with value \u2192 useContext in descendants","Avoids passing props through many intermediate components","Reads the nearest provider above; default value if none","All consumers re-render when the provided value changes","React 19: <Ctx value={...}> works as the provider","Good for theme, auth user, locale"],code:`import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export default function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext value={theme}>
      <Toolbar />
      <button onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}>Toggle</button>
    </ThemeContext>
  );
}

function Toolbar() {
  return <ThemedButton />; // no theme prop passed through here
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am {theme}</button>;
}`},{id:"rh-6",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"Socho teen dost ek hi purani bill copy dekh kar dukaan wale ko bolte hain 'total 1 kar do' \u2014 teeno baar total 1 hi hoga. Functional update aisa hai jaise har dost latest bill dekh kar ek jode: 1, phir 2, phir 3. Batching matlab dukaandar saare order ek saath likhta hai, baar baar nahi.",en:"Imagine three friends all look at the same old bill and tell the shopkeeper 'make the total 1' \u2014 it stays 1. A functional update is like each friend checking the latest bill and adding one: 1, then 2, then 3. Batching means the shopkeeper writes all orders at once, not one by one.",bn:"\u09AD\u09BE\u09AC\u09CB \u09A4\u09BF\u09A8 \u09AC\u09A8\u09CD\u09A7\u09C1 \u098F\u0995\u0987 \u09AA\u09C1\u09B0\u09A8\u09CB \u09AC\u09BF\u09B2 \u09A6\u09C7\u0996\u09C7 \u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0\u0995\u09C7 \u09AC\u09B2\u09B2 '\u09AE\u09CB\u099F 1 \u0995\u09B0\u09C7 \u09A6\u09BE\u0993' \u2014 \u09A4\u09BF\u09A8\u09AC\u09BE\u09B0\u0987 1 \u09A5\u09BE\u0995\u09AC\u09C7\u0964 Functional update \u09AE\u09BE\u09A8\u09C7 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u09AC\u09A8\u09CD\u09A7\u09C1 \u09B8\u09B0\u09CD\u09AC\u09B6\u09C7\u09B7 \u09AC\u09BF\u09B2 \u09A6\u09C7\u0996\u09C7 \u098F\u0995 \u09AF\u09CB\u0997 \u0995\u09B0\u09C7: 1, \u09A4\u09BE\u09B0\u09AA\u09B0 2, \u09A4\u09BE\u09B0\u09AA\u09B0 3\u0964 Batching \u09AE\u09BE\u09A8\u09C7 \u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0 \u09B8\u09AC \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u098F\u0995\u09B8\u09BE\u09A5\u09C7 \u09B2\u09C7\u0996\u09C7, \u098F\u0995\u099F\u09BE \u098F\u0995\u099F\u09BE \u0995\u09B0\u09C7 \u09A8\u09AF\u09BC\u0964"},question:"What is the output? Explain batching and functional updates in useState.",answer:"After one click the count becomes 1, not 3, and the log prints 0. All three calls read `count` from the same render snapshot (0), so each one schedules 'set to 1'. React batches state updates made in the same event (and, since React 18, also in timeouts, promises and native handlers) into a single re-render. To update based on the previous value, use a functional updater `setCount(c => c + 1)`: React queues the updaters and applies them in order, giving 3.",points:["Output: logs 0, count becomes 1","Each call uses the same stale snapshot value","Automatic batching: multiple setState calls \u2192 one re-render","Batching applies in events, timeouts, promises (React 18+)","Use setX(prev => ...) when new state depends on old state","flushSync (react-dom) forces a synchronous update \u2014 rarely needed"],code:`function Counter() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1); // set to 0 + 1
    setCount(count + 1); // set to 0 + 1
    setCount(count + 1); // set to 0 + 1
    console.log(count);  // 0
  }
  // After click: count === 1, one re-render

  function handleClickFixed() {
    setCount(c => c + 1); // 0 -> 1
    setCount(c => c + 1); // 1 -> 2
    setCount(c => c + 1); // 2 -> 3
  }

  return <button onClick={handleClick}>{count}</button>;
}`},{id:"rh-7",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"State ko ek printed exam result sheet samjho. Usme pen se kaat-peet (mutation) karoge to principal ko pata nahi chalega ki kuch badla. Sahi tareeka hai nayi sheet print karna \u2014 nayi sheet dekhte hi sab samajh jaate hain ki update hua hai.",en:"Think of state as a printed exam result sheet. If you scribble on it with a pen (mutation), the principal won't notice anything changed. The right way is to print a fresh sheet \u2014 the moment a new sheet appears, everyone knows there is an update.",bn:"State-\u0995\u09C7 \u098F\u0995\u099F\u09BE \u099B\u09BE\u09AA\u09BE\u09A8\u09CB \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09B0 \u09B0\u09C7\u099C\u09BE\u09B2\u09CD\u099F \u09B6\u09BF\u099F \u09AD\u09BE\u09AC\u09CB\u0964 \u09A4\u09BE\u09A4\u09C7 \u0995\u09B2\u09AE \u09A6\u09BF\u09AF\u09BC\u09C7 \u0995\u09BE\u099F\u09BE\u0995\u09C1\u099F\u09BF (mutation) \u0995\u09B0\u09B2\u09C7 \u09AA\u09CD\u09B0\u09BF\u09A8\u09CD\u09B8\u09BF\u09AA\u09BE\u09B2 \u09AC\u09C1\u099D\u09A4\u09C7\u0987 \u09AA\u09BE\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE \u0995\u09BF\u099B\u09C1 \u09AC\u09A6\u09B2\u09C7\u099B\u09C7\u0964 \u09A0\u09BF\u0995 \u0989\u09AA\u09BE\u09AF\u09BC \u09B9\u09B2\u09CB \u09A8\u09A4\u09C1\u09A8 \u09B6\u09BF\u099F \u099B\u09BE\u09AA\u09BE\u09A8\u09CB \u2014 \u09A8\u09A4\u09C1\u09A8 \u09B6\u09BF\u099F \u09A6\u09C7\u0996\u09B2\u09C7\u0987 \u09B8\u09AC\u09BE\u0987 \u09AC\u09CB\u099D\u09C7 \u0986\u09AA\u09A1\u09C7\u099F \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964"},question:"How do you correctly update object and array state in React?",answer:"State must be treated as immutable: create a new object or array instead of mutating the existing one. React compares the old and new state with `Object.is`, so if you mutate and pass the same reference, it may skip the re-render and you also break things like memoization. Use spread for objects (`{ ...user, name }`), and `map`, `filter`, spread or `toSorted`/`toSpliced` for arrays instead of `push`, `splice`, `sort` or direct assignment. Unlike class `setState`, the `useState` setter does not merge objects \u2014 you must copy the other fields yourself.",points:["Never mutate state; always return a new object/array","React detects change by reference (Object.is)","Objects: { ...prev, field: value }; nested objects copy each level","Arrays: map/filter/spread/toSorted instead of push/splice/sort","useState setter replaces, it does not merge","For deep nesting consider useReducer or a library like Immer"],code:`const [user, setUser] = useState({ name: 'Asha', address: { city: 'Pune' } });
const [todos, setTodos] = useState([{ id: 1, text: 'Learn hooks', done: false }]);

// WRONG: mutation, same reference
// user.name = 'Ravi'; setUser(user);
// todos.push(newTodo); setTodos(todos);

// RIGHT
setUser(prev => ({ ...prev, name: 'Ravi' }));
setUser(prev => ({ ...prev, address: { ...prev.address, city: 'Kolkata' } }));

setTodos(prev => [...prev, { id: 2, text: 'Practice', done: false }]); // add
setTodos(prev => prev.filter(t => t.id !== 1));                        // remove
setTodos(prev => prev.map(t => (t.id === 2 ? { ...t, done: true } : t))); // update`},{id:"rh-8",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"Cleanup aisa hai jaise khana khane ke baad apni thali dhona. Agar har baar naye khaane se pehle purani thali nahi dhoyi to rasoi mein gande bartan jama ho jaate hain (memory leak). StrictMode wali maa jaan-boojh kar ek baar extra check karti hai ki tum thali dhote ho ya nahi.",en:"Cleanup is like washing your plate after eating. If you don't wash the old plate before the next meal, dirty dishes pile up in the kitchen (memory leak). StrictMode is like a mother who deliberately checks once extra to see whether you wash your plate.",bn:"Cleanup \u09AE\u09BE\u09A8\u09C7 \u0996\u09BE\u0993\u09AF\u09BC\u09BE\u09B0 \u09AA\u09B0 \u09A8\u09BF\u099C\u09C7\u09B0 \u09A5\u09BE\u09B2\u09BE \u09A7\u09C1\u09AF\u09BC\u09C7 \u09B0\u09BE\u0996\u09BE\u0964 \u09AA\u09B0\u09C7\u09B0 \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u0986\u0997\u09C7 \u09AA\u09C1\u09B0\u09A8\u09CB \u09A5\u09BE\u09B2\u09BE \u09A8\u09BE \u09A7\u09C1\u09B2\u09C7 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0\u09C7 \u098F\u0981\u099F\u09CB \u09AC\u09BE\u09B8\u09A8 \u099C\u09AE\u09C7 \u09AF\u09BE\u09AF\u09BC (memory leak)\u0964 StrictMode \u09B9\u09B2\u09CB \u09AE\u09BE\u09AF\u09BC\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09BF\u09A8\u09BF \u0987\u099A\u09CD\u099B\u09C7 \u0995\u09B0\u09C7 \u098F\u0995\u09AC\u09BE\u09B0 \u09AC\u09BE\u09A1\u09BC\u09A4\u09BF \u09A6\u09C7\u0996\u09C7 \u09A8\u09C7\u09A8 \u09A4\u09C1\u09AE\u09BF \u09A5\u09BE\u09B2\u09BE \u09A7\u09CB\u0993 \u0995\u09BF\u09A8\u09BE\u0964"},question:"What is the useEffect cleanup function, when does it run, and why does my effect run twice in development?",answer:"The function you return from an effect is its cleanup. React runs it before re-running the effect with new dependencies, and once more when the component unmounts. Use it to undo what the effect did: clear timers, unsubscribe, remove listeners, close connections or abort fetches \u2014 otherwise you get memory leaks and duplicate subscriptions. In development with `<StrictMode>`, React deliberately mounts, runs cleanup, and mounts again (setup \u2192 cleanup \u2192 setup) to expose effects that lack proper cleanup; this does not happen in production. The fix is to write a correct cleanup, not to block the second run with a flag.",points:["Cleanup = the function returned from the effect","Runs before the next effect run (deps changed) and on unmount","Use for timers, subscriptions, listeners, sockets, AbortController","Missing cleanup \u2192 leaks, duplicate listeners, setState on stale data","StrictMode (dev only) runs setup \u2192 cleanup \u2192 setup to catch bugs","Fix with proper cleanup, not a 'didRun' ref hack"],code:`import { useEffect } from 'react';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const socket = new WebSocket(\`wss://chat.example.com/\${roomId}\`);
    socket.onmessage = e => console.log(e.data);
    console.log('connected to', roomId);

    return () => {
      socket.close(); // runs when roomId changes, and on unmount
      console.log('disconnected from', roomId);
    };
  }, [roomId]);

  return <h2>Room {roomId}</h2>;
}
// Dev + StrictMode on mount: connected -> disconnected -> connected`},{id:"rh-9",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"useMemo aisa hai jaise maths ke lambe sawaal ka answer copy mein likh kar rakhna \u2014 sawaal na badle to dobara solve nahi karte. useCallback aisa hai jaise ek hi phone number sabko dena \u2014 number roz nahi badalta, isliye dost confuse nahi hote.",en:"useMemo is like writing the answer of a long maths problem in your notebook \u2014 if the question doesn't change, you don't solve it again. useCallback is like giving everyone the same phone number \u2014 it doesn't change every day, so friends don't get confused.",bn:"useMemo \u09AE\u09BE\u09A8\u09C7 \u0985\u0999\u09CD\u0995\u09C7\u09B0 \u09B2\u09AE\u09CD\u09AC\u09BE \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8\u09C7\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09BF\u0996\u09C7 \u09B0\u09BE\u0996\u09BE \u2014 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u09A8\u09BE \u09AC\u09A6\u09B2\u09BE\u09B2\u09C7 \u0986\u09AC\u09BE\u09B0 \u0995\u09B7\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964 useCallback \u09AE\u09BE\u09A8\u09C7 \u09B8\u09AC\u09BE\u0987\u0995\u09C7 \u098F\u0995\u0987 \u09AB\u09CB\u09A8 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u2014 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09B0\u09CB\u099C \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC \u09A8\u09BE, \u09A4\u09BE\u0987 \u09AC\u09A8\u09CD\u09A7\u09C1\u09B0\u09BE \u0997\u09C1\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AB\u09C7\u09B2\u09C7 \u09A8\u09BE\u0964"},question:"What is the difference between useMemo and useCallback? When should you use them?",answer:"`useMemo(fn, deps)` calls the function and caches its return value until a dependency changes; `useCallback(fn, deps)` caches the function itself, so its reference stays stable. In fact `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. Use `useMemo` for genuinely expensive calculations or to keep an object/array reference stable, and `useCallback` mainly when passing a callback to a memoized child or using it as a dependency of another hook. They are performance optimizations, not correctness tools \u2014 adding them everywhere adds overhead and noise. With the React Compiler enabled, much of this memoization is done automatically.",points:["useMemo caches a computed value; useCallback caches a function reference","useCallback(fn, d) === useMemo(() => fn, d)","Recompute only when dependencies change (Object.is)","Use for expensive calculations, stable props to memoized children, hook dependencies","Don't wrap everything \u2014 measure first","React Compiler can auto-memoize, reducing manual use"],code:`import { useMemo, useCallback, useState, memo } from 'react';

const ProductList = memo(function ProductList({ items, onSelect }) {
  return items.map(p => <li key={p.id} onClick={() => onSelect(p.id)}>{p.name}</li>);
});

function Shop({ products }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(
    () => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase())),
    [products, query]
  );
  const handleSelect = useCallback(id => setSelected(id), []);

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <p>Selected: {selected}</p>
      <ul><ProductList items={filtered} onSelect={handleSelect} /></ul>
    </>
  );
}`},{id:"rh-10",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"useReducer ek restaurant ke kitchen jaisa hai. Waiter (dispatch) sirf order slip deta hai \u2014 'ek dosa add karo' \u2014 aur chef (reducer) apne fixed recipe book se decide karta hai ki thali kaisi banegi. Saare niyam ek hi jagah, kitchen mein.",en:"useReducer is like a restaurant kitchen. The waiter (dispatch) only hands over an order slip \u2014 'add one dosa' \u2014 and the chef (reducer) uses his fixed recipe book to decide how the plate turns out. All the rules live in one place, the kitchen.",bn:"useReducer \u09B9\u09B2\u09CB \u09B0\u09C7\u09B8\u09CD\u09A4\u09CB\u09B0\u09BE\u0981\u09B0 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0 (dispatch) \u09B6\u09C1\u09A7\u09C1 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09B8\u09CD\u09B2\u09BF\u09AA \u09A6\u09C7\u09AF\u09BC \u2014 '\u098F\u0995\u099F\u09BE \u09A6\u09CB\u09B8\u09BE \u09AF\u09CB\u0997 \u0995\u09B0\u09CB' \u2014 \u0986\u09B0 \u09B6\u09C7\u09AB (reducer) \u09A4\u09BE\u09B0 \u09A8\u09BF\u09B0\u09CD\u09A6\u09BF\u09B7\u09CD\u099F \u09B0\u09C7\u09B8\u09BF\u09AA\u09BF \u09AC\u0987 \u09A6\u09C7\u0996\u09C7 \u09A0\u09BF\u0995 \u0995\u09B0\u09C7 \u09A5\u09BE\u09B2\u09BE \u0995\u09C7\u09AE\u09A8 \u09B9\u09AC\u09C7\u0964 \u09B8\u09AC \u09A8\u09BF\u09AF\u09BC\u09AE \u098F\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09AF\u09BC, \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0\u09C7\u0964"},question:"When would you use useReducer instead of useState? Show an example.",answer:"`useReducer(reducer, initialState)` moves state update logic into a pure function `reducer(state, action)` that returns the next state, and gives you a `dispatch` function to send actions. Prefer it when state has several related fields, when the next state depends on the previous one in complex ways, or when many event handlers update the same state \u2014 it centralizes the logic, makes it easy to test, and `dispatch` is stable across renders. `useState` is simpler for independent, primitive values. The reducer must be pure: no side effects, no mutation.",points:["useReducer(reducer, initialState) \u2192 [state, dispatch]","Reducer is pure: (state, action) => newState, no mutation/side effects","Good for complex or related state and many update types","Logic is centralized and easy to unit test","dispatch identity is stable \u2014 safe to pass down","useState for simple independent values"],code:`import { useReducer } from 'react';

function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, items: [...state.items, action.item], total: state.total + action.item.price };
    case 'remove': {
      const item = state.items.find(i => i.id === action.id);
      if (!item) return state;
      return { items: state.items.filter(i => i.id !== action.id), total: state.total - item.price };
    }
    default:
      throw new Error(\`Unknown action: \${action.type}\`);
  }
}

function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  return (
    <button onClick={() => dispatch({ type: 'add', item: { id: Date.now(), name: 'Chai', price: 20 } })}>
      Add chai (\u20B9{cart.total})
    </button>
  );
}`},{id:"rh-11",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"Class component ek purani railway timetable jaisa hai \u2014 'train aayi', 'train ruki', 'train gayi' har stage ka alag kaam. Hooks wali soch aisi hai: 'jab tak platform number yeh hai, tab tak announcement chalu rakho, badle to band karke naya karo'.",en:"A class component is like an old railway timetable \u2014 separate jobs for 'train arrived', 'train stopped', 'train left'. Thinking with hooks is: 'while the platform number is this, keep the announcement running; if it changes, stop it and start a new one'.",bn:"Class component \u09B9\u09B2\u09CB \u09AA\u09C1\u09B0\u09A8\u09CB \u09B0\u09C7\u09B2\u09C7\u09B0 \u099F\u09BE\u0987\u09AE\u099F\u09C7\u09AC\u09BF\u09B2\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 '\u099F\u09CD\u09B0\u09C7\u09A8 \u098F\u09B2', '\u099F\u09CD\u09B0\u09C7\u09A8 \u09A5\u09BE\u09AE\u09B2', '\u099F\u09CD\u09B0\u09C7\u09A8 \u0997\u09C7\u09B2' \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE\u09B0 \u0986\u09B2\u09BE\u09A6\u09BE \u0995\u09BE\u099C\u0964 Hooks-\u098F\u09B0 \u09AD\u09BE\u09AC\u09A8\u09BE \u09B9\u09B2\u09CB: '\u09AF\u09A4\u0995\u09CD\u09B7\u09A3 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09AB\u09B0\u09CD\u09AE \u09A8\u09AE\u09CD\u09AC\u09B0 \u098F\u099F\u09BE, \u09A4\u09A4\u0995\u09CD\u09B7\u09A3 \u0998\u09CB\u09B7\u09A3\u09BE \u099A\u09BE\u09B2\u09C1 \u09B0\u09BE\u0996\u09CB; \u09AC\u09A6\u09B2\u09BE\u09B2\u09C7 \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09C7 \u09A8\u09A4\u09C1\u09A8\u099F\u09BE \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09CB'\u0964"},question:"How do class component lifecycle methods map to hooks?",answer:"Hooks replace lifecycle methods by thinking in terms of synchronization rather than time. `componentDidMount` maps to `useEffect(fn, [])`; `componentDidUpdate` maps to `useEffect(fn, [deps])` (which also runs on mount); `componentWillUnmount` maps to the cleanup function returned from an effect. `constructor` state becomes `useState`/`useReducer`, `shouldComponentUpdate` is replaced by `React.memo`, and `getDerivedStateFromProps` is usually replaced by computing values during render. There is no hook for `componentDidCatch`/`getDerivedStateFromError` \u2014 error boundaries still need a class component (or a library wrapping one) \u2014 and `getSnapshotBeforeUpdate` has no direct hook equivalent.",points:["componentDidMount \u2192 useEffect(fn, [])","componentDidUpdate \u2192 useEffect(fn, [deps]) (also runs on mount)","componentWillUnmount \u2192 effect cleanup","constructor/this.state \u2192 useState / useReducer","shouldComponentUpdate \u2192 React.memo; getDerivedStateFromProps \u2192 compute in render","Error boundaries (componentDidCatch) still require a class"],code:`import { useEffect, useState } from 'react';

function UserStatus({ userId }) {
  const [status, setStatus] = useState('offline'); // constructor state

  useEffect(() => {
    // componentDidMount + componentDidUpdate (when userId changes)
    const unsubscribe = statusApi.subscribe(userId, setStatus);
    return () => {
      // componentWillUnmount + before re-subscribing
      unsubscribe();
    };
  }, [userId]);

  useEffect(() => {
    console.log('mounted once');
  }, []); // componentDidMount only

  return <span>{status}</span>;
}`},{id:"rh-12",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"Custom hook ek ghar ki recipe jaisa hai \u2014 'maa ka masala chai'. Recipe sab use kar sakte hain, par har ek ki apni alag cup bani chai hoti hai. useDebounce aisa hai jaise bus conductor tab tak bus nahi chalata jab tak log chadhna band na kar dein.",en:"A custom hook is like a family recipe \u2014 'mum's masala chai'. Everyone can use the recipe, but each person gets their own separate cup. useDebounce is like a bus conductor who doesn't start the bus until people stop climbing in.",bn:"Custom hook \u09B9\u09B2\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u098F\u0995\u099F\u09BE \u09B0\u09C7\u09B8\u09BF\u09AA\u09BF\u09B0 \u09AE\u09A4\u09CB \u2014 '\u09AE\u09BE\u09AF\u09BC\u09C7\u09B0 \u09AE\u09B6\u09B2\u09BE \u099A\u09BE'\u0964 \u09B0\u09C7\u09B8\u09BF\u09AA\u09BF \u09B8\u09AC\u09BE\u0987 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995\u09C7\u09B0 \u0995\u09BE\u09AA \u0986\u09B2\u09BE\u09A6\u09BE\u0964 useDebounce \u09B9\u09B2\u09CB \u09B8\u09C7\u0987 \u09AC\u09BE\u09B8 \u0995\u09A8\u09CD\u09A1\u09BE\u0995\u09CD\u099F\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7 \u09B2\u09CB\u0995 \u0993\u09A0\u09BE \u09AC\u09A8\u09CD\u09A7 \u09A8\u09BE \u09B9\u0993\u09AF\u09BC\u09BE \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09AC\u09BE\u09B8 \u099B\u09BE\u09A1\u09BC\u09C7 \u09A8\u09BE\u0964"},question:"What is a custom hook? Write a useDebounce hook for a search box.",answer:"A custom hook is a JavaScript function whose name starts with `use` and which calls other hooks, letting you extract and reuse stateful logic between components. Each component that calls a custom hook gets its own independent state \u2014 hooks share logic, not state. `useDebounce` returns a value that only updates after the input has stopped changing for a given delay: an effect sets a timeout, and its cleanup clears the previous timeout whenever the value changes. This avoids firing an API request on every keystroke.",points:["Function named useXxx that calls other hooks","Reuses stateful logic, not state \u2014 each caller has its own state","Must follow the rules of hooks","useDebounce: setTimeout in effect, clearTimeout in cleanup","Deps [value, delay] restart the timer on every change","Common examples: useDebounce, useFetch, useLocalStorage, useOnlineStatus"],code:`import { useEffect, useState } from 'react';

export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id); // reset timer if value changes
  }, [value, delay]);

  return debounced;
}

function Search() {
  const [text, setText] = useState('');
  const query = useDebounce(text, 400);

  useEffect(() => {
    if (query) console.log('Call API for', query);
  }, [query]);

  return <input value={text} onChange={e => setText(e.target.value)} />;
}`},{id:"rh-13",level:"junior",topic:"react-hooks",difficulty:"medium",simple:{hi:"Infinite loop aisa hai jaise do bachche ek doosre ko kehte rahein 'tum bolo', 'nahi tum bolo' \u2014 baat kabhi khatam hi nahi hoti. Render state badalta hai, state render karwata hai, aur chakkar chalta rehta hai jab tak koi rule (sahi dependency) ise na tod de.",en:"An infinite loop is like two kids endlessly saying 'you speak', 'no, you speak' \u2014 the talk never ends. Render changes state, state causes render, and the circle keeps going until a rule (correct dependencies) breaks it.",bn:"Infinite loop \u09B9\u09B2\u09CB \u09A6\u09C1\u099F\u09CB \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0 \u09AE\u09A4\u09CB \u09AF\u09BE\u09B0\u09BE \u098F\u0995\u09C7 \u0985\u09AA\u09B0\u0995\u09C7 \u09AC\u09B2\u09C7\u0987 \u099A\u09B2\u09C7 '\u09A4\u09C1\u09AE\u09BF \u09AC\u09B2\u09CB', '\u09A8\u09BE \u09A4\u09C1\u09AE\u09BF \u09AC\u09B2\u09CB' \u2014 \u0995\u09A5\u09BE \u0986\u09B0 \u09B6\u09C7\u09B7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964 Render state \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC, state \u0986\u09AC\u09BE\u09B0 render \u0995\u09B0\u09BE\u09AF\u09BC, \u0986\u09B0 \u099A\u0995\u09CD\u09B0 \u099A\u09B2\u09A4\u09C7\u0987 \u09A5\u09BE\u0995\u09C7 \u09AF\u09A4\u0995\u09CD\u09B7\u09A3 \u09A8\u09BE \u0995\u09CB\u09A8\u09CB \u09A8\u09BF\u09AF\u09BC\u09AE (\u09A0\u09BF\u0995 dependency) \u09B8\u09C7\u099F\u09BE \u09AD\u09BE\u0999\u09C7\u0964"},question:"Scenario: your component is stuck in an infinite render loop. What are the common causes and fixes?",answer:"Infinite loops happen when rendering causes a state update that causes another render. Common causes: calling a setter directly during render; an effect with no dependency array that sets state; an effect whose dependency is an object, array or function created fresh on every render (new reference each time) and that sets state; and writing `onClick={setOpen(true)}` instead of `onClick={() => setOpen(true)}`. Fixes: move updates into event handlers or effects with correct deps, move object/function creation inside the effect or memoize it with `useMemo`/`useCallback`, depend on primitive values, and derive values during render instead of syncing them with an effect. React reports 'Too many re-renders' or 'Maximum update depth exceeded' in these cases.",points:["setState called directly in the render body","useEffect without deps that sets state","Object/array/function dependency recreated every render","onClick={fn()} calls the function during render","Fix: correct deps, primitives, useMemo/useCallback, move logic inside effect","Errors: 'Too many re-renders' / 'Maximum update depth exceeded'"],code:`function Results({ category }) {
  const [items, setItems] = useState([]);

  // BUG: new object every render -> effect runs -> setItems -> render -> ...
  // const filters = { category, limit: 10 };
  // useEffect(() => { fetchItems(filters).then(setItems); }, [filters]);

  // FIX: depend on primitives and build the object inside the effect
  useEffect(() => {
    let ignore = false;
    fetchItems({ category, limit: 10 }).then(data => {
      if (!ignore) setItems(data);
    });
    return () => { ignore = true; };
  }, [category]);

  // BUG: <button onClick={setItems([])}>  FIX:
  return <button onClick={() => setItems([])}>Clear ({items.length})</button>;
}`},{id:"rh-14",level:"mid",topic:"react-hooks",difficulty:"medium",simple:{hi:"useLayoutEffect aisa hai jaise photo kheenchne se pehle photographer bachche ki collar theek kar de \u2014 photo (paint) mein sab perfect dikhe. useEffect aisa hai jaise photo kheench lene ke baad kaam kiya jaaye \u2014 jaldi hota hai, par agar collar theek karna tha to photo mein galti dikh jaati hai.",en:"useLayoutEffect is like the photographer fixing a child's collar before clicking the photo \u2014 everything looks perfect in the picture (paint). useEffect is like doing the work after the photo is taken \u2014 faster, but if the collar needed fixing, the mistake shows in the photo.",bn:"useLayoutEffect \u09B9\u09B2\u09CB \u099B\u09AC\u09BF \u09A4\u09CB\u09B2\u09BE\u09B0 \u0986\u0997\u09C7 \u09AB\u099F\u09CB\u0997\u09CD\u09B0\u09BE\u09AB\u09BE\u09B0\u09C7\u09B0 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0 \u0995\u09B2\u09BE\u09B0 \u09A0\u09BF\u0995 \u0995\u09B0\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 \u099B\u09AC\u09BF\u09A4\u09C7 (paint) \u09B8\u09AC \u09A8\u09BF\u0996\u09C1\u0981\u09A4 \u09A6\u09C7\u0996\u09BE\u09AF\u09BC\u0964 useEffect \u09B9\u09B2\u09CB \u099B\u09AC\u09BF \u09A4\u09CB\u09B2\u09BE\u09B0 \u09AA\u09B0\u09C7 \u0995\u09BE\u099C \u0995\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 \u09A4\u09BE\u09A1\u09BC\u09BE\u09A4\u09BE\u09A1\u09BC\u09BF \u09B9\u09AF\u09BC, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0995\u09B2\u09BE\u09B0 \u09A0\u09BF\u0995 \u0995\u09B0\u09BE\u09B0 \u09A6\u09B0\u0995\u09BE\u09B0 \u09A5\u09BE\u0995\u09B2\u09C7 \u099B\u09AC\u09BF\u09A4\u09C7 \u09AD\u09C1\u09B2\u099F\u09BE \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What is the difference between useLayoutEffect and useEffect? When would you use useLayoutEffect?",answer:"Both have the same signature, but they run at different times. `useLayoutEffect` runs synchronously after React updates the DOM but before the browser paints, so any state update inside it is applied before the user sees anything; `useEffect` normally runs after the paint and does not block it. Use `useLayoutEffect` only when you must measure layout (size, position, scroll) and adjust before paint to avoid a visible flicker \u2014 for example positioning a tooltip. It blocks painting, so overusing it hurts performance, and it does nothing during server rendering. Default to `useEffect`.",points:["Same API; different timing","useLayoutEffect: after DOM mutation, before paint \u2014 blocks paint","useEffect: usually after paint \u2014 non-blocking","Use layout effect for measuring DOM and preventing flicker (tooltips, scroll restore)","Overuse slows rendering; doesn't run on the server","Default choice is useEffect"],code:`import { useLayoutEffect, useRef, useState } from 'react';

function Tooltip({ targetRect, text }) {
  const ref = useRef(null);
  const [top, setTop] = useState(0);

  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    // place above if there is room, else below \u2014 decided BEFORE paint
    setTop(targetRect.top - height > 0 ? targetRect.top - height : targetRect.bottom);
  }, [targetRect]);

  return (
    <div ref={ref} style={{ position: 'fixed', top, left: targetRect.left }}>
      {text}
    </div>
  );
}`},{id:"rh-15",level:"mid",topic:"react-hooks",difficulty:"hard",simple:{hi:"Stale closure aisa hai jaise tumne pichhle saal ki photo jeb mein rakh li aur ab bhi usi se dost ko pehchaan rahe ho \u2014 dost bada ho gaya, par tumhari photo purani hai. Fix: har baar nayi photo lo (dependency) ya dost se seedha poochho (functional update).",en:"A stale closure is like keeping last year's photo in your pocket and still using it to recognise your friend \u2014 the friend has grown, but your photo is old. Fix: take a new photo each time (dependency) or just ask the friend directly (functional update).",bn:"Stale closure \u09B9\u09B2\u09CB \u0997\u09A4 \u09AC\u099B\u09B0\u09C7\u09B0 \u099B\u09AC\u09BF \u09AA\u0995\u09C7\u099F\u09C7 \u09B0\u09C7\u0996\u09C7 \u098F\u0996\u09A8\u0993 \u09B8\u09C7\u099F\u09BE \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AC\u09A8\u09CD\u09A7\u09C1\u0995\u09C7 \u099A\u09C7\u09A8\u09BE\u09B0 \u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0995\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 \u09AC\u09A8\u09CD\u09A7\u09C1 \u09AC\u09A1\u09BC \u09B9\u09AF\u09BC\u09C7 \u0997\u09C7\u099B\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09A4\u09CB\u09AE\u09BE\u09B0 \u099B\u09AC\u09BF \u09AA\u09C1\u09B0\u09A8\u09CB\u0964 \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8: \u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09BE\u09B0 \u09A8\u09A4\u09C1\u09A8 \u099B\u09AC\u09BF \u09A4\u09CB\u09B2\u09CB (dependency) \u0985\u09A5\u09AC\u09BE \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09AC\u09A8\u09CD\u09A7\u09C1\u0995\u09C7\u0987 \u099C\u09BF\u099C\u09CD\u099E\u09C7\u09B8 \u0995\u09B0\u09CB (functional update)\u0964"},question:"What is a stale closure in React hooks? Explain with an example and the fixes.",answer:"Every render creates new functions that 'close over' the props and state of that render. A stale closure happens when a function from an old render \u2014 kept alive by an effect with missing dependencies, a timer, or a memoized callback \u2014 keeps reading old values. In the example, the interval was created on the first render with `count = 0`, so it always sets 1. Fixes: use a functional updater (`setCount(c => c + 1)`), list the value as a dependency so the effect re-subscribes, store the latest value in a ref, or use `useEffectEvent` (available in recent React versions) to read the latest values from inside an effect without making them dependencies.",points:["Each render has its own props/state captured by closures","Old callbacks (timers, listeners, memoized fns) see old values","Usually caused by missing dependencies in useEffect/useCallback","Fix 1: functional updater setX(prev => ...)","Fix 2: correct dependencies; Fix 3: latest value in a ref","useEffectEvent reads latest values without re-running the effect"],code:`function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // BUG: count is always 0 here -> shows 1 forever
    }, 1000);
    return () => clearInterval(id);
  }, []); // effect captured count from the first render only

  return <h1>{count}</h1>;
}

// FIX: functional updater doesn't need to read count
useEffect(() => {
  const id = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(id);
}, []);`},{id:"rh-16",level:"mid",topic:"react-hooks",difficulty:"medium",simple:{hi:"Effect ek courier jaisa hai jo bahar ki duniya (doosre shehar) se samaan laata hai. Agar cheez ghar ke andar hi hai \u2014 jaise fridge se paani \u2014 to courier bulana bekaar hai, seedha le lo. Waise hi jo value props se nikal sakti hai, use render mein hi calculate karo.",en:"An effect is like a courier who brings things from the outside world (another city). If the thing is already inside the house \u2014 like water from the fridge \u2014 calling a courier is pointless, just take it. Similarly, a value you can get from props should be calculated during render.",bn:"Effect \u09B9\u09B2\u09CB \u098F\u0995 \u0995\u09C1\u09B0\u09BF\u09AF\u09BC\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7 \u09AC\u09BE\u0987\u09B0\u09C7\u09B0 \u099C\u0997\u09CE (\u0985\u09A8\u09CD\u09AF \u09B6\u09B9\u09B0) \u09A5\u09C7\u0995\u09C7 \u099C\u09BF\u09A8\u09BF\u09B8 \u0986\u09A8\u09C7\u0964 \u099C\u09BF\u09A8\u09BF\u09B8 \u09AF\u09A6\u09BF \u0998\u09B0\u09C7\u09B0 \u09AD\u09C7\u09A4\u09B0\u09C7\u0987 \u09A5\u09BE\u0995\u09C7 \u2014 \u09AF\u09C7\u09AE\u09A8 \u09AB\u09CD\u09B0\u09BF\u099C\u09C7\u09B0 \u099C\u09B2 \u2014 \u09A4\u09BE\u09B9\u09B2\u09C7 \u0995\u09C1\u09B0\u09BF\u09AF\u09BC\u09BE\u09B0 \u09A1\u09BE\u0995\u09BE \u09AC\u09C3\u09A5\u09BE, \u09B8\u09CB\u099C\u09BE \u09A8\u09BF\u09AF\u09BC\u09C7 \u09A8\u09BE\u0993\u0964 \u09A4\u09C7\u09AE\u09A8\u0987 \u09AF\u09C7 value props \u09A5\u09C7\u0995\u09C7 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC, \u09B8\u09C7\u099F\u09BE render-\u098F\u09B0 \u09B8\u09AE\u09AF\u09BC\u09C7\u0987 \u09B9\u09BF\u09B8\u09C7\u09AC \u0995\u09B0\u09CB\u0964"},question:"Explain 'You might not need an effect'. When should you NOT use useEffect?",answer:"Effects are an escape hatch for syncing with external systems; using them for pure React data flow adds extra renders and bugs. Don't use an effect to compute values from props or state \u2014 calculate them during render (use `useMemo` if expensive). Don't use one to respond to user actions \u2014 put that logic in the event handler, because you know exactly what happened there. To reset state when a prop changes, pass a different `key` instead of an effect, and avoid chains of effects that set state to trigger other effects. Keep effects for things like subscriptions, timers, network sync and non-React widgets.",points:["Effects are for syncing with systems outside React","Derived data: compute during render, not effect + setState","User actions (submit, buy, click): handle in event handlers","Reset state on prop change with key={id}","Avoid chains of effects updating each other","Fewer effects \u2192 fewer renders and fewer bugs"],code:`function TodoList({ todos, filter }) {
  // BAD: extra state + effect = extra render, can go out of sync
  // const [visible, setVisible] = useState([]);
  // useEffect(() => setVisible(todos.filter(t => t.status === filter)), [todos, filter]);

  // GOOD: derive during render
  const visible = todos.filter(t => t.status === filter);

  // BAD: useEffect(() => { if (submitted) postOrder(); }, [submitted]);
  // GOOD: do it in the handler that caused it
  function handleBuy() {
    postOrder(visible);
  }

  return <button onClick={handleBuy}>Buy {visible.length}</button>;
}

// Reset all state of a profile when user changes:
// <Profile key={userId} userId={userId} />`},{id:"rh-17",level:"mid",topic:"react-hooks",difficulty:"hard",simple:{hi:"useFetch aisa hai jaise tum Swiggy par khana order karo. Agar tumne order badal diya, to purana order cancel (abort) karna zaroori hai, warna dono delivery aa jayengi aur galat khana mez par rakh diya jayega. Hook loading, error aur khana \u2014 teeno ka hisaab rakhta hai.",en:"useFetch is like ordering food online. If you change your order, you must cancel (abort) the old one, or both deliveries arrive and the wrong food lands on the table. The hook keeps track of loading, error and the food \u2014 all three.",bn:"useFetch \u09B9\u09B2\u09CB \u0985\u09A8\u09B2\u09BE\u0987\u09A8\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u0995\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09AC\u09A6\u09B2\u09BE\u09B2\u09C7 \u09AA\u09C1\u09B0\u09A8\u09CB\u099F\u09BE \u09AC\u09BE\u09A4\u09BF\u09B2 (abort) \u0995\u09B0\u09A4\u09C7\u0987 \u09B9\u09AC\u09C7, \u09A8\u0987\u09B2\u09C7 \u09A6\u09C1\u099F\u09CB \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF\u0987 \u099A\u09B2\u09C7 \u0986\u09B8\u09AC\u09C7 \u0986\u09B0 \u09AD\u09C1\u09B2 \u0996\u09BE\u09AC\u09BE\u09B0 \u099F\u09C7\u09AC\u09BF\u09B2\u09C7 \u09AA\u09A1\u09BC\u09AC\u09C7\u0964 Hook \u099F\u09BE loading, error \u0986\u09B0 \u0996\u09BE\u09AC\u09BE\u09B0 \u2014 \u09A4\u09BF\u09A8\u099F\u09C7\u09B0\u0987 \u09B9\u09BF\u09B8\u09C7\u09AC \u09B0\u09BE\u0996\u09C7\u0964"},question:"Write a useFetch custom hook that handles loading, errors and race conditions.",answer:"The hook keeps `data`, `error` and `loading` in state and fetches inside an effect that depends on `url`. An `AbortController` is created per run and aborted in the cleanup, so when the URL changes quickly or the component unmounts, the old request is cancelled and cannot overwrite newer data (the race condition). Abort errors are ignored, and non-2xx responses are turned into errors because `fetch` only rejects on network failure. In real projects a data-fetching library or framework loader is usually preferred because it adds caching and deduplication, but interviewers use this to test effects and cleanup.",points:["State: data, error, loading; effect depends on url","AbortController per request; abort in cleanup","Prevents race conditions and updates after unmount","fetch doesn't reject on 404/500 \u2014 check res.ok","Ignore AbortError","Production: prefer a caching data library / framework data APIs"],code:`import { useEffect, useState } from 'react';

export function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState(s => ({ ...s, loading: true, error: null }));

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
        return res.json();
      })
      .then(data => setState({ data, error: null, loading: false }))
      .catch(error => {
        if (error.name !== 'AbortError') setState({ data: null, error, loading: false });
      });

    return () => controller.abort(); // cancel old request
  }, [url]);

  return state;
}
// const { data, error, loading } = useFetch(\`/api/users/\${id}\`);`},{id:"rh-18",level:"mid",topic:"react-hooks",difficulty:"medium",simple:{hi:"useId school ke roll number jaisa hai. Har bachche ko apna pakka number milta hai jo register (server) aur class (browser) dono mein same rehta hai. Agar roz lottery se number diye jaate (Math.random), to register aur class ka number match hi nahi karta.",en:"useId is like a school roll number. Each child gets a fixed number that stays the same in the register (server) and in the classroom (browser). If numbers were given by lottery every day (Math.random), the register and classroom would never match.",bn:"useId \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09B0\u09CB\u09B2 \u09A8\u09AE\u09CD\u09AC\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u098F\u0995\u099F\u09BE \u09AA\u09BE\u0995\u09BE \u09A8\u09AE\u09CD\u09AC\u09B0 \u09AA\u09BE\u09AF\u09BC, \u09AF\u09BE \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09BE\u09B0 (server) \u0986\u09B0 \u0995\u09CD\u09B2\u09BE\u09B8\u09B0\u09C1\u09AE (browser) \u09A6\u09C1\u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09A4\u09C7\u0987 \u098F\u0995 \u09A5\u09BE\u0995\u09C7\u0964 \u09B0\u09CB\u099C \u09B2\u099F\u09BE\u09B0\u09BF \u0995\u09B0\u09C7 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09A6\u09BF\u09B2\u09C7 (Math.random) \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09BE\u09B0 \u0986\u09B0 \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09A8\u09AE\u09CD\u09AC\u09B0 \u0995\u0996\u09A8\u09CB \u09AE\u09BF\u09B2\u09A4 \u09A8\u09BE\u0964"},question:"What is useId and why shouldn't you use Math.random() or a counter for element ids?",answer:"`useId()` generates a unique, stable string id for a component instance, typically used to link labels with inputs (`htmlFor`/`id`) and for ARIA attributes like `aria-describedby`. The id is the same on the server and the client because it is based on the component's position in the tree, so it does not cause hydration mismatches \u2014 unlike `Math.random()` or a global counter, which produce different values on server and client. Each instance of a component gets a different id, so reusable components don't clash. It must not be used for list keys; keys should come from your data.",points:["Generates unique, stable ids per component instance","Used for label/input pairing and ARIA attributes","Same on server and client \u2192 no hydration mismatch","Math.random()/counters differ between server and client","One call can be suffixed for several related ids","Not for list keys \u2014 use data ids"],code:`import { useId } from 'react';

function EmailField() {
  const id = useId();
  return (
    <>
      <label htmlFor={\`\${id}-email\`}>Email</label>
      <input id={\`\${id}-email\`} type="email" aria-describedby={\`\${id}-hint\`} />
      <p id={\`\${id}-hint\`}>We never share your email.</p>
    </>
  );
}

// Two instances get different ids automatically
export default function Form() {
  return (<><EmailField /><EmailField /></>);
}`},{id:"rh-19",level:"mid",topic:"react-hooks",difficulty:"hard",simple:{hi:"Socho ek hi sadak par ambulance aur bhaari truck dono hain. useTransition traffic police ko batata hai ki truck (bhaari list) ruk sakta hai, pehle ambulance (typing) jaane do. useDeferredValue aisa hai jaise notice board thoda der se update ho, par announcement turant ho.",en:"Imagine an ambulance and a heavy truck on the same road. useTransition tells the traffic police the truck (heavy list) can wait \u2014 let the ambulance (typing) go first. useDeferredValue is like the notice board updating a little later while the announcement happens immediately.",bn:"\u09AD\u09BE\u09AC\u09CB \u098F\u0995\u0987 \u09B0\u09BE\u09B8\u09CD\u09A4\u09BE\u09AF\u09BC \u0985\u09CD\u09AF\u09BE\u09AE\u09CD\u09AC\u09C1\u09B2\u09C7\u09A8\u09CD\u09B8 \u0986\u09B0 \u098F\u0995\u099F\u09BE \u09AD\u09BE\u09B0\u09C0 \u099F\u09CD\u09B0\u09BE\u0995 \u0986\u099B\u09C7\u0964 useTransition \u099F\u09CD\u09B0\u09BE\u09AB\u09BF\u0995 \u09AA\u09C1\u09B2\u09BF\u09B6\u0995\u09C7 \u09AC\u09B2\u09C7 \u099F\u09CD\u09B0\u09BE\u0995 (\u09AD\u09BE\u09B0\u09C0 list) \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7, \u0986\u0997\u09C7 \u0985\u09CD\u09AF\u09BE\u09AE\u09CD\u09AC\u09C1\u09B2\u09C7\u09A8\u09CD\u09B8 (typing) \u09AF\u09BE\u0995\u0964 useDeferredValue \u09B9\u09B2\u09CB \u09A8\u09CB\u099F\u09BF\u09B8 \u09AC\u09CB\u09B0\u09CD\u09A1 \u098F\u0995\u099F\u09C1 \u09AA\u09B0\u09C7 \u0986\u09AA\u09A1\u09C7\u099F \u09B9\u0993\u09AF\u09BC\u09BE\u09B0 \u09AE\u09A4\u09CB, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0998\u09CB\u09B7\u09A3\u09BE \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09B9\u09AF\u09BC\u0964"},question:"What are useTransition and useDeferredValue? How do they keep the UI responsive?",answer:"Both are concurrent features that mark some updates as non-urgent so urgent ones (typing, clicking) stay responsive. `useTransition` returns `[isPending, startTransition]`; you wrap a state update in `startTransition` when you control the setter, and React can interrupt that render if a more urgent update arrives, while `isPending` lets you show a loading hint. In React 19, `startTransition` also accepts async functions (Actions). `useDeferredValue(value)` is used when you only receive a value (e.g. a prop): it returns a lagging copy that updates in a background, interruptible render. Neither is debouncing \u2014 no fixed delay; they don't make the work itself faster.",points:["Mark updates as non-urgent; urgent input stays responsive","useTransition \u2192 [isPending, startTransition]; wrap the setter","useDeferredValue(value) \u2192 lagging copy when you don't own the setter","Background renders are interruptible","React 19: startTransition accepts async functions (Actions)","Not debounce/throttle \u2014 no fixed delay; pair with memoized heavy children"],code:`import { useState, useTransition, useDeferredValue, memo } from 'react';

function Search({ allItems }) {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [isPending, startTransition] = useTransition();

  function handleChange(e) {
    setText(e.target.value);                         // urgent: input stays snappy
    startTransition(() => setQuery(e.target.value)); // non-urgent: big list
  }

  return (
    <>
      <input value={text} onChange={handleChange} />
      {isPending && <p>Updating...</p>}
      <SlowList items={allItems} query={query} />
    </>
  );
}

const SlowList = memo(function SlowList({ items, query }) {
  const deferredQuery = useDeferredValue(query); // alternative when you only get a prop
  return <ul>{items.filter(i => i.includes(deferredQuery)).map(i => <li key={i}>{i}</li>)}</ul>;
});`},{id:"rh-20",level:"senior",topic:"react-hooks",difficulty:"hard",simple:{hi:"use aisa hai jaise tumne online parcel ka tracking slip (promise) le liya. Jab tak parcel nahi aata, ghar par 'aa raha hai' board (Suspense fallback) laga rehta hai; parcel aate hi tum use khol lete ho. Slip ek hi baar banti hai \u2014 har minute nayi slip banaoge to parcel kabhi nahi aayega.",en:"use is like holding a parcel tracking slip (promise). Until the parcel arrives, an 'on the way' board (Suspense fallback) hangs at home; once it arrives you open it. The slip is made only once \u2014 make a new slip every minute and the parcel never arrives.",bn:"use \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09AA\u09BE\u09B0\u09CD\u09B8\u09C7\u09B2\u09C7\u09B0 \u099F\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u09BF\u0982 \u09B8\u09CD\u09B2\u09BF\u09AA (promise) \u09B9\u09BE\u09A4\u09C7 \u09B0\u09BE\u0996\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09BE\u09B0\u09CD\u09B8\u09C7\u09B2 \u09A8\u09BE \u0986\u09B8\u09BE \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09AC\u09BE\u09A1\u09BC\u09BF\u09A4\u09C7 '\u0986\u09B8\u099B\u09C7' \u09AC\u09CB\u09B0\u09CD\u09A1 (Suspense fallback) \u099D\u09CB\u09B2\u09C7; \u09AA\u09BE\u09B0\u09CD\u09B8\u09C7\u09B2 \u098F\u09B2\u09C7\u0987 \u0996\u09C1\u09B2\u09C7 \u09AB\u09C7\u09B2\u09CB\u0964 \u09B8\u09CD\u09B2\u09BF\u09AA \u098F\u0995\u09AC\u09BE\u09B0\u0987 \u09AC\u09BE\u09A8\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC \u2014 \u09AA\u09CD\u09B0\u09A4\u09BF \u09AE\u09BF\u09A8\u09BF\u099F\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09B8\u09CD\u09B2\u09BF\u09AA \u09AC\u09BE\u09A8\u09BE\u09B2\u09C7 \u09AA\u09BE\u09B0\u09CD\u09B8\u09C7\u09B2 \u0995\u0996\u09A8\u09CB \u0986\u09B8\u09AC\u09C7 \u09A8\u09BE\u0964"},question:"What is the React 19 `use` API? How is it different from other hooks?",answer:"`use(resource)` reads the value of a Promise or a Context during render. With a Promise, the component suspends until it resolves \u2014 showing the nearest `<Suspense>` fallback \u2014 and a rejection goes to the nearest error boundary. With a Context it works like `useContext`. Unlike other hooks, `use` can be called inside conditions and loops (but still only inside a component or hook, and not inside try/catch). The Promise should not be created during render in a client component, because a new Promise every render would suspend forever; create it in a Server Component, a cached function or outside render and pass it down.",points:["use(promise) suspends until resolved; use(context) reads context","Works with Suspense for loading and error boundaries for errors","Can be called conditionally / in loops \u2014 unlike other hooks","Still only inside components or hooks; not in try/catch","Don't create the promise during client render \u2014 pass a cached/stable one","Common pattern: Server Component starts fetch, Client Component calls use()"],code:`'use client';
import { use, Suspense } from 'react';
import { ThemeContext } from './theme';

function Comments({ commentsPromise, showTheme }) {
  const comments = use(commentsPromise); // suspends until resolved
  const theme = showTheme ? use(ThemeContext) : 'light'; // conditional is allowed
  return (
    <ul className={theme}>
      {comments.map(c => <li key={c.id}>{c.text}</li>)}
    </ul>
  );
}

export function Post({ commentsPromise }) {
  // commentsPromise is created once by the parent / server, not here
  return (
    <Suspense fallback={<p>Loading comments...</p>}>
      <Comments commentsPromise={commentsPromise} showTheme />
    </Suspense>
  );
}`},{id:"rh-21",level:"senior",topic:"react-hooks",difficulty:"hard",simple:{hi:"Socho school ka admission form. useActionState counter wale babu jaisa hai \u2014 form lo, check karo, aur jawab do: 'photo missing hai' ya 'admission ho gaya'. useFormStatus line mein khade bachche jaisa hai jo dekh sakta hai ki form abhi jama ho raha hai, isliye wo dobara button nahi dabata.",en:"Think of a school admission form. useActionState is like the clerk at the counter \u2014 takes the form, checks it, and replies: 'photo missing' or 'admission done'. useFormStatus is like a child in the queue who can see the form is still being submitted, so he doesn't press the button again.",bn:"\u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09AD\u09B0\u09CD\u09A4\u09BF\u09B0 \u09AB\u09B0\u09CD\u09AE\u09C7\u09B0 \u0995\u09A5\u09BE \u09AD\u09BE\u09AC\u09CB\u0964 useActionState \u09B9\u09B2\u09CB \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0\u09C7\u09B0 \u0995\u09C7\u09B0\u09BE\u09A8\u09BF\u09AC\u09BE\u09AC\u09C1\u09B0 \u09AE\u09A4\u09CB \u2014 \u09AB\u09B0\u09CD\u09AE \u09A8\u09C7\u09A8, \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7\u09A8, \u0986\u09B0 \u0989\u09A4\u09CD\u09A4\u09B0 \u09A6\u09C7\u09A8: '\u099B\u09AC\u09BF \u09A8\u09C7\u0987' \u09AC\u09BE '\u09AD\u09B0\u09CD\u09A4\u09BF \u09B9\u09AF\u09BC\u09C7 \u0997\u09C7\u099B\u09C7'\u0964 useFormStatus \u09B9\u09B2\u09CB \u09B2\u09BE\u0987\u09A8\u09C7 \u09A6\u09BE\u0981\u09A1\u09BC\u09BE\u09A8\u09CB \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7 \u09A6\u09C7\u0996\u09A4\u09C7 \u09AA\u09BE\u09AF\u09BC \u09AB\u09B0\u09CD\u09AE \u098F\u0996\u09A8\u0993 \u099C\u09AE\u09BE \u09B9\u099A\u09CD\u099B\u09C7, \u09A4\u09BE\u0987 \u0986\u09AC\u09BE\u09B0 \u09AC\u09CB\u09A4\u09BE\u09AE \u099F\u09C7\u09AA\u09C7 \u09A8\u09BE\u0964"},question:"Explain useActionState and useFormStatus in React 19 with a form example.",answer:"React 19 lets you pass a function (an Action) to `<form action={fn}>`; React calls it with the `FormData` inside a transition and resets uncontrolled fields after success. `useActionState(action, initialState)` wraps such an action and returns `[state, formAction, isPending]`; the action receives `(previousState, formData)` and whatever it returns becomes the new state \u2014 ideal for validation messages or server results. `useFormStatus()` from `react-dom` returns `{ pending, data, method, action }` for the parent form, and must be called in a component rendered inside that `<form>`, which makes reusable submit buttons possible without prop drilling. Together they replace much of the manual loading/error state code.",points:["<form action={fn}> runs fn(formData) as an Action in a transition","useActionState(action, initial) \u2192 [state, formAction, isPending]","Action signature: (prevState, formData) => newState (can be async)","useFormStatus (react-dom) \u2192 { pending, data, method, action }","useFormStatus must be in a child component inside the <form>","Works with Server Functions for progressive enhancement"],code:`import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

async function subscribe(prevState, formData) {
  const email = formData.get('email');
  if (!email.includes('@')) return { error: 'Invalid email' };
  return { message: \`Subscribed \${email}\` };
}

function SubmitButton() {
  const { pending } = useFormStatus(); // reads the parent <form>
  return <button disabled={pending}>{pending ? 'Saving...' : 'Subscribe'}</button>;
}

export default function Newsletter() {
  const [state, formAction, isPending] = useActionState(subscribe, {});
  return (
    <form action={formAction}>
      <input name="email" />
      <SubmitButton />
      {state.error && <p role="alert">{state.error}</p>}
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`},{id:"rh-22",level:"senior",topic:"react-hooks",difficulty:"hard",simple:{hi:"useOptimistic aisa hai jaise tum chai wale ko order dete hi apne dost ko bol do 'chai aa gayi samjho'. Zyaadatar chai aa hi jaati hai, isliye intezaar nahi karna padta. Agar doodh khatam ho gaya (error), to tum turant bata dete ho ki chai nahi aayi.",en:"useOptimistic is like telling your friend 'consider the chai here' the moment you order it. Usually the chai does come, so nobody waits. If the milk runs out (error), you immediately tell them the chai isn't coming.",bn:"useOptimistic \u09B9\u09B2\u09CB \u099A\u09BE-\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u0995\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BF\u09AF\u09BC\u09C7\u0987 \u09AC\u09A8\u09CD\u09A7\u09C1\u0995\u09C7 \u09AC\u09B2\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09AE\u09A4\u09CB '\u09A7\u09B0\u09C7 \u09A8\u09BE\u0993 \u099A\u09BE \u098F\u09B8\u09C7 \u0997\u09C7\u099B\u09C7'\u0964 \u09AC\u09C7\u09B6\u09BF\u09B0\u09AD\u09BE\u0997 \u09B8\u09AE\u09AF\u09BC \u099A\u09BE \u0986\u09B8\u09C7\u0987, \u09A4\u09BE\u0987 \u0995\u09BE\u0989\u0995\u09C7 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964 \u09A6\u09C1\u09A7 \u09AB\u09C1\u09B0\u09BF\u09AF\u09BC\u09C7 \u0997\u09C7\u09B2\u09C7 (error), \u09A4\u09C1\u09AE\u09BF \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u099C\u09BE\u09A8\u09BF\u09AF\u09BC\u09C7 \u09A6\u09BE\u0993 \u09AF\u09C7 \u099A\u09BE \u0986\u09B8\u099B\u09C7 \u09A8\u09BE\u0964"},question:"What is useOptimistic and how do you implement an optimistic UI update with it?",answer:"`useOptimistic(state, updateFn)` returns `[optimisticState, addOptimistic]`. While an async Action or transition is running, calling `addOptimistic(value)` immediately shows a temporary state computed by `updateFn(currentState, value)`, so the UI feels instant \u2014 for example a 'like' or a new chat message appears before the server responds. When the action finishes, React discards the optimistic value and shows the real `state` again; if the request failed and the real state was not updated, the UI automatically reverts. `addOptimistic` must be called inside an Action or `startTransition`.",points:["useOptimistic(state, updateFn) \u2192 [optimisticState, addOptimistic]","Shows a temporary value while an async action is pending","Automatically reverts to real state when the action settles","Call addOptimistic inside a form Action or startTransition","Mark optimistic items (e.g. 'sending...') for clarity","Great for likes, chat messages, todo toggles"],code:`import { useOptimistic, useState } from 'react';

export default function Chat({ sendMessage }) {
  const [messages, setMessages] = useState([{ text: 'Hi!', sending: false }]);
  const [optimistic, addOptimistic] = useOptimistic(
    messages,
    (current, text) => [...current, { text, sending: true }]
  );

  async function formAction(formData) {
    const text = formData.get('message');
    addOptimistic(text);              // shows instantly
    const saved = await sendMessage(text); // real server call
    setMessages(m => [...m, { text: saved, sending: false }]);
  }

  return (
    <form action={formAction}>
      {optimistic.map((m, i) => <p key={i}>{m.text} {m.sending && <small>(sending...)</small>}</p>)}
      <input name="message" />
      <button>Send</button>
    </form>
  );
}`},{id:"rs-1",level:"fresher",topic:"react-state",difficulty:"easy",simple:{hi:"Prop drilling aisa hai jaise class ke last bench ke bachche ko note bhejna ho, aur beech ke har bachche ko note haath se aage pass karna pade, jabki unhe us note se koi matlab nahi. Context ya store ek notice board jaisa hai - jise chahiye, seedha wahan se padh le.",en:"Prop drilling is like sending a note to a child on the last bench, where every child in between has to pass it along even though they don't care about it. Context or a store is like a notice board - whoever needs the message reads it directly.",bn:"Prop drilling \u09AE\u09BE\u09A8\u09C7 \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09B6\u09C7\u09B7 \u09AC\u09C7\u099E\u09CD\u099A\u09C7\u09B0 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u0995\u09C7 \u098F\u0995\u099F\u09BE \u099A\u09BF\u09B0\u0995\u09C1\u099F \u09AA\u09BE\u09A0\u09BE\u09A8\u09CB, \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09AE\u09BE\u099D\u09C7\u09B0 \u09B8\u09AC \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u0995\u09C7 \u09B9\u09BE\u09A4\u09C7 \u09B9\u09BE\u09A4\u09C7 \u09B8\u09C7\u099F\u09BE \u098F\u0997\u09BF\u09AF\u09BC\u09C7 \u09A6\u09BF\u09A4\u09C7 \u09B9\u09AF\u09BC, \u09AF\u09A6\u09BF\u0993 \u0993\u09A6\u09C7\u09B0 \u0993\u099F\u09BE\u09B0 \u0995\u09CB\u09A8\u09CB \u09A6\u09B0\u0995\u09BE\u09B0 \u09A8\u09C7\u0987\u0964 Context \u09AC\u09BE store \u09B9\u09B2\u09CB \u09A8\u09CB\u099F\u09BF\u09B6 \u09AC\u09CB\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB - \u09AF\u09BE\u09B0 \u09A6\u09B0\u0995\u09BE\u09B0, \u09B8\u09C7 \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09B8\u09C7\u0996\u09BE\u09A8 \u09A5\u09C7\u0995\u09C7 \u09AA\u09A1\u09BC\u09C7 \u09A8\u09C7\u09AF\u09BC\u0964"},question:"What is prop drilling and how can you avoid it?",answer:"Prop drilling is passing data through several layers of components that do not use it, only so a deeply nested child can read it. It makes components noisy, tightly coupled and painful to refactor. You can avoid it with component composition (passing ready-made elements as children), lifting state only as high as needed, the Context API for widely shared values, or a state library such as Zustand or Redux Toolkit.",points:["Middle components receive props they never use, only to forward them","A small amount of drilling (2-3 levels) is fine and keeps data flow explicit","First fix: composition - pass <Avatar user={user} /> as children instead of passing user","Context for app-wide values like theme, locale or the logged-in user","A global store (Zustand / Redux Toolkit) when many distant components read and update the same data"],code:`// Prop drilling: Layout and Sidebar never use \`user\`, they only forward it
function App() {
  const user = { name: 'Asha' };
  return <Layout user={user} />;
}
function Layout({ user }) { return <Sidebar user={user} />; }
function Sidebar({ user }) { return <Avatar user={user} />; }
function Avatar({ user }) { return <p>{user.name}</p>; }
// Fix with composition: build the element where the data lives, pass it as children
function App2() {
  const user = { name: 'Asha' };
  return (
    <Layout2>
      <Avatar user={user} />
    </Layout2>
  );
}
function Layout2({ children }) { return <aside>{children}</aside>; }`},{id:"rs-2",level:"fresher",topic:"react-state",difficulty:"easy",simple:{hi:"Context ek ghar ke WiFi jaisa hai. Router (provider) ek baar lagao, phir ghar ke kisi bhi kamre mein koi bhi phone (component) seedha connect ho jaata hai - har kamre tak alag wire (props) nahi kheenchna padta.",en:"Context is like the WiFi in a house. You set up the router (provider) once, and any phone (component) in any room can connect directly - you don't have to run a separate wire (props) to every room.",bn:"Context \u09B9\u09B2\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 WiFi-\u098F\u09B0 \u09AE\u09A4\u09CB\u0964 \u098F\u0995\u09AC\u09BE\u09B0 router (provider) \u09AC\u09B8\u09BE\u09B2\u09C7 \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u0998\u09B0\u09C7\u09B0 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u09AB\u09CB\u09A8 (component) \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF connect \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 - \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u0998\u09B0\u09C7 \u0986\u09B2\u09BE\u09A6\u09BE \u09A4\u09BE\u09B0 (props) \u099F\u09BE\u09A8\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"What is the Context API and how do you use it?",answer:"The Context API lets a parent make a value available to every component below it without passing props by hand. You create a context with createContext(defaultValue), wrap part of the tree in a provider with a value, and read it in any descendant with useContext (or use in React 19). In React 19 you can render <MyContext value={...}> directly as the provider; <MyContext.Provider> still works.",points:["createContext(default) - the default is used only when there is no provider above","Provider: <ThemeContext value={theme}> in React 19 (older code: ThemeContext.Provider)","Read with useContext(ThemeContext); React 19's use(ThemeContext) can even be called inside if/loops","Every consumer re-renders when the provider value changes","Best for low-frequency, widely needed data: theme, locale, auth user, feature flags","Context is a transport mechanism, not a full state manager - pair it with useState/useReducer"],code:`import { createContext, useContext, useState } from 'react';
const ThemeContext = createContext('light'); // default when no provider is above
export default function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext value={theme}>
      <Toolbar />
      <button onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>Toggle</button>
    </ThemeContext>
  );
}
function Toolbar() {
  return <ThemedButton />; // no theme prop passed through here
}
function ThemedButton() {
  const theme = useContext(ThemeContext); // React 19 alternative: use(ThemeContext)
  return <button className={theme}>Theme: {theme}</button>;
}`},{id:"rs-3",level:"mid",topic:"react-state",difficulty:"medium",simple:{hi:"Context ek school ke loudspeaker announcement jaisa hai - jab bhi kuch bolte hain, saari classes ruk kar sunti hain, chahe baat sirf Class 5 ke liye ho. Isliye alag-alag announcement channel banao (context split karo), taaki sirf zaroori class hi ruke.",en:"Context is like a school loudspeaker - every time something is announced, all classes stop to listen, even if the message is only for Class 5. So you create separate channels (split contexts) so that only the class that needs it stops.",bn:"Context \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09B2\u09BE\u0989\u09A1\u09B8\u09CD\u09AA\u09BF\u0995\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB - \u0995\u09BF\u099B\u09C1 \u0998\u09CB\u09B7\u09A3\u09BE \u09B9\u09B2\u09C7\u0987 \u09B8\u09AC \u0995\u09CD\u09B2\u09BE\u09B8 \u09A5\u09C7\u09AE\u09C7 \u09B6\u09CB\u09A8\u09C7, \u09AF\u09A6\u09BF\u0993 \u0995\u09A5\u09BE\u099F\u09BE \u09B6\u09C1\u09A7\u09C1 \u0995\u09CD\u09B2\u09BE\u09B8 \u09EB-\u098F\u09B0 \u099C\u09A8\u09CD\u09AF\u0964 \u09A4\u09BE\u0987 \u0986\u09B2\u09BE\u09A6\u09BE \u0986\u09B2\u09BE\u09A6\u09BE \u099A\u09CD\u09AF\u09BE\u09A8\u09C7\u09B2 (context \u09AD\u09BE\u0997 \u0995\u09B0\u09BE) \u09AC\u09BE\u09A8\u09BE\u0993, \u09AF\u09BE\u09A4\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09A6\u09B0\u0995\u09BE\u09B0\u09BF \u0995\u09CD\u09B2\u09BE\u09B8\u0987 \u09A5\u09BE\u09AE\u09C7\u0964"},question:"Why can Context cause unnecessary re-renders, and how do you reduce that cost?",answer:"When a provider's value changes (compared with Object.is), every component that reads that context re-renders, even if it uses only one field of the value, and React.memo cannot stop it. A common bug is passing a new object like value={{ user, setUser }} on each render, which re-renders all consumers whenever the provider's parent renders. You reduce the cost by memoising the value, splitting contexts (state vs dispatch, or by concern), keeping providers close to where they are needed, and moving fast-changing data to a store with selectors.",points:["All consumers re-render on any value change - there is no built-in selector","Inline object/array value = new reference every render; wrap with useMemo (or let React Compiler do it)","Split state and dispatch: dispatch from useReducer is stable, so 'action-only' components don't re-render","Split unrelated data into separate contexts (UserContext, ThemeContext, CartContext)","Children passed into the provider component are not re-rendered just because the provider re-rendered","For high-frequency updates (typing, cursor, live prices) prefer Zustand/Redux with selectors"],code:`import { createContext, useContext, useReducer } from 'react';
const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);
function cartReducer(state, action) {
  switch (action.type) {
    case 'add': return [...state, action.item];
    case 'remove': return state.filter((i) => i.id !== action.id);
    default: return state;
  }
}
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  // dispatch never changes, so components that only dispatch never re-render on cart updates
  return (
    <CartDispatchContext value={dispatch}>
      <CartStateContext value={cart}>{children}</CartStateContext>
    </CartDispatchContext>
  );
}
export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);`},{id:"rs-4",level:"junior",topic:"react-state",difficulty:"medium",simple:{hi:"Redux store ek bank ki tijori jaisa hai. Paisa (state) seedha koi nahi nikal sakta - aap form (action) bharte ho aur cashier (reducer) niyam ke hisaab se entry karta hai. useSelector se aap passbook dekhte ho, useDispatch se form jama karte ho.",en:"A Redux store is like a bank locker. Nobody takes the money (state) out directly - you fill a form (action) and the cashier (reducer) updates the record by the rules. useSelector is checking your passbook; useDispatch is submitting the form.",bn:"Redux store \u09B9\u09B2\u09CB \u09AC\u09CD\u09AF\u09BE\u0982\u0995\u09C7\u09B0 \u09B2\u0995\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u099F\u09BE\u0995\u09BE (state) \u0995\u09C7\u0989 \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u09A4\u09C1\u09B2\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 \u09A8\u09BE - \u09A4\u09C1\u09AE\u09BF \u09AB\u09B0\u09CD\u09AE (action) \u09AD\u09B0\u09CB, \u0986\u09B0 \u0995\u09CD\u09AF\u09BE\u09B6\u09BF\u09AF\u09BC\u09BE\u09B0 (reducer) \u09A8\u09BF\u09AF\u09BC\u09AE \u09AE\u09C7\u09A8\u09C7 \u09B9\u09BF\u09B8\u09BE\u09AC \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC\u0964 useSelector \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AA\u09BE\u09B8\u09AC\u0987 \u09A6\u09C7\u0996\u09CB, useDispatch \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AB\u09B0\u09CD\u09AE \u099C\u09AE\u09BE \u09A6\u09BE\u0993\u0964"},question:"Explain Redux Toolkit: slices, the store, useSelector and useDispatch.",answer:"Redux Toolkit (RTK) is the official, recommended way to write Redux. createSlice defines a slice of state with its initial value and reducers, and auto-generates action creators; configureStore combines slice reducers and sets up DevTools and middleware (thunk) for you. Components read state with useSelector(selector), which re-renders only when the selected value changes by reference, and send actions with useDispatch().",points:["createSlice({ name, initialState, reducers }) gives slice.reducer and slice.actions","Reducers can 'mutate' state because RTK uses Immer under the hood","configureStore({ reducer: {...} }) - DevTools, thunk and dev-time checks included","Wrap the app in <Provider store={store}> from react-redux","useSelector compares the result with ===; return primitives or memoised selectors (createSelector)","createAsyncThunk for async logic; RTK Query for data fetching and caching"],code:`// store.js
import { createSlice, configureStore } from '@reduxjs/toolkit';
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },                // safe thanks to Immer
    addBy: (state, action) => { state.value += action.payload; },
  },
});
export const { increment, addBy } = counterSlice.actions;
export const store = configureStore({ reducer: { counter: counterSlice.reducer } });
// main.jsx:  <Provider store={store}><App /></Provider>   (Provider from 'react-redux')
// Counter.jsx
import { useSelector, useDispatch } from 'react-redux';
import { addBy } from './store';
export function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(addBy(5))}>Count: {value}</button>;
}`},{id:"rs-5",level:"junior",topic:"react-state",difficulty:"medium",simple:{hi:"Immutability matlab purani exam copy par overwrite mat karo, nayi copy par likho. Teacher (React) bas dekhti hai ki copy nayi hai ya wahi purani - agar wahi hai to woh check hi nahi karti. Immer ek helper jaisa hai jo aapke likhte hi apne aap nayi copy bana deta hai.",en:"Immutability means don't overwrite the old exam copy - write on a fresh copy. The teacher (React) only checks whether it's a new copy; if it's the same old one, she doesn't check it at all. Immer is a helper who makes the fresh copy for you automatically while you write.",bn:"Immutability \u09AE\u09BE\u09A8\u09C7 \u09AA\u09C1\u09B0\u09A8\u09CB \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u0995\u09C7\u099F\u09C7 \u09B2\u09BF\u0996\u09CB \u09A8\u09BE, \u09A8\u09A4\u09C1\u09A8 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09C7\u0996\u09CB\u0964 \u099F\u09BF\u099A\u09BE\u09B0 (React) \u09B6\u09C1\u09A7\u09C1 \u09A6\u09C7\u0996\u09C7 \u0996\u09BE\u09A4\u09BE\u099F\u09BE \u09A8\u09A4\u09C1\u09A8 \u0995\u09BF\u09A8\u09BE - \u09AA\u09C1\u09B0\u09A8\u09CB\u099F\u09BE\u0987 \u09B9\u09B2\u09C7 \u09B8\u09C7 \u09A6\u09C7\u0996\u09C7\u0987 \u09A8\u09BE\u0964 Immer \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF\u0995\u09BE\u09B0\u09C0, \u09AF\u09C7 \u09A4\u09C1\u09AE\u09BF \u09B2\u09C7\u0996\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC \u09A8\u09BF\u099C\u09C7 \u09A5\u09C7\u0995\u09C7\u0987 \u09A8\u09A4\u09C1\u09A8 \u0996\u09BE\u09A4\u09BE \u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964"},question:"Why must React state be updated immutably, and how does Immer help?",answer:"React decides whether to re-render by comparing the old and new state with Object.is, so if you mutate an object and set the same reference, React may skip the update and memoised children won't see the change. Immutable updates create new objects/arrays for every level you change (spread, map, filter, toSorted), which also makes change detection cheap and keeps history for undo. Immer lets you write simple 'mutating' code on a draft and produces a correctly copied new state for you; Redux Toolkit uses it internally.",points:["Same reference => React bails out; mutation leads to stale UI and bugs in memo/useEffect deps","Copy each changed level: { ...u, address: { ...u.address, city } }","Arrays: use map/filter/concat/spread or toSorted/toReversed instead of push/sort/splice","Shallow copy only copies one level - nested objects need their own copy","Immer: produce(base, draft => { draft.a.b = 1 }) returns a new object with structural sharing","use-immer's useImmer and RTK's createSlice apply the same idea"],code:`import { useState } from 'react';
import { produce } from 'immer';
export function Profile() {
  const [user, setUser] = useState({ name: 'Ravi', address: { city: 'Pune' }, skills: ['JS'] });
  // WRONG: same object reference, React may skip the re-render
  // user.address.city = 'Kolkata'; setUser(user);
  // Correct: copy every level that changes
  const moveCity = () => setUser((u) => ({ ...u, address: { ...u.address, city: 'Kolkata' } }));
  const addSkill = () => setUser((u) => ({ ...u, skills: [...u.skills, 'React'] }));
  // Same update with Immer: "mutate" a draft, get a new immutable object back
  const moveCityImmer = () => setUser(produce((draft) => { draft.address.city = 'Kolkata'; }));
  return (
    <div>
      <p>{user.name} - {user.address.city} - {user.skills.join(', ')}</p>
      <button onClick={moveCity}>Move</button> <button onClick={addSkill}>Add skill</button>
      <button onClick={moveCityImmer}>Move (Immer)</button>
    </div>
  );
}`},{id:"rs-6",level:"fresher",topic:"react-state",difficulty:"easy",simple:{hi:"React Router ek railway station ke platform board jaisa hai. URL train number hai, aur board batata hai ki kaunsi train kis platform (component) par aayegi. Nested route matlab station ki building (layout) wahi rehti hai, sirf andar ka platform badalta hai.",en:"React Router is like the platform board at a railway station. The URL is the train number, and the board says which platform (component) it arrives at. Nested routes mean the station building (layout) stays the same, only the platform inside changes.",bn:"React Router \u09B9\u09B2\u09CB \u09B0\u09C7\u09B2\u09B8\u09CD\u099F\u09C7\u09B6\u09A8\u09C7\u09B0 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09AB\u09B0\u09CD\u09AE \u09AC\u09CB\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 URL \u09B9\u09B2\u09CB \u099F\u09CD\u09B0\u09C7\u09A8\u09C7\u09B0 \u09A8\u09AE\u09CD\u09AC\u09B0, \u0986\u09B0 \u09AC\u09CB\u09B0\u09CD\u09A1 \u09AC\u09B2\u09C7 \u09A6\u09C7\u09AF\u09BC \u0995\u09CB\u09A8 \u099F\u09CD\u09B0\u09C7\u09A8 \u0995\u09CB\u09A8 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09AB\u09B0\u09CD\u09AE\u09C7 (component) \u0986\u09B8\u09AC\u09C7\u0964 Nested route \u09AE\u09BE\u09A8\u09C7 \u09B8\u09CD\u099F\u09C7\u09B6\u09A8\u09C7\u09B0 \u09AC\u09BF\u09B2\u09CD\u09A1\u09BF\u0982 (layout) \u098F\u0995\u0987 \u09A5\u09BE\u0995\u09C7, \u09B6\u09C1\u09A7\u09C1 \u09AD\u09C7\u09A4\u09B0\u09C7\u09B0 \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09AB\u09B0\u09CD\u09AE \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC\u0964"},question:"Explain React Router basics: routes, URL params and nested routes.",answer:"React Router maps URLs to components on the client without full page reloads. You declare <Route path element> entries inside <Routes>, navigate with <Link> or useNavigate, and read dynamic segments like /users/:id with useParams. Nested routes put child <Route>s inside a parent route whose component renders an <Outlet /> where the matching child appears, which is ideal for shared layouts.",points:["BrowserRouter uses the History API (clean URLs); the server must fall back to index.html","<Link to> instead of <a href> to avoid full reloads; useNavigate() for programmatic navigation","Dynamic segments :id, read with useParams() - values are always strings","Nested routes + <Outlet /> for layouts; index route for the default child","path='*' as a catch-all 404; useSearchParams for query strings","In v7 everything is exported from 'react-router' ('react-router-dom' still works)"],code:`import { BrowserRouter, Routes, Route, Link, Outlet, useParams } from 'react-router';
function Layout() {
  return (
    <>
      <nav><Link to="/">Home</Link> | <Link to="/users/42">User 42</Link></nav>
      <Outlet /> {/* the matched child route renders here */}
    </>
  );
}
function User() {
  const { id } = useParams(); // "42" - params are always strings
  return <h2>User {id}</h2>; }
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h2>Home</h2>} />
          <Route path="users/:id" element={<User />} />
          <Route path="*" element={<h2>404 - Not found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}`},{id:"rs-7",level:"junior",topic:"react-state",difficulty:"medium",simple:{hi:"Protected route ek society ke gate wale guard jaisa hai. Agar aapke paas ID card (login) hai to andar jaane deta hai, nahi to reception (login page) bhej deta hai, aur yaad rakhta hai ki aap kis flat mein jaana chahte the.",en:"A protected route is like the security guard at a housing society gate. If you have an ID card (logged in) he lets you in; otherwise he sends you to reception (login page) and remembers which flat you wanted to visit.",bn:"Protected route \u09B9\u09B2\u09CB \u0986\u09AC\u09BE\u09B8\u09A8\u09C7\u09B0 \u0997\u09C7\u099F\u09C7\u09B0 \u09B8\u09BF\u0995\u09BF\u0989\u09B0\u09BF\u099F\u09BF \u0997\u09BE\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A4\u09CB\u09AE\u09BE\u09B0 ID \u0995\u09BE\u09B0\u09CD\u09A1 (login) \u09A5\u09BE\u0995\u09B2\u09C7 \u09AD\u09C7\u09A4\u09B0\u09C7 \u09AF\u09C7\u09A4\u09C7 \u09A6\u09C7\u09AF\u09BC, \u09A8\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 \u09B0\u09BF\u09B8\u09C7\u09AA\u09B6\u09A8\u09C7 (login page) \u09AA\u09BE\u09A0\u09BE\u09AF\u09BC, \u0986\u09B0 \u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09C7 \u09A4\u09C1\u09AE\u09BF \u0995\u09CB\u09A8 \u09AB\u09CD\u09B2\u09CD\u09AF\u09BE\u099F\u09C7 \u09AF\u09C7\u09A4\u09C7 \u099A\u09C7\u09AF\u09BC\u09C7\u099B\u09BF\u09B2\u09C7\u0964"},question:"How do you implement protected (authenticated) routes in React Router?",answer:'Create a guard component that checks the auth state: while the session is loading it shows a loader, if there is no user it renders <Navigate to="/login" replace /> (saving the current location in state), otherwise it renders <Outlet />. Wrap all private routes inside a layout route that uses this guard. After login, navigate back to the saved location. This is only a UX guard - the server must still authorise every API request.',points:["Guard as a pathless layout route: <Route element={<RequireAuth />}> with private children","<Navigate replace> so the protected URL isn't left in history (Back button works sensibly)","Pass state={{ from: location }} and redirect back after successful login","Handle the 'auth still loading' state to avoid flashing the login page","Role-based access: check user.roles in the same guard and show a 403 page","Client checks can be bypassed - real security lives on the server/API"],code:`import { Navigate, Outlet, Routes, Route, useLocation } from 'react-router';
import { useAuth } from './auth'; // your context or store
function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <p>Checking session...</p>;
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
// In Login after success:
// navigate(location.state?.from?.pathname ?? '/dashboard', { replace: true });`},{id:"rs-8",level:"mid",topic:"react-state",difficulty:"medium",simple:{hi:"TanStack Query ek chai wale jaisa hai jo chai ki ketli garam rakhta hai. Jab tak chai taazi hai (staleTime) wahi de deta hai; thodi purani ho gayi to aapko wahi de kar peeche nayi bana leta hai. Koi naya order (mutation) aaye to woh purani chai hata kar (invalidate) nayi bana deta hai.",en:"TanStack Query is like a chai seller who keeps a kettle warm. While the chai is fresh (staleTime) he serves it as is; if it's a bit old he still gives it to you but quietly makes a fresh batch. When a new order (mutation) comes in, he throws out the old chai (invalidate) and makes it again.",bn:"TanStack Query \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995 \u099A\u09BE-\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7 \u0995\u09C7\u099F\u09B2\u09BF\u09A4\u09C7 \u099A\u09BE \u0997\u09B0\u09AE \u09B0\u09BE\u0996\u09C7\u0964 \u099A\u09BE \u099F\u09BE\u099F\u0995\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 (staleTime) \u09B8\u09C7\u099F\u09BE\u0987 \u09A6\u09C7\u09AF\u09BC; \u098F\u0995\u099F\u09C1 \u09AA\u09C1\u09B0\u09A8\u09CB \u09B9\u09B2\u09C7 \u09B8\u09C7\u099F\u09BE\u0987 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AA\u09C7\u099B\u09A8\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09AC\u09BE\u09A8\u09BE\u09AF\u09BC\u0964 \u09A8\u09A4\u09C1\u09A8 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 (mutation) \u098F\u09B2\u09C7 \u09AA\u09C1\u09B0\u09A8\u09CB \u099A\u09BE \u09AB\u09C7\u09B2\u09C7 \u09A6\u09BF\u09AF\u09BC\u09C7 (invalidate) \u0986\u09AC\u09BE\u09B0 \u09AC\u09BE\u09A8\u09BE\u09AF\u09BC\u0964"},question:"How does TanStack Query manage server state - caching, staleTime, gcTime and invalidation?",answer:"TanStack Query caches server data by a queryKey, deduplicates requests and gives you loading/error states. Data is fresh until staleTime passes (default 0); stale data is still shown instantly but refetched in the background on mount, window focus or reconnect. When no component uses a query, it is garbage-collected after gcTime (default 5 minutes). After a mutation you call queryClient.invalidateQueries({ queryKey }) to mark matching queries stale and refetch the active ones, or update the cache directly with setQueryData for optimistic UI.",points:["queryKey is the cache identity - include every variable: ['todo', id, filters]","staleTime = how long data is fresh; gcTime (formerly cacheTime) = how long unused data stays in cache","Background refetch on mount / window focus / reconnect only when data is stale","useMutation + onSuccess: invalidateQueries (prefix match) or setQueryData","Optimistic updates: onMutate snapshot -> update cache -> rollback in onError","fetch doesn't reject on 4xx/5xx - throw on !res.ok so the query enters the error state"],code:`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const getTodos = () =>
  fetch('/api/todos').then((r) => { if (!r.ok) throw new Error(\`HTTP \${r.status}\`); return r.json(); });
export function Todos() {
  const queryClient = useQueryClient();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
    staleTime: 60_000, // fresh for 1 minute: no background refetch in that window
  });
  const addTodo = useMutation({
    mutationFn: (title) => fetch('/api/todos', { method: 'POST', body: JSON.stringify({ title }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  });
  if (isPending) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  return (
    <>
      <button onClick={() => addTodo.mutate('New task')} disabled={addTodo.isPending}>Add</button>
      <ul>{data.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
    </>
  );
}`},{id:"rs-9",level:"mid",topic:"react-state",difficulty:"medium",simple:{hi:"Zustand ek dabbawala jaisa hai jo har office mein sirf usi ka tiffin deta hai jisne order kiya - poore building ko jagaata nahi. Redux ek bade mess jaisa hai jahan niyam aur register sab hai, aur Context building ki ghanti jaisa hai jo bajne par sab sunte hain.",en:"Zustand is like a dabbawala who delivers a tiffin only to the person who ordered it - he doesn't wake up the whole building. Redux is like a big mess hall with strict rules and registers, and Context is like a building bell that everyone hears when it rings.",bn:"Zustand \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995 \u09A1\u09BE\u09AC\u09CD\u09AC\u09BE\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09AF\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BF\u09AF\u09BC\u09C7\u099B\u09C7 \u09A4\u09BE\u0995\u09C7\u0987 \u099F\u09BF\u09AB\u09BF\u09A8 \u09A6\u09C7\u09AF\u09BC - \u09AA\u09C1\u09B0\u09CB \u09AC\u09BF\u09B2\u09CD\u09A1\u09BF\u0982\u0995\u09C7 \u099C\u09BE\u0997\u09BE\u09AF\u09BC \u09A8\u09BE\u0964 Redux \u09B9\u09B2\u09CB \u09A8\u09BF\u09AF\u09BC\u09AE \u0986\u09B0 \u0996\u09BE\u09A4\u09BE\u0993\u09AF\u09BC\u09BE\u09B2\u09BE \u09AC\u09A1\u09BC \u09AE\u09C7\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB, \u0986\u09B0 Context \u09B9\u09B2\u09CB \u09AC\u09BF\u09B2\u09CD\u09A1\u09BF\u0982\u09AF\u09BC\u09C7\u09B0 \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A4\u09CB, \u09AC\u09BE\u099C\u09B2\u09C7 \u09B8\u09AC\u09BE\u0987 \u09B6\u09CB\u09A8\u09C7\u0964"},question:"What is Zustand, and how does it compare with Redux Toolkit and Context?",answer:"Zustand is a small hook-based global store: create() returns a hook, and components subscribe to just the slice they select, so they re-render only when that slice changes. It needs no provider, no actions/reducers boilerplate, and works outside React too. Compared with Context it avoids 'every consumer re-renders' because of selectors; compared with Redux Toolkit it is lighter, while RTK gives stricter structure, DevTools-first debugging, middleware and RTK Query, which suit large teams.",points:["const useStore = create((set, get) => ({ state..., actions... })) - no Provider needed","set() shallow-merges the top level; use the updater form set((s) => ...) for derived updates","Select narrowly: useStore((s) => s.count); for several fields use useShallow","Middleware: persist (localStorage), devtools, immer","Context: low-frequency values; Zustand: simple-to-medium shared client state; RTK: large apps needing strict patterns","Neither should hold server data - use TanStack Query or RTK Query for that"],code:`import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
const useCartStore = create((set) => ({
  items: [],
  coupon: null,
  addItem: (item) => set((state) => ({ items: [...state.items, item] })), // top level is merged
  clear: () => set({ items: [], coupon: null }),
}));
function CartCount() {
  // re-renders only when the number of items changes
  const count = useCartStore((s) => s.items.length);
  return <span>{count}</span>;
}
function CartActions() {
  // selecting an object: useShallow compares its fields instead of the new object reference
  const { addItem, clear } = useCartStore(useShallow((s) => ({ addItem: s.addItem, clear: s.clear })));
  return (
    <>
      <button onClick={() => addItem({ id: Date.now(), name: 'Pen' })}>Add pen</button>
      <button onClick={clear}>Clear</button>
    </>
  );
}`},{id:"rs-10",level:"senior",topic:"react-state",difficulty:"hard",simple:{hi:"State ko ghar ke saamaan jaisa socho: apni pencil apni table par (local state), TV drawing room mein sabke liye (global state), aur ration kirane ki dukaan par jo zaroorat pe mangwate ho (server state). Har cheez ko sahi jagah rakhoge to ghar saaf rahega.",en:"Think of state like things in a house: your pencil stays on your own desk (local state), the TV is in the living room for everyone (global state), and groceries stay at the kirana shop and are fetched when needed (server state). Put each thing in the right place and the house stays tidy.",bn:"State-\u0995\u09C7 \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u099C\u09BF\u09A8\u09BF\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AD\u09BE\u09AC\u09CB: \u09A8\u09BF\u099C\u09C7\u09B0 \u09AA\u09C7\u09A8\u09B8\u09BF\u09B2 \u09A8\u09BF\u099C\u09C7\u09B0 \u099F\u09C7\u09AC\u09BF\u09B2\u09C7 (local state), \u099F\u09BF\u09AD\u09BF \u09AC\u09B8\u09BE\u09B0 \u0998\u09B0\u09C7 \u09B8\u09AC\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF (global state), \u0986\u09B0 \u09B0\u09C7\u09B6\u09A8 \u09AE\u09C1\u09A6\u09BF\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7, \u09A6\u09B0\u0995\u09BE\u09B0 \u09B9\u09B2\u09C7 \u0986\u09A8\u09BE\u0993 (server state)\u0964 \u09B8\u09AC \u099C\u09BF\u09A8\u09BF\u09B8 \u09A0\u09BF\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09AF\u09BC \u09B0\u09BE\u0996\u09B2\u09C7 \u09AC\u09BE\u09A1\u09BC\u09BF \u0997\u09CB\u099B\u09BE\u09A8\u09CB \u09A5\u09BE\u0995\u09C7\u0964"},question:"Local vs global vs server state: which tool do you use when, and how would you structure state in a large React app?",answer:"I classify state first: local UI state (input text, open/closed) stays in useState/useReducer next to where it is used; URL state (filters, page, tab) lives in the router's params/search params; server state (data owned by the backend) goes into TanStack Query or RTK Query, which handle caching, deduping and invalidation; and only truly shared client state (auth session, cart, theme, wizard progress) goes into Context or a store like Zustand/Redux Toolkit. Most 'global state' in older apps was really server cache, so moving it to a query library removes most store code. Derived values are computed, not stored.",points:["Start local, lift up only when siblings need it - colocation keeps re-renders small","URL is state too: shareable, bookmarkable filters and pagination","Server state = TanStack Query or RTK Query (if the app is already on Redux): cache, staleness, tags/invalidation","Client global state: Context for rarely-changing values; Zustand/RTK with selectors for frequently-updated data","Never duplicate server data into a store; never store what you can derive","Forms: local state or a form library (react-hook-form), not the global store"],code:`// RTK Query: server state inside a Redux Toolkit app
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Product'],
  endpoints: (build) => ({
    getProducts: build.query({ query: () => 'products', providesTags: ['Product'] }),
    addProduct: build.mutation({
      query: (body) => ({ url: 'products', method: 'POST', body }),
      invalidatesTags: ['Product'], // refetches every query that provides 'Product'
    }),
  }),
});
export const { useGetProductsQuery, useAddProductMutation } = productsApi;
// store: configureStore({
//   reducer: { [productsApi.reducerPath]: productsApi.reducer },
//   middleware: (getDefault) => getDefault().concat(productsApi.middleware),
// });
// component: const { data, isLoading } = useGetProductsQuery();`}],a=[{id:"qr-b1",level:"junior",topic:"react-basics",question:"What does {count && <Badge />} render when count is 0?",options:["Nothing","<Badge />","The text 0","It throws an error"],correct:2,explanation:"&& returns the falsy left operand 0, and React renders numbers, so 0 appears on screen."},{id:"qr-b2",level:"fresher",topic:"react-basics",question:"Why does React need a key on each item rendered from an array?",options:["To identify items between renders so state and DOM stay matched to the right item","To apply CSS styles to each item","To make the item accessible to screen readers","To pass an id prop to the child component"],correct:0,explanation:"Keys let reconciliation match old and new list items; key is not passed to the child as a prop."},{id:"qr-b3",level:"fresher",topic:"react-basics",question:"With the modern (automatic) JSX transform, what does <h1>Hi</h1> compile to?",options:["An HTML string '<h1>Hi</h1>'","document.createElement('h1')","A template literal parsed at runtime","A jsx('h1', { children: 'Hi' }) call from react/jsx-runtime"],correct:3,explanation:"The compiler turns JSX into jsx()/jsxs() calls that return plain React element objects."},{id:"qr-b4",level:"junior",topic:"react-basics",question:"What happens with <input value={name} /> when no onChange handler is provided?",options:["It works like a normal editable input","The field is read-only and React logs a warning","React throws an error and stops rendering","The value is ignored and the input becomes uncontrolled"],correct:1,explanation:"A controlled value without onChange (or readOnly) can't change, so React warns that the field is read-only."},{id:"qr-b5",level:"mid",topic:"react-basics",question:"Your component's console.log runs twice per render in development but once in production. What is the most likely reason?",options:["A bug in React's reconciler","The component is missing a key","The app is wrapped in <StrictMode>, which double-invokes render in development","Vite hot module replacement always renders twice"],correct:2,explanation:"StrictMode intentionally calls component functions twice in development to surface impure rendering."},{id:"qr-h1",level:"fresher",topic:"react-hooks",question:"Which of these follows the rules of hooks?",options:["Calling useState inside an if block","Calling useEffect inside a for loop","Calling hooks at the top level of a function component","Calling useState inside a regular utility function"],correct:2,explanation:"Hooks must be called at the top level of components or custom hooks so their call order is the same every render."},{id:"qr-h2",level:"junior",topic:"react-hooks",question:"count is 0. A click handler calls setCount(count + 1) three times. What is count after the re-render?",options:["1","3","0","It throws an error"],correct:0,explanation:"All three calls read the same snapshot (0), so each sets 1; use setCount(c => c + 1) to get 3."},{id:"qr-h3",level:"junior",topic:"react-hooks",question:"When does the cleanup function returned from useEffect(fn, [userId]) run?",options:["Only when the component mounts","Before every render, even if userId is unchanged","Never, unless you call it manually","Before the effect re-runs when userId changes, and on unmount"],correct:3,explanation:"React runs cleanup before re-running the effect with new dependencies and once more on unmount."},{id:"qr-h4",level:"mid",topic:"react-hooks",question:"Which hook runs synchronously after DOM updates but before the browser paints?",options:["useEffect","useLayoutEffect","useDeferredValue","useTransition"],correct:1,explanation:"useLayoutEffect fires before paint, so you can measure the DOM and adjust layout without flicker."},{id:"qr-h5",level:"senior",topic:"react-hooks",question:"Where must useFormStatus be called to read the pending state of a form?",options:["In the same component that renders the <form>","In any component, anywhere in the app","In a component rendered inside that <form>","Only inside a Server Component"],correct:2,explanation:"useFormStatus (from react-dom) reads the status of its parent <form>, so it must be in a child component rendered inside it."},{id:"qr-s1",level:"junior",topic:"react-state",question:"In TanStack Query, which option controls how long fetched data is treated as fresh (no background refetch)?",options:["gcTime","staleTime","refetchInterval","retryDelay"],correct:1,explanation:"staleTime sets the freshness window; gcTime controls how long unused data stays cached."},{id:"qr-s2",level:"junior",topic:"react-state",question:"Why is writing state.value += 1 inside a Redux Toolkit createSlice reducer safe?",options:["Redux deep-clones the whole store before every reducer","useSelector ignores mutations","Immer records changes on a draft and produces a new immutable state","Reducers in RTK run in a Web Worker"],correct:2,explanation:"createSlice wraps reducers with Immer, which turns draft mutations into an immutable update."},{id:"qr-a1",level:"fresher",topic:"react-advanced",question:"What is the main problem with using the array index as key in a list where items can be deleted or reordered?",options:["React throws an error for numeric keys","The list will not render at all","Keys are passed as props and overwrite other props","React may reuse the wrong DOM node and component state for an item"],correct:3,explanation:"With index keys the same key points to a different item after a change, so state attaches to the wrong row."},{id:"qr-a2",level:"junior",topic:"react-advanced",question:"Which error is caught by a React error boundary?",options:["An error thrown inside an onClick handler","An error thrown while rendering one of its child components","An error thrown inside a setTimeout callback","An error thrown in the boundary's own render method"],correct:1,explanation:"Error boundaries catch errors during rendering and lifecycles of their children, not in handlers, async code or themselves."},{id:"qr-a3",level:"mid",topic:"react-advanced",question:"In React 19, how does a function component receive a ref from its parent?",options:["As a regular ref prop it can destructure","Only through forwardRef","Through this.refs","Function components cannot receive refs"],correct:0,explanation:"React 19 passes ref as a normal prop to function components, so forwardRef is no longer needed."},{id:"qr-a4",level:"senior",topic:"react-advanced",question:"Which statement about Server Components in the Next.js App Router is true?",options:["They must start with 'use client'","They can use useState and onClick handlers","They are the default, can be async and fetch data on the server, and their code is not sent to the browser","They run in the browser after hydration"],correct:2,explanation:"Components are Server Components by default; only 'use client' files ship JavaScript for interactivity."}];var s=e("react",[t],[a]);export{s as default};
