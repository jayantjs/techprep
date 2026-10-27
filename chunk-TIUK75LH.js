import{a as e}from"./chunk-YR3K2D3X.js";import"./chunk-MNCRUE4M.js";var a=[{id:"pa-1",level:"fresher",topic:"py-advanced",difficulty:"easy",simple:{hi:"Decorator ek gift wrapper jaisa hai. Andar wahi gift (function) hai, bas upar se sundar packing (extra kaam jaise logging) lag gayi. functools.wraps us packing par asli gift ka naam-tag chipka deta hai, taaki sabko pata rahe andar kya hai.",en:"A decorator is like gift wrapping paper. The gift inside (the function) is the same, but now it has extra packing (extra work like logging). functools.wraps sticks the real gift's name tag on the packing so everyone still knows what is inside.",bn:"Decorator \u09B9\u09B2\u09CB gift-\u098F\u09B0 \u09AE\u09CB\u09A1\u09BC\u0995\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AD\u09C7\u09A4\u09B0\u09C7 \u098F\u0995\u0987 gift (function) \u0986\u099B\u09C7, \u09B6\u09C1\u09A7\u09C1 \u09AC\u09BE\u0987\u09B0\u09C7 \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u09AE\u09CB\u09A1\u09BC\u0995 (logging-\u098F\u09B0 \u09AE\u09A4\u09CB \u09AC\u09BE\u09A1\u09BC\u09A4\u09BF \u0995\u09BE\u099C) \u09B2\u09BE\u0997\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964 functools.wraps \u09AE\u09CB\u09A1\u09BC\u0995\u09C7\u09B0 \u0993\u09AA\u09B0 \u0986\u09B8\u09B2 gift-\u098F\u09B0 \u09A8\u09BE\u09AE\u09C7\u09B0 \u099F\u09CD\u09AF\u09BE\u0997 \u09B2\u09BE\u0997\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC, \u09AF\u09BE\u09A4\u09C7 \u09B8\u09AC\u09BE\u0987 \u09AC\u09CB\u099D\u09C7 \u09AD\u09C7\u09A4\u09B0\u09C7 \u0995\u09C0 \u0986\u099B\u09C7\u0964"},question:"What is a decorator in Python and why do we use functools.wraps?",answer:"A decorator is a callable that takes a function and returns a new function (usually a wrapper) that adds behaviour before or after the original call; `@decorator` above a def is just shorthand for `func = decorator(func)`. Without functools.wraps the wrapper replaces the original's metadata, so `__name__`, `__doc__` and `__wrapped__` would point to the wrapper. `@functools.wraps(func)` copies that metadata so debugging, logging, help() and introspection keep working.",points:["Functions are first-class objects, so they can be passed in and returned","@deco is syntax sugar for f = deco(f), applied at definition time","Wrapper should accept *args, **kwargs and return the original result","functools.wraps copies __name__, __doc__, __qualname__ and sets __wrapped__","Common uses: logging, timing, caching, auth checks, retries"],code:`import functools

def log_call(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"calling {func.__name__}{args}")
        return func(*args, **kwargs)
    return wrapper

@log_call
def add(a, b):
    """Add two numbers."""
    return a + b

print(add(2, 3))
print(add.__name__, '-', add.__doc__)
# Output:
# calling add(2, 3)
# 5
# add - Add two numbers.`},{id:"pa-2",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"Decorator with arguments ek chai wale ke order jaisa hai: pehle aap batate ho 'kam cheeni, extra adrak' (arguments), phir wo us hisaab se chai (function) banata hai. Class decorator poori class ko ek extra stamp laga deta hai, jaise school har naye student ki file par admission stamp lagata hai.",en:"A decorator with arguments is like ordering tea: first you tell the chaiwala 'less sugar, extra ginger' (the arguments), then he makes the tea (the function) that way. A class decorator puts an extra stamp on a whole class, like a school stamping every new student's admission file.",bn:"Arguments-\u09B8\u09B9 decorator \u099A\u09BE-\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u0995\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09AE\u09A4\u09CB: \u0986\u0997\u09C7 \u09AC\u09B2\u09CB '\u0995\u09AE \u099A\u09BF\u09A8\u09BF, \u09AC\u09C7\u09B6\u09BF \u0986\u09A6\u09BE' (arguments), \u09A4\u09BE\u09B0\u09AA\u09B0 \u09B8\u09C7 \u09B8\u09C7\u0987\u09AD\u09BE\u09AC\u09C7 \u099A\u09BE (function) \u09AC\u09BE\u09A8\u09BE\u09AF\u09BC\u0964 Class decorator \u09AA\u09C1\u09B0\u09CB class-\u098F\u09B0 \u0993\u09AA\u09B0 \u098F\u0995\u099F\u09BE \u09AC\u09BE\u09A1\u09BC\u09A4\u09BF \u099B\u09BE\u09AA \u09A6\u09C7\u09AF\u09BC, \u09AF\u09C7\u09AE\u09A8 \u09B8\u09CD\u0995\u09C1\u09B2 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09A8\u09A4\u09C1\u09A8 \u099B\u09BE\u09A4\u09CD\u09B0\u09C7\u09B0 \u09AB\u09BE\u0987\u09B2\u09C7 \u09AD\u09B0\u09CD\u09A4\u09BF\u09B0 \u099B\u09BE\u09AA \u09A6\u09C7\u09AF\u09BC\u0964"},question:"How do you write a decorator that takes arguments (e.g. @retry(times=3))? What is a class decorator?",answer:"A decorator with arguments needs three levels: the outer function receives the arguments and returns the real decorator, which receives the function and returns the wrapper. So `@retry(times=3)` first calls `retry(times=3)` and the returned decorator is then applied to the function. A class decorator is a function that receives a class (not a function) and returns it modified or replaced, for example registering it or adding methods \u2014 @dataclass is a well-known class decorator.",points:["Three nested levels: factory(args) -> decorator(func) -> wrapper(*args, **kwargs)","@retry(times=3) == func = retry(times=3)(func)","Still use functools.wraps on the innermost wrapper","A class with __call__ can also act as a decorator (stateful decorators)","Class decorators take a class and return a class: e.g. @dataclass, registries, singletons"],code:`import functools

def retry(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except ValueError as e:
                    print(f"attempt {attempt} failed: {e}")
            raise RuntimeError("all retries failed")
        return wrapper
    return decorator

calls = iter([ValueError("timeout"), ValueError("timeout"), "ok"])

@retry(times=3)
def fetch():
    r = next(calls)
    if isinstance(r, Exception):
        raise r
    return r

print(fetch())`},{id:"pa-3",level:"fresher",topic:"py-advanced",difficulty:"easy",simple:{hi:"Generator ek pani-puri wale bhaiya jaisa hai. Wo saari puri ek saath plate mein nahi daalte; aap 'next' bolte ho to ek puri dete hain aur ruk jaate hain. return matlab dukaan band, aur yield from matlab doosre bhaiya ki puriyan bhi isi line se dilwana.",en:"A generator is like a pani-puri seller. He does not put all the puris on your plate at once; each time you say 'next' he gives one and waits. return means the stall closes, and yield from means he passes along puris from another seller through the same line.",bn:"Generator \u09B9\u09B2\u09CB \u09AB\u09C1\u099A\u0995\u09BE\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u09B8\u09C7 \u09B8\u09AC \u09AB\u09C1\u099A\u0995\u09BE \u098F\u0995\u09B8\u09BE\u09A5\u09C7 \u09AA\u09CD\u09B2\u09C7\u099F\u09C7 \u09A6\u09C7\u09AF\u09BC \u09A8\u09BE; \u09A4\u09C1\u09AE\u09BF 'next' \u09AC\u09B2\u09B2\u09C7 \u098F\u0995\u099F\u09BE \u09A6\u09C7\u09AF\u09BC \u0986\u09B0 \u09A5\u09C7\u09AE\u09C7 \u09A5\u09BE\u0995\u09C7\u0964 return \u09AE\u09BE\u09A8\u09C7 \u09A6\u09CB\u0995\u09BE\u09A8 \u09AC\u09A8\u09CD\u09A7, \u0986\u09B0 yield from \u09AE\u09BE\u09A8\u09C7 \u0985\u09A8\u09CD\u09AF \u09AB\u09C1\u099A\u0995\u09BE\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AB\u09C1\u099A\u0995\u09BE\u0993 \u098F\u0995\u0987 \u09B2\u09BE\u0987\u09A8\u09C7 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u0964"},question:"What is a generator? How is yield different from return, and what does yield from do?",answer:"A generator is a function containing `yield`; calling it returns a generator object (a lazy iterator) instead of running the body. Each `next()` runs the code until the next `yield`, hands out that value and pauses with all local state saved, while `return` ends the function for good. `yield from iterable` delegates to another iterable or sub-generator, yielding all its values (and passing send()/throw() through), which keeps nested generators simple.",points:["Lazy: values are produced one at a time, so memory stays constant","Calling the function does not run it; iteration does","Exhausted generators raise StopIteration and cannot be restarted","yield from delegates to a sub-iterator and returns its return value","Generator expressions: (x * x for x in data)"],code:`def count_up(n):
    for i in range(1, n + 1):
        yield i

def combined():
    yield 0
    yield from count_up(3)
    yield from "ab"

g = count_up(2)
print(next(g), next(g))
print(list(combined()))
print(list(g))   # already exhausted
# Output:
# 1 2
# [0, 1, 2, 3, 'a', 'b']
# []`},{id:"pa-4",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"Iterable ek poori mithai ki dibbi hai, aur iterator wo haath hai jo ek-ek laddoo nikaalta hai. Dibbi se aap naya haath (iterator) kabhi bhi shuru kar sakte ho, par ek haath jab saare laddoo nikaal le, to wo khaali ho jaata hai (StopIteration).",en:"An iterable is a full box of sweets, and an iterator is the hand that takes out one laddoo at a time. You can start a new hand (iterator) on the box any time, but once one hand has taken all the laddoos, it is empty (StopIteration).",bn:"Iterable \u09B9\u09B2\u09CB \u09AE\u09BF\u09B7\u09CD\u099F\u09BF\u09B0 \u09AA\u09C1\u09B0\u09CB \u09AC\u09BE\u0995\u09CD\u09B8, \u0986\u09B0 iterator \u09B9\u09B2\u09CB \u09B8\u09C7\u0987 \u09B9\u09BE\u09A4 \u09AF\u09BE \u098F\u0995\u099F\u09BE \u098F\u0995\u099F\u09BE \u0995\u09B0\u09C7 \u09B2\u09BE\u09A1\u09CD\u09A1\u09C1 \u09AC\u09C7\u09B0 \u0995\u09B0\u09C7\u0964 \u09AC\u09BE\u0995\u09CD\u09B8 \u09A5\u09C7\u0995\u09C7 \u09AF\u09C7\u0995\u09CB\u09A8\u09CB \u09B8\u09AE\u09AF\u09BC \u09A8\u09A4\u09C1\u09A8 \u09B9\u09BE\u09A4 (iterator) \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u098F\u0995\u099F\u09BE \u09B9\u09BE\u09A4 \u09B8\u09AC \u09B2\u09BE\u09A1\u09CD\u09A1\u09C1 \u09AC\u09C7\u09B0 \u0995\u09B0\u09C7 \u09AB\u09C7\u09B2\u09B2\u09C7 \u09B8\u09C7\u099F\u09BE \u0996\u09BE\u09B2\u09BF \u09B9\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC (StopIteration)\u0964"},question:"Explain the iterator protocol. What is the difference between an iterable and an iterator?",answer:"An iterable is any object that can give an iterator via `__iter__()` (lists, strings, dicts, files). An iterator is the object that actually produces values: it implements `__next__()` returning the next item and raising StopIteration when done, plus `__iter__()` returning itself. A for loop calls iter() on the iterable once and then next() repeatedly until StopIteration, which is why a list can be looped many times but an iterator only once.",points:["Iterable: has __iter__ (or legacy __getitem__); iterator: has __next__ and __iter__","iter(obj) and next(it) are the built-in entry points","StopIteration signals the end; for loops catch it for you","Iterators are single-pass; iterables can create fresh iterators","Writing a generator function is the easiest way to build an iterator"],code:`class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        self.current -= 1
        return self.current + 1

c = Countdown(3)
print(list(c))   # [3, 2, 1]
print(list(c))   # [] - iterator is used up

nums = [1, 2]
it = iter(nums)
print(next(it), next(it))   # 1 2`},{id:"pa-5",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"Ye railway station par ticket check karne jaisa hai: TC poori train ko ek kamre mein nahi bulaata, wo ek-ek passenger ko gate par check karta hai. Generator bhi file ki ek-ek line dekhta hai, isliye 20 GB file bhi chhoti memory mein chal jaati hai.",en:"It is like a TC checking tickets at a railway station: he does not call the whole train into one room, he checks one passenger at a time at the gate. A generator also looks at one line of the file at a time, so even a 20 GB file works in small memory.",bn:"\u098F\u099F\u09BE \u09B0\u09C7\u09B2 \u09B8\u09CD\u099F\u09C7\u09B6\u09A8\u09C7 \u099F\u09BF\u0995\u09BF\u099F \u099A\u09C7\u0995 \u0995\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB: TC \u09AA\u09C1\u09B0\u09CB \u099F\u09CD\u09B0\u09C7\u09A8\u0995\u09C7 \u098F\u0995\u099F\u09BE \u0998\u09B0\u09C7 \u09A1\u09BE\u0995\u09C7 \u09A8\u09BE, \u0997\u09C7\u099F\u09C7 \u098F\u0995\u099C\u09A8 \u098F\u0995\u099C\u09A8 \u0995\u09B0\u09C7 \u09AF\u09BE\u09A4\u09CD\u09B0\u09C0 \u099A\u09C7\u0995 \u0995\u09B0\u09C7\u0964 Generator-\u0993 \u09AB\u09BE\u0987\u09B2\u09C7\u09B0 \u098F\u0995\u099F\u09BE \u098F\u0995\u099F\u09BE \u09B2\u09BE\u0987\u09A8 \u09A6\u09C7\u0996\u09C7, \u09A4\u09BE\u0987 20 GB \u09AB\u09BE\u0987\u09B2\u0993 \u0985\u09B2\u09CD\u09AA memory-\u09A4\u09C7 \u099A\u09B2\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964"},question:"Scenario: you must count ERROR lines in a 20 GB log file on a machine with 2 GB RAM. How would you write it in Python?",answer:"Never load the whole file with read() or readlines(); iterate over the file object, which yields one line at a time. Chain small generators into a pipeline (read lines \u2192 filter \u2192 transform) so only one line is in memory at any moment, and aggregate with something like sum() or a Counter. Use a `with` block so the file is closed, and if it is still too slow, split the file by byte ranges and process chunks in parallel with multiprocessing.",points:["Iterate the file object: `for line in f` is lazy and buffered","Generator pipeline: each stage pulls one item from the previous one","Constant memory regardless of file size","Use `with open(...)` and an explicit encoding / errors policy","For CPU-heavy parsing, parallelise chunks with multiprocessing"],code:`import io

def read_lines(f):
    for line in f:          # lazy, one line at a time
        yield line.rstrip("\\n")

def errors_only(lines):
    return (l for l in lines if " ERROR " in l)

# io.StringIO stands in for open("app.log", encoding="utf-8")
log = io.StringIO(
    "10:00 INFO start\\n10:01 ERROR db down\\n"
    "10:02 WARN slow\\n10:03 ERROR timeout\\n"
)
with log as f:
    count = sum(1 for _ in errors_only(read_lines(f)))
print(count)   # 2`},{id:"pa-6",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"Context manager hotel room ki chaabi jaisa hai. Andar jaate waqt (__enter__) light-AC chalu, aur bahar nikalte waqt (__exit__) sab apne aap band, chahe aap aaraam se jaao ya jaldi mein bhaago (exception).",en:"A context manager is like a hotel room key card. When you enter (__enter__) the lights and AC turn on, and when you leave (__exit__) everything switches off automatically, whether you leave calmly or rush out (exception).",bn:"Context manager \u09B9\u09B2\u09CB \u09B9\u09CB\u099F\u09C7\u09B2 \u09B0\u09C1\u09AE\u09C7\u09B0 key card-\u098F\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A2\u09CB\u0995\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC (__enter__) \u0986\u09B2\u09CB-AC \u099A\u09BE\u09B2\u09C1 \u09B9\u09AF\u09BC, \u0986\u09B0 \u09AC\u09C7\u09B0\u09CB\u09A8\u09CB\u09B0 \u09B8\u09AE\u09AF\u09BC (__exit__) \u09B8\u09AC \u09A8\u09BF\u099C\u09C7 \u09A5\u09C7\u0995\u09C7 \u09AC\u09A8\u09CD\u09A7 \u09B9\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC, \u09A4\u09C1\u09AE\u09BF \u09A7\u09C0\u09B0\u09C7 \u09AC\u09C7\u09B0\u09CB\u0993 \u09AC\u09BE \u09A4\u09BE\u09A1\u09BC\u09BE\u09B9\u09C1\u09A1\u09BC\u09CB\u09AF\u09BC \u09A6\u09CC\u09A1\u09BC\u09BE\u0993 (exception)\u0964"},question:"What is a context manager? How do __enter__ / __exit__ and contextlib.contextmanager work?",answer:"A context manager sets something up and guarantees cleanup when used with `with`, even if an exception occurs \u2014 files, locks, DB transactions. A class implements `__enter__` (its return value is bound by `as`) and `__exit__(exc_type, exc, tb)`, which always runs; returning True from `__exit__` suppresses the exception. `@contextlib.contextmanager` turns a generator into a context manager: code before `yield` is setup, the yielded value goes to `as`, and code after `yield` (best put in `finally`) is cleanup.",points:["with guarantees cleanup, replacing try/finally boilerplate","__exit__ receives exception info; return True to swallow it","@contextmanager: setup / yield / cleanup in try-finally","contextlib also has suppress, closing, ExitStack, nullcontext","Async version: async with plus __aenter__ / __aexit__"],code:`from contextlib import contextmanager

class Timer:
    def __enter__(self):
        print("start")
        return self

    def __exit__(self, exc_type, exc, tb):
        print("stop, error =", exc_type.__name__ if exc_type else None)
        return False   # do not suppress

@contextmanager
def tag(name):
    print(f"<{name}>")
    try:
        yield name
    finally:
        print(f"</{name}>")

with Timer():
    print("working")
with tag("b") as t:
    print("inside", t)`},{id:"pa-7",level:"mid",topic:"py-advanced",difficulty:"medium",simple:{hi:"GIL ek school ke ek hi microphone jaisa hai. Kai bachche (threads) stage par hain, par ek time par sirf ek hi bol sakta hai. Jab koi bachcha paani peene jaata hai (I/O wait), to mic doosre ko mil jaata hai, isliye waiting wale kaam mein threads kaam aate hain.",en:"The GIL is like a school with only one microphone. Many children (threads) are on stage, but only one can speak at a time. When a child goes to drink water (I/O wait), the mic goes to another, so threads help for waiting-type work.",bn:"GIL \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u098F\u0995\u099F\u09BE\u0987 \u09AE\u09BE\u0987\u0995\u09CD\u09B0\u09CB\u09AB\u09CB\u09A8\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u0985\u09A8\u09C7\u0995 \u09AC\u09BE\u099A\u09CD\u099A\u09BE (threads) \u09B8\u09CD\u099F\u09C7\u099C\u09C7 \u0986\u099B\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u098F\u0995\u09B8\u09AE\u09AF\u09BC\u09C7 \u098F\u0995\u099C\u09A8\u0987 \u09AC\u09B2\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964 \u0995\u09CB\u09A8\u09CB \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u099C\u09B2 \u0996\u09C7\u09A4\u09C7 \u0997\u09C7\u09B2\u09C7 (I/O wait) \u09AE\u09BE\u0987\u0995 \u0985\u09A8\u09CD\u09AF\u099C\u09A8 \u09AA\u09BE\u09AF\u09BC, \u09A4\u09BE\u0987 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE\u09B0 \u0995\u09BE\u099C\u09C7 threads \u0995\u09BE\u099C\u09C7 \u09B2\u09BE\u0997\u09C7\u0964"},question:"What is the GIL? How does it affect multithreaded Python programs?",answer:"The Global Interpreter Lock is a mutex in CPython that lets only one thread execute Python bytecode at a time, which keeps reference counting and interpreter internals simple and safe. As a result, threads give no speed-up for CPU-bound pure-Python code, but they work well for I/O-bound code because the GIL is released while waiting on network, disk or sleep, and many C extensions (NumPy, hashlib) release it during heavy work. For CPU-bound parallelism use multiprocessing or native extensions; CPython 3.13+ also ships an optional free-threaded (no-GIL) build, but the standard build still has the GIL.",points:["GIL is a CPython implementation detail, not part of the language spec","Only one thread runs Python bytecode at a time","Released during blocking I/O and by many C extensions","The GIL does not make your own code thread-safe: x += 1 can still race","CPU-bound: multiprocessing / ProcessPoolExecutor; the optional free-threaded build removes the GIL"],code:`import time
from concurrent.futures import ThreadPoolExecutor

def io_task(_):
    time.sleep(0.5)        # GIL released while sleeping / waiting on I/O

start = time.perf_counter()
with ThreadPoolExecutor(max_workers=4) as pool:
    list(pool.map(io_task, range(4)))
print(f"4 I/O tasks took ~{time.perf_counter() - start:.1f}s")
# Output: 4 I/O tasks took ~0.5s  (not 2.0s)
# A CPU-bound loop in 4 threads would NOT be faster than 1 thread.`},{id:"pa-8",level:"mid",topic:"py-advanced",difficulty:"medium",simple:{hi:"Socho ek restaurant: multiprocessing matlab alag-alag kitchen aur alag cook (asli parallel kaam). threading matlab ek kitchen mein kai helpers. asyncio matlab ek smart waiter jo order dekar khana banne ka wait nahi karta, turant doosri table par chala jaata hai.",en:"Think of a restaurant: multiprocessing is separate kitchens with separate cooks (real parallel work). threading is many helpers in one kitchen. asyncio is one smart waiter who places an order and, instead of waiting for the food, goes straight to the next table.",bn:"\u098F\u0995\u099F\u09BE \u09B0\u09C7\u09B8\u09CD\u09A4\u09CB\u09B0\u09BE\u0981 \u09AD\u09BE\u09AC\u09CB: multiprocessing \u09AE\u09BE\u09A8\u09C7 \u0986\u09B2\u09BE\u09A6\u09BE \u0986\u09B2\u09BE\u09A6\u09BE \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0 \u0986\u09B0 \u0986\u09B2\u09BE\u09A6\u09BE \u09B0\u09BE\u0981\u09A7\u09C1\u09A8\u09BF (\u0986\u09B8\u09B2 parallel \u0995\u09BE\u099C)\u0964 threading \u09AE\u09BE\u09A8\u09C7 \u098F\u0995 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0\u09C7 \u0985\u09A8\u09C7\u0995 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF\u0995\u09BE\u09B0\u09C0\u0964 asyncio \u09AE\u09BE\u09A8\u09C7 \u098F\u0995\u099C\u09A8 \u099A\u09BE\u09B2\u09BE\u0995 \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0, \u09AF\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BF\u09AF\u09BC\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u09A5\u09BE\u0995\u09C7 \u09A8\u09BE, \u09B8\u09CB\u099C\u09BE \u09AA\u09B0\u09C7\u09B0 \u099F\u09C7\u09AC\u09BF\u09B2\u09C7 \u099A\u09B2\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964"},question:"threading vs multiprocessing vs asyncio \u2014 when would you use which?",answer:"Use multiprocessing (or ProcessPoolExecutor) for CPU-bound work such as image processing or heavy calculations, because each process has its own interpreter and GIL and can use all cores. Use asyncio for high-concurrency I/O-bound work \u2014 thousands of network calls or sockets \u2014 with async-compatible libraries, since one thread switching between coroutines is very cheap. Use threading for moderate I/O-bound work or when you must call blocking libraries that have no async version.",points:["CPU-bound -> processes; I/O-bound -> threads or asyncio","Processes: true parallelism but higher memory and pickling cost","Threads: shared memory, need locks, limited by the GIL for CPU work","asyncio: cooperative, single thread, scales to many connections; one blocking call stalls everything","concurrent.futures gives one API for both pools; asyncio.to_thread bridges blocking code"],code:`import asyncio
from concurrent.futures import ProcessPoolExecutor

def cpu_heavy(n):              # CPU-bound -> processes
    return sum(i * i for i in range(n))

async def fetch(i):            # I/O-bound -> asyncio
    await asyncio.sleep(0.1)   # stands in for an HTTP call
    return i

async def main():
    return await asyncio.gather(*(fetch(i) for i in range(100)))

if __name__ == "__main__":
    with ProcessPoolExecutor() as pool:
        print(list(pool.map(cpu_heavy, [10, 100])))
    print(len(asyncio.run(main())))
# Output:
# [285, 328350]
# 100`},{id:"pa-9",level:"mid",topic:"py-advanced",difficulty:"medium",simple:{hi:"Event loop ek tiffin wale dabbawala jaisa hai. Wo ek ghar ke darwaze par khada nahi rehta; await par dabba rakh kar aage badh jaata hai aur jab koi dabba ready ho to wapas aata hai. Isliye ek hi aadmi (ek thread) bahut saare ghar sambhal leta hai.",en:"The event loop is like a dabbawala. He does not stand waiting at one door; at each await he moves on, and comes back when a tiffin is ready. That is how one person (one thread) handles many homes.",bn:"Event loop \u09B9\u09B2\u09CB \u098F\u0995\u099C\u09A8 \u099F\u09BF\u09AB\u09BF\u09A8 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF-\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u09B8\u09C7 \u098F\u0995 \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u09A6\u09B0\u099C\u09BE\u09AF\u09BC \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u09A5\u09BE\u0995\u09C7 \u09A8\u09BE; await-\u098F \u098F\u0997\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC, \u0986\u09B0 \u0995\u09CB\u09A8\u09CB \u099F\u09BF\u09AB\u09BF\u09A8 \u09A4\u09C8\u09B0\u09BF \u09B9\u09B2\u09C7 \u09AB\u09BF\u09B0\u09C7 \u0986\u09B8\u09C7\u0964 \u09A4\u09BE\u0987 \u098F\u0995\u099C\u09A8 \u09B2\u09CB\u0995 (\u098F\u0995\u099F\u09BE thread) \u0985\u09A8\u09C7\u0995 \u09AC\u09BE\u09A1\u09BC\u09BF \u09B8\u09BE\u09AE\u09B2\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964"},question:"How do async / await and the event loop work in Python?",answer:"`async def` defines a coroutine function; calling it creates a coroutine object that does nothing until it is awaited or scheduled. The event loop (started with asyncio.run) runs coroutines on one thread; at each `await` on something not ready, the coroutine pauses and the loop runs other ready tasks, resuming it when its I/O or timer completes. To run things concurrently you wrap them in tasks via asyncio.gather, asyncio.create_task or asyncio.TaskGroup \u2014 awaiting coroutines one after another runs them sequentially.",points:["Coroutines are cooperative: they yield control only at await","asyncio.run() creates the loop, runs main() and closes it","gather / create_task / TaskGroup give concurrency; plain await is sequential","Never call blocking code (time.sleep, requests) inside a coroutine; use asyncio.to_thread","Forgetting await gives a 'coroutine was never awaited' warning"],code:`import asyncio, time

async def brew(name, secs):
    await asyncio.sleep(secs)     # loop runs other tasks meanwhile
    print(f"{name} ready")
    return name

async def main():
    start = time.perf_counter()
    results = await asyncio.gather(brew("tea", 0.2), brew("coffee", 0.1))
    print(results, f"{time.perf_counter() - start:.1f}s")

asyncio.run(main())
# Output:
# coffee ready
# tea ready
# ['tea', 'coffee'] 0.2s`},{id:"pa-10",level:"mid",topic:"py-advanced",difficulty:"hard",simple:{hi:"MRO ek school assembly ki line jaisa hai. Har bachcha (class) apne baad wale ko mic pass karta hai (super()), aur line ka order pehle se tay hai, isliye koi bhi bachcha do baar nahi bolta aur koi chhoot-ta bhi nahi.",en:"The MRO is like the queue in a school assembly. Each child (class) passes the mic to the next one in the queue (super()), and the order is fixed in advance, so no child speaks twice and nobody is skipped.",bn:"MRO \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09AA\u09CD\u09B0\u09BE\u09B0\u09CD\u09A5\u09A8\u09BE-\u09B8\u09AD\u09BE\u09B0 \u09B2\u09BE\u0987\u09A8\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09AC\u09BE\u099A\u09CD\u099A\u09BE (class) \u09B2\u09BE\u0987\u09A8\u09C7 \u09A4\u09BE\u09B0 \u09AA\u09B0\u09C7\u09B0 \u099C\u09A8\u0995\u09C7 \u09AE\u09BE\u0987\u0995 \u09A6\u09C7\u09AF\u09BC (super()), \u0986\u09B0 \u09B2\u09BE\u0987\u09A8\u09C7\u09B0 \u0995\u09CD\u09B0\u09AE \u0986\u0997\u09C7 \u09A5\u09C7\u0995\u09C7\u0987 \u09A0\u09BF\u0995 \u0995\u09B0\u09BE, \u09A4\u09BE\u0987 \u0995\u09C7\u0989 \u09A6\u09C1\u09AC\u09BE\u09B0 \u09AC\u09B2\u09C7 \u09A8\u09BE \u0986\u09B0 \u0995\u09C7\u0989 \u09AC\u09BE\u09A6\u0993 \u09AA\u09A1\u09BC\u09C7 \u09A8\u09BE\u0964"},question:"What is the MRO in Python and how does super() work with multiple inheritance? What does this diamond example print?",answer:"The Method Resolution Order is the order in which Python searches classes for an attribute; it is computed with the C3 linearization and visible via `Class.__mro__` or `Class.mro()`. `super()` does not mean 'the parent class' \u2014 it means 'the next class after this one in the MRO of the instance's actual type'. In the diamond D(B, C), the MRO is D, B, C, A, object, so cooperative super() calls visit every class exactly once and the output is D B C A.",points:["C3 linearization: children before parents, left-to-right order of bases kept","Inspect with ClassName.__mro__ or ClassName.mro()","super() follows the MRO of type(self), not the static parent","Cooperative multiple inheritance: every class calls super() and accepts **kwargs","Inconsistent hierarchies raise TypeError at class creation"],code:`class A:
    def hello(self):
        print("A")

class B(A):
    def hello(self):
        print("B"); super().hello()

class C(A):
    def hello(self):
        print("C"); super().hello()

class D(B, C):
    def hello(self):
        print("D"); super().hello()

D().hello()
print([k.__name__ for k in D.__mro__])
# Output:
# D
# B
# C
# A
# ['D', 'B', 'C', 'A', 'object']`},{id:"pa-11",level:"fresher",topic:"py-advanced",difficulty:"easy",simple:{hi:"Dunder methods ek ghar ke switchboard jaise hain. Aap sirf switch dabate ho (+, len(), print), aur andar ki wiring (__add__, __len__, __str__) apne aap kaam karti hai. __str__ mehmaan ke liye sundar naam hai, __repr__ electrician ke liye poori detail.",en:"Dunder methods are like the switchboard in a house. You just press a switch (+, len(), print) and the hidden wiring (__add__, __len__, __str__) does the work. __str__ is the friendly name for guests, __repr__ is the full detail for the electrician.",bn:"Dunder methods \u09B9\u09B2\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u09B8\u09C1\u0987\u099A\u09AC\u09CB\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A4\u09C1\u09AE\u09BF \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C1\u0987\u099A \u099F\u09C7\u09AA\u09CB (+, len(), print), \u0986\u09B0 \u09AD\u09C7\u09A4\u09B0\u09C7\u09B0 \u09A4\u09BE\u09B0 (__add__, __len__, __str__) \u09A8\u09BF\u099C\u09C7 \u09A5\u09C7\u0995\u09C7\u0987 \u0995\u09BE\u099C \u0995\u09B0\u09C7\u0964 __str__ \u0985\u09A4\u09BF\u09A5\u09BF\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u09A8\u09BE\u09AE, __repr__ \u0987\u09B2\u09C7\u0995\u099F\u09CD\u09B0\u09BF\u09B6\u09BF\u09AF\u09BC\u09BE\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09C1\u09B0\u09CB \u09AC\u09BF\u09AC\u09B0\u09A3\u0964"},question:"What are dunder (magic) methods? Explain __str__ vs __repr__ with examples of others.",answer:"Dunder methods are special methods with double underscores that Python calls implicitly to support built-in syntax and functions: `__init__` for construction, `__len__` for len(), `__eq__` for ==, `__add__` for +, `__getitem__` for indexing and so on. `__repr__` should give an unambiguous, developer-facing representation (ideally valid code to recreate the object) and is used in the REPL and inside containers; `__str__` gives a readable, user-facing string for print() and str(). If only `__repr__` is defined, str() falls back to it.",points:["Called by Python, rarely called directly","__repr__ for developers/debugging, __str__ for end users","print(obj) uses __str__; print([obj]) uses __repr__ of items","Operator overloading: __add__, __eq__, __lt__; containers: __len__, __getitem__, __contains__","Defining __eq__ without __hash__ makes instances unhashable"],code:`class Money:
    def __init__(self, amount):
        self.amount = amount

    def __repr__(self):
        return f"Money({self.amount})"

    def __str__(self):
        return f"\u20B9{self.amount}"

    def __add__(self, other):
        return Money(self.amount + other.amount)

    def __eq__(self, other):
        return isinstance(other, Money) and self.amount == other.amount

m = Money(50) + Money(20)
print(m)              # \u20B970
print([m])            # [Money(70)]
print(m == Money(70)) # True`},{id:"pa-12",level:"fresher",topic:"py-advanced",difficulty:"easy",simple:{hi:"School ka example lo: instance method ek student ka apna kaam hai, classmethod principal ka kaam hai jo poori school (class) ke liye naya admission banata hai, aur staticmethod notice board ka calculator hai jo kisi ka nahi par school mein rakha hai. property report card jaisa hai: dekhne mein simple, par likhne se pehle teacher check karti hai.",en:"Take a school: an instance method is one student's own work, a classmethod is the principal's job of making a new admission for the whole school (the class), and a staticmethod is a calculator kept on the notice board that belongs to no one. A property is like a report card: easy to read, but the teacher checks before anything is written.",bn:"\u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u0989\u09A6\u09BE\u09B9\u09B0\u09A3 \u09A8\u09BE\u0993: instance method \u09B9\u09B2\u09CB \u098F\u0995\u099C\u09A8 \u099B\u09BE\u09A4\u09CD\u09B0\u09C7\u09B0 \u09A8\u09BF\u099C\u09C7\u09B0 \u0995\u09BE\u099C, classmethod \u09B9\u09B2\u09CB \u09AA\u09CD\u09B0\u09BF\u09A8\u09CD\u09B8\u09BF\u09AA\u09BE\u09B2\u09C7\u09B0 \u0995\u09BE\u099C \u09AF\u09BF\u09A8\u09BF \u09AA\u09C1\u09B0\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 (class) \u099C\u09A8\u09CD\u09AF \u09A8\u09A4\u09C1\u09A8 \u09AD\u09B0\u09CD\u09A4\u09BF \u0995\u09B0\u09BE\u09A8, \u0986\u09B0 staticmethod \u09B9\u09B2\u09CB \u09A8\u09CB\u099F\u09BF\u09B6 \u09AC\u09CB\u09B0\u09CD\u09A1\u09C7 \u09B0\u09BE\u0996\u09BE \u098F\u0995\u099F\u09BE \u0995\u09CD\u09AF\u09BE\u09B2\u0995\u09C1\u09B2\u09C7\u099F\u09B0 \u09AF\u09BE \u0995\u09BE\u09B0\u0993 \u09A8\u09BF\u099C\u09C7\u09B0 \u09A8\u09AF\u09BC\u0964 property \u09B9\u09B2\u09CB \u09B0\u09BF\u09AA\u09CB\u09B0\u09CD\u099F \u0995\u09BE\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB: \u09A6\u09C7\u0996\u09A4\u09C7 \u09B8\u09B9\u099C, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09B2\u09C7\u0996\u09BE\u09B0 \u0986\u0997\u09C7 \u099F\u09BF\u099A\u09BE\u09B0 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7\u09A8\u0964"},question:"What is the difference between @staticmethod, @classmethod and @property?",answer:"A normal method receives the instance as `self`; a `@classmethod` receives the class as `cls`, so it is used for alternative constructors (`from_string`) and works correctly with subclasses. A `@staticmethod` receives neither \u2014 it is a plain function kept inside the class namespace because it logically belongs there. `@property` turns a method into a computed attribute accessed without parentheses, and with a `.setter` you can add validation while keeping simple attribute syntax.",points:["Instance method: self; classmethod: cls; staticmethod: nothing implicit","classmethod is ideal for factory / alternative constructors and respects subclasses","staticmethod is a utility function grouped with the class","property gives getter/setter/deleter with attribute syntax (obj.x)","Property lets you add validation later without changing callers"],code:`class Student:
    def __init__(self, name, marks):
        self.name = name
        self.marks = marks          # goes through the setter

    @classmethod
    def from_csv(cls, row):
        name, marks = row.split(",")
        return cls(name, int(marks))

    @staticmethod
    def is_pass(marks):
        return marks >= 33
    @property
    def marks(self):
        return self._marks
    @marks.setter
    def marks(self, value):
        if not 0 <= value <= 100:
            raise ValueError("marks must be 0-100")
        self._marks = value

s = Student.from_csv("Riya,82")
print(s.name, s.marks, Student.is_pass(s.marks))   # Riya 82 True`},{id:"pa-13",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"Dataclass ek ready-made admission form jaisa hai. Aap bas likhte ho ki kaun-kaun se khaane (fields) chahiye, aur Python khud form, print aur compare ka kaam bana deta hai. frozen=True matlab form laminate ho gaya, ab koi badal nahi sakta.",en:"A dataclass is like a ready-made admission form. You just list the boxes (fields) you need, and Python builds the filling, printing and comparing for you. frozen=True means the form is laminated, so nobody can change it.",bn:"Dataclass \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09A4\u09C8\u09B0\u09BF \u09AD\u09B0\u09CD\u09A4\u09BF-\u09AB\u09B0\u09CD\u09AE\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A4\u09C1\u09AE\u09BF \u09B6\u09C1\u09A7\u09C1 \u09B2\u09C7\u0996\u09CB \u0995\u09CB\u09A8 \u0995\u09CB\u09A8 \u0998\u09B0 (fields) \u09B2\u09BE\u0997\u09AC\u09C7, \u0986\u09B0 Python \u09A8\u09BF\u099C\u09C7\u0987 \u09AB\u09B0\u09CD\u09AE \u09AA\u09C2\u09B0\u09A3, print \u0986\u09B0 \u09A4\u09C1\u09B2\u09A8\u09BE\u09B0 \u0995\u09BE\u099C \u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964 frozen=True \u09AE\u09BE\u09A8\u09C7 \u09AB\u09B0\u09CD\u09AE\u099F\u09BE laminate \u0995\u09B0\u09BE, \u098F\u0996\u09A8 \u0995\u09C7\u0989 \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7 \u09A8\u09BE\u0964"},question:"What are dataclasses? What do frozen=True, field(default_factory=...) and __post_init__ do?",answer:"`@dataclass` is a class decorator that generates `__init__`, `__repr__` and `__eq__` from annotated class attributes, removing boilerplate for data-holding classes. `frozen=True` makes instances immutable (assignment raises FrozenInstanceError) and hashable, `order=True` adds comparison methods, and `slots=True` generates `__slots__`. Mutable defaults like lists must use `field(default_factory=list)`, and `__post_init__` runs after the generated `__init__` for validation or derived fields.",points:["Fields come from type annotations; order of fields = order of __init__ params","A mutable default (list/dict/set) raises ValueError \u2014 use default_factory","frozen=True: immutable + hashable; order=True: <, > etc.","__post_init__ for validation or computed fields; kw_only and slots options exist","For validation-heavy data (APIs) Pydantic is a common alternative"],code:`from dataclasses import dataclass, field

@dataclass
class Order:
    item: str
    qty: int = 1
    tags: list[str] = field(default_factory=list)

    def __post_init__(self):
        if self.qty <= 0:
            raise ValueError("qty must be positive")

@dataclass(frozen=True)
class Point:
    x: int
    y: int

o = Order("samosa", 2)
print(o)                         # Order(item='samosa', qty=2, tags=[])
print(Point(1, 2) == Point(1, 2))   # True
try:
    Point(1, 2).x = 5
except AttributeError as e:
    print(type(e).__name__)      # FrozenInstanceError`},{id:"pa-14",level:"senior",topic:"py-advanced",difficulty:"hard",simple:{hi:"Type hints railway ticket par likhe coach number jaise hain: train khud check nahi karti, par TC (mypy) pehle hi galti pakad leta hai. Protocol kehta hai 'jo bhi seeti baja sake wo guard ban sakta hai', chahe wo kisi bhi family se ho. TypedDict ek form hai jisme pehle se tay hai kaun-kaun se khaane bharne hain.",en:"Type hints are like the coach number printed on a train ticket: the train itself does not check it, but the TC (mypy) catches mistakes in advance. A Protocol says 'anyone who can blow the whistle can be the guard', whatever family they come from. A TypedDict is a form where the boxes to fill are fixed in advance.",bn:"Type hints \u09B9\u09B2\u09CB \u099F\u09CD\u09B0\u09C7\u09A8\u09C7\u09B0 \u099F\u09BF\u0995\u09BF\u099F\u09C7 \u09B2\u09C7\u0996\u09BE \u0995\u09CB\u099A \u09A8\u09AE\u09CD\u09AC\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB: \u099F\u09CD\u09B0\u09C7\u09A8 \u09A8\u09BF\u099C\u09C7 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7 \u09A8\u09BE, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 TC (mypy) \u0986\u0997\u09C7\u0987 \u09AD\u09C1\u09B2 \u09A7\u09B0\u09C7 \u09AB\u09C7\u09B2\u09C7\u0964 Protocol \u09AC\u09B2\u09C7 '\u09AF\u09C7 \u09AC\u09BE\u0981\u09B6\u09BF \u09AC\u09BE\u099C\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 \u09B8\u09C7\u0987 guard \u09B9\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7', \u09B8\u09C7 \u09AF\u09C7 \u09AA\u09B0\u09BF\u09AC\u09BE\u09B0\u09C7\u09B0\u0987 \u09B9\u09CB\u0995\u0964 TypedDict \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995\u099F\u09BE \u09AB\u09B0\u09CD\u09AE \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u0995\u09CB\u09A8 \u0995\u09CB\u09A8 \u0998\u09B0 \u09AA\u09C2\u09B0\u09A3 \u0995\u09B0\u09A4\u09C7 \u09B9\u09AC\u09C7 \u09A4\u09BE \u0986\u0997\u09C7 \u09A5\u09C7\u0995\u09C7\u0987 \u09A0\u09BF\u0995 \u0995\u09B0\u09BE\u0964"},question:"Explain type hints in modern Python: generics, Protocol and TypedDict. Are they enforced at runtime?",answer:"Type hints are annotations checked by static tools such as mypy or pyright, not by the interpreter \u2014 Python ignores them at runtime (frameworks like Pydantic or FastAPI may read them). Generics let a function or class be parametrised over types; since Python 3.12 you can write `def first[T](xs: list[T]) -> T` and `class Box[T]:` instead of declaring TypeVar manually. `Protocol` enables structural typing (static duck typing): any class with matching methods is accepted without inheriting from it, and `TypedDict` describes the exact keys and value types of a plain dict, such as a JSON payload.",points:["Hints are not enforced at runtime; mypy/pyright check them","Built-in generics: list[int], dict[str, int], X | None (no need for typing.List)","PEP 695 syntax (3.12+): def f[T](...) and class Box[T]: and type aliases with `type`","Protocol = structural typing; @runtime_checkable allows isinstance checks","TypedDict types dict keys (Required / NotRequired); also Literal, Final, Callable, Self"],code:`from typing import Protocol, TypedDict

class Speaker(Protocol):
    def speak(self) -> str: ...

class Dog:                     # no inheritance from Speaker
    def speak(self) -> str:
        return "Bhow!"

def announce(s: Speaker) -> str:
    return s.speak()

class User(TypedDict):
    name: str
    age: int

def first[T](items: list[T]) -> T:   # Python 3.12+ generic syntax
    return items[0]

u: User = {"name": "Asha", "age": 30}
print(announce(Dog()), first([3, 4]), u["name"])   # Bhow! 3 Asha
print(first.__type_params__)   # (T,)`},{id:"pa-15",level:"senior",topic:"py-advanced",difficulty:"hard",simple:{hi:"Agar class ek mithai ka saancha (mould) hai jisse laddoo (objects) bante hain, to metaclass wo factory hai jo saanche banati hai. Factory har naye saanche par apna stamp ya rule laga sakti hai, par zyaadatar kaam chhote auzaar (class decorator) se ho jaata hai.",en:"If a class is a sweet mould that makes laddoos (objects), a metaclass is the factory that makes the moulds. The factory can put its stamp or rules on every new mould, but most jobs can be done with a smaller tool (a class decorator).",bn:"Class \u09AF\u09A6\u09BF \u09AE\u09BF\u09B7\u09CD\u099F\u09BF\u09B0 \u099B\u09BE\u0981\u099A \u09B9\u09AF\u09BC \u09AF\u09BE \u09A6\u09BF\u09AF\u09BC\u09C7 \u09B2\u09BE\u09A1\u09CD\u09A1\u09C1 (objects) \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC, \u09A4\u09BE\u09B9\u09B2\u09C7 metaclass \u09B9\u09B2\u09CB \u09B8\u09C7\u0987 \u0995\u09BE\u09B0\u0996\u09BE\u09A8\u09BE \u09AF\u09BE \u099B\u09BE\u0981\u099A \u09AC\u09BE\u09A8\u09BE\u09AF\u09BC\u0964 \u0995\u09BE\u09B0\u0996\u09BE\u09A8\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09A8\u09A4\u09C1\u09A8 \u099B\u09BE\u0981\u099A\u09C7 \u09A8\u09BF\u099C\u09C7\u09B0 \u099B\u09BE\u09AA \u09AC\u09BE \u09A8\u09BF\u09AF\u09BC\u09AE \u09B2\u09BE\u0997\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AC\u09C7\u09B6\u09BF\u09B0\u09AD\u09BE\u0997 \u0995\u09BE\u099C \u099B\u09CB\u099F \u09AF\u09A8\u09CD\u09A4\u09CD\u09B0 (class decorator) \u09A6\u09BF\u09AF\u09BC\u09C7\u0987 \u09B9\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What is a metaclass? When would you use one, and what are the simpler alternatives?",answer:"In Python classes are objects too, and a metaclass is the class of a class \u2014 `type` is the default metaclass, so `type(int)` is `type`. When a class statement runs, Python calls the metaclass (via `__new__` / `__init__`) with the class name, bases and namespace, so a metaclass can modify, validate or register every class that uses it. Real uses include ORMs (Django models), plugin registries and enforcing interface rules, but most needs are met more simply with class decorators or `__init_subclass__`, so metaclasses should be a last resort.",points:["Everything is an object; classes are instances of their metaclass","type(name, bases, dict) can create classes dynamically","Custom metaclass: subclass type and override __new__ / __init__ / __call__","Used by ORMs, ABCMeta, Enum (EnumType), registries","Prefer __init_subclass__ or class decorators \u2014 simpler and composable"],code:`class RegistryMeta(type):
    registry = {}

    def __new__(mcls, name, bases, ns):
        cls = super().__new__(mcls, name, bases, ns)
        if bases:                       # skip the base class itself
            mcls.registry[name.lower()] = cls
        return cls

class Plugin(metaclass=RegistryMeta):
    pass

class CsvExport(Plugin): pass
class PdfExport(Plugin): pass

print(list(RegistryMeta.registry))   # ['csvexport', 'pdfexport']
print(type(Plugin).__name__, type(int).__name__)   # RegistryMeta type

# Simpler alternative:
class Base:
    def __init_subclass__(cls, **kw):
        super().__init_subclass__(**kw)
        print("registered", cls.__name__)

class Report(Base): pass             # registered Report`},{id:"pa-16",level:"senior",topic:"py-advanced",difficulty:"hard",simple:{hi:"Reference counting library ke register jaisa hai: jab tak koi ek bhi aadmi kitaab ka record rakhe, kitaab shelf par rehti hai, aur count zero hote hi wapas chali jaati hai. Par agar do dost ek-doosre ki kitaab pakde baithe hain (cycle), to garbage collector naam ka librarian kabhi-kabhi round lagakar unhe bhi saaf karta hai.",en:"Reference counting is like a library register: as long as even one person has the book recorded, it stays out, and when the count becomes zero it goes back. But if two friends hold each other's books (a cycle), a librarian called the garbage collector does rounds now and then and clears them too.",bn:"Reference counting \u09B9\u09B2\u09CB \u09B2\u09BE\u0987\u09AC\u09CD\u09B0\u09C7\u09B0\u09BF\u09B0 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB: \u09AF\u09A4\u0995\u09CD\u09B7\u09A3 \u0985\u09A8\u09CD\u09A4\u09A4 \u098F\u0995\u099C\u09A8\u09C7\u09B0 \u09A8\u09BE\u09AE\u09C7 \u09AC\u0987\u099F\u09BE \u09B2\u09C7\u0996\u09BE \u09A5\u09BE\u0995\u09C7, \u09AC\u0987\u099F\u09BE \u09AC\u09BE\u0987\u09B0\u09C7 \u09A5\u09BE\u0995\u09C7, \u0986\u09B0 count \u09B6\u09C2\u09A8\u09CD\u09AF \u09B9\u09B2\u09C7\u0987 \u09AB\u09C7\u09B0\u09A4 \u09AF\u09BE\u09AF\u09BC\u0964 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09A6\u09C1\u0987 \u09AC\u09A8\u09CD\u09A7\u09C1 \u09AF\u09A6\u09BF \u098F\u0995\u09C7 \u0985\u09AA\u09B0\u09C7\u09B0 \u09AC\u0987 \u09A7\u09B0\u09C7 \u09AC\u09B8\u09C7 \u09A5\u09BE\u0995\u09C7 (cycle), \u09A4\u09BE\u09B9\u09B2\u09C7 garbage collector \u09A8\u09BE\u09AE\u09C7\u09B0 \u09B2\u09BE\u0987\u09AC\u09CD\u09B0\u09C7\u09B0\u09BF\u09AF\u09BC\u09BE\u09A8 \u09AE\u09BE\u099D\u09C7 \u09AE\u09BE\u099D\u09C7 \u0998\u09C1\u09B0\u09C7 \u09B8\u09C7\u0997\u09C1\u09B2\u09CB\u0993 \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0995\u09B0\u09C7\u09A8\u0964"},question:"How does Python manage memory? Explain reference counting, the garbage collector and reference cycles.",answer:"CPython frees most objects through reference counting: every object tracks how many references point to it, and when that count drops to zero it is deallocated immediately. Reference counting cannot free cycles (a \u2192 b \u2192 a), so a cyclic garbage collector in the `gc` module periodically scans container objects in generations and frees groups that are unreachable from outside. Memory leaks in Python usually come from objects that stay reachable \u2014 growing global caches, unbounded lru_cache, lingering references in closures or callbacks \u2014 and can be found with tracemalloc, gc.get_objects or objgraph, and avoided with weakref where a non-owning reference is enough.",points:["Reference counting gives immediate, deterministic cleanup for most objects","sys.getrefcount(x) shows the count (+1 for the argument itself)","Cyclic GC handles cycles; gc.collect() forces a run, gc.disable() turns automatic runs off","Generational GC: young objects scanned more often","Small-object allocator (pymalloc) may keep freed memory in the process","Leak hunting: tracemalloc snapshots; weakref / WeakValueDictionary to avoid owning references"],code:`import gc, weakref

class Node:
    def __init__(self, name):
        self.name = name
        self.other = None

a, b = Node("a"), Node("b")
a.other, b.other = b, a          # reference cycle
probe = weakref.ref(a)           # does not keep 'a' alive

gc.disable()                     # make the demo deterministic
del a, b                         # refcounts never reach zero
print(probe() is not None)       # True  - cycle still in memory
gc.collect()                     # cyclic GC finds unreachable cycle
print(probe() is None)           # True  - freed
gc.enable()`},{id:"pa-17",level:"mid",topic:"py-advanced",difficulty:"medium",simple:{hi:"__slots__ cinema hall ki numbered seats jaisa hai. Har object ke liye pehle se tay seats hain, isliye jagah kam lagti hai, par koi extra kursi (naya attribute) beech mein nahi laga sakta. Normal class ek khule maidan jaisi hai: jitne chaho log aa jaayein, par jagah zyada lagti hai.",en:"__slots__ is like numbered seats in a cinema hall. Each object has fixed seats reserved, so it takes less space, but nobody can add an extra chair (a new attribute) in between. A normal class is like an open ground: anyone can come in, but it needs more space.",bn:"__slots__ \u09B9\u09B2\u09CB \u09B8\u09BF\u09A8\u09C7\u09AE\u09BE \u09B9\u09B2\u09C7\u09B0 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE \u09B8\u09BF\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE object-\u098F\u09B0 \u099C\u09A8\u09CD\u09AF \u09B8\u09BF\u099F \u0986\u0997\u09C7 \u09A5\u09C7\u0995\u09C7 \u09A0\u09BF\u0995 \u0995\u09B0\u09BE, \u09A4\u09BE\u0987 \u099C\u09BE\u09AF\u09BC\u0997\u09BE \u0995\u09AE \u09B2\u09BE\u0997\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AE\u09BE\u099D\u0996\u09BE\u09A8\u09C7 \u0995\u09C7\u0989 \u09AC\u09BE\u09A1\u09BC\u09A4\u09BF \u099A\u09C7\u09AF\u09BC\u09BE\u09B0 (\u09A8\u09A4\u09C1\u09A8 attribute) \u09AC\u09B8\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 \u09A8\u09BE\u0964 \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 class \u09B9\u09B2\u09CB \u0996\u09CB\u09B2\u09BE \u09AE\u09BE\u09A0\u09C7\u09B0 \u09AE\u09A4\u09CB: \u09AF\u09A4 \u0996\u09C1\u09B6\u09BF \u09B2\u09CB\u0995 \u0986\u09B8\u09C1\u0995, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u099C\u09BE\u09AF\u09BC\u0997\u09BE \u09AC\u09C7\u09B6\u09BF \u09B2\u09BE\u0997\u09C7\u0964"},question:"What does __slots__ do and when should you use it?",answer:"By default each instance stores its attributes in a per-instance `__dict__`, which is flexible but costs memory. Declaring `__slots__ = ('x', 'y')` tells Python to reserve fixed storage for exactly those attributes and not create `__dict__` (or `__weakref__` unless listed), which reduces memory per object and gives slightly faster attribute access. The trade-off is that you cannot add new attributes dynamically, and every class in an inheritance chain must define `__slots__` to get the full benefit; it is worth it when you create millions of small objects. `@dataclass(slots=True)` generates it for you.",points:["Removes per-instance __dict__ -> lower memory for many objects","Assigning an attribute not in __slots__ raises AttributeError","Subclasses without __slots__ get a __dict__ back","Add '__weakref__' to slots if weak references are needed","@dataclass(slots=True) is an easy way to use it"],code:`class PlainPoint:
    def __init__(self, x, y):
        self.x, self.y = x, y

class SlotPoint:
    __slots__ = ("x", "y")
    def __init__(self, x, y):
        self.x, self.y = x, y

p, s = PlainPoint(1, 2), SlotPoint(1, 2)
print(hasattr(p, "__dict__"), hasattr(s, "__dict__"))   # True False
p.z = 3                          # fine
try:
    s.z = 3
except AttributeError as e:
    print("AttributeError:", e)
# AttributeError: 'SlotPoint' object has no attribute 'z'`},{id:"pa-18",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"Closure ek tiffin box jaisa hai: function bahar chala jaata hai, par ghar ke variables saath le jaata hai. Par dhyaan do, wo khane ki photo nahi, asli dabba le jaata hai, isliye agar maa ne baad mein khana badal diya (loop ka last value), to sabko wahi naya khana milega.",en:"A closure is like a tiffin box: the function goes out but carries the home variables with it. But note, it carries the real box, not a photo of the food, so if mother changes the food later (the loop's last value), everyone gets that new food.",bn:"Closure \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u099F\u09BF\u09AB\u09BF\u09A8 \u09AC\u09BE\u0995\u09CD\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB: function \u09AC\u09BE\u0987\u09B0\u09C7 \u099A\u09B2\u09C7 \u09AF\u09BE\u09AF\u09BC, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 variables \u09B8\u0999\u09CD\u0997\u09C7 \u09A8\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC\u0964 \u09A4\u09AC\u09C7 \u0996\u09C7\u09AF\u09BC\u09BE\u09B2 \u0995\u09B0\u09CB, \u09B8\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0 \u099B\u09AC\u09BF \u09A8\u09AF\u09BC, \u0986\u09B8\u09B2 \u09AC\u09BE\u0995\u09CD\u09B8\u099F\u09BE\u0987 \u09A8\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC, \u09A4\u09BE\u0987 \u09AE\u09BE \u09AA\u09B0\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0 \u09AC\u09A6\u09B2\u09C7 \u09A6\u09BF\u09B2\u09C7 (loop-\u098F\u09B0 \u09B6\u09C7\u09B7 \u09AE\u09BE\u09A8) \u09B8\u09AC\u09BE\u0987 \u09B8\u09C7\u0987 \u09A8\u09A4\u09C1\u09A8 \u0996\u09BE\u09AC\u09BE\u09B0\u0987 \u09AA\u09BE\u09AF\u09BC\u0964"},question:"What is a closure in Python? What does this code with lambdas in a loop print, and why?",answer:"A closure is an inner function that remembers variables from its enclosing function's scope even after the outer function has returned; to rebind such a variable inside the inner function you must declare it `nonlocal`. Closures capture variables, not values, and look them up when called (late binding). So lambdas created in a loop all see the loop variable's final value: the snippet prints [2, 2, 2]; binding the value with a default argument (`lambda i=i: i`) prints [0, 1, 2].",points:["Inner function + captured variables from the enclosing scope","Captured cells are visible in func.__closure__","nonlocal is needed to reassign an enclosing variable; global for module level","Late binding: the value is read at call time, not at creation time","Fix with a default argument or functools.partial"],code:`def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

c = make_counter()
c(); c()
print(c())                                 # 3

funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])                # [2, 2, 2]

fixed = [lambda i=i: i for i in range(3)]
print([f() for f in fixed])                # [0, 1, 2]`},{id:"pa-19",level:"fresher",topic:"py-advanced",difficulty:"easy",simple:{hi:"Collections ek kirana dukaan ke khaas dabbe jaise hain: Counter hisaab ki copy hai jo ginta hai kaunsi cheez kitni biki, defaultdict wo almirah jisme naye saamaan ke liye khaana apne aap ban jaata hai, deque ration ki line jisme aage aur peeche dono taraf se log aa-ja sakte hain, aur namedtuple ek bill jisme har line ka naam likha hai.",en:"Collections are like special boxes in a kirana shop: Counter is the notebook that counts how much of each item was sold, defaultdict is a cupboard that makes a new shelf for a new item by itself, deque is a ration queue where people can join or leave at both ends, and namedtuple is a bill with every line labelled.",bn:"Collections \u09B9\u09B2\u09CB \u09AE\u09C1\u09A6\u09BF\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u09AC\u09BF\u09B6\u09C7\u09B7 \u09AC\u09BE\u0995\u09CD\u09B8\u0997\u09C1\u09B2\u09CB\u09B0 \u09AE\u09A4\u09CB: Counter \u09B9\u09B2\u09CB \u09B9\u09BF\u09B8\u09BE\u09AC\u09C7\u09B0 \u0996\u09BE\u09A4\u09BE \u09AF\u09BE \u0997\u09CB\u09A8\u09C7 \u0995\u09CB\u09A8 \u099C\u09BF\u09A8\u09BF\u09B8 \u0995\u09A4\u099F\u09BE \u09AC\u09BF\u0995\u09CD\u09B0\u09BF \u09B9\u09B2\u09CB, defaultdict \u098F\u09AE\u09A8 \u098F\u0995\u099F\u09BE \u0986\u09B2\u09AE\u09BE\u09B0\u09BF \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09A8\u09A4\u09C1\u09A8 \u099C\u09BF\u09A8\u09BF\u09B8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09A4\u09BE\u0995 \u09A8\u09BF\u099C\u09C7 \u09A5\u09C7\u0995\u09C7\u0987 \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC, deque \u09B9\u09B2\u09CB \u09B0\u09C7\u09B6\u09A8\u09C7\u09B0 \u09B2\u09BE\u0987\u09A8 \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09B8\u09BE\u09AE\u09A8\u09C7-\u09AA\u09BF\u099B\u09A8\u09C7 \u09A6\u09C1\u09A6\u09BF\u0995 \u09A5\u09C7\u0995\u09C7\u0987 \u09B2\u09CB\u0995 \u09A2\u09C1\u0995\u09A4\u09C7-\u09AC\u09C7\u09B0\u09CB\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7, \u0986\u09B0 namedtuple \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995\u099F\u09BE \u09AC\u09BF\u09B2 \u09AF\u09BE\u09B0 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09B2\u09BE\u0987\u09A8\u09C7\u09B0 \u09A8\u09BE\u09AE \u09B2\u09C7\u0996\u09BE\u0964"},question:"Which collections and itertools tools do you use most? Explain Counter, defaultdict, deque and namedtuple.",answer:"`Counter` is a dict subclass for counting hashable items, with helpers like most_common(); `defaultdict` creates a default value (e.g. list or int) for missing keys, so grouping needs no `if key not in d` checks. `deque` is a double-ended queue with O(1) append and pop at both ends \u2014 ideal for queues, BFS and sliding windows (`maxlen` keeps only the last N items) \u2014 whereas list.pop(0) is O(n). `namedtuple` creates lightweight immutable tuples with named fields. From itertools, chain, groupby, islice, accumulate, product and combinations are the everyday tools.",points:["Counter: counting + most_common(n), supports + and -","defaultdict(list) for grouping, defaultdict(int) for counting","deque: O(1) appendleft/popleft, rotate, maxlen","namedtuple: tuple with field names, immutable, _replace / _asdict","itertools: chain, islice, groupby (needs sorted input), accumulate, product, combinations"],code:`from collections import Counter, defaultdict, deque, namedtuple
from itertools import chain, islice

print(Counter("banana").most_common(2))   # [('a', 3), ('n', 2)]

groups = defaultdict(list)
for city, name in [("Pune", "Amit"), ("Delhi", "Ria"), ("Pune", "Sam")]:
    groups[city].append(name)
print(dict(groups))   # {'Pune': ['Amit', 'Sam'], 'Delhi': ['Ria']}

last3 = deque(maxlen=3)
for n in range(5):
    last3.append(n)
print(last3)          # deque([2, 3, 4], maxlen=3)

Point = namedtuple("Point", "x y")
p = Point(1, 2)
print(p.x + p.y, p)   # 3 Point(x=1, y=2)

print(list(islice(chain([1, 2], [3, 4]), 3)))   # [1, 2, 3]`},{id:"pa-20",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"lru_cache ek samajhdaar student jaisa hai jo ek baar hal kiya hua sawaal copy mein likh leta hai. Agli baar wahi sawaal aaye to dobara solve nahi karta, seedha copy se answer padh deta hai. Copy bhar jaaye to sabse purana, kam use hua page hata deta hai.",en:"lru_cache is like a smart student who writes every solved sum in a notebook. When the same sum comes again, he does not solve it again but reads the answer from the notebook. When the notebook is full, he tears out the oldest, least-used page.",bn:"lru_cache \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995 \u09AC\u09C1\u09A6\u09CD\u09A7\u09BF\u09AE\u09BE\u09A8 \u099B\u09BE\u09A4\u09CD\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7 \u098F\u0995\u09AC\u09BE\u09B0 \u09B8\u09AE\u09BE\u09A7\u09BE\u09A8 \u0995\u09B0\u09BE \u0985\u0999\u09CD\u0995 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09BF\u0996\u09C7 \u09B0\u09BE\u0996\u09C7\u0964 \u0986\u09AC\u09BE\u09B0 \u098F\u0995\u0987 \u0985\u0999\u09CD\u0995 \u098F\u09B2\u09C7 \u09B8\u09C7 \u09A8\u09A4\u09C1\u09A8 \u0995\u09B0\u09C7 \u0995\u09B7\u09C7 \u09A8\u09BE, \u09B8\u09CB\u099C\u09BE \u0996\u09BE\u09A4\u09BE \u09A5\u09C7\u0995\u09C7 \u0989\u09A4\u09CD\u09A4\u09B0 \u09AA\u09A1\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964 \u0996\u09BE\u09A4\u09BE \u09AD\u09B0\u09C7 \u0997\u09C7\u09B2\u09C7 \u09B8\u09AC\u099A\u09C7\u09AF\u09BC\u09C7 \u09AA\u09C1\u09B0\u09A8\u09CB, \u0995\u09AE \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u09B9\u0993\u09AF\u09BC\u09BE \u09AA\u09BE\u09A4\u09BE\u099F\u09BE \u09B8\u09B0\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964"},question:"What does functools.lru_cache do? Use it to make a recursive Fibonacci fast.",answer:"`@functools.lru_cache(maxsize=128)` memoizes a function: it stores results keyed by the call arguments and returns the cached result for repeated calls, evicting the least recently used entries when maxsize is reached. Naive recursive Fibonacci recomputes the same values exponentially many times; with the cache each fib(k) is computed once, so it becomes linear. Arguments must be hashable, the function should be pure, and `maxsize=None` (or `functools.cache`) means unbounded \u2014 which can grow memory forever in long-running services.",points:["Memoization keyed on positional and keyword arguments","LRU eviction when maxsize is reached; maxsize=None / @cache = unbounded","cache_info() shows hits/misses; cache_clear() empties it","Arguments must be hashable (no lists/dicts)","On methods it keeps self alive; prefer functools.cached_property for per-instance values"],code:`from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n: int) -> int:
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(80))           # 23416728348467685
print(fib.cache_info())
# CacheInfo(hits=78, misses=81, maxsize=None, currsize=81)`},{id:"pa-21",level:"junior",topic:"py-advanced",difficulty:"medium",simple:{hi:"pytest ek school exam jaisa hai: har test ek sawaal hai aur assert answer check karta hai. Fixture wo peon hai jo exam se pehle bench, paper aur pen rakh deta hai aur baad mein saaf kar deta hai. parametrize matlab ek hi sawaal alag-alag numbers ke saath kai baar poochna.",en:"pytest is like a school exam: each test is a question and assert checks the answer. A fixture is the helper who places the bench, paper and pen before the exam and cleans up after. parametrize means asking the same question many times with different numbers.",bn:"pytest \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09B0 \u09AE\u09A4\u09CB: \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE test \u098F\u0995\u099F\u09BE \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u0986\u09B0 assert \u0989\u09A4\u09CD\u09A4\u09B0 \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7\u0964 Fixture \u09B9\u09B2\u09CB \u09B8\u09C7\u0987 \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF\u0995\u09BE\u09B0\u09C0 \u09AF\u09C7 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u09BE\u09B0 \u0986\u0997\u09C7 \u09AC\u09C7\u099E\u09CD\u099A, \u0996\u09BE\u09A4\u09BE \u0986\u09B0 \u09AA\u09C7\u09A8 \u09B0\u09C7\u0996\u09C7 \u09A6\u09C7\u09AF\u09BC \u0986\u09B0 \u09AA\u09B0\u09C7 \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0995\u09B0\u09C7\u0964 parametrize \u09AE\u09BE\u09A8\u09C7 \u098F\u0995\u0987 \u09AA\u09CD\u09B0\u09B6\u09CD\u09A8 \u0986\u09B2\u09BE\u09A6\u09BE \u0986\u09B2\u09BE\u09A6\u09BE \u09B8\u0982\u0996\u09CD\u09AF\u09BE \u09A6\u09BF\u09AF\u09BC\u09C7 \u0985\u09A8\u09C7\u0995\u09AC\u09BE\u09B0 \u0995\u09B0\u09BE\u0964"},question:"How do you test Python code with pytest? Explain fixtures and parametrize.",answer:"pytest discovers files named test_*.py and functions named test_*, and you use plain `assert` statements \u2014 pytest rewrites them to show detailed failure messages. Fixtures (`@pytest.fixture`) provide reusable setup such as test data, a DB session or a temp directory; a test receives one simply by naming it as a parameter, and code after `yield` in the fixture runs as teardown. `@pytest.mark.parametrize` runs the same test with multiple input/expected pairs, and `pytest.raises` checks that an exception is raised.",points:["Plain assert with rich introspection on failure","Fixtures are injected by parameter name; scope can be function, class, module, package or session","yield fixtures give setup + teardown; shared fixtures live in conftest.py","parametrize creates one test case per tuple","Built-in fixtures: tmp_path, monkeypatch, capsys; pytest.raises for exceptions"],code:`# test_cart.py  ->  run with: pytest -v
import pytest

def apply_discount(price, pct):
    if not 0 <= pct <= 100:
        raise ValueError("bad pct")
    return round(price * (100 - pct) / 100, 2)

@pytest.fixture
def cart():
    items = {"pen": 10.0, "book": 250.0}   # setup
    yield items
    items.clear()                           # teardown

def test_cart_total(cart):
    assert sum(cart.values()) == 260.0

@pytest.mark.parametrize("price, pct, expected",
                         [(100, 10, 90.0), (250, 0, 250.0), (200, 25, 150.0)])
def test_discount(price, pct, expected):
    assert apply_discount(price, pct) == expected

def test_bad_pct():
    with pytest.raises(ValueError):
        apply_discount(100, 150)`},{id:"pa-22",level:"mid",topic:"py-advanced",difficulty:"medium",simple:{hi:"Mocking cricket practice mein bowling machine jaisa hai. Asli fast bowler (asli payment ya API) ko har practice mein bulana mehenga aur risky hai, isliye machine se wahi ball phenkwate ho jo aapko chahiye. Bas machine wahan lagao jahan batsman khel raha hai, yaani patch wahan karo jahan function use ho raha hai.",en:"Mocking is like a bowling machine in cricket practice. Calling the real fast bowler (the real payment or API) for every practice is costly and risky, so the machine bowls exactly the ball you want. Just place the machine where the batsman is playing, meaning patch where the function is used.",bn:"Mocking \u09B9\u09B2\u09CB \u0995\u09CD\u09B0\u09BF\u0995\u09C7\u099F \u09AA\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u099F\u09BF\u09B8\u09C7\u09B0 bowling machine-\u098F\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09AA\u09CD\u09B0\u09CD\u09AF\u09BE\u0995\u099F\u09BF\u09B8\u09C7 \u0986\u09B8\u09B2 fast bowler (\u0986\u09B8\u09B2 payment \u09AC\u09BE API) \u09A1\u09BE\u0995\u09BE \u0996\u09B0\u099A\u09C7\u09B0 \u0986\u09B0 \u099D\u09C1\u0981\u0995\u09BF\u09B0, \u09A4\u09BE\u0987 machine \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A0\u09BF\u0995 \u09AF\u09C7 \u09AC\u09B2\u099F\u09BE \u099A\u09BE\u0993 \u09B8\u09C7\u099F\u09BE\u0987 \u0995\u09B0\u09BE\u09A8\u09CB \u09B9\u09AF\u09BC\u0964 \u09B6\u09C1\u09A7\u09C1 machine-\u099F\u09BE \u09B8\u09C7\u0996\u09BE\u09A8\u09C7 \u09AC\u09B8\u09BE\u0993 \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 batsman \u0996\u09C7\u09B2\u099B\u09C7, \u09AE\u09BE\u09A8\u09C7 patch \u0995\u09B0\u09CB \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 function \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u09B9\u099A\u09CD\u099B\u09C7\u0964"},question:"How do you mock dependencies in Python tests? Where should you patch?",answer:"Use `unittest.mock` (Mock, MagicMock, patch) or pytest's `monkeypatch` to replace slow or external dependencies \u2014 HTTP calls, databases, time \u2014 with fakes whose return values and side effects you control, then assert how they were called. The key rule is to patch where the name is looked up, not where it is defined: if `orders.py` does `from payments import charge`, patch `orders.charge`, not `payments.charge`. Use `autospec=True` so the mock matches the real signature, and do not over-mock \u2014 prefer testing real logic and mocking only the boundaries.",points:["patch() as decorator or context manager; restores the original afterwards","return_value for results, side_effect for exceptions or sequences","assert_called_once_with / call_args to verify interactions","Patch where it is used: 'module_under_test.name'","autospec / create_autospec catches wrong signatures; pytest-mock gives a mocker fixture"],code:`from unittest.mock import patch
import types, sys

# --- payments.py (external service) and orders.py (code under test) ---
payments = types.ModuleType("payments")
def charge(amount):
    raise RuntimeError("real network call!")
payments.charge = charge

orders = types.ModuleType("orders")
orders.charge = payments.charge            # like: from payments import charge
def place_order(amount):
    return "paid" if orders.charge(amount) else "failed"
orders.place_order = place_order
sys.modules.update(payments=payments, orders=orders)

# --- the test ---
with patch("orders.charge", return_value=True) as fake:   # patch where USED
    print(orders.place_order(500))        # paid
    fake.assert_called_once_with(500)
print("mock verified")`},{id:"pb-1",level:"fresher",topic:"py-basics",difficulty:"easy",simple:{hi:"Python ek aasaan bhasha jaisi hai jo Hindi ki tarah seedhi padhi ja sakti hai. Isme ek bada toolbox (standard library) pehle se milta hai, jaise kirane ki dukaan jahan sab kuch ek hi jagah mil jaata hai.",en:"Python is like a language that reads almost like plain English. It comes with a big ready-made toolbox (the standard library), like a kirana shop where you find everything in one place.",bn:"Python \u098F\u09AE\u09A8 \u098F\u0995\u099F\u09BE \u09AD\u09BE\u09B7\u09BE \u09AF\u09C7\u099F\u09BE \u09AA\u09CD\u09B0\u09BE\u09AF\u09BC \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3 \u0995\u09A5\u09BE\u09B0 \u09AE\u09A4\u09CB \u09AA\u09A1\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 \u098F\u09B0 \u09B8\u0999\u09CD\u0997\u09C7 \u098F\u0995\u099F\u09BE \u09AC\u09A1\u09BC \u09A4\u09C8\u09B0\u09BF toolbox (standard library) \u0986\u09B8\u09C7, \u09A0\u09BF\u0995 \u09AE\u09C1\u09A6\u09BF\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09B8\u09AC \u0995\u09BF\u099B\u09C1 \u098F\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09AF\u09BC \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What are the key features of Python?",answer:"Python is a high-level, general-purpose language with simple readable syntax that uses indentation for blocks. It is dynamically typed (types are checked at runtime, not declared), strongly typed (no silent '1' + 1), garbage-collected and multi-paradigm (procedural, object-oriented, functional). It ships with a large standard library ('batteries included') and a huge third-party ecosystem on PyPI, and the same code runs on Windows, Linux and macOS.",points:["Readable syntax; indentation defines blocks","Dynamically but strongly typed; optional type hints checked by tools like mypy","Automatic memory management (reference counting + cyclic garbage collector)","Multi-paradigm: procedural, OOP and functional styles","Batteries-included standard library plus PyPI packages via pip","Cross-platform; CPython is the reference implementation"],code:`x = 10          # no type declaration
x = "ten"       # same name, now a str (dynamic typing)
try:
    print("1" + 1)
except TypeError as e:  # strong typing: no silent conversion
    print("TypeError:", e)

# Output:
# TypeError: can only concatenate str (not "int") to str`},{id:"pb-2",level:"fresher",topic:"py-basics",difficulty:"easy",simple:{hi:"Data types alag-alag dabbon jaise hain: number ka dabba, text ka dabba, list ki thaili. Jaise school bag mein pencil box, tiffin aur bottle alag rakhte hain, waise hi har value ka apna type hota hai.",en:"Data types are like different containers: a box for numbers, a box for text, a bag for lists. Just like a school bag has a pencil box, a tiffin and a water bottle, every value has its own type.",bn:"Data types \u09B9\u09B2\u09CB \u0986\u09B2\u09BE\u09A6\u09BE \u0986\u09B2\u09BE\u09A6\u09BE \u09AA\u09BE\u09A4\u09CD\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB: \u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09B0 \u09AC\u09BE\u0995\u09CD\u09B8, \u09B2\u09C7\u0996\u09BE\u09B0 \u09AC\u09BE\u0995\u09CD\u09B8, list-\u098F\u09B0 \u09A5\u09B2\u09BF\u0964 \u09AF\u09C7\u09AE\u09A8 \u09B8\u09CD\u0995\u09C1\u09B2 \u09AC\u09CD\u09AF\u09BE\u0997\u09C7 pencil box, \u099F\u09BF\u09AB\u09BF\u09A8 \u0986\u09B0 \u099C\u09B2\u09C7\u09B0 \u09AC\u09CB\u09A4\u09B2 \u0986\u09B2\u09BE\u09A6\u09BE \u09A5\u09BE\u0995\u09C7, \u09A4\u09C7\u09AE\u09A8\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE value-\u09B0 \u09A8\u09BF\u099C\u09C7\u09B0 type \u09A5\u09BE\u0995\u09C7\u0964"},question:"What are the built-in data types in Python?",answer:"Python's main built-in types are: numeric (int, float, complex, plus bool which is a subclass of int), text (str), sequences (list, tuple, range), binary (bytes, bytearray, memoryview), sets (set, frozenset), mapping (dict) and the special NoneType whose only value is None. Every value is an object, and type() tells you its type at runtime.",points:["Numbers: int (arbitrary precision), float (64-bit double), complex; bool is a subclass of int","Text: str (immutable Unicode)","Sequences: list (mutable), tuple (immutable), range","Set types: set, frozenset; mapping: dict","Binary: bytes, bytearray, memoryview; None is the single NoneType value","type(x) / isinstance(x, T) inspect the type at runtime"],code:`values = [42, 3.14, 2+3j, True, "hi", [1], (1,), {1}, {"a": 1}, None, b"ab"]
for v in values:
    print(type(v).__name__, end=" ")
print()
print(isinstance(True, int), 2**100)

# Output:
# int float complex bool str list tuple set dict NoneType bytes 
# True 1267650600228229401496703205376`},{id:"pb-3",level:"fresher",topic:"py-basics",difficulty:"easy",simple:{hi:"Mutable cheez blackboard jaisi hai, likha hua mita ke badal sakte ho. Immutable cheez chhapi hui kitaab jaisi hai, badalna ho to nayi kitaab chhapni padti hai.",en:"A mutable object is like a blackboard: you can erase and change what is written. An immutable object is like a printed book: to change it you must print a new book.",bn:"Mutable \u099C\u09BF\u09A8\u09BF\u09B8 \u09B9\u09B2\u09CB blackboard-\u098F\u09B0 \u09AE\u09A4\u09CB, \u09B2\u09C7\u0996\u09BE \u09AE\u09C1\u099B\u09C7 \u09AC\u09A6\u09B2\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u0964 Immutable \u099C\u09BF\u09A8\u09BF\u09B8 \u09B9\u09B2\u09CB \u099B\u09BE\u09AA\u09BE\u09A8\u09CB \u09AC\u0987\u09AF\u09BC\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09B9\u09B2\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09AC\u0987 \u099B\u09BE\u09AA\u09BE\u09A4\u09C7 \u09B9\u09AF\u09BC\u0964"},question:"What is the difference between mutable and immutable objects in Python?",answer:"A mutable object can be changed in place after creation (list, dict, set, bytearray, most user classes), so every name pointing to it sees the change. An immutable object cannot be changed (int, float, str, tuple, frozenset, bytes); any 'modification' creates a new object. Immutable objects are hashable when their contents are, so they can be dict keys and set members.",points:["Mutable: list, dict, set, bytearray; immutable: int, float, bool, str, tuple, frozenset, bytes","Changing a mutable object keeps the same id(); 'changing' an immutable one creates a new object","Aliasing: two names to one list both see in-place changes","Only hashable (typically immutable) objects can be dict keys / set elements","A tuple is immutable but can hold mutable items, e.g. ([1], 2)"],code:`a = [1, 2]
b = a            # same list object
b.append(3)
print(a, id(a) == id(b))

s = "hi"
old = id(s)
s += "!"          # creates a new str
print(s, id(s) == old)

# Output:
# [1, 2, 3] True
# hi! False`},{id:"pb-4",level:"fresher",topic:"py-basics",difficulty:"easy",simple:{hi:"List ek shopping list jaisi hai, kuch bhi badha-ghata sakte ho. Tuple Aadhaar card jaisa hai, fix rehta hai. Set class ki attendance jaisa hai, ek naam ek hi baar. Dict phone contacts jaisa hai, naam se number milta hai.",en:"A list is like a shopping list you can add to or cut. A tuple is like an Aadhaar card, it stays fixed. A set is like class attendance, each name only once. A dict is like phone contacts, you find the number by the name.",bn:"List \u09B9\u09B2\u09CB \u09AC\u09BE\u099C\u09BE\u09B0\u09C7\u09B0 \u09AB\u09B0\u09CD\u09A6\u09C7\u09B0 \u09AE\u09A4\u09CB, \u09AF\u09CB\u0997-\u09AC\u09BE\u09A6 \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 Tuple \u09B9\u09B2\u09CB Aadhaar card-\u098F\u09B0 \u09AE\u09A4\u09CB, \u09AC\u09A6\u09B2\u09BE\u09AF\u09BC \u09A8\u09BE\u0964 Set \u09B9\u09B2\u09CB \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u09B9\u09BE\u099C\u09BF\u09B0\u09BE \u0996\u09BE\u09A4\u09BE\u09B0 \u09AE\u09A4\u09CB, \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u09A8\u09BE\u09AE \u098F\u0995\u09AC\u09BE\u09B0\u0987\u0964 Dict \u09B9\u09B2\u09CB \u09AB\u09CB\u09A8\u09C7\u09B0 contacts-\u098F\u09B0 \u09AE\u09A4\u09CB, \u09A8\u09BE\u09AE \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A8\u09AE\u09CD\u09AC\u09B0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What is the difference between list, tuple, set and dict?",answer:"A list is an ordered, mutable sequence that allows duplicates. A tuple is an ordered, immutable sequence, often used for fixed records and as dict keys. A set is an unordered, mutable collection of unique hashable items with fast membership tests. A dict maps unique hashable keys to values, keeps insertion order (guaranteed since Python 3.7) and gives average O(1) lookup by key.",points:["list [ ]: ordered, mutable, duplicates allowed, indexable","tuple ( ): ordered, immutable, hashable if its items are, slightly lighter than list","set { }: unique items, no index, O(1) average 'in' check; {} alone is an empty dict, use set()","dict {k: v}: key-value pairs, unique keys, insertion-ordered","Choose by need: order + change \u2192 list, fixed record \u2192 tuple, uniqueness \u2192 set, lookup by key \u2192 dict"],code:`nums = [3, 1, 3]
point = (10, 20)
unique = set(nums)
ages = {"ravi": 25, "anu": 22}

print(nums, point, unique, ages["anu"])
print(type({}).__name__, type(set()).__name__)
print({point: "home"})   # tuple works as a dict key

# Output:
# [3, 1, 3] (10, 20) {1, 3} 22
# dict set
# {(10, 20): 'home'}`},{id:"pb-5",level:"fresher",topic:"py-basics",difficulty:"easy",simple:{hi:"Do bachchon ke paas ek jaisi notebook ho to wo '==' hai, dikhti same hai. Par 'is' tab hai jab dono ek hi notebook share kar rahe hon.",en:"If two kids have identical notebooks, that is '==' \u2014 they look the same. 'is' is true only when both kids are sharing the very same notebook.",bn:"\u09A6\u09C1\u099F\u09CB \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0 \u0995\u09BE\u099B\u09C7 \u098F\u0995\u0987 \u09B0\u0995\u09AE \u0996\u09BE\u09A4\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 \u09B8\u09C7\u099F\u09BE '==' \u2014 \u09A6\u09C7\u0996\u09A4\u09C7 \u098F\u0995\u0964 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 'is' \u09A4\u0996\u09A8\u0987 \u09B8\u09A4\u09CD\u09AF\u09BF \u09AF\u0996\u09A8 \u09A6\u09C1\u099C\u09A8\u09C7 \u098F\u0995\u099F\u09BE\u0987 \u0996\u09BE\u09A4\u09BE \u09AD\u09BE\u0997 \u0995\u09B0\u09C7 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u099B\u09C7\u0964"},question:"What is the difference between 'is' and '==' in Python?",answer:"== compares values (it calls __eq__), while 'is' checks identity, i.e. whether both names refer to the very same object in memory (same id()). Two separate lists with equal contents are == but not 'is'. Use 'is' only for singletons like None (x is None) and use == for comparing values; never rely on 'is' for numbers or strings because small-int caching and string interning are implementation details.",points:["== \u2192 equality of value (__eq__)","is \u2192 identity: same object, same id()","Use 'x is None' / 'is not None' for None checks (PEP 8)","CPython caches small ints (-5..256) and interns some strings, so 'is' may look like it works \u2014 don't rely on it","Recent Python versions emit a SyntaxWarning for 'is' with a literal"],code:`a = [1, 2]
b = [1, 2]
c = a
print(a == b, a is b)
print(a is c)
x = None
print(x is None)

# Output:
# True False
# True
# True`},{id:"pb-6",level:"junior",topic:"py-basics",difficulty:"easy",simple:{hi:"None ek khaali tiffin box ka label hai jo kehta hai 'aaj kuch nahi hai'. Truthiness aisa hai jaise maa poochhe 'dabbe mein kuch hai?' \u2014 khaali dabba matlab False, kuch bhi ho to True.",en:"None is a label on an empty tiffin box saying 'nothing today'. Truthiness is like mom asking 'is there anything in the box?' \u2014 an empty box means False, anything inside means True.",bn:"None \u09B9\u09B2\u09CB \u0996\u09BE\u09B2\u09BF \u099F\u09BF\u09AB\u09BF\u09A8 \u09AC\u09BE\u0995\u09CD\u09B8\u09C7\u09B0 \u0997\u09BE\u09AF\u09BC\u09C7 \u09B2\u09BE\u0997\u09BE\u09A8\u09CB \u09B2\u09C7\u09AC\u09C7\u09B2 \u2014 '\u0986\u099C \u0995\u09BF\u099B\u09C1 \u09A8\u09C7\u0987'\u0964 Truthiness \u09B9\u09B2\u09CB \u09AE\u09BE \u09AF\u0996\u09A8 \u099C\u09BF\u099C\u09CD\u099E\u09C7\u09B8 \u0995\u09B0\u09C7 '\u09AC\u09BE\u0995\u09CD\u09B8\u09C7 \u0995\u09BF\u099B\u09C1 \u0986\u099B\u09C7?' \u2014 \u0996\u09BE\u09B2\u09BF \u09AC\u09BE\u0995\u09CD\u09B8 \u09AE\u09BE\u09A8\u09C7 False, \u0995\u09BF\u099B\u09C1 \u09A5\u09BE\u0995\u09B2\u09C7\u0987 True\u0964"},question:"What is None in Python, and how does truthiness work?",answer:"None is the single object of type NoneType that represents 'no value'; functions without a return statement return None. Every object has a truth value: False, None, zero of any numeric type (0, 0.0, 0j), and empty collections ('', [], (), {}, set(), range(0)) are falsy, and almost everything else is truthy. Classes can customise this with __bool__ or __len__.",points:["None is a singleton \u2192 compare with 'is None', not '== None'","Falsy: None, False, 0, 0.0, 0j, '', [], (), {}, set(), range(0)","'if items:' is the idiomatic empty check","Pitfall: 'if not x' also treats 0 or '' as missing \u2014 use 'if x is None' when 0 is valid","and / or return one of the operands, not a bool: '' or 'guest' \u2192 'guest'"],code:`def greet():
    pass

print(greet())
for v in [0, "", [], {}, None, "0", [0], -1]:
    print(repr(v), bool(v))
print("" or "guest")

# Output:
# None
# 0 False
# '' False
# [] False
# {} False
# None False
# '0' True
# [0] True
# -1 True
# guest`},{id:"pb-7",level:"junior",topic:"py-basics",difficulty:"easy",simple:{hi:"Comprehension ek line mein order dene jaisa hai: 'saare even number ka square chahiye'. Jaise chaiwale ko ek baar mein bolo 'sabke liye chai, bina cheeni wali sirf Ravi ke liye'.",en:"A comprehension is like giving the whole order in one line: 'squares of all even numbers'. Like telling the chaiwala at once: 'tea for everyone, sugar-free only for Ravi'.",bn:"Comprehension \u09B9\u09B2\u09CB \u098F\u0995 \u09B2\u09BE\u0987\u09A8\u09C7 \u09AA\u09C1\u09B0\u09CB \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09AE\u09A4\u09CB: '\u09B8\u09AC \u099C\u09CB\u09A1\u09BC \u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09B0 square \u099A\u09BE\u0987'\u0964 \u09AF\u09C7\u09AE\u09A8 \u099A\u09BE-\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u0995\u09C7 \u098F\u0995\u09AC\u09BE\u09B0\u09C7\u0987 \u09AC\u09B2\u09BE: '\u09B8\u09AC\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u099A\u09BE, \u099A\u09BF\u09A8\u09BF \u099B\u09BE\u09A1\u09BC\u09BE \u09B6\u09C1\u09A7\u09C1 \u09B0\u09AC\u09BF\u09B0 \u099C\u09A8\u09CD\u09AF'\u0964"},question:"What are list, dict and set comprehensions?",answer:"A comprehension builds a new list, dict or set from an iterable in one readable expression: [expr for x in it if cond], {k: v for ...} and {expr for ...}. They are usually faster and clearer than an equivalent for-loop with append. Using round brackets gives a generator expression (lazy), not a 'tuple comprehension'.",points:["List: [x*x for x in nums if x % 2 == 0]","Dict: {name: len(name) for name in names}","Set: {w.lower() for w in words} removes duplicates","if at the end filters; 'a if c else b' before 'for' transforms","Nested loops read left to right: [(i, j) for i in a for j in b]","Keep them short; use a normal loop when logic gets complex"],code:`nums = [1, 2, 3, 4, 5, 6]
squares = [n * n for n in nums if n % 2 == 0]
labels = ["even" if n % 2 == 0 else "odd" for n in nums[:3]]
lengths = {w: len(w) for w in ["chai", "samosa"]}
letters = {c for c in "banana"}
print(squares, labels)
print(lengths, sorted(letters))

# Output:
# [4, 16, 36] ['odd', 'even', 'odd']
# {'chai': 4, 'samosa': 6} ['a', 'b', 'n']`},{id:"pb-8",level:"junior",topic:"py-basics",difficulty:"medium",simple:{hi:"*args ek thaali jaisa hai jisme jitni chahe rotiyan rakh do. **kwargs ek order slip jaisa hai jisme naam ke saath note likhte ho, jaise 'spicy: haan', 'table: 7'.",en:"*args is like a plate where you can put as many rotis as you like. **kwargs is like an order slip where each note has a name, like 'spicy: yes', 'table: 7'.",bn:"*args \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09A5\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09AF\u09A4 \u0996\u09C1\u09B6\u09BF \u09B0\u09C1\u099F\u09BF \u09B0\u09BE\u0996\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 **kwargs \u09B9\u09B2\u09CB \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09B8\u09CD\u09B2\u09BF\u09AA\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09A8\u09CB\u099F\u09C7\u09B0 \u098F\u0995\u099F\u09BE \u09A8\u09BE\u09AE \u09A5\u09BE\u0995\u09C7, \u09AF\u09C7\u09AE\u09A8 'spicy: \u09B9\u09CD\u09AF\u09BE\u0981', 'table: 7'\u0964"},question:"What are *args and **kwargs?",answer:"*args collects extra positional arguments into a tuple and **kwargs collects extra keyword arguments into a dict, so a function can accept a variable number of arguments. The names are just convention; the * and ** do the work. The same operators unpack at the call site: f(*my_list, **my_dict). Parameter order is: positional, *args, keyword-only, **kwargs.",points:["*args \u2192 tuple of extra positional args","**kwargs \u2192 dict of extra keyword args","Order: def f(a, b=2, *args, c, **kwargs)  \u2014 c here is keyword-only","Unpacking at call time: f(*[1, 2], **{'c': 3})","Common for wrappers/forwarding calls and flexible APIs; also used to merge: {**d1, **d2}"],code:`def order(item, *extras, qty=1, **notes):
    print(item, extras, qty, notes)

order("dosa")
order("dosa", "chutney", "sambar", qty=2, spicy=True)

args = ["idli", "podi"]
opts = {"qty": 3, "table": 7}
order(*args, **opts)

# Output:
# dosa () 1 {}
# dosa ('chutney', 'sambar') 2 {'spicy': True}
# idli ('podi',) 3 {'table': 7}`},{id:"pb-9",level:"mid",topic:"py-basics",difficulty:"medium",simple:{hi:"Mutable default ek class ka common dustbin jaisa hai jo kabhi khaali nahi hota \u2014 har bachcha apna kachra daalta hai aur agle ko pichhla kachra bhi milta hai. Har baar naya dabba chahiye to None rakho aur andar naya dabba banao.",en:"A mutable default is like one shared class dustbin that is never emptied \u2014 each kid adds rubbish and the next kid finds the old rubbish too. To get a fresh bin each time, default to None and create a new one inside.",bn:"Mutable default \u09B9\u09B2\u09CB \u0995\u09CD\u09B2\u09BE\u09B8\u09C7\u09B0 \u098F\u0995\u099F\u09BE\u0987 \u09AD\u09BE\u0997\u09C7\u09B0 \u09A1\u09BE\u09B8\u09CD\u099F\u09AC\u09BF\u09A8\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7\u099F\u09BE \u0995\u0996\u09A8\u09CB \u0996\u09BE\u09B2\u09BF \u09B9\u09AF\u09BC \u09A8\u09BE \u2014 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995\u09C7 \u09AE\u09AF\u09BC\u09B2\u09BE \u09AB\u09C7\u09B2\u09C7 \u0986\u09B0 \u09AA\u09B0\u09C7\u09B0 \u099C\u09A8 \u0986\u0997\u09C7\u09B0 \u09AE\u09AF\u09BC\u09B2\u09BE\u0993 \u09AA\u09BE\u09AF\u09BC\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09BE\u09B0 \u09A8\u09A4\u09C1\u09A8 \u09AC\u09BE\u0995\u09CD\u09B8 \u099A\u09BE\u0987\u09B2\u09C7 None \u09B0\u09BE\u0996\u09CB \u0986\u09B0 \u09AD\u09BF\u09A4\u09B0\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09AC\u09BE\u09A8\u09BE\u0993\u0964"},question:"What is the mutable default argument pitfall? What does this code print?",answer:"Default argument values are evaluated once, when the def statement runs, not on each call. So a mutable default like [] or {} is a single shared object that keeps changes between calls: the code prints [1], then [1, 2], then [1, 2, 3]. The fix is to use None as the default and create a new object inside the function.",points:["Defaults are evaluated once at function definition time","They are stored on the function (f.__defaults__) and shared by all calls","Fix: def f(x, items=None): if items is None: items = []","Same problem with {} or set() defaults; immutable defaults (0, '', None, tuples) are safe","Linters (e.g. Ruff/flake8-bugbear B006) flag this"],code:`def add(x, items=[]):
    items.append(x)
    return items

print(add(1))
print(add(2))
print(add(3, []))
print(add(4))

def add_safe(x, items=None):
    if items is None:
        items = []
    items.append(x)
    return items

print(add_safe(1), add_safe(2))

# Output:
# [1]
# [1, 2]
# [3]
# [1, 2, 4]
# [1] [2]`},{id:"pb-10",level:"mid",topic:"py-basics",difficulty:"medium",simple:{hi:"LEGB ek cheez dhoondhne jaisa hai: pehle apne kamre mein (Local), phir ghar ke baaki kamron mein (Enclosing), phir mohalle mein (Global), aur aakhir mein sarkari dukaan pe (Built-in). global aur nonlocal batate hain ki 'mohalle wali / ghar wali cheez hi badalni hai'.",en:"LEGB is like searching for something: first in your own room (Local), then other rooms of the house (Enclosing), then the neighbourhood (Global), and finally the government store (Built-in). global and nonlocal say 'change the neighbourhood's / house's copy, not a new one'.",bn:"LEGB \u09B9\u09B2\u09CB \u0995\u09BF\u099B\u09C1 \u0996\u09CB\u0981\u099C\u09BE\u09B0 \u09AE\u09A4\u09CB: \u0986\u0997\u09C7 \u09A8\u09BF\u099C\u09C7\u09B0 \u0998\u09B0\u09C7 (Local), \u09A4\u09BE\u09B0\u09AA\u09B0 \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u0985\u09A8\u09CD\u09AF \u0998\u09B0\u09C7 (Enclosing), \u09A4\u09BE\u09B0\u09AA\u09B0 \u09AA\u09BE\u09A1\u09BC\u09BE\u09AF\u09BC (Global), \u09B6\u09C7\u09B7\u09C7 \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09A6\u09CB\u0995\u09BE\u09A8\u09C7 (Built-in)\u0964 global \u0986\u09B0 nonlocal \u09AC\u09B2\u09C7 '\u09AA\u09BE\u09A1\u09BC\u09BE\u09B0 / \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u099C\u09BF\u09A8\u09BF\u09B8\u099F\u09BE\u0987 \u09AC\u09A6\u09B2\u09BE\u0993, \u09A8\u09A4\u09C1\u09A8 \u09AC\u09BE\u09A8\u09BF\u0993 \u09A8\u09BE'\u0964"},question:"Explain the LEGB rule. What do global and nonlocal do?",answer:"Python resolves a name by searching scopes in LEGB order: Local (current function), Enclosing (outer functions), Global (module) and Built-in. Assigning to a name inside a function makes it local for the whole function, so reading it before assignment raises UnboundLocalError. 'global x' lets a function rebind a module-level name, and 'nonlocal x' lets a nested function rebind a name in the nearest enclosing function scope.",points:["L \u2192 E \u2192 G \u2192 B lookup order","Any assignment in a function makes that name local for the entire function body","global rebinds module-level names; nonlocal rebinds enclosing-function names","Mutating (list.append) needs no keyword; only rebinding (x = ...) does","Avoid heavy use of global state; prefer return values or classes"],code:`count = 0

def bump():
    global count
    count += 1

def counter():
    n = 0
    def inc():
        nonlocal n
        n += 1
        return n
    return inc

bump(); bump()
c = counter()
c(); print(count, c())
print(len("abc"))  # len found in Built-in scope

# Output:
# 2 2
# 3`},{id:"pb-11",level:"mid",topic:"py-basics",difficulty:"medium",simple:{hi:"Shallow copy aisa hai jaise naya school bag liya par andar wahi purani notebooks daal di \u2014 notebook mein likha to dono bag mein dikhega. Deep copy mein notebooks ki bhi photocopy hoti hai, sab alag.",en:"A shallow copy is like buying a new school bag but putting the same old notebooks inside \u2014 write in a notebook and it shows in both bags. A deep copy photocopies the notebooks too, so everything is separate.",bn:"Shallow copy \u09B9\u09B2\u09CB \u09A8\u09A4\u09C1\u09A8 \u09B8\u09CD\u0995\u09C1\u09B2 \u09AC\u09CD\u09AF\u09BE\u0997 \u0995\u09BF\u09A8\u09C7 \u09AD\u09BF\u09A4\u09B0\u09C7 \u09B8\u09C7\u0987 \u09AA\u09C1\u09B0\u09A8\u09CB \u0996\u09BE\u09A4\u09BE\u0997\u09C1\u09B2\u09CB\u0987 \u09B0\u09BE\u0996\u09BE \u2014 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09BF\u0996\u09B2\u09C7 \u09A6\u09C1\u0987 \u09AC\u09CD\u09AF\u09BE\u0997\u09C7\u0987 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7\u0964 Deep copy-\u09A4\u09C7 \u0996\u09BE\u09A4\u09BE\u0997\u09C1\u09B2\u09CB\u09B0\u0993 \u09AB\u099F\u09CB\u0995\u09AA\u09BF \u09B9\u09AF\u09BC, \u09B8\u09AC \u0986\u09B2\u09BE\u09A6\u09BE\u0964"},question:"What is the difference between a shallow copy and a deep copy?",answer:"Assignment (b = a) copies nothing, it just adds another name. A shallow copy (copy.copy, list(a), a[:], dict.copy()) creates a new outer container but the inner objects are still shared, so changing a nested list shows up in both. A deep copy (copy.deepcopy) recursively copies all nested objects, so the copy is fully independent; it is slower and handles cycles using a memo dict.",points:["b = a \u2192 same object, no copy","Shallow: new container, same inner references (a[:], list(a), a.copy(), copy.copy)","Deep: copy.deepcopy recursively copies nested mutable objects","Shallow is enough for flat lists of immutables","Classes can customise via __copy__ / __deepcopy__"],code:`import copy

a = [[1, 2], [3, 4]]
shallow = copy.copy(a)
deep = copy.deepcopy(a)

a[0].append(99)
print(shallow)
print(deep)
print(shallow is a, shallow[0] is a[0])

# Output:
# [[1, 2, 99], [3, 4]]
# [[1, 2], [3, 4]]
# False True`},{id:"pb-12",level:"junior",topic:"py-basics",difficulty:"easy",simple:{hi:"String ek chhapi hui shaadi ka card jaisa hai \u2014 galti ho to card pe kaat nahi sakte, naya card chhapwana padta hai. f-string ek khaali form jaisa hai jisme naam aur amount bhar dete ho.",en:"A string is like a printed wedding card \u2014 if there is a mistake you cannot edit it, you print a new card. An f-string is like a form with blanks where you fill in the name and amount.",bn:"String \u09B9\u09B2\u09CB \u099B\u09BE\u09AA\u09BE\u09A8\u09CB \u09AC\u09BF\u09AF\u09BC\u09C7\u09B0 \u0995\u09BE\u09B0\u09CD\u09A1\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09AD\u09C1\u09B2 \u09A5\u09BE\u0995\u09B2\u09C7 \u0995\u09BE\u09B0\u09CD\u09A1\u09C7 \u0995\u09BE\u099F\u09BE\u0995\u09BE\u099F\u09BF \u0995\u09B0\u09BE \u09AF\u09BE\u09AF\u09BC \u09A8\u09BE, \u09A8\u09A4\u09C1\u09A8 \u0995\u09BE\u09B0\u09CD\u09A1 \u099B\u09BE\u09AA\u09BE\u09A4\u09C7 \u09B9\u09AF\u09BC\u0964 f-string \u09B9\u09B2\u09CB \u09AB\u09BE\u0981\u0995\u09BE \u0998\u09B0\u0993\u09AF\u09BC\u09BE\u09B2\u09BE \u09AB\u09B0\u09CD\u09AE\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09A8\u09BE\u09AE \u0986\u09B0 \u099F\u09BE\u0995\u09BE\u09B0 \u0985\u0999\u09CD\u0995 \u09AC\u09B8\u09BF\u09AF\u09BC\u09C7 \u09A6\u09BE\u0993\u0964"},question:"Strings in Python: are they mutable? Explain common string methods and f-strings.",answer:`Strings (str) are immutable sequences of Unicode characters, so methods like upper(), replace() and strip() return new strings instead of changing the original, and s[0] = 'x' raises TypeError. Common methods are split/join, strip, replace, find/index, startswith/endswith, upper/lower and isdigit. f-strings (f"...{expr}...") embed expressions with format specs like {price:.2f} or {n:,} and the debug form {x=}.`,points:["str is immutable: item assignment raises TypeError; methods return new strings","Join many pieces with ''.join(parts) instead of += in a loop","split()/join(), strip(), replace(), find() (-1) vs index() (ValueError)","f-strings: f'{value:.2f}', f'{n:,}', f'{name!r}', f'{x=}'","Since Python 3.12 f-strings can reuse the same quote type inside {}"],code:`s = "  Namaste Python  "
t = s.strip().upper()
print(repr(s), t)
print("-".join("a b c".split()))
price, n = 49.5, 1250000
print(f"Rs {price:.2f} | {n:,} | {price=}")
try:
    t[0] = "n"
except TypeError as e:
    print(e)

# Output:
# '  Namaste Python  ' NAMASTE PYTHON
# a-b-c
# Rs 49.50 | 1,250,000 | price=49.5
# 'str' object does not support item assignment`},{id:"pb-13",level:"junior",topic:"py-basics",difficulty:"easy",simple:{hi:"Slicing ek lambi train mein se kuch dibbe alag karne jaisa hai: 'dibba 2 se 5 tak chahiye'. Ulta step matlab train ko peeche se gin rahe ho.",en:"Slicing is like taking some coaches out of a long train: 'I want coaches 2 to 5'. A negative step means you count the train from the back.",bn:"Slicing \u09B9\u09B2\u09CB \u09B2\u09AE\u09CD\u09AC\u09BE \u099F\u09CD\u09B0\u09C7\u09A8 \u09A5\u09C7\u0995\u09C7 \u0995\u09AF\u09BC\u09C7\u0995\u099F\u09BE \u09AC\u0997\u09BF \u0986\u09B2\u09BE\u09A6\u09BE \u0995\u09B0\u09BE\u09B0 \u09AE\u09A4\u09CB: '\u09E8 \u09A5\u09C7\u0995\u09C7 \u09EB \u09A8\u09AE\u09CD\u09AC\u09B0 \u09AC\u0997\u09BF \u099A\u09BE\u0987'\u0964 \u0989\u09B2\u09CD\u099F\u09CB step \u09AE\u09BE\u09A8\u09C7 \u099F\u09CD\u09B0\u09C7\u09A8\u099F\u09BE \u09AA\u09BF\u099B\u09A8 \u09A5\u09C7\u0995\u09C7 \u0997\u09CB\u09A8\u09BE\u0964"},question:"How does slicing work in Python?",answer:"Slicing uses seq[start:stop:step] and returns a new object of the same type; start is included, stop is excluded, and any part can be omitted. Negative indices count from the end and a negative step walks backwards, so s[::-1] reverses a sequence. Out-of-range slice bounds never raise IndexError, they are simply clipped.",points:["start inclusive, stop exclusive; defaults are the ends of the sequence","Negative index: -1 is the last item","step: s[::2] every 2nd item, s[::-1] reversed copy","Slices never raise IndexError (single indexing does)","For lists, a[:] is a shallow copy and slice assignment a[1:3] = [...] replaces a range"],code:`s = "PYTHON"
print(s[0:2], s[2:], s[-3:], s[::2], s[::-1])
print(s[1:100], repr(s[10:]))

nums = [0, 1, 2, 3, 4, 5]
nums[1:3] = ["a", "b", "c"]
print(nums)

# Output:
# PY THON HON PTO NOHTYP
# YTHON ''
# [0, 'a', 'b', 'c', 3, 4, 5]`},{id:"pb-14",level:"junior",topic:"py-basics",difficulty:"medium",simple:{hi:"map ek machine jaisi hai jo har aam ka juice bana deti hai, filter ek chhalni hai jo sirf achhe aam rakhti hai, aur reduce sab juice ek bade jug mein mila deta hai. lambda ek chhota sa one-line kaam hai jiska naam bhi nahi.",en:"map is like a machine that turns every mango into juice, filter is a sieve that keeps only the good mangoes, and reduce pours all the juice into one big jug. A lambda is a tiny one-line job without even a name.",bn:"map \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u09AE\u09C7\u09B6\u09BF\u09A8 \u09AF\u09C7\u099F\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u0986\u09AE \u09A5\u09C7\u0995\u09C7 \u09B0\u09B8 \u09AC\u09BE\u09A8\u09BE\u09AF\u09BC, filter \u09B9\u09B2\u09CB \u099B\u09BE\u0981\u0995\u09A8\u09BF \u09AF\u09C7\u099F\u09BE \u09B6\u09C1\u09A7\u09C1 \u09AD\u09BE\u09B2\u09CB \u0986\u09AE\u0997\u09C1\u09B2\u09CB \u09B0\u09BE\u0996\u09C7, \u0986\u09B0 reduce \u09B8\u09AC \u09B0\u09B8 \u098F\u0995\u099F\u09BE \u09AC\u09A1\u09BC \u099C\u0997\u09C7 \u09AE\u09C7\u09B6\u09BE\u09AF\u09BC\u0964 lambda \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u099B\u09CB\u099F\u09CD\u099F \u098F\u0995-\u09B2\u09BE\u0987\u09A8\u09C7\u09B0 \u0995\u09BE\u099C, \u09AF\u09BE\u09B0 \u09A8\u09BE\u09AE\u0993 \u09A8\u09C7\u0987\u0964"},question:"Explain lambda, map, filter and reduce with examples.",answer:"A lambda is a small anonymous function limited to a single expression, mostly passed as a short callback. map(fn, it) applies fn to every item and filter(fn, it) keeps items where fn is truthy; both return lazy iterators in Python 3, so wrap them in list() to see the values. functools.reduce(fn, it, initial) folds an iterable into one value. In idiomatic Python, comprehensions and built-ins like sum, max or any are often preferred over map/filter/reduce.",points:["lambda args: expression \u2014 no statements, no annotations","map/filter return iterators (lazy, single-pass)","reduce lives in functools; give an initial value for empty input","Prefer [f(x) for x in it] / sum() for readability","Common good use: key=lambda x: ... in sorted/max/min"],code:`from functools import reduce

nums = [1, 2, 3, 4, 5]
square = lambda x: x * x
print(list(map(square, nums)))
print(list(filter(lambda x: x % 2, nums)))
print(reduce(lambda acc, x: acc + x, nums, 0))
m = map(str, nums)
print(m.__class__.__name__, list(m), list(m))

# Output:
# [1, 4, 9, 16, 25]
# [1, 3, 5]
# 15
# map ['1', '2', '3', '4', '5'] []`},{id:"pb-15",level:"junior",topic:"py-basics",difficulty:"medium",simple:{hi:"try ek cricket shot khelne jaisa hai, except fielder hai jo galat shot pe ball pakad leta hai, else tab hai jab shot sahi gaya aur run mile, aur finally over ke baad pitch saaf karna hai \u2014 chahe kuch bhi hua ho.",en:"try is like playing a cricket shot, except is the fielder who catches a bad shot, else is when the shot works and you get runs, and finally is cleaning the pitch after the over \u2014 whatever happened.",bn:"try \u09B9\u09B2\u09CB \u0995\u09CD\u09B0\u09BF\u0995\u09C7\u099F\u09C7 \u098F\u0995\u099F\u09BE \u09B6\u099F \u0996\u09C7\u09B2\u09BE, except \u09B9\u09B2\u09CB fielder \u09AF\u09C7 \u0996\u09BE\u09B0\u09BE\u09AA \u09B6\u099F\u09C7 \u09AC\u09B2 \u09A7\u09B0\u09C7 \u09AB\u09C7\u09B2\u09C7, else \u09B9\u09B2\u09CB \u09AF\u0996\u09A8 \u09B6\u099F \u09A0\u09BF\u0995\u09A0\u09BE\u0995 \u0997\u09C7\u09B2 \u0986\u09B0 \u09B0\u09BE\u09A8 \u09B9\u09B2\u09CB, \u0986\u09B0 finally \u09B9\u09B2\u09CB \u0993\u09AD\u09BE\u09B0\u09C7\u09B0 \u09AA\u09B0\u09C7 \u09AA\u09BF\u099A \u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0 \u0995\u09B0\u09BE \u2014 \u09AF\u09BE-\u0987 \u0998\u099F\u09C1\u0995\u0964"},question:"How does exception handling work with try, except, else and finally?",answer:"Code that may fail goes in try; matching except blocks handle specific exceptions. The else block runs only if try raised no exception, which keeps the 'success' code out of the try. finally always runs \u2014 on success, on error, and even on return \u2014 so it is used for cleanup. Catch specific exceptions, not a bare except, and use raise to re-raise or signal errors.",points:["try \u2192 except (specific types first) \u2192 else (no error) \u2192 finally (always)","Catch narrow exceptions: except (ValueError, KeyError) as e","Avoid bare 'except:' \u2014 it also catches KeyboardInterrupt/SystemExit","finally runs even when try/except returns","'raise' alone re-raises the current exception; prefer 'with' for resource cleanup"],code:`def parse(text):
    try:
        n = int(text)
    except ValueError as e:
        print("bad input:", e)
        return None
    else:
        print("parsed", n)
        return n
    finally:
        print("done")

parse("42")
parse("abc")

# Output:
# parsed 42
# done
# bad input: invalid literal for int() with base 10: 'abc'
# done`},{id:"pb-16",level:"senior",topic:"py-basics",difficulty:"hard",simple:{hi:"Custom exception apni dukaan ka khaas complaint register jaisa hai \u2014 'paise kam hain' alag page pe likhte ho. 'raise from' aisa hai jaise manager ko complaint dete waqt neeche likh do ki asli wajah kya thi.",en:"A custom exception is like your shop's own complaint register \u2014 'not enough money' gets its own page. 'raise from' is like passing the complaint to the manager with a note saying what the real reason was.",bn:"Custom exception \u09B9\u09B2\u09CB \u09A8\u09BF\u099C\u09C7\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u0986\u09B2\u09BE\u09A6\u09BE \u0985\u09AD\u09BF\u09AF\u09CB\u0997\u09C7\u09B0 \u0996\u09BE\u09A4\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 '\u099F\u09BE\u0995\u09BE \u0995\u09AE' \u0986\u09B2\u09BE\u09A6\u09BE \u09AA\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09C7\u0996\u09BE \u09B9\u09AF\u09BC\u0964 'raise from' \u09B9\u09B2\u09CB manager-\u0995\u09C7 \u0985\u09AD\u09BF\u09AF\u09CB\u0997 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC \u09A8\u09BF\u099A\u09C7 \u0986\u09B8\u09B2 \u0995\u09BE\u09B0\u09A3\u099F\u09BE \u09B2\u09BF\u0996\u09C7 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u0964"},question:"How do you create custom exceptions, and what is exception chaining ('raise ... from ...')?",answer:"Define custom exceptions by subclassing Exception (not BaseException), usually with one base class per library or app so callers can catch all of its errors at once, plus specific subclasses that may carry extra attributes. When you translate a low-level error into a domain error, use 'raise NewError(...) from err' so the original is stored in __cause__ and shown in the traceback; 'from None' hides the context when it is noise. Python 3.11+ also adds ExceptionGroup/except* and add_note() for richer error reporting.",points:["Subclass Exception; create an app-level base like AppError and specific children","Add useful fields (e.g. order_id) and a clear message via super().__init__","raise X from e sets __cause__; implicit chaining sets __context__","raise X from None suppresses the chained context","Don't swallow exceptions silently; log or re-raise","ExceptionGroup + except* handle multiple errors (e.g. from TaskGroup)"],code:`class PaymentError(Exception):
    """Base error for the payment module."""

class InsufficientFunds(PaymentError):
    def __init__(self, needed):
        super().__init__(f"need Rs {needed} more")
        self.needed = needed

def pay(balance, amount):
    try:
        if amount > balance:
            raise InsufficientFunds(amount - balance)
        return balance - amount
    except InsufficientFunds as e:
        raise PaymentError("payment failed") from e

try:
    pay(100, 250)
except PaymentError as err:
    print(err, "| cause:", err.__cause__, err.__cause__.needed)

# Output:
# payment failed | cause: need Rs 150 more 150`},{id:"pb-17",level:"junior",topic:"py-basics",difficulty:"easy",simple:{hi:`Module ek recipe card jaisa hai aur package recipe ki poori kitaab. if __name__ == "__main__" aisa hai jaise maa kehti hai 'ye dish tab hi banana jab main khud bolun, koi aur recipe padhe to mat banana'.`,en:`A module is like one recipe card and a package is the whole recipe book. if __name__ == "__main__" is like mom saying 'cook this dish only when I ask directly, not when someone just reads the recipe'.`,bn:`Module \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09B0\u09C7\u09B8\u09BF\u09AA\u09BF \u0995\u09BE\u09B0\u09CD\u09A1 \u0986\u09B0 package \u09B9\u09B2\u09CB \u09AA\u09C1\u09B0\u09CB \u09B0\u09C7\u09B8\u09BF\u09AA\u09BF\u09B0 \u09AC\u0987\u0964 if __name__ == "__main__" \u09B9\u09B2\u09CB \u09AE\u09BE\u09AF\u09BC\u09C7\u09B0 \u0995\u09A5\u09BE\u09B0 \u09AE\u09A4\u09CB: '\u0986\u09AE\u09BF \u09A8\u09BF\u099C\u09C7 \u09AC\u09B2\u09B2\u09C7 \u09A4\u09AC\u09C7\u0987 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE \u0995\u09B0\u09AC\u09C7, \u0995\u09C7\u0989 \u09B6\u09C1\u09A7\u09C1 \u09B0\u09C7\u09B8\u09BF\u09AA\u09BF \u09AA\u09A1\u09BC\u09B2\u09C7 \u09A8\u09AF\u09BC'\u0964`},question:'What are modules and packages? What does if __name__ == "__main__" do?',answer:`A module is a single .py file whose functions, classes and variables can be imported. A package is a directory of modules, normally with an __init__.py, imported with dotted names like app.utils.dates. Every module has a __name__ variable: it is "__main__" when the file is run directly and the module's name when it is imported. So code under if __name__ == "__main__": runs only as a script, not on import \u2014 useful for CLIs, demos and quick tests.`,points:["Module = one .py file; package = folder of modules (usually with __init__.py)","import math / from math import sqrt / import numpy as np","A module's top-level code runs once, on first import (cached in sys.modules)","__name__ is '__main__' when run directly, else the module name","python -m package.module runs a module as a script; avoid 'from x import *'"],code:`# file: billing.py
def total(prices):
    return sum(prices)

print("__name__ is", __name__)

if __name__ == "__main__":
    # runs only for: python billing.py
    print(total([10, 20, 30]))

# python billing.py   \u2192  __name__ is __main__
#                        60
# import billing      \u2192  __name__ is billing`},{id:"pb-18",level:"mid",topic:"py-basics",difficulty:"medium",simple:{hi:"Virtual environment har project ka alag tiffin box jaisa hai \u2014 bhai ke dabbe mein paneer, tumhare mein aloo, mix nahi hota. pip wo dukaandaar hai jo dabbe mein sahi saamaan bharta hai, aur requirements.txt shopping list hai.",en:"A virtual environment is like a separate tiffin box for each project \u2014 your brother's has paneer, yours has aloo, and they never mix. pip is the shopkeeper who fills the box, and requirements.txt is the shopping list.",bn:"Virtual environment \u09B9\u09B2\u09CB \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE project-\u098F\u09B0 \u0986\u09B2\u09BE\u09A6\u09BE \u099F\u09BF\u09AB\u09BF\u09A8 \u09AC\u09BE\u0995\u09CD\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09AD\u09BE\u0987\u09AF\u09BC\u09C7\u09B0 \u09AC\u09BE\u0995\u09CD\u09B8\u09C7 \u09AA\u09A8\u09BF\u09B0, \u09A4\u09CB\u09AE\u09BE\u09B0\u099F\u09BE\u09AF\u09BC \u0986\u09B2\u09C1, \u09AE\u09BF\u09B6\u09C7 \u09AF\u09BE\u09AF\u09BC \u09A8\u09BE\u0964 pip \u09B9\u09B2\u09CB \u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0 \u09AF\u09C7 \u09AC\u09BE\u0995\u09CD\u09B8\u09C7 \u09A0\u09BF\u0995 \u099C\u09BF\u09A8\u09BF\u09B8 \u09AD\u09B0\u09C7, \u0986\u09B0 requirements.txt \u09B9\u09B2\u09CB \u09AC\u09BE\u099C\u09BE\u09B0\u09C7\u09B0 \u09AB\u09B0\u09CD\u09A6\u0964"},question:"What is a virtual environment, and how do you manage dependencies with pip?",answer:"A virtual environment is an isolated Python installation (its own site-packages) per project, so different projects can use different package versions without conflicts or touching the system Python. You create one with python -m venv .venv, activate it, and install packages with python -m pip install. Dependencies are recorded in requirements.txt (pip freeze) or, in modern projects, in pyproject.toml, often with a lock file managed by tools like Poetry or uv.",points:["python -m venv .venv creates it; activate with source .venv/bin/activate (Windows: .venv\\Scripts\\activate)","Prefer 'python -m pip' so pip matches the active interpreter","pip freeze > requirements.txt and pip install -r requirements.txt","pyproject.toml is the modern standard for project metadata and dependencies","Never commit the .venv folder; add it to .gitignore","Many Linux distros block system-wide pip installs (PEP 668 'externally managed') \u2014 use a venv"],code:`# create and activate (Linux/macOS)
python3 -m venv .venv
source .venv/bin/activate

# install and pin dependencies
python -m pip install requests==2.32.3
python -m pip freeze > requirements.txt

# on another machine / CI
python -m pip install -r requirements.txt

# leave the environment
deactivate`},{id:"pb-19",level:"fresher",topic:"py-basics",difficulty:"easy",simple:{hi:"PEP 8 school uniform ke rules jaisa hai \u2014 sab ek jaisa pehnte hain to class saaf aur sundar dikhti hai. Code bhi sab ek hi style mein likhein to padhna aasaan ho jaata hai.",en:"PEP 8 is like school uniform rules \u2014 when everyone dresses the same, the class looks neat. When everyone writes code in one style, it becomes easy to read.",bn:"PEP 8 \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2 \u0987\u0989\u09A8\u09BF\u09AB\u09B0\u09CD\u09AE\u09C7\u09B0 \u09A8\u09BF\u09AF\u09BC\u09AE\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09B8\u09AC\u09BE\u0987 \u098F\u0995\u09B0\u0995\u09AE \u09AA\u09B0\u09B2\u09C7 \u0995\u09CD\u09B2\u09BE\u09B8 \u09AA\u09B0\u09BF\u09AA\u09BE\u099F\u09BF \u09A6\u09C7\u0996\u09BE\u09AF\u09BC\u0964 \u09B8\u09AC\u09BE\u0987 \u098F\u0995\u0987 style-\u098F code \u09B2\u09BF\u0996\u09B2\u09C7 \u09B8\u09C7\u099F\u09BE \u09AA\u09A1\u09BC\u09BE \u09B8\u09B9\u099C \u09B9\u09AF\u09BC\u0964"},question:"What is PEP 8?",answer:"PEP 8 is the official style guide for Python code. It covers 4-space indentation, line length (79 characters by the guide, though many teams use 88\u2013120), naming (snake_case for functions and variables, PascalCase for classes, UPPER_CASE for constants), whitespace, import order and comparisons like 'is None'. Teams enforce it automatically with formatters and linters such as Black or Ruff.",points:["4 spaces per indent, never mix tabs and spaces","snake_case functions/variables, PascalCase classes, UPPER_CASE constants","Imports at the top: standard library, third-party, local \u2014 one per line","Use 'is None', 'if not items:' and isinstance() instead of type() ==","Tools: Black/Ruff format, Ruff/flake8/pylint lint","Readability and consistency matter more than any single rule"],code:`import os
import sys

MAX_RETRIES = 3


class OrderService:
    def get_total(self, item_prices):
        if not item_prices:
            return 0
        return sum(item_prices)


print(OrderService().get_total([10, 20]), os.sep is not None, len(sys.argv) >= 1)

# Output (Linux):
# 30 True True`},{id:"pb-20",level:"junior",topic:"py-basics",difficulty:"easy",simple:{hi:"range roll numbers ki line jaisa hai, enumerate har bachche ko uska roll number deta hai, aur zip do lines ke bachchon ko jodi mein khada karta hai \u2014 jiski line chhoti, utni hi jodiyaan.",en:"range is like a line of roll numbers, enumerate gives each child their roll number, and zip pairs up children from two lines \u2014 as many pairs as the shorter line.",bn:"range \u09B9\u09B2\u09CB roll number-\u098F\u09B0 \u09B8\u09BE\u09B0\u09BF\u09B0 \u09AE\u09A4\u09CB, enumerate \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u0995\u09C7 \u09A4\u09BE\u09B0 roll number \u09A6\u09C7\u09AF\u09BC, \u0986\u09B0 zip \u09A6\u09C1\u099F\u09CB \u09B8\u09BE\u09B0\u09BF\u09B0 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09A6\u09C7\u09B0 \u099C\u09CB\u09A1\u09BC\u09BE\u09AF\u09BC \u09A6\u09BE\u0981\u09A1\u09BC \u0995\u09B0\u09BE\u09AF\u09BC \u2014 \u099B\u09CB\u099F \u09B8\u09BE\u09B0\u09BF\u09A4\u09C7 \u09AF\u09A4\u099C\u09A8, \u09A4\u09A4\u0997\u09C1\u09B2\u09CB \u099C\u09CB\u09A1\u09BC\u09BE\u0964"},question:"Explain range, enumerate and zip.",answer:"range(start, stop, step) is a lazy, immutable sequence of integers that excludes stop and uses almost no memory. enumerate(iterable, start=0) yields (index, item) pairs, replacing the error-prone range(len(x)) pattern. zip(a, b, ...) pairs items from several iterables and stops at the shortest one; pass strict=True to raise an error when lengths differ, or use itertools.zip_longest to pad.",points:["range(5) \u2192 0..4; range(10, 0, -3) \u2192 10, 7, 4, 1","range supports len, indexing, slicing and fast 'in' for ints","enumerate(items, start=1) for numbered output","zip stops at the shortest input; strict=True (3.10+) raises ValueError on mismatch","dict(zip(keys, values)) builds a dict; zip(*pairs) unzips"],code:`print(list(range(10, 0, -3)), len(range(0, 100, 5)))
fruits = ["aam", "kela", "seb"]
for i, f in enumerate(fruits, start=1):
    print(i, f)
prices = [60, 40]
print(list(zip(fruits, prices)))
print(dict(zip(fruits, prices)))

# Output:
# [10, 7, 4, 1] 20
# 1 aam
# 2 kela
# 3 seb
# [('aam', 60), ('kela', 40)]
# {'aam': 60, 'kela': 40}`},{id:"pb-21",level:"mid",topic:"py-basics",difficulty:"medium",simple:{hi:"Dict dukaan ke stock register jaisa hai: get poochta hai 'cheeni hai kya? nahi to 0 maan lo'. Register padhte-padhte page phaadna galat hai \u2014 pehle list ki copy banao, phir hatao.",en:"A dict is like a shop's stock register: get asks 'is there sugar? if not, assume 0'. Tearing pages out while you are still reading the register is wrong \u2014 make a copy of the list first, then remove.",bn:"Dict \u09B9\u09B2\u09CB \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 stock \u0996\u09BE\u09A4\u09BE\u09B0 \u09AE\u09A4\u09CB: get \u099C\u09BF\u099C\u09CD\u099E\u09C7\u09B8 \u0995\u09B0\u09C7 '\u099A\u09BF\u09A8\u09BF \u0986\u099B\u09C7? \u09A8\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 0 \u09A7\u09B0\u09CB'\u0964 \u0996\u09BE\u09A4\u09BE \u09AA\u09A1\u09BC\u09A4\u09C7 \u09AA\u09A1\u09BC\u09A4\u09C7 \u09AA\u09BE\u09A4\u09BE \u099B\u09C7\u0981\u09A1\u09BC\u09BE \u09AD\u09C1\u09B2 \u2014 \u0986\u0997\u09C7 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE\u09B0 \u098F\u0995\u099F\u09BE \u0995\u09AA\u09BF \u09AC\u09BE\u09A8\u09BE\u0993, \u09A4\u09BE\u09B0\u09AA\u09B0 \u09AC\u09BE\u09A6 \u09A6\u09BE\u0993\u0964"},question:"Explain the important dictionary methods and how to iterate over a dict safely.",answer:"d[key] raises KeyError if the key is missing, while d.get(key, default) returns a default. setdefault inserts a default only if missing, update or the | operator (3.9+) merge dicts, and pop/popitem remove items. keys(), values() and items() return live view objects, and iteration follows insertion order. You must not add or remove keys while iterating over a dict \u2014 that raises RuntimeError \u2014 so iterate over a copy like list(d) or build a new dict with a comprehension.",points:["get(k, default) vs d[k] (KeyError)","setdefault, update, d1 | d2, d |= other","pop(k, default), popitem() removes the last inserted pair","Iterate with for k, v in d.items(); views reflect later changes","Changing size during iteration \u2192 RuntimeError; iterate over list(d) instead","collections.Counter / defaultdict for counting and grouping"],code:`stock = {"rice": 10, "dal": 0, "oil": 5}
print(stock.get("sugar", 0), stock.setdefault("salt", 2))
print(stock | {"oil": 7})
try:
    for k in stock:
        if stock[k] == 0:
            del stock[k]
except RuntimeError as e:
    print("RuntimeError:", e)
for k in list(stock):
    if stock[k] == 0:
        del stock[k]
print(stock)

# Output:
# 0 2
# {'rice': 10, 'dal': 0, 'oil': 7, 'salt': 2}
# RuntimeError: dictionary changed size during iteration
# {'rice': 10, 'oil': 5, 'salt': 2}`},{id:"pb-22",level:"senior",topic:"py-basics",difficulty:"medium",simple:{hi:"sort() wahi line ko teacher ki tarah lambai ke hisaab se khada kar deta hai, sorted() ek nayi line bana deta hai aur purani waise hi rehti hai. key batata hai kis cheez se line lage \u2014 lambai, naam ya marks.",en:"sort() rearranges the same line of students by height, like a teacher does; sorted() makes a new line and leaves the old one as it was. key tells what to line up by \u2014 height, name or marks.",bn:"sort() \u099F\u09BF\u099A\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB \u098F\u0995\u0987 \u09B8\u09BE\u09B0\u09BF\u09B0 \u099B\u09BE\u09A4\u09CD\u09B0\u09A6\u09C7\u09B0 \u0989\u099A\u09CD\u099A\u09A4\u09BE \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 \u09B8\u09BE\u099C\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC; sorted() \u098F\u0995\u099F\u09BE \u09A8\u09A4\u09C1\u09A8 \u09B8\u09BE\u09B0\u09BF \u09AC\u09BE\u09A8\u09BE\u09AF\u09BC \u0986\u09B0 \u09AA\u09C1\u09B0\u09A8\u09CB\u099F\u09BE \u09AF\u09C7\u09AE\u09A8 \u099B\u09BF\u09B2 \u09A4\u09C7\u09AE\u09A8\u0987 \u09A5\u09BE\u0995\u09C7\u0964 key \u09AC\u09B2\u09C7 \u0995\u09C0\u09B8\u09C7\u09B0 \u09AD\u09BF\u09A4\u09CD\u09A4\u09BF\u09A4\u09C7 \u09B8\u09BE\u099C\u09BE\u09A8\u09CB \u09B9\u09AC\u09C7 \u2014 \u0989\u099A\u09CD\u099A\u09A4\u09BE, \u09A8\u09BE\u09AE \u09A8\u09BE \u09A8\u09AE\u09CD\u09AC\u09B0\u0964"},question:"What is the difference between sorted() and list.sort()? How do you sort with key, by multiple fields and in reverse?",answer:"list.sort() sorts a list in place and returns None, while sorted(iterable) works on any iterable and returns a new list. Both take key= (a function computing a sort key once per item) and reverse=True, and both use Timsort, which is stable \u2014 equal items keep their original order. For multiple fields return a tuple from key, negate numeric fields for mixed directions, or use stability by sorting in passes; functools.cmp_to_key adapts old-style comparison functions.",points:["sort(): in place, lists only, returns None (x = x.sort() is a classic bug)","sorted(): any iterable, returns a new list","key=len, key=str.lower, key=lambda p: (p['dept'], -p['salary']), operator.itemgetter","Stable sort \u2192 multi-pass sorting by secondary key first, then primary","Timsort: O(n log n) worst case, fast on partly sorted data","Mixing incomparable types (e.g. int and str) raises TypeError"],code:`people = [("Ravi", 30), ("anu", 25), ("Dev", 30), ("bela", 25)]
print(sorted(people, key=lambda p: p[0].lower()))
print(sorted(people, key=lambda p: (-p[1], p[0])))

nums = [3, 1, 2]
result = nums.sort()
print(result, nums, sorted("cab", reverse=True))

# Output:
# [('anu', 25), ('bela', 25), ('Dev', 30), ('Ravi', 30)]
# [('Dev', 30), ('Ravi', 30), ('anu', 25), ('bela', 25)]
# None [1, 2, 3] ['c', 'b', 'a']`},{id:"pb-23",level:"mid",topic:"py-basics",difficulty:"medium",simple:{hi:"File kholna fridge ka darwaza kholne jaisa hai \u2014 kaam ke baad band karna zaroori hai. 'with' ek auto-close darwaza hai jo kaam khatam hote hi khud band ho jaata hai, chahe beech mein kuch gir bhi jaaye.",en:"Opening a file is like opening the fridge door \u2014 you must close it when you are done. 'with' is a self-closing door that shuts by itself when you finish, even if something falls on the way.",bn:"File \u0996\u09CB\u09B2\u09BE \u09B9\u09B2\u09CB \u09AB\u09CD\u09B0\u09BF\u099C\u09C7\u09B0 \u09A6\u09B0\u099C\u09BE \u0996\u09CB\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 \u0995\u09BE\u099C \u09B6\u09C7\u09B7\u09C7 \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09BE \u09A6\u09B0\u0995\u09BE\u09B0\u0964 'with' \u09B9\u09B2\u09CB \u09A8\u09BF\u099C\u09C7-\u09A8\u09BF\u099C\u09C7 \u09AC\u09A8\u09CD\u09A7 \u09B9\u0993\u09AF\u09BC\u09BE \u09A6\u09B0\u099C\u09BE, \u0995\u09BE\u099C \u09B6\u09C7\u09B7 \u09B9\u09B2\u09C7\u0987 \u09AC\u09A8\u09CD\u09A7 \u09B9\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC, \u09AE\u09BE\u099D\u09C7 \u0995\u09BF\u099B\u09C1 \u09AA\u09A1\u09BC\u09C7 \u0997\u09C7\u09B2\u09C7\u0993\u0964"},question:"How do you handle files in Python, and why use the 'with' statement?",answer:"open(path, mode, encoding=...) returns a file object; common modes are 'r', 'w' (truncate), 'a' (append), 'x' (create only) and 'b' for binary. The 'with' statement makes the file a context manager, so it is closed automatically even if an exception occurs, avoiding leaked file handles and unflushed data. Always pass encoding='utf-8' for text, iterate over the file line by line for large files, and consider pathlib.Path for path handling.",points:["with open(...) as f: closes the file automatically (calls __exit__)","Modes: r, w, a, x, + (read/write), b (binary)","Specify encoding='utf-8' \u2014 the default depends on the platform","Iterate 'for line in f' for large files instead of f.read()","pathlib: Path('a.txt').read_text(encoding='utf-8') / write_text()","Handle FileNotFoundError / PermissionError where needed"],code:`from pathlib import Path

path = Path("marks.txt")
with open(path, "w", encoding="utf-8") as f:
    f.write("Ravi,80\\nAnu,95\\n")

total = 0
with open(path, encoding="utf-8") as f:
    for line in f:
        name, mark = line.strip().split(",")
        total += int(mark)
print(total, f.closed)

try:
    open("missing.txt")
except FileNotFoundError as e:
    print(type(e).__name__)

# Output:
# 175 True
# FileNotFoundError`},{id:"pb-24",level:"senior",topic:"py-basics",difficulty:"hard",simple:{hi:"/ ek pizza ko barabar tukdon mein baantna hai, aadha tukda bhi milega. // kehta hai 'sirf poore tukde do', baaki chhod do. Float paisa ginne ki purani tarazu jaisa hai \u2014 thoda sa idhar-udhar ho sakta hai, isliye paise ke liye Decimal use karo.",en:"/ is sharing a pizza equally, so you can get half a slice. // says 'only whole slices', the rest is left over. A float is like an old weighing scale \u2014 it can be off by a tiny bit, so use Decimal for money.",bn:"/ \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09AA\u09BF\u09CE\u099C\u09BE \u09B8\u09AE\u09BE\u09A8 \u09AD\u09BE\u0997 \u0995\u09B0\u09BE, \u0986\u09A7\u0996\u09BE\u09A8\u09BE \u099F\u09C1\u0995\u09B0\u09CB\u0993 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u09AF\u09BC\u0964 // \u09AC\u09B2\u09C7 '\u09B6\u09C1\u09A7\u09C1 \u0997\u09CB\u099F\u09BE \u099F\u09C1\u0995\u09B0\u09CB \u09A6\u09BE\u0993', \u09AC\u09BE\u0995\u09BF\u099F\u09BE \u09A5\u09BE\u0995\u0964 Float \u09B9\u09B2\u09CB \u09AA\u09C1\u09B0\u09A8\u09CB \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AA\u09BE\u09B2\u09CD\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB \u2014 \u098F\u0995\u099F\u09C1 \u098F\u09A6\u09BF\u0995-\u0993\u09A6\u09BF\u0995 \u09B9\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7, \u09A4\u09BE\u0987 \u099F\u09BE\u0995\u09BE\u09B0 \u09B9\u09BF\u09B8\u09BE\u09AC\u09C7 Decimal \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09CB\u0964"},question:"Explain / vs //, round() and float precision in Python. What does this code print?",answer:"/ is true division and always returns a float, while // is floor division: it rounds toward negative infinity, so -7 // 2 is -4 and -7 % 2 is 1 (the identity a == (a // b) * b + a % b holds). round() uses banker's rounding (round half to even), so round(2.5) is 2 and round(3.5) is 4, and round(2.675, 2) gives 2.67 because 2.675 cannot be stored exactly in binary. Floats are IEEE-754 doubles, so 0.1 + 0.2 != 0.3; compare with math.isclose and use decimal.Decimal for money.",points:["/ \u2192 float always (6 / 3 == 2.0); // \u2192 floor, toward -infinity","% result takes the sign of the divisor in Python","round() = round half to even; int() truncates toward zero","Binary floats: 0.1 + 0.2 == 0.30000000000000004","math.isclose for comparisons, Decimal('0.1') or integer paise for money","int has arbitrary precision \u2014 no overflow"],code:`import math
from decimal import Decimal

print(7 / 2, 7 // 2, -7 // 2, -7 % 2, 6 / 3)
print(round(2.5), round(3.5), round(-2.5), round(2.675, 2), int(-3.9))
print(0.1 + 0.2, 0.1 + 0.2 == 0.3, math.isclose(0.1 + 0.2, 0.3))
print(Decimal("0.1") + Decimal("0.2"))

# Output:
# 3.5 3 -4 1 2.0
# 2 4 -2 2.67 -3
# 0.30000000000000004 False True
# 0.3`},{id:"pb-25",level:"senior",topic:"py-basics",difficulty:"hard",simple:{hi:"Python ek translator jaisa hai jo pehle tumhari kahani ko ek chhoti short-hand diary (bytecode) mein likh leta hai, phir us diary ko line-by-line padh ke kaam karta hai. Diary save rehti hai (.pyc), to agli baar dobara likhni nahi padti.",en:"Python is like a translator who first rewrites your story into a short-hand diary (bytecode), then reads that diary line by line to do the work. The diary is saved (.pyc), so next time it does not need to be rewritten.",bn:"Python \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u0985\u09A8\u09C1\u09AC\u09BE\u09A6\u0995\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7 \u0986\u0997\u09C7 \u09A4\u09CB\u09AE\u09BE\u09B0 \u0997\u09B2\u09CD\u09AA\u099F\u09BE \u098F\u0995\u099F\u09BE short-hand \u09A1\u09BE\u09AF\u09BC\u09C7\u09B0\u09BF\u09A4\u09C7 (bytecode) \u09B2\u09BF\u0996\u09C7 \u09A8\u09C7\u09AF\u09BC, \u09A4\u09BE\u09B0\u09AA\u09B0 \u09B8\u09C7\u0987 \u09A1\u09BE\u09AF\u09BC\u09C7\u09B0\u09BF \u09B2\u09BE\u0987\u09A8 \u09A7\u09B0\u09C7 \u09AA\u09A1\u09BC\u09C7 \u0995\u09BE\u099C \u0995\u09B0\u09C7\u0964 \u09A1\u09BE\u09AF\u09BC\u09C7\u09B0\u09BF\u099F\u09BE \u099C\u09AE\u09BE \u09A5\u09BE\u0995\u09C7 (.pyc), \u09A4\u09BE\u0987 \u09AA\u09B0\u09C7\u09B0 \u09AC\u09BE\u09B0 \u0986\u09AC\u09BE\u09B0 \u09B2\u09BF\u0996\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"Is Python interpreted or compiled? Explain how CPython runs your code.",answer:"Both, in a sense. CPython first compiles source code into bytecode (a lower-level, platform-independent instruction set) and then the Python virtual machine interprets that bytecode one instruction at a time. Bytecode of imported modules is cached as .pyc files in __pycache__ so later imports skip compilation, and the dis module shows the bytecode. It is not compiled to machine code ahead of time like C; recent CPython versions add an adaptive specialising interpreter, and other implementations (PyPy) use a JIT.",points:["Pipeline: source \u2192 tokens/AST \u2192 bytecode (code object) \u2192 PVM evaluation loop",".pyc caches in __pycache__ for imported modules (not for the main script)","dis.dis(func) shows bytecode; bytecode is version-specific","Interpreted bytecode + dynamic typing explain why CPU-heavy pure Python is slower than C","Other implementations: PyPy (JIT), Jython, MicroPython; CPython is the reference","Speed-ups: built-ins, C-extension libraries (NumPy), better algorithms"],code:`import dis

def add(a, b):
    return a + b

code = add.__code__
print(type(code).__name__, code.co_varnames, code.co_argcount)
ops = [ins.opname for ins in dis.get_instructions(add)]
print("BINARY_OP" in ops, ops[-1])

# Output (Python 3.12):
# code ('a', 'b') 2
# True RETURN_VALUE`},{id:"pc-1",level:"fresher",topic:"py-coding",difficulty:"easy",simple:{hi:"Palindrome woh shabd hai jo aage se padho ya peeche se, same lagta hai \u2014 jaise 'naman' ya 'malayalam'. Python mein s[::-1] shabd ko ulta kar deta hai, jaise train ka ulta safar, aur hum dekhte hain ki dono same hain ya nahi.",en:"A palindrome reads the same forwards and backwards \u2014 like 'naman' or 'malayalam'. In Python, s[::-1] flips the word, like a train going back on the same route, and we check if both are the same.",bn:"Palindrome \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u09B6\u09AC\u09CD\u09A6 \u09AF\u09BE \u09B8\u09BE\u09AE\u09A8\u09C7 \u09A5\u09C7\u0995\u09C7 \u09AC\u09BE \u09AA\u09C7\u099B\u09A8 \u09A5\u09C7\u0995\u09C7 \u09AA\u09A1\u09BC\u09B2\u09C7 \u098F\u0995\u0987 \u09A5\u09BE\u0995\u09C7 \u2014 \u09AF\u09C7\u09AE\u09A8 'naman' \u09AC\u09BE 'malayalam'\u0964 Python-\u098F s[::-1] \u09B6\u09AC\u09CD\u09A6\u099F\u09BE\u0995\u09C7 \u0989\u09B2\u09CD\u099F\u09C7 \u09A6\u09C7\u09AF\u09BC, \u09AF\u09C7\u09A8 \u099F\u09CD\u09B0\u09C7\u09A8 \u098F\u0995\u0987 \u09AA\u09A5\u09C7 \u09AB\u09BF\u09B0\u099B\u09C7, \u0986\u09B0 \u0986\u09AE\u09B0\u09BE \u09A6\u09C7\u0996\u09BF \u09A6\u09C1\u099F\u09CB \u098F\u0995\u0987 \u0995\u09BF\u09A8\u09BE\u0964"},question:"Write Python code to reverse a string and check whether it is a palindrome (ignoring case and punctuation).",answer:"The idiomatic way to reverse a string is slicing with a negative step, s[::-1], which returns a new string in O(n). To check a palindrome, first normalise the text \u2014 lowercase it and keep only letters and digits \u2014 then compare it with its reverse. A two-pointer loop gives the same result with O(1) extra space and can stop at the first mismatch.",points:["s[::-1] reverses any sequence; strings are immutable so a new string is created","''.join(reversed(s)) is an equivalent alternative","Normalise first: lower() (or casefold()) and remove non-alphanumeric characters","Two pointers: compare s[i] and s[j] moving inwards, O(n) time, O(1) extra space","Mention edge cases: empty string and single character are palindromes"],code:`import re
def reverse(s: str) -> str:
    return s[::-1]
def is_palindrome(s: str) -> bool:
    cleaned = re.sub(r"[^a-z0-9]", "", s.lower())
    return cleaned == cleaned[::-1]
def is_palindrome_two_pointer(s: str) -> bool:
    i, j = 0, len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return False
        i, j = i + 1, j - 1
    return True
print(reverse("python"))
print(is_palindrome("A man, a plan, a canal: Panama"))
print(is_palindrome("hello"))
print(is_palindrome_two_pointer("racecar"))
# Output:
# nohtyp
# True
# False
# True`},{id:"pc-2",level:"fresher",topic:"py-coding",difficulty:"easy",simple:{hi:"Anagram aise hai jaise do tiffin box mein bilkul same cheezein hon \u2014 2 roti, 1 sabzi, 1 achaar \u2014 bas alag order mein rakhi hon. Counter dono dabbon ki cheezein gin kar dekhta hai ki ginti same hai ya nahi.",en:"Anagrams are like two tiffin boxes with exactly the same items \u2014 2 rotis, 1 sabzi, 1 pickle \u2014 just arranged in a different order. Counter counts the items in both boxes and checks that the counts match.",bn:"Anagram \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u09A6\u09C1\u099F\u09CB \u099F\u09BF\u09AB\u09BF\u09A8 \u09AC\u09BE\u0995\u09CD\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09BE\u09A4\u09C7 \u09A0\u09BF\u0995 \u098F\u0995\u0987 \u099C\u09BF\u09A8\u09BF\u09B8 \u0986\u099B\u09C7 \u2014 \u09E8\u099F\u09CB \u09B0\u09C1\u099F\u09BF, \u09E7\u099F\u09BE \u09A4\u09B0\u0995\u09BE\u09B0\u09BF, \u09E7\u099F\u09BE \u0986\u099A\u09BE\u09B0 \u2014 \u09B6\u09C1\u09A7\u09C1 \u0985\u09A8\u09CD\u09AF\u09AD\u09BE\u09AC\u09C7 \u09B8\u09BE\u099C\u09BE\u09A8\u09CB\u0964 Counter \u09A6\u09C1\u099F\u09CB \u09AC\u09BE\u0995\u09CD\u09B8\u09C7\u09B0 \u099C\u09BF\u09A8\u09BF\u09B8 \u0997\u09C1\u09A8\u09C7 \u09A6\u09C7\u0996\u09C7 \u09B8\u0982\u0996\u09CD\u09AF\u09BE \u09AE\u09BF\u09B2\u099B\u09C7 \u0995\u09BF\u09A8\u09BE\u0964"},question:"Write a function to check whether two strings are anagrams.",answer:"Two strings are anagrams if they contain exactly the same characters with the same counts. After normalising (lowercase, remove spaces), compare collections.Counter of both strings, which builds a frequency map in O(n) time. Sorting both strings and comparing also works but costs O(n log n).",points:["Normalise: lower() and remove spaces (and punctuation if required)","Counter(a) == Counter(b) \u2192 O(n) time, O(k) space for k distinct characters","sorted(a) == sorted(b) \u2192 simpler but O(n log n)","A quick length check lets you return False early","Clarify with the interviewer: case sensitivity, spaces, Unicode"],code:`from collections import Counter

def is_anagram(a: str, b: str) -> bool:
    a = a.replace(" ", "").lower()
    b = b.replace(" ", "").lower()
    return len(a) == len(b) and Counter(a) == Counter(b)

def is_anagram_sorted(a: str, b: str) -> bool:
    return sorted(a.lower()) == sorted(b.lower())  # O(n log n)

print(is_anagram("Listen", "Silent"))
print(is_anagram("Dormitory", "dirty room"))
print(is_anagram("apple", "paple"))
print(is_anagram("rat", "car"))
print(is_anagram_sorted("evil", "vile"))

# Output:
# True
# True
# True
# False
# True`},{id:"pc-3",level:"junior",topic:"py-coding",difficulty:"medium",simple:{hi:"Generator ek chai wale jaisa hai jo poori ketli ek saath nahi deta, balki jab aap maango tab ek-ek cup banata hai. Isse jagah (memory) bachti hai aur aap jitne cup chahe utne le sakte ho.",en:"A generator is like a tea seller who doesn't hand you the whole kettle at once but makes one cup each time you ask. This saves space (memory), and you can take as many cups as you want.",bn:"Generator \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995 \u099A\u09BE-\u0993\u09AF\u09BC\u09BE\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7 \u09AA\u09C1\u09B0\u09CB \u0995\u09C7\u099F\u09B2\u09BF \u098F\u0995\u09B8\u0999\u09CD\u0997\u09C7 \u09A6\u09C7\u09AF\u09BC \u09A8\u09BE, \u09A4\u09C1\u09AE\u09BF \u099A\u09BE\u0987\u09B2\u09C7 \u098F\u0995\u099F\u09BE \u098F\u0995\u099F\u09BE \u0995\u09B0\u09C7 \u0995\u09BE\u09AA \u09AC\u09BE\u09A8\u09BE\u09AF\u09BC\u0964 \u098F\u09A4\u09C7 \u099C\u09BE\u09AF\u09BC\u0997\u09BE (memory) \u09AC\u09BE\u0981\u099A\u09C7 \u0986\u09B0 \u09AF\u09A4 \u0995\u09BE\u09AA \u099A\u09BE\u0993 \u09A4\u09A4 \u09A8\u09BF\u09A4\u09C7 \u09AA\u09BE\u09B0\u09CB\u0964"},question:"Write a Fibonacci generator in Python. Why is a generator a good fit?",answer:"A generator function uses yield to produce one value at a time and pauses its state between calls, so it can represent the infinite Fibonacci sequence using O(1) memory. Keep two variables a and b, yield a, then update a, b = b, a + b. The caller takes as many values as needed with next(), a for loop with a stop condition, or itertools.islice.",points:["yield turns a function into a generator; values are produced lazily on demand","O(1) memory \u2014 no list of all numbers is stored","Tuple swap a, b = b, a + b avoids a temporary variable","Use itertools.islice(gen, n) to take the first n items from an infinite generator","A generator is exhausted after one pass; call fib() again for a fresh one"],code:`from itertools import islice

def fib():
    a, b = 0, 1
    while True:          # infinite, but lazy
        yield a
        a, b = b, a + b

def fib_upto(limit):
    for n in fib():
        if n > limit:
            return
        yield n

print(list(islice(fib(), 10)))
print(list(fib_upto(50)))
gen = fib()
print(next(gen), next(gen), next(gen), next(gen))

# Output:
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
# 0 1 1 2`},{id:"pc-4",level:"mid",topic:"py-coding",difficulty:"medium",simple:{hi:"Nested list ek dabbe ke andar dabba, uske andar dabba jaisa hai \u2014 jaise shaadi ka gift jo kai baar pack kiya ho. Flatten har dabba kholta jaata hai aur andar ki saari cheezein ek line mein table par rakh deta hai.",en:"A nested list is like a box inside a box inside a box \u2014 like a wedding gift wrapped many times. Flatten keeps opening every box and lays all the items in one line on the table.",bn:"Nested list \u09B9\u09B2\u09CB \u09AC\u09BE\u0995\u09CD\u09B8\u09C7\u09B0 \u09AD\u09C7\u09A4\u09B0 \u09AC\u09BE\u0995\u09CD\u09B8, \u09A4\u09BE\u09B0 \u09AD\u09C7\u09A4\u09B0 \u0986\u09AC\u09BE\u09B0 \u09AC\u09BE\u0995\u09CD\u09B8 \u2014 \u09AF\u09C7\u09A8 \u09AC\u09BF\u09AF\u09BC\u09C7\u09B0 \u0989\u09AA\u09B9\u09BE\u09B0 \u09AF\u09BE \u0985\u09A8\u09C7\u0995\u09AC\u09BE\u09B0 \u09AE\u09CB\u09A1\u09BC\u09BE\u09A8\u09CB\u0964 Flatten \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09AC\u09BE\u0995\u09CD\u09B8 \u0996\u09C1\u09B2\u09A4\u09C7 \u09A5\u09BE\u0995\u09C7 \u0986\u09B0 \u09AD\u09C7\u09A4\u09B0\u09C7\u09B0 \u09B8\u09AC \u099C\u09BF\u09A8\u09BF\u09B8 \u099F\u09C7\u09AC\u09BF\u09B2\u09C7 \u098F\u0995 \u09B2\u09BE\u0987\u09A8\u09C7 \u09B8\u09BE\u099C\u09BF\u09AF\u09BC\u09C7 \u09B0\u09BE\u0996\u09C7\u0964"},question:"Write a function to flatten an arbitrarily nested list.",answer:"Use a recursive generator: loop over the items, and if an item is a list or tuple, delegate to a recursive call with yield from; otherwise yield the item itself. Check for list/tuple explicitly rather than 'any iterable', because strings are iterable and would recurse forever into single characters. For extremely deep nesting, an explicit stack avoids Python's recursion limit.",points:["yield from flatten(item) delegates to the recursive generator","Do not treat str/bytes as nested containers \u2014 they are iterable too","Time O(n) over all elements; recursion depth equals nesting depth","Default recursion limit is about 1000 \u2014 use an explicit stack for very deep data","For exactly one level, itertools.chain.from_iterable(lists) is enough"],code:`def flatten(items):
    for item in items:
        if isinstance(item, (list, tuple)):
            yield from flatten(item)   # recurse into sub-lists
        else:
            yield item

data = [1, [2, [3, [4, 5]]], (6, 7), "ab", []]
print(list(flatten(data)))
print(list(flatten([[[]], [[1]], 2])))

# Output:
# [1, 2, 3, 4, 5, 6, 7, 'ab']
# [1, 2]`},{id:"pc-5",level:"junior",topic:"py-coding",difficulty:"easy",simple:{hi:"Counter cricket match ke scorer jaisa hai. Har baar koi shabd aata hai to uske naam ke aage ek run jod deta hai, aur end mein most_common() batata hai ki top scorer kaun hai.",en:"Counter is like the scorer at a cricket match. Every time a word appears, it adds a run next to that word's name, and at the end most_common() tells you who the top scorers are.",bn:"Counter \u09B9\u09B2\u09CB \u0995\u09CD\u09B0\u09BF\u0995\u09C7\u099F \u09AE\u09CD\u09AF\u09BE\u099A\u09C7\u09B0 \u09B8\u09CD\u0995\u09CB\u09B0\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09BE\u09B0 \u0995\u09CB\u09A8\u09CB \u09B6\u09AC\u09CD\u09A6 \u098F\u09B2\u09C7 \u09A4\u09BE\u09B0 \u09A8\u09BE\u09AE\u09C7\u09B0 \u09AA\u09BE\u09B6\u09C7 \u098F\u0995\u099F\u09BE \u09B0\u09BE\u09A8 \u09AF\u09CB\u0997 \u0995\u09B0\u09C7, \u0986\u09B0 \u09B6\u09C7\u09B7\u09C7 most_common() \u09AC\u09B2\u09C7 \u09A6\u09C7\u09AF\u09BC \u09B8\u09AC\u099A\u09C7\u09AF\u09BC\u09C7 \u09AC\u09C7\u09B6\u09BF \u09B0\u09BE\u09A8 \u0995\u09BE\u09B0\u0964"},question:"Count the frequency of each word in a text and print the 3 most common words.",answer:`Normalise the text to lowercase, extract words with a regex such as re.findall(r"[a-z']+", text), and pass the list to collections.Counter, which counts in one O(n) pass. Counter.most_common(k) returns the k most frequent (word, count) pairs sorted by count, and a missing key returns 0 instead of raising KeyError. The same can be done with a plain dict and dict.get(word, 0) + 1.`,points:["Counter is a dict subclass: word \u2192 count","most_common(k) returns a list of (item, count) tuples, highest first","Missing keys return 0 \u2014 no KeyError","Use a regex or str.split() plus punctuation stripping to tokenise","Alternatives: dict.get(w, 0) + 1 or collections.defaultdict(int)"],code:`import re
from collections import Counter

text = """The quick brown fox. The lazy dog!
the fox jumps; THE end."""

words = re.findall(r"[a-z']+", text.lower())
freq = Counter(words)

print(freq.most_common(3))
print(freq["fox"], freq["cat"])   # missing key -> 0, no KeyError

# manual version with a dict
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
print(counts == dict(freq))

# Output:
# [('the', 4), ('fox', 2), ('quick', 1)]
# 2 0
# True`},{id:"pc-6",level:"mid",topic:"py-coding",difficulty:"medium",simple:{hi:"Socho aap dukaan mein ho aur aapke paas exact 9 rupaye ka saamaan lena hai. Har cheez uthate waqt aap apni diary (dict) dekhte ho ki baaki paison wali cheez pehle dikhi thi kya. Diary ki wajah se poori dukaan baar-baar ghoomni nahi padti.",en:"Imagine you are in a shop and must buy items worth exactly 9 rupees. Each time you pick something, you check your diary (dict) to see if an item costing the remaining amount was seen earlier. Thanks to the diary, you don't have to walk around the whole shop again and again.",bn:"\u09AD\u09BE\u09AC\u09CB \u09A4\u09C1\u09AE\u09BF \u09A6\u09CB\u0995\u09BE\u09A8\u09C7 \u0986\u099B\u09CB \u0986\u09B0 \u09A0\u09BF\u0995 \u09EF \u099F\u09BE\u0995\u09BE\u09B0 \u099C\u09BF\u09A8\u09BF\u09B8 \u0995\u09BF\u09A8\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u099C\u09BF\u09A8\u09BF\u09B8 \u09A4\u09CB\u09B2\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC \u09A4\u09C1\u09AE\u09BF \u09A1\u09BE\u09AF\u09BC\u09C7\u09B0\u09BF (dict) \u09A6\u09C7\u0996\u09CB \u09AF\u09C7 \u09AC\u09BE\u0995\u09BF \u099F\u09BE\u0995\u09BE\u09B0 \u099C\u09BF\u09A8\u09BF\u09B8\u099F\u09BE \u0986\u0997\u09C7 \u09A6\u09C7\u0996\u09C7\u099B\u09BF\u09B2\u09C7 \u0995\u09BF\u09A8\u09BE\u0964 \u09A1\u09BE\u09AF\u09BC\u09C7\u09B0\u09BF\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09C1\u09B0\u09CB \u09A6\u09CB\u0995\u09BE\u09A8 \u09AC\u09BE\u09B0\u09AC\u09BE\u09B0 \u0998\u09C1\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"Two-sum: given a list of numbers and a target, return the indices of the two numbers that add up to the target in O(n).",answer:"Walk through the list once while keeping a dict that maps each value already seen to its index. For each number n, compute need = target - n; if need is already in the dict, the answer is [seen[need], i], otherwise store n with its index. Dict lookups are O(1) on average, so the whole solution is O(n) time and O(n) space, compared with O(n\xB2) for the nested-loop brute force.",points:["Brute force: two nested loops, O(n\xB2)","Hash map of value \u2192 index gives O(n) time, O(n) space","Check for the complement before inserting the current number, so an element is not paired with itself","Handles duplicates like [3, 3] with target 6 correctly","If the list is sorted, two pointers give O(n) time with O(1) space"],code:`def two_sum(nums, target):
    seen = {}                       # value -> index
    for i, n in enumerate(nums):
        need = target - n
        if need in seen:            # O(1) average lookup
            return [seen[need], i]
        seen[n] = i
    return []                       # no pair found

print(two_sum([2, 7, 11, 15], 9))
print(two_sum([3, 2, 4], 6))
print(two_sum([3, 3], 6))
print(two_sum([1, 2, 3], 100))

# Output:
# [0, 1]
# [1, 2]
# [0, 1]
# []`},{id:"pc-7",level:"junior",topic:"py-coding",difficulty:"easy",simple:{hi:"Yeh school assembly ki attendance jaisa hai. Teacher register mein har bachche ka naam pehli baar aane par likhti hai, aur agar wahi bachcha dobara line mein aa jaaye to use skip kar deti hai \u2014 order wahi rehta hai jismein bachche aaye the.",en:"This is like taking attendance at school assembly. The teacher writes each child's name the first time they come, and skips the child if they join the line again \u2014 the order stays the same as they arrived.",bn:"\u098F\u099F\u09BE \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09AA\u09CD\u09B0\u09BE\u09B0\u09CD\u09A5\u09A8\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC \u09B9\u09BE\u099C\u09BF\u09B0\u09BE \u09A8\u09C7\u0993\u09AF\u09BC\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u09B6\u09BF\u0995\u09CD\u09B7\u09BF\u0995\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0 \u09A8\u09BE\u09AE \u09AA\u09CD\u09B0\u09A5\u09AE\u09AC\u09BE\u09B0 \u098F\u09B2\u09C7 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC \u09B2\u09C7\u0996\u09C7\u09A8, \u0986\u09B0 \u098F\u0995\u0987 \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u0986\u09AC\u09BE\u09B0 \u09B2\u09BE\u0987\u09A8\u09C7 \u098F\u09B2\u09C7 \u09AC\u09BE\u09A6 \u09A6\u09C7\u09A8 \u2014 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0\u09BE \u09AF\u09C7 \u0995\u09CD\u09B0\u09AE\u09C7 \u098F\u09B8\u09C7\u099B\u09BF\u09B2 \u09B8\u09C7\u0987 \u0995\u09CD\u09B0\u09AE\u0987 \u09A5\u09BE\u0995\u09C7\u0964"},question:"Remove duplicates from a list while keeping the original order.",answer:"Keep a set of items already seen and append an item to the result only the first time it appears; set membership is O(1) on average, so the whole thing is O(n). A shorter idiom is list(dict.fromkeys(items)), which works because dicts preserve insertion order. Simply converting to set() removes duplicates but does not keep the original order.",points:["seen-set + result list: O(n) time, keeps first occurrence","list(dict.fromkeys(items)) \u2014 one line, insertion order guaranteed for dicts","list(set(items)) loses the order","Items must be hashable; for unhashable items (like dicts) use a key function","Checking 'x not in result_list' instead of a set makes it O(n\xB2)"],code:`def dedupe(items):
    seen = set()
    out = []
    for x in items:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out

nums = [3, 1, 3, 2, 1, 5, 2]
print(dedupe(nums))
print(list(dict.fromkeys(nums)))    # dicts keep insertion order
# list(set(nums)) also removes duplicates but loses the order
print("".join(dict.fromkeys("banana")))

# Output:
# [3, 1, 2, 5]
# [3, 1, 2, 5]
# ban`},{id:"pc-8",level:"fresher",topic:"py-coding",difficulty:"easy",simple:{hi:"FizzBuzz ek school game hai jismein bachche gol ghere mein ginti bolte hain. 3 ka table aaye to 'Fizz', 5 ka aaye to 'Buzz', aur dono ka ho to 'FizzBuzz' bolna hai \u2014 jo galti kare woh out!",en:"FizzBuzz is a school game where children sit in a circle and count. On a multiple of 3 you say 'Fizz', on a multiple of 5 you say 'Buzz', and on a multiple of both you say 'FizzBuzz' \u2014 whoever makes a mistake is out!",bn:"FizzBuzz \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u0996\u09C7\u09B2\u09BE \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0\u09BE \u0997\u09CB\u09B2 \u09B9\u09AF\u09BC\u09C7 \u09AC\u09B8\u09C7 \u0997\u09C1\u09A8\u09A4\u09C7 \u09A5\u09BE\u0995\u09C7\u0964 \u09E9-\u098F\u09B0 \u0997\u09C1\u09A3\u09BF\u09A4\u0995 \u098F\u09B2\u09C7 'Fizz', \u09EB-\u098F\u09B0 \u0997\u09C1\u09A3\u09BF\u09A4\u0995 \u098F\u09B2\u09C7 'Buzz', \u0986\u09B0 \u09A6\u09C1\u099F\u09CB\u09B0\u0987 \u09B9\u09B2\u09C7 'FizzBuzz' \u09AC\u09B2\u09A4\u09C7 \u09B9\u09AF\u09BC \u2014 \u09AF\u09C7 \u09AD\u09C1\u09B2 \u0995\u09B0\u09AC\u09C7 \u09B8\u09C7 \u0986\u0989\u099F!"},question:"Write FizzBuzz in Python for numbers 1 to n.",answer:"Loop from 1 to n; for multiples of both 3 and 5 output 'FizzBuzz', for multiples of 3 output 'Fizz', for multiples of 5 output 'Buzz', otherwise the number itself. The key detail is checking the combined case (i % 15 == 0) first, otherwise the 'Fizz' branch would catch 15 before it reaches 'FizzBuzz'. range(1, n + 1) is needed because range excludes its end value.",points:["Check i % 15 == 0 (or i % 3 == 0 and i % 5 == 0) first","range(1, n + 1) \u2014 the end value is exclusive","Return a list instead of printing so the function is testable","Interviewers watch for clean if/elif order and readable code","Extensible version: loop over a list of (divisor, word) rules"],code:`def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:          # check 15 first
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out

print(" ".join(fizzbuzz(15)))

# Output:
# 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz`},{id:"pc-9",level:"senior",topic:"py-coding",difficulty:"hard",simple:{hi:"LRU cache ek chhoti bookshelf jaisa hai jismein sirf 2 kitaabein aati hain. Jo kitaab aap padhte ho use sabse aage rakh dete ho, aur nayi kitaab ke liye jagah chahiye to woh kitaab hata dete ho jise sabse lambe samay se kisi ne nahi chhua.",en:"An LRU cache is like a small bookshelf that fits only 2 books. The book you read goes to the front, and when you need space for a new book, you remove the one nobody has touched for the longest time.",bn:"LRU cache \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u099B\u09CB\u099F \u09AC\u0987\u09AF\u09BC\u09C7\u09B0 \u09A4\u09BE\u0995\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09BE\u09A4\u09C7 \u09AE\u09BE\u09A4\u09CD\u09B0 \u09E8\u099F\u09CB \u09AC\u0987 \u09A7\u09B0\u09C7\u0964 \u09AF\u09C7 \u09AC\u0987 \u09AA\u09A1\u09BC\u09CB \u09B8\u09C7\u099F\u09BE \u09B8\u09BE\u09AE\u09A8\u09C7 \u09B0\u09BE\u0996\u09CB, \u0986\u09B0 \u09A8\u09A4\u09C1\u09A8 \u09AC\u0987\u09AF\u09BC\u09C7\u09B0 \u099C\u09BE\u09AF\u09BC\u0997\u09BE \u09B2\u09BE\u0997\u09B2\u09C7 \u09B8\u09C7\u0987 \u09AC\u0987\u099F\u09BE \u09B8\u09B0\u09BE\u0993 \u09AF\u09C7\u099F\u09BE \u09B8\u09AC\u099A\u09C7\u09AF\u09BC\u09C7 \u09AC\u09C7\u09B6\u09BF \u09B8\u09AE\u09AF\u09BC \u09A7\u09B0\u09C7 \u0995\u09C7\u0989 \u099B\u09CB\u0981\u09AF\u09BC\u09A8\u09BF\u0964"},question:"Implement an LRU (Least Recently Used) cache with O(1) get and put.",answer:"Use collections.OrderedDict, which keeps keys in order and supports move_to_end() and popitem(last=False) in O(1). On get, return -1 if the key is missing, otherwise move the key to the end (most recently used) and return its value. On put, update or insert the key, move it to the end, and if the size exceeds capacity remove the first item, which is the least recently used. Internally this is a hash map plus a doubly linked list; for caching function results, functools.lru_cache(maxsize=...) gives the same policy as a decorator.",points:["OrderedDict = hash map + doubly linked list \u2192 O(1) get/put","move_to_end(key) marks as most recently used; popitem(last=False) evicts the oldest","Both get and put count as 'use'","Without OrderedDict: dict + your own doubly linked list with head/tail sentinels","@functools.lru_cache(maxsize=128) memoises a function; cache_info() shows hits/misses","This class is not thread-safe \u2014 wrap get/put with a threading.Lock if shared across threads"],code:`from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.data = OrderedDict()
    def get(self, key):
        if key not in self.data:
            return -1
        self.data.move_to_end(key)          # mark as most recently used
        return self.data[key]
    def put(self, key, value):
        if key in self.data:
            self.data.move_to_end(key)
        self.data[key] = value
        if len(self.data) > self.capacity:
            self.data.popitem(last=False)   # evict least recently used
cache = LRUCache(2)
cache.put("a", 1); cache.put("b", 2)
print(cache.get("a"))        # "a" is now most recent
cache.put("c", 3)            # evicts "b"
print(cache.get("b"), cache.get("c"), list(cache.data))
# Output:
# 1
# -1 3 ['a', 'c']`},{id:"pc-10",level:"mid",topic:"py-coding",difficulty:"medium",simple:{hi:"Socho do line mein bachche height ke hisaab se khade hain. Aap dono line ke aage wale bachchon ko dekhte ho, jo chhota hai use nayi line mein bhejte ho, aur yahi dohraate ho. End mein ek hi line banti hai, height ke order mein.",en:"Imagine children standing in two lines, each sorted by height. You look at the front child of both lines, send the shorter one to the new line, and repeat. In the end you get one single line in height order.",bn:"\u09AD\u09BE\u09AC\u09CB \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u09B0\u09BE \u0989\u099A\u09CD\u099A\u09A4\u09BE \u0985\u09A8\u09C1\u09AF\u09BE\u09AF\u09BC\u09C0 \u09A6\u09C1\u099F\u09CB \u09B2\u09BE\u0987\u09A8\u09C7 \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u0986\u099B\u09C7\u0964 \u09A4\u09C1\u09AE\u09BF \u09A6\u09C1\u0987 \u09B2\u09BE\u0987\u09A8\u09C7\u09B0 \u09B8\u09BE\u09AE\u09A8\u09C7\u09B0 \u09AC\u09BE\u099A\u09CD\u099A\u09BE\u0995\u09C7 \u09A6\u09C7\u0996\u09CB, \u09AF\u09C7 \u099B\u09CB\u099F \u09A4\u09BE\u0995\u09C7 \u09A8\u09A4\u09C1\u09A8 \u09B2\u09BE\u0987\u09A8\u09C7 \u09AA\u09BE\u09A0\u09BE\u0993, \u0986\u09B0 \u098F\u099F\u09BE\u0987 \u09AC\u09BE\u09B0\u09AC\u09BE\u09B0 \u0995\u09B0\u09CB\u0964 \u09B6\u09C7\u09B7\u09C7 \u0989\u099A\u09CD\u099A\u09A4\u09BE\u09B0 \u0995\u09CD\u09B0\u09AE\u09C7 \u098F\u0995\u099F\u09BE\u0987 \u09B2\u09BE\u0987\u09A8 \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC\u0964"},question:"Merge two sorted lists into one sorted list without calling sort().",answer:"Use two pointers, one per list: compare the current elements, append the smaller one and advance that pointer, until one list is exhausted; then append the remaining tail of the other list. This is the merge step of merge sort and runs in O(n + m) time with O(n + m) space for the output. Using <= when comparing keeps the merge stable, and heapq.merge does the same lazily for any number of sorted iterables.",points:["Two pointers i and j, compare a[i] and b[j]","After the loop, extend with a[i:] and b[j:] \u2014 one of them is empty","O(n + m) time vs O((n + m) log(n + m)) for sorted(a + b)","<= keeps equal elements from the first list first (stable)","heapq.merge(*lists) merges k sorted iterables lazily"],code:`import heapq

def merge(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:          # <= keeps the merge stable
            out.append(a[i]); i += 1
        else:
            out.append(b[j]); j += 1
    out.extend(a[i:])             # one of these is empty
    out.extend(b[j:])
    return out

print(merge([1, 3, 5, 7], [2, 4, 6]))
print(merge([], [1, 2]))
print(merge([1, 1, 4], [1, 2, 9, 10]))

print(list(heapq.merge([1, 3, 5], [2, 4, 6])))

# Output:
# [1, 2, 3, 4, 5, 6, 7]
# [1, 2]
# [1, 1, 1, 2, 4, 9, 10]
# [1, 2, 3, 4, 5, 6]`},{id:"pw-1",level:"fresher",topic:"py-web",difficulty:"easy",simple:{hi:"MVT ek restaurant jaisa hai. Model godown hai jahan saara saamaan (data) rakha hai, View waiter hai jo order (request) leke kitchen se cheez laata hai, aur Template sundar plate hai jismein khana serve hota hai. Menu card (URL) batata hai kaunsa waiter kaam karega.",en:"MVT is like a restaurant. The Model is the store room where all the stuff (data) is kept, the View is the waiter who takes your order (request) and fetches things, and the Template is the nice plate the food is served on. The menu card (URL) decides which waiter handles your order.",bn:"MVT \u098F\u0995\u099F\u09BE \u09B0\u09C7\u09B8\u09CD\u099F\u09C1\u09B0\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 Model \u09B9\u09B2\u09CB \u0997\u09C1\u09A6\u09BE\u09AE \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09B8\u09AC \u099C\u09BF\u09A8\u09BF\u09B8 (data) \u09B0\u09BE\u0996\u09BE \u09A5\u09BE\u0995\u09C7, View \u09B9\u09B2\u09CB \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0 \u09AF\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 (request) \u09A8\u09BF\u09AF\u09BC\u09C7 \u099C\u09BF\u09A8\u09BF\u09B8 \u09A8\u09BF\u09AF\u09BC\u09C7 \u0986\u09B8\u09C7, \u0986\u09B0 Template \u09B9\u09B2\u09CB \u09B8\u09C1\u09A8\u09CD\u09A6\u09B0 \u09A5\u09BE\u09B2\u09BE \u09AF\u09BE\u09A4\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0 \u09AA\u09B0\u09BF\u09AC\u09C7\u09B6\u09A8 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u0964 \u09AE\u09C7\u09A8\u09C1 \u0995\u09BE\u09B0\u09CD\u09A1 (URL) \u09A0\u09BF\u0995 \u0995\u09B0\u09C7 \u0995\u09CB\u09A8 \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0 \u0995\u09BE\u099C\u099F\u09BE \u0995\u09B0\u09AC\u09C7\u0964"},question:"Explain Django's MVT architecture and how a request flows through Django.",answer:"Django follows Model\u2013View\u2013Template: the Model defines data and talks to the database through the ORM, the View is a Python function or class that receives an HttpRequest, runs the business logic and returns an HttpResponse, and the Template is HTML with the Django Template Language for presentation. Django itself plays the 'controller' role through its URL dispatcher. A request goes from the web server to the WSGI/ASGI handler, through the middleware, to the URLconf that picks a view; the view uses models and renders a template, and the response travels back through the middleware to the client.",points:["Model = data + ORM, View = logic (request in, response out), Template = presentation","MVT's View is roughly MVC's Controller, and MVT's Template is MVC's View","Flow: server \u2192 WSGI/ASGI handler \u2192 middleware \u2192 urls.py \u2192 view \u2192 model/template \u2192 response \u2192 middleware","Views can be function-based (FBV) or class-based (CBV, generic views)","render() combines a template with a context dict and returns an HttpResponse"],code:`# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path("books/<int:pk>/", views.book_detail, name="book-detail"),
]

# views.py
from django.shortcuts import get_object_or_404, render
from .models import Book

def book_detail(request, pk):
    book = get_object_or_404(Book, pk=pk)                         # Model (ORM query)
    return render(request, "books/detail.html", {"book": book})  # Template

# templates/books/detail.html
# <h1>{{ book.title }}</h1>
# <p>by {{ book.author.name }}</p>`},{id:"pw-2",level:"junior",topic:"py-web",difficulty:"medium",simple:{hi:"QuerySet ek shopping list jaisa hai. Aap list mein cheezein likhte rehte ho (filter, order_by), par dukaan tab tak nahi jaate jab tak saamaan sach mein chahiye na ho. Ek baar le aaye to ghar mein rakh lete ho, dobara dukaan nahi jaana padta.",en:"A QuerySet is like a shopping list. You keep adding items to the list (filter, order_by), but you don't go to the shop until you actually need the things. Once you bring them home you keep them, so you don't have to go to the shop again.",bn:"QuerySet \u098F\u0995\u099F\u09BE \u09AC\u09BE\u099C\u09BE\u09B0\u09C7\u09B0 \u09AB\u09B0\u09CD\u09A6\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A4\u09C1\u09AE\u09BF \u09AB\u09B0\u09CD\u09A6\u09C7 \u099C\u09BF\u09A8\u09BF\u09B8 \u09B2\u09BF\u0996\u09C7 \u09AF\u09BE\u0993 (filter, order_by), \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u09B8\u09A4\u09CD\u09AF\u09BF\u0987 \u09A6\u09B0\u0995\u09BE\u09B0 \u09A8\u09BE \u09B9\u0993\u09AF\u09BC\u09BE \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7 \u09AF\u09BE\u0993 \u09A8\u09BE\u0964 \u098F\u0995\u09AC\u09BE\u09B0 \u099C\u09BF\u09A8\u09BF\u09B8 \u09A8\u09BF\u09AF\u09BC\u09C7 \u098F\u09B2\u09C7 \u09AC\u09BE\u09A1\u09BC\u09BF\u09A4\u09C7 \u09B0\u09C7\u0996\u09C7 \u09A6\u09BE\u0993, \u0986\u09AC\u09BE\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7 \u09AF\u09C7\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"What does it mean that Django QuerySets are lazy? When is a QuerySet actually evaluated?",answer:"Creating or chaining a QuerySet (filter, exclude, order_by, slicing without a step) only builds a SQL query object \u2014 no database hit happens. The query runs when the QuerySet is evaluated: iterating it, calling list(), len() or bool(), printing/repr, slicing with a step, or pickling. After evaluation the results are cached on that QuerySet object, so iterating it again does not query the database again.",points:["Chaining filters is free \u2014 each call returns a new, still-lazy QuerySet","Evaluated by: iteration, list(), len(), bool()/if, repr()/print, step slicing, pickling","Results are cached on the evaluated QuerySet object; a fresh QuerySet queries again","Use exists() and count() when you do not need the rows; qs.query shows the SQL without running it","For huge result sets, iterator() streams rows without filling the cache"],code:`qs = Book.objects.filter(published=True)          # no SQL yet
qs = qs.exclude(price__gt=500).order_by("title")  # still no SQL
top10 = qs[:10]                                   # still lazy: adds LIMIT 10
print(qs.query)                                   # shows the SQL, does not run it

books = list(qs)        # SQL runs now; results cached on qs
for b in qs:            # no new query - uses the cache
    print(b.title)

if Book.objects.filter(title="Gitanjali").exists():  # cheap SELECT ... LIMIT 1
    ...`},{id:"pw-3",level:"mid",topic:"py-web",difficulty:"hard",simple:{hi:"N+1 aisa hai jaise teacher 100 bachchon ki copy ke liye har bachche ke ghar alag-alag jaaye. select_related ek hi trip mein copy aur naam saath le aata hai, aur prefetch_related ek baar mein saari copies ek bag mein mangwa leta hai. 201 trip ki jagah sirf 2 trip!",en:"N+1 is like a teacher going to each of 100 students' houses separately to collect their notebooks. select_related brings the name and notebook together in one trip, and prefetch_related collects all the notebooks in one bag at once. Only 2 trips instead of 201!",bn:"N+1 \u09AE\u09BE\u09A8\u09C7 \u09AF\u09C7\u09A8 \u09B6\u09BF\u0995\u09CD\u09B7\u0995 \u09E7\u09E6\u09E6 \u099C\u09A8 \u099B\u09BE\u09A4\u09CD\u09B0\u09C7\u09B0 \u0996\u09BE\u09A4\u09BE \u0986\u09A8\u09A4\u09C7 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995\u09C7\u09B0 \u09AC\u09BE\u09A1\u09BC\u09BF\u09A4\u09C7 \u0986\u09B2\u09BE\u09A6\u09BE \u0995\u09B0\u09C7 \u09AF\u09BE\u099A\u09CD\u099B\u09C7\u09A8\u0964 select_related \u098F\u0995 \u09AF\u09BE\u09A4\u09CD\u09B0\u09BE\u09AF\u09BC \u09A8\u09BE\u09AE \u0986\u09B0 \u0996\u09BE\u09A4\u09BE \u098F\u0995\u09B8\u0999\u09CD\u0997\u09C7 \u09A8\u09BF\u09AF\u09BC\u09C7 \u0986\u09B8\u09C7, \u0986\u09B0 prefetch_related \u098F\u0995\u09AC\u09BE\u09B0\u09C7 \u09B8\u09AC \u0996\u09BE\u09A4\u09BE \u098F\u0995\u099F\u09BE \u09AC\u09CD\u09AF\u09BE\u0997\u09C7 \u0986\u09A8\u09BF\u09AF\u09BC\u09C7 \u09A8\u09C7\u09AF\u09BC\u0964 \u09E8\u09E6\u09E7 \u09AC\u09BE\u09B0\u09C7\u09B0 \u09AC\u09A6\u09B2\u09C7 \u09AE\u09BE\u09A4\u09CD\u09B0 \u09E8 \u09AC\u09BE\u09B0 \u09AF\u09BE\u0993\u09AF\u09BC\u09BE!"},question:"Scenario: a Django page listing 100 books with their author and tags fires about 201 SQL queries. What is the N+1 problem, and how do select_related and prefetch_related fix it?",answer:"N+1 means one query fetches the list, then accessing a related object inside the loop fires one extra query per row (here: 1 for books + 100 for authors + 100 for tags). select_related follows ForeignKey and OneToOne relations with a SQL JOIN, so the author arrives in the same query. prefetch_related is for ManyToMany and reverse ForeignKey relations: it runs one extra query per relation (WHERE id IN (...)) and joins the results in Python. Together they turn 201 queries into 2.",points:["select_related \u2192 SQL JOIN, single query, for ForeignKey / OneToOne (forward)","prefetch_related \u2192 separate query per relation, stitched in Python, for ManyToMany / reverse FK","Use a Prefetch object to filter or order the prefetched rows","Calling .filter() on a prefetched relation ignores the cache and queries again","Detect it with django-debug-toolbar, connection.queries or assertNumQueries in tests"],code:`# Book.author = ForeignKey(Author), Book.tags = ManyToManyField(Tag)

# N+1: 1 query for books + 1 per book for author + 1 per book for tags
for book in Book.objects.all():
    print(book.author.name, [t.name for t in book.tags.all()])

# Fixed: 2 queries in total
books = (Book.objects
         .select_related("author")    # JOIN in the same query
         .prefetch_related("tags"))   # 1 extra query: ... WHERE book_id IN (...)
for book in books:
    print(book.author.name, [t.name for t in book.tags.all()])

# Filter what gets prefetched (assumes related_name="books" on Book.author)
from django.db.models import Prefetch
Author.objects.prefetch_related(
    Prefetch("books", queryset=Book.objects.filter(published=True))
)`},{id:"pw-4",level:"fresher",topic:"py-web",difficulty:"easy",simple:{hi:"Migration ghar ke naksha (blueprint) ki history jaisa hai. Har baar aap ek naya kamra banwate ho to naksha ka ek naya page banta hai (makemigrations), aur mistri us page ko dekh ke asli deewar banata hai (migrate). Sab page sambhal ke rakhte ho taaki kisi aur ghar mein bhi same ghar ban sake.",en:"Migrations are like the history of a house's blueprint. Every time you add a new room, a new blueprint page is made (makemigrations), and the mason builds the real wall by reading that page (migrate). You keep all pages safe so the same house can be built anywhere.",bn:"Migration \u09B9\u09B2\u09CB \u09AC\u09BE\u09A1\u09BC\u09BF\u09B0 \u09A8\u0995\u09B6\u09BE\u09B0 \u0987\u09A4\u09BF\u09B9\u09BE\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09BE\u09B0 \u09A8\u09A4\u09C1\u09A8 \u0998\u09B0 \u09AC\u09BE\u09A8\u09BE\u09B2\u09C7 \u09A8\u0995\u09B6\u09BE\u09B0 \u098F\u0995\u099F\u09BE \u09A8\u09A4\u09C1\u09A8 \u09AA\u09BE\u09A4\u09BE \u09A4\u09C8\u09B0\u09BF \u09B9\u09AF\u09BC (makemigrations), \u0986\u09B0 \u09AE\u09BF\u09B8\u09CD\u09A4\u09CD\u09B0\u09BF \u09B8\u09C7\u0987 \u09AA\u09BE\u09A4\u09BE \u09A6\u09C7\u0996\u09C7 \u0986\u09B8\u09B2 \u09A6\u09C7\u0993\u09AF\u09BC\u09BE\u09B2 \u09A4\u09CB\u09B2\u09C7 (migrate)\u0964 \u09B8\u09AC \u09AA\u09BE\u09A4\u09BE \u09AF\u09A4\u09CD\u09A8 \u0995\u09B0\u09C7 \u09B0\u09BE\u0996\u09BE \u09B9\u09AF\u09BC \u09AF\u09BE\u09A4\u09C7 \u0985\u09A8\u09CD\u09AF \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09A4\u09C7\u0993 \u098F\u0995\u0987 \u09AC\u09BE\u09A1\u09BC\u09BF \u09AC\u09BE\u09A8\u09BE\u09A8\u09CB \u09AF\u09BE\u09AF\u09BC\u0964"},question:"What are Django migrations? Explain makemigrations, migrate and data migrations.",answer:"Migrations are version-controlled Python files that describe changes to your models (new table, new field, changed constraint) so the database schema can evolve safely. makemigrations compares the models with the existing migration files and generates new ones; migrate applies the pending migrations to the database and records them in the django_migrations table. A data migration uses RunPython to change data (not schema), and should load models through apps.get_model() to get the historical version.",points:["makemigrations creates files, migrate applies them \u2014 commit migration files to git","showmigrations lists applied/pending; sqlmigrate shows the SQL of one migration","Roll back with migrate <app> <earlier_migration_name>","Data migrations: RunPython with apps.get_model(), plus a reverse function or RunPython.noop","Avoid editing applied migrations; squashmigrations can merge a long history"],code:`# python manage.py makemigrations          -> creates 0002_book_slug.py etc.
# python manage.py migrate                 -> applies pending migrations
# python manage.py showmigrations          -> [X] applied  [ ] pending
# python manage.py makemigrations books --empty   -> blank file for a data migration

# books/migrations/0003_fill_slugs.py
from django.db import migrations
from django.utils.text import slugify

def fill_slugs(apps, schema_editor):
    Book = apps.get_model("books", "Book")   # historical model, not a direct import
    for book in Book.objects.filter(slug=""):
        book.slug = slugify(book.title)
        book.save(update_fields=["slug"])

class Migration(migrations.Migration):
    dependencies = [("books", "0002_book_slug")]
    operations = [migrations.RunPython(fill_slugs, migrations.RunPython.noop)]`},{id:"pw-5",level:"junior",topic:"py-web",difficulty:"medium",simple:{hi:"Middleware school ke gate par khade security guards jaisa hai. Har bachcha andar jaate waqt ek-ek guard se guzarta hai (ID check, bag check), aur bahar aate waqt ulte order mein. Guards ka order galat ho to ID check se pehle hi bag check ho jaayega.",en:"Middleware is like security guards standing at a school gate. Every child passes each guard one by one when going in (ID check, bag check), and in the reverse order when coming out. If the guards stand in the wrong order, the bag check may happen before the ID check.",bn:"Middleware \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u0997\u09C7\u099F\u09C7 \u09A6\u09BE\u0981\u09A1\u09BC\u09BE\u09A8\u09CB \u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE\u09B0\u0995\u09CD\u09B7\u09C0\u09A6\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09AD\u09C7\u09A4\u09B0\u09C7 \u09A2\u09CB\u0995\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BE \u09AC\u09BE\u099A\u09CD\u099A\u09BE \u098F\u0995\u09C7 \u098F\u0995\u09C7 \u09AA\u09CD\u09B0\u09A4\u09CD\u09AF\u09C7\u0995 \u09B0\u0995\u09CD\u09B7\u09C0\u09B0 \u0995\u09BE\u099B \u09A6\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AF\u09BC (ID check, \u09AC\u09CD\u09AF\u09BE\u0997 check), \u0986\u09B0 \u09AC\u09C7\u09B0\u09CB\u09A8\u09CB\u09B0 \u09B8\u09AE\u09AF\u09BC \u0989\u09B2\u09CD\u099F\u09CB \u0995\u09CD\u09B0\u09AE\u09C7\u0964 \u09B0\u0995\u09CD\u09B7\u09C0\u09A6\u09C7\u09B0 \u0995\u09CD\u09B0\u09AE \u09AD\u09C1\u09B2 \u09B9\u09B2\u09C7 ID check-\u098F\u09B0 \u0986\u0997\u09C7\u0987 \u09AC\u09CD\u09AF\u09BE\u0997 check \u09B9\u09AF\u09BC\u09C7 \u09AF\u09BE\u09AC\u09C7\u0964"},question:"What is middleware in Django? How do you write a custom middleware and why does the order matter?",answer:"Middleware is a chain of hooks that wraps every request and response globally \u2014 used for security headers, sessions, authentication, CSRF, logging and timing. A custom middleware is a callable (usually a class) that receives get_response once at startup and, for each request, runs code before calling get_response (towards the view) and after it (on the response). Order in the MIDDLEWARE setting matters because requests pass top-to-bottom and responses bottom-to-top, and some middleware depends on others, e.g. AuthenticationMiddleware needs SessionMiddleware before it.",points:["__init__(get_response) runs once; __call__(request) runs per request","Request phase: top \u2192 bottom; response phase: bottom \u2192 top (like an onion)","Returning a response without calling get_response short-circuits the chain","Optional hooks: process_view, process_exception, process_template_response","AuthenticationMiddleware must come after SessionMiddleware; middleware can be async-capable"],code:`# myapp/middleware.py
import logging, time
logger = logging.getLogger(__name__)

class TimingMiddleware:
    def __init__(self, get_response):          # once, at server start
        self.get_response = get_response

    def __call__(self, request):
        start = time.perf_counter()             # before the view
        response = self.get_response(request)   # next middleware / the view
        ms = (time.perf_counter() - start) * 1000
        response["X-Response-Time"] = f"{ms:.1f}ms"   # after the view
        logger.info("%s %s %.1fms", request.method, request.path, ms)
        return response

# settings.py
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "myapp.middleware.TimingMiddleware",
]`},{id:"pw-6",level:"junior",topic:"py-web",difficulty:"medium",simple:{hi:"Serializer ek translator aur checker dono hai. Bahar se aaya form (JSON) pehle check karta hai ki sab sahi bhara hai ya nahi, phir use database ki bhasha mein badal deta hai. Wapas jaate waqt database ka data JSON mein translate kar deta hai.",en:"A serializer is both a translator and a checker. It first checks that the form coming from outside (JSON) is filled in correctly, then turns it into the database's language. On the way back, it translates database data into JSON.",bn:"Serializer \u098F\u0995\u09B8\u0999\u09CD\u0997\u09C7 \u0985\u09A8\u09C1\u09AC\u09BE\u09A6\u0995 \u0986\u09B0 \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u0995\u0964 \u09AC\u09BE\u0987\u09B0\u09C7 \u09A5\u09C7\u0995\u09C7 \u0986\u09B8\u09BE \u09AB\u09B0\u09CD\u09AE (JSON) \u0986\u0997\u09C7 \u09A6\u09C7\u0996\u09C7 \u09A8\u09C7\u09AF\u09BC \u09A0\u09BF\u0995\u09A0\u09BE\u0995 \u09AD\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7 \u0995\u09BF\u09A8\u09BE, \u09A4\u09BE\u09B0\u09AA\u09B0 \u09B8\u09C7\u099F\u09BE\u0995\u09C7 database-\u098F\u09B0 \u09AD\u09BE\u09B7\u09BE\u09AF\u09BC \u09AC\u09A6\u09B2\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964 \u09AB\u09C7\u09B0\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC database-\u098F\u09B0 data-\u0995\u09C7 JSON-\u098F \u0985\u09A8\u09C1\u09AC\u09BE\u09A6 \u0995\u09B0\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964"},question:"What is a serializer in Django REST Framework? How do validation and save() work in a ModelSerializer?",answer:"A serializer converts complex data such as model instances and QuerySets into Python primitives that can be rendered as JSON, and in the other direction parses and validates incoming data. ModelSerializer generates fields and default create()/update() from a model. You pass data=request.data, call is_valid() \u2014 which runs field validation, validate_<field>() methods and validate() \u2014 then read validated_data or call save(), which calls create() for a new object or update() when an instance was passed.",points:["Serialization: instance \u2192 .data (dict) \u2192 JSON; deserialization: JSON \u2192 validated_data \u2192 model","is_valid(raise_exception=True) returns a 400 response with error details automatically","validate_<field>() for one field, validate(attrs) for cross-field rules","save() \u2192 create() if no instance, update() if instance was passed","read_only / write_only fields, source= for nested attributes, nested serializers for relations"],code:`from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source="author.name", read_only=True)

    class Meta:
        model = Book
        fields = ["id", "title", "price", "author", "author_name"]
        read_only_fields = ["id"]

    def validate_price(self, value):        # field-level validation
        if value <= 0:
            raise serializers.ValidationError("Price must be positive.")
        return value

# in a view
serializer = BookSerializer(data=request.data)
serializer.is_valid(raise_exception=True)   # 400 with errors if invalid
book = serializer.save()                    # calls create(); with instance=... calls update()
BookSerializer(book).data                   # model -> dict, ready to render as JSON`},{id:"pw-7",level:"mid",topic:"py-web",difficulty:"medium",simple:{hi:"ViewSet ek dukaan ke counter jaisa hai jahan ek hi jagah dekhna, khareedna, badalna sab hota hai. Router dukaan ke bahar board laga deta hai ki kaunsa kaam kis khidki par hai. Permission woh niyam hai ki saamaan sab dekh sakte hain, par apna order sirf wahi badal sakta hai jisne diya.",en:"A ViewSet is like a single shop counter where you can look, buy and change things all in one place. The Router puts up boards outside telling which window does what. Permission is the rule that everyone can look at the items, but only the person who placed an order can change it.",bn:"ViewSet \u09B9\u09B2\u09CB \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u098F\u0995\u099F\u09BE \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0\u09C7\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7\u0996\u09BE\u09A8\u09C7 \u09A6\u09C7\u0996\u09BE, \u0995\u09C7\u09A8\u09BE, \u09AC\u09A6\u09B2\u09BE\u09A8\u09CB \u09B8\u09AC \u098F\u0995 \u099C\u09BE\u09AF\u09BC\u0997\u09BE\u09AF\u09BC \u09B9\u09AF\u09BC\u0964 Router \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u09AC\u09BE\u0987\u09B0\u09C7 \u09AC\u09CB\u09B0\u09CD\u09A1 \u099F\u09BE\u0999\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC \u0995\u09CB\u09A8 \u099C\u09BE\u09A8\u09BE\u09B2\u09BE\u09AF\u09BC \u0995\u09CB\u09A8 \u0995\u09BE\u099C\u0964 Permission \u09B9\u09B2\u09CB \u09A8\u09BF\u09AF\u09BC\u09AE \u09AF\u09C7 \u099C\u09BF\u09A8\u09BF\u09B8 \u09B8\u09AC\u09BE\u0987 \u09A6\u09C7\u0996\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7, \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09AC\u09A6\u09B2\u09BE\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C7\u0987 \u09AE\u09BE\u09A8\u09C1\u09B7 \u09AF\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0\u099F\u09BE \u09A6\u09BF\u09AF\u09BC\u09C7\u099B\u09C7\u0964"},question:"Explain ViewSets, Routers and permissions in Django REST Framework. How would you allow only the owner to edit an object?",answer:"A ViewSet groups the actions for one resource (list, create, retrieve, update, partial_update, destroy) in one class; ModelViewSet implements them all from a queryset and serializer_class. A Router registers the ViewSet and generates the URL patterns automatically (/books/ and /books/{pk}/). Permissions decide access: has_permission() runs for every request, and has_object_permission() runs when get_object() loads a single object \u2014 so an 'owner only' rule is a custom BasePermission that allows SAFE_METHODS for everyone and writes only when obj.owner == request.user.",points:["ModelViewSet = full CRUD; ReadOnlyModelViewSet = list + retrieve only","DefaultRouter also adds an API root view; give basename= if the ViewSet has no queryset",'@action(detail=True, methods=["post"]) adds custom endpoints like /books/{pk}/publish/',"Built-ins: AllowAny, IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly","has_object_permission is not checked for list views \u2014 filter the queryset in get_queryset() instead"],code:`from rest_framework import permissions, viewsets
from rest_framework.routers import DefaultRouter

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:   # GET, HEAD, OPTIONS
            return True
        return obj.owner == request.user

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.select_related("owner")
    serializer_class = BookSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)        # set owner on create

# urls.py
router = DefaultRouter()
router.register("books", BookViewSet)   # /books/  and  /books/{pk}/
urlpatterns = router.urls`},{id:"pw-8",level:"junior",topic:"py-web",difficulty:"medium",simple:{hi:"Session ek cinema hall ke hath par lagne wale stamp jaisa hai. Ticket (password) ek baar gate par check hota hai, phir hath par stamp (sessionid cookie) lag jaata hai. Break ke baad wapas aao to sirf stamp dikhana padta hai, poori details office ke register (server) mein rehti hain.",en:"A session is like the hand stamp at a cinema hall. Your ticket (password) is checked once at the gate, then you get a stamp (sessionid cookie) on your hand. After the interval you only show the stamp, while the full details stay in the office register (server).",bn:"Session \u09B9\u09B2\u09CB \u09B8\u09BF\u09A8\u09C7\u09AE\u09BE \u09B9\u09B2\u09C7 \u09B9\u09BE\u09A4\u09C7 \u09B2\u09BE\u0997\u09BE\u09A8\u09CB \u099B\u09BE\u09AA\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u099F\u09BF\u0995\u09BF\u099F (password) \u098F\u0995\u09AC\u09BE\u09B0 \u0997\u09C7\u099F\u09C7 \u09A6\u09C7\u0996\u09BE \u09B9\u09AF\u09BC, \u09A4\u09BE\u09B0\u09AA\u09B0 \u09B9\u09BE\u09A4\u09C7 \u098F\u0995\u099F\u09BE \u099B\u09BE\u09AA (sessionid cookie) \u09B2\u09BE\u0997\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964 \u09AC\u09BF\u09B0\u09A4\u09BF\u09B0 \u09AA\u09B0 \u09AB\u09BF\u09B0\u09B2\u09C7 \u09B6\u09C1\u09A7\u09C1 \u099B\u09BE\u09AA\u099F\u09BE \u09A6\u09C7\u0996\u09BE\u09B2\u09C7\u0987 \u09B9\u09AF\u09BC, \u09AA\u09C1\u09B0\u09CB \u09AC\u09BF\u09AC\u09B0\u09A3 \u0985\u09AB\u09BF\u09B8\u09C7\u09B0 \u0996\u09BE\u09A4\u09BE\u09AF\u09BC (server) \u09A5\u09BE\u0995\u09C7\u0964"},question:"How do authentication and sessions work in Django?",answer:"django.contrib.auth provides the User model, password hashing and the authenticate(), login() and logout() functions. authenticate() checks credentials against the configured authentication backends; login() stores the user's id in the session and rotates the session key, and AuthenticationMiddleware then sets request.user on every request. The session data lives on the server (database by default, or cache/signed cookies) while the browser only holds a sessionid cookie; logout() flushes the session.",points:["Passwords are stored hashed (PBKDF2 by default, Argon2/bcrypt optional) \u2014 never plain text","SessionMiddleware must come before AuthenticationMiddleware","Protect views with @login_required or LoginRequiredMixin; request.user is AnonymousUser when logged out","Set SESSION_COOKIE_SECURE / CSRF_COOKIE_SECURE in production; the session cookie is HttpOnly by default","Decide on a custom user model (AUTH_USER_MODEL) at the start of the project"],code:`from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect, render

def login_view(request):
    if request.method == "POST":
        user = authenticate(request, username=request.POST["username"],
                            password=request.POST["password"])   # checks the hash
        if user is not None:
            login(request, user)          # saves user id in the session
            return redirect("dashboard")
        return render(request, "login.html", {"error": "Invalid credentials"})
    return render(request, "login.html")

@login_required                           # anonymous users go to LOGIN_URL
def dashboard(request):
    request.session["visits"] = request.session.get("visits", 0) + 1
    return render(request, "dashboard.html", {"user": request.user})

def logout_view(request):                 # call it from a POST form
    logout(request)                       # flushes the session
    return redirect("login")`},{id:"pw-9",level:"mid",topic:"py-web",difficulty:"medium",simple:{hi:"Signal school ki ghanti jaisa hai. Ghanti bajti hai (event) aur jo bhi us ghanti ko sun raha hai \u2014 canteen wale, chowkidar \u2014 apna kaam shuru kar dete hain, bina principal ke alag se bataye. Par bahut saari ghantiyan ho jaayein to samajh nahi aata kaun kya kar raha hai.",en:"A signal is like a school bell. When the bell rings (event), everyone listening \u2014 the canteen staff, the guard \u2014 starts their own job without the principal telling each of them. But with too many bells, nobody understands who is doing what.",bn:"Signal \u09B9\u09B2\u09CB \u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u0998\u09A3\u09CD\u099F\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u0998\u09A3\u09CD\u099F\u09BE \u09AC\u09BE\u099C\u09B2\u09C7 (event) \u09AF\u09BE\u09B0\u09BE \u09B6\u09C1\u09A8\u099B\u09C7 \u2014 \u0995\u09CD\u09AF\u09BE\u09A8\u09CD\u099F\u09BF\u09A8\u09C7\u09B0 \u09B2\u09CB\u0995, \u09A6\u09BE\u09B0\u09CB\u09AF\u09BC\u09BE\u09A8 \u2014 \u09AA\u09CD\u09B0\u09BF\u09A8\u09CD\u09B8\u09BF\u09AA\u09BE\u09B2\u09C7\u09B0 \u0986\u09B2\u09BE\u09A6\u09BE \u0995\u09B0\u09C7 \u09A8\u09BE \u09AC\u09B2\u09C7\u0993 \u09A8\u09BF\u099C\u09C7\u09B0 \u0995\u09BE\u099C \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0996\u09C1\u09AC \u09AC\u09C7\u09B6\u09BF \u0998\u09A3\u09CD\u099F\u09BE \u09B9\u09B2\u09C7 \u0995\u09C7 \u0995\u09C0 \u0995\u09B0\u099B\u09C7 \u09AC\u09CB\u099D\u09BE \u09AF\u09BE\u09AF\u09BC \u09A8\u09BE\u0964"},question:"What are Django signals? Give an example and explain their pitfalls.",answer:"Signals let decoupled code react to events: a sender dispatches a signal and every connected receiver runs. Common built-ins are pre_save/post_save, pre_delete/post_delete, m2m_changed and request_started/request_finished. Receivers run synchronously in the same thread and database transaction as the sender, so slow work slows the request and side effects like emails should be deferred with transaction.on_commit(). They are not sent by QuerySet.update(), bulk_create() or raw SQL, and overusing them hides logic, so prefer explicit service functions for core business rules.",points:["Connect with @receiver and import the module in AppConfig.ready()","post_save gives sender, instance, created, update_fields among its kwargs","Synchronous, same transaction \u2014 an exception in a receiver breaks the save","Not fired by update(), bulk_create() or raw SQL","Use dispatch_uid to avoid duplicate connections; prefer explicit calls for core logic"],code:`# accounts/signals.py
from django.conf import settings
from django.db import transaction
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from .emails import send_welcome_email

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        # side effect only after the transaction commits
        transaction.on_commit(lambda: send_welcome_email(instance.pk))

# accounts/apps.py
from django.apps import AppConfig

class AccountsConfig(AppConfig):
    name = "accounts"

    def ready(self):
        from . import signals  # noqa: F401  (connects the receivers)`},{id:"pw-10",level:"fresher",topic:"py-web",difficulty:"easy",simple:{hi:"Flask ek chhoti chai ki tapri jaisi hai \u2014 shuru karna aasaan, jo chahiye wahi jodo. Route menu ki line hai ('chai' maango to chai milegi), blueprint alag counter hai (ek chai ka, ek snacks ka), aur app context woh dukaan hai jiske andar hi kaam ho sakta hai.",en:"Flask is like a small tea stall \u2014 easy to start, and you add only what you need. A route is a line on the menu (ask for 'tea', get tea), a blueprint is a separate counter (one for tea, one for snacks), and the app context is the shop inside which work can happen.",bn:"Flask \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u099B\u09CB\u099F \u099A\u09BE\u09AF\u09BC\u09C7\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09BE \u09B8\u09B9\u099C, \u09AF\u09BE \u09B2\u09BE\u0997\u09C7 \u09B6\u09C1\u09A7\u09C1 \u09B8\u09C7\u099F\u09BE\u0987 \u09AF\u09CB\u0997 \u0995\u09B0\u09CB\u0964 Route \u09B9\u09B2\u09CB \u09AE\u09C7\u09A8\u09C1\u09B0 \u098F\u0995\u099F\u09BE \u09B2\u09BE\u0987\u09A8 ('\u099A\u09BE' \u099A\u09BE\u0987\u09B2\u09C7 \u099A\u09BE \u09AA\u09BE\u09AC\u09C7), blueprint \u09B9\u09B2\u09CB \u0986\u09B2\u09BE\u09A6\u09BE \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0 (\u098F\u0995\u099F\u09BE \u099A\u09BE\u09AF\u09BC\u09C7\u09B0, \u098F\u0995\u099F\u09BE \u099C\u09B2\u0996\u09BE\u09AC\u09BE\u09B0\u09C7\u09B0), \u0986\u09B0 app context \u09B9\u09B2\u09CB \u09B8\u09C7\u0987 \u09A6\u09CB\u0995\u09BE\u09A8 \u09AF\u09BE\u09B0 \u09AD\u09C7\u09A4\u09B0\u09C7\u0987 \u0995\u09BE\u099C \u09B9\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u0964"},question:"Explain Flask basics: routes, blueprints and the application context.",answer:"Flask is a micro-framework: you create an app with Flask(__name__) and map URLs to functions with @app.route (or shortcuts like @app.get/@app.post). Blueprints group related routes, templates and static files into reusable modules that are registered on the app, often with a url_prefix, and are usually combined with an application factory create_app(). Flask uses contexts so that globals stay per-request: the application context provides current_app and g, and the request context provides request and session; outside a request (scripts, tests, CLI) you push one with app.app_context().",points:['@app.route("/path", methods=["GET", "POST"]) with variable rules like <int:id>','Blueprint("name", __name__, url_prefix=...) + app.register_blueprint(bp)',"Application factory create_app() avoids global state and helps testing","App context: current_app, g; request context: request, session","Run locally with flask --app <module> run --debug; use a WSGI server in production"],code:`# app/__init__.py  (application factory)
from flask import Flask
from .auth import bp as auth_bp

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "change-me"
    app.register_blueprint(auth_bp)
    return app

# app/auth.py  (a blueprint groups related routes)
from flask import Blueprint, current_app, g, jsonify, request

bp = Blueprint("auth", __name__, url_prefix="/auth")

@bp.get("/hello/<name>")                      # GET /auth/hello/Asha
def hello(name):
    g.lang = request.args.get("lang", "en")     # g lives for one request
    return jsonify(message=f"Hello {name}", app=current_app.name)

# outside a request (script / test):
# with app.app_context():
#     print(current_app.config["SECRET_KEY"])`},{id:"pw-11",level:"junior",topic:"py-web",difficulty:"medium",simple:{hi:"Pydantic model railway reservation form jaisa hai \u2014 galat umar ya khaali naam ho to clerk form wapas kar deta hai (422 error). Depends() ek helper jaisa hai jo aapke kaam ke liye zaroori cheezein (jaise pen, register) pehle se la kar de deta hai, aapko khud dhoondhna nahi padta.",en:"A Pydantic model is like a railway reservation form \u2014 if the age is wrong or the name is blank, the clerk hands it back (422 error). Depends() is like a helper who brings the things you need for the job (a pen, a register) before you start, so you don't have to fetch them yourself.",bn:"Pydantic model \u09B9\u09B2\u09CB \u09B0\u09C7\u09B2\u09C7\u09B0 \u09B0\u09BF\u099C\u09BE\u09B0\u09CD\u09AD\u09C7\u09B6\u09A8 \u09AB\u09B0\u09CD\u09AE\u09C7\u09B0 \u09AE\u09A4\u09CB \u2014 \u09AC\u09AF\u09BC\u09B8 \u09AD\u09C1\u09B2 \u09AC\u09BE \u09A8\u09BE\u09AE \u09AB\u09BE\u0981\u0995\u09BE \u09A5\u09BE\u0995\u09B2\u09C7 \u0995\u09CD\u09B2\u09BE\u09B0\u09CD\u0995 \u09AB\u09B0\u09CD\u09AE \u09AB\u09C7\u09B0\u09A4 \u09A6\u09C7\u09AF\u09BC (422 error)\u0964 Depends() \u09B9\u09B2\u09CB \u098F\u0995 \u09B8\u09B9\u0995\u09BE\u09B0\u09C0\u09B0 \u09AE\u09A4\u09CB \u09AF\u09C7 \u09A4\u09CB\u09AE\u09BE\u09B0 \u0995\u09BE\u099C\u09C7\u09B0 \u09A6\u09B0\u0995\u09BE\u09B0\u09BF \u099C\u09BF\u09A8\u09BF\u09B8 (\u0995\u09B2\u09AE, \u0996\u09BE\u09A4\u09BE) \u0986\u0997\u09C7\u0987 \u098F\u09A8\u09C7 \u09A6\u09C7\u09AF\u09BC, \u09A8\u09BF\u099C\u09C7 \u0996\u09C1\u0981\u099C\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"How do Pydantic models and dependency injection work in FastAPI?",answer:"FastAPI reads Python type hints: a parameter typed as a Pydantic BaseModel is parsed from the JSON body and validated, returning a 422 error with details if it is invalid, and response_model filters and documents the output. Path and query parameters are validated from their types too, and everything appears automatically in the OpenAPI docs at /docs. Dependency injection uses Depends(): FastAPI calls the dependency function (sync, async, or a generator with yield for setup/teardown like a DB session) and passes its result into the endpoint, which makes auth, DB sessions and settings reusable and easy to override in tests.",points:["Body \u2192 Pydantic model; path/query params \u2192 typed function arguments","Invalid input \u2192 automatic 422 Unprocessable Entity with field errors","response_model / return type controls and documents what is sent back","Depends() for DB sessions, current user, settings; yield-dependencies clean up after the response","app.dependency_overrides swaps dependencies in tests; Pydantic v2 uses model_dump()"],code:`from typing import Annotated
from fastapi import Depends, FastAPI, status
from pydantic import BaseModel, Field

app = FastAPI()
FAKE_DB: dict[int, dict] = {}

class ItemIn(BaseModel):
    name: str = Field(min_length=1, max_length=50)
    price: float = Field(gt=0)

class ItemOut(ItemIn):
    id: int

def get_db():                  # dependency; could yield a real DB session
    yield FAKE_DB              # code after yield runs after the response

DB = Annotated[dict, Depends(get_db)]

@app.post("/items", response_model=ItemOut, status_code=status.HTTP_201_CREATED)
async def create_item(item: ItemIn, db: DB):    # body validated by Pydantic
    item_id = len(db) + 1
    db[item_id] = item.model_dump()
    return {"id": item_id, **db[item_id]}`},{id:"pw-12",level:"fresher",topic:"py-web",difficulty:"easy",simple:{hi:"Django ek poora thali meal hai \u2014 dal, chawal, sabzi, mithai sab saath mein. Flask sirf roti hai, baaki aap apni pasand se jodo. FastAPI ek fast food counter hai jo order ka form check karke turant parcel deta hai \u2014 API ke liye bahut tez.",en:"Django is a full thali meal \u2014 dal, rice, sabzi and sweet all together. Flask is just the roti, and you add the rest as you like. FastAPI is a fast-food counter that checks your order form and hands over the parcel quickly \u2014 very fast for APIs.",bn:"Django \u09B9\u09B2\u09CB \u09AA\u09C1\u09B0\u09CB \u098F\u0995\u099F\u09BE \u09A5\u09BE\u09B2\u09BF \u2014 \u09A1\u09BE\u09B2, \u09AD\u09BE\u09A4, \u09A4\u09B0\u0995\u09BE\u09B0\u09BF, \u09AE\u09BF\u09B7\u09CD\u099F\u09BF \u09B8\u09AC \u098F\u0995\u09B8\u0999\u09CD\u0997\u09C7\u0964 Flask \u09B6\u09C1\u09A7\u09C1 \u09B0\u09C1\u099F\u09BF, \u09AC\u09BE\u0995\u09BF\u099F\u09BE \u09A8\u09BF\u099C\u09C7\u09B0 \u09AA\u099B\u09A8\u09CD\u09A6\u09AE\u09A4\u09CB \u09AF\u09CB\u0997 \u0995\u09B0\u09CB\u0964 FastAPI \u09B9\u09B2\u09CB \u09AB\u09BE\u09B8\u09CD\u099F \u09AB\u09C1\u09A1 \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0 \u09AF\u09C7 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0\u09C7\u09B0 \u09AB\u09B0\u09CD\u09AE \u09A6\u09C7\u0996\u09C7 \u0996\u09C1\u09AC \u09A4\u09BE\u09A1\u09BC\u09BE\u09A4\u09BE\u09A1\u09BC\u09BF \u09AA\u09BE\u09B0\u09CD\u09B8\u09C7\u09B2 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AF\u09BC \u2014 API-\u09B0 \u099C\u09A8\u09CD\u09AF \u0996\u09C1\u09AC \u09A6\u09CD\u09B0\u09C1\u09A4\u0964"},question:"Compare Django, Flask and FastAPI. When would you choose each?",answer:"Django is a 'batteries-included' full-stack framework with ORM, migrations, admin, auth, forms and templates built in \u2014 great for large, database-driven apps and fast delivery with conventions. Flask is a minimal WSGI micro-framework where you pick your own ORM, auth and structure \u2014 good for small services or when you want full control. FastAPI is an ASGI framework built for APIs: async support, Pydantic validation and automatic OpenAPI docs from type hints, with high performance \u2014 good for modern REST APIs, microservices and ML model serving.",points:["Django: admin, ORM, auth out of the box; add DRF for REST APIs","Flask: small core + extensions (Flask-SQLAlchemy, Flask-Login); WSGI, sync-first","FastAPI: async-first ASGI, type hints + Pydantic, auto /docs (Swagger UI)","Django also supports async views and ASGI, but its ecosystem is mostly sync","Choose by team skill, project size, need for admin/ORM, and async/IO-heavy workload"]},{id:"pw-13",level:"mid",topic:"py-web",difficulty:"medium",simple:{hi:"WSGI ek aisa waiter hai jo ek table ka order leke kitchen ke bahar khada rehta hai jab tak khana na bane. ASGI wala waiter order dekar doosri table par chala jaata hai aur khana banne par wapas aata hai, isliye ek waiter kai tables sambhal leta hai. gunicorn aur uvicorn restaurant ke manager hain jo waiters ko kaam par lagate hain.",en:"WSGI is a waiter who takes one table's order and stands outside the kitchen until the food is ready. An ASGI waiter places the order, goes to other tables, and comes back when the food is ready, so one waiter handles many tables. gunicorn and uvicorn are the restaurant managers who put the waiters to work.",bn:"WSGI \u09B9\u09B2\u09CB \u098F\u09AE\u09A8 \u098F\u0995 \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0 \u09AF\u09C7 \u098F\u0995\u099F\u09BE \u099F\u09C7\u09AC\u09BF\u09B2\u09C7\u09B0 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A8\u09BF\u09AF\u09BC\u09C7 \u0996\u09BE\u09AC\u09BE\u09B0 \u09A4\u09C8\u09B0\u09BF \u09A8\u09BE \u09B9\u0993\u09AF\u09BC\u09BE \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0\u09C7\u09B0 \u09AC\u09BE\u0987\u09B0\u09C7 \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u09A5\u09BE\u0995\u09C7\u0964 ASGI \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A6\u09BF\u09AF\u09BC\u09C7 \u0985\u09A8\u09CD\u09AF \u099F\u09C7\u09AC\u09BF\u09B2\u09C7 \u099A\u09B2\u09C7 \u09AF\u09BE\u09AF\u09BC \u0986\u09B0 \u0996\u09BE\u09AC\u09BE\u09B0 \u09B9\u09B2\u09C7 \u09AB\u09BF\u09B0\u09C7 \u0986\u09B8\u09C7, \u09A4\u09BE\u0987 \u098F\u0995\u099C\u09A8\u0987 \u0985\u09A8\u09C7\u0995 \u099F\u09C7\u09AC\u09BF\u09B2 \u09B8\u09BE\u09AE\u09B2\u09BE\u09AF\u09BC\u0964 gunicorn \u0986\u09B0 uvicorn \u09B9\u09B2\u09CB \u09B0\u09C7\u09B8\u09CD\u099F\u09C1\u09B0\u09C7\u09A8\u09CD\u099F\u09C7\u09B0 \u09AE\u09CD\u09AF\u09BE\u09A8\u09C7\u099C\u09BE\u09B0 \u09AF\u09BE\u09B0\u09BE \u0993\u09AF\u09BC\u09C7\u099F\u09BE\u09B0\u09A6\u09C7\u09B0 \u0995\u09BE\u099C\u09C7 \u09B2\u09BE\u0997\u09BE\u09AF\u09BC\u0964"},question:"What is the difference between WSGI and ASGI? Where do gunicorn and uvicorn fit?",answer:"WSGI is the classic synchronous interface between a Python web server and app: the app is a callable(environ, start_response) that handles one request per worker thread or process and returns the full response. ASGI is its async successor: the app is an async callable(scope, receive, send) that can handle many concurrent connections in one event loop and supports long-lived protocols like WebSockets and lifespan events. gunicorn is a pre-fork WSGI server (Django/Flask), uvicorn is an ASGI server (FastAPI, Django ASGI); in production gunicorn can manage Uvicorn worker processes, or uvicorn can run its own workers.",points:["WSGI: sync, request/response only \u2014 Django (wsgi.py), Flask","ASGI: async, HTTP + WebSocket + lifespan \u2014 FastAPI, Starlette, Django (asgi.py)","gunicorn: process manager + WSGI; uvicorn: ASGI server on an asyncio event loop","Common start point for gunicorn sync workers: (2 \xD7 CPU cores) + 1, then tune by load","Async helps I/O-bound work; blocking calls inside async def block the whole event loop"],code:`# WSGI: a synchronous callable
def wsgi_app(environ, start_response):
    start_response("200 OK", [("Content-Type", "text/plain")])
    return [b"Hello from WSGI"]

# ASGI: an async callable that sends events
async def asgi_app(scope, receive, send):
    if scope["type"] == "http":
        await send({"type": "http.response.start", "status": 200,
                    "headers": [(b"content-type", b"text/plain")]})
        await send({"type": "http.response.body", "body": b"Hello from ASGI"})

# Production commands
# gunicorn mysite.wsgi:application -w 4 -b 0.0.0.0:8000     (Django, WSGI)
# uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4   (FastAPI, ASGI)
# gunicorn main:app -w 4 -k uvicorn_worker.UvicornWorker    (pip install uvicorn-worker)`},{id:"pw-14",level:"junior",topic:"py-web",difficulty:"medium",simple:{hi:"Celery ek courier service jaisa hai. Dukaandaar (web app) parcel courier counter (broker) par chhod deta hai aur turant agle customer ko sambhalta hai, aur delivery boy (worker) baad mein parcel pahuncha deta hai. Customer ko line mein khade hokar delivery ka intezaar nahi karna padta.",en:"Celery is like a courier service. The shopkeeper (web app) drops the parcel at the courier counter (broker) and immediately serves the next customer, and the delivery boy (worker) delivers it later. The customer doesn't have to stand in the queue waiting for the delivery.",bn:"Celery \u09B9\u09B2\u09CB \u0995\u09C1\u09B0\u09BF\u09AF\u09BC\u09BE\u09B0 \u09B8\u09BE\u09B0\u09CD\u09AD\u09BF\u09B8\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 \u09A6\u09CB\u0995\u09BE\u09A8\u09A6\u09BE\u09B0 (web app) \u09AA\u09BE\u09B0\u09CD\u09B8\u09C7\u09B2\u099F\u09BE \u0995\u09C1\u09B0\u09BF\u09AF\u09BC\u09BE\u09B0 \u0995\u09BE\u0989\u09A8\u09CD\u099F\u09BE\u09B0\u09C7 (broker) \u09B0\u09C7\u0996\u09C7 \u09A6\u09BF\u09AF\u09BC\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09AA\u09B0\u09C7\u09B0 \u0996\u09A6\u09CD\u09A6\u09C7\u09B0\u0995\u09C7 \u09B8\u09BE\u09AE\u09B2\u09BE\u09AF\u09BC, \u0986\u09B0 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u09AC\u09AF\u09BC (worker) \u09AA\u09B0\u09C7 \u09AA\u09BE\u09B0\u09CD\u09B8\u09C7\u09B2 \u09AA\u09CC\u0981\u099B\u09C7 \u09A6\u09C7\u09AF\u09BC\u0964 \u0996\u09A6\u09CD\u09A6\u09C7\u09B0\u0995\u09C7 \u09B2\u09BE\u0987\u09A8\u09C7 \u09A6\u09BE\u0981\u09A1\u09BC\u09BF\u09AF\u09BC\u09C7 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF\u09B0 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09A4\u09C7 \u09B9\u09AF\u09BC \u09A8\u09BE\u0964"},question:"How do you run background tasks with Celery in a Django app?",answer:"Celery is a distributed task queue: the web app puts a message on a broker (Redis or RabbitMQ), separate worker processes pick it up and run the task, and an optional result backend stores results. You define tasks with @shared_task, enqueue them with .delay() or .apply_async() (with countdown/eta, queue, etc.) and run workers with 'celery -A proj worker'. Celery beat schedules periodic tasks. Good practice: pass IDs not model objects, make tasks idempotent, configure retries, and enqueue with transaction.on_commit() so the worker never reads uncommitted data.",points:["Broker (Redis/RabbitMQ) \u2192 worker processes \u2192 optional result backend",".delay(args) is a shortcut for .apply_async(args=...); apply_async supports countdown, eta, queue","Retries: autoretry_for, retry_backoff, max_retries, or self.retry() with bind=True","Celery beat = cron-like periodic tasks","Use for emails, reports, image processing, third-party calls \u2014 anything slow; monitor with Flower"],code:`# proj/celery.py  (import this app in proj/__init__.py)
import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "proj.settings")
app = Celery("proj")
app.config_from_object("django.conf:settings", namespace="CELERY")  # CELERY_BROKER_URL ...
app.autodiscover_tasks()

