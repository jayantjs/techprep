import { QuizQuestion, Question } from '../models';

/** php interview questions. */
export const QUESTIONS: Question[] = [
  {
    id: 'lv-1',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Laravel ek restaurant jaisa hai. Waiter (Controller) aapka order leta hai, kitchen (Model) se khana laata hai, aur sundar plate (View) mein serve karta hai.',
      en: 'Laravel is like a restaurant. The waiter (Controller) takes your order, gets the food from the kitchen (Model), and serves it on a nice plate (View).',
      bn: 'Laravel একটা রেস্টুরেন্টের মতো। ওয়েটার (Controller) তোমার অর্ডার নেয়, রান্নাঘর (Model) থেকে খাবার আনে, আর সুন্দর প্লেটে (View) পরিবেশন করে।',
    },
    question: 'What is Laravel and how does it follow the MVC pattern?',
    answer: 'Laravel is an open-source PHP framework for building web apps and APIs, with batteries included: routing, Eloquent ORM, Blade templates, validation, auth, queues, caching and testing tools. It follows MVC: the Model (Eloquent class) talks to the database, the View (Blade template) renders the HTML, and the Controller receives the request, uses models and returns a view or JSON. Routes map URLs to controller actions, which keeps each layer focused on one job.',
    points: [
      'Model = Eloquent class mapped to a table (app/Models)',
      'View = Blade template in resources/views',
      'Controller = handles the request in app/Http/Controllers',
      'Routes in routes/web.php connect URLs to controllers',
      'Built on Composer packages, including several Symfony components',
    ],
    code: `// routes/web.php
use App\\Http\\Controllers\\ProductController;
Route::get('/products', [ProductController::class, 'index']);

// app/Http/Controllers/ProductController.php
class ProductController extends Controller
{
    public function index()
    {
        $products = Product::latest()->get();              // Model
        return view('products.index', compact('products')); // View
    }
}`,
  },
  {
    id: 'lv-2',
    level: 'mid',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Request ek school ke gate se aane wale student jaisa hai. Pehle gatekeeper (middleware) ID check karta hai, phir office (router) batata hai kaunsi class (controller) jaana hai, aur ghar jaate waqt bhi gate se hi nikalta hai.',
      en: 'A request is like a student entering school. The gatekeeper (middleware) checks the ID, the office (router) says which classroom (controller) to go to, and on the way home the student leaves through the same gate.',
      bn: 'Request হলো স্কুলে ঢোকা একজন ছাত্রের মতো। দারোয়ান (middleware) আইডি দেখে, অফিস (router) বলে কোন ক্লাসে (controller) যেতে হবে, আর বাড়ি ফেরার সময়ও সে একই গেট দিয়ে বের হয়।',
    },
    question: 'Explain the Laravel request lifecycle.',
    answer: 'Every request enters through public/index.php, which loads Composer\'s autoloader and the application instance created in bootstrap/app.php, then calls handleRequest(). The HTTP kernel bootstraps the app (environment, config, exception handling, facades, then registers and boots all service providers), sends the request through global middleware, and the router matches a route and runs its route middleware before calling the controller or closure. The returned response travels back out through the middleware, is sent to the browser, and finally terminable middleware runs terminate().',
    points: [
      'Entry point: public/index.php',
      'bootstrap/app.php configures routing, middleware and exceptions (Laravel 11+)',
      'Service providers are registered first, then booted',
      'Request passes global middleware, then route/group middleware',
      'Response goes back through middleware (onion model), then terminate()',
    ],
    code: `// public/index.php (Laravel 11+)
use Illuminate\\Http\\Request;

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

(require_once __DIR__.'/../bootstrap/app.php')
    ->handleRequest(Request::capture());`,
  },
  {
    id: 'lv-3',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Routing ek railway station ki enquiry jaisa hai: \'Howrah jaana hai? Platform 5 jao.\' Named route ek train ka naam hai (Rajdhani), toh platform badal jaaye phir bhi naam se train mil jaati hai.',
      en: 'Routing is like the railway enquiry desk: \'Going to Howrah? Go to platform 5.\' A named route is like a train\'s name (Rajdhani), so even if the platform changes you still find the train by its name.',
      bn: 'Routing হলো রেল স্টেশনের enquiry কাউন্টারের মতো: \'হাওড়া যাবে? ৫ নম্বর প্ল্যাটফর্মে যাও।\' Named route হলো ট্রেনের নাম (রাজধানী), প্ল্যাটফর্ম বদলালেও নাম দিয়ে ট্রেন খুঁজে পাওয়া যায়।',
    },
    question: 'How does routing work in Laravel? Explain named routes, route groups and route model binding.',
    answer: 'Routes are defined in routes/web.php (session, CSRF) and routes/api.php (stateless, added with php artisan install:api) and map an HTTP verb + URI to a closure or controller action. Named routes let you generate URLs with route(\'name\') so changing the URI does not break links; groups share middleware, prefixes and name prefixes. Route model binding automatically turns a {post} segment into a Post model when the action type-hints Post $post, and returns 404 if it is not found.',
    points: [
      'Route::get/post/put/patch/delete, plus match() and any()',
      '->name(\'posts.show\') and route(\'posts.show\', $post) to build URLs',
      'Route::middleware()->prefix()->name()->group() for shared settings',
      'Implicit binding uses the id by default; {post:slug} binds by another column',
      'php artisan route:list shows all registered routes',
    ],
    code: `use App\\Http\\Controllers\\PostController;

Route::get('/', fn () => view('welcome'))->name('home');

Route::middleware('auth')->prefix('admin')->name('admin.')->group(function () {
    Route::get('/posts/{post}', [PostController::class, 'show'])
        ->name('posts.show');           // name: admin.posts.show
});

// Bind by slug instead of id
Route::get('/blog/{post:slug}', [PostController::class, 'show']);

// In the controller: Post is fetched automatically (404 if missing)
public function show(Post $post) { return view('posts.show', compact('post')); }

// Generating a URL
$url = route('admin.posts.show', $post);`,
  },
  {
    id: 'lv-4',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Middleware cinema hall ke ticket checker jaisa hai. Andar jaane se pehle wo ticket dekhta hai; ticket nahi hai toh wahi se wapas bhej deta hai.',
      en: 'Middleware is like the ticket checker at a cinema hall. He checks your ticket before you go in; if you don\'t have one, he sends you back right there.',
      bn: 'Middleware হলো সিনেমা হলের টিকিট চেকারের মতো। ভেতরে ঢোকার আগে সে টিকিট দেখে; টিকিট না থাকলে ওখান থেকেই ফেরত পাঠায়।',
    },
    question: 'What is middleware in Laravel and how do you create and register one in Laravel 11+?',
    answer: 'Middleware is a layer that inspects or modifies the HTTP request before it reaches the controller (and the response on the way out), e.g. auth, CSRF checks, throttling or logging. You create one with php artisan make:middleware, put the logic in handle() and either call $next($request) to continue or return a response early. In Laravel 11+ there is no Http/Kernel.php; you register aliases, global middleware and group additions in bootstrap/app.php inside withMiddleware().',
    points: [
      'handle(Request $request, Closure $next): Response',
      'Before-middleware acts before $next(), after-middleware acts on its result',
      'Register in bootstrap/app.php: alias(), append(), web(append: ...)',
      'Apply on routes with ->middleware(\'admin\') or on groups',
      'Built-in: auth, guest, throttle, verified, can, signed',
    ],
    code: `// app/Http/Middleware/EnsureUserIsAdmin.php
class EnsureUserIsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! $request->user()?->is_admin) {
            abort(403);
        }
        return $next($request);
    }
}

// bootstrap/app.php
->withMiddleware(function (Middleware $middleware) {
    $middleware->alias(['admin' => EnsureUserIsAdmin::class]);
})

// routes/web.php
Route::middleware(['auth', 'admin'])->get('/admin', AdminDashboardController::class);`,
  },
  {
    id: 'lv-5',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Controller ek school ke class teacher jaisa hai jo apni class ka saara kaam sambhalta hai. Resource controller mein har kaam ke liye fixed period hota hai: attendance, padhai, homework, test.',
      en: 'A controller is like a class teacher who handles all the work of one class. A resource controller has a fixed period for each job: attendance, teaching, homework, test.',
      bn: 'Controller হলো এক ক্লাসের ক্লাস টিচারের মতো, যিনি সেই ক্লাসের সব কাজ সামলান। Resource controller-এ প্রতিটা কাজের জন্য নির্দিষ্ট পিরিয়ড থাকে: হাজিরা, পড়ানো, হোমওয়ার্ক, পরীক্ষা।',
    },
    question: 'What are controllers and resource controllers in Laravel?',
    answer: 'A controller is a class in app/Http/Controllers that groups related request-handling logic instead of writing it in route closures. A resource controller follows REST conventions with seven actions — index, create, store, show, edit, update, destroy — and Route::resource() registers all their routes in one line. For APIs, Route::apiResource() skips create and edit because those only return HTML forms.',
    points: [
      'php artisan make:controller PostController --resource --model=Post',
      'Route::resource(\'posts\', PostController::class) → 7 routes with names like posts.index',
      'Route::apiResource excludes create and edit',
      '->only([...]) / ->except([...]) to limit actions',
      'Single-action controllers use __invoke()',
    ],
    code: `// php artisan make:controller PostController --resource --model=Post
Route::resource('posts', PostController::class);
Route::apiResource('photos', PhotoController::class); // no create/edit

// GET    /posts            index    posts.index
// GET    /posts/create     create   posts.create
// POST   /posts            store    posts.store
// GET    /posts/{post}     show     posts.show
// GET    /posts/{post}/edit edit    posts.edit
// PUT    /posts/{post}     update   posts.update
// DELETE /posts/{post}     destroy  posts.destroy`,
  },
  {
    id: 'lv-6',
    level: 'mid',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Service container ek tiffin service jaisa hai. Aap bas bolte ho \'mujhe lunch chahiye\', aur wo khud sabzi, roti, daal jod kar dabba ready karke de deta hai; aapko kitchen mein jaana nahi padta.',
      en: 'The service container is like a tiffin service. You just say \'I need lunch\', and it puts the sabzi, roti and dal together and hands you a ready box; you never go into the kitchen.',
      bn: 'Service container হলো একটা টিফিন সার্ভিসের মতো। তুমি শুধু বলো \'আমার লাঞ্চ চাই\', আর সে নিজেই সবজি, রুটি, ডাল জুড়ে টিফিন রেডি করে দেয়; তোমাকে রান্নাঘরে যেতে হয় না।',
    },
    question: 'What is the service container and how does dependency injection work in Laravel?',
    answer: 'The service container is Laravel\'s IoC container: it knows how to build objects and their dependencies. When a controller, job, listener or command type-hints a class in its constructor or method, the container resolves it automatically using reflection, so you rarely call new yourself. For interfaces or objects that need configuration you add bindings (bind, singleton, scoped, instance) in a service provider, which makes code loosely coupled and easy to swap or mock in tests.',
    points: [
      'Concrete classes with resolvable dependencies need no binding (auto-wiring)',
      'bind() = new instance each time; singleton() = one instance per app; scoped() = one per request/job',
      'Bind interface → implementation to swap implementations',
      'Contextual binding: when(A)->needs(I)->give(B)',
      'Resolve manually with app(Foo::class) or app()->make()',
    ],
    code: `interface PaymentGateway { public function charge(int $paise): bool; }

class RazorpayGateway implements PaymentGateway
{
    public function __construct(private string $key) {}
    public function charge(int $paise): bool { /* call API */ return true; }
}

// AppServiceProvider::register()
$this->app->singleton(PaymentGateway::class,
    fn ($app) => new RazorpayGateway(config('services.razorpay.key')));

// Any controller: the container injects it
class CheckoutController extends Controller
{
    public function __construct(private PaymentGateway $gateway) {}

    public function store() { $this->gateway->charge(49900); }
}`,
  },
  {
    id: 'lv-7',
    level: 'mid',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Shaadi ki taiyari socho. register() mein sirf list banti hai ki kaun caterer, kaun decorator aayega; boot() mein sab aa chuke hote hain, tab asli kaam shuru hota hai.',
      en: 'Think of preparing for a wedding. In register() you only write the list of which caterer and decorator will come; in boot() everyone has arrived, so the real work starts.',
      bn: 'বিয়ের প্রস্তুতির কথা ভাবো। register()-এ শুধু তালিকা হয় কোন ক্যাটারার, কোন ডেকোরেটর আসবে; boot()-এ সবাই এসে গেছে, তখন আসল কাজ শুরু হয়।',
    },
    question: 'What are service providers? What is the difference between register() and boot()?',
    answer: 'Service providers are the central place where the application is bootstrapped: they bind services into the container and configure things like gates, event listeners, view composers or macros. register() should only bind things into the container, because other providers may not be loaded yet; boot() runs after every provider is registered, so you can safely use other services there. In Laravel 11+ the app ships with just AppServiceProvider, and providers are listed in bootstrap/providers.php (make:provider adds them automatically).',
    points: [
      'register(): only container bindings, no using other services',
      'boot(): everything is registered — use Gate, Event, View, Route, Model settings',
      'Laravel 11+: bootstrap/providers.php lists app providers',
      'Packages register providers via auto-discovery in composer.json',
      'Deferred providers (DeferrableProvider + provides()) load only when needed',
    ],
    code: `class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(SmsClient::class, fn () =>
            new SmsClient(config('services.sms.key')));
    }

    public function boot(): void
    {
        Model::preventLazyLoading(! $this->app->isProduction());
        Gate::define('view-reports', fn (User $user) => $user->is_admin);
        View::composer('layouts.app', CartComposer::class);
    }
}`,
  },
  {
    id: 'lv-8',
    level: 'senior',
    topic: 'laravel',
    difficulty: 'hard',
    simple: {
      hi: 'Facade ek receptionist jaisa hai. Aap reception par bolte ho \'doctor se milna hai\', receptionist andar jaakar asli doctor (container ka object) ko bulati hai; aapko doctor ka cabin dhoondhna nahi padta.',
      en: 'A facade is like a receptionist. You tell the front desk \'I want to see the doctor\', and she goes inside and calls the real doctor (the object from the container); you don\'t need to find the cabin yourself.',
      bn: 'Facade হলো রিসেপশনিস্টের মতো। তুমি রিসেপশনে বলো \'ডাক্তারের সঙ্গে দেখা করব\', সে ভেতরে গিয়ে আসল ডাক্তারকে (container-এর object) ডেকে আনে; তোমাকে কেবিন খুঁজতে হয় না।',
    },
    question: 'How do facades work internally in Laravel? What are their pros and cons?',
    answer: 'A facade is a class with a static-looking API that proxies calls to an object resolved from the service container. Each facade extends Illuminate\\Support\\Facades\\Facade and implements getFacadeAccessor(), which returns a container key; the base class\'s __callStatic() resolves that instance (and caches it) and forwards the method call to it. So Cache::get(\'k\') is really app(\'cache\')->get(\'k\') — not a true static call — which is why facades can be faked or mocked in tests.',
    points: [
      'getFacadeAccessor() returns the container binding name',
      '__callStatic() → getFacadeRoot() → $instance->$method(...$args)',
      'Testable: Cache::shouldReceive(), Mail::fake(), Queue::fake()',
      'Real-time facades: prefix a class import with Facades\\',
      'Cons: hidden dependencies and class \'scope creep\'; constructor injection makes dependencies explicit',
    ],
    code: `// Simplified version of a framework facade
class Cache extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'cache';          // key in the service container
    }
}

// Facade::__callStatic($method, $args) roughly does:
//   $instance = static::getFacadeRoot();   // app('cache') -> CacheManager
//   return $instance->$method(...$args);

// In a test
Cache::shouldReceive('get')->with('rate')->andReturn(83);`,
  },
  {
    id: 'lv-9',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Eloquent ek library register jaisa hai jahan har kitaab (row) ka apna card (model) hai. Card pe likh do, kitaab update ho jaati hai; SQL ki lambi bhasha bolni nahi padti.',
      en: 'Eloquent is like a library register where every book (row) has its own card (model). Write on the card and the book gets updated; you don\'t have to speak the long SQL language.',
      bn: 'Eloquent হলো লাইব্রেরির রেজিস্টারের মতো, যেখানে প্রতিটা বইয়ের (row) নিজের কার্ড (model) আছে। কার্ডে লিখলেই বই আপডেট হয়; লম্বা SQL ভাষা বলতে হয় না।',
    },
    question: 'What is Eloquent ORM? Show basic CRUD operations.',
    answer: 'Eloquent is Laravel\'s ActiveRecord ORM: each database table has a Model class, and each model instance represents one row that can save, update and delete itself. It follows conventions — a Post model maps to the posts table with an id primary key and created_at/updated_at timestamps — which you can override. Queries are written with a fluent builder (where, orderBy, paginate) and return models or collections instead of raw arrays.',
    points: [
      'Model naming convention: Post → posts table, id primary key',
      'Read: all(), find(), findOrFail(), where()->get(), first(), paginate()',
      'Create: create() (needs $fillable) or new + save()',
      'Update: change attributes + save(), or update([...])',
      'Delete: delete(); SoftDeletes trait sets deleted_at instead',
    ],
    code: `class Post extends Model
{
    protected $fillable = ['title', 'body', 'published'];
}

$post = Post::create(['title' => 'Hello', 'body' => 'World']);   // INSERT

$post   = Post::findOrFail(1);                                    // 404 in HTTP if missing
$recent = Post::where('published', true)->latest()->take(5)->get();

$post->title = 'Updated';                                         // UPDATE
$post->save();

$post->delete();                                                  // DELETE`,
  },
  {
    id: 'lv-10',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Ek parivaar socho: ek papa ke kai bachche (hasMany), har bachcha ek papa ka (belongsTo), aur students-clubs mein sab sab se jude (belongsToMany). Polymorphic ek \'like\' button jaisa hai jo photo pe bhi lagta hai aur video pe bhi.',
      en: 'Think of a family: one father has many children (hasMany), each child belongs to one father (belongsTo), and students and clubs are linked many-to-many (belongsToMany). Polymorphic is like a \'like\' button that works on both photos and videos.',
      bn: 'একটা পরিবারের কথা ভাবো: এক বাবার অনেক সন্তান (hasMany), প্রতিটা সন্তান এক বাবার (belongsTo), আর ছাত্র আর ক্লাব একে অপরের সঙ্গে অনেক-অনেক যুক্ত (belongsToMany)। Polymorphic হলো একটা \'like\' বোতাম যা ছবিতেও লাগে, ভিডিওতেও।',
    },
    question: 'Explain Eloquent relationships: hasOne, hasMany, belongsTo, belongsToMany and polymorphic relations.',
    answer: 'Relationships are methods on a model that return a relation object: hasOne/hasMany when the other table holds the foreign key (users → profiles/posts), belongsTo on the side that holds it (post.user_id), and belongsToMany for many-to-many through a pivot table like role_user. Polymorphic relations (morphOne, morphMany, morphTo, morphToMany) let one model belong to several model types using two columns, e.g. commentable_id and commentable_type, so comments can attach to both posts and videos. Accessing $user->posts returns the loaded collection, while $user->posts() returns a query builder you can chain on.',
    points: [
      'Foreign key lives on the belongsTo side (posts.user_id)',
      'Many-to-many pivot table: singular names in alphabetical order (role_user)',
      'attach(), detach(), sync() manage pivot rows; withPivot()/withTimestamps()',
      'Polymorphic: $table->morphs(\'commentable\') creates *_id and *_type',
      'Use Relation::enforceMorphMap() to store short aliases instead of class names',
    ],
    code: `class User extends Model {
    public function profile(): HasOne        { return $this->hasOne(Profile::class); }
    public function posts(): HasMany         { return $this->hasMany(Post::class); }
    public function roles(): BelongsToMany   { return $this->belongsToMany(Role::class)->withTimestamps(); }
}

class Post extends Model {
    public function user(): BelongsTo        { return $this->belongsTo(User::class); }
    public function comments(): MorphMany    { return $this->morphMany(Comment::class, 'commentable'); }
}

class Comment extends Model {
    public function commentable(): MorphTo   { return $this->morphTo(); }  // Post or Video
}

$user->roles()->sync([1, 3]);
$latest = $user->posts()->latest()->first();`,
  },
  {
    id: 'lv-11',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Mutator ek darzi jaisa hai jo kapda almaari (database) mein rakhne se pehle tah karke rakhta hai, aur accessor nikaalte waqt press karke deta hai. Cast ek label hai ki \'yeh dabba chawal ka hai\', toh hamesha chawal hi niklega.',
      en: 'A mutator is like a tailor who folds clothes neatly before putting them in the cupboard (database), and an accessor irons them when you take them out. A cast is a label saying \'this box is rice\', so rice always comes out.',
      bn: 'Mutator হলো এক দর্জির মতো, যে জামা আলমারিতে (database) রাখার আগে ভাঁজ করে রাখে, আর accessor বের করার সময় ইস্ত্রি করে দেয়। Cast হলো একটা লেবেল \'এই কৌটোয় চাল আছে\', তাই সবসময় চালই বেরোবে।',
    },
    question: 'What are accessors, mutators and attribute casting in Eloquent?',
    answer: 'An accessor transforms a value when you read it from the model, and a mutator transforms it before it is stored; in modern Laravel both are defined in one protected method returning an Attribute object with get and set closures. Casts convert columns to native types automatically — boolean, integer, datetime, array/json, encrypted, hashed, backed enums or custom cast classes. In Laravel 11+ casts are declared in a casts() method (the $casts property still works).',
    points: [
      'Attribute::make(get: fn ..., set: fn ...) in a camelCase method',
      'Older getFooAttribute / setFooAttribute style still works',
      '\'array\' / \'json\' cast stores JSON and gives a PHP array',
      '\'hashed\' cast hashes passwords; \'encrypted\' encrypts at rest',
      'Enum casts give a backed enum instance instead of a string',
    ],
    code: `use Illuminate\\Database\\Eloquent\\Casts\\Attribute;

class User extends Model
{
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'is_admin' => 'boolean',
            'settings' => 'array',
            'password' => 'hashed',
            'status'   => UserStatus::class,   // backed enum
        ];
    }

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn (string $value) => ucwords($value),        // accessor
            set: fn (string $value) => strtolower(trim($value)) // mutator
        );
    }
}`,
  },
  {
    id: 'lv-12',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Local scope ek shortcut button jaisa hai, jaise Swiggy pe \'Veg only\' filter jo aap jab chaho dabate ho. Global scope ek school ka niyam hai jo har din apne aap laagu hota hai, jaise \'sirf uniform waale andar aayenge\'.',
      en: 'A local scope is like a shortcut button, such as the \'Veg only\' filter in a food app that you press when you want. A global scope is a school rule that applies automatically every day, like \'only students in uniform may enter\'.',
      bn: 'Local scope হলো একটা শর্টকাট বোতাম, যেমন খাবারের অ্যাপে \'Veg only\' ফিল্টার, যখন চাও তখন চাপো। Global scope হলো স্কুলের নিয়ম যা প্রতিদিন নিজে থেকেই লাগু হয়, যেমন \'শুধু ইউনিফর্ম পরা ছাত্ররাই ঢুকবে\'।',
    },
    question: 'What are local and global query scopes in Eloquent?',
    answer: 'A local scope is a reusable query constraint defined on the model, such as scopePublished(), that you call fluently as Post::published(); it keeps repeated where-clauses in one place. A global scope is applied automatically to every query for that model — soft deletes are the classic built-in example — and is added with addGlobalScope() in the model\'s booted() method or via a Scope class. You can bypass global scopes with withoutGlobalScope() or withoutGlobalScopes().',
    points: [
      'Local scope: method named scopeXxx(Builder $query), called as xxx()',
      'Scopes can take extra parameters: Post::ofType(\'news\')',
      'Global scope: applied to all queries (e.g. SoftDeletes, multi-tenant filters)',
      'Remove with withoutGlobalScope(\'name\') or withoutGlobalScopes()',
      'Keeps controllers thin and queries readable',
    ],
    code: `class Post extends Model
{
    public function scopePublished(Builder $query): void
    {
        $query->whereNotNull('published_at');
    }

    public function scopeOfType(Builder $query, string $type): void
    {
        $query->where('type', $type);
    }

    protected static function booted(): void
    {
        static::addGlobalScope('visible', fn (Builder $q) => $q->where('is_hidden', false));
    }
}

$news = Post::published()->ofType('news')->latest()->get();
$all  = Post::withoutGlobalScope('visible')->get();`,
  },
  {
    id: 'lv-13',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Migration ghar ka naksha (blueprint) hai jo batata hai kamre kaise bane. Factory ek khilone banane ki machine hai jo nakli saamaan banati hai, aur seeder us saamaan ko ghar mein rakh deta hai taaki ghar khaali na lage.',
      en: 'A migration is the house blueprint that says how the rooms are built. A factory is a toy-making machine that makes pretend furniture, and a seeder puts that furniture into the house so it doesn\'t look empty.',
      bn: 'Migration হলো বাড়ির নকশা, যা বলে ঘরগুলো কেমন হবে। Factory হলো খেলনা বানানোর মেশিন যা নকল আসবাব বানায়, আর seeder সেই আসবাব ঘরে সাজিয়ে দেয় যাতে ঘর ফাঁকা না লাগে।',
    },
    question: 'What are migrations, seeders and factories in Laravel?',
    answer: 'Migrations are version control for the database schema: PHP classes with up() and down() methods that create or change tables, run with php artisan migrate and undone with migrate:rollback. Factories define how to generate fake model data (using Faker), mainly for tests and local development. Seeders insert data — fake records from factories or required data such as roles or countries — and are run with php artisan db:seed or migrate:fresh --seed.',
    points: [
      'php artisan make:model Post -mfs creates model + migration + factory + seeder',
      'Schema builder: $table->id(), string(), foreignId()->constrained(), timestamps()',
      'Never edit a migration that already ran in production — add a new one',
      'Factory definition() returns attributes; states for variations',
      'DatabaseSeeder::run() calls other seeders with $this->call()',
    ],
    code: `// database/migrations/xxxx_create_posts_table.php
return new class extends Migration {
    public function up(): void {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('body');
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('posts'); }
};

// database/factories/PostFactory.php
public function definition(): array {
    return ['user_id' => User::factory(), 'title' => fake()->sentence(), 'body' => fake()->paragraph()];
}

// database/seeders/DatabaseSeeder.php
User::factory(10)->has(Post::factory()->count(3))->create();`,
  },
  {
    id: 'lv-14',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Blade ek rangoli ke stencil jaisa hai: design (template) ek baar banao, phir rang (data) bharte jao. Component ek chhota stencil hai, jaise ek phool, jise har rangoli mein dobara use kar sakte ho.',
      en: 'Blade is like a rangoli stencil: make the design (template) once, then keep filling in colours (data). A component is a small stencil, like one flower, that you can reuse in every rangoli.',
      bn: 'Blade হলো আলপনার স্টেনসিলের মতো: নকশা (template) একবার বানাও, তারপর রং (data) ভরতে থাকো। Component হলো ছোট একটা স্টেনসিল, যেমন একটা ফুল, যা প্রতিটা আলপনায় আবার ব্যবহার করা যায়।',
    },
    question: 'What is Blade? Explain Blade templates and components.',
    answer: 'Blade is Laravel\'s templating engine; templates in resources/views end in .blade.php and are compiled to plain cached PHP, so they add almost no overhead. {{ $var }} echoes escaped output (protecting against XSS), {!! $var !!} echoes raw HTML, and directives like @if, @foreach, @forelse, @auth, @csrf and @include keep templates clean. Components (<x-alert>, <x-layout>) are reusable pieces with props and slots — anonymous components live in resources/views/components, class-based ones are made with php artisan make:component.',
    points: [
      '{{ }} escapes with htmlspecialchars; {!! !!} does not — only for trusted HTML',
      'Layouts via components (<x-layout> + {{ $slot }}) or @extends/@section/@yield',
      '@props declares component props with defaults',
      '$attributes->merge() passes extra HTML attributes through',
      'Compiled views are cached in storage/framework/views',
    ],
    code: `{{-- resources/views/components/alert.blade.php --}}
@props(['type' => 'info'])
<div {{ $attributes->merge(['class' => "alert alert-$type"]) }}>
    {{ $slot }}
</div>

{{-- resources/views/posts/index.blade.php --}}
<x-layout>
    <x-alert type="success">Post saved!</x-alert>

    @forelse ($posts as $post)
        <h2>{{ $post->title }}</h2>
    @empty
        <p>No posts yet.</p>
    @endforelse
</x-layout>`,
  },
  {
    id: 'lv-15',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Validation exam hall ke invigilator jaisa hai jo pehle admit card aur pen check karta hai. Kuch galat hua toh wapas bhej deta hai aur batata hai kya kami hai; Form Request us invigilator ki likhit checklist hai.',
      en: 'Validation is like the exam invigilator who checks your admit card and pen first. If something is wrong, he sends you back and tells you what is missing; a Form Request is that invigilator\'s written checklist.',
      bn: 'Validation হলো পরীক্ষার হলের গার্ডের মতো, যিনি আগে অ্যাডমিট কার্ড আর পেন দেখেন। কিছু ভুল থাকলে ফেরত পাঠান আর বলে দেন কী নেই; Form Request হলো সেই গার্ডের লেখা চেকলিস্ট।',
    },
    question: 'How does validation work in Laravel? What is a Form Request?',
    answer: 'The simplest way is $request->validate([...rules]) in the controller: if validation fails Laravel throws a ValidationException, which redirects back with errors and old input for web requests or returns a 422 JSON response for API/JSON requests. A Form Request (php artisan make:request) moves the rules and the authorize() check into a dedicated class; type-hinting it in the controller runs validation before the method body executes. Then use $request->validated() to get only the validated data.',
    points: [
      'Rules as arrays: [\'required\', \'email\', \'unique:users,email\']',
      'Form Request: authorize() + rules(), optional messages() and prepareForValidation()',
      '$request->validated() / safe()->only([...]) — never pass $request->all() to create()',
      'Blade: @error(\'title\') and old(\'title\') to show errors and refill inputs',
      'Rule objects: Rule::unique(\'users\')->ignore($user->id), custom rules via make:rule',
    ],
    code: `class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug'  => ['required', 'alpha_dash', 'unique:posts,slug'],
            'body'  => ['required', 'string', 'min:20'],
        ];
    }
}

// Controller: runs only if validation passed
public function store(StorePostRequest $request)
{
    $post = $request->user()->posts()->create($request->validated());
    return redirect()->route('posts.show', $post);
}`,
  },
  {
    id: 'lv-16',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Mass assignment shaadi ki guest list jaisa hai. $fillable mein sirf bulaaye gaye mehmaanon ke naam hain; koi bina card ke andar aana chahe toh gatekeeper use rok deta hai.',
      en: 'Mass assignment is like a wedding guest list. $fillable has only the names of invited guests; if someone without an invitation tries to walk in, the gatekeeper stops them.',
      bn: 'Mass assignment হলো বিয়ের অতিথি তালিকার মতো। $fillable-এ শুধু নিমন্ত্রিত অতিথিদের নাম আছে; কেউ কার্ড ছাড়া ঢুকতে চাইলে দারোয়ান তাকে আটকে দেয়।',
    },
    question: 'What is mass assignment? Explain $fillable and $guarded.',
    answer: 'Mass assignment means filling many model attributes at once from an array, e.g. User::create($request->all()). It is dangerous because a user could add an extra field like is_admin=1 to the form and change a column you never intended. Eloquent protects you: $fillable is a whitelist of attributes that may be mass-assigned, and $guarded is a blacklist of those that may not; attributes that are not allowed are silently discarded (or throw an exception if you enable preventSilentlyDiscardingAttributes).',
    points: [
      '$fillable = whitelist (preferred, explicit)',
      '$guarded = blacklist; $guarded = [] disables protection — risky',
      'Applies to create(), update(), fill(); not to $model->attr = ... assignments',
      'A model with no fillable attributes throws MassAssignmentException on create()',
      'Best practice: pass $request->validated(), never $request->all()',
    ],
    code: `class User extends Model
{
    protected $fillable = ['name', 'email', 'password'];
    // or: protected $guarded = ['is_admin'];
}

// Attacker adds is_admin=1 to the form...
User::create($request->all());        // is_admin is ignored (not fillable)

// Safer: only validated fields
User::create($request->validated());

// Setting a protected field deliberately
$user->is_admin = true;
$user->save();`,
  },
  {
    id: 'lv-17',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'CSRF token bank ke cheque par aapke signature jaisa hai. Koi doosra aapke naam se cheque bhare, toh signature match nahi hoga aur bank paisa nahi dega.',
      en: 'A CSRF token is like your signature on a bank cheque. If someone else fills a cheque in your name, the signature won\'t match and the bank won\'t pay.',
      bn: 'CSRF token হলো ব্যাংকের চেকে তোমার সইয়ের মতো। অন্য কেউ তোমার নামে চেক লিখলে সই মিলবে না, আর ব্যাংক টাকা দেবে না।',
    },
    question: 'How does Laravel protect against CSRF attacks?',
    answer: 'Laravel generates a CSRF token per user session and the ValidateCsrfToken middleware (in the web group) checks it on every POST, PUT, PATCH and DELETE request, rejecting mismatches with a 419 error. In Blade forms you add the @csrf directive, which outputs a hidden _token field; JavaScript clients can send the token in the X-CSRF-TOKEN header or rely on the encrypted XSRF-TOKEN cookie, which Axios sends back automatically as X-XSRF-TOKEN. In Laravel 11+ you exclude URIs such as payment webhooks in bootstrap/app.php with validateCsrfTokens(except: [...]).',
    points: [
      'CSRF = a malicious site making the logged-in user\'s browser submit a request',
      '@csrf adds <input type="hidden" name="_token">',
      'Mismatch → 419 Page Expired',
      'Only routes in the web group are checked; token-authenticated API routes are stateless',
      'Exclude webhooks via $middleware->validateCsrfTokens(except: [...])',
    ],
    code: `{{-- Blade form --}}
<form method="POST" action="{{ route('profile.update') }}">
    @csrf
    @method('PUT')
    <input name="name" value="{{ old('name', $user->name) }}">
    <button>Save</button>
</form>

// bootstrap/app.php — exclude a payment webhook
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: ['webhooks/razorpay']);
})`,
  },
  {
    id: 'lv-18',
    level: 'senior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Breeze ghar ka main gate aur chaabi hai. Sanctum society ka visitor pass hai jo apne logon (apna app, mobile) ke liye hai. Passport airport security jaisa hai jahan bahar ki airlines (third-party apps) ko bhi niyam ke saath andar aane ki ijazat milti hai.',
      en: 'Breeze is the main gate and key of your house. Sanctum is a society visitor pass for your own people (your app, your mobile app). Passport is like airport security, where outside airlines (third-party apps) also get permission to enter under strict rules.',
      bn: 'Breeze হলো বাড়ির মেইন গেট আর চাবি। Sanctum হলো আবাসনের ভিজিটর পাস, নিজেদের লোকেদের (নিজের অ্যাপ, মোবাইল) জন্য। Passport হলো এয়ারপোর্ট সিকিউরিটির মতো, যেখানে বাইরের এয়ারলাইন্সও (third-party apps) নিয়ম মেনে ঢোকার অনুমতি পায়।',
    },
    question: 'Breeze, Sanctum or Passport — which authentication option do you choose and when?',
    answer: 'Breeze is a starter kit that scaffolds session-based login, registration, password reset and email verification UI (Blade, Livewire or Inertia) — choose it for a standard full-stack web app. Sanctum is a lightweight package for SPAs on the same top-level domain (cookie/session auth with CSRF) and for simple personal access tokens for mobile apps or first-party APIs; php artisan install:api sets it up. Passport is a full OAuth2 server — use it only when third-party clients must get delegated access to your users\' data (authorization code flow, client credentials, scopes).',
    points: [
      'Breeze = UI + routes scaffolding on top of the session guard',
      'Newer Laravel versions ship React/Vue/Livewire starter kits that replace Breeze — same idea',
      'Sanctum: SPA cookie auth or API tokens with abilities; middleware auth:sanctum',
      'Passport: OAuth2 grants, clients, scopes — heavier, use only if you need OAuth2',
      'Fortify = headless auth backend if you build your own UI',
    ],
    code: `// Mobile/API tokens with Sanctum (php artisan install:api)
class User extends Authenticatable
{
    use HasApiTokens, Notifiable;
}

// Issue a token after checking credentials
$token = $user->createToken('android-app', ['orders:read'])->plainTextToken;

// routes/api.php
Route::middleware('auth:sanctum')->get('/orders', function (Request $request) {
    abort_unless($request->user()->tokenCan('orders:read'), 403);
    return $request->user()->orders;
});`,
  },
  {
    id: 'lv-19',
    level: 'mid',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Authentication school mein ghusne ka ID card hai; authorization batata hai ki aap staff room mein ja sakte ho ya nahi. Gate ek general niyam hai, policy ek subject teacher ke apne niyam hain sirf uski class ke liye.',
      en: 'Authentication is the ID card that gets you into school; authorization decides whether you may enter the staff room. A gate is a general rule, and a policy is one subject teacher\'s own rules just for her class.',
      bn: 'Authentication হলো স্কুলে ঢোকার আইডি কার্ড; authorization ঠিক করে তুমি স্টাফ রুমে যেতে পারবে কিনা। Gate হলো সাধারণ নিয়ম, আর policy হলো একজন বিষয়-শিক্ষকের নিজের ক্লাসের নিয়ম।',
    },
    question: 'How does authorization work in Laravel? Explain gates and policies.',
    answer: 'Authentication says who the user is; authorization decides what they may do. Gates are closures for general, non-model actions (e.g. \'view-reports\'), usually defined in AppServiceProvider::boot(); policies are classes that group authorization rules around one model (PostPolicy with view, update, delete) and are auto-discovered by naming convention. You check them with Gate::authorize() (throws 403), $user->can(), the can middleware on routes, or @can in Blade.',
    points: [
      'Gate::define(\'name\', fn (User $user) => ...) for simple checks',
      'php artisan make:policy PostPolicy --model=Post',
      'Gate::authorize(\'update\', $post) → AuthorizationException → 403',
      'Route: ->can(\'update\', \'post\'); Blade: @can / @cannot',
      'Gate::before() for a super-admin override',
    ],
    code: `// app/Policies/PostPolicy.php
class PostPolicy
{
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }
}

// AppServiceProvider::boot()
Gate::define('view-reports', fn (User $user) => $user->is_admin);
Gate::before(fn (User $user) => $user->is_super_admin ? true : null);

// Controller
public function update(UpdatePostRequest $request, Post $post)
{
    Gate::authorize('update', $post);
    $post->update($request->validated());
}

{{-- Blade --}}
@can('update', $post) <a href="{{ route('posts.edit', $post) }}">Edit</a> @endcan`,
  },
  {
    id: 'lv-20',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Queue restaurant ki order slip jaisi hai. Waiter aapka order kitchen mein laga deta hai aur turant agle customer ke paas chala jaata hai; cook (worker) peeche aaram se khana banata hai.',
      en: 'A queue is like a restaurant order slip. The waiter puts your order in the kitchen and immediately goes to the next customer; the cook (worker) prepares the food in the back.',
      bn: 'Queue হলো রেস্টুরেন্টের অর্ডার স্লিপের মতো। ওয়েটার তোমার অর্ডার রান্নাঘরে দিয়ে সঙ্গে সঙ্গে পরের খদ্দেরের কাছে যায়; রাঁধুনি (worker) পেছনে ধীরেসুস্থে রান্না করে।',
    },
    question: 'What are queues and jobs in Laravel and why use them?',
    answer: 'Queues let you push slow work — sending emails, generating PDFs, calling third-party APIs, resizing images — into a job that runs in the background, so the HTTP response returns quickly. A job class implements ShouldQueue and has a handle() method; you dispatch it with Job::dispatch(), and a worker started with php artisan queue:work picks it up from the configured driver (database by default in Laravel 11, or Redis, SQS, Beanstalkd). Jobs support retries ($tries, $backoff), timeouts, delays, named queues, chaining and batching, and failed jobs are stored in the failed_jobs table.',
    points: [
      'php artisan make:job SendInvoiceEmail',
      'Laravel 11+ jobs use the single Queueable trait',
      'dispatch()->onQueue(\'emails\')->delay(now()->addMinutes(5))',
      'Run workers under Supervisor in production; Horizon for Redis dashboards',
      'queue:failed, queue:retry, queue:restart after each deploy',
    ],
    code: `class SendInvoiceEmail implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;
    public array $backoff = [10, 60, 300];   // seconds between retries

    public function __construct(public Order $order) {}

    public function handle(InvoiceMailer $mailer): void
    {
        $mailer->send($this->order);
    }
}

// In a controller
SendInvoiceEmail::dispatch($order)->onQueue('emails');

// Terminal: php artisan queue:work --queue=emails,default`,
  },
  {
    id: 'lv-21',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Event school ki ghanti jaisa hai. Ghanti bajti hai (event), aur sab apna kaam karte hain: bachche lunch kholte hain, peon gate kholta hai, teacher register band karti hai (listeners). Ghanti ko pata nahi kaun kya karega.',
      en: 'An event is like the school bell. The bell rings (event) and everyone does their own job: children open lunch, the peon opens the gate, the teacher closes the register (listeners). The bell doesn\'t know who does what.',
      bn: 'Event হলো স্কুলের ঘণ্টার মতো। ঘণ্টা বাজে (event), আর সবাই নিজের কাজ করে: বাচ্চারা টিফিন খোলে, পিয়ন গেট খোলে, শিক্ষিকা রেজিস্টার বন্ধ করেন (listeners)। ঘণ্টা জানে না কে কী করবে।',
    },
    question: 'What are events and listeners in Laravel?',
    answer: 'Events implement the observer pattern: something happens (OrderPlaced) and one or more listeners react to it (send confirmation SMS, update stock, notify the warehouse) without the code that fired the event knowing about them. This decouples side effects from the main business logic. In Laravel 11+ listeners in app/Listeners are auto-discovered from the event type-hinted in their handle() method, and a listener that implements ShouldQueue runs on the queue.',
    points: [
      'php artisan make:event OrderPlaced / make:listener SendOrderConfirmation --event=OrderPlaced',
      'Fire with OrderPlaced::dispatch($order) or event(new OrderPlaced($order))',
      'Auto-discovery, or register manually with Event::listen() in a provider\'s boot()',
      'Queued listeners: implements ShouldQueue',
      'Model events (created, updated, deleted) and observers are related tools',
    ],
    code: `// app/Events/OrderPlaced.php
class OrderPlaced
{
    use Dispatchable, SerializesModels;
    public function __construct(public Order $order) {}
}

// app/Listeners/SendOrderConfirmation.php (auto-discovered)
class SendOrderConfirmation implements ShouldQueue
{
    public function handle(OrderPlaced $event): void
    {
        Mail::to($event->order->user)->send(new OrderConfirmed($event->order));
    }
}

// Somewhere in the checkout service
OrderPlaced::dispatch($order);`,
  },
  {
    id: 'lv-22',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Scheduler ek school ke time-table jaisa hai. Har period ke liye alag alarm lagane ki zaroorat nahi; ek ghadi (cron) har minute dekhti hai aur time-table ke hisaab se sahi class shuru kara deti hai.',
      en: 'The scheduler is like a school time-table. You don\'t need a separate alarm for every period; one clock (cron) checks every minute and starts the right class according to the time-table.',
      bn: 'Scheduler হলো স্কুলের রুটিনের মতো। প্রতিটা পিরিয়ডের জন্য আলাদা অ্যালার্ম লাগে না; একটা ঘড়ি (cron) প্রতি মিনিটে দেখে আর রুটিন অনুযায়ী ঠিক ক্লাস শুরু করিয়ে দেয়।',
    },
    question: 'How does task scheduling work in Laravel?',
    answer: 'Instead of writing many cron entries on the server, you define all recurring tasks in code and add a single cron entry that runs php artisan schedule:run every minute; Laravel then decides which tasks are due. In Laravel 11+ schedules are defined in routes/console.php using the Schedule facade (or withSchedule() in bootstrap/app.php). You can schedule Artisan commands, queued jobs, closures or shell commands with frequencies like everyMinute(), hourly(), dailyAt(\'02:00\') and options such as withoutOverlapping(), onOneServer() and timezone().',
    points: [
      'One cron line: * * * * * php artisan schedule:run',
      'Laravel 11+: routes/console.php with Schedule::command(...)',
      'withoutOverlapping() prevents a slow task running twice',
      'onOneServer() needs a shared cache lock (Redis/database) across servers',
      'php artisan schedule:list to inspect; schedule:work for local development',
    ],
    code: `// routes/console.php
use Illuminate\\Support\\Facades\\Schedule;

Schedule::command('reports:daily')
    ->dailyAt('02:00')
    ->timezone('Asia/Kolkata')
    ->withoutOverlapping()
    ->onOneServer();

Schedule::job(new PruneOldLogs)->weekly();
Schedule::command('model:prune')->daily();

// Server crontab (single entry)
// * * * * * cd /var/www/app && php artisan schedule:run >> /dev/null 2>&1`,
  },
  {
    id: 'lv-23',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Cache ghar ke fridge jaisa hai. Har baar bazaar (database) jaane ki jagah, roz ki cheezein fridge mein rakh lo; bas yaad rakho ki purana doodh (stale data) phenk kar naya rakhna hai.',
      en: 'A cache is like the fridge at home. Instead of going to the market (database) every time, keep daily items in the fridge; just remember to throw away old milk (stale data) and keep fresh.',
      bn: 'Cache হলো বাড়ির ফ্রিজের মতো। প্রতিবার বাজারে (database) না গিয়ে রোজকার জিনিস ফ্রিজে রেখে দাও; শুধু মনে রেখো পুরনো দুধ (stale data) ফেলে নতুন রাখতে হবে।',
    },
    question: 'How do you use caching in Laravel?',
    answer: 'Laravel offers a unified Cache API over drivers such as file, database (the default in new Laravel 11 apps), Redis, Memcached, DynamoDB and array (for tests). The most common pattern is Cache::remember(), which returns the cached value or runs the closure, stores the result for a TTL and returns it — ideal for expensive queries or API responses. You must also invalidate data when it changes (Cache::forget(), tags on Redis/Memcached, model events), and in production cache the framework itself with php artisan optimize (config, routes, views, events).',
    points: [
      'Cache::get / put / forget / remember / rememberForever',
      'Use Redis in production for speed, tags and atomic locks',
      'Cache::lock() for preventing duplicate work across servers',
      'Invalidate on update — stale cache is a common bug',
      'Framework caches: config:cache, route:cache, view:cache (php artisan optimize)',
    ],
    code: `$featured = Cache::remember('products.featured', now()->addMinutes(10), function () {
    return Product::where('featured', true)->with('category')->get();
});

// Invalidate when data changes (e.g. in a model observer)
Cache::forget('products.featured');

// Tags (Redis / Memcached only)
Cache::tags(['products'])->put("product.{$id}", $product, 600);
Cache::tags(['products'])->flush();

// Atomic lock
Cache::lock('invoice-run', 120)->get(fn () => $this->generateInvoices());`,
  },
  {
    id: 'lv-24',
    level: 'fresher',
    topic: 'laravel',
    difficulty: 'easy',
    simple: {
      hi: 'Artisan ek mistri ka tool-box hai. Usme pehle se hathoda, pench-kas sab hai, aur aap apna khud ka naya auzaar (custom command) bhi bana kar usme rakh sakte ho.',
      en: 'Artisan is a carpenter\'s toolbox. It already has a hammer, screwdriver and more, and you can also build your own new tool (custom command) and keep it in the box.',
      bn: 'Artisan হলো মিস্ত্রির যন্ত্রপাতির বাক্স। তাতে আগে থেকেই হাতুড়ি, স্ক্রুড্রাইভার সব আছে, আর তুমি নিজের নতুন যন্ত্রও (custom command) বানিয়ে তাতে রাখতে পারো।',
    },
    question: 'What is Artisan and how do you create a custom Artisan command?',
    answer: 'Artisan is Laravel\'s command-line tool: it generates code (make:model, make:controller), runs migrations, clears and builds caches, starts queue workers, lists routes and opens Tinker, a REPL for your app. You create your own command with php artisan make:command, define its $signature (name, arguments and options) and $description, and put the logic in handle(). Commands in app/Console/Commands are registered automatically, and simple ones can be written as closures in routes/console.php.',
    points: [
      'php artisan list / help <command>',
      'Signature syntax: {argument} {argument?} {--option=default}',
      '$this->argument(), $this->option(), $this->info(), $this->error(), $this->ask()',
      'handle() can type-hint services (injected by the container)',
      'Return self::SUCCESS / self::FAILURE as the exit code',
    ],
    code: `// php artisan make:command SendDailyReport
class SendDailyReport extends Command
{
    protected $signature = 'report:send {email} {--days=1 : Number of days}';
    protected $description = 'Email the sales report';

    public function handle(ReportService $reports): int
    {
        $days = (int) $this->option('days');
        $reports->send($this->argument('email'), $days);

        $this->info("Report for {$days} day(s) sent.");
        return self::SUCCESS;
    }
}

// php artisan report:send owner@shop.in --days=7`,
  },
  {
    id: 'lv-25',
    level: 'junior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'API Resource ek dukaandaar ki packing jaisa hai. Godown (database) mein bahut kuch hai, par customer ko sirf wahi saaf-suthra packet milta hai jo usne maanga, bina andar ki kachchi cheezon ke.',
      en: 'An API Resource is like a shopkeeper\'s packing. The godown (database) has lots of things, but the customer only gets a neat packet with what they asked for, without the messy internal stuff.',
      bn: 'API Resource হলো দোকানদারের প্যাকিংয়ের মতো। গুদামে (database) অনেক কিছু আছে, কিন্তু খদ্দের শুধু তার চাওয়া জিনিসের পরিষ্কার প্যাকেট পায়, ভেতরের এলোমেলো জিনিস ছাড়া।',
    },
    question: 'What are API Resources in Laravel and why use them?',
    answer: 'API Resources are transformation classes that sit between Eloquent models and the JSON your API returns. Instead of returning the model directly (which can leak columns like password hashes or tie your API to your table design), toArray() defines exactly which fields to expose, how to format them and which relations to include. Resource collections wrap results in a data key and add links and meta automatically for paginated results.',
    points: [
      'php artisan make:resource PostResource',
      'new PostResource($post) for one item, PostResource::collection($posts) for many',
      'whenLoaded(\'user\') includes a relation only if it was eager-loaded (avoids N+1)',
      'when($condition, $value) for conditional fields',
      'Keeps the public API contract stable even if the schema changes',
    ],
    code: `class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id'         => $this->id,
            'title'      => $this->title,
            'author'     => new UserResource($this->whenLoaded('user')),
            'comments_count' => $this->whenCounted('comments'),
            'is_owner'   => $this->when($request->user()?->id === $this->user_id, true),
            'created_at' => $this->created_at->toIso8601String(),
        ];
    }
}

// Controller
return PostResource::collection(
    Post::with('user')->withCount('comments')->latest()->paginate(15)
);`,
  },
  {
    id: 'lv-26',
    level: 'mid',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Testing ek cricket net practice jaisi hai. Asli match (production) se pehle nakli bowler (fakes) aur practice pitch (test database) par har shot check kar lete ho taaki match mein out na ho.',
      en: 'Testing is like cricket net practice. Before the real match (production) you check every shot against a practice bowler (fakes) on a practice pitch (test database) so you don\'t get out in the match.',
      bn: 'Testing হলো ক্রিকেটের নেট প্র্যাকটিসের মতো। আসল ম্যাচের (production) আগে নকল বোলার (fakes) আর প্র্যাকটিস পিচে (test database) প্রতিটা শট দেখে নাও, যাতে ম্যাচে আউট না হও।',
    },
    question: 'How do you test a Laravel application with Pest or PHPUnit?',
    answer: 'Laravel ships with testing set up for both Pest and PHPUnit (Pest is a nicer functional syntax on top of PHPUnit), with tests/Feature for HTTP-level tests and tests/Unit for isolated classes, run via php artisan test. Feature tests call routes with $this->get()/post()/postJson(), authenticate with actingAs(), and assert on status, JSON, redirects and database state; RefreshDatabase resets the database between tests and factories create data. Fakes like Queue::fake(), Mail::fake(), Event::fake(), Storage::fake() and Http::fake() let you assert side effects without really sending anything.',
    points: [
      'php artisan test (supports --parallel and --filter)',
      'RefreshDatabase + factories for isolated database state',
      'assertOk(), assertRedirect(), assertJsonPath(), assertDatabaseHas()',
      'Fakes: Queue/Mail/Notification/Event/Http/Storage',
      'phpunit.xml sets the testing environment (often SQLite in memory)',
    ],
    code: `// tests/Feature/CreatePostTest.php (Pest)
use App\\Jobs\\NotifyFollowers;
use App\\Models\\User;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Illuminate\\Support\\Facades\\Queue;

uses(RefreshDatabase::class);

it('lets a logged-in user create a post', function () {
    Queue::fake();
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/posts', ['title' => 'Hello', 'slug' => 'hello', 'body' => str_repeat('a', 30)])
        ->assertRedirect();

    $this->assertDatabaseHas('posts', ['title' => 'Hello', 'user_id' => $user->id]);
    Queue::assertPushed(NotifyFollowers::class);
});`,
  },
  {
    id: 'lv-27',
    level: 'senior',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'Framework chunna gaadi chunne jaisa hai. Laravel ek fully-loaded SUV hai jisme sab features hain, Symfony ek truck jo bhaari kaam ke liye mazboot hai, aur Slim ek scooty jo chhoti doori ke liye halki aur tez hai.',
      en: 'Choosing a framework is like choosing a vehicle. Laravel is a fully-loaded SUV with every feature, Symfony is a strong truck for heavy work, and Slim is a light scooter that is quick for short trips.',
      bn: 'Framework বেছে নেওয়া গাড়ি বাছার মতো। Laravel হলো সব ফিচারওয়ালা SUV, Symfony ভারী কাজের জন্য মজবুত ট্রাক, আর Slim ছোট রাস্তার জন্য হালকা, দ্রুত স্কুটি।',
    },
    question: 'How does Laravel compare with other PHP frameworks like Symfony, CodeIgniter and Slim?',
    answer: 'Laravel optimises for developer productivity: expressive syntax, convention over configuration, an ActiveRecord ORM (Eloquent) and a large first-party ecosystem (Horizon, Octane, Livewire, Inertia, Forge/Vapor/Cloud). Symfony is more explicit and configurable with a reusable component library and the Doctrine data-mapper ORM — often chosen for very large, long-lived enterprise systems; Laravel itself uses several Symfony components. CodeIgniter and Slim are much lighter (CodeIgniter a small full-stack MVC, Slim a micro-framework for APIs), giving speed and simplicity but leaving you to assemble auth, queues and ORM yourself.',
    points: [
      'Laravel: fastest to build CRUD/SaaS apps, huge community and packages',
      'Trade-offs: \'magic\' (facades, ActiveRecord) can hide coupling in large codebases',
      'Symfony: explicit DI config, Doctrine, strong for complex domains',
      'CodeIgniter / Slim: small footprint, fewer built-in features',
      'Pick based on team skills, project size, ecosystem needs and long-term maintenance',
    ],
  },
  {
    id: 'lv-28',
    level: 'mid',
    topic: 'laravel',
    difficulty: 'medium',
    simple: {
      hi: 'N+1 aisa hai jaise 50 bachchon ke liye 50 baar dukaan jaakar ek-ek chocolate laana. Eager loading matlab ek hi baar dukaan jaakar 50 chocolate ek saath le aana.',
      en: 'N+1 is like going to the shop 50 times to buy one chocolate each for 50 children. Eager loading means going once and bringing all 50 chocolates together.',
      bn: 'N+1 হলো ৫০ জন বাচ্চার জন্য ৫০ বার দোকানে গিয়ে একটা একটা করে চকোলেট আনার মতো। Eager loading মানে একবার দোকানে গিয়ে ৫০টা চকোলেট একসঙ্গে নিয়ে আসা।',
    },
    question: 'Scenario: a page listing 50 posts with their authors is slow and the debug bar shows 51+ queries. What is wrong and how do you fix it?',
    answer: 'This is the N+1 query problem: one query loads the posts, then accessing $post->user inside the loop lazily runs one extra query per post. Fix it with eager loading — Post::with(\'user\')->get() loads all authors in a single WHERE IN query, so the page uses 2 queries instead of 51 — and use with(\'comments.user\') for nested relations, withCount() for counts, and load() if the models are already fetched. To prevent it coming back, enable Model::preventLazyLoading() outside production so any lazy load throws an exception, and watch query counts with Debugbar or Telescope.',
    points: [
      'Symptom: query count grows with the number of rows',
      'with() eager loads; load() lazy-eager-loads on an existing collection',
      'withCount(\'comments\') instead of $post->comments->count()',
      'Select only needed columns: with(\'user:id,name\') and paginate()',
      'Model::preventLazyLoading(! app()->isProduction()) in AppServiceProvider::boot()',
      'Then check indexes on foreign keys and caching if still slow',
    ],
    code: `// Bad: 1 query for posts + 1 query per post = N+1
$posts = Post::latest()->take(50)->get();
foreach ($posts as $post) {
    echo $post->user->name;
}

// Good: 2 queries in total (+1 for the counts)
$posts = Post::with('user:id,name')
    ->withCount('comments')
    ->latest()
    ->take(50)
    ->get();

// AppServiceProvider::boot() — fail fast during development
Model::preventLazyLoading(! app()->isProduction());`,
  },
  {
    id: 'lv-29',
    level: 'senior',
    topic: 'laravel',
    difficulty: 'hard',
    simple: {
      hi: 'Socho courier baar-baar parcel deliver nahi kar pa raha. Pehle wapas aayi slip padho (failed_jobs) ki address galat tha ya ghar band tha; phir thoda ruk kar dobara bhejo, aur dhyan rakho ki ek hi parcel do baar na pahunch jaaye.',
      en: 'Imagine a courier keeps failing to deliver a parcel. First read the returned slip (failed_jobs) to see if the address was wrong or the house was locked; then try again after a pause, and make sure the same parcel is never delivered twice.',
      bn: 'ভাবো এক কুরিয়ার বারবার পার্সেল পৌঁছাতে পারছে না। আগে ফেরত আসা স্লিপ (failed_jobs) পড়ো, ঠিকানা ভুল ছিল নাকি বাড়ি বন্ধ ছিল; তারপর একটু থেমে আবার পাঠাও, আর খেয়াল রাখো একই পার্সেল যেন দুবার না পৌঁছায়।',
    },
    question: 'Scenario: a queued job keeps failing or retrying in production. How do you debug and fix it?',
    answer: 'First find the real error: check php artisan queue:failed / the failed_jobs table (it stores the exception), the logs, and Horizon or Telescope if available. Common causes are workers running old code after a deploy (fix: php artisan queue:restart), a job $timeout longer than the connection\'s retry_after so the job is picked up twice, a model deleted before the job ran (SerializesModels → ModelNotFoundException; use $deleteWhenMissingModels), and flaky external APIs or rate limits. Then make the job resilient: sensible $tries and backoff, a failed() method for alerts, idempotent handle() logic, job middleware like WithoutOverlapping or RateLimited, and retry with queue:retry once fixed.',
    points: [
      'Read the stored exception before changing code',
      'timeout must be shorter than retry_after in config/queue.php',
      'queue:restart on every deploy — workers are long-lived processes',
      'Idempotency: running the job twice must not double-charge or double-send',
      'Use backoff, failed(), job middleware; monitor with Horizon/Supervisor',
    ],
    code: `class SyncOrderToErp implements ShouldQueue
{
    use Queueable;

    public int $tries = 5;
    public int $timeout = 120;                 // keep below retry_after
    public bool $deleteWhenMissingModels = true;

    public function __construct(public Order $order) {}

    public function backoff(): array { return [30, 120, 600]; }

    public function middleware(): array { return [(new WithoutOverlapping($this->order->id))->releaseAfter(60)]; }

    public function handle(ErpClient $erp): void
    {
        $erp->upsertOrder($this->order);       // upsert = idempotent
    }

    public function failed(?Throwable $e): void
    {
        Log::error('ERP sync failed', ['order' => $this->order->id, 'error' => $e?->getMessage()]);
    }
}`,
  },
  {
    id: 'lv-30',
    level: 'senior',
    topic: 'laravel',
    difficulty: 'hard',
    simple: {
      hi: 'Deployment chalti train ka engine badalne jaisa nahi hona chahiye. Naya engine (release) bagal ki line par poori tarah ready karo, check karo, phir ek jhatke mein switch karo; gadbad ho toh purana engine turant wapas lagao.',
      en: 'Deployment should not be like changing the engine of a moving train. Get the new engine (release) fully ready on the next track, check it, then switch in one go; if anything goes wrong, put the old engine back immediately.',
      bn: 'Deployment যেন চলন্ত ট্রেনের ইঞ্জিন বদলানোর মতো না হয়। নতুন ইঞ্জিন (release) পাশের লাইনে পুরো তৈরি করো, পরীক্ষা করো, তারপর এক ঝটকায় বদলাও; গোলমাল হলে সঙ্গে সঙ্গে পুরনো ইঞ্জিন ফিরিয়ে লাগাও।',
    },
    question: 'Scenario: how do you deploy a Laravel application to production safely?',
    answer: 'Run tests and static analysis in CI first, then deploy each release into a new directory and switch a \'current\' symlink only when it is fully prepared (zero-downtime, as tools like Envoyer, Deployer or Forge do). The build installs dependencies with composer install --no-dev --optimize-autoloader, builds assets, runs backward-compatible migrations with php artisan migrate --force, and caches config, routes, views and events with php artisan optimize; .env has APP_ENV=production and APP_DEBUG=false. After the switch, run php artisan queue:restart so workers load the new code, reload PHP-FPM/Octane, watch the /up health check, logs and error tracking, and keep a quick rollback (the previous release) ready.',
    points: [
      'Never deploy with APP_DEBUG=true — it leaks secrets in error pages',
      'Migrations must work with both old and new code (expand → migrate → contract)',
      'After config:cache, env() only works inside config files',
      'queue:restart and reload FPM/Octane so nothing runs stale code',
      'php artisan down --secret=... for risky maintenance; keep backups and a rollback path',
    ],
    code: `# deploy.sh — runs inside the new release directory
set -e
composer install --no-dev --optimize-autoloader --no-interaction
npm ci && npm run build
ln -sfn /var/www/shared/.env .env
rm -rf storage && ln -sfn /var/www/shared/storage storage

php artisan migrate --force
php artisan optimize            # config, events, routes, views caches

ln -sfn "$PWD" /var/www/current # switch to the new release
php artisan queue:restart
sudo systemctl reload php8.3-fpm
curl -fsS https://example.com/up`,
  },
  {
    id: 'pp-1',
    level: 'fresher',
    topic: 'php-core',
    difficulty: 'easy',
    simple: {
      hi: 'PHP ek restaurant ke kitchen jaisa hai. Customer (browser) waiter (Nginx) ko order deta hai, waiter use cook (PHP-FPM) tak le jaata hai, cook khana banata hai aur sirf plate bahar aati hai, recipe nahi. Har order ke baad kitchen saaf ho jaata hai.',
      en: 'PHP is like a restaurant kitchen. The customer (browser) gives the order to the waiter (Nginx), the waiter takes it to a cook (PHP-FPM), and only the finished plate comes out, never the recipe. After every order the kitchen is cleaned.',
      bn: 'PHP হলো রেস্টুরেন্টের রান্নাঘরের মতো। Customer (browser) waiter (Nginx)-কে order দেয়, waiter সেটা রাঁধুনি (PHP-FPM)-র কাছে নিয়ে যায়, আর বাইরে শুধু তৈরি খাবারের প্লেট আসে, রেসিপি নয়। প্রতিটা order-এর পরে রান্নাঘর আবার পরিষ্কার হয়ে যায়।',
    },
    question: 'What is PHP and how is a PHP request served by a web server?',
    answer: 'PHP is an open-source, server-side scripting language mainly used to build web pages and APIs. The browser sends a request to a web server such as Nginx, which forwards .php requests over FastCGI to PHP-FPM; a worker process compiles the script to opcodes (cached by OPcache), executes it and sends the output back as the HTTP response. PHP follows a share-nothing model: every request starts with a fresh state, so data that must survive between requests lives in sessions, a database or a cache.',
    points: [
      'Server-side: the browser receives only the generated HTML/JSON, never the PHP source',
      'Nginx + PHP-FPM (FastCGI Process Manager) is the common production setup; Apache mod_php is the older alternative',
      'PHP-FPM keeps a pool of worker processes; each handles one request at a time',
      'Zend Engine compiles code to opcodes; OPcache keeps them in shared memory',
      'Share-nothing per request: variables and objects are destroyed when the request ends',
      'The same language also runs on the CLI for scripts, cron jobs and queue workers',
    ],
    code: `# nginx: hand .php files to PHP-FPM over FastCGI
location ~ \\.php$ {
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    fastcgi_pass unix:/run/php/php8.3-fpm.sock;
}

<?php
// public/index.php - runs fresh for every request
$name = $_GET['name'] ?? 'World';
echo 'Hello, ' . htmlspecialchars($name);`,
  },
  {
    id: 'pp-2',
    level: 'fresher',
    topic: 'php-core',
    difficulty: 'easy',
    simple: {
      hi: 'echo aur print dono school ke announcement mic jaise hain. echo ek saath kai announcements bol deta hai aur kuch wapas nahi deta, print ek hi announcement bolta hai aur baad mein \'1\' bol ke batata hai ki ho gaya.',
      en: 'echo and print are both like the school announcement mic. echo can read several announcements at once and gives nothing back, while print reads only one and then says \'1\' to tell you it is done.',
      bn: 'echo আর print দুটোই স্কুলের announcement mic-এর মতো। echo একসাথে অনেকগুলো ঘোষণা পড়তে পারে আর কিছু ফেরত দেয় না, print শুধু একটা ঘোষণা পড়ে আর শেষে \'1\' বলে জানায় যে কাজ হয়ে গেছে।',
    },
    question: 'What is the difference between echo and print in PHP?',
    answer: 'Both are language constructs (not real functions) that output strings. echo has no return value and can take several comma-separated arguments; print takes exactly one argument and always returns 1, so it can be used inside an expression. In practice echo is used almost everywhere; the speed difference is negligible.',
    points: [
      'Both are language constructs, so parentheses are optional',
      'echo: no return value, accepts multiple arguments (echo $a, $b;)',
      'print: one argument only, returns 1, usable in expressions',
      '<?= $x ?> is the short echo tag used in templates',
      'For debugging structures use print_r() or var_dump(), not echo',
    ],
    code: `<?php
$name = 'Asha';
echo 'Hello, ', $name, PHP_EOL;   // multiple arguments
print 'Hi ' . $name . PHP_EOL;     // single argument

$result = print '';                 // print returns 1
echo $result, PHP_EOL;              // 1

// echo cannot be used as an expression:
// $x = echo 'a';  // Parse error`,
  },
  {
    id: 'pp-3',
    level: 'fresher',
    topic: 'php-core',
    difficulty: 'easy',
    simple: {
      hi: '== ek relaxed ticket checker jaisa hai jo sirf seat number dekhta hai, chahe ticket print ho ya SMS. === strict TT hai jo seat number ke saath ticket ka type bhi match karta hai.',
      en: '== is like a relaxed ticket checker who only looks at the seat number, whether the ticket is printed or an SMS. === is the strict TC who checks the seat number and also the type of ticket.',
      bn: '== হলো একজন ঢিলেঢালা টিকিট চেকারের মতো, যে শুধু সিট নম্বর দেখে, টিকিট ছাপা হোক বা SMS। === হলো কড়া TC, যে সিট নম্বরের সাথে টিকিটের ধরনও মিলিয়ে দেখে।',
    },
    question: 'What is the difference between == and === in PHP, and what is type juggling?',
    answer: '== is loose comparison: PHP converts (juggles) the operands to a common type before comparing, so "1" == "01" is true. === is strict comparison: it is true only when both value and type are the same, so 1 === 1.0 is false. Since PHP 8, comparing a number with a non-numeric string compares them as strings, so 0 == "a" is now false (it was true in PHP 7), but loose comparison still has surprises, so prefer === and !==.',
    points: [
      'Type juggling = automatic type conversion based on context',
      '== compares after conversion; === compares value and type',
      'PHP 8 changed number vs non-numeric-string comparison: 0 == "a" is false',
      'Numeric strings are still compared as numbers: "10" == "1e1" is true',
      'Use strict mode in in_array($x, $arr, true) and check strpos()/array_search() with !== false',
    ],
    code: `<?php
var_dump(0 == "a");        // bool(false) in PHP 8 (true in PHP 7)
var_dump("1" == "01");     // bool(true)  - both numeric strings
var_dump("10" == "1e1");   // bool(true)
var_dump(null == false);   // bool(true)
var_dump(1 === 1.0);       // bool(false) - int vs float

$pos = strpos("php", "p"); // 0
if ($pos !== false) {      // == false would wrongly treat 0 as "not found"
    echo "found at $pos";
}`,
  },
  {
    id: 'pp-4',
    level: 'fresher',
    topic: 'php-core',
    difficulty: 'easy',
    simple: {
      hi: 'Indexed array train ke coach jaisa hai - S1, S2, S3 number se dhundhte ho. Associative array school ki register jaisa hai jahan har bachche ke naam ke aage uske marks likhe hote hain.',
      en: 'An indexed array is like train coaches - you find them by number: 0, 1, 2. An associative array is like a school register where each child\'s name has their marks written next to it.',
      bn: 'Indexed array হলো ট্রেনের কামরার মতো - নম্বর দিয়ে খুঁজে পাও: 0, 1, 2। Associative array হলো স্কুলের রেজিস্টারের মতো, যেখানে প্রত্যেক ছাত্রের নামের পাশে তার নম্বর লেখা থাকে।',
    },
    question: 'Explain indexed and associative arrays in PHP and the array functions you use most.',
    answer: 'A PHP array is an ordered map of keys to values. An indexed array uses integer keys (0, 1, 2 …) and an associative array uses string keys like \'name\' => \'Ravi\'; both are the same type and can be mixed or nested. Common functions are count, in_array, array_key_exists, array_map, array_filter, array_reduce, array_column, array_merge, the sort family (sort, asort, ksort, usort) and implode/explode.',
    points: [
      'Arrays are ordered maps: insertion order is preserved',
      'array_filter keeps original keys - wrap with array_values() to reindex',
      'isset($a[\'k\']) is false when the value is null; array_key_exists() is not',
      'array_merge renumbers integer keys; the + operator keeps the left-hand keys',
      'sort/rsort drop keys, asort/arsort keep keys, ksort sorts by key, usort takes a comparator',
      'Arrays are copied by value (copy-on-write) when passed to functions',
    ],
    code: `<?php
$marks = ['Ravi' => 72, 'Asha' => 91, 'John' => 58];   // associative
$cities = ['Kolkata', 'Pune', 'Delhi'];                // indexed

$passed = array_filter($marks, fn($m) => $m >= 60);    // keys kept
$names  = array_keys($passed);                         // ['Ravi', 'Asha']
$total  = array_sum($marks);                           // 221
$upper  = array_map('strtoupper', $cities);            // ['KOLKATA', 'PUNE', 'DELHI']

arsort($marks);                     // highest first, keys kept
echo array_key_first($marks);       // Asha
echo implode(', ', $cities);        // Kolkata, Pune, Delhi`,
  },
  {
    id: 'pp-5',
    level: 'fresher',
    topic: 'php-core',
    difficulty: 'easy',
    simple: {
      hi: 'require school bag mein textbook jaisa hai - bhool gaye to class mein baith hi nahi sakte. include colour pencil jaisa hai - na ho to teacher daantegi (warning) par class chalti rahegi. _once matlab ek hi copy bag mein daalo, do baar nahi.',
      en: 'require is like the textbook in your school bag - forget it and you cannot attend class. include is like colour pencils - if missing, the teacher scolds you (a warning) but class goes on. _once means put only one copy in the bag, never two.',
      bn: 'require হলো স্কুল ব্যাগের পাঠ্যবইয়ের মতো - ভুলে গেলে ক্লাসেই বসা যাবে না। include হলো রঙ পেন্সিলের মতো - না থাকলে টিচার বকবেন (warning), কিন্তু ক্লাস চলতে থাকবে। _once মানে ব্যাগে একটাই কপি রাখো, দুটো নয়।',
    },
    question: 'What is the difference between include, require, include_once and require_once?',
    answer: 'All four load and execute another PHP file. If the file is missing, include only emits a warning and the script continues, while require stops the script with a fatal error, so require is used for files the app cannot run without. The _once variants first check whether that file was already loaded and skip it if so, preventing "cannot redeclare function/class" errors.',
    points: [
      'include → warning on failure, execution continues',
      'require → fatal error on failure, execution stops',
      '_once → loads a file only once per request (slightly more work to track it)',
      'An included file can return a value: $config = require \'config.php\';',
      'Modern code relies on Composer autoloading; usually only require \'vendor/autoload.php\' is written by hand',
      'Never include paths built from user input (local/remote file inclusion)',
    ],
    code: `<?php
require_once __DIR__ . '/vendor/autoload.php'; // must exist, load once
$config = require __DIR__ . '/config.php';     // config.php does: return ['debug' => false];

include __DIR__ . '/partials/banner.php';       // optional: warning if missing
echo 'Page still renders';

// config.php
// <?php
// return ['debug' => false, 'db' => 'mysql:host=localhost;dbname=shop'];`,
  },
  {
    id: 'pp-6',
    level: 'fresher',
    topic: 'php-core',
    difficulty: 'easy',
    simple: {
      hi: 'GET postcard jaisa hai - jo likha hai sab bahar se padh sakte ho. POST band lifafe jaisa hai - andar ka message bahar nahi dikhta. Superglobals post office ke counter jaise hain jo har jagah se dikhte hain.',
      en: 'GET is like a postcard - anyone can read what is written on the outside. POST is like a sealed envelope - the message is inside, not on the cover. Superglobals are like post office counters you can reach from anywhere.',
      bn: 'GET হলো পোস্টকার্ডের মতো - যা লেখা আছে সবাই বাইরে থেকেই পড়তে পারে। POST হলো বন্ধ খামের মতো - বার্তা ভেতরে থাকে, বাইরে দেখা যায় না। Superglobals হলো পোস্ট অফিসের কাউন্টারের মতো, যেকোনো জায়গা থেকে পৌঁছানো যায়।',
    },
    question: 'What are superglobals in PHP, and what is the difference between GET and POST?',
    answer: 'Superglobals are built-in arrays available in every scope: $_GET, $_POST, $_REQUEST, $_SERVER, $_COOKIE, $_SESSION, $_FILES, $_ENV and $GLOBALS. GET sends data in the URL query string, so it is visible, bookmarkable, cacheable and size-limited, and should be used for reading data. POST sends data in the request body, is used for actions that change state (login, create order, file upload) and is not cached or bookmarked; neither is encrypted unless the site uses HTTPS.',
    points: [
      'Superglobals need no global keyword - available in functions and methods',
      'GET: query string, idempotent reads, appears in logs and browser history',
      'POST: request body, state changes, file uploads via multipart/form-data',
      '$_POST is filled only for form encodings; read a JSON body with file_get_contents(\'php://input\')',
      'Always validate input and escape output; avoid $_REQUEST because its source is ambiguous',
    ],
    code: `<?php
// GET /search.php?q=phone
$q = trim($_GET['q'] ?? '');
echo 'Results for ' . htmlspecialchars($q);

// POST form or JSON API
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $json  = json_decode(file_get_contents('php://input'), true);
}`,
  },
  {
    id: 'pp-7',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Type declaration tiffin ke dabbe pe likhe label jaisa hai: \'sirf roti\' (int), \'roti ya chawal\' (int|string), \'roti ya khaali\' (?int), \'kuch bhi\' (mixed). Galat cheez daali to maa (PHP) turant TypeError bol deti hai.',
      en: 'A type declaration is like a label on a tiffin box: \'only roti\' (int), \'roti or rice\' (int|string), \'roti or empty\' (?int), \'anything\' (mixed). Put the wrong thing in and Mom (PHP) immediately says TypeError.',
      bn: 'Type declaration হলো টিফিন বাক্সের লেবেলের মতো: \'শুধু রুটি\' (int), \'রুটি বা ভাত\' (int|string), \'রুটি বা খালি\' (?int), \'যা খুশি\' (mixed)। ভুল জিনিস রাখলে মা (PHP) সঙ্গে সঙ্গে TypeError বলে দেন।',
    },
    question: 'What data types does PHP have, and how do type declarations like union, nullable and mixed work?',
    answer: 'PHP has scalar types (bool, int, float, string), compound types (array, object, callable, iterable) and special types (null, resource). You can declare types on parameters, return values and properties: ?int means int or null, int|string is a union type, mixed accepts any value including null, void means no return value and never means the function always throws or exits. PHP checks these at runtime and throws a TypeError when a value does not match.',
    points: [
      '?T is shorthand for T|null',
      'Union types: int|float, string|array; intersection types: A&B for objects',
      'mixed already includes null, so ?mixed is not allowed',
      'Special return types: void, never, static',
      'Typed properties are uninitialized (not null) until assigned',
      'gettype() / get_debug_type() show a value\'s type at runtime',
    ],
    code: `<?php
function findPrice(int|string $id): ?float {      // union param, nullable return
    $prices = [1 => 99.5, 'A2' => 150.0];
    return $prices[$id] ?? null;
}

function logValue(mixed $value): void {
    echo get_debug_type($value), PHP_EOL;
}

function fail(string $msg): never {
    throw new RuntimeException($msg);
}

var_dump(findPrice('A2'));   // float(150)
var_dump(findPrice(7));      // NULL
logValue([1, 2]);            // array`,
  },
  {
    id: 'pp-8',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'strict_types cricket ke third umpire jaisa hai. Bina uske, umpire \'lagbhag out\' ko bhi out de deta hai (type ko convert kar leta hai). strict_types on karo to har cheez exactly sahi honi chahiye, warna seedha TypeError.',
      en: 'strict_types is like the third umpire in cricket. Without it, the on-field umpire may accept \'almost right\' (it converts the type). Turn strict_types on and everything must be exactly right, or you get a TypeError.',
      bn: 'strict_types হলো ক্রিকেটের থার্ড আম্পায়ারের মতো। এটা ছাড়া মাঠের আম্পায়ার \'প্রায় ঠিক\' জিনিসও মেনে নেন (type বদলে নেন)। strict_types চালু করলে সবকিছু একদম ঠিক হতে হবে, নাহলে সোজা TypeError।',
    },
    question: 'What does declare(strict_types=1) do in PHP?',
    answer: 'By default PHP is in coercive mode: a scalar argument like "5" passed to an int parameter is silently converted to 5. declare(strict_types=1) turns on strict mode for the file, so calls made from that file must pass exactly the declared scalar type, otherwise a TypeError is thrown; the only allowed conversion is int to float. It must be the very first statement in the file and applies per file, not globally.',
    points: [
      'Must be the first statement of the file (only the opening tag before it)',
      'Affects calls made FROM that file, including calls to built-in functions',
      'Return type checks follow the mode of the file where the function is declared',
      'int → float widening is still allowed in strict mode',
      'Catches bugs early; most modern projects and PSR-style templates enable it everywhere',
    ],
    code: `<?php
declare(strict_types=1);

function add(int $a, int $b): int
{
    return $a + $b;
}

echo add(2, 3), PHP_EOL;          // 5

try {
    echo add("2", 3);
} catch (TypeError $e) {
    echo get_class($e), PHP_EOL;  // TypeError (without strict_types it would print 5)
}`,
  },
  {
    id: 'pp-9',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Cookie aapki jeb mein rakhi parchi jaisi hai - aap khud use badal bhi sakte ho. Session bank locker jaisa hai - saman bank (server) mein rehta hai, aapke paas sirf locker ki chaabi (session ID) hoti hai.',
      en: 'A cookie is like a slip of paper in your pocket - you can change it yourself. A session is like a bank locker - the valuables stay in the bank (server) and you only carry the locker key (session ID).',
      bn: 'Cookie হলো পকেটে রাখা একটা চিরকুটের মতো - তুমি নিজেই সেটা বদলাতে পারো। Session হলো ব্যাংকের লকারের মতো - জিনিস ব্যাংকে (server) থাকে, তোমার কাছে শুধু লকারের চাবি (session ID) থাকে।',
    },
    question: 'What is the difference between sessions and cookies in PHP?',
    answer: 'A cookie is a small piece of data (about 4 KB) stored in the browser and sent with every request, so the user can read and change it. A session stores data on the server (files by default, often Redis in production) and only keeps a random session ID in a cookie (PHPSESSID) to identify the user. Use sessions for sensitive state like the logged-in user, and cookies for small, non-sensitive preferences.',
    points: [
      'Cookie: client-side, size-limited, can live for days; never trust its value',
      'Session: server-side data keyed by a session ID cookie; ends on expiry/logout',
      'Call session_start() before any output is sent',
      'Call session_regenerate_id(true) after login to prevent session fixation',
      'Set cookie flags Secure, HttpOnly and SameSite',
      'The default file handler locks the session per request - call session_write_close() early in long requests',
    ],
    code: `<?php
session_start();

// after successful login
session_regenerate_id(true);
$_SESSION['user_id'] = 42;

// small, non-sensitive preference in a cookie
setcookie('theme', 'dark', [
    'expires'  => time() + 60 * 60 * 24 * 30,
    'path'     => '/',
    'secure'   => true,
    'httponly' => true,
    'samesite' => 'Lax',
]);

echo $_COOKIE['theme'] ?? 'light'; // available from the next request`,
  },
  {
    id: 'pp-10',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Interface ek job description jaisa hai - \'driver ko gaadi chalani aani chahiye\', kaise sikha ye nahi batata. Abstract class aadha bana hua ghar hai - deewarein tayyar hain, bas kuch kamre aapko khud banane hain.',
      en: 'An interface is like a job description - \'a driver must be able to drive\' - without saying how. An abstract class is like a half-built house - the walls are ready, and you only finish a few rooms yourself.',
      bn: 'Interface হলো একটা job description-এর মতো - \'ড্রাইভারকে গাড়ি চালাতে জানতে হবে\', কীভাবে শিখবে তা বলে না। Abstract class হলো অর্ধেক তৈরি বাড়ির মতো - দেয়াল তৈরি, শুধু কয়েকটা ঘর তোমাকে নিজে বানাতে হবে।',
    },
    question: 'What is the difference between an abstract class and an interface in PHP?',
    answer: 'An interface is a pure contract: it declares public method signatures (and constants) with no state, and a class can implement many interfaces. An abstract class cannot be instantiated and can mix abstract methods with fully implemented methods, properties and a constructor, but a class can extend only one class. Use an interface to define what something can do across unrelated classes, and an abstract class to share common code in a family of related classes.',
    points: [
      'Interface: method signatures + constants, all methods public',
      'Abstract class: abstract and concrete methods, properties, constructor, any visibility',
      'A class implements many interfaces but extends only one class',
      'Type-hint against interfaces to keep code loosely coupled (dependency inversion)',
      'Common pattern: interface for the contract + abstract base class for shared defaults',
    ],
    code: `<?php
interface PaymentGateway {
    public function charge(int $paise): bool;
}

abstract class BaseGateway implements PaymentGateway {
    public function __construct(protected string $apiKey) {}

    protected function log(string $msg): void {
        echo static::class . ": $msg" . PHP_EOL;
    }
}

final class UpiGateway extends BaseGateway {
    public function charge(int $paise): bool {
        $this->log("charging $paise paise");
        return true;
    }
}

(new UpiGateway('key_123'))->charge(5000); // UpiGateway: charging 5000 paise`,
  },
  {
    id: 'pp-11',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Trait ek recipe card jaisa hai jo aap alag alag ghar ki rasoi mein chipka sakte ho. Ghar alag families ke hain (alag parent class), par sab wahi masala chai bana lete hain.',
      en: 'A trait is like a recipe card you can stick in different kitchens. The houses belong to different families (different parent classes), but all of them can now make the same masala chai.',
      bn: 'Trait হলো একটা রেসিপি কার্ডের মতো, যেটা আলাদা আলাদা বাড়ির রান্নাঘরে লাগিয়ে দেওয়া যায়। বাড়িগুলো আলাদা পরিবারের (আলাদা parent class), কিন্তু সবাই একই মশলা চা বানাতে পারে।',
    },
    question: 'What are traits in PHP and when would you use them?',
    answer: 'A trait is a group of methods (and properties) that you copy into classes with the use keyword, giving horizontal code reuse in a single-inheritance language. It is useful for small cross-cutting behaviour like timestamps, logging or soft deletes shared by unrelated classes. A trait is not a type, so you cannot type-hint or use instanceof with it; if two traits define the same method you resolve the conflict with insteadof and as.',
    points: [
      'Reuse code across classes that do not share a parent',
      'A class can use several traits',
      'Precedence: class method > trait method > inherited method',
      'Conflicts resolved with insteadof; aliases and visibility changes with as',
      'Traits can declare abstract and static methods and properties',
      'Overuse hides dependencies - prefer composition for larger behaviour',
    ],
    code: `<?php
trait HasTimestamps {
    public ?string $createdAt = null;

    public function touch(): void {
        $this->createdAt = date('Y-m-d H:i:s');
    }
}

trait Greets      { public function hello(): string { return 'Hello'; } }
trait GreetsHindi { public function hello(): string { return 'Namaste'; } }

class Customer {
    use HasTimestamps;
    use Greets, GreetsHindi {
        GreetsHindi::hello insteadof Greets;
        Greets::hello as helloEnglish;
    }
}

$c = new Customer();
echo $c->hello(), ' / ', $c->helloEnglish(); // Namaste / Hello`,
  },
  {
    id: 'pp-12',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Namespace ghar ke address jaisa hai - do bachchon ka naam \'Rahul\' ho sakta hai par ek Kolkata mein hai, ek Pune mein. PSR-4 autoloading ek smart postman hai jo address dekh ke seedha sahi ghar (file) tak pahunch jaata hai.',
      en: 'A namespace is like a home address - two kids can both be called \'Rahul\' but one lives in Kolkata and one in Pune. PSR-4 autoloading is a smart postman who reads the address and goes straight to the right house (file).',
      bn: 'Namespace হলো বাড়ির ঠিকানার মতো - দুটো বাচ্চার নাম \'রাহুল\' হতে পারে, কিন্তু একজন কলকাতায়, আরেকজন পুনেতে থাকে। PSR-4 autoloading হলো এক চালাক পোস্টম্যান, যে ঠিকানা দেখে সোজা সঠিক বাড়িতে (file) পৌঁছে যায়।',
    },
    question: 'What are namespaces in PHP, and how does PSR-4 autoloading with Composer work?',
    answer: 'Namespaces group related classes, functions and constants under a name like App\\Models, so two libraries can each have a User class without a clash; you import them with the use statement. PSR-4 is a standard that maps a namespace prefix to a base directory, so App\\Models\\User lives in src/Models/User.php. Composer reads the psr-4 section of composer.json, generates vendor/autoload.php, and classes are then loaded automatically the first time they are used, with no manual require.',
    points: [
      'namespace must be declared at the top of the file; one class per file by convention',
      'use App\\Models\\User; and aliases: use App\\Models\\User as AppUser;',
      'PSR-4: namespace prefix → base directory, sub-namespaces → sub-folders, class name → file name',
      'Run composer dump-autoload after changing the autoload config',
      'In production use composer dump-autoload -o (optimized classmap)',
      'Leading backslash means global namespace: \\DateTime, \\strlen()',
    ],
    code: `// composer.json
{
    "autoload": {
        "psr-4": { "App\\\\": "src/" }
    }
}

<?php
// src/Models/User.php
namespace App\\Models;

final class User {
    public function __construct(public string $name) {}
}

<?php
// public/index.php
require __DIR__ . '/../vendor/autoload.php';

use App\\Models\\User;

echo (new User('Priya'))->name; // Priya - file loaded automatically`,
  },
  {
    id: 'pp-13',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Magic methods ghar ke automatic sensor light jaise hain. Aap switch nahi dabate, par jaise hi koi andar aata hai (koi event hota hai), light khud jal jaati hai - PHP khud sahi method call kar deta hai.',
      en: 'Magic methods are like automatic sensor lights at home. You never press the switch, but as soon as someone walks in (an event happens), the light turns on by itself - PHP calls the right method for you.',
      bn: 'Magic methods হলো বাড়ির automatic sensor light-এর মতো। তুমি সুইচ টেপো না, কিন্তু কেউ ঢুকলেই (কোনো event ঘটলেই) আলো নিজে থেকে জ্বলে ওঠে - PHP নিজেই সঠিক method call করে দেয়।',
    },
    question: 'What are magic methods in PHP? Name the important ones.',
    answer: 'Magic methods are special methods starting with a double underscore that PHP calls automatically on certain events. The common ones are __construct and __destruct, __get/__set/__isset/__unset for inaccessible properties, __call/__callStatic for undefined methods, __toString for string conversion, __invoke to call an object like a function, __clone for copying, and __serialize/__unserialize for serialization. They are powerful for proxies and builders but make code harder to read and analyse, so use them sparingly.',
    points: [
      '__get/__set run only for inaccessible or undefined properties',
      '__call/__callStatic power proxies, fluent query builders and facades',
      '__toString lets an object be echoed or used as a string',
      '__invoke makes objects callable (handlers, single-action classes)',
      '__clone runs after a shallow copy - deep-copy nested objects there',
      'Creating undeclared (dynamic) properties without __set is deprecated in PHP 8.2+',
    ],
    code: `<?php
final class Config {
    private array $data = ['app' => 'Shop', 'debug' => false];

    public function __get(string $key): mixed { return $this->data[$key] ?? null; }
    public function __isset(string $key): bool { return isset($this->data[$key]); }
    public function __call(string $name, array $args): mixed {
        if (str_starts_with($name, 'get')) {
            return $this->data[lcfirst(substr($name, 3))] ?? null;
        }
        throw new BadMethodCallException("Method $name does not exist");
    }
    public function __toString(): string { return json_encode($this->data); }
    public function __invoke(string $key): mixed { return $this->data[$key] ?? null; }
}

$c = new Config();
echo $c->app, ' ', $c->getApp(), ' ', $c('app'), PHP_EOL; // Shop Shop Shop
echo $c;                                                  // {"app":"Shop","debug":false}`,
  },
  {
    id: 'pp-14',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Exception handling cricket ke fielder jaisa hai. Ball (problem) hawa mein jaati hai to sahi fielder (catch block) use pakad leta hai, aur match ke baad ground saaf karna (finally) to hamesha hota hi hai, chahe catch ho ya na ho.',
      en: 'Exception handling is like fielders in cricket. When the ball (a problem) goes into the air, the right fielder (catch block) takes the catch, and cleaning the ground after the match (finally) always happens, catch or no catch.',
      bn: 'Exception handling হলো ক্রিকেটের ফিল্ডারদের মতো। বল (সমস্যা) আকাশে উঠলে সঠিক ফিল্ডার (catch block) সেটা ধরে নেয়, আর ম্যাচের পরে মাঠ পরিষ্কার করা (finally) সবসময়ই হয়, ক্যাচ হোক বা না হোক।',
    },
    question: 'How does exception and error handling work in PHP 8?',
    answer: 'Both exceptions and engine errors implement the Throwable interface: Exception is for application problems you expect to handle, and Error (TypeError, ValueError, ArgumentCountError, DivisionByZeroError …) is thrown by the engine for programming mistakes. You use try/catch/finally, can catch several types with |, create custom exceptions by extending Exception or its SPL subclasses, and chain the original cause with the previous argument. Uncaught throwables should be logged by a global handler, and display_errors must be off in production.',
    points: [
      'Throwable → Exception and Error; catch Throwable only at the top level',
      'finally always runs - use it for cleanup',
      'Multi-catch: catch (A | B $e); PHP 8 allows catch (A) without a variable',
      'Custom domain exceptions make intent clear and are easy to catch selectively',
      'set_exception_handler for uncaught ones; set_error_handler can turn warnings into ErrorException',
      'Production: display_errors=Off, log_errors=On',
    ],
    code: `<?php
final class InsufficientFundsException extends DomainException {}

function withdraw(int $balance, int $amount): int {
    if ($amount > $balance) {
        throw new InsufficientFundsException("Balance too low");
    }
    return $balance - $amount;
}

try {
    withdraw(100, 500);
} catch (InsufficientFundsException $e) {
    echo "Error: ", $e->getMessage(), PHP_EOL;
} catch (TypeError | ValueError $e) {
    echo "Bug: ", $e->getMessage(), PHP_EOL;
} finally {
    echo "done", PHP_EOL;
}
// Output:
// Error: Balance too low
// done`,
  },
  {
    id: 'pp-15',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'password_hash daal ko pees ke masala banane jaisa hai - masale se wapas daal nahi ban sakti. Login pe password_verify naye daal ko bhi peeskar dekhta hai ki masala same bana ya nahi.',
      en: 'password_hash is like grinding spices into masala - you can never turn the masala back into whole spices. At login, password_verify grinds the new input the same way and checks whether the masala matches.',
      bn: 'password_hash হলো মশলা বেটে গুঁড়ো করার মতো - গুঁড়ো থেকে আর আস্ত মশলা ফেরত পাওয়া যায় না। Login-এর সময় password_verify নতুন input-ও একইভাবে বেটে দেখে গুঁড়োটা মিলছে কিনা।',
    },
    question: 'How should you store and check user passwords in PHP?',
    answer: 'Never store plain text or fast hashes like md5/sha1. Use password_hash($password, PASSWORD_DEFAULT), which uses a slow, salted algorithm (bcrypt today) and stores the algorithm, cost and salt inside the resulting string; check a login with password_verify(), which compares in constant time. After a successful login call password_needs_rehash() so old hashes are upgraded when the algorithm or cost changes.',
    points: [
      'md5/sha1 are fast, so attackers can brute-force billions of guesses per second',
      'password_hash generates a random salt automatically - do not pass your own',
      'Store the hash in a VARCHAR(255) column; PASSWORD_DEFAULT may change in future',
      'PASSWORD_ARGON2ID is available when PHP is built with Argon2 support',
      'bcrypt uses only the first 72 bytes of the password',
      'Rate-limit login attempts and use HTTPS as well',
    ],
    code: `<?php
// registration
$hash = password_hash($_POST['password'], PASSWORD_DEFAULT);
// save $hash in users.password_hash (VARCHAR(255))

// login
$user = $repo->findByEmail($_POST['email']);
if ($user && password_verify($_POST['password'], $user->passwordHash)) {
    if (password_needs_rehash($user->passwordHash, PASSWORD_DEFAULT)) {
        $repo->updateHash($user->id, password_hash($_POST['password'], PASSWORD_DEFAULT));
    }
    session_regenerate_id(true);
    $_SESSION['user_id'] = $user->id;
} else {
    echo 'Invalid email or password';
}`,
  },
  {
    id: 'pp-16',
    level: 'junior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Ye school election ke vote ginne jaisa hai. Har parchi (word) padho, har naam ke aage tally lagao, phir sabse zyada vote wale upar rakho aur top 3 announce karo.',
      en: 'This is like counting votes in a school election. Read every slip (word), add a tally mark next to each name, sort so the most votes come first, and announce the top 3.',
      bn: 'এটা স্কুলের নির্বাচনে ভোট গোনার মতো। প্রতিটা চিরকুট (word) পড়ো, প্রত্যেক নামের পাশে দাগ দাও, তারপর সবচেয়ে বেশি ভোট যার তাকে উপরে রেখে সেরা ৩ জনের নাম ঘোষণা করো।',
    },
    question: 'Coding: Write a PHP function that returns the N most frequent words in a text.',
    answer: 'Lower-case the text with mb_strtolower, split it into words with preg_split on any run of non-letter/non-digit characters (the u flag makes it Unicode-aware), count them with array_count_values, sort by count descending with arsort (which keeps the word keys) and take the first N with array_slice preserving keys. Sorting is stable since PHP 8, so words with equal counts keep their first-seen order. For the sample the output is the => 3, and => 2, cat => 1.',
    points: [
      'preg_split with PREG_SPLIT_NO_EMPTY avoids empty strings at the edges',
      'array_count_values builds the word => count map in one call',
      'arsort keeps keys; sort() would lose the words',
      'array_slice(..., true) preserves string keys',
      'Complexity O(n log n) because of the sort; fine for typical input',
    ],
    code: `<?php
declare(strict_types=1);

function topWords(string $text, int $n = 3): array
{
    $words = preg_split('/[^\\p{L}\\p{N}]+/u', mb_strtolower($text), -1, PREG_SPLIT_NO_EMPTY);
    $counts = array_count_values($words);
    arsort($counts);                       // highest count first, keys kept
    return array_slice($counts, 0, $n, true);
}

print_r(topWords('The cat and the hat, and THE bat!'));
// Array
// (
//     [the] => 3
//     [and] => 2
//     [cat] => 1
// )`,
  },
  {
    id: 'pp-17',
    level: 'mid',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'self apne ghar ka pakka address hai - hamesha wahi ghar. static \'jo bhi abhi bula raha hai uska ghar\' hai - agar beta (child class) bulaye to bete ke ghar pahunch jaata hai, papa ke nahi.',
      en: 'self is the fixed address of the house where the code was written - always that house. static means \'the house of whoever is calling right now\' - if the son (child class) calls, it goes to the son\'s house, not the father\'s.',
      bn: 'self হলো যেই বাড়িতে code লেখা হয়েছে তার স্থায়ী ঠিকানা - সবসময় সেই বাড়ি। static মানে \'এখন যে ডাকছে তার বাড়ি\' - ছেলে (child class) ডাকলে ছেলের বাড়িতেই যায়, বাবার বাড়িতে নয়।',
    },
    question: 'Explain static members, self vs static, and late static binding in PHP.',
    answer: 'Static properties and methods belong to the class, not to an object, so they are shared and called with ClassName::method() and have no $this. Inside a class, self:: always refers to the class where the code is written, while static:: is resolved at runtime to the class that was actually called - this is late static binding. It lets a parent method like create() return an instance of the child class via new static().',
    points: [
      'self:: is bound at compile time to the defining class',
      'static:: uses the called class at runtime (late static binding)',
      'new static() and return type static enable inheritable factories and fluent APIs',
      'parent:: calls the parent implementation',
      'Static properties hold shared state - be careful, it behaves like a global (hard to test)',
      'In long-running workers static state survives across jobs',
    ],
    code: `<?php
class Model {
    public static function create(): static {
        return new static();
    }
    public static function name(): string     { return static::class; }
    public static function selfName(): string { return self::class; }
}

class User extends Model {}

echo get_class(User::create()), PHP_EOL; // User
echo User::name(), PHP_EOL;              // User
echo User::selfName(), PHP_EOL;          // Model`,
  },
  {
    id: 'pp-18',
    level: 'mid',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Named arguments online form jaisa hai jahan har box pe naam likha hai, aap kisi bhi order mein bhar sakte ho. match station ke platform board jaisa hai - train number exactly match hua to hi platform milta hai. ?-> waise hai jaise ghar pe koi nahi mila to postman wahi ruk jaata hai.',
      en: 'Named arguments are like an online form with labelled boxes - fill them in any order. match is like the station platform board - you get a platform only if the train number matches exactly. ?-> is like a postman who stops as soon as nobody is home.',
      bn: 'Named arguments হলো এমন online form-এর মতো যেখানে প্রতিটা বাক্সে নাম লেখা, যেকোনো ক্রমে ভরা যায়। match হলো স্টেশনের platform board-এর মতো - train নম্বর একদম মিললে তবেই platform পাওয়া যায়। ?-> হলো এমন পোস্টম্যান, যে বাড়িতে কাউকে না পেলেই থেমে যায়।',
    },
    question: 'Explain named arguments, the match expression and the nullsafe operator in PHP 8.',
    answer: 'Named arguments let you pass values by parameter name, in any order, and skip optional parameters you do not need. match is an expression that returns a value, compares with === (strict), has no fall-through and throws UnhandledMatchError if no arm matches and there is no default. The nullsafe operator ?-> stops a method/property chain and returns null as soon as one part is null, replacing nested null checks.',
    points: [
      'Named args make calls self-documenting; parameter names become part of the public API',
      'Positional arguments must come before named ones',
      'match uses strict comparison: match(\'1\') does not hit an arm for 1',
      'match (true) { ... } replaces long if/elseif chains',
      '?-> short-circuits the rest of the chain; it is read-only (cannot be used on the left side of =)',
    ],
    code: `<?php
// named arguments: skip optional params, any order
echo str_pad('7', 3, pad_type: STR_PAD_LEFT, pad_string: '0'), PHP_EOL; // 007

// match: strict, returns a value
$code = 503;
echo match (true) {
    $code >= 500 => 'server error',
    $code >= 400 => 'client error',
    default      => 'ok',
}, PHP_EOL;                                    // server error

echo match ('1') { 1 => 'int', '1' => 'string' }, PHP_EOL; // string

// nullsafe operator
$city = $order?->getCustomer()?->getAddress()?->city ?? 'Unknown';`,
  },
  {
    id: 'pp-19',
    level: 'mid',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Enum traffic signal jaisa hai - sirf teen hi rang ho sakte hain: laal, peela, hara. Koi \'baingani\' signal nahi bana sakta. Backed enum mein har rang ke saath ek code bhi likha hota hai jo register mein save hota hai.',
      en: 'An enum is like a traffic signal - it can only be red, yellow or green. Nobody can create a \'purple\' signal. A backed enum also writes a code next to each colour that is saved in the register.',
      bn: 'Enum হলো ট্রাফিক সিগন্যালের মতো - শুধু তিনটে রং হতে পারে: লাল, হলুদ, সবুজ। কেউ \'বেগুনি\' সিগন্যাল বানাতে পারবে না। Backed enum-এ প্রতিটা রঙের পাশে একটা code লেখা থাকে যা রেজিস্টারে save হয়।',
    },
    question: 'What are enums in PHP and when would you use backed enums?',
    answer: 'Enums define a type with a fixed set of possible values, for example OrderStatus::Pending, instead of loose strings or class constants. A pure enum has only cases; a backed enum gives each case a scalar int or string value, which is what you store in the database or JSON, and you convert back with from() (throws ValueError on unknown values) or tryFrom() (returns null). Enums can have methods, constants and implement interfaces, and they are compared with ===.',
    points: [
      'Enums are real types: function ship(OrderStatus $s) cannot receive a random string',
      'Backed enums: enum Status: string { case Paid = \'paid\'; } - ->value and ->name',
      'Status::cases() returns all cases (useful for dropdowns and validation)',
      'from() throws ValueError, tryFrom() returns null',
      'Cases are singletons: compare with ===, no new, no mutable state',
      'match ($this) inside enum methods is a clean way to add labels or behaviour',
    ],
    code: `<?php
enum OrderStatus: string {
    case Pending   = 'pending';
    case Shipped   = 'shipped';
    case Delivered = 'delivered';

    public function label(): string {
        return match ($this) {
            self::Pending   => 'Waiting',
            self::Shipped   => 'On the way',
            self::Delivered => 'Done',
        };
    }
}

$status = OrderStatus::from('shipped');          // value from DB
echo $status->label(), PHP_EOL;                  // On the way
echo $status->name, PHP_EOL;                     // Shipped
var_dump(OrderStatus::tryFrom('lost'));          // NULL
var_dump($status === OrderStatus::Shipped);      // bool(true)`,
  },
  {
    id: 'pp-20',
    level: 'mid',
    topic: 'php-core',
    difficulty: 'hard',
    simple: {
      hi: 'readonly property marksheet par chhapa hua number hai - ek baar chhap gaya to badal nahi sakte, nayi marksheet banani padegi. Attribute dabbe pe lage sticker jaisa hai, jaise \'Fragile\' - dabba wahi rehta hai, par courier wala (framework) sticker padhkar uske hisaab se kaam karta hai.',
      en: 'A readonly property is like the marks printed on a marksheet - once printed they cannot change; you must issue a new marksheet. An attribute is like a \'Fragile\' sticker on a box - the box stays the same, but the courier (framework) reads the sticker and handles it accordingly.',
      bn: 'readonly property হলো মার্কশিটে ছাপা নম্বরের মতো - একবার ছাপা হলে বদলানো যায় না, নতুন মার্কশিট বানাতে হয়। Attribute হলো বাক্সের উপর \'Fragile\' sticker-এর মতো - বাক্স একই থাকে, কিন্তু courier (framework) sticker পড়ে সেই মতো কাজ করে।',
    },
    question: 'Explain constructor property promotion, readonly properties and attributes in modern PHP.',
    answer: 'Constructor property promotion lets you declare and assign properties directly in the constructor parameters (public function __construct(private string $name) {}), removing boilerplate. A readonly property can be initialised only once, from inside the class, and any later write throws an Error, which makes immutable value objects and DTOs easy; a readonly class makes all its properties readonly. Attributes (#[...]) attach structured metadata to classes, methods, properties or parameters that frameworks read with the Reflection API, for example routes or validation rules, and PHP has built-ins like #[\\Override] and #[\\SensitiveParameter].',
    points: [
      'Promotion: add a visibility (and optionally readonly) to a constructor parameter',
      'readonly properties must be typed and cannot have a default value',
      'To "change" an immutable object, return a new instance (withX() methods)',
      'readonly is shallow: an object stored in a readonly property can still be mutated internally',
      'Attributes replace docblock annotations; read via getAttributes()->newInstance()',
      'Custom attributes are classes marked with #[Attribute]',
    ],
    code: `<?php
final class Money {
    public function __construct(
        public readonly int $amount,
        public readonly string $currency = 'INR',
    ) {}
    public function add(Money $other): self {
        return new self($this->amount + $other->amount, $this->currency);
    }
}

$m = (new Money(100))->add(new Money(50));
echo $m->amount, PHP_EOL;            // 150
// $m->amount = 5;  // Error: Cannot modify readonly property Money::$amount
#[Attribute(Attribute::TARGET_METHOD)]
final class Route {
    public function __construct(public string $path, public string $method = 'GET') {}
}
class HomeController {
    #[Route('/home')]
    public function index(): void {}
}
$route = (new ReflectionMethod(HomeController::class, 'index'))
    ->getAttributes(Route::class)[0]->newInstance();
echo $route->path;                   // /home`,
  },
  {
    id: 'pp-21',
    level: 'mid',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'Prepared statement bank ke form jaisa hai jismein khaane pehle se chhape hain. Aap \'amount\' ke khaane mein kuch bhi likh do, wo sirf amount hi maana jaayega - form ka niyam nahi badal sakta. Concatenation matlab saada kaagaz, jis par koi bhi naye niyam likh de.',
      en: 'A prepared statement is like a printed bank form with fixed boxes. Whatever you write in the \'amount\' box is treated only as an amount - it can never change the form\'s rules. Concatenation is like a blank sheet where anyone can write new rules.',
      bn: 'Prepared statement হলো ব্যাংকের ছাপানো ফর্মের মতো, যেখানে ঘরগুলো আগে থেকেই ঠিক করা। \'amount\'-এর ঘরে যা-ই লেখো, সেটা শুধু amount হিসেবেই ধরা হবে - ফর্মের নিয়ম বদলাতে পারবে না। Concatenation মানে সাদা কাগজ, যেখানে যে কেউ নতুন নিয়ম লিখে দিতে পারে।',
    },
    question: 'What is SQL injection and how do you prevent it in PHP with PDO?',
    answer: 'SQL injection happens when user input is concatenated into a SQL string, so input like \' OR \'1\'=\'1 changes the query\'s meaning and can leak or delete data. The fix is prepared statements: the SQL with placeholders is sent separately from the values, so values are always treated as data, never as SQL. With PDO use prepare() and execute() with named or ? placeholders, enable exception error mode, disable emulated prepares and set the charset in the DSN.',
    points: [
      'Never build queries with string concatenation or interpolation of input',
      'PDO::prepare + execute([...]) with :name or ? placeholders',
      'Placeholders cannot be used for table/column names or ORDER BY direction - whitelist those',
      'For IN (...) generate one placeholder per value',
      'PDO::ATTR_ERRMODE => ERRMODE_EXCEPTION, ATTR_EMULATE_PREPARES => false, charset=utf8mb4',
      'Use a least-privilege DB user as defence in depth',
    ],
    code: `<?php
$pdo = new PDO('mysql:host=localhost;dbname=shop;charset=utf8mb4', 'app', $secret, [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
]);

// UNSAFE: "SELECT * FROM users WHERE email = '$email'"
$stmt = $pdo->prepare('SELECT id, name FROM users WHERE email = :email AND status = :status');
$stmt->execute(['email' => $_POST['email'], 'status' => 'active']);
$user = $stmt->fetch();

// dynamic column: whitelist, never bind or interpolate raw input
$allowed = ['name', 'created_at'];
$sort = in_array($_GET['sort'] ?? '', $allowed, true) ? $_GET['sort'] : 'name';
$rows = $pdo->query("SELECT id, name FROM users ORDER BY $sort")->fetchAll();`,
  },
  {
    id: 'pp-22',
    level: 'mid',
    topic: 'php-core',
    difficulty: 'hard',
    simple: {
      hi: 'XSS waise hai jaise koi notice board pe chitthi chipka de jo padhne wale ko hi nuksaan pahunchaye - escaping us chitthi ko sirf saada text bana deti hai. CSRF waise hai jaise koi aapke naam se nakli cheque bhej de - CSRF token aapka secret signature hai jo nakli cheque mein nahi hota.',
      en: 'XSS is like someone pinning a trick note on the notice board that harms whoever reads it - escaping turns the note into plain harmless text. CSRF is like someone sending a fake cheque in your name - the CSRF token is your secret signature that the fake cheque does not have.',
      bn: 'XSS হলো এমন, যেন কেউ নোটিশ বোর্ডে একটা ফাঁদের চিঠি লাগিয়ে দিল যা পড়লেই ক্ষতি হয় - escaping সেটাকে নিরীহ সাধারণ লেখা বানিয়ে দেয়। CSRF হলো তোমার নামে কেউ নকল চেক পাঠানোর মতো - CSRF token তোমার গোপন সই, যা নকল চেকে থাকে না।',
    },
    question: 'What are XSS and CSRF, and how do you protect a plain PHP application against them?',
    answer: 'XSS (cross-site scripting) is when attacker-supplied text is output as HTML/JS and runs in other users\' browsers; prevent it by escaping all output for its context, in HTML with htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, \'UTF-8\'), plus a Content-Security-Policy header. CSRF (cross-site request forgery) is when another site makes the logged-in user\'s browser send a state-changing request; prevent it with a random per-session token in every form, checked with hash_equals(), plus SameSite cookies and never changing state on GET.',
    points: [
      'Escape on output, not on input; use json_encode for JS and urlencode for URLs',
      'HttpOnly session cookies stop JS from stealing the session ID',
      'Content-Security-Policy limits which scripts may run',
      'CSRF token: bin2hex(random_bytes(32)) stored in the session',
      'Compare tokens with hash_equals() (constant time)',
      'SameSite=Lax/Strict cookies are an extra layer, not a replacement',
    ],
    code: `<?php
session_start();
$_SESSION['csrf'] ??= bin2hex(random_bytes(32));

function e(string $s): string {
    return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf'], $_POST['csrf'] ?? '')) {
        http_response_code(403);
        exit('Invalid CSRF token');
    }
    // ... save comment safely ...
}

$comment = $_GET['c'] ?? '<script>alert(1)</script>';
?>
<p><?= e($comment) ?></p>   <!-- shows the text, script does not run -->
<form method="post">
  <input type="hidden" name="csrf" value="<?= e($_SESSION['csrf']) ?>">
  <button>Post</button>
</form>`,
  },
  {
    id: 'pp-23',
    level: 'senior',
    topic: 'php-core',
    difficulty: 'hard',
    simple: {
      hi: 'OPcache waise hai jaise halwai subah hi sabzi kaat ke rakh leta hai, taaki har order pe dobara na kaatni pade. JIT ek super-fast cook hai, par agar delay sabzi mandi (database) se aane mein hai to tez cook se kuch fayda nahi - pehle dekho der kahan ho rahi hai.',
      en: 'OPcache is like a sweet-shop cook who chops vegetables once in the morning so he does not chop again for every order. JIT is a super-fast cook, but if the delay is in getting vegetables from the market (the database), a faster cook does not help - first find where the time goes.',
      bn: 'OPcache হলো এমন মিষ্টির দোকানের রাঁধুনির মতো, যে সকালেই সবজি কেটে রাখে যাতে প্রতিটা order-এ আবার কাটতে না হয়। JIT হলো খুব দ্রুত রাঁধুনি, কিন্তু দেরি যদি বাজার (database) থেকে সবজি আসতে হয়, তাহলে দ্রুত রাঁধুনি কোনো কাজে আসে না - আগে খুঁজে দেখো সময় কোথায় যাচ্ছে।',
    },
    question: 'Scenario: a PHP application becomes slow under load. How do you use OPcache and JIT, and what else do you check?',
    answer: 'First measure: enable the PHP-FPM slow log and use a profiler (Xdebug profiler, Blackfire or an APM) to see whether time goes to CPU, database or external calls. Make sure OPcache is enabled with enough memory and, in production, validate_timestamps=0 with a cache reset on deploy, so scripts are never recompiled; optionally preload hot classes. JIT compiles opcodes to machine code and mainly helps CPU-heavy work (maths, image processing), while typical I/O-bound web apps gain little, so the bigger wins usually come from fixing slow/N+1 queries and missing indexes, caching in Redis/APCu, an optimized Composer classmap and correctly sizing PHP-FPM workers.',
    points: [
      'OPcache stores compiled opcodes in shared memory - the single most important production setting',
      'opcache.validate_timestamps=0 in production; reload PHP-FPM or reset OPcache on each deploy',
      'JIT (opcache.jit + opcache.jit_buffer_size) helps CPU-bound code, not database waits',
      'Size pm.max_children ≈ available RAM / average worker memory; watch for \'max_children reached\' in logs',
      'Fix N+1 queries, add indexes, cache expensive results, move slow work to queues',
      'composer dump-autoload -o --no-dev (or --classmap-authoritative) for faster autoloading',
    ],
    code: `; php.ini (production)
opcache.enable=1
opcache.memory_consumption=256
opcache.max_accelerated_files=20000
opcache.validate_timestamps=0      ; reset on deploy
opcache.preload=/var/www/app/preload.php
opcache.preload_user=www-data
opcache.jit_buffer_size=64M        ; JIT needs a buffer
opcache.jit=tracing

; php-fpm pool (www.conf)
pm = dynamic
pm.max_children = 40               ; ~ RAM for PHP / avg worker size
pm.start_servers = 10
pm.min_spare_servers = 5
pm.max_spare_servers = 15
pm.max_requests = 1000             ; recycle workers, limits leaks
request_slowlog_timeout = 2s
slowlog = /var/log/php-fpm/slow.log`,
  },
  {
    id: 'pp-24',
    level: 'senior',
    topic: 'php-core',
    difficulty: 'medium',
    simple: {
      hi: 'PSR mobile charger ke standard (Type-C) jaisa hai. Agar sab company ek hi plug design maan lein, to kisi bhi brand ka charger kisi bhi phone mein lag jaata hai - waise hi koi bhi logger ya HTTP client kisi bhi framework mein fit ho jaata hai.',
      en: 'PSRs are like the standard Type-C charger. When every company agrees on the same plug, any brand\'s charger fits any phone - in the same way any logger or HTTP client fits into any framework.',
      bn: 'PSR হলো মোবাইল চার্জারের standard (Type-C)-এর মতো। সব কোম্পানি একই plug মেনে নিলে যেকোনো ব্র্যান্ডের চার্জার যেকোনো ফোনে লাগে - ঠিক তেমনই যেকোনো logger বা HTTP client যেকোনো framework-এ ফিট হয়ে যায়।',
    },
    question: 'What are PSR standards and which ones matter most in day-to-day PHP work?',
    answer: 'PSRs (PHP Standards Recommendations) are published by PHP-FIG so that frameworks and libraries can interoperate. The most used are PSR-4 (autoloading), PSR-12 / PER Coding Style (code formatting), PSR-3 (logger interface), PSR-7/PSR-17 (immutable HTTP message objects and their factories), PSR-15 (HTTP middleware and handlers), PSR-11 (container interface), PSR-18 (HTTP client), PSR-6/PSR-16 (caching) and PSR-14 (event dispatcher). Coding against these interfaces lets you swap Monolog, Guzzle or a DI container without rewriting business code.',
    points: [
      'PSR-1 basic coding rules; PSR-12 replaced PSR-2 and is being succeeded by PER Coding Style',
      'PSR-4 replaced the deprecated PSR-0 autoloading standard',
      'PSR-7 messages are immutable: withHeader() returns a new object',
      'PSR-15 middleware: process(request, handler): response',
      'Enforce style with PHP_CodeSniffer or PHP-CS-Fixer in CI',
      'PSRs are recommendations; type-hint the interfaces (psr/log, psr/http-message packages)',
    ],
    code: `<?php
declare(strict_types=1);

use Psr\\Http\\Message\\ResponseInterface;
use Psr\\Http\\Message\\ServerRequestInterface;
use Psr\\Http\\Server\\MiddlewareInterface;
use Psr\\Http\\Server\\RequestHandlerInterface;
use Psr\\Log\\LoggerInterface;

final class TimingMiddleware implements MiddlewareInterface
{
    public function __construct(private LoggerInterface $logger) {}

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $start = hrtime(true);
        $response = $handler->handle($request);
        $ms = (hrtime(true) - $start) / 1e6;
        $this->logger->info('Handled {path}', ['path' => $request->getUri()->getPath()]);
        return $response->withHeader('X-Response-Time', sprintf('%.1fms', $ms));
    }
}`,
  },
  {
    id: 'pp-25',
    level: 'senior',
    topic: 'php-core',
    difficulty: 'hard',
    simple: {
      hi: 'Autoloader library ke librarian jaisa hai. Aap sirf kitaab ka naam bolte ho (class name), aur librarian us naam se shelf aur rack number (folder aur file) nikaal ke kitaab le aata hai - aapko khud dhundhni nahi padti.',
      en: 'An autoloader is like a school librarian. You only say the book\'s name (class name), and the librarian works out the shelf and rack (folder and file) from it and brings the book - you never search yourself.',
      bn: 'Autoloader হলো লাইব্রেরির লাইব্রেরিয়ানের মতো। তুমি শুধু বইয়ের নাম (class name) বলো, আর লাইব্রেরিয়ান সেই নাম থেকে তাক আর র‍্যাক (folder আর file) বের করে বইটা এনে দেন - তোমাকে নিজে খুঁজতে হয় না।',
    },
    question: 'Coding: Implement a PSR-4 style autoloader using spl_autoload_register (without Composer).',
    answer: 'Register a closure with spl_autoload_register; PHP calls it with the fully qualified class name whenever an unknown class is used. The loader checks that the class starts with the configured namespace prefix, strips the prefix, converts the remaining namespace separators to directory separators, appends .php and requires the file from the base directory if it exists. If the prefix does not match it simply returns, so other registered autoloaders can try.',
    points: [
      'The callback receives the fully qualified name without a leading backslash',
      'Return silently for prefixes you do not own - autoloaders are chained',
      'Do not throw from an autoloader; class_exists() calls it too',
      'Map prefix → base dir; sub-namespaces become sub-folders (case-sensitive on Linux)',
      'Composer does the same, plus classmaps, multiple prefixes and files autoloading',
    ],
    code: `<?php
declare(strict_types=1);

spl_autoload_register(function (string $class): void {
    $prefix  = 'App\\\\';
    $baseDir = __DIR__ . '/src/';

    if (strncmp($class, $prefix, strlen($prefix)) !== 0) {
        return; // not our namespace - let other autoloaders try
    }

    $relative = substr($class, strlen($prefix));            // Models\\User
    $file = $baseDir . str_replace('\\\\', '/', $relative) . '.php';

    if (is_file($file)) {
        require $file;                                       // src/Models/User.php
    }
});

$user = new App\\Models\\User('Priya'); // triggers the autoloader`,
  },
];