# orders/tasks.py
from celery import shared_task

@shared_task(autoretry_for=(ConnectionError,), retry_backoff=True, max_retries=3)
def send_invoice(order_id):
    order = Order.objects.get(pk=order_id)    # pass ids, not model objects
    email_invoice(order)

# orders/views.py
transaction.on_commit(lambda: send_invoice.delay(order.id))   # after the DB commit
send_invoice.apply_async(args=[order.id], countdown=60)       # run after 60 seconds

# terminal:  celery -A proj worker -l info   |   celery -A proj beat -l info`},{id:"pw-15",level:"senior",topic:"py-web",difficulty:"hard",simple:{hi:"API ki security ek housing society ke gate jaisi hai. CSRF check yeh dekhta hai ki koi aur aapke naam ki chitthi lekar na aa jaaye, CORS guard ki list hai ki kaunse padosi society ke log andar aa sakte hain, aur JWT ek expiry wala visitor pass hai jo har baar gate par dikhana padta hai.",en:"API security is like the gate of a housing society. The CSRF check makes sure nobody else arrives carrying a letter in your name, CORS is the guard's list of which neighbouring societies' people may come in, and a JWT is a visitor pass with an expiry time that you show at the gate every time.",bn:"API-\u09B0 \u09A8\u09BF\u09B0\u09BE\u09AA\u09A4\u09CD\u09A4\u09BE \u09B9\u09B2\u09CB \u098F\u0995\u099F\u09BE \u09B9\u09BE\u0989\u099C\u09BF\u0982 \u09B8\u09CB\u09B8\u09BE\u0987\u099F\u09BF\u09B0 \u0997\u09C7\u099F\u09C7\u09B0 \u09AE\u09A4\u09CB\u0964 CSRF check \u09A6\u09C7\u0996\u09C7 \u09AF\u09C7 \u0985\u09A8\u09CD\u09AF \u0995\u09C7\u0989 \u09A4\u09CB\u09AE\u09BE\u09B0 \u09A8\u09BE\u09AE\u09C7 \u099A\u09BF\u09A0\u09BF \u09A8\u09BF\u09AF\u09BC\u09C7 \u09A8\u09BE \u09A2\u09C1\u0995\u09C7 \u09AA\u09A1\u09BC\u09C7, CORS \u09B9\u09B2\u09CB \u09A6\u09BE\u09B0\u09CB\u09AF\u09BC\u09BE\u09A8\u09C7\u09B0 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u0995\u09CB\u09A8 \u09AA\u09BE\u09B6\u09C7\u09B0 \u09B8\u09CB\u09B8\u09BE\u0987\u099F\u09BF\u09B0 \u09B2\u09CB\u0995 \u09A2\u09C1\u0995\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7, \u0986\u09B0 JWT \u09B9\u09B2\u09CB \u09AE\u09C7\u09AF\u09BC\u09BE\u09A6\u0993\u09AF\u09BC\u09BE\u09B2\u09BE visitor pass \u09AF\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u09AC\u09BE\u09B0 \u0997\u09C7\u099F\u09C7 \u09A6\u09C7\u0996\u09BE\u09A4\u09C7 \u09B9\u09AF\u09BC\u0964"},question:"How do you secure a Python web API? Explain CSRF, CORS and JWT and how they relate.",answer:"CSRF is an attack where another site makes the user's browser send a request with its cookies; Django's CsrfViewMiddleware blocks it with a per-session token, and it matters whenever you authenticate with cookies/sessions (DRF's SessionAuthentication enforces it). CORS is not a protection for the server but a browser rule: the API sends Access-Control-Allow-* headers listing which origins may read responses, so whitelist exact origins and never combine a wildcard with credentials. JWT is a signed, stateless token sent in the Authorization: Bearer header \u2014 keep access tokens short-lived, use refresh tokens with rotation/blacklisting, pin the algorithm when verifying and never put secrets in the payload. Around these: HTTPS everywhere, input validation, rate limiting, least-privilege permissions and secrets from the environment.",points:["CSRF: needed for cookie/session auth; header-based Bearer tokens are not sent automatically by the browser","CORS: browser-enforced; django-cors-headers / FastAPI CORSMiddleware with an explicit origin list","JWT: short access token + refresh token, verify with algorithms=[...] pinned, payload is only base64 \u2014 not encrypted","Storing JWT in localStorage risks XSS theft; HttpOnly cookies need CSRF protection again","Also: HTTPS + HSTS, throttling, validation, permission checks per object, manage.py check --deploy"],code:`# settings.py (Django + DRF + django-cors-headers + djangorestframework-simplejwt)
from datetime import timedelta