export const QUIZ: QuizQuestion[] = [
  {
    id: 'qh-p1',
    level: 'fresher',
    topic: 'php-core',
    question: 'In PHP 8, what does var_dump(0 == "a"); print?',
    options: [
      'bool(true)',
      'bool(false)',
      'A TypeError is thrown',
      'int(0)',
    ],
    correct: 1,
    explanation: 'Since PHP 8 a number and a non-numeric string are compared as strings, so "0" vs "a" is false.',
  },
  {
    id: 'qh-p2',
    level: 'junior',
    topic: 'php-core',
    question: 'Which is the correct way to check a login password against a stored hash?',
    options: [
      'md5($input) === $hash',
      'sha1($input) == $hash',
      'crypt($input) === $hash',
      'password_verify($input, $hash)',
    ],
    correct: 3,
    explanation: 'password_verify() works with password_hash() output, reads the algorithm and salt from the hash and compares in constant time.',
  },
  {
    id: 'qh-p3',
    level: 'mid',
    topic: 'php-core',
    question: 'Class Model has public static function who() { return static::class; } and User extends Model. What does User::who() return?',
    options: [
      '"User"',
      '"Model"',
      '"static"',
      'It throws an Error',
    ],
    correct: 0,
    explanation: 'static:: uses late static binding and resolves to the called class, User; self::class would return Model.',
  },
  {
    id: 'qh-p4',
    level: 'junior',
    topic: 'php-core',
    question: 'What happens when a match expression has no matching arm and no default arm?',
    options: [
      'It returns null',
      'It falls through to the next arm',
      'It throws UnhandledMatchError',
      'It emits a warning and returns false',
    ],
    correct: 2,
    explanation: 'match must handle every value; an unmatched value throws UnhandledMatchError.',
  },
  {
    id: 'qh-p5',
    level: 'fresher',
    topic: 'php-core',
    question: 'What happens when the file given to require does not exist?',
    options: [
      'A warning is shown and the script continues',
      'A fatal error stops the script',
      'It silently returns false',
      'PHP retries it as include',
    ],
    correct: 1,
    explanation: 'require fails with a fatal error, while include only emits a warning and continues.',
  },
  {
    id: 'qh-p6',
    level: 'junior',
    topic: 'php-core',
    question: 'What does array_filter([1, 0, 2, null, 3]) return?',
    options: [
      '[1, 2, 3] with keys 0, 1, 2',
      '[1, 0, 2, 3]',
      'An empty array',
      '[1, 2, 3] with keys 0, 2, 4',
    ],
    correct: 3,
    explanation: 'Without a callback array_filter removes falsy values but preserves the original keys; use array_values() to reindex.',
  },
  {
    id: 'qh-l1',
    level: 'junior',
    topic: 'laravel',
    question: 'Which Eloquent call avoids the N+1 problem when listing posts with their authors?',
    options: [
      'Post::all() and then $post->user in the loop',
      'Post::with(\'user\')->get()',
      'Post::query()->lazy()',
      'Post::cursor()',
    ],
    correct: 1,
    explanation: 'with() eager-loads all authors in one extra WHERE IN query instead of one query per post.',
  },
  {
    id: 'qh-l2',
    level: 'junior',
    topic: 'laravel',
    question: 'In a default Laravel 11+ app, where do you register a middleware alias?',
    options: [
      'bootstrap/app.php inside withMiddleware()',
      'app/Http/Kernel.php',
      'config/middleware.php',
      'routes/middleware.php',
    ],
    correct: 0,
    explanation: 'Laravel 11 removed Http/Kernel.php; middleware is configured in bootstrap/app.php.',
  },
  {
    id: 'qh-l3',
    level: 'fresher',
    topic: 'laravel',
    question: 'Which Blade syntax outputs a variable WITHOUT HTML escaping?',
    options: [
      '{{ $html }}',
      '@{{ $html }}',
      '{{-- $html --}}',
      '{!! $html !!}',
    ],
    correct: 3,
    explanation: '{!! !!} prints raw output; {{ }} escapes it with htmlspecialchars.',
  },
  {
    id: 'qh-l4',
    level: 'fresher',
    topic: 'laravel',
    question: 'Which two actions does Route::apiResource() leave out compared to Route::resource()?',
    options: [
      'index and show',
      'store and destroy',
      'create and edit',
      'update and destroy',
    ],
    correct: 2,
    explanation: 'create and edit only return HTML forms, which an API does not need.',
  },
  {
    id: 'qh-l5',
    level: 'mid',
    topic: 'laravel',
    question: 'Where should you call Gate::define() or Event::listen() in a service provider?',
    options: [
      'In the constructor',
      'In boot()',
      'In register()',
      'In provides()',
    ],
    correct: 1,
    explanation: 'boot() runs after all providers are registered, so other services are safe to use.',
  },
  {
    id: 'qh-l6',
    level: 'mid',
    topic: 'laravel',
    question: 'Third-party apps need delegated OAuth2 access to your users\' data. Which package fits?',
    options: [
      'Laravel Breeze',
      'Laravel Sanctum',
      'Laravel Passport',
      'Laravel Fortify',
    ],
    correct: 2,
    explanation: 'Passport is a full OAuth2 server; Sanctum covers SPAs and simple personal tokens.',
  },
];