MIDDLEWARE.insert(0, "corsheaders.middleware.CorsMiddleware")   # as high as possible
CORS_ALLOWED_ORIGINS = ["https://app.example.com"]                # no "*" with credentials

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.UserRateThrottle"],
    "DEFAULT_THROTTLE_RATES": {"user": "100/minute"},
}
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=15),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000`},{id:"pw-16",level:"senior",topic:"py-web",difficulty:"hard",simple:{hi:"Deploy karna ek nayi dukaan kholne jaisa hai. Saamaan ek dabbe (Docker) mein pack karo, darwaze par guard (Nginx) bithao, tijori ki chaabi (SECRET_KEY) chhupa ke rakho, aur dukaan kholne se pehle shelf sajao (migrate, collectstatic). Phir CCTV (monitoring) lagao taaki gadbad turant pata chale.",en:"Deploying is like opening a new shop. Pack the goods in a box (Docker), put a guard at the door (Nginx), hide the locker key (SECRET_KEY), and arrange the shelves before opening (migrate, collectstatic). Then install CCTV (monitoring) so you notice problems immediately.",bn:"Deploy \u0995\u09B0\u09BE \u09B9\u09B2\u09CB \u09A8\u09A4\u09C1\u09A8 \u09A6\u09CB\u0995\u09BE\u09A8 \u0996\u09CB\u09B2\u09BE\u09B0 \u09AE\u09A4\u09CB\u0964 \u099C\u09BF\u09A8\u09BF\u09B8\u09AA\u09A4\u09CD\u09B0 \u098F\u0995\u099F\u09BE \u09AC\u09BE\u0995\u09CD\u09B8\u09C7 (Docker) \u09AA\u09CD\u09AF\u09BE\u0995 \u0995\u09B0\u09CB, \u09A6\u09B0\u099C\u09BE\u09AF\u09BC \u09A6\u09BE\u09B0\u09CB\u09AF\u09BC\u09BE\u09A8 (Nginx) \u09AC\u09B8\u09BE\u0993, \u09B8\u09BF\u09A8\u09CD\u09A6\u09C1\u0995\u09C7\u09B0 \u099A\u09BE\u09AC\u09BF (SECRET_KEY) \u09B2\u09C1\u0995\u09BF\u09AF\u09BC\u09C7 \u09B0\u09BE\u0996\u09CB, \u0986\u09B0 \u09A6\u09CB\u0995\u09BE\u09A8 \u0996\u09CB\u09B2\u09BE\u09B0 \u0986\u0997\u09C7 \u09A4\u09BE\u0995 \u09B8\u09BE\u099C\u09BE\u0993 (migrate, collectstatic)\u0964 \u09A4\u09BE\u09B0\u09AA\u09B0 CCTV (monitoring) \u09B2\u09BE\u0997\u09BE\u0993 \u09AF\u09BE\u09A4\u09C7 \u0997\u09CB\u09B2\u09AE\u09BE\u09B2 \u09B9\u09B2\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09AC\u09CB\u099D\u09BE \u09AF\u09BE\u09AF\u09BC\u0964"},question:"How would you deploy a Django (or FastAPI) application to production?",answer:"Package the app (usually a Docker image) with pinned dependencies, and run it under a production server \u2014 gunicorn for WSGI or uvicorn/gunicorn+Uvicorn workers for ASGI \u2014 behind a reverse proxy such as Nginx or a cloud load balancer that terminates TLS. Configure from environment variables: DEBUG=False, SECRET_KEY, ALLOWED_HOSTS, CSRF_TRUSTED_ORIGINS and the database URL, and use PostgreSQL rather than SQLite. In a release step run migrate and collectstatic (serve static files via WhiteNoise or a CDN/object storage), run Celery workers as separate processes, and add health checks, structured logging, error tracking and zero-downtime rolling deploys.",points:["Run python manage.py check --deploy to catch insecure settings","App server (gunicorn/uvicorn) behind a reverse proxy; set SECURE_PROXY_SSL_HEADER when TLS ends at the proxy","Secrets in env vars / secret manager, never in git","migrate + collectstatic in a release step before switching traffic; keep migrations backward-compatible","Run as non-root in a slim image; health checks, logs, monitoring (e.g. Sentry), autoscaling"],code:`# Dockerfile
FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN useradd --create-home appuser
USER appuser
EXPOSE 8000
CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "3"]

# release step (runs once per deploy, before new containers take traffic)
# python manage.py migrate --noinput && python manage.py collectstatic --noinput

# settings.py (production)
DEBUG = False
SECRET_KEY = os.environ["DJANGO_SECRET_KEY"]
ALLOWED_HOSTS = os.environ["ALLOWED_HOSTS"].split(",")
CSRF_TRUSTED_ORIGINS = ["https://app.example.com"]
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")`}],t=[{id:"qp-b1",level:"fresher",topic:"py-basics",question:"What is the output of print(type({}).__name__)?",options:["set","dict","tuple","NoneType"],correct:1,explanation:"Empty braces create an empty dict; use set() for an empty set."},{id:"qp-b2",level:"junior",topic:"py-basics",question:"What does print(-7 // 2, -7 % 2) output?",options:["-3 -1","-3 1","-4 -1","-4 1"],correct:3,explanation:"// floors toward negative infinity (-4), and % takes the divisor's sign, so -7 == -4*2 + 1."},{id:"qp-b3",level:"mid",topic:"py-basics",question:`def f(x, acc=[]):
    acc.append(x)
    return acc

f(1)
print(f(2))

What is printed?`,options:["[2]","[1, 2]","[1]","TypeError"],correct:1,explanation:"The default list is created once at definition time and shared across calls."},{id:"qp-b4",level:"junior",topic:"py-basics",question:"What does print(round(2.5), round(3.5)) output?",options:["2 4","3 4","2 3","3 3"],correct:0,explanation:"round() uses banker's rounding: halves go to the nearest even integer."},{id:"qp-b5",level:"fresher",topic:"py-basics",question:'What does print("python"[::-2]) output?',options:["pto","nhy","nohtyp","otp"],correct:1,explanation:"Step -2 starts from the last character 'n' and takes every second character backwards: n, h, y."},{id:"qp-b6",level:"mid",topic:"py-basics",question:`import copy
a = [[1], [2]]
b = copy.copy(a)
a[0].append(9)
a.append([3])
print(b)

What is printed?`,options:["[[1], [2]]","[[1, 9], [2], [3]]","[[1, 9], [2]]","[[1], [2], [3]]"],correct:2,explanation:"A shallow copy shares the inner lists but has its own outer list, so it sees the append to a[0] but not the new item."},{id:"qp-a1",level:"junior",topic:"py-advanced",question:`What does this print?

def gen():
    yield 1
    yield 2

g = gen()
print(list(g), list(g))`,options:["[1, 2] [1, 2]","[1, 2] []","[] []","TypeError"],correct:1,explanation:"A generator is single-pass: the first list() exhausts it, so the second gets nothing."},{id:"qp-a2",level:"mid",topic:"py-advanced",question:`class A: pass
class B(A): pass
class C(A): pass
class D(B, C): pass

What is D.__mro__ (by class name)?`,options:["D, B, A, C, object","D, C, B, A, object","D, B, C, A, object","D, A, B, C, object"],correct:2,explanation:"C3 linearization keeps children before parents and left-to-right base order: D, B, C, A, object."},{id:"qp-a3",level:"junior",topic:"py-advanced",question:`What does this print?

funcs = [lambda: i for i in range(3)]
print([f() for f in funcs])`,options:["[0, 1, 2]","[0, 0, 0]","[3, 3, 3]","[2, 2, 2]"],correct:3,explanation:"Closures bind late, so every lambda reads the final value of i, which is 2."},{id:"qp-a4",level:"fresher",topic:"py-advanced",question:"Which decorator gives a method the class (not the instance) as its first argument?",options:["@classmethod","@staticmethod","@property","@functools.wraps"],correct:0,explanation:"@classmethod passes the class as cls; @staticmethod passes nothing implicit."},{id:"qp-a5",level:"mid",topic:"py-advanced",question:`from dataclasses import dataclass

@dataclass
class Cart:
    items: list = []

What happens when this class is defined?`,options:["Each Cart gets its own empty list","All Carts share one list","ValueError: mutable default is not allowed, use default_factory","SyntaxError"],correct:2,explanation:"dataclasses reject list/dict/set defaults with ValueError; use field(default_factory=list)."},{id:"qp-w1",level:"junior",topic:"py-web",question:"Looping over books and reading book.tags.all() (a ManyToManyField) causes N+1 queries. Which call fixes it?",options:['only("tags")','defer("tags")','select_related("tags")','prefetch_related("tags")'],correct:3,explanation:"ManyToMany relations need prefetch_related, which loads them in one extra query; select_related only follows ForeignKey/OneToOne via JOIN."},{id:"qp-w2",level:"fresher",topic:"py-web",question:"Which of these is an ASGI server commonly used to run FastAPI apps?",options:["mod_wsgi","wsgiref","uvicorn","Celery"],correct:2,explanation:"uvicorn is an ASGI server; mod_wsgi and wsgiref are WSGI, and Celery is a task queue."},{id:"qp-w3",level:"mid",topic:"py-web",question:"When does qs = Book.objects.filter(price__lt=100) actually query the database?",options:["Immediately when filter() is called","When the QuerySet is evaluated, e.g. iterated or passed to list()","When the Book model is imported","Only when save() is called on a book"],correct:1,explanation:"QuerySets are lazy: building them runs no SQL until they are evaluated."},{id:"qp-c1",level:"fresher",topic:"py-coding",question:"What does print(list(dict.fromkeys([3, 1, 3, 2, 1]))) output?",options:["[3, 1, 2]","[1, 2, 3]","[3, 1, 3, 2, 1]","[2, 1, 3]"],correct:0,explanation:"dict keys are unique and keep insertion order, so duplicates are removed and the first-seen order stays."},{id:"qp-c2",level:"junior",topic:"py-coding",question:"In an OrderedDict-based LRU cache, which call evicts the least recently used entry?",options:["cache.popitem()","cache.popitem(last=False)","cache.move_to_end(key)","cache.clear()"],correct:1,explanation:"popitem(last=False) removes the first (oldest) item; plain popitem() removes the most recent one."}];var o=e("python",[a],[t]);export{o as default};
