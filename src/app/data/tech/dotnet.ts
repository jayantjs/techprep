import { QuizQuestion, Question } from '../models';

/** dotnet interview questions. */
export const QUESTIONS: Question[] = [
  {
    id: 'an-1',
    level: 'fresher',
    topic: 'aspnet',
    difficulty: 'easy',
    simple: {
      hi: 'Purana ASP.NET MVC ek aisi bus hai jo sirf ek hi route — Windows — par chalti hai. ASP.NET Core nayi modern bus hai jo Windows, Linux, Mac har road par chalti hai, zyada tez hai, aur iske parts alag-alag badle ja sakte hain.',
      en: 'Old ASP.NET MVC is like a bus that runs on only one route — Windows. ASP.NET Core is a new, modern bus that runs on every road (Windows, Linux, Mac), is faster, and its parts can be changed one by one.',
      bn: 'পুরনো ASP.NET MVC এমন একটা বাসের মতো যেটা শুধু একটাই রুটে — Windows-এ — চলে। ASP.NET Core হলো নতুন আধুনিক বাস, যেটা Windows, Linux, Mac সব রাস্তায় চলে, অনেক দ্রুত, আর এর যন্ত্রাংশ আলাদা আলাদা করে বদলানো যায়।',
    },
    question: 'What is ASP.NET Core and how is it different from ASP.NET MVC on .NET Framework?',
    answer: 'ASP.NET Core is Microsoft\'s open-source, cross-platform framework for building web apps and APIs on modern .NET; it runs on Windows, Linux and macOS and is often hosted in containers. Classic ASP.NET MVC runs only on the Windows-only .NET Framework, depends on System.Web and IIS, and only gets maintenance fixes now. ASP.NET Core is a ground-up rewrite: a modular middleware pipeline, built-in dependency injection, its own fast web server (Kestrel), JSON-based configuration, and MVC and Web API merged into one controller model.',
    points: [
      'Cross-platform and open source vs Windows-only .NET Framework',
      'No System.Web / Global.asax: Program.cs plus a middleware pipeline',
      'Built-in DI, configuration, logging and options out of the box',
      'MVC and Web API unified (one ControllerBase, one routing system)',
      'Runs on Kestrel, self-hosted or behind IIS/Nginx; much higher performance',
      'New projects should use ASP.NET Core; .NET Framework is in maintenance mode',
    ],
  },
  {
    id: 'an-2',
    level: 'fresher',
    topic: 'aspnet',
    difficulty: 'easy',
    simple: {
      hi: 'Program.cs dukaan kholne ki routine jaisa hai. Pehle godown mein saaman bharte ho (services register), phir shutter khol kar counters set karte ho (middleware pipeline), aur last mein app.Run() — dukaan chalu!',
      en: 'Program.cs is like the routine for opening a shop. First you fill the storeroom (register services), then you open the shutter and set up the counters (middleware pipeline), and finally app.Run() — the shop is open!',
      bn: 'Program.cs হলো দোকান খোলার রোজকার নিয়মের মতো। প্রথমে গুদামে মাল ভরো (services register), তারপর শাটার খুলে কাউন্টার সাজাও (middleware pipeline), আর শেষে app.Run() — দোকান চালু!',
    },
    question: 'What is Program.cs in ASP.NET Core and what is the minimal hosting model?',
    answer: 'Modern ASP.NET Core apps start from a single Program.cs written with top-level statements and WebApplication.CreateBuilder — the minimal hosting model that replaced the separate Startup class with ConfigureServices and Configure. It has two phases: first register services on builder.Services (and adjust configuration/logging), then call builder.Build() and set up the middleware pipeline and endpoints on app, and finally call app.Run(). CreateBuilder wires up sensible defaults: Kestrel, appsettings.json plus environment-specific files, environment variables, command-line args, logging providers and the DI container.',
    points: [
      'Services are registered before Build(); middleware and endpoints are added after',
      'WebApplication is both the pipeline builder and the endpoint route builder',
      'Defaults: configuration sources, logging, Kestrel, developer exception page in Development',
      'app.Environment.IsDevelopment() for environment-specific setup',
      'A Startup class is still possible but no longer needed',
    ],
    code: `var builder = WebApplication.CreateBuilder(args);

// 1. Register services (DI container)
builder.Services.AddControllers();
builder.Services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

// 2. Configure the middleware pipeline
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseAuthorization();

// 3. Map endpoints
app.MapControllers();
app.MapGet("/ping", () => "pong");

app.Run();`,
  },
  {
    id: 'an-3',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Middleware railway station ke checkpoints jaisa hai — pehle security, phir ticket check, phir platform. Har checkpoint aapko aage bhej sakta hai ya wahin rok sakta hai, aur order galat ho to bina ticket wala bhi train tak pahunch jaayega.',
      en: 'Middleware is like the checkpoints at a railway station — first security, then ticket check, then the platform. Each checkpoint can send you forward or stop you there, and if the order is wrong, someone without a ticket could reach the train.',
      bn: 'Middleware হলো রেলস্টেশনের চেকপয়েন্টের মতো — প্রথমে security, তারপর টিকিট চেক, তারপর প্ল্যাটফর্ম। প্রতিটা চেকপয়েন্ট তোমাকে এগিয়ে দিতে পারে বা সেখানেই আটকে দিতে পারে, আর ক্রম ভুল হলে টিকিট ছাড়া লোকও ট্রেনে পৌঁছে যাবে।',
    },
    question: 'What is middleware in ASP.NET Core? Explain Use, Run and Map, why order matters, and how to write custom middleware.',
    answer: 'Middleware components form a request pipeline: each one can inspect or change the request, call the next component, and then act on the response on the way back. app.Use adds middleware that can call next, app.Run adds terminal middleware that ends the pipeline, and app.Map / MapWhen branch the pipeline by path or by a condition. Order matters because requests flow top-to-bottom and responses bottom-to-top — the exception handler must come first to catch everything, and UseAuthentication must come before UseAuthorization. Custom middleware is a class with a RequestDelegate constructor parameter and an InvokeAsync(HttpContext) method, registered with app.UseMiddleware<T>().',
    points: [
      'Code before await next(...) runs on the request, code after it runs on the response',
      'Not calling next short-circuits the pipeline (e.g. return 401 early)',
      'Typical order: ExceptionHandler → HSTS/HttpsRedirection → StaticFiles → Routing → CORS → Authentication → Authorization → custom → endpoints',
      'Convention-based middleware is created once — inject scoped services as InvokeAsync parameters, not in the constructor',
      'IMiddleware is the factory-based alternative that is resolved from DI per request',
    ],
    code: `public class RequestTimingMiddleware(RequestDelegate next, ILogger<RequestTimingMiddleware> logger)
{
    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();
        await next(context);                       // hand over to the next middleware
        logger.LogInformation("{Path} took {Ms} ms", context.Request.Path, sw.ElapsedMilliseconds);
    }
}

// Program.cs
app.UseMiddleware<RequestTimingMiddleware>();
app.Use(async (context, next) =>
{
    context.Response.Headers["X-App"] = "Demo";    // before the rest of the pipeline
    await next(context);
});
app.Map("/admin", admin => admin.Run(ctx => ctx.Response.WriteAsync("Admin branch")));
app.Run(ctx => ctx.Response.WriteAsync("Terminal")); // nothing after this runs`,
  },
  {
    id: 'an-4',
    level: 'fresher',
    topic: 'aspnet',
    difficulty: 'easy',
    simple: {
      hi: 'School mein socho: Singleton poore school ka ek hi principal hai. Scoped class teacher hai — us period (request) mein sab ke liye wahi ek. Transient paani ka paper cup hai — har baar naya milta hai.',
      en: 'Think of a school: Singleton is the one principal for the whole school. Scoped is the class teacher — the same one for everyone during that period (request). Transient is a paper cup for water — you get a new one every time.',
      bn: 'স্কুলের কথা ভাবো: Singleton হলো পুরো স্কুলের একজনই প্রিন্সিপাল। Scoped হলো ক্লাস টিচার — সেই পিরিয়ডে (request) সবার জন্য একজনই। Transient হলো জল খাওয়ার কাগজের কাপ — প্রতিবার নতুন একটা পাও।',
    },
    question: 'Explain the dependency injection lifetimes in ASP.NET Core: singleton, scoped and transient.',
    answer: 'ASP.NET Core has a built-in DI container: you register services on builder.Services and they are injected through constructors. Transient creates a new instance every time it is resolved; scoped creates one instance per scope, which in a web app means one per HTTP request; singleton creates one instance for the whole application lifetime, so it must be thread-safe. Use transient for lightweight stateless services, scoped for per-request state or units of work, and singleton for shared, expensive or cache-like objects.',
    points: [
      'AddTransient / AddScoped / AddSingleton',
      'Scoped = one per HTTP request; shared by everything in that request',
      'Singletons must be thread-safe and must not depend on scoped services (captive dependency)',
      'The container disposes IDisposable services it created at the end of the scope or app',
      'Keyed services (AddKeyedScoped + [FromKeyedServices]) for multiple implementations of one interface',
    ],
    code: `builder.Services.AddTransient<IEmailFormatter, EmailFormatter>(); // new every time
builder.Services.AddScoped<ICartService, CartService>();          // one per request
builder.Services.AddSingleton(TimeProvider.System);                // one for the app

[ApiController]
[Route("api/cart")]
public class CartController(ICartService cart, TimeProvider clock) : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { items = cart.Items, at = clock.GetUtcNow() });
}`,
  },
  {
    id: 'an-5',
    level: 'mid',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Socho dukaan ka permanent malik (singleton) pehle din ke daily-wage helper (scoped) ko hamesha ke liye rakh leta hai. Helper roz badalna chahiye tha, par ab wahi thaka hua helper sabka kaam karta hai — galti hogi hi. Sahi tareeka: har din naya helper bulao (new scope).',
      en: 'Imagine the permanent shop owner (singleton) keeps the first day\'s daily-wage helper (scoped) forever. The helper was supposed to change every day, but now the same tired helper does everyone\'s work — mistakes will happen. The fix: call a fresh helper each day (a new scope).',
      bn: 'ভাবো দোকানের স্থায়ী মালিক (singleton) প্রথম দিনের দিনমজুর হেল্পারকে (scoped) চিরকালের জন্য রেখে দিল। হেল্পার রোজ বদলানোর কথা ছিল, কিন্তু এখন সেই একই ক্লান্ত হেল্পার সবার কাজ করছে — ভুল হবেই। ঠিক উপায়: রোজ নতুন হেল্পার ডাকো (new scope)।',
    },
    question: 'Scenario: a singleton service depends on a scoped service (for example a repository). What goes wrong, and how do you fix it?',
    answer: 'This is a captive dependency: the singleton is created once and holds on to the first scoped instance forever, so a per-request object becomes effectively global — it can serve stale data, leak memory and break under concurrency because scoped services such as data contexts are not thread-safe. In the Development environment ASP.NET Core\'s scope validation throws \'Cannot consume scoped service ... from singleton\', but in Production that check is off by default, so the bug can ship silently. Fix it by making the consumer scoped, or by injecting IServiceScopeFactory into the singleton and creating a scope per unit of work, resolving the scoped service inside that scope.',
    points: [
      'Rule: a service may only depend on services with the same or a longer lifetime',
      'A transient captured by a singleton also lives forever',
      'Turn on ValidateScopes and ValidateOnBuild to catch it at startup in every environment',
      'Same trap in BackgroundService and in convention middleware constructors',
      'Never resolve scoped services from the root provider (app.Services)',
    ],
    code: `public class ReportScheduler(IServiceScopeFactory scopeFactory) // registered as singleton
{
    public async Task RunAsync(CancellationToken ct)
    {
        await using var scope = scopeFactory.CreateAsyncScope();
        var repo = scope.ServiceProvider.GetRequiredService<IOrderRepository>(); // scoped
        var orders = await repo.GetPendingAsync(ct);
        // ... work with orders; scope and repo are disposed at the end
    }
}

// Program.cs — catch lifetime mistakes early, not only in Development
builder.Host.UseDefaultServiceProvider(o =>
{
    o.ValidateScopes = true;
    o.ValidateOnBuild = true;
});`,
  },
  {
    id: 'an-6',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Controllers ek bada restaurant hai — menu, waiter, manager sab niyam se. Minimal API gali ka chaat thela hai — seedha order, seedha plate, kam setup. Routing dono mein address jaisa hai: \'/api/products/5\' batata hai ki order kis counter par jaayega.',
      en: 'Controllers are like a big restaurant — menu, waiters, a manager, all organised. A minimal API is a street chaat stall — order directly, get your plate directly, very little setup. Routing in both is like an address: \'/api/products/5\' tells which counter the order goes to.',
      bn: 'Controllers হলো একটা বড় রেস্টুরেন্ট — মেনু, ওয়েটার, ম্যানেজার সব নিয়ম মেনে। Minimal API হলো রাস্তার ফুচকার দোকান — সরাসরি অর্ডার, সরাসরি প্লেট, খুব কম সেটআপ। দুটোতেই routing ঠিকানার মতো: \'/api/products/5\' বলে দেয় অর্ডার কোন কাউন্টারে যাবে।',
    },
    question: 'Controllers vs minimal APIs — what is the difference, and how does routing (including attribute routing) work?',
    answer: 'Controllers are classes deriving from ControllerBase with action methods; they bring the full MVC feature set — filters, [ApiController] conventions, automatic model validation — and suit large, structured APIs. Minimal APIs map lambdas or methods directly to routes with MapGet/MapPost and friends, with less ceremony, faster startup and better Native AOT support; they use endpoint filters and route groups (MapGroup) instead of MVC filters. Both use endpoint routing: controllers usually use attribute routing such as [Route("api/[controller]")] and [HttpGet("{id:int}")], while minimal APIs put the template in the Map call, e.g. MapGet("/products/{id:int}", ...).',
    points: [
      'Route templates: parameters {id}, optional {id?}, defaults, constraints like :int, :guid, :min(1)',
      '[controller] and [action] tokens in attribute routes',
      '[ApiController] requires attribute routing; conventional routing (MapControllerRoute) is mainly for MVC views',
      'Minimal APIs: TypedResults for typed responses, MapGroup for shared prefix, auth and filters',
      'Both styles can live in the same app; pick by team and project size',
    ],
    code: `[ApiController]
[Route("api/[controller]")]          // -> api/products
public class ProductsController : ControllerBase
{
    [HttpGet("{id:int}")]            // GET api/products/5
    public ActionResult<Product> Get(int id) => Ok(new Product(id, "Pen"));
}

// Minimal API equivalent (Program.cs)
var products = app.MapGroup("/api/v2/products");
products.MapGet("/{id:int}", (int id) => TypedResults.Ok(new Product(id, "Pen")));

public record Product(int Id, string Name);`,
  },
  {
    id: 'an-7',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Model binding school admission form jaisa hai — clerk form se naam, umar, phone utha kar register mein bharta hai. Validation wo check hai ki umar sahi hai aur phone 10 digit ka hai; galat ho to form wapas (400 Bad Request).',
      en: 'Model binding is like a school admission form — the clerk copies the name, age and phone from the form into the register. Validation is the check that the age is right and the phone has 10 digits; if not, the form comes back to you (400 Bad Request).',
      bn: 'Model binding হলো স্কুলের ভর্তি ফর্মের মতো — ক্লার্ক ফর্ম থেকে নাম, বয়স, ফোন নিয়ে রেজিস্টারে লেখে। Validation হলো যাচাই — বয়স ঠিক আছে কিনা, ফোন ১০ সংখ্যার কিনা; ভুল হলে ফর্ম ফেরত (400 Bad Request)।',
    },
    question: 'How do model binding and validation work in ASP.NET Core (data annotations and FluentValidation)?',
    answer: 'Model binding maps data from route values, query string, headers, form fields and the JSON body onto action parameters; with [ApiController], complex types bind from the body and simple types from route/query by default, and you can be explicit with [FromRoute], [FromQuery], [FromBody], [FromHeader] and [FromServices]. Validation runs after binding: data annotations such as [Required], [StringLength], [Range] and [EmailAddress] fill ModelState, and [ApiController] automatically returns 400 with a ValidationProblemDetails body when it is invalid. For complex or conditional rules many teams use FluentValidation — an AbstractValidator<T> injected as IValidator<T> and called explicitly, since its automatic MVC pipeline integration is no longer recommended by its authors.',
    points: [
      'Without [ApiController] you must check ModelState.IsValid yourself',
      'Only one [FromBody] parameter per action',
      'IValidatableObject or FluentValidation for cross-field rules',
      'In .NET 8/9 minimal APIs do not run data annotations automatically — use an endpoint filter or FluentValidation',
      'Always validate on the server, even if the UI validates too',
    ],
    code: `public record CreateUserRequest(
    [Required, StringLength(50)] string Name,
    [Required, EmailAddress] string Email,
    [Range(18, 120)] int Age);

public class CreateUserValidator : AbstractValidator<CreateUserRequest>
{
    public CreateUserValidator()
    {
        RuleFor(x => x.Name).NotEmpty().Must(n => !n.Contains("admin"))
            .WithMessage("Name cannot contain 'admin'");
    }
}

// inside an [ApiController]: annotations are already checked (automatic 400)
[HttpPost]
public async Task<IActionResult> Create(CreateUserRequest req,
    [FromServices] IValidator<CreateUserRequest> validator)
{
    var result = await validator.ValidateAsync(req);
    if (!result.IsValid)
        return ValidationProblem(new ValidationProblemDetails(result.ToDictionary()));
    return Created($"/api/users/{req.Email}", req);
}`,
  },
  {
    id: 'an-8',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Filters exam hall ke invigilator jaise hain. Entry par admit card check (authorization filter), exam se pehle aur baad mein nazar (action filter), koi gadbad ho to sambhalna (exception filter), aur copy jama hone se pehle aakhri check (result filter).',
      en: 'Filters are like invigilators in an exam hall. They check the admit card at the door (authorization filter), watch before and after the exam (action filter), handle it if something goes wrong (exception filter), and do a last check before the answer sheet is submitted (result filter).',
      bn: 'Filters হলো পরীক্ষার হলের ইনভিজিলেটরের মতো। দরজায় admit card চেক (authorization filter), পরীক্ষার আগে আর পরে নজর রাখা (action filter), কোনো গোলমাল হলে সামলানো (exception filter), আর খাতা জমা দেওয়ার আগে শেষ চেক (result filter)।',
    },
    question: 'What are filters in ASP.NET Core MVC? Explain the filter types and their order.',
    answer: 'Filters run code at specific stages of the MVC action pipeline, after routing has picked the action. The order is: authorization filters → resource filters → model binding → action filters (before and after the action) → exception filters (for unhandled exceptions from the action, action filters or model binding) → result filters around the execution of the result. They suit cross-cutting concerns tied to actions, like auditing, validation shortcuts or adding headers, while middleware handles concerns for every request. Filters can be applied globally, per controller or per action, and ServiceFilter/TypeFilter let a filter receive dependencies from DI.',
    points: [
      'Types: Authorization, Resource, Action, Exception, Result (plus async versions)',
      'Short-circuit by setting context.Result',
      'Scope order: global → controller → action (reversed on the way out); Order property overrides',
      'Exception filters only cover MVC — prefer exception-handler middleware for global error handling',
      'Minimal APIs use IEndpointFilter instead',
    ],
    code: `public class AuditFilter(ILogger<AuditFilter> logger) : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        logger.LogInformation("Before {Action}", context.ActionDescriptor.DisplayName);
        var executed = await next();            // runs the action
        if (executed.Exception is null)
            logger.LogInformation("After {Action}", context.ActionDescriptor.DisplayName);
    }
}

// Option 1: global
builder.Services.AddControllers(o => o.Filters.Add<AuditFilter>());

// Option 2: per controller/action, resolved from DI
builder.Services.AddScoped<AuditFilter>();
[ServiceFilter(typeof(AuditFilter))]
public class OrdersController : ControllerBase { }`,
  },
  {
    id: 'an-9',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Configuration ghar ki recipe diary jaisi hai — namak kitna, mirch kitni. Options pattern us diary se nikala hua ek saaf printed card hai jo sirf \'Biryani\' ki recipe deta hai. IOptionsMonitor aisa card hai jo maa recipe badle to apne aap update ho jaata hai.',
      en: 'Configuration is like the family recipe diary — how much salt, how much chilli. The options pattern is a neat printed card taken from that diary with only the \'Biryani\' recipe. IOptionsMonitor is a card that updates itself when Mum changes the recipe.',
      bn: 'Configuration হলো বাড়ির রান্নার রেসিপি ডায়েরির মতো — কতটা নুন, কতটা লঙ্কা। Options pattern হলো সেই ডায়েরি থেকে বানানো একটা পরিষ্কার ছাপানো কার্ড, যাতে শুধু \'বিরিয়ানি\'-র রেসিপি আছে। IOptionsMonitor এমন কার্ড যেটা মা রেসিপি বদলালে নিজে থেকেই আপডেট হয়ে যায়।',
    },
    question: 'How does configuration work in ASP.NET Core, and what is the options pattern (IOptions vs IOptionsSnapshot vs IOptionsMonitor)?',
    answer: 'Configuration is a layered key-value system built from appsettings.json, appsettings.{Environment}.json, user secrets (in Development), environment variables and command-line arguments, where later sources override earlier ones. Instead of reading IConfiguration["Key"] everywhere, the options pattern binds a section to a strongly typed class that you inject. IOptions<T> is a singleton read once; IOptionsSnapshot<T> is scoped and recomputed per request, so it sees reloaded values; IOptionsMonitor<T> is a singleton that always returns the current value via CurrentValue and raises OnChange — the one to use inside singletons.',
    points: [
      'Nested keys use \':\' in code and \'__\' in environment variables (Smtp__Host)',
      'ASPNETCORE_ENVIRONMENT selects which appsettings.{Environment}.json is loaded',
      'Validate with ValidateDataAnnotations() and ValidateOnStart() to fail fast',
      'Never commit secrets: user secrets locally, Key Vault or env vars in production',
      'Named options for several configurations of the same type',
    ],
    code: `// appsettings.json: { "Smtp": { "Host": "smtp.example.com", "Port": 587 } }
public class SmtpOptions
{
    public const string Section = "Smtp";
    [Required] public string Host { get; set; } = "";
    [Range(1, 65535)] public int Port { get; set; }
}

builder.Services.AddOptions<SmtpOptions>()
    .Bind(builder.Configuration.GetSection(SmtpOptions.Section))
    .ValidateDataAnnotations()
    .ValidateOnStart();

public class EmailSender(IOptionsMonitor<SmtpOptions> options)  // safe in a singleton
{
    public string Server => $"{options.CurrentValue.Host}:{options.CurrentValue.Port}";
}`,
  },
  {
    id: 'an-10',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Logging dukaan ki roz ki khata-book hai. Structured logging matlab sab kuch column mein likhna — tareekh, saaman, rakam — taaki baad mein \'sirf chawal ki bikri\' turant dhoondh sako, lambi kahani padhne ki zaroorat na pade.',
      en: 'Logging is the shop\'s daily account book. Structured logging means writing everything in columns — date, item, amount — so later you can instantly find \'only rice sales\' without reading a long story.',
      bn: 'Logging হলো দোকানের রোজকার হিসাবের খাতা। Structured logging মানে সব কিছু কলামে লেখা — তারিখ, জিনিস, টাকা — যাতে পরে \'শুধু চালের বিক্রি\' সঙ্গে সঙ্গে খুঁজে পাও, লম্বা গল্প পড়তে না হয়।',
    },
    question: 'How does logging work in ASP.NET Core, and what is structured logging?',
    answer: 'ASP.NET Core has a built-in logging abstraction: inject ILogger<T> (the category is the class name), and configured providers — console, debug, EventSource, or third-party ones like Serilog, NLog or OpenTelemetry exporters — decide where logs go. Structured logging means using message templates with named placeholders, e.g. LogInformation("Order {OrderId} placed by {UserId}", id, user), so the values are stored as separate searchable fields rather than baked into a string. Levels (Trace, Debug, Information, Warning, Error, Critical) and per-category minimum levels are set in the "Logging" section of configuration.',
    points: [
      'Don\'t use string interpolation in log calls — it loses structure and allocates even when the level is disabled',
      'Pass the exception as the first argument: LogError(ex, "...")',
      'BeginScope adds context (e.g. correlation id) to every log inside a block',
      '[LoggerMessage] source generator for high-performance hot paths',
      'Never log secrets or personal data; ship logs to a central store (Seq, ELK, Application Insights)',
    ],
    code: `public static partial class OrderLogs
{
    [LoggerMessage(Level = LogLevel.Warning, Message = "Order {OrderId} took {ElapsedMs} ms")]
    public static partial void SlowOrder(ILogger logger, int orderId, long elapsedMs);
}

public class OrderService(ILogger<OrderService> logger)
{
    public void Place(int orderId, string userId)
    {
        using (logger.BeginScope("CorrelationId {CorrelationId}", Guid.NewGuid()))
        {
            logger.LogInformation("Order {OrderId} placed by {UserId}", orderId, userId); // good
            // logger.LogInformation($"Order {orderId} placed");  // bad: not structured
            OrderLogs.SlowOrder(logger, orderId, 1200);
        }
    }
}
// appsettings.json: "Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning" } }`,
  },
  {
    id: 'an-11',
    level: 'fresher',
    topic: 'aspnet',
    difficulty: 'easy',
    simple: {
      hi: 'Society gate par guard pehle ID card dekhta hai — \'aap kaun ho?\' (authentication). Phir dekhta hai ki aapko gym mein jaane ki permission hai ya nahi (authorization). Role ek badge hai jaise \'Resident\'; policy ek niyam hai jaise \'Resident ho aur 18+ ho tabhi gym\'.',
      en: 'At the housing society gate, the guard first checks your ID card — \'who are you?\' (authentication). Then he checks whether you are allowed into the gym (authorization). A role is a badge like \'Resident\'; a policy is a rule like \'only residents aged 18+ can use the gym\'.',
      bn: 'সোসাইটির গেটে গার্ড প্রথমে ID কার্ড দেখে — \'তুমি কে?\' (authentication)। তারপর দেখে তোমার জিমে ঢোকার অনুমতি আছে কিনা (authorization)। Role হলো একটা ব্যাজ, যেমন \'Resident\'; policy হলো একটা নিয়ম, যেমন \'Resident আর ১৮+ হলে তবেই জিম\'।',
    },
    question: 'What is the difference between authentication and authorization in ASP.NET Core? How do roles and policies fit in?',
    answer: 'Authentication answers \'who are you?\' — it validates credentials such as a cookie, JWT or API key and builds a ClaimsPrincipal in HttpContext.User. Authorization answers \'what are you allowed to do?\' — it checks that user against requirements. A request that is not authenticated gets 401 Unauthorized; an authenticated user without permission gets 403 Forbidden. Role-based checks use [Authorize(Roles = "Admin")], while policy-based authorization defines named policies (roles, claims or custom requirements with handlers) applied with [Authorize(Policy = "...")] or RequireAuthorization — more flexible and easier to test.',
    points: [
      'UseAuthentication() must come before UseAuthorization()',
      'Roles are just claims; policies can combine roles, claims and custom logic',
      'Custom rules: IAuthorizationRequirement + AuthorizationHandler<T>',
      '[AllowAnonymous] opens specific endpoints',
      'Resource-based checks with IAuthorizationService.AuthorizeAsync(user, resource, policy)',
    ],
    code: `builder.Services.AddAuthorizationBuilder()
    .AddPolicy("CanRefund", p => p.RequireRole("Manager").RequireClaim("department", "Finance"));

app.UseAuthentication();
app.UseAuthorization();

[Authorize(Roles = "Admin")]                    // role-based
public class AdminController : ControllerBase
{
    [Authorize(Policy = "CanRefund")]           // policy-based
    [HttpPost("refund/{id:int}")]
    public IActionResult Refund(int id) => NoContent();
}

app.MapDelete("/users/{id:int}", (int id) => Results.NoContent())
   .RequireAuthorization("CanRefund");`,
  },
  {
    id: 'an-12',
    level: 'mid',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'JWT ek cinema ticket jaisa hai jis par hologram stamp laga hai. Gatekeeper har baar counter ko phone nahi karta — bas stamp asli hai aur show ka time valid hai, ye dekh kar andar jaane deta hai. Ticket par likha sab koi bhi padh sakta hai, isliye usme secret mat likho.',
      en: 'A JWT is like a cinema ticket with a hologram stamp. The gatekeeper doesn\'t phone the counter every time — he just checks that the stamp is real and the show time is valid, then lets you in. Anyone can read what is printed on the ticket, so never write secrets on it.',
      bn: 'JWT হলো হলোগ্রাম স্ট্যাম্প লাগানো সিনেমার টিকিটের মতো। গেটকিপার প্রতিবার কাউন্টারে ফোন করে না — শুধু দেখে স্ট্যাম্প আসল আর শো-এর সময় ঠিক আছে, তারপর ঢুকতে দেয়। টিকিটে যা লেখা থাকে সেটা যে কেউ পড়তে পারে, তাই ওতে কোনো গোপন কথা লিখো না।',
    },
    question: 'How does JWT bearer authentication work in ASP.NET Core?',
    answer: 'A JWT is a signed token (header.payload.signature, Base64Url-encoded) carrying claims such as user id, roles and expiry; the client sends it in the Authorization: Bearer <token> header. In ASP.NET Core you call AddAuthentication().AddJwtBearer(...) and validate issuer, audience, lifetime and signing key — usually by pointing Authority at an identity provider (Entra ID, Auth0, Keycloak, Duende) so signing keys are fetched from its metadata. The API stays stateless: it only validates the signature and claims on each request, so keep access tokens short-lived and use refresh tokens to renew them.',
    points: [
      'The payload is only encoded, not encrypted — never put secrets in it',
      'Validate issuer, audience, lifetime and signature; keep ClockSkew small',
      'Prefer asymmetric keys from an identity provider; a symmetric key must come from secure config, never code',
      'Revocation is hard: short expiry, refresh-token rotation, deny-list if needed',
      'Always use HTTPS; store tokens carefully on the client (XSS risk)',
    ],
    code: `builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(o =>
    {
        o.Authority = "https://login.example.com/";  // IdP that issues and signs tokens
        o.Audience = "orders-api";                   // must match the token's aud claim
        o.TokenValidationParameters.ClockSkew = TimeSpan.FromSeconds(30);
        // issuer, audience, lifetime and signing key are validated by default
    });
builder.Services.AddAuthorization();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

app.MapGet("/orders", (ClaimsPrincipal user) => $"Hello {user.Identity?.Name}")
   .RequireAuthorization();`,
  },
  {
    id: 'an-13',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'easy',
    simple: {
      hi: 'CORS school ke watchman jaisa hai: bahar se aaya tiffin tabhi andar jaayega jab school (API) ne us parent (origin) ka naam list mein likha ho. Par ye check sirf watchman (browser) karta hai — deewar kood kar aane wale (Postman/curl) ko CORS nahi rokta.',
      en: 'CORS is like the school watchman: a tiffin from outside goes in only if the school (API) has written that parent\'s name (origin) on its list. But only the watchman (the browser) does this check — CORS does not stop someone who jumps over the wall (Postman/curl).',
      bn: 'CORS হলো স্কুলের দারোয়ানের মতো: বাইরে থেকে আসা টিফিন তখনই ভেতরে যাবে যখন স্কুল (API) সেই অভিভাবকের (origin) নাম তালিকায় লিখে রেখেছে। কিন্তু এই চেক শুধু দারোয়ান (browser) করে — দেয়াল টপকে আসা লোককে (Postman/curl) CORS আটকায় না।',
    },
    question: 'What is CORS and how do you configure it in ASP.NET Core?',
    answer: 'CORS (Cross-Origin Resource Sharing) is a browser rule: by default JavaScript on https://app.example.com cannot read responses from a different origin like https://api.example.com unless the API returns Access-Control-Allow-* headers that allow it. For non-simple requests (JSON POST, custom headers, PUT/DELETE) the browser first sends a preflight OPTIONS request. In ASP.NET Core you define a named policy with AddCors listing exact origins, methods and headers, and enable it with app.UseCors (after UseRouting, before UseAuthorization) or per endpoint with RequireCors / [EnableCors].',
    points: [
      'Origin = scheme + host + port',
      'CORS is enforced only by browsers — it does not protect the API from Postman, curl or other servers',
      'AllowAnyOrigin cannot be combined with AllowCredentials; list origins explicitly',
      'Keep allowed origins in configuration per environment',
      'A CORS error appears in the browser console even though the server may have processed the request',
    ],
    code: `builder.Services.AddCors(o => o.AddPolicy("SpaPolicy", p => p
    .WithOrigins("https://app.example.com", "http://localhost:4200")
    .WithMethods("GET", "POST", "PUT", "DELETE")
    .AllowAnyHeader()
    .AllowCredentials()));

var app = builder.Build();
app.UseRouting();
app.UseCors("SpaPolicy");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();`,
  },
  {
    id: 'an-14',
    level: 'mid',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Global exception handler hospital ka emergency desk hai — har doctor ko alag se sambhalna nahi padta, saari emergencies ek jagah aati hain. Ghar walon ko ek standard parchi (ProblemDetails) milti hai — kya hua aur status kya hai — poori medical file (stack trace) nahi.',
      en: 'A global exception handler is like a hospital\'s emergency desk — each doctor doesn\'t handle it separately; every emergency comes to one place. The family gets a standard slip (ProblemDetails) saying what happened and the status — not the whole medical file (stack trace).',
      bn: 'Global exception handler হলো হাসপাতালের ইমার্জেন্সি ডেস্কের মতো — প্রত্যেক ডাক্তারকে আলাদা করে সামলাতে হয় না, সব ইমার্জেন্সি এক জায়গায় আসে। বাড়ির লোক একটা নির্দিষ্ট স্লিপ (ProblemDetails) পায় — কী হয়েছে আর অবস্থা কী — পুরো মেডিক্যাল ফাইল (stack trace) নয়।',
    },
    question: 'How do you implement global exception handling in ASP.NET Core and return ProblemDetails?',
    answer: 'Instead of try/catch in every action, handle unhandled exceptions centrally with the exception handler middleware placed at the very start of the pipeline. In .NET 8+ you implement IExceptionHandler, register it with AddExceptionHandler<T>(), and call app.UseExceptionHandler(); handlers run in registration order and return true once one has handled the exception. Combine it with AddProblemDetails() so errors come back in the standard ProblemDetails format (RFC 9457, which replaced RFC 7807: type, title, status, detail, instance, served as application/problem+json) instead of stack traces.',
    points: [
      'Log the full exception on the server, return a safe message to the client',
      'Map known exceptions to status codes (not found → 404, bad input → 400, conflict → 409)',
      'Never show stack traces in production; the developer exception page is for Development only',
      'AddProblemDetails also gives consistent bodies for empty 4xx/5xx responses (with UseStatusCodePages)',
      'Exception filters only cover MVC; the middleware covers the whole pipeline',
      'Don\'t use exceptions for normal control flow',
    ],
    code: `public sealed class GlobalExceptionHandler(
    ILogger<GlobalExceptionHandler> logger, IProblemDetailsService problemDetails) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext context, Exception ex, CancellationToken ct)
    {
        logger.LogError(ex, "Unhandled exception for {Path}", context.Request.Path);
        var status = ex switch
        {
            KeyNotFoundException => StatusCodes.Status404NotFound,
            ArgumentException => StatusCodes.Status400BadRequest,
            _ => StatusCodes.Status500InternalServerError
        };
        context.Response.StatusCode = status;
        return await problemDetails.TryWriteAsync(new ProblemDetailsContext
        {
            HttpContext = context,
            Exception = ex,
            ProblemDetails = new ProblemDetails { Status = status, Title = "Request failed" }
        });
    }
}

builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
app.UseExceptionHandler();   // first in the pipeline`,
  },
  {
    id: 'an-15',
    level: 'mid',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'API versioning school ki textbook edition jaisi hai. Purane bachche v1 edition se padhte rahte hain, naye bachche v2 se — school raaton-raat purani kitaab nahi chheenta, pehle notice deta hai ki \'ye edition band hoga\' (deprecated).',
      en: 'API versioning is like textbook editions at school. Older students keep using the v1 edition and new students get v2 — the school doesn\'t snatch the old books overnight; it first gives notice that \'this edition will be withdrawn\' (deprecated).',
      bn: 'API versioning হলো স্কুলের পাঠ্যবইয়ের সংস্করণের মতো। পুরনো ছাত্ররা v1 সংস্করণ থেকে পড়তে থাকে, নতুনরা v2 থেকে — স্কুল রাতারাতি পুরনো বই কেড়ে নেয় না, আগে নোটিশ দেয় যে \'এই সংস্করণ বন্ধ হবে\' (deprecated)।',
    },
    question: 'How do you version a Web API in ASP.NET Core?',
    answer: 'API versioning lets you ship breaking changes while existing clients keep working on the old contract. The standard library is Asp.Versioning (Asp.Versioning.Mvc for controllers, Asp.Versioning.Http for minimal APIs), the successor of Microsoft.AspNetCore.Mvc.Versioning. The version can be read from a URL segment (/api/v2/orders), query string (?api-version=2.0), a header or the media type; URL segments are the most visible, while header and query keep URLs stable. You set a default version, report supported versions in response headers, and mark old versions as deprecated before removing them.',
    points: [
      'Create a new version only for breaking changes; additive changes don\'t need one',
      'ReportApiVersions adds api-supported-versions / api-deprecated-versions response headers',
      'ApiVersionReader.Combine lets clients use more than one strategy',
      'Generate one OpenAPI/Swagger document per version (API explorer package)',
      'Publish a deprecation and sunset policy for clients',
    ],
    code: `builder.Services.AddApiVersioning(o =>
{
    o.DefaultApiVersion = new ApiVersion(1, 0);
    o.AssumeDefaultVersionWhenUnspecified = true;
    o.ReportApiVersions = true;
    o.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),
        new HeaderApiVersionReader("X-Api-Version"));
}).AddMvc();

[ApiController]
[ApiVersion("1.0", Deprecated = true)]
[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/orders")]
public class OrdersController : ControllerBase
{
    [HttpGet, MapToApiVersion("1.0")]
    public IActionResult GetV1() => Ok(new[] { "order-1" });

    [HttpGet, MapToApiVersion("2.0")]
    public IActionResult GetV2() => Ok(new { items = new[] { "order-1" }, total = 1 });
}`,
  },
  {
    id: 'an-16',
    level: 'mid',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Rate limiting golgappe wale bhaiya ka niyam hai: har customer ko ek minute mein sirf 6 puri, taaki line mein sabko mile. Koi zyada maange to jawab milta hai \'ruko bhai, thodi der baad\' — yahi 429 Too Many Requests hai.',
      en: 'Rate limiting is the golgappa seller\'s rule: each customer gets only 6 puris a minute, so everyone in the queue gets some. If someone asks for more, the answer is \'wait a bit, brother\' — that is 429 Too Many Requests.',
      bn: 'Rate limiting হলো ফুচকাওয়ালার নিয়ম: প্রত্যেক খদ্দের এক মিনিটে মাত্র ৬টা ফুচকা পাবে, যাতে লাইনের সবাই পায়। কেউ বেশি চাইলে উত্তর আসে \'একটু দাঁড়াও দাদা\' — এটাই 429 Too Many Requests।',
    },
    question: 'How do you add rate limiting to an ASP.NET Core API?',
    answer: 'Rate limiting caps how many requests a client can make in a time window, protecting the API from abuse, brute-force attacks and noisy neighbours. ASP.NET Core has built-in rate-limiting middleware (Microsoft.AspNetCore.RateLimiting) with fixed window, sliding window, token bucket and concurrency limiters; you register named policies with AddRateLimiter, add app.UseRateLimiter(), and attach policies with RequireRateLimiting or [EnableRateLimiting]. Partition the limit per user, API key or IP so one client cannot starve the others, and set the rejection status to 429 Too Many Requests, because the default is 503.',
    points: [
      'Fixed window = N per window; sliding window smooths edges; token bucket allows bursts; concurrency limits parallel requests',
      'Built-in limiters are in-memory per instance — for many servers use an API gateway or a distributed limiter',
      'Place UseRateLimiter after UseAuthentication if you partition by user',
      'Behind a proxy, take the client IP from forwarded headers',
      'Add a Retry-After header in OnRejected; [DisableRateLimiting] for health checks',
    ],
    code: `builder.Services.AddRateLimiter(o =>
{
    o.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    o.AddPolicy("per-user", ctx => RateLimitPartition.GetFixedWindowLimiter(
        partitionKey: ctx.User.Identity?.Name
                      ?? ctx.Connection.RemoteIpAddress?.ToString() ?? "anon",
        factory: _ => new FixedWindowRateLimiterOptions
        {
            PermitLimit = 100,
            Window = TimeSpan.FromMinutes(1),
            QueueLimit = 0
        }));
    o.AddTokenBucketLimiter("burst", t =>
    {
        t.TokenLimit = 20;
        t.TokensPerPeriod = 10;
        t.ReplenishmentPeriod = TimeSpan.FromSeconds(1);
    });
});

app.UseRateLimiter();
app.MapGet("/api/search", () => "results").RequireRateLimiting("per-user");`,
  },
  {
    id: 'an-17',
    level: 'fresher',
    topic: 'aspnet',
    difficulty: 'easy',
    simple: {
      hi: 'Health check roz subah ki attendance jaisa hai. Load balancer ya Kubernetes teacher ki tarah /health par naam pukarta hai; jawab \'Healthy\' aaye to kaam milta hai, \'Unhealthy\' aaye to us bachche ko aaram diya jaata hai (traffic band ya restart).',
      en: 'A health check is like the morning attendance call. The load balancer or Kubernetes, like a teacher, calls out at /health; if the answer is \'Healthy\' the app gets work, and if it is \'Unhealthy\' that child is sent to rest (traffic stopped or restarted).',
      bn: 'Health check হলো রোজ সকালের হাজিরা ডাকার মতো। Load balancer বা Kubernetes টিচারের মতো /health-এ নাম ডাকে; উত্তর \'Healthy\' এলে কাজ পায়, \'Unhealthy\' এলে সেই ছাত্রকে বিশ্রামে পাঠানো হয় (traffic বন্ধ বা restart)।',
    },
    question: 'What are health checks in ASP.NET Core and why are they used?',
    answer: 'Health checks expose an endpoint such as /health that load balancers, Kubernetes probes and monitoring tools call to see whether the app can serve traffic. You register checks with AddHealthChecks() — custom IHealthCheck classes or community packages for SQL Server, Redis, RabbitMQ and others — and expose them with MapHealthChecks. Each check reports Healthy, Degraded or Unhealthy; Unhealthy returns HTTP 503 so the orchestrator can stop routing traffic to that instance or restart it.',
    points: [
      'Liveness (is the process alive?) vs readiness (are dependencies ready?) — separate endpoints using tags',
      'Keep checks fast and cheap, with timeouts',
      'Don\'t expose detailed health data publicly; restrict or secure the endpoint',
      'Healthy and Degraded return 200, Unhealthy returns 503 by default',
      'Custom ResponseWriter can return JSON details for dashboards',
    ],
    code: `public class PaymentGatewayHealthCheck(IHttpClientFactory factory) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken ct = default)
    {
        var client = factory.CreateClient("payments");
        var response = await client.GetAsync("/ping", ct);
        return response.IsSuccessStatusCode
            ? HealthCheckResult.Healthy()
            : HealthCheckResult.Unhealthy("Payment gateway not reachable");
    }
}

builder.Services.AddHealthChecks()
    .AddCheck("self", () => HealthCheckResult.Healthy(), tags: ["live"])
    .AddCheck<PaymentGatewayHealthCheck>("payments", tags: ["ready"]);

app.MapHealthChecks("/health/live", new HealthCheckOptions { Predicate = r => r.Tags.Contains("live") });
app.MapHealthChecks("/health/ready", new HealthCheckOptions { Predicate = r => r.Tags.Contains("ready") });`,
  },
  {
    id: 'an-18',
    level: 'junior',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'Har call ke liye naya HttpClient banana aisa hai jaise har phone call ke liye naya SIM khareedna — jaldi hi SIM (sockets) khatam! IHttpClientFactory ek samajhdar mobile dukaan jaisa hai jo SIM dobara use karta hai aur purane ko time-time par badal deta hai (DNS update).',
      en: 'Creating a new HttpClient for every call is like buying a new SIM card for every phone call — soon you run out of SIMs (sockets)! IHttpClientFactory is like a smart mobile shop that reuses SIMs and replaces old ones from time to time (DNS updates).',
      bn: 'প্রতিটা call-এর জন্য নতুন HttpClient বানানো মানে প্রতিটা ফোন কলের জন্য নতুন SIM কেনা — শিগগিরই SIM (sockets) শেষ! IHttpClientFactory হলো একটা বুদ্ধিমান মোবাইল দোকানের মতো, যে SIM আবার ব্যবহার করে আর পুরনোগুলো মাঝে মাঝে বদলে দেয় (DNS update)।',
    },
    question: 'Scenario: your service creates a new HttpClient for every outgoing call and under load you see socket exhaustion errors. Why does this happen, and how does IHttpClientFactory fix it?',
    answer: 'HttpClient is designed to be reused: disposing one per call closes its connection, but the socket stays in TIME_WAIT for a while, so under load the machine runs out of ports and you get SocketExceptions and slow calls. A single static HttpClient avoids that but keeps connections forever and can miss DNS changes. IHttpClientFactory solves both: it pools and periodically recycles the underlying HttpMessageHandlers (default handler lifetime is two minutes), so creating clients is cheap and connections are reused, and it gives one place to configure named or typed clients with base address, headers, DelegatingHandlers and resilience (retry, timeout, circuit breaker via Microsoft.Extensions.Http.Resilience / Polly).',
    points: [
      'Register with AddHttpClient; typed clients keep calling code clean',
      'Clients from the factory are cheap — disposing them is fine, the handler is pooled',
      'Don\'t capture a typed client inside a singleton — it pins one handler and brings back the DNS problem',
      'Alternative: one long-lived HttpClient with SocketsHttpHandler.PooledConnectionLifetime set',
      'Add AddStandardResilienceHandler for retries and timeouts; always pass a CancellationToken',
    ],
    code: `builder.Services.AddHttpClient<GitHubClient>(c =>
{
    c.BaseAddress = new Uri("https://api.github.com/");
    c.DefaultRequestHeaders.UserAgent.ParseAdd("my-app");
})
.AddStandardResilienceHandler();   // retry, timeouts, circuit breaker

public class GitHubClient(HttpClient http)   // typed client (transient)
{
    public Task<string> GetRepoAsync(string owner, string repo, CancellationToken ct) =>
        http.GetStringAsync($"repos/{owner}/{repo}", ct);
}

// BAD: a new client (and socket) per call
// using var client = new HttpClient();
// var json = await client.GetStringAsync(url);`,
  },
  {
    id: 'an-19',
    level: 'mid',
    topic: 'aspnet',
    difficulty: 'medium',
    simple: {
      hi: 'BackgroundService society ka safai wala hai jo har 5 minute mein chupchap kachra uthata hai, jab baaki sab apna kaam kar rahe hote hain. Jab society band hone ka signal (stoppingToken) aata hai, wo kaam samet kar ghar chala jaata hai.',
      en: 'A BackgroundService is like the society\'s sweeper who quietly collects rubbish every 5 minutes while everyone else does their own work. When the \'closing time\' signal (stoppingToken) comes, he wraps up and goes home.',
      bn: 'BackgroundService হলো সোসাইটির ঝাড়ুদারের মতো, যে প্রতি ৫ মিনিটে চুপচাপ ময়লা তোলে, যখন বাকিরা নিজেদের কাজ করছে। যখন বন্ধ হওয়ার সংকেত (stoppingToken) আসে, সে কাজ গুছিয়ে বাড়ি চলে যায়।',
    },
    question: 'What are IHostedService and BackgroundService, and how do you run background work in ASP.NET Core?',
    answer: 'IHostedService is the interface for long-running work hosted alongside the web app; the host calls StartAsync on startup and StopAsync on shutdown. BackgroundService is an abstract base class implementing it: you override ExecuteAsync(CancellationToken stoppingToken) and loop until the token is cancelled — typical for queue consumers, scheduled clean-ups and cache refreshes. Hosted services are registered with AddHostedService<T>() and live as singletons, so to use scoped services you create a scope per iteration with IServiceScopeFactory.',
    points: [
      'Respect stoppingToken for graceful shutdown',
      'PeriodicTimer for interval-based work',
      'In modern .NET an unhandled exception in ExecuteAsync stops the host by default — catch and log inside the loop',
      'Don\'t do long work in StartAsync — it delays application startup',
      'Runs on every instance when scaled out — use a distributed lock or a dedicated worker',
      'For durable or scheduled jobs consider Hangfire, Quartz.NET or a message queue',
    ],
    code: `public class CleanupWorker(IServiceScopeFactory scopeFactory, ILogger<CleanupWorker> logger)
    : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(TimeSpan.FromMinutes(5));
        while (await timer.WaitForNextTickAsync(stoppingToken))
        {
            try
            {
                await using var scope = scopeFactory.CreateAsyncScope();
                var repo = scope.ServiceProvider.GetRequiredService<ISessionRepository>();
                var removed = await repo.DeleteExpiredAsync(stoppingToken);
                logger.LogInformation("Removed {Count} expired sessions", removed);
            }
            catch (Exception ex) when (ex is not OperationCanceledException)
            {
                logger.LogError(ex, "Cleanup failed");
            }
        }
    }
}

builder.Services.AddHostedService<CleanupWorker>();`,
  },
  {
    id: 'an-20',
    level: 'senior',
    topic: 'aspnet',
    difficulty: 'hard',
    simple: {
      hi: 'Output caching chai wale ka bada kettle hai — har customer ke liye nayi chai banane ke bajaye pehle se bani chai turant de deta hai, aur kab nayi banani hai ye chai wala khud tay karta hai. Response caching aisa hai jaise customer apna flask bhar ke le jaaye — browser khud rakh leta hai, aur customer bole \'taaza chahiye\' to nayi banti hai.',
      en: 'Output caching is the chaiwala\'s big kettle — instead of making fresh tea for each customer, he pours ready tea instantly, and he decides when to make a new batch. Response caching is like the customer filling his own flask — the browser keeps it, and if the customer says \'I want it fresh\', a new cup is made.',
      bn: 'Output caching হলো চা-ওয়ালার বড় কেটলি — প্রত্যেক খদ্দেরের জন্য নতুন চা না বানিয়ে আগে থেকে বানানো চা সঙ্গে সঙ্গে দেয়, আর কখন নতুন চা বানাবে সেটা চা-ওয়ালা নিজেই ঠিক করে। Response caching হলো খদ্দেরের নিজের ফ্লাস্ক ভরে নিয়ে যাওয়ার মতো — browser নিজে রেখে দেয়, আর খদ্দের \'টাটকা চাই\' বললে নতুন চা হয়।',
    },
    question: 'What is the difference between response caching and output caching in ASP.NET Core? When would you use each?',
    answer: 'Response caching ([ResponseCache] plus UseResponseCaching) is based on HTTP cache headers: it sets Cache-Control so browsers, CDNs and proxies can cache, and the server-side middleware caches only when HTTP rules allow — a client can bypass it with Cache-Control: no-cache, so it suits public GET content. Output caching (AddOutputCache, UseOutputCache, CacheOutput() or [OutputCache]) is server-controlled: the server decides what to cache regardless of client headers, supports vary-by query/header/route, tag-based eviction and request coalescing to prevent cache stampedes, and can use an in-memory or Redis store. For caching data rather than whole responses, use IMemoryCache, IDistributedCache or HybridCache.',
    points: [
      'Response caching = HTTP semantics, client-influenced; output caching = server policy',
      'Output caching by default caches only GET/HEAD 200 responses and skips authenticated requests and responses that set cookies',
      'Evict by tag after writes with IOutputCacheStore.EvictByTagAsync',
      'In-memory caches are per instance — use Redis for multiple servers',
      'Design cache keys carefully so one user\'s data is never served to another',
    ],
    code: `builder.Services.AddOutputCache(o =>
{
    o.AddBasePolicy(b => b.Expire(TimeSpan.FromSeconds(30)));
    o.AddPolicy("Products", b => b.Expire(TimeSpan.FromMinutes(5))
                                  .SetVaryByQuery("category")
                                  .Tag("products"));
});

var app = builder.Build();
app.UseOutputCache();

app.MapGet("/products", (string? category, IProductService svc) => svc.GetAll(category))
   .CacheOutput("Products");

app.MapPost("/products", async (Product p, IOutputCacheStore cache, CancellationToken ct) =>
{
    // ... save the product
    await cache.EvictByTagAsync("products", ct);   // invalidate cached lists
    return Results.Created($"/products/{p.Id}", p);
});

// Response caching (HTTP headers) on a controller action:
// [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Any)]`,
  },
  {
    id: 'an-21',
    level: 'senior',
    topic: 'aspnet',
    difficulty: 'hard',
    simple: {
      hi: 'Kestrel hotel ka chef hai jo khana (response) banata hai. Reverse proxy (Nginx/IIS) reception hai — mehmaan wahan aate hain, security check hoti hai, phir order kitchen jaata hai. Forwarded headers wo parchi hai jisme reception asli mehmaan ka naam likhta hai, warna chef ko lagega saare order reception ne hi diye.',
      en: 'Kestrel is the hotel\'s chef who cooks the food (response). The reverse proxy (Nginx/IIS) is the reception — guests arrive there, get a security check, and then the order goes to the kitchen. Forwarded headers are the slip where reception writes the real guest\'s name; otherwise the chef thinks every order came from reception.',
      bn: 'Kestrel হলো হোটেলের শেফ, যে খাবার (response) রান্না করে। Reverse proxy (Nginx/IIS) হলো রিসেপশন — অতিথিরা সেখানে আসে, security চেক হয়, তারপর অর্ডার রান্নাঘরে যায়। Forwarded headers হলো সেই চিরকুট যেখানে রিসেপশন আসল অতিথির নাম লেখে, না হলে শেফ ভাববে সব অর্ডার রিসেপশনই দিয়েছে।',
    },
    question: 'What is Kestrel, and why and how do you run ASP.NET Core behind a reverse proxy?',
    answer: 'Kestrel is ASP.NET Core\'s built-in cross-platform web server; it is fast, supports HTTP/1.1, HTTP/2, HTTP/3 and HTTPS, and is used by default (IIS in-process hosting is the exception — it uses the IIS HTTP Server instead). Kestrel can face the internet directly, but production apps commonly sit behind a reverse proxy or load balancer — Nginx, IIS, YARP, a cloud gateway or a Kubernetes ingress — which handles TLS termination, load balancing, request filtering and shared ports. Behind a proxy the app sees the proxy\'s IP and often plain http, so you enable the Forwarded Headers middleware (X-Forwarded-For / X-Forwarded-Proto) early in the pipeline and trust only known proxies, so client IPs, HTTPS redirects, auth redirects and generated links are correct.',
    points: [
      'Endpoints via ASPNETCORE_URLS, ASPNETCORE_HTTP_PORTS or the Kestrel config section; .NET 8+ container images listen on port 8080 by default',
      'Tune Kestrel limits: MaxRequestBodySize, MaxConcurrentConnections, timeouts',
      'UseForwardedHeaders runs before other middleware; forwarded headers can be spoofed, so restrict KnownProxies',
      'YARP is Microsoft\'s reverse-proxy library built on ASP.NET Core',
      'Pair with health checks and graceful shutdown so the load balancer drains traffic',
    ],
    code: `using System.Net;
using Microsoft.AspNetCore.HttpOverrides;

var builder = WebApplication.CreateBuilder(args);

builder.WebHost.ConfigureKestrel(k =>
{
    k.Limits.MaxRequestBodySize = 10 * 1024 * 1024;   // 10 MB
    k.Limits.MaxConcurrentConnections = 1000;
});

builder.Services.Configure<ForwardedHeadersOptions>(o =>
{
    o.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    o.KnownProxies.Add(IPAddress.Parse("10.0.0.5"));   // trust only our Nginx
});

var app = builder.Build();
app.UseForwardedHeaders();      // first, so later middleware sees the real client
app.UseHttpsRedirection();
app.MapGet("/ip", (HttpContext ctx) => ctx.Connection.RemoteIpAddress?.ToString());
app.Run();`,
  },
  {
    id: 'an-22',
    level: 'senior',
    topic: 'aspnet',
    difficulty: 'hard',
    simple: {
      hi: 'API load par slow ho to wo Durga Puja pandal ki bheed jaisa hai — pehle dekho line asli mein kahan atak rahi hai (measure), sirf aur gate mat kholo. Ho sakta hai ek volunteer (thread) gate par khada bekaar intezaar kar raha ho (.Result) aur baaki sabko rok raha ho — use free karo (async), aur prasad pehle se packet mein rakho (cache).',
      en: 'An API that is slow under load is like the crowd at a Durga Puja pandal — first find where the queue is really stuck (measure); don\'t just open more gates. Maybe a volunteer (thread) is standing at the gate waiting uselessly (.Result) and blocking everyone — free him (async), and keep the prasad ready in packets (cache).',
      bn: 'লোড বাড়লে API ধীর হয়ে যাওয়া মানে দুর্গাপুজোর প্যান্ডেলের ভিড়ের মতো — আগে দেখো লাইন আসলে কোথায় আটকে আছে (measure), শুধু আরও গেট খুলো না। হয়তো একজন স্বেচ্ছাসেবক (thread) গেটে দাঁড়িয়ে অকারণে অপেক্ষা করছে (.Result) আর সবাইকে আটকে রাখছে — তাকে মুক্ত করো (async), আর প্রসাদ আগে থেকেই প্যাকেটে রাখো (cache)।',
    },
    question: 'Scenario: your ASP.NET Core API works fine in testing but becomes slow under load. How do you investigate and fix it?',
    answer: 'First measure instead of guessing: use APM/OpenTelemetry traces, logs and metrics (dotnet-counters for thread-pool queue length, GC and request rate; dotnet-trace or dotnet-dump for hot paths and stuck threads) to see whether time goes into CPU, the thread pool, the database or downstream HTTP calls. A very common cause is thread-pool starvation from blocking async code (.Result, .Wait(), synchronous I/O), followed by slow or chatty data access, HttpClient misuse, missing caching, large payloads and excessive logging. Fix the real bottleneck — async all the way, cache hot reads (output cache, HybridCache/Redis), paginate and compress responses, use IHttpClientFactory with timeouts — then load-test again (k6, JMeter, NBomber) and scale out stateless instances behind a load balancer once the code is efficient.',
    points: [
      'Measure → form a hypothesis → fix one thing → re-test under the same load',
      'Thread-pool starvation symptom: low CPU but rising latency and thread count',
      'Avoid sync-over-async; pass CancellationToken through every call',
      'Reduce allocations and payload size: pagination, response compression, DTOs instead of huge objects',
      'Check log levels (Debug logging in production can kill throughput)',
      'Protect the API with rate limiting and timeouts so one slow dependency doesn\'t take everything down',
    ],
    code: `// BAD: blocks a thread-pool thread for the whole remote call
[HttpGet("{id:int}")]
public IActionResult Get(int id)
{
    var data = _client.GetStringAsync($"items/{id}").Result;   // sync-over-async
    return Ok(data);
}

// GOOD: the thread is released while waiting for I/O
[HttpGet("{id:int}")]
public async Task<IActionResult> Get(int id, CancellationToken ct)
{
    var data = await _client.GetStringAsync($"items/{id}", ct);
    return Ok(data);
}
// Diagnose live: dotnet-counters monitor -n MyApi --counters System.Runtime`,
  },
  {
    id: 'cs-1',
    level: 'fresher',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'CLR ek school ke class teacher jaisa hai. Har bachcha (C#, F#) apni copy ek common bhasha (IL) mein likhta hai, aur teacher (CLR) usse samjha ke machine ko bolti hai, saath mein safai (garbage collection) aur discipline bhi sambhalti hai. Isliye isko managed code kehte hain.',
      en: 'The CLR is like a class teacher. Every student (C#, F#) writes in one common language (IL), and the teacher (CLR) explains it to the machine, while also keeping the class clean (garbage collection) and disciplined. That is why it is called managed code.',
      bn: 'CLR হলো স্কুলের ক্লাস টিচারের মতো। সব ছাত্র (C#, F#) একটা কমন ভাষায় (IL) লেখে, আর টিচার (CLR) সেটা মেশিনকে বুঝিয়ে দেন, সঙ্গে ক্লাস পরিষ্কার রাখা (garbage collection) আর শৃঙ্খলাও দেখেন। তাই একে managed code বলে।',
    },
    question: 'What is the CLR, and what do managed code, IL, JIT and CTS mean in .NET?',
    answer: 'The CLR (Common Language Runtime) is the .NET execution engine. The C# compiler turns source code into IL (Intermediate Language) plus metadata inside an assembly (.dll/.exe); at run time the CLR\'s JIT compiler converts IL into native machine code. Code that runs under the CLR is called managed code because the runtime manages memory (garbage collection), type safety, exception handling and security for it. The CTS (Common Type System) defines how types are declared and used so that all .NET languages (C#, F#, VB) can share types.',
    points: [
      'C# compiler -> IL + metadata in an assembly; CLR JIT -> native code at run time',
      'Managed code = runs under the CLR (GC, type safety, exceptions); unmanaged = native code like C/C++ or Win32 APIs',
      'CTS = common type rules for all .NET languages; CLS = the subset every language must support for interop',
      'Ahead-of-time options exist too: ReadyToRun and Native AOT compile to native code before deployment',
      'Base Class Library (BCL) gives common types like string, List<T>, Task',
    ],
  },
  {
    id: 'cs-2',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: '.NET Framework ek purani Ambassador car jaisi hai, jo sirf ek sheher (Windows) mein chalti hai aur ab sirf repair hoti hai. Naya .NET ek modern train jaisa hai jo har sheher (Windows, Linux, Mac) mein jaata hai, tez hai, aur har saal naya model aata hai.',
      en: '.NET Framework is like an old Ambassador car that only runs in one city (Windows) and now only gets repairs. Modern .NET is like a new train that goes to every city (Windows, Linux, Mac), is faster, and gets a new model every year.',
      bn: '.NET Framework হলো পুরনো Ambassador গাড়ির মতো, যেটা শুধু এক শহরে (Windows) চলে আর এখন শুধু মেরামত হয়। নতুন .NET হলো আধুনিক ট্রেনের মতো, যেটা সব শহরে (Windows, Linux, Mac) যায়, দ্রুত চলে, আর প্রতি বছর নতুন মডেল আসে।',
    },
    question: 'What is the difference between .NET (formerly .NET Core) and .NET Framework?',
    answer: '.NET Framework is the original Windows-only runtime; 4.8.x is its final major line and it only receives maintenance and security fixes. Modern .NET (.NET Core, renamed to just .NET from version 5) is open source, cross-platform (Windows, Linux, macOS), much faster, supports side-by-side installs and self-contained deployments, and gets a new version every November. New projects should target modern .NET; .NET Framework is mainly kept for legacy apps (e.g. Web Forms, WCF server, older WPF/WinForms code).',
    points: [
      'Framework: Windows-only, closed new feature development, ships with Windows',
      'Modern .NET: cross-platform, open source, yearly releases, better performance',
      'Even-numbered releases are LTS (long-term support), odd-numbered are STS (shorter support)',
      'Side-by-side versions and self-contained / Native AOT deployment',
      'Web Forms and WCF server are not part of modern .NET (CoreWCF is a community option)',
      'Target framework monikers: net48 vs net8.0 / net10.0',
    ],
    code: `<!-- Legacy .NET Framework project -->
<TargetFramework>net48</TargetFramework>

<!-- Modern .NET project (cross-platform) -->
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
</Project>`,
  },
  {
    id: 'cs-3',
    level: 'fresher',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Value type ek photocopy jaisa hai: dost ko notes ki photocopy di, usne usme likha, tumhare notes waise hi rahe. Reference type ek Google Doc link jaisa hai: link share kiya, dost ne edit kiya, toh tumhe bhi change dikhega.',
      en: 'A value type is like a photocopy: you give your friend a photocopy of your notes, they scribble on it, and your notes stay the same. A reference type is like sharing a Google Doc link: your friend edits it and you see the change too.',
      bn: 'Value type হলো ফটোকপির মতো: বন্ধুকে নোটসের ফটোকপি দিলে, সে তাতে লিখলেও তোমার নোটস একই থাকে। Reference type হলো Google Doc-এর link শেয়ার করার মতো: বন্ধু edit করলে তুমিও সেই পরিবর্তন দেখতে পাবে।',
    },
    question: 'What is the difference between value types and reference types in C#?',
    answer: 'A value type variable holds its data directly, so assigning it copies the whole value; examples are int, double, bool, char, enum and struct. A reference type variable holds a reference to an object on the managed heap, so assigning it copies only the reference and both variables point to the same object; examples are class, string, arrays, delegates and interfaces. Value types cannot be null unless wrapped in Nullable<T>, while reference types can be null. Saying "value types live on the stack" is a simplification: a value type field inside a class lives on the heap with that object.',
    points: [
      'Value type: data stored inline, copy on assignment (int, struct, enum, bool)',
      'Reference type: variable stores a reference, assignment shares the same object (class, string, array)',
      'Value types derive from System.ValueType; default value is all-zero, not null',
      'Locals of value type usually live on the stack, but storage location is an implementation detail',
      'Passing to a method: value types are copied unless passed with ref/out/in',
    ],
    code: `var s1 = new PointS { X = 1 };
var s2 = s1;      // copy
s2.X = 99;

var c1 = new PointC { X = 1 };
var c2 = c1;      // same object
c2.X = 99;

Console.WriteLine(s1.X); // 1
Console.WriteLine(c1.X); // 99

struct PointS { public int X; }
class PointC { public int X; }`,
  },
  {
    id: 'cs-4',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Boxing matlab laddoo ko ek dabbe mein pack karna taaki courier (object) le ja sake. Unboxing matlab dabba khol ke laddoo nikalna, par dabba bolta hai \'laddoo\' toh tum usme se \'barfi\' nahi nikal sakte. Har baar pack-unpack karne mein time aur dabba (memory) lagta hai.',
      en: 'Boxing is like packing a laddoo into a box so a courier (object) can carry it. Unboxing is opening the box to take the laddoo out, but if the box says \'laddoo\' you cannot take out a \'barfi\'. Packing and unpacking every time costs time and boxes (memory).',
      bn: 'Boxing মানে লাড্ডুকে একটা বাক্সে প্যাক করা, যাতে courier (object) নিয়ে যেতে পারে। Unboxing মানে বাক্স খুলে লাড্ডু বের করা, কিন্তু বাক্সে \'লাড্ডু\' লেখা থাকলে তুমি \'বরফি\' বের করতে পারবে না। প্রতিবার প্যাক-আনপ্যাক করতে সময় আর বাক্স (memory) লাগে।',
    },
    question: 'What are boxing and unboxing in C#? Why should you avoid them?',
    answer: 'Boxing is converting a value type to object (or to an interface it implements): the runtime allocates a new object on the heap and copies the value into it. Unboxing is the explicit cast back from object to the value type, which checks the type and copies the value out; it must be to the exact boxed type, otherwise an InvalidCastException is thrown. Boxing costs a heap allocation and extra GC work, so in hot paths we avoid it by using generics (List<int> instead of ArrayList) and typed APIs.',
    points: [
      'Boxing: value type -> object/interface, implicit, allocates on the heap',
      'Unboxing: object -> value type, explicit cast, type-checked',
      'Unbox to the exact type: a boxed int cannot be unboxed directly as long',
      'The boxed copy is independent of the original variable',
      'Avoid with generics (List<int>, Dictionary<int,...>) instead of ArrayList/Hashtable; watch string.Format/object parameters in hot loops',
    ],
    code: `int x = 10;
object o = x;      // boxing (copy on heap)
x = 20;
Console.WriteLine(o);   // 10 - the box is a separate copy

int y = (int)o;    // unboxing - OK

try
{
    long l = (long)o;  // boxed int, not long
}
catch (InvalidCastException)
{
    Console.WriteLine("Must unbox to the exact type");
}

long ok = (long)(int)o;  // unbox to int, then convert`,
  },
  {
    id: 'cs-5',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Class ek ghar ka address jaisa hai: sab log ek hi ghar ki taraf point karte hain. Struct ek chhota sa chit hai jo copy karke diya jaata hai. Record ek railway ticket jaisa hai: do ticket mein same naam, train aur seat ho toh dono \'barabar\' maane jaate hain, chahe alag kaagaz ho.',
      en: 'A class is like a house address: everyone points to the same house. A struct is a small note that gets copied when you hand it over. A record is like a train ticket: two tickets with the same name, train and seat count as \'equal\', even if they are different pieces of paper.',
      bn: 'Class হলো একটা বাড়ির ঠিকানার মতো: সবাই একই বাড়ির দিকে point করে। Struct হলো ছোট্ট একটা চিরকুট, যেটা দিলে কপি হয়ে যায়। Record হলো ট্রেনের টিকিটের মতো: দুটো টিকিটে একই নাম, ট্রেন আর সিট থাকলে দুটোকে \'সমান\' ধরা হয়, কাগজ আলাদা হলেও।',
    },
    question: 'What is the difference between class, struct and record in C#?',
    answer: 'A class is a reference type with reference equality by default, supports inheritance and is the normal choice for most objects. A struct is a value type, copied on assignment, cannot inherit from another struct or class (it can implement interfaces) and is best for small, immutable data like a Point or Money. A record (record class by default, or record struct) is a type designed for data: the compiler generates value-based equality, a readable ToString, deconstruction for positional records and non-destructive mutation with the `with` expression.',
    points: [
      'class: reference type, reference equality, inheritance, can be null',
      'struct: value type, copied, no inheritance, keep it small (roughly ≤ 16 bytes) and ideally readonly',
      'record / record class: reference type with value-based Equals/==, ToString, with-expressions',
      'record struct: value type with the same record features; readonly record struct for immutability',
      'Positional records (record Person(string Name, int Age)) create init-only properties and a Deconstruct method',
      'Use records for DTOs, events and value objects',
    ],
    code: `var p1 = new Person("Asha", 30);
var p2 = new Person("Asha", 30);
Console.WriteLine(p1 == p2);          // True (value equality)
Console.WriteLine(ReferenceEquals(p1, p2)); // False

var p3 = p1 with { Age = 31 };        // copy with change
Console.WriteLine(p3);  // Person { Name = Asha, Age = 31 }

var (name, age) = p3;                 // deconstruction

public readonly struct Money(decimal amount, string currency)
{
    public decimal Amount { get; } = amount;
    public string Currency { get; } = currency;
}

public record Person(string Name, int Age);`,
  },
  {
    id: 'cs-6',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Interface ek job description jaisa hai: \'gaadi chalana aana chahiye\', kaise seekha woh tumhari marzi, aur ek insaan kai job descriptions follow kar sakta hai. Abstract class ek adhoora ghar jaisa hai jisme deewar aur chhat bani hui hai, tum sirf andar ka kaam poora karte ho, aur ek hi ghar le sakte ho.',
      en: 'An interface is like a job description: \'must know how to drive\', how you learned is up to you, and one person can meet many job descriptions. An abstract class is like a half-built house with walls and roof ready; you only finish the inside, and you can take only one house.',
      bn: 'Interface হলো একটা job description-এর মতো: \'গাড়ি চালাতে জানতে হবে\', কীভাবে শিখেছ সেটা তোমার ব্যাপার, আর একজন মানুষ অনেকগুলো job description মানতে পারে। Abstract class হলো আধা-তৈরি বাড়ির মতো, দেয়াল আর ছাদ তৈরি, তুমি শুধু ভেতরের কাজ শেষ করো, আর শুধু একটাই বাড়ি নিতে পারো।',
    },
    question: 'What is the difference between an interface and an abstract class? How do default interface methods change this?',
    answer: 'An abstract class is a partially implemented base class: it can have fields, constructors, implemented and abstract members, and a class can inherit from only one. An interface is a contract that a class or struct can implement many of; it cannot hold instance fields or constructors. Since C# 8, interfaces can have default method implementations (and static members), mainly so a library can add a member to a published interface without breaking existing implementers; a default method is only callable through the interface type. Use an abstract class for an "is-a" relationship with shared state/code, and interfaces for capabilities and loose coupling (dependency injection, testing).',
    points: [
      'Single inheritance of classes, multiple implementation of interfaces',
      'Abstract class: fields, constructors, any access modifiers, shared state',
      'Interface: no instance fields/state; members are public by default',
      'Default interface methods: added behaviour without breaking implementers; called via the interface reference',
      'Interfaces can also declare static abstract members (useful for generic math)',
      'Prefer interfaces for DI and mocking; abstract class for a common base with shared code',
    ],
    code: `ILogger logger = new ConsoleLogger();
logger.Info("Started");          // INFO: Started
// new ConsoleLogger().Info("x"); // compile error - not on the class

public interface ILogger
{
    void Log(string message);
    // default implementation
    void Info(string message) => Log("INFO: " + message);
}

public class ConsoleLogger : ILogger
{
    public void Log(string message) => Console.WriteLine(message);
}

public abstract class Shape
{
    public string Name { get; }
    protected Shape(string name) => Name = name;
    public abstract double Area();
}`,
  },
  {
    id: 'cs-7',
    level: 'fresher',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Access modifiers ghar ke kamron jaise hain. Public drawing room hai jahan koi bhi aa sakta hai, private tumhara apna kamra hai, protected woh kamra hai jahan sirf family (child classes) aa sakti hai, aur internal society ka clubhouse hai jahan sirf usi society (assembly) ke log aate hain.',
      en: 'Access modifiers are like rooms in a house. Public is the living room anyone can enter, private is your own bedroom, protected is the room only family (child classes) can use, and internal is the society clubhouse that only people from the same society (assembly) can use.',
      bn: 'Access modifiers হলো বাড়ির ঘরগুলোর মতো। Public হলো বসার ঘর, যেখানে যে কেউ আসতে পারে; private তোমার নিজের ঘর; protected সেই ঘর যেখানে শুধু পরিবার (child classes) আসতে পারে; আর internal হলো আবাসনের ক্লাবঘর, যেখানে শুধু সেই আবাসনের (assembly) লোকেরা যায়।',
    },
    question: 'What are the access modifiers in C# and what are their defaults?',
    answer: 'C# has public (accessible everywhere), private (only inside the same type), protected (the type and its derived types), internal (anywhere in the same assembly), protected internal (same assembly OR derived types) and private protected (derived types that are also in the same assembly). There is also the file modifier for types, which limits a type to the source file it is declared in. By default, class and struct members are private and top-level types are internal.',
    points: [
      'public, private, protected, internal',
      'protected internal = protected OR internal (union)',
      'private protected = protected AND internal (intersection)',
      'Defaults: members private, top-level classes internal, interface members public',
      'file-scoped types (file class) are visible only in that source file, handy for source generators',
      'Use the least access needed (encapsulation)',
    ],
    code: `public class BankAccount
{
    private decimal _balance;               // only this class
    protected string Owner = "";            // this + derived classes
    internal string Branch = "Kolkata";      // same assembly
    protected internal int Code;            // same assembly OR derived
    private protected int Pin;              // derived AND same assembly

    public decimal Balance => _balance;     // everyone can read

    public void Deposit(decimal amount)
    {
        if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
        _balance += amount;
    }
}`,
  },
  {
    id: 'cs-8',
    level: 'fresher',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Static member class ke blackboard jaisa hai: poori class ke liye ek hi blackboard, har bachche ki alag copy nahi. Static class school ke notice board jaisa hai, jise koi ghar nahi le ja sakta (object nahi bana sakte), sab wahi aake padhte hain.',
      en: 'A static member is like the classroom blackboard: there is one board for the whole class, not a copy for each student. A static class is like the school notice board: nobody can take it home (no objects), everyone just comes and reads it.',
      bn: 'Static member হলো ক্লাসের ব্ল্যাকবোর্ডের মতো: পুরো ক্লাসের জন্য একটাই বোর্ড, প্রত্যেক ছাত্রের আলাদা কপি নেই। Static class হলো স্কুলের নোটিস বোর্ডের মতো, কেউ সেটা বাড়ি নিয়ে যেতে পারে না (object বানানো যায় না), সবাই সেখানে এসেই পড়ে।',
    },
    question: 'What are static members and static classes in C#?',
    answer: 'A static member belongs to the type itself rather than to any instance, so it is shared by all objects and accessed through the class name (Math.PI, Console.WriteLine). A static class can contain only static members, cannot be instantiated or inherited (it is implicitly sealed and abstract), and is used for utility/helper methods and extension methods. A static constructor runs once, automatically, before the type is first used, and is used to initialise static fields.',
    points: [
      'Static members: one copy per type, accessed via ClassName.Member',
      'Static methods cannot use `this` or instance members directly',
      'Static class: no instances, no inheritance, only static members',
      'Static constructor: no parameters, no access modifier, runs once before first use',
      'Shared mutable static state is risky in multi-threaded/web apps and hard to unit test',
      'Extension methods must live in a static class',
    ],
    code: `Console.WriteLine(TaxCalculator.WithGst(100m)); // 118.00
new Visitor(); new Visitor();
Console.WriteLine(Visitor.Count);              // 2

public static class TaxCalculator
{
    public static readonly decimal GstRate;

    static TaxCalculator()      // runs once
    {
        GstRate = 0.18m;
    }

    public static decimal WithGst(decimal price) => price * (1 + GstRate);
}

public class Visitor
{
    public static int Count;    // shared by all instances
    public Visitor() => Count++;
}`,
  },
  {
    id: 'cs-9',
    level: 'fresher',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'const ek cricket ground ki pitch length jaisa hai (22 gaj), jo rulebook mein pehle se fix hai. readonly ek player ki jersey number jaisa hai: team join karte waqt (constructor mein) decide hota hai, par uske baad badal nahi sakte.',
      en: 'const is like the length of a cricket pitch (22 yards): it is fixed in the rulebook before any match. readonly is like a player\'s jersey number: decided when the player joins the team (in the constructor) and cannot change after that.',
      bn: 'const হলো ক্রিকেট পিচের দৈর্ঘ্যের মতো (২২ গজ), যেটা নিয়মের বইয়ে আগে থেকেই ঠিক করা। readonly হলো একজন খেলোয়াড়ের জার্সি নম্বরের মতো: দলে যোগ দেওয়ার সময় (constructor-এ) ঠিক হয়, তারপর আর বদলানো যায় না।',
    },
    question: 'What is the difference between const and readonly in C#?',
    answer: 'A const is a compile-time constant: it must be assigned at declaration with a value known at compile time (numbers, bool, char, string, enum or null) and is implicitly static. A readonly field can be assigned at declaration or in a constructor, so its value can be computed at run time and can differ per instance; static readonly is the run-time equivalent of a shared constant. An important gotcha is that const values are copied into the calling assembly at compile time, so changing a public const in a library requires recompiling consumers; readonly does not have this problem.',
    points: [
      'const: compile-time value, implicitly static, only primitive/string/enum/null',
      'readonly: set at declaration or in the constructor, can be per instance',
      'static readonly: run-time constant shared by all, e.g. a DateTime or object',
      'const is baked into the IL of consumers -> versioning issue for public constants',
      'readonly makes the field reference fixed, not the object immutable (a readonly List can still be modified)',
    ],
    code: `public class Config
{
    public const int MaxRetries = 3;                 // compile time
    public static readonly DateTime StartedAt = DateTime.UtcNow; // run time
    public readonly string ConnectionString;        // per instance
    public readonly List<string> Tags = new();

    public Config(string cs)
    {
        ConnectionString = cs;   // allowed in constructor
    }

    public void Change()
    {
        // ConnectionString = "x";  // error CS0191
        Tags.Add("ok");          // allowed: the list itself is mutable
    }
}`,
  },
  {
    id: 'cs-10',
    level: 'fresher',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'String ek chhapi hui kitaab jaisi hai: usme kuch badalna ho toh nayi kitaab chhapni padti hai. StringBuilder ek pencil wali rough copy jaisa hai, jisme tum baar baar likh-mita sakte ho, aur end mein saaf copy (ToString) bana lete ho.',
      en: 'A string is like a printed book: to change anything you must print a new book. StringBuilder is like a rough notebook written in pencil, where you can keep writing and erasing, and at the end you make a clean copy (ToString).',
      bn: 'String হলো ছাপা বইয়ের মতো: কিছু বদলাতে হলে নতুন বই ছাপাতে হয়। StringBuilder হলো পেন্সিলে লেখা রাফ খাতার মতো, যেখানে বারবার লেখা-মোছা যায়, আর শেষে একটা পরিষ্কার কপি (ToString) বানিয়ে নাও।',
    },
    question: 'Why are strings immutable in C#, and when should you use StringBuilder?',
    answer: 'A string object can never change after it is created; methods like Replace, ToUpper or += return a new string and leave the original untouched. Immutability makes strings thread-safe, safe to use as dictionary keys and allows the runtime to intern literals. The downside is that building a string in a loop with + creates many temporary objects, so for repeated concatenation (especially in loops with an unknown number of pieces) you use StringBuilder, which keeps a mutable buffer and produces the final string with ToString().',
    points: [
      'string is a reference type but behaves like a value because it is immutable',
      'Every modification returns a new string object',
      'String literals are interned (same literal shares one instance)',
      'StringBuilder: mutable buffer, Append/Insert/Replace, then ToString()',
      'For a few fixed pieces, + or interpolation ($"...") is fine; use string.Join / string.Concat for collections',
      '== on strings compares content, not reference',
    ],
    code: `string s = "Hello";
string t = s;
s += " World";        // creates a new string
Console.WriteLine(t);  // Hello
Console.WriteLine(s);  // Hello World

var sb = new StringBuilder();
for (int i = 1; i <= 5; i++)
{
    sb.Append(i).Append(',');
}
sb.Length--;           // remove last comma
Console.WriteLine(sb.ToString()); // 1,2,3,4,5`,
  },
  {
    id: 'cs-11',
    level: 'senior',
    topic: 'cs-basics',
    difficulty: 'hard',
    simple: {
      hi: 'Generics ek tiffin box jaisa hai jisme label lagta hai: \'sirf roti\' ya \'sirf chawal\'. Ek hi design ka dabba har khaane ke liye kaam aata hai, par galat cheez daalne nahi deta. Constraint ek rule hai jaise \'is dabbe mein sirf garam khana\', toh dabba jaanta hai ki usme kya kya kar sakte hain.',
      en: 'Generics are like a tiffin box with a label: \'only roti\' or \'only rice\'. One box design works for any food, but it will not let you put the wrong thing in. A constraint is a rule like \'only hot food in this box\', so the box knows what it can do with what is inside.',
      bn: 'Generics হলো লেবেল লাগানো টিফিন বাক্সের মতো: \'শুধু রুটি\' বা \'শুধু ভাত\'। একই ডিজাইনের বাক্স সব খাবারের জন্য কাজ করে, কিন্তু ভুল জিনিস ঢোকাতে দেয় না। Constraint হলো একটা নিয়ম, যেমন \'এই বাক্সে শুধু গরম খাবার\', তাই বাক্স জানে ভেতরের জিনিস দিয়ে কী কী করা যায়।',
    },
    question: 'Explain generics and generic constraints in C#. Write a generic method that returns the maximum item of a collection.',
    answer: 'Generics let you write type-safe, reusable code with type parameters (List<T>, Dictionary<TKey,TValue>, Task<T>) without casting or boxing; the CLR creates specialised code for value types and shares code for reference types. Constraints with `where` tell the compiler what a type argument must support, which unlocks members you can call on T: class, struct, notnull, unmanaged, new(), a base class, or an interface such as IComparable<T>. Generic interfaces and delegates can also be variant: `out T` (covariance, e.g. IEnumerable<out T>) and `in T` (contravariance, e.g. Action<in T>).',
    points: [
      'Type safety at compile time + no boxing for value types',
      'Constraints: where T : class / struct / notnull / unmanaged / new() / BaseClass / IInterface',
      'Multiple constraints combine; new() must come last',
      'Generic math uses interfaces with static abstract members, e.g. where T : INumber<T>',
      'Covariance (out) lets IEnumerable<string> be used as IEnumerable<object>; contravariance (in) the reverse for inputs',
      'default(T) gives the default value for any T',
    ],
    code: `Console.WriteLine(CollectionHelpers.MaxItem(new[] { 4, 9, 2 }));          // 9
Console.WriteLine(CollectionHelpers.MaxItem(new[] { "apple", "mango" })); // mango

IEnumerable<object> objs = new List<string> { "a" }; // covariance

public static class CollectionHelpers
{
    public static T MaxItem<T>(IEnumerable<T> items) where T : IComparable<T>
    {
        ArgumentNullException.ThrowIfNull(items);
        using var e = items.GetEnumerator();
        if (!e.MoveNext())
            throw new InvalidOperationException("Sequence is empty");

        T max = e.Current;
        while (e.MoveNext())
        {
            if (e.Current.CompareTo(max) > 0) max = e.Current;
        }
        return max;
    }
}`,
  },
  {
    id: 'cs-12',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Delegate ek phone number jaisa hai jo tum kisi ko dete ho: \'kaam ho jaaye toh is number pe call karna\'. Event ek school ki bell jaisa hai: sirf school (class) bell baja sakta hai, bachche sirf sun sakte hain (+=) ya sunna band kar sakte hain (-=).',
      en: 'A delegate is like a phone number you give someone: \'call this number when the work is done\'. An event is like the school bell: only the school (the class) can ring it, students can only listen (+=) or stop listening (-=).',
      bn: 'Delegate হলো একটা ফোন নম্বরের মতো, যেটা তুমি কাউকে দাও: \'কাজ হয়ে গেলে এই নম্বরে ফোন কোরো\'। Event হলো স্কুলের ঘণ্টার মতো: শুধু স্কুল (class) ঘণ্টা বাজাতে পারে, ছাত্ররা শুধু শুনতে পারে (+=) বা শোনা বন্ধ করতে পারে (-=)।',
    },
    question: 'What are delegates, events, Func, Action and Predicate in C#?',
    answer: 'A delegate is a type-safe reference to a method (a function pointer with a signature); it can point to multiple methods (multicast) and is the basis for callbacks and lambdas. The built-in generic delegates cover most needs: Func<..., TResult> returns a value, Action<...> returns void, and Predicate<T> takes a T and returns bool. An event is a delegate wrapped with publisher/subscriber rules: outside code can only subscribe (+=) or unsubscribe (-=), and only the declaring class can raise it, which protects the invocation list.',
    points: [
      'Delegate = method signature as a type; supports multicast with += / -=',
      'Func<T1, TResult>: returns a value; last type argument is the return type',
      'Action<T>: returns void; Predicate<T>: returns bool (used by List<T>.Find, RemoveAll)',
      'Lambdas (x => x * 2) are converted to delegates (or expression trees)',
      'event: only += / -= from outside; raise with Handler?.Invoke(this, args)',
      'Unsubscribe from long-lived publishers to avoid memory leaks',
    ],
    code: `Func<int, int, int> add = (a, b) => a + b;
Action<string> print = msg => Console.WriteLine(msg);
Predicate<int> isEven = n => n % 2 == 0;

print(add(2, 3).ToString());        // 5
Console.WriteLine(isEven(4));      // True

var svc = new OrderService();
svc.OrderPlaced += (sender, id) => Console.WriteLine($"SMS sent for {id}");
svc.Place("ORD-42");   // SMS sent for ORD-42
// svc.OrderPlaced(null, "x");  // error: only OrderService can raise it

public class OrderService
{
    public event EventHandler<string>? OrderPlaced;

    public void Place(string orderId)
    {
        // ... save order
        OrderPlaced?.Invoke(this, orderId);
    }
}`,
  },
  {
    id: 'cs-13',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Deferred execution ek restaurant ke order slip jaisa hai: waiter ne order likh liya, par khana tab banta hai jab tum sach mein khane baithte ho. Agar tab tak menu mein naya item aa gaya toh woh bhi mil jaayega. ToList() matlab abhi turant khana pack karwa lena.',
      en: 'Deferred execution is like an order slip at a restaurant: the waiter writes the order, but the food is cooked only when you actually sit down to eat. If a new item was added to the menu meanwhile, you get it too. ToList() means packing the food right now.',
      bn: 'Deferred execution হলো রেস্টুরেন্টের অর্ডার স্লিপের মতো: ওয়েটার অর্ডার লিখে নেয়, কিন্তু রান্না হয় তখনই যখন তুমি সত্যি খেতে বসো। ততক্ষণে মেনুতে নতুন কিছু এলে সেটাও পাবে। ToList() মানে এখনই খাবার প্যাক করিয়ে নেওয়া।',
    },
    question: 'What is LINQ? Explain query syntax vs method syntax and deferred execution, with the output of the given code.',
    answer: 'LINQ (Language Integrated Query) lets you query collections, databases, XML etc. with a common set of operators like Where, Select, OrderBy and GroupBy. Query syntax (from ... where ... select) is compiled into method syntax calls (Where/Select with lambdas), so both are equivalent; method syntax is more common and has more operators. Most LINQ operators use deferred execution: the query is just a description and runs only when it is enumerated (foreach, ToList, Count, First). In the code, the first query is enumerated after 4 is added, so it prints 2,3,4; the ToList() result was materialised earlier, so adding 5 does not change it and it prints 3.',
    points: [
      'Query syntax and method syntax compile to the same calls',
      'Deferred: Where, Select, OrderBy, Skip, Take... run when enumerated',
      'Immediate: ToList, ToArray, ToDictionary, Count, Sum, First, Any',
      'Re-enumerating a deferred query runs it again (watch out for repeated DB calls or expensive work)',
      'Use ToList() to snapshot results when needed',
    ],
    code: `var nums = new List<int> { 1, 2, 3 };

// query syntax
var q1 = from n in nums where n > 1 select n;
// method syntax (same thing)
var q2 = nums.Where(n => n > 1);

nums.Add(4);
Console.WriteLine(string.Join(",", q2));   // 2,3,4

var snapshot = nums.Where(n => n > 1).ToList(); // runs now
nums.Add(5);
Console.WriteLine(snapshot.Count);           // 3
Console.WriteLine(q1.Count());               // 4`,
  },
  {
    id: 'cs-14',
    level: 'senior',
    topic: 'cs-basics',
    difficulty: 'hard',
    simple: {
      hi: 'IEnumerable aisa hai jaise poori sabzi mandi ghar le aao aur phir ghar pe acche tamatar chuno. IQueryable aisa hai jaise sabziwale ko list do \'sirf 1 kilo acche tamatar\', woh wahin chun ke deta hai. Galti se poori mandi ghar laana (AsEnumerable) bahut bhaari padta hai.',
      en: 'IEnumerable is like bringing the whole vegetable market home and then picking the good tomatoes there. IQueryable is like giving the vendor a list, \'only 1 kg of good tomatoes\', and he picks them at the shop. Accidentally bringing the whole market home (AsEnumerable) is very costly.',
      bn: 'IEnumerable হলো পুরো সবজি বাজার বাড়িতে এনে তারপর ভালো টমেটো বাছার মতো। IQueryable হলো সবজিওয়ালাকে লিস্ট দেওয়ার মতো, \'শুধু ১ কেজি ভালো টমেটো\', সে দোকানেই বেছে দেয়। ভুল করে পুরো বাজার বাড়ি আনা (AsEnumerable) খুব ভারী পড়ে।',
    },
    question: 'What is the difference between IEnumerable<T> and IQueryable<T>? What can go wrong if you mix them up?',
    answer: 'IEnumerable<T> represents an in-memory sequence; LINQ operators on it take Func delegates and run as compiled C# code in your process (LINQ to Objects). IQueryable<T> extends IEnumerable<T> and its operators take Expression<Func<...>> trees, which a query provider (for example an ORM\'s database provider) translates into another language such as SQL and executes remotely. The classic bug is converting to IEnumerable too early (AsEnumerable(), ToList(), or a method parameter typed IEnumerable<T>): any later Where/Take then runs in memory after all rows have been loaded from the database. Also, only expressions the provider understands can be translated, so calling arbitrary C# methods inside an IQueryable predicate may fail at run time.',
    points: [
      'IEnumerable: Func<T,bool>, executes in memory, pull-based iteration',
      'IQueryable: Expression<Func<T,bool>>, provider translates (e.g. to SQL), executes at the source',
      'Filter/paginate while still IQueryable so the database does the work',
      'AsEnumerable()/ToList() switch to in-memory evaluation from that point',
      'Returning IQueryable from a repository leaks query concerns; many teams return materialised lists instead',
      'Both are deferred until enumerated',
    ],
    code: `// Expression vs delegate
Func<Order, bool> f = o => o.Total > 1000;              // compiled code
Expression<Func<Order, bool>> e = o => o.Total > 1000;  // data (tree)

// GOOD: filter and page are translated to SQL
var page = db.Orders
    .Where(o => o.Total > 1000)
    .OrderBy(o => o.Id)
    .Take(20)
    .ToList();

// BAD: AsEnumerable pulls ALL orders, then filters in memory
var slow = db.Orders
    .AsEnumerable()
    .Where(o => o.Total > 1000)
    .Take(20)
    .ToList();`,
  },
  {
    id: 'cs-15',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Extension method ek cycle pe lagaya hua basket jaisa hai. Cycle company ne basket nahi diya tha, cycle ko todna bhi nahi pada, bas bahar se basket laga diya aur ab aisa lagta hai jaise cycle ka hi hissa ho.',
      en: 'An extension method is like a basket fitted on a bicycle. The bicycle company did not give a basket and you did not have to break the bicycle; you just attached one from outside, and now it feels like part of the bicycle.',
      bn: 'Extension method হলো সাইকেলে লাগানো ঝুড়ির মতো। সাইকেল কোম্পানি ঝুড়ি দেয়নি, সাইকেল ভাঙতেও হয়নি, শুধু বাইরে থেকে ঝুড়িটা লাগিয়ে দিলে, আর এখন মনে হয় যেন সেটা সাইকেলেরই অংশ।',
    },
    question: 'What are extension methods? Write one for string.',
    answer: 'Extension methods let you add methods to an existing type without modifying it or inheriting from it. You declare a static method in a non-nested static class, and mark the first parameter with `this`; the compiler then lets you call it like an instance method when the namespace is in scope. They are just syntactic sugar for a static call, so they cannot access private members, and a real instance method with the same signature always wins. LINQ operators (Where, Select) are the best-known extension methods on IEnumerable<T>.',
    points: [
      'Static method in a static (non-generic, non-nested) class, first parameter prefixed with `this`',
      'Called like an instance method; compiled as a static call',
      'Cannot access private/protected members of the extended type',
      'Instance methods take precedence over extension methods',
      'Can be called on null references, so handle null inside',
      'Newer C# versions also add extension blocks for extension properties and static members',
    ],
    code: `string? city = null;
Console.WriteLine(city.IsNullOrBlank());                 // True
Console.WriteLine("Bengaluru".Truncate(4));               // Beng...
Console.WriteLine(StringExtensions.Truncate("Pune", 10)); // Pune (same call)

public static class StringExtensions
{
    public static bool IsNullOrBlank(this string? value)
        => string.IsNullOrWhiteSpace(value);

    public static string Truncate(this string value, int max)
        => value.Length <= max ? value : value[..max] + "...";
}`,
  },
  {
    id: 'cs-16',
    level: 'mid',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Nullable ek attendance register jaisa hai jahan \'absent\' (null) bhi likh sakte ho, sirf marks nahi. Nullable reference types ek strict class monitor jaisa hai jo pehle hi bol deta hai \'dhyaan se, yeh bachcha shayad aaj nahi aaya\', taaki tum bina check kiye uska homework na maango.',
      en: 'Nullable is like an attendance register where you can also write \'absent\' (null), not just marks. Nullable reference types are like a strict class monitor who warns you early, \'careful, this student may be absent today\', so you do not ask for homework without checking.',
      bn: 'Nullable হলো হাজিরা খাতার মতো, যেখানে শুধু নম্বর নয়, \'অনুপস্থিত\' (null) লেখা যায়। Nullable reference types হলো একজন কড়া ক্লাস মনিটরের মতো, যে আগেই সাবধান করে দেয় \'দেখো, এই ছাত্র আজ হয়তো আসেনি\', যাতে না দেখে তার হোমওয়ার্ক না চাও।',
    },
    question: 'Explain nullable value types and nullable reference types in C#.',
    answer: 'Nullable value types (int?, which is Nullable<int>) let a value type also hold null; you check HasValue / compare with null and read Value or use GetValueOrDefault() or ??. Nullable reference types (NRT) are a compile-time feature: when enabled (<Nullable>enable</Nullable>, the default in new project templates), string means "should never be null" and string? means "may be null", and the compiler warns when you might dereference null or assign null to a non-nullable reference. NRT does not change the runtime type or add checks, so you still validate public inputs. Operators that help are ?. (null-conditional), ?? and ??= (null-coalescing) and ! (null-forgiving, which only silences the warning).',
    points: [
      'int? = Nullable<int>: HasValue, Value, GetValueOrDefault()',
      'Accessing .Value when null throws InvalidOperationException',
      'NRT: compile-time warnings only; string vs string? have the same runtime type',
      'Enable with <Nullable>enable</Nullable> or #nullable enable',
      '?. , ?? , ??= reduce null checks; ! suppresses a warning (use sparingly)',
      'Attributes like [NotNullWhen(true)] help flow analysis for Try-methods',
    ],
    code: `#nullable enable
int? marks = null;
Console.WriteLine(marks.HasValue);            // False
Console.WriteLine(marks ?? 0);                // 0
marks ??= 75;
Console.WriteLine(marks.Value);               // 75

string name = "Ravi";       // non-nullable
string? nickname = null;   // may be null

int len1 = nickname?.Length ?? 0;  // safe: 0
// int len2 = nickname.Length;    // warning CS8602: possible null dereference
// name = null;                   // warning CS8625

static string Greet(string? n) => n is null ? "Hello guest" : $"Hello {n}";
Console.WriteLine(Greet(nickname));            // Hello guest`,
  },
  {
    id: 'cs-17',
    level: 'mid',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Exception handling ek cricket fielder jaisa hai: try mein batsman shot maarta hai, catch mein sahi fielder (sahi exception type) gend pakadta hai. Filter matlab \'sirf tab pakdo jab gend boundary ke andar ho\'. Finally wo ground staff hai jo match ke baad pitch dhakta hi hai, chahe jo bhi ho.',
      en: 'Exception handling is like cricket fielding: in try the batsman hits the ball, and in catch the right fielder (the right exception type) takes the catch. A filter means \'catch it only if the ball is inside the boundary\'. finally is the ground staff who always cover the pitch after the match, whatever happens.',
      bn: 'Exception handling হলো ক্রিকেটের ফিল্ডিংয়ের মতো: try-এ ব্যাটসম্যান শট মারে, catch-এ ঠিক ফিল্ডার (ঠিক exception type) ক্যাচ ধরে। Filter মানে \'শুধু তখনই ধরো যখন বল বাউন্ডারির ভেতরে\'। Finally হলো মাঠকর্মী, যারা ম্যাচের পরে যা-ই হোক পিচ ঢেকে দেয়।',
    },
    question: 'How does exception handling work in C#? Explain finally, exception filters and throw vs throw ex.',
    answer: 'Code that may fail goes in a try block; catch blocks are checked top to bottom, so the most specific exception types must come first. The finally block always runs whether or not an exception occurred (except in cases like process termination or Environment.FailFast) and is used for cleanup. Exception filters (catch (X ex) when (condition)) let you catch only when a condition is true, without unwinding the stack if it is false, which keeps debugging information intact. To rethrow, use `throw;`, which preserves the original stack trace; `throw ex;` resets the stack trace to the current line and hides where the error really happened.',
    points: [
      'Order catch blocks from specific to general (Exception last)',
      'finally: cleanup that must always run; using is shorthand for try/finally Dispose',
      'Filters: catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)',
      'throw; keeps stack trace, throw ex; resets it; wrap with new Exception("msg", ex) to add context',
      'Do not use exceptions for normal control flow; prefer TryParse-style APIs',
      'Custom exceptions derive from Exception and end with \'Exception\'',
    ],
    code: `static async Task<string?> GetProfileAsync(HttpClient http, string url)
{
    try
    {
        return await http.GetStringAsync(url);
    }
    catch (HttpRequestException ex) when (ex.StatusCode == HttpStatusCode.NotFound)
    {
        return null;                      // only 404 is handled here
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Failed: {ex.Message}");
        throw;                            // keeps original stack trace
    }
    finally
    {
        Console.WriteLine("Request finished"); // always runs
    }
}`,
  },
  {
    id: 'cs-18',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'IDisposable aur using library ki kitaab jaisa hai: kitaab lo, padho, aur \'using\' ka matlab hai jaate waqt kitaab wapas counter pe zaroor jama karna, chahe beech mein kuch bhi ho jaaye. Warna dusre bachche ko kitaab (resource) nahi milegi.',
      en: 'IDisposable and using are like a library book: you borrow it, read it, and \'using\' means you always return it to the counter when you leave, no matter what happened in between. Otherwise the next child will not get the book (resource).',
      bn: 'IDisposable আর using হলো লাইব্রেরির বইয়ের মতো: বই নাও, পড়ো, আর \'using\' মানে যাওয়ার সময় বইটা কাউন্টারে ফেরত দেবেই, মাঝে যা-ই ঘটুক। নইলে পরের ছাত্র বই (resource) পাবে না।',
    },
    question: 'What is IDisposable and how does the using statement work?',
    answer: 'IDisposable has a single Dispose() method used to release resources the garbage collector does not manage promptly, such as file handles, database connections, sockets or streams. The using statement guarantees Dispose is called when the block ends, even if an exception is thrown, because the compiler turns it into a try/finally. Modern C# also has using declarations (`using var x = ...;`) that dispose at the end of the enclosing scope, and `await using` for types that implement IAsyncDisposable.',
    points: [
      'Dispose = deterministic cleanup of unmanaged/expensive resources',
      'using { } compiles to try/finally { obj?.Dispose(); }',
      'using declaration: using var file = ...; disposed at end of scope',
      'await using for IAsyncDisposable (DisposeAsync)',
      'Dispose should be safe to call multiple times',
      'Finalizers are only a fallback for unmanaged handles; prefer SafeHandle',
    ],
    code: `// classic using statement
using (var writer = new StreamWriter("log.txt"))
{
    writer.WriteLine("Order placed");
} // writer.Dispose() called here, even on exception

// using declaration (disposed at end of method)
static int CountLines(string path)
{
    using var reader = new StreamReader(path);
    int count = 0;
    while (reader.ReadLine() is not null) count++;
    return count;
}

public sealed class ResourceHolder : IDisposable
{
    private bool _disposed;
    public void Dispose()
    {
        if (_disposed) return;
        Console.WriteLine("Released");
        _disposed = true;
    }
}`,
  },
  {
    id: 'cs-19',
    level: 'mid',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'async/await chai ki tapri pe order dene jaisa hai: tumne order diya, token liya, aur wahan khade rehne ke bajaye dost se baat karne lage; chai ready hote hi tumhe bulaya. async void matlab bina token ke order dena: chai gir jaaye ya ban jaaye, tumhe pata hi nahi chalega.',
      en: 'async/await is like ordering at a tea stall: you place the order, take a token, and instead of standing and waiting you chat with friends; when the tea is ready you are called. async void is ordering without a token: whether the tea spills or gets made, you never find out.',
      bn: 'async/await হলো চায়ের দোকানে অর্ডার দেওয়ার মতো: অর্ডার দিলে, টোকেন নিলে, আর দাঁড়িয়ে না থেকে বন্ধুর সঙ্গে গল্প করলে; চা তৈরি হলেই তোমাকে ডাকা হলো। async void মানে টোকেন ছাড়া অর্ডার দেওয়া: চা পড়ে যাক বা তৈরি হোক, তুমি জানতেই পারবে না।',
    },
    question: 'How do async and await work in C#? Why is async void dangerous?',
    answer: 'An async method can use await on a Task; when the awaited operation is not yet complete, the method returns to its caller without blocking the thread, and the rest of the method continues later when the task finishes. Async methods return Task, Task<T> or ValueTask<T>, and exceptions are stored in the returned task and rethrown when awaited. async void methods return nothing to await, so the caller cannot know when they finish and their exceptions cannot be caught by the caller; they are raised on the synchronization context and can crash the process, so async void should be used only for event handlers. Other basics: do not block with .Result or .Wait() (can deadlock where there is a synchronization context and wastes threads), go async all the way, and run independent tasks in parallel with Task.WhenAll.',
    points: [
      'await frees the thread while waiting for I/O; it does not create a new thread by itself',
      'Return Task / Task<T>; ValueTask for hot paths that often complete synchronously',
      'async void: cannot be awaited, exceptions escape the caller -> only for event handlers',
      'Avoid .Result / .Wait(); use async all the way',
      'Task.WhenAll for concurrent independent calls; pass CancellationToken',
      'ConfigureAwait(false) in library code avoids capturing the context',
    ],
    code: `static async Task<int> GetPriceAsync(string item)
{
    await Task.Delay(100);             // simulates I/O
    if (item == "") throw new ArgumentException("empty");
    return 50;
}

// Good: exception can be caught
try { await GetPriceAsync(""); }
catch (ArgumentException) { Console.WriteLine("Caught"); }

// Two calls in parallel
int[] prices = await Task.WhenAll(GetPriceAsync("tea"), GetPriceAsync("samosa"));
Console.WriteLine(prices.Sum());       // 100

// BAD: caller cannot await or catch
static async void FireAndForget()
{
    await Task.Delay(10);
    throw new InvalidOperationException("crashes the app");
}`,
  },
  {
    id: 'cs-20',
    level: 'mid',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'Pattern matching railway station ke TC jaisa hai jo har passenger ko dekh ke turant decide karta hai: \'bachcha hai toh half ticket, senior citizen hai toh concession, AC coach ka ticket hai toh is taraf\'. Switch expression woh poori list ek jagah likh deta hai aur pehla match hone pe ruk jaata hai.',
      en: 'Pattern matching is like a TC at a railway station who looks at each passenger and decides at once: \'child, so half ticket; senior citizen, so concession; AC ticket, go this way\'. A switch expression writes that whole list in one place and stops at the first match.',
      bn: 'Pattern matching হলো রেলস্টেশনের TC-র মতো, যে প্রত্যেক যাত্রীকে দেখে সঙ্গে সঙ্গে ঠিক করে: \'বাচ্চা, তাই হাফ টিকিট; সিনিয়র সিটিজেন, তাই ছাড়; AC টিকিট, এদিকে যাও\'। Switch expression পুরো তালিকাটা এক জায়গায় লেখে আর প্রথম মিল পেলেই থেমে যায়।',
    },
    question: 'What is pattern matching in C#? Show switch expressions with type, property and relational patterns.',
    answer: 'Pattern matching lets you test a value against a shape and extract data in one step, using `is` and switch. Patterns include type patterns (o is string s), constant patterns, relational patterns (< 0, >= 18), logical patterns (and, or, not), property patterns ({ Length: 0 }), positional patterns for deconstructable types, and list patterns ([1, .., 9]). A switch expression (value switch { pattern => result, ... }) returns a value, is more concise than a switch statement, and the compiler warns if the cases are not exhaustive; `_` is the discard/default case.',
    points: [
      'is with declaration: if (obj is Customer c) ...',
      'is not null is the idiomatic null check',
      'Switch expression: arms evaluated top to bottom, first match wins, _ as fallback',
      'Property pattern: order is { Status: "Paid", Total: > 1000 }',
      'Relational + logical: >= 13 and <= 19',
      'when adds extra conditions to an arm',
    ],
    code: `Console.WriteLine(Describe(new Order("Paid", 2500m))); // big paid order
Console.WriteLine(AgeGroup(16));                        // teen

static string Describe(object? input) => input switch
{
    null                      => "nothing",
    int n when n < 0          => "negative number",
    int n                     => $"number {n}",
    string { Length: 0 }      => "empty text",
    string s                  => $"text '{s}'",
    Order { Status: "Paid", Total: > 1000m } => "big paid order",
    Order o                   => $"order {o.Status}",
    int[] and [1, .., 9]      => "array from 1 to 9",
    _                         => "unknown"
};

static string AgeGroup(int age) => age switch
{
    < 13 => "child",
    >= 13 and <= 19 => "teen",
    _ => "adult"
};

public record Order(string Status, decimal Total);`,
  },
  {
    id: 'cs-21',
    level: 'fresher',
    topic: 'cs-basics',
    difficulty: 'easy',
    simple: {
      hi: 'Property ek bank ke cashier counter jaisa hai: tum seedha tijori (field) mein haath nahi daalte, counter (get/set) se paise lete-dete ho, aur cashier check karta hai. init aisa hai jaise admission ke time roll number milta hai aur phir kabhi nahi badalta; required matlab bina roll number ke admission hi nahi hoga.',
      en: 'A property is like a bank cashier counter: you never put your hand directly into the safe (the field); you take and give money through the counter (get/set), and the cashier checks it. init is like a roll number given at admission that never changes later; required means no admission without a roll number.',
      bn: 'Property হলো ব্যাংকের ক্যাশিয়ার কাউন্টারের মতো: তুমি সরাসরি সিন্দুকে (field) হাত দাও না, কাউন্টার (get/set) দিয়ে টাকা নাও-দাও, আর ক্যাশিয়ার যাচাই করে। init মানে ভর্তির সময় রোল নম্বর পাওয়া, যেটা পরে আর বদলায় না; required মানে রোল নম্বর ছাড়া ভর্তিই হবে না।',
    },
    question: 'What are properties in C#? Explain auto-properties, init-only setters and required members.',
    answer: 'A property exposes data through get and set accessors instead of a public field, so you can add validation, computed values or change the implementation later without breaking callers. An auto-property ({ get; set; }) lets the compiler create the hidden backing field. An init accessor ({ get; init; }) allows the value to be set only during object creation (constructor or object initializer), which is a simple way to build immutable objects; the `required` modifier forces callers to set that member in the object initializer, otherwise the code does not compile.',
    points: [
      'Prefer properties over public fields (encapsulation, binding, serialization)',
      'Auto-property: public string Name { get; set; }',
      'Read-only: { get; } set only in constructor; computed: public int Age => ...',
      'init: settable only at creation time -> immutable objects',
      'required: compiler error if the caller does not set it',
      'Accessors can have different access: { get; private set; }',
    ],
    code: `var s = new Student { RollNo = "A12", Name = "Priya" };
s.AddMarks(40);
Console.WriteLine(s.Passed);   // True
// s.RollNo = "B1";           // error: init-only
// var x = new Student();     // error: RollNo is required

public class Student
{
    public required string RollNo { get; init; }   // must set, then fixed
    public string Name { get; set; } = "";
    public int Marks { get; private set; }
    public bool Passed => Marks >= 35;              // computed

    private int _age;
    public int Age
    {
        get => _age;
        set => _age = value >= 0 ? value : throw new ArgumentOutOfRangeException(nameof(value));
    }

    public void AddMarks(int m) => Marks += m;
}`,
  },
  {
    id: 'cs-22',
    level: 'junior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'ref aisa hai jaise dost ko apni bharin hui notebook dena \'isme sudhaar kar do\'. out aisa hai jaise khaali notebook dena \'isme answer likh ke hi lautana\'. in aisa hai jaise kaanch ke peeche rakhi trophy dikhana: dekh sakte ho, chhoo nahi sakte.',
      en: 'ref is like giving a friend your filled notebook and saying \'correct it\'. out is like giving an empty notebook and saying \'return it only after writing the answer\'. in is like showing a trophy behind glass: you can look at it but not touch it.',
      bn: 'ref হলো বন্ধুকে তোমার লেখা খাতা দিয়ে বলা \'এটা ঠিক করে দাও\'। out হলো খালি খাতা দিয়ে বলা \'উত্তর লিখেই ফেরত দেবে\'। in হলো কাচের পেছনে রাখা ট্রফি দেখানোর মতো: দেখতে পারো, ছুঁতে পারো না।',
    },
    question: 'What is the difference between ref, out and in parameters?',
    answer: 'All three pass an argument by reference, so the method works with the caller\'s variable instead of a copy. ref requires the variable to be initialised before the call and the method may read and modify it. out does not require initialisation, but the method must assign it before returning; it is used to return extra values, as in int.TryParse. in passes a read-only reference: the method cannot modify it, which is useful to avoid copying large structs. The keyword must also be written at the call site for ref and out (and is optional for in).',
    points: [
      'ref: must be initialised by caller; method can read and write',
      'out: caller need not initialise; method must assign before return',
      'in: read-only reference; good for large readonly structs',
      'Keyword at the call site: ref x, out var y (in is optional)',
      'Not allowed in async methods and iterators',
      'Tuples or records are often cleaner than many out parameters',
    ],
    code: `static void DoubleIt(ref int n) => n *= 2;

static bool TryDivide(int a, int b, out int result)
{
    if (b == 0) { result = 0; return false; }
    result = a / b;
    return true;
}

static double Length(in Vector3 v) => Math.Sqrt(v.X * v.X + v.Y * v.Y + v.Z * v.Z);

int x = 5;
DoubleIt(ref x);
Console.WriteLine(x);                        // 10

if (TryDivide(10, 3, out int q)) Console.WriteLine(q); // 3
if (int.TryParse("42", out var num)) Console.WriteLine(num + 1); // 43

Console.WriteLine(Length(new Vector3(3, 4, 0)));  // 5

readonly record struct Vector3(double X, double Y, double Z);`,
  },
  {
    id: 'cs-23',
    level: 'mid',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'List ek line mein khade bachchon jaisi hai: number se dhundo toh jaldi, naam se dhundo toh sabko dekhna padega. Dictionary ek register jaisa hai jisme roll number se seedha naam mil jaata hai. HashSet ek guest list hai jisme ek naam do baar nahi likh sakte.',
      en: 'A List is like children standing in a line: finding by position is quick, but finding by name means checking everyone. A Dictionary is like a register where a roll number takes you straight to the name. A HashSet is a guest list where the same name cannot be written twice.',
      bn: 'List হলো লাইনে দাঁড়ানো ছাত্রদের মতো: নম্বর দিয়ে খুঁজলে তাড়াতাড়ি, কিন্তু নাম দিয়ে খুঁজলে সবাইকে দেখতে হয়। Dictionary হলো রেজিস্টারের মতো, যেখানে রোল নম্বর দিলেই সোজা নাম পাওয়া যায়। HashSet হলো অতিথির তালিকা, যেখানে একই নাম দুবার লেখা যায় না।',
    },
    question: 'When would you use List<T>, Dictionary<TKey,TValue> and HashSet<T>? Write code to find duplicate values in a list.',
    answer: 'List<T> is an ordered, index-based dynamic array: indexing is O(1), Add is amortised O(1), but Contains/Remove search is O(n). Dictionary<TKey,TValue> stores key-value pairs in a hash table with average O(1) lookup by key; keys must be unique and should have a good GetHashCode/Equals and must not change while in the dictionary. HashSet<T> stores unique values with O(1) average Add/Contains and supports set operations (UnionWith, IntersectWith). So use List for ordered data and iteration, Dictionary for lookup by key, and HashSet for fast membership checks and de-duplication.',
    points: [
      'List<T>: ordered, duplicates allowed, O(1) index, O(n) Contains',
      'Dictionary: O(1) average lookup; use TryGetValue instead of ContainsKey + indexer',
      'Indexer on a missing key throws KeyNotFoundException',
      'HashSet<T>: unique items; Add returns false for duplicates',
      'Custom keys need correct Equals and GetHashCode (records do this for you)',
      'Others: Queue, Stack, SortedDictionary, ConcurrentDictionary for multi-threaded access',
    ],
    code: `static List<int> FindDuplicates(List<int> items)
{
    var seen = new HashSet<int>();
    var dups = new HashSet<int>();
    foreach (var x in items)
    {
        if (!seen.Add(x)) dups.Add(x);   // Add returns false if already present
    }
    return dups.ToList();
}

var nums = new List<int> { 3, 1, 3, 7, 1, 9 };
Console.WriteLine(string.Join(",", FindDuplicates(nums))); // 3,1

var stock = new Dictionary<string, int> { ["pen"] = 10, ["pencil"] = 4 };
stock["eraser"] = 6;                       // add or update
if (stock.TryGetValue("pen", out var qty)) Console.WriteLine(qty); // 10

// LINQ alternative
var d2 = nums.GroupBy(n => n).Where(g => g.Count() > 1).Select(g => g.Key);`,
  },
  {
    id: 'cs-24',
    level: 'senior',
    topic: 'cs-basics',
    difficulty: 'hard',
    simple: {
      hi: 'Overloading ek dukaandaar jaisa hai jo \'chai\' bolne pe chai aur \'chai, 2 cup\' bolne pe do cup deta hai: naam same, input alag. Overriding mein beta (Dog) papa ka kaam apne tareeke se karta hai aur sabko wahi milta hai. new matlab beta chupke se apna version rakhta hai, par jo papa ke naam se bulata hai use papa wala hi milta hai.',
      en: 'Overloading is like a shopkeeper who gives one tea when you say \'tea\' and two cups when you say \'tea, 2 cups\': same name, different inputs. In overriding, the son (Dog) does the father\'s job in his own way and everyone gets the son\'s version. new means the son quietly keeps his own version, but whoever calls by the father\'s name still gets the father\'s version.',
      bn: 'Overloading হলো এমন দোকানদারের মতো, যে \'চা\' বললে এক কাপ আর \'চা, ২ কাপ\' বললে দুই কাপ দেয়: নাম একই, input আলাদা। Overriding-এ ছেলে (Dog) বাবার কাজ নিজের মতো করে, আর সবাই ছেলেরটাই পায়। new মানে ছেলে চুপচাপ নিজের version রাখে, কিন্তু যে বাবার নামে ডাকে সে বাবারটাই পায়।',
    },
    question: 'Explain method overloading vs overriding, and the difference between override and new (method hiding). What is the output of the code?',
    answer: 'Overloading means several methods with the same name but different parameter lists in the same type; the compiler picks one at compile time based on the argument types (static binding). Overriding means a derived class replaces a virtual or abstract base method using override; the call is resolved at run time based on the actual object type (dynamic dispatch, polymorphism). The new modifier hides a base member instead of overriding it, so which method runs depends on the compile-time type of the reference. In the code, `a` has compile-time type Animal but refers to a Dog, so a.Speak() prints Woof (overridden, runtime dispatch), a.Name() prints Animal (hidden, chosen by the Animal reference), and ((Dog)a).Name() prints Dog.',
    points: [
      'Overloading: same name, different parameters, resolved at compile time; return type alone is not enough',
      'Overriding: virtual/abstract in base + override in derived, resolved at run time',
      'new hides the member; the reference\'s static type decides which runs',
      'Without new or override the compiler warns (CS0114/CS0108) and hides by default',
      'base.Method() calls the base implementation; sealed override stops further overriding',
      'Hiding usually signals a design smell; prefer virtual/override',
    ],
    code: `Animal a = new Dog();
Console.WriteLine(a.Speak());       // Woof
Console.WriteLine(a.Name());        // Animal
Console.WriteLine(((Dog)a).Name()); // Dog
Console.WriteLine(a.Feed(2));       // 2 kg
Console.WriteLine(a.Feed("rice"));  // rice

class Animal
{
    public virtual string Speak() => "Animal sound";
    public string Name() => "Animal";
    public string Feed(int kg) => $"{kg} kg";       // overloads
    public string Feed(string food) => food;
}

class Dog : Animal
{
    public override string Speak() => "Woof";
    public new string Name() => "Dog";
}`,
  },
  {
    id: 'cs-25',
    level: 'senior',
    topic: 'cs-basics',
    difficulty: 'medium',
    simple: {
      hi: 'sealed ek seal kiye hue exam paper ke packet jaisa hai: koi usme naya page nahi jod sakta, isliye sabko pata hai ki andar exactly kya hai. Isse teacher (JIT) bhi jaldi kaam kar leta hai kyunki usse har baar check nahi karna padta ki kisi ne kuch badla toh nahi.',
      en: 'sealed is like a sealed exam paper packet: nobody can add new pages to it, so everyone knows exactly what is inside. That also helps the teacher (JIT) work faster, because there is no need to check every time whether someone changed something.',
      bn: 'sealed হলো সিল করা প্রশ্নপত্রের প্যাকেটের মতো: কেউ তাতে নতুন পাতা জুড়তে পারে না, তাই সবাই জানে ভেতরে ঠিক কী আছে। এতে টিচারও (JIT) তাড়াতাড়ি কাজ করতে পারেন, কারণ প্রতিবার দেখতে হয় না কেউ কিছু বদলেছে কি না।',
    },
    question: 'What does the sealed keyword do, and when should you seal classes or methods?',
    answer: 'sealed on a class prevents any other class from inheriting it; sealed on an override method (sealed override) stops derived classes from overriding that method further. You seal a class when it is not designed for extension, which protects invariants and security-sensitive logic and lets you change internals later without breaking subclasses. Sealing can also help performance: the JIT can devirtualize virtual/interface calls and type checks (is/as/casts) become cheaper because no subclass can exist. Many framework types like string are sealed, and a common modern guideline is to seal classes by default (especially internal ones) unless inheritance is an intended extension point.',
    points: [
      'sealed class: cannot be a base class; structs and static classes are implicitly sealed',
      'sealed override: blocks further overriding in deeper subclasses',
      'Design: \'design for inheritance or prohibit it\'; protects invariants',
      'Performance: enables devirtualization and cheaper type checks',
      'Analyzer CA1852 suggests sealing internal types that have no subclasses',
      'Unsealing later is non-breaking, sealing a public class later is breaking',
    ],
    code: `public class Payment
{
    public virtual decimal Fee(decimal amount) => amount * 0.02m;
}

public class UpiPayment : Payment
{
    // nobody below UpiPayment can change this rule
    public sealed override decimal Fee(decimal amount) => 0m;
}

public sealed class GstCalculator      // not designed for inheritance
{
    public decimal Apply(decimal price) => price * 1.18m;
}

// class SpecialUpi : UpiPayment { public override decimal Fee(decimal a) => 1m; }
// error CS0239: cannot override sealed member

// class MyGst : GstCalculator { }
// error CS0509: cannot derive from sealed type`,
  },
  {
    id: 'dn-1',
    level: 'fresher',
    topic: 'dotnet-advanced',
    difficulty: 'medium',
    simple: {
      hi: 'GC ek safai wale bhaiya jaisa hai jo dekhta hai kaunsa saaman ab koi use nahi kar raha aur use hata deta hai. Naye kachre ko roz saaf karta hai (Gen 0), purane bhaari furniture (LOH) ko kabhi-kabhi hi chhoota hai.',
      en: 'The GC is like a cleaner who checks which things nobody is using anymore and removes them. Fresh rubbish is cleared daily (Gen 0), while old heavy furniture (LOH) is touched only once in a while.',
      bn: 'GC হলো একজন সাফাইকর্মীর মতো, যে দেখে কোন জিনিস আর কেউ ব্যবহার করছে না আর সেটা সরিয়ে দেয়। নতুন ময়লা রোজ পরিষ্কার হয় (Gen 0), পুরনো ভারী আসবাব (LOH) সে মাঝে মাঝে ধরে।',
    },
    question: 'How does garbage collection work in .NET? Explain generations and the Large Object Heap.',
    answer: 'The .NET garbage collector automatically frees memory of managed objects that are no longer reachable from roots (static fields, local variables on stacks, CPU registers, GC handles). It is generational: new objects go to Gen 0, survivors are promoted to Gen 1 and then Gen 2, because most objects die young and collecting Gen 0 is cheap. Objects of 85,000 bytes or more (typically large arrays) are allocated on the Large Object Heap, which is collected only with Gen 2 and is not compacted by default, so frequent large allocations can cause fragmentation and expensive full GCs.',
    points: [
      'Mark (find reachable objects) -> sweep/compact -> update references',
      'Gen 0 / Gen 1 are ephemeral and cheap; Gen 2 collections are expensive',
      'LOH threshold: 85,000 bytes; logically part of Gen 2',
      'Workstation vs Server GC; background GC for Gen 2',
      'Reduce pressure: reuse buffers with ArrayPool<T>, avoid needless allocations',
      'Don\'t call GC.Collect() in normal code',
    ],
    code: `var small = new byte[1_000];
var large = new byte[100_000];     // >= 85,000 bytes -> LOH

Console.WriteLine(GC.GetGeneration(small)); // 0
Console.WriteLine(GC.GetGeneration(large)); // 2 (LOH is reported as Gen 2)

GC.Collect();                               // demo only, avoid in real code
Console.WriteLine(GC.GetGeneration(small)); // 1 (survived, promoted)

// Reuse big buffers instead of allocating each time
var buffer = System.Buffers.ArrayPool<byte>.Shared.Rent(100_000);
try { /* use buffer */ }
finally { System.Buffers.ArrayPool<byte>.Shared.Return(buffer); }`,
  },
  {
    id: 'dn-2',
    level: 'junior',
    topic: 'dotnet-advanced',
    difficulty: 'medium',
    simple: {
      hi: 'Dispose library ki kitaab khud time par wapas karne jaisa hai. Finalizer aisa hai jaise tum bhool gaye aur kuch din baad peon ghar se kitaab utha le gaya. Kitaab wapas to aa gayi, par der se aur zyada mehnat se.',
      en: 'Dispose is like returning a library book yourself on time. A finalizer is like forgetting, and the peon collecting the book from your home days later. The book does come back, but late and with extra effort.',
      bn: 'Dispose মানে লাইব্রেরির বই নিজে সময়মতো ফেরত দেওয়া। Finalizer মানে তুমি ভুলে গেছ, কিছুদিন পরে পিওন বাড়ি থেকে বইটা নিয়ে গেল। বই ফিরল ঠিকই, কিন্তু দেরিতে আর বেশি খাটুনিতে।',
    },
    question: 'What is the difference between IDisposable and a finalizer? Explain the dispose pattern.',
    answer: 'IDisposable.Dispose provides deterministic cleanup: the caller releases resources such as file handles, sockets or DB connections at a known point, usually via a using statement. A finalizer (~ClassName) is non-deterministic: the GC calls it on the finalizer thread some time after the object becomes unreachable, and objects with finalizers survive at least one extra collection, so they are costly and should be a last-resort safety net only for unmanaged resources. The dispose pattern combines them with a protected virtual Dispose(bool disposing) method, a disposed flag and GC.SuppressFinalize(this); today you rarely write finalizers yourself because SafeHandle wraps unmanaged handles for you.',
    points: [
      'using / using var / await using call Dispose or DisposeAsync automatically',
      'Finalizer timing is unpredictable and runs on a separate thread',
      'Dispose(bool disposing): true = from Dispose (free managed + unmanaged), false = from finalizer (unmanaged only)',
      'GC.SuppressFinalize(this) avoids the finalization cost after manual dispose',
      'Prefer SafeHandle over writing finalizers; sealed classes can use a simple Dispose',
      'IAsyncDisposable for async cleanup (streams, DbContext)',
    ],
    code: `public class FileLogger : IDisposable
{
    private readonly StreamWriter _writer = new("app.log");
    private bool _disposed;

    public void Write(string msg) => _writer.WriteLine(msg);

    public void Dispose()
    {
        Dispose(disposing: true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;
        if (disposing) _writer.Dispose();   // managed resources
        // release unmanaged resources here (only then add ~FileLogger() => Dispose(false);)
        _disposed = true;
    }
}

using var log = new FileLogger();   // Dispose runs at end of scope`,
  },
  {
    id: 'dn-3',
    level: 'fresher',
    topic: 'dotnet-advanced',
    difficulty: 'medium',
    simple: {
      hi: 'Thread ek apni private car khareedne jaisa hai, mehenga aur sambhalna padta hai. Thread pool ek Ola/auto stand jaisa hai, jo gaadi khaali ho wahi le lo. Task tumhara \'kaam ka order\' hai jo stand ki koi bhi gaadi pura kar deti hai.',
      en: 'A Thread is like buying your own private car: costly and you maintain it. The thread pool is like an auto stand where you take whichever vehicle is free. A Task is your \'job order\' that any vehicle from the stand can complete.',
      bn: 'Thread মানে নিজের প্রাইভেট গাড়ি কেনা, দামি আর দেখাশোনা করতে হয়। Thread pool হলো অটো স্ট্যান্ডের মতো, যে গাড়ি খালি সেটাই নাও। Task হলো তোমার \'কাজের অর্ডার\', যা স্ট্যান্ডের যেকোনো গাড়ি শেষ করে দেয়।',
    },
    question: 'What is the difference between a Task and a Thread? What is the thread pool?',
    answer: 'A Thread is an OS-level thread with its own stack; creating one is relatively expensive, and you manage it yourself. A Task represents an asynchronous operation (a promise of a result) and is usually scheduled on the thread pool; an I/O-bound Task such as an HTTP call or DB query does not hold any thread while it waits. The thread pool is a shared set of worker threads managed by the runtime that grows and shrinks based on load, so Task.Run and async continuations reuse threads instead of creating new ones; blocking pool threads (Thread.Sleep, .Result) can starve it.',
    points: [
      'Thread: heavyweight, dedicated, manual lifetime, no return value',
      'Task: lightweight, composable (await, WhenAll, ContinueWith), returns Task<T>, propagates exceptions',
      'I/O-bound async needs no thread while waiting; CPU-bound work can use Task.Run',
      'Thread pool injects threads gradually, so blocking calls cause starvation',
      'For very long-running dedicated work use TaskCreationOptions.LongRunning or a Thread',
    ],
    code: `// Thread: manual, no result
var t = new Thread(() => Console.WriteLine("work on dedicated thread"));
t.Start();
t.Join();

// Task: CPU-bound work on the thread pool, returns a value
int sum = await Task.Run(() => Enumerable.Range(1, 1_000).Sum());

// Task: I/O-bound, no thread blocked while waiting
using var http = new HttpClient();
Task<string> a = http.GetStringAsync("https://example.com");
Task<string> b = http.GetStringAsync("https://example.org");
string[] pages = await Task.WhenAll(a, b);

Console.WriteLine($"{sum} {pages.Length}"); // 500500 2`,
  },
  {
    id: 'dn-4',
    level: 'fresher',
    topic: 'dotnet-advanced',
    difficulty: 'medium',
    simple: {
      hi: 'SOLID ek achhi team jaisi hai: har khiladi ka ek hi kaam (bowler sirf bowling), naya khiladi team mein jud sakta hai bina purano ko badle, aur captain kisi bhi fit khiladi ko utaar sakta hai kyunki sab ek hi rules maante hain.',
      en: 'SOLID is like a good cricket team: each player has one job (the bowler just bowls), a new player can join without changing the others, and the captain can send in any fit player because everyone follows the same rules.',
      bn: 'SOLID হলো একটা ভালো ক্রিকেট দলের মতো: প্রত্যেক খেলোয়াড়ের একটাই কাজ (bowler শুধু বল করে), পুরনোদের না বদলেই নতুন খেলোয়াড় যোগ দিতে পারে, আর ক্যাপ্টেন যেকোনো ফিট খেলোয়াড়কে নামাতে পারে কারণ সবাই একই নিয়ম মানে।',
    },
    question: 'Explain the SOLID principles with C# examples.',
    answer: 'SOLID is five design principles for maintainable object-oriented code. S - Single Responsibility: a class should have one reason to change. O - Open/Closed: open for extension, closed for modification, e.g. add a new discount type as a new class instead of editing a switch. L - Liskov Substitution: a subtype must be usable wherever its base type is expected without breaking behaviour. I - Interface Segregation: prefer small, focused interfaces over fat ones. D - Dependency Inversion: depend on abstractions, and receive them via constructor injection, which ASP.NET Core\'s built-in DI container supports.',
    points: [
      'SRP: split InvoiceService from InvoicePdfGenerator and EmailSender',
      'OCP: strategy pattern / polymorphism instead of growing if-else or switch',
      'LSP: classic violation is Square inheriting Rectangle, or overrides throwing NotSupportedException',
      'ISP: IReader and IWriter instead of one IRepository with 20 methods',
      'DIP: high-level code depends on interfaces; DI container wires implementations',
      'Goal: code that is easy to test and change',
    ],
    code: `// O + D: new discounts = new classes, OrderService never changes
public interface IDiscountStrategy { decimal Apply(decimal amount); }

public sealed class NoDiscount : IDiscountStrategy
{
    public decimal Apply(decimal amount) => amount;
}
public sealed class FestiveDiscount : IDiscountStrategy
{
    public decimal Apply(decimal amount) => amount * 0.9m;
}

// S: only calculates totals; D: depends on an abstraction
public sealed class OrderService(IDiscountStrategy discount)
{
    public decimal Total(IEnumerable<decimal> prices) => discount.Apply(prices.Sum());
}

// Program.cs
builder.Services.AddSingleton<IDiscountStrategy, FestiveDiscount>();
builder.Services.AddScoped<OrderService>();`,
  },
  {
    id: 'dn-5',
    level: 'fresher',
    topic: 'dotnet-advanced',
    difficulty: 'easy',
    simple: {
      hi: 'Unit test exam se pehle mock test jaisa hai. Moq ek dummy dost hai jo practice mein wahi jawab deta hai jo tum usse bulwana chahte ho, taaki tum sirf apni taiyaari check kar sako.',
      en: 'A unit test is like a mock test before the exam. Moq is a dummy friend who gives exactly the answers you ask him to during practice, so you can check only your own preparation.',
      bn: 'Unit test হলো পরীক্ষার আগে mock test-এর মতো। Moq হলো একজন নকল বন্ধু, যে প্র্যাকটিসের সময় ঠিক সেই উত্তর দেয় যা তুমি তাকে বলতে বলো, যাতে তুমি শুধু নিজের প্রস্তুতি যাচাই করতে পারো।',
    },
    question: 'How do you write unit tests in .NET with xUnit and Moq?',
    answer: 'xUnit is a popular .NET test framework: [Fact] marks a test with no parameters and [Theory] with [InlineData] runs the same test with different inputs. xUnit creates a new instance of the test class for every test, so setup goes in the constructor and teardown in Dispose, while shared expensive setup uses IClassFixture. Moq creates fake implementations of interfaces: Setup(...).Returns/ReturnsAsync defines behaviour, .Object gives the instance to inject, and Verify(..., Times.Once) asserts that a dependency was called. Tests follow Arrange-Act-Assert and should test one behaviour each.',
    points: [
      '[Fact] = single case; [Theory] + [InlineData] / [MemberData] = data-driven',
      'New test class instance per test: constructor = setup, IDisposable = teardown',
      'IClassFixture / collection fixtures for shared setup (e.g. test database)',
      'Moq: Setup, Returns/ReturnsAsync, It.IsAny<T>(), Verify, Times',
      'Mock only external dependencies (repositories, HTTP, clock), not the class under test',
      'Run with dotnet test; NSubstitute is a common alternative to Moq',
    ],
    code: `public class OrderServiceTests
{
    [Fact]
    public async Task PlaceOrder_SavesOrder_WhenInStock()
    {
        // Arrange
        var repo = new Mock<IOrderRepository>();
        var stock = new Mock<IStockService>();
        stock.Setup(s => s.IsAvailableAsync("SKU1", 2)).ReturnsAsync(true);
        var sut = new OrderService(repo.Object, stock.Object);
        // Act
        bool ok = await sut.PlaceOrderAsync("SKU1", 2);
        // Assert
        Assert.True(ok);
        repo.Verify(r => r.AddAsync(It.IsAny<Order>()), Times.Once);
    }
    [Theory]
    [InlineData(0)]
    [InlineData(-5)]
    public async Task PlaceOrder_Throws_ForInvalidQuantity(int qty)
    {
        var sut = new OrderService(Mock.Of<IOrderRepository>(), Mock.Of<IStockService>());
        await Assert.ThrowsAsync<ArgumentOutOfRangeException>(() => sut.PlaceOrderAsync("SKU1", qty));
    }
}`,
  },
  {
    id: 'dn-6',
    level: 'junior',
    topic: 'dotnet-advanced',
    difficulty: 'hard',
    simple: {
      hi: 'Socho ek hi chabi hai. Tum gate par khade ho aur bolte ho \'jab tak andar wala bahar nahi aata, main chabi nahi doonga\', aur andar wala bolta hai \'chabi mile tab hi bahar aaunga\'. Dono atak gaye, yahi deadlock hai. ConfigureAwait(false) andar wale ko doosre darwaze se nikalne deta hai.',
      en: 'Imagine there is only one key. You stand at the gate saying \'I won\'t give the key until the person inside comes out\', and the person inside says \'I\'ll come out only when I get the key\'. Both are stuck: that is a deadlock. ConfigureAwait(false) lets the person leave by another door.',
      bn: 'ভাবো চাবি মাত্র একটা। তুমি গেটে দাঁড়িয়ে বলছ \'ভেতরের লোক বেরোলে তবেই চাবি দেব\', আর ভেতরের লোক বলছে \'চাবি পেলে তবেই বেরোব\'। দুজনেই আটকে গেল, এটাই deadlock। ConfigureAwait(false) ভেতরের লোককে অন্য দরজা দিয়ে বেরোতে দেয়।',
    },
    question: 'What does ConfigureAwait(false) do, and why does calling .Result or .Wait() on async code cause deadlocks?',
    answer: 'When you await, the continuation by default resumes on the captured SynchronizationContext (the UI thread in WinForms/WPF/MAUI, the request context in classic ASP.NET). If code on that context blocks with .Result or .Wait(), the context thread is stuck waiting for the task, while the task\'s continuation is waiting for that same thread, so neither can proceed: a deadlock. ConfigureAwait(false) tells the await not to resume on the captured context, which avoids this in library code and saves a context switch. ASP.NET Core has no SynchronizationContext, so the classic deadlock does not occur there, but sync-over-async still blocks thread-pool threads and causes starvation; the real fix everywhere is "async all the way".',
    points: [
      'await captures SynchronizationContext / TaskScheduler by default',
      'Deadlock = blocked context thread + continuation needing that thread',
      'ConfigureAwait(false) in reusable libraries; not needed in ASP.NET Core app code',
      'After ConfigureAwait(false) don\'t touch UI controls (you may be on another thread)',
      'GetAwaiter().GetResult() unwraps the exception but still blocks',
      'Fix: make callers async (async event handlers, async Main, async controllers)',
    ],
    code: `// WinForms / WPF
private void Button_Click(object sender, EventArgs e)
{
    var text = LoadAsync().Result;   // DEADLOCK: UI thread blocked
    label.Text = text;
}

private async Task<string> LoadAsync()
{
    await Task.Delay(1000);          // continuation wants the UI thread
    return "done";
}

// Fix 1 (preferred): async all the way
private async void Button_ClickFixed(object sender, EventArgs e)
{
    label.Text = await LoadAsync();
}

// Fix 2 (library code): don't capture the context
public async Task<string> LoadLibAsync()
{
    await Task.Delay(1000).ConfigureAwait(false);
    return "done";
}`,
  },
  {
    id: 'dn-7',
    level: 'junior',
    topic: 'dotnet-advanced',
    difficulty: 'medium',
    simple: {
      hi: 'Lock ek single bathroom ki kundi jaisa hai, ek samay mein ek hi andar. Concurrent collection railway station ke kai ticket counters jaisi hai jo khud line sambhalte hain. SemaphoreSlim gatekeeper hai jo bolta hai \'itne log hi andar jayenge\'.',
      en: 'A lock is like the latch on a single bathroom: one person inside at a time. A concurrent collection is like the many ticket counters at a railway station that manage their own queues. SemaphoreSlim is a gatekeeper saying \'only this many people may go in\'.',
      bn: 'Lock হলো একটা মাত্র বাথরুমের ছিটকিনির মতো, একসময়ে একজনই ভেতরে। Concurrent collection হলো রেলস্টেশনের অনেকগুলো টিকিট কাউন্টারের মতো, যারা নিজেরাই লাইন সামলায়। SemaphoreSlim হলো দারোয়ান, যে বলে \'এতজনই ভেতরে যাবে\'।',
    },
    question: 'How do you make code thread-safe in C#? Compare lock, Interlocked, SemaphoreSlim and concurrent collections.',
    answer: 'The lock statement (built on Monitor) gives mutual exclusion so only one thread runs a critical section at a time; keep it short and lock on a private object, never on this, a type or a string. Interlocked provides atomic operations (Increment, CompareExchange) for simple counters without a lock. You cannot await inside a lock, so for async code use SemaphoreSlim(1, 1) with WaitAsync. For shared collections prefer System.Collections.Concurrent types such as ConcurrentDictionary, ConcurrentQueue and BlockingCollection, or Channel<T> for async producer/consumer, instead of wrapping a List or Dictionary in locks.',
    points: [
      'lock = Monitor.Enter/Exit in try/finally; newer .NET also has a dedicated System.Threading.Lock type',
      'Interlocked for atomic counters and flags',
      'SemaphoreSlim.WaitAsync for async critical sections or throttling (n concurrent calls)',
      'ReaderWriterLockSlim when reads vastly outnumber writes',
      'ConcurrentDictionary.GetOrAdd/AddOrUpdate: the value factory may run more than once',
      'Immutable data and avoiding shared state are the simplest thread safety',
    ],
    code: `public class Stats
{
    private readonly object _gate = new();
    private readonly List<string> _log = [];
    private int _hits;
    private readonly SemaphoreSlim _sem = new(1, 1);
    private readonly ConcurrentDictionary<string, int> _perUser = new();

    public void Hit(string user)
    {
        Interlocked.Increment(ref _hits);                       // atomic counter
        _perUser.AddOrUpdate(user, 1, (_, n) => n + 1);         // thread-safe map
        lock (_gate) { _log.Add(user); }                        // short critical section
    }

    public async Task FlushAsync(Stream s)
    {
        await _sem.WaitAsync();                                 // async-friendly lock
        try { await s.WriteAsync(BitConverter.GetBytes(_hits)); }
        finally { _sem.Release(); }
    }
}`,
  },
  {
    id: 'dn-8',
    level: 'mid',
    topic: 'dotnet-advanced',
    difficulty: 'hard',
    simple: {
      hi: 'Span ek magnifying glass jaisa hai: poore akhbaar ki photocopy karne ke bajaye tum sirf us hisse par lens rakhte ho jo padhna hai. Memory us lens ka aisa version hai jise tum bag mein rakh kar baad mein bhi le ja sakte ho.',
      en: 'Span is like a magnifying glass: instead of photocopying the whole newspaper, you just place the lens on the part you want to read. Memory is a version of that lens you can keep in your bag and carry for later.',
      bn: 'Span হলো একটা আতশ কাচের মতো: পুরো খবরের কাগজ ফটোকপি না করে তুমি শুধু যে অংশটা পড়তে চাও তার ওপর কাচটা রাখো। Memory হলো সেই কাচের এমন একটা রূপ যা ব্যাগে রেখে পরে নিয়ে যাওয়া যায়।',
    },
    question: 'What are Span<T> and Memory<T>? When would you use them?',
    answer: 'Span<T> is a ref struct that represents a contiguous region of memory (an array, a slice of a string, stackalloc memory or native memory) without copying or allocating; slicing it is O(1). Because it is a ref struct it can live only on the stack: it cannot be a field of a class, be boxed, be captured by lambdas or be used across an await. Memory<T> is the heap-friendly counterpart that can be stored in fields and used in async methods, and you call .Span when you need to process it synchronously. They are used for high-performance parsing, buffer handling and reducing GC allocations, for example replacing Substring/Split with slicing.',
    points: [
      'Span<T> / ReadOnlySpan<T>: stack-only view, zero-copy slicing',
      'Works over arrays, strings (AsSpan), stackalloc, native pointers',
      'Restrictions: no class fields, no boxing, no await crossing, no lambda capture',
      'Memory<T> / ReadOnlyMemory<T>: storable, async-friendly, .Span to access',
      'Many BCL APIs accept spans: int.Parse(ReadOnlySpan<char>), Stream.ReadAsync(Memory<byte>)',
      'Benefit: fewer allocations -> less GC pressure in hot paths',
    ],
    code: `static int SumCsv(ReadOnlySpan<char> input)
{
    int sum = 0;
    while (!input.IsEmpty)
    {
        int comma = input.IndexOf(',');
        ReadOnlySpan<char> part = comma < 0 ? input : input[..comma];
        sum += int.Parse(part);                       // no substring allocated
        input = comma < 0 ? ReadOnlySpan<char>.Empty : input[(comma + 1)..];
    }
    return sum;
}

Console.WriteLine(SumCsv("12,34,56"));              // 102

Span<byte> buffer = stackalloc byte[4];              // stack memory, no GC
buffer.Fill(7);

// Memory<T> can cross await
static async Task<int> ReadSomeAsync(Stream s, Memory<byte> mem) =>
    await s.ReadAsync(mem);`,
  },
  {
    id: 'dn-9',
    level: 'mid',
    topic: 'dotnet-advanced',
    difficulty: 'hard',
    simple: {
      hi: 'DbContext pehle se ek tiffin service hai jo khana banati bhi hai aur deliver bhi karti hai. Uske upar ek aur \'tiffin manager\' rakhna aksar bekaar kharcha hai. CQRS matlab rasoi (likhna) aur dining hall (padhna) alag rakho, aur Strategy matlab customer ke hisaab se UPI ya card se payment.',
      en: 'DbContext is already a tiffin service that both cooks and delivers. Putting another \'tiffin manager\' on top is often a waste. CQRS means keeping the kitchen (writing) and dining hall (reading) separate, and Strategy means taking payment by UPI or card depending on the customer.',
      bn: 'DbContext আগে থেকেই একটা টিফিন সার্ভিস, যে রান্নাও করে আবার ডেলিভারিও দেয়। তার ওপরে আরেকজন \'টিফিন ম্যানেজার\' রাখা প্রায়ই বাড়তি খরচ। CQRS মানে রান্নাঘর (লেখা) আর খাওয়ার ঘর (পড়া) আলাদা রাখা, আর Strategy মানে গ্রাহক অনুযায়ী UPI বা কার্ডে পেমেন্ট নেওয়া।',
    },
    question: 'Should you use the Repository and Unit of Work patterns with EF Core? Where do Mediator/CQRS, Factory and Strategy fit in .NET apps?',
    answer: 'DbContext already implements Unit of Work (SaveChanges commits all changes together) and DbSet<T> already behaves like a repository, so a thin generic repository over EF Core often adds code without value and hides useful features such as Include, projections and AsNoTracking. Specific repositories still make sense around DDD aggregates or when you want to keep the domain independent of EF Core, while many teams simply inject DbContext into handlers. CQRS separates commands (writes, validated domain logic) from queries (reads, often projections or Dapper) and does not require separate databases or event sourcing; a mediator (for example MediatR or a small in-house dispatcher) decouples controllers from handlers and adds pipeline behaviours for validation and logging, at the cost of indirection. Factory and Strategy appear naturally through DI: IHttpClientFactory and IDbContextFactory are factories, and keyed services or a dictionary of implementations let you pick a strategy at runtime.',
    points: [
      'DbContext = Unit of Work, DbSet = repository: avoid generic repo wrappers by default',
      'Repositories are useful for aggregates, complex reusable queries, or swapping persistence',
      'CQRS: separate read and write models; can share one database',
      'Mediator: decoupling + cross-cutting pipelines, but harder navigation and debugging (recent MediatR versions are commercially licensed)',
      'Factory: IHttpClientFactory, IDbContextFactory, Func<T> or custom factories',
      'Strategy: interface + several implementations selected via keyed services',
    ],
    code: `// CQRS-style query handler: reads use projection + AsNoTracking
public record GetOrderQuery(int Id);
public record OrderDto(int Id, decimal Total);

public sealed class GetOrderHandler(AppDbContext db)
{
    public Task<OrderDto?> HandleAsync(GetOrderQuery q, CancellationToken ct) =>
        db.Orders.AsNoTracking()
          .Where(o => o.Id == q.Id)
          .Select(o => new OrderDto(o.Id, o.Total))
          .FirstOrDefaultAsync(ct);
}

// Strategy chosen at runtime via keyed services (factory-like resolution)
builder.Services.AddKeyedScoped<IPaymentGateway, UpiGateway>("upi");
builder.Services.AddKeyedScoped<IPaymentGateway, CardGateway>("card");

app.MapPost("/pay/{method}", async (string method, PayRequest req, IServiceProvider sp) =>
{
    var gateway = sp.GetRequiredKeyedService<IPaymentGateway>(method);
    return Results.Ok(await gateway.ChargeAsync(req));
});`,
  },
  {
    id: 'dn-10',
    level: 'mid',
    topic: 'dotnet-advanced',
    difficulty: 'hard',
    simple: {
      hi: 'REST aur gRPC phone call jaise hain, saamne wala turant jawab de tabhi kaam aage badhta hai (gRPC ek tez, short-code wali call hai). Messaging WhatsApp message jaisa hai: bhej do, saamne wala free hoke padh lega, aur tum apna kaam chalu rakhte ho.',
      en: 'REST and gRPC are like phone calls: work continues only when the other side answers right away (gRPC is a faster call in short code). Messaging is like a WhatsApp message: you send it, the other person reads it when free, and you carry on with your work.',
      bn: 'REST আর gRPC হলো ফোন কলের মতো, ওপাশের লোক সঙ্গে সঙ্গে উত্তর দিলে তবেই কাজ এগোয় (gRPC হলো দ্রুত, সংক্ষিপ্ত ভাষার কল)। Messaging হলো WhatsApp মেসেজের মতো: পাঠিয়ে দাও, ওপাশের লোক ফাঁকা হলে পড়বে, আর তুমি নিজের কাজ চালিয়ে যাও।',
    },
    question: 'How do .NET microservices communicate? Compare REST, gRPC and asynchronous messaging.',
    answer: 'Services talk either synchronously (REST/HTTP or gRPC) or asynchronously through a message broker. REST with JSON is simple and ideal for public and browser-facing APIs. gRPC (Grpc.AspNetCore) uses HTTP/2 and Protocol Buffers with a contract-first .proto file, giving strongly typed generated clients, smaller payloads, deadlines and streaming, which suits internal service-to-service calls; browsers need gRPC-Web. Asynchronous messaging via RabbitMQ, Azure Service Bus or Kafka (often through libraries like MassTransit or NServiceBus) decouples services in time, absorbs load spikes and enables event-driven workflows, but brings eventual consistency, so you need idempotent consumers, retries/dead-letter queues and the outbox pattern to publish events reliably.',
    points: [
      'REST: universal, human-readable; gRPC: binary, typed contracts, streaming, internal calls',
      'Messaging: commands vs events, publish/subscribe, temporal decoupling',
      'Outbox pattern: save event in the same DB transaction, publish afterwards',
      'Idempotent consumers, dead-letter queues, retries with backoff',
      'Resilience for sync calls: timeouts, retries, circuit breaker (Polly / Microsoft.Extensions.Http.Resilience)',
      'Observability: OpenTelemetry tracing, health checks; .NET Aspire helps local orchestration',
    ],
    code: `// orders.proto
// service Orders { rpc GetOrder (OrderRequest) returns (OrderReply); }
// message OrderRequest { int32 id = 1; }
// message OrderReply { int32 id = 1; string status = 2; }

public class OrdersService(AppDbContext db) : Orders.OrdersBase
{
    public override async Task<OrderReply> GetOrder(OrderRequest request, ServerCallContext context)
    {
        var order = await db.Orders.AsNoTracking()
            .FirstOrDefaultAsync(o => o.Id == request.Id, context.CancellationToken)
            ?? throw new RpcException(new Status(StatusCode.NotFound, "Order not found"));

        return new OrderReply { Id = order.Id, Status = order.Status };
    }
}

// Program.cs
builder.Services.AddGrpc();
app.MapGrpcService<OrdersService>();`,
  },
  {
    id: 'dn-11',
    level: 'junior',
    topic: 'dotnet-advanced',
    difficulty: 'medium',
    simple: {
      hi: 'BenchmarkDotNet ek proper race track jaisa hai: warm-up, kai rounds aur sahi stopwatch, taaki pata chale kaun sach mein tez daudta hai. Profiler doctor ke X-ray jaisa hai, jo dikhata hai dard asal mein kahan hai.',
      en: 'BenchmarkDotNet is like a proper race track: warm-up, many rounds and an accurate stopwatch, so you know who really runs faster. A profiler is like a doctor\'s X-ray that shows where the pain actually is.',
      bn: 'BenchmarkDotNet হলো একটা আসল দৌড়ের ট্র্যাকের মতো: ওয়ার্ম-আপ, অনেকগুলো রাউন্ড আর সঠিক স্টপওয়াচ, যাতে বোঝা যায় কে সত্যিই দ্রুত দৌড়ায়। Profiler হলো ডাক্তারের X-ray-এর মতো, যা দেখায় ব্যথাটা আসলে কোথায়।',
    },
    question: 'How do you measure and profile performance in .NET? What is BenchmarkDotNet?',
    answer: 'For micro-benchmarks use BenchmarkDotNet rather than a Stopwatch loop: it runs in a Release build, does warm-up and many iterations, isolates each benchmark in a separate process, and reports mean, error, standard deviation and, with [MemoryDiagnoser], allocations and GC counts. For whole applications, profile instead of guessing: dotnet-counters shows live metrics (CPU, GC, thread pool, exceptions), dotnet-trace captures CPU/event traces, dotnet-dump and dotnet-gcdump analyse memory, and tools like the Visual Studio profiler, PerfView or JetBrains dotTrace/dotMemory visualise hot paths. In production use APM/OpenTelemetry traces to find the slow dependency first.',
    points: [
      'Always benchmark in Release (dotnet run -c Release), never under the debugger',
      '[Benchmark], [Params], Baseline = true, [MemoryDiagnoser]',
      'Watch allocations (Allocated column) as well as time',
      'dotnet-counters / dotnet-trace / dotnet-dump / dotnet-gcdump CLI tools',
      'Measure -> find bottleneck -> fix -> measure again',
      'Stopwatch is fine for rough timing of whole operations, not micro-optimisations',
    ],
    code: `using BenchmarkDotNet.Attributes;
using BenchmarkDotNet.Running;
using System.Text;
BenchmarkRunner.Run<StringBenchmarks>();   // dotnet run -c Release

[MemoryDiagnoser]
public class StringBenchmarks
{
    [Params(10, 1000)] public int N;
    [Benchmark(Baseline = true)]
    public string Concat()
    {
        var s = "";
        for (int i = 0; i < N; i++) s += i;
        return s;
    }

    [Benchmark]
    public string Builder()
    {
        var sb = new StringBuilder();
        for (int i = 0; i < N; i++) sb.Append(i);
        return sb.ToString();
    }
}`,
  },
  {
    id: 'dn-12',
    level: 'senior',
    topic: 'dotnet-advanced',
    difficulty: 'hard',
    simple: {
      hi: 'JIT ek live cook jaisa hai jo order aate hi khaana banata hai, pehla plate thoda der se par baad mein bahut tez. ReadyToRun matlab aadha khaana pehle se tayaar, cook zaroorat par sudhaar bhi sakta hai. Native AOT packed ready-to-eat meal hai: turant tayaar, par menu badal nahi sakte.',
      en: 'JIT is like a live cook who makes food when the order comes: the first plate is a bit slow, later very fast. ReadyToRun means half the food is pre-made and the cook can still improve it. Native AOT is a packed ready-to-eat meal: instantly ready, but you can\'t change the menu.',
      bn: 'JIT হলো এমন রাঁধুনির মতো যে অর্ডার এলে তবেই রান্না করে: প্রথম প্লেটে একটু দেরি, পরে খুব দ্রুত। ReadyToRun মানে অর্ধেক খাবার আগে থেকেই তৈরি, রাঁধুনি দরকারে সেটা আরও ভালো করতে পারে। Native AOT হলো প্যাক করা ready-to-eat খাবার: সঙ্গে সঙ্গে তৈরি, কিন্তু মেনু বদলানো যায় না।',
    },
    question: 'Compare JIT, ReadyToRun and Native AOT compilation in .NET. When would you choose each?',
    answer: 'By default C# compiles to IL and the JIT compiles methods to machine code at runtime; tiered compilation first produces quick unoptimised code and later recompiles hot methods with full optimisation, using dynamic PGO (profile-guided optimisation) to reach the best steady-state throughput, at the cost of slower startup. ReadyToRun (PublishReadyToRun) precompiles assemblies to native code ahead of time but keeps the IL, so startup is faster while the JIT can still re-optimise hot code; files are larger and target a specific runtime identifier. Native AOT (PublishAot) produces a self-contained native executable with no JIT at runtime, giving very fast startup, small memory and no runtime install, but requires trimming-compatible code: no runtime code generation (Reflection.Emit), limited reflection and dynamic loading, and libraries must be AOT-compatible (for example System.Text.Json source generators, minimal APIs rather than MVC).',
    points: [
      'JIT: best long-running throughput (tiered compilation + dynamic PGO), slower startup',
      'ReadyToRun: faster startup, still has IL + JIT fallback, larger size, RID-specific',
      'Native AOT: fastest startup, low memory, single native binary, platform-specific',
      'AOT limits: no Reflection.Emit, trimming warnings must be fixed, not all libraries supported',
      'Use AOT for serverless, containers with scale-to-zero, CLI tools; JIT for typical long-running web apps',
      'Always test the published output; trimming can remove code used only via reflection',
    ],
    code: `<!-- Option A: ReadyToRun (faster startup, JIT still available) -->
<PropertyGroup>
  <PublishReadyToRun>true</PublishReadyToRun>
  <RuntimeIdentifier>linux-x64</RuntimeIdentifier>
</PropertyGroup>

<!-- Option B: Native AOT (no JIT at runtime) -->
<PropertyGroup>
  <PublishAot>true</PublishAot>
  <InvariantGlobalization>true</InvariantGlobalization>
</PropertyGroup>

<!-- publish:  dotnet publish -c Release -r linux-x64 -->

// AOT-friendly JSON: source-generated serializer, no runtime reflection
[JsonSerializable(typeof(Product))]
internal partial class AppJsonContext : JsonSerializerContext { }`,
  },
  {
    id: 'dn-13',
    level: 'junior',
    topic: 'dotnet-advanced',
    difficulty: 'medium',
    simple: {
      hi: 'Singleton school ke ek hi principal jaisa hai. Kitne bhi bachche ek saath \'principal ko bulao\' bolein, principal ek hi rahega. Lazy<T> pakka karta hai ki pehli baar bulane par hi principal appoint ho, aur do baar nahi.',
      en: 'A singleton is like the one principal of a school. However many children shout \'call the principal\' at once, there is only one principal. Lazy<T> makes sure the principal is appointed only on the first call, and never twice.',
      bn: 'Singleton হলো স্কুলের একমাত্র প্রিন্সিপালের মতো। যতজন বাচ্চাই একসাথে \'প্রিন্সিপালকে ডাকো\' বলুক, প্রিন্সিপাল একজনই থাকবেন। Lazy<T> নিশ্চিত করে যে প্রথমবার ডাকলেই প্রিন্সিপাল নিয়োগ হবেন, দুবার নয়।',
    },
    question: 'Coding: implement a thread-safe singleton in C#.',
    answer: 'The simplest correct approach is Lazy<T>: by default it uses LazyThreadSafetyMode.ExecutionAndPublication, so the factory runs exactly once even if many threads access Instance at the same time, and creation is deferred until first use. The class is sealed with a private constructor so no one else can create or derive instances. A static readonly field initialised inline is also thread-safe (the runtime guarantees type initialisation runs once) but is less lazy; hand-written double-checked locking works only with care and is rarely needed. In ASP.NET Core you usually let the DI container do this with AddSingleton, which is easier to test.',
    points: [
      'sealed + private constructor prevents external creation',
      'Lazy<T> default mode = thread-safe, runs factory once',
      'static readonly field: thread-safe via the type initializer',
      'Double-checked locking needs a lock plus a volatile field; prefer Lazy<T>',
      'Singleton state itself must also be thread-safe if mutable',
      'Prefer services.AddSingleton<T>() over static singletons for testability',
    ],
    code: `public sealed class AppSettings
{
    private static readonly Lazy<AppSettings> _instance =
        new(() => new AppSettings());           // ExecutionAndPublication by default

    public static AppSettings Instance => _instance.Value;

    public DateTime LoadedAt { get; }

    private AppSettings()
    {
        LoadedAt = DateTime.UtcNow;             // expensive setup runs once
    }
}

// Test: many threads, one instance
var ids = new System.Collections.Concurrent.ConcurrentBag<int>();
Parallel.For(0, 100, _ => ids.Add(AppSettings.Instance.GetHashCode()));
Console.WriteLine(ids.Distinct().Count());   // 1

// ASP.NET Core alternative
// builder.Services.AddSingleton<AppSettingsService>();`,
  },
  {
    id: 'dn-14',
    level: 'mid',
    topic: 'dotnet-advanced',
    difficulty: 'hard',
    simple: {
      hi: 'LRU cache ek chhote school bag jaisa hai jismein sirf 5 kitaabein aati hain. Jo kitaab abhi padhi wo sabse upar rakhte ho; nayi kitaab daalni ho aur jagah na ho, to sabse neeche wali, jise sabse lambe time se nahi chhua, nikaal dete ho.',
      en: 'An LRU cache is like a small school bag that holds only 5 books. The book you just read goes on top; when a new book must go in and there is no space, you take out the one at the bottom that you haven\'t touched for the longest time.',
      bn: 'LRU cache হলো ছোট্ট স্কুল ব্যাগের মতো, যাতে মাত্র ৫টা বই ধরে। যে বইটা এইমাত্র পড়লে সেটা সবার ওপরে রাখো; নতুন বই ঢোকাতে হলে আর জায়গা না থাকলে, সবচেয়ে নিচের বইটা, যেটা সবচেয়ে বেশি সময় ধরে ছোঁওনি, বের করে দাও।',
    },
    question: 'Coding: implement an LRU (Least Recently Used) cache with O(1) get and put in C#.',
    answer: 'Combine a Dictionary for O(1) lookup with a LinkedList that keeps items in usage order: the most recently used node sits at the front and the least recently used at the back. On Get, find the node via the dictionary and move it to the front; on Put, update or insert at the front, and if capacity is exceeded remove the last node from both the list and the dictionary. Storing LinkedListNode references in the dictionary makes removal and move-to-front O(1). A lock makes it safe for concurrent use; in real apps you might use MemoryCache with size limits, though that is not strict LRU.',
    points: [
      'Dictionary<TKey, LinkedListNode<(TKey, TValue)>> + LinkedList<(TKey, TValue)>',
      'Front = most recent, back = least recent (evict from back)',
      'Store the key inside the node so eviction can remove it from the dictionary',
      'All operations O(1); lock for thread safety',
      'Edge cases: capacity <= 0, updating existing key, missing key',
    ],
    code: `public sealed class LruCache<TKey, TValue>(int capacity) where TKey : notnull
{
    private readonly Dictionary<TKey, LinkedListNode<(TKey Key, TValue Value)>> _map = new();
    private readonly LinkedList<(TKey Key, TValue Value)> _list = new();
    private readonly object _gate = new();
    public bool TryGet(TKey key, out TValue value)
    {
        lock (_gate)
        {
            if (!_map.TryGetValue(key, out var node)) { value = default!; return false; }
            _list.Remove(node); _list.AddFirst(node);               // mark as most recent
            value = node.Value.Value; return true;
        }
    }

    public void Put(TKey key, TValue value)
    {
        lock (_gate)
        {
            if (_map.Remove(key, out var old)) _list.Remove(old);  // update existing key
            else if (_map.Count >= capacity) { _map.Remove(_list.Last!.Value.Key); _list.RemoveLast(); }
            _map[key] = _list.AddFirst((key, value));              // AddFirst returns the new node
        }
    }
}`,
  },
  {
    id: 'dn-15',
    level: 'senior',
    topic: 'dotnet-advanced',
    difficulty: 'hard',
    simple: {
      hi: 'Retry aise hai jaise dost ka phone busy aaye to tum turant baar-baar call nahi karte; pehle 1 minute ruko, phir 2, phir 4. Agar wo bole \'galat number hai\', to dobara call karne ka koi fayda nahi, wahi transient aur non-transient error ka fark hai.',
      en: 'Retry is like calling a friend whose phone is busy: you don\'t redial instantly again and again; you wait 1 minute, then 2, then 4. If you hear \'wrong number\', calling again is pointless: that is the difference between transient and non-transient errors.',
      bn: 'Retry হলো বন্ধুর ফোন ব্যস্ত পেলে যেমন করো: সঙ্গে সঙ্গে বারবার ফোন করো না; আগে ১ মিনিট অপেক্ষা, তারপর ২, তারপর ৪। যদি শোনো \'ভুল নম্বর\', তাহলে আবার ফোন করে লাভ নেই, এটাই transient আর non-transient error-এর পার্থক্য।',
    },
    question: 'Coding: write a generic async retry helper with exponential backoff in C#.',
    answer: 'The helper takes a Func<CancellationToken, Task<T>>, tries it, and on a transient failure waits for an exponentially growing delay (base x 2^(attempt-1)) plus random jitter before trying again, up to a maximum number of attempts. An exception filter (catch ... when) decides whether to retry, so the final failure or a non-transient error propagates with its original stack trace, and cancellation is honoured both in the operation and in Task.Delay. Only retry idempotent operations; in production code prefer Polly or Microsoft.Extensions.Http.Resilience, which add circuit breakers, timeouts and telemetry.',
    points: [
      'Exponential backoff spreads load; jitter avoids all clients retrying together',
      'Retry only transient errors (timeouts, 5xx, 429), never validation errors',
      'Exception filter keeps the original exception and stack trace on last attempt',
      'Pass CancellationToken to the operation and to Task.Delay',
      'Retry only idempotent operations, or use idempotency keys',
      'Production: Polly / Microsoft.Extensions.Http.Resilience pipelines',
    ],
    code: `public static async Task<T> RunAsync<T>(
    Func<CancellationToken, Task<T>> action,
    int maxAttempts = 3,
    TimeSpan? baseDelay = null,
    Func<Exception, bool>? isTransient = null,
    CancellationToken ct = default)
{
    var delay = baseDelay ?? TimeSpan.FromMilliseconds(200);
    for (int attempt = 1; ; attempt++)
    {
        try
        {
            return await action(ct).ConfigureAwait(false);
        }
        catch (Exception ex) when (attempt < maxAttempts
                                   && !ct.IsCancellationRequested
                                   && (isTransient?.Invoke(ex) ?? ex is HttpRequestException or TimeoutException))
        {
            var backoff = delay * Math.Pow(2, attempt - 1);
            var jitter = TimeSpan.FromMilliseconds(Random.Shared.Next(0, 100));
            await Task.Delay(backoff + jitter, ct).ConfigureAwait(false);
        }
    }
}
// usage (method placed in a static class Retry): var html = await Retry.RunAsync(t => http.GetStringAsync(url, t), maxAttempts: 4, ct: token);`,
  },
  {
    id: 'ef-1',
    level: 'fresher',
    topic: 'efcore',
    difficulty: 'easy',
    simple: {
      hi: 'EF Core ek translator jaisa hai. Tum C# mein bolte ho \'sasti cheezein do\', aur wo database ko uski bhasha SQL mein samjha deta hai, phir jawab wapas C# objects mein la deta hai.',
      en: 'EF Core is like a translator. You say \'give me the cheap items\' in C#, it explains that to the database in its own language, SQL, and brings the answer back as C# objects.',
      bn: 'EF Core একজন দোভাষীর মতো। তুমি C#-এ বলো \'সস্তা জিনিসগুলো দাও\', সে database-কে তার নিজের ভাষা SQL-এ বুঝিয়ে দেয়, তারপর উত্তরটা C# objects হিসেবে ফিরিয়ে আনে।',
    },
    question: 'What is Entity Framework Core and why would you use an ORM?',
    answer: 'Entity Framework Core is Microsoft\'s open-source, cross-platform ORM (Object-Relational Mapper) for .NET. It lets you work with the database using C# classes (entities) and LINQ instead of hand-written SQL and DataReaders; EF Core translates LINQ to SQL, materialises rows into objects and tracks changes so SaveChanges can generate INSERT/UPDATE/DELETE statements. It supports many providers such as SQL Server, PostgreSQL, SQLite, MySQL and Cosmos DB.',
    points: [
      'ORM maps tables to classes and rows to objects',
      'Key pieces: DbContext (session), DbSet<T> (table), entities, migrations',
      'LINQ queries are translated to provider-specific SQL',
      'Change tracking + SaveChanges generate write statements for you',
      'Trade-off: productivity and type-safety vs. less control than raw SQL',
    ],
    code: `public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Product> Products => Set<Product>();
}

// usage
var cheap = await db.Products
    .Where(p => p.Price < 500)
    .OrderBy(p => p.Name)
    .ToListAsync();   // EF Core generates SELECT ... WHERE Price < 500`,
  },
  {
    id: 'ef-2',
    level: 'fresher',
    topic: 'efcore',
    difficulty: 'medium',
    simple: {
      hi: 'DbContext ek bank counter ki token slip jaisa hai. Har customer (request) ko apni alag slip milti hai, kaam khatam to slip phek di jaati hai. Ek hi slip do log ek saath use karenge to gadbad hogi.',
      en: 'DbContext is like a token slip at a bank counter. Every customer (request) gets their own slip, and it is thrown away when the work is done. If two people use the same slip at once, things get mixed up.',
      bn: 'DbContext হলো ব্যাংক কাউন্টারের টোকেন স্লিপের মতো। প্রত্যেক গ্রাহক (request) নিজের আলাদা স্লিপ পায়, কাজ শেষ হলে স্লিপ ফেলে দেওয়া হয়। একই স্লিপ দুজন একসাথে ব্যবহার করলে গোলমাল হয়ে যায়।',
    },
    question: 'What is DbContext and what lifetime should it have in an ASP.NET Core app?',
    answer: 'DbContext represents a session with the database: it holds the connection, the DbSets, the model configuration and the change tracker, and acts as a unit of work through SaveChanges. AddDbContext registers it as Scoped, so each HTTP request gets its own short-lived instance that is disposed at the end of the request. DbContext is not thread-safe, so it must never be a singleton or be used by parallel operations; for Blazor Server, background services or singletons use IDbContextFactory<T> to create short-lived contexts.',
    points: [
      'DbContext = unit of work + change tracker + DbSets',
      'AddDbContext registers it Scoped (one per request) by default',
      'Not thread-safe: no concurrent queries on the same instance (await each call)',
      'Use IDbContextFactory in singletons, BackgroundService or Blazor Server',
      'AddDbContextPool reuses instances to reduce allocation cost in hot APIs',
    ],
    code: `// Program.cs
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// For background work / singletons:
builder.Services.AddDbContextFactory<AppDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

public class CleanupJob(IDbContextFactory<AppDbContext> factory) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken ct)
    {
        await using var db = await factory.CreateDbContextAsync(ct);
        await db.Products.Where(p => p.Price == 0).ExecuteDeleteAsync(ct);
    }
}`,
  },
  {
    id: 'ef-3',
    level: 'fresher',
    topic: 'efcore',
    difficulty: 'easy',
    simple: {
      hi: 'Code-first matlab pehle naksha (C# classes) banao, phir mistri us naksha se ghar (database) banata hai. Database-first matlab ghar pehle se bana hai, tum usko dekhkar uska naksha bana lete ho.',
      en: 'Code-first means you draw the house plan (C# classes) first and the builder makes the house (database) from it. Database-first means the house already exists and you draw its plan by looking at it.',
      bn: 'Code-first মানে আগে নকশা (C# classes) আঁকো, তারপর মিস্ত্রি সেই নকশা দেখে বাড়ি (database) বানায়। Database-first মানে বাড়ি আগে থেকেই তৈরি, তুমি সেটা দেখে নকশা বানিয়ে নাও।',
    },
    question: 'What is the difference between code-first and database-first approaches in EF Core?',
    answer: 'In code-first you write the entity classes and DbContext configuration in C#, and EF Core generates and evolves the database schema through migrations, so the code is the source of truth. In database-first the database already exists (often owned by a DBA or legacy system), and you reverse-engineer (scaffold) entity classes and a DbContext from it with `dotnet ef dbcontext scaffold`, so the database is the source of truth. Code-first suits new projects; database-first suits existing or shared databases.',
    points: [
      'Code-first: classes -> migrations -> schema; schema history lives in source control',
      'Database-first: existing schema -> scaffolded classes',
      'Scaffold command: dotnet ef dbcontext scaffold "<conn>" Microsoft.EntityFrameworkCore.SqlServer',
      'Re-scaffolding overwrites generated files, so put custom code in partial classes',
      'Configuration via Fluent API (OnModelCreating) or data annotations in both cases',
    ],
    code: `# Code-first: create schema from your C# model
dotnet ef migrations add InitialCreate
dotnet ef database update

# Database-first: generate C# model from an existing database
dotnet ef dbcontext scaffold "Server=.;Database=Shop;Trusted_Connection=True;TrustServerCertificate=True" \\
    Microsoft.EntityFrameworkCore.SqlServer \\
    --output-dir Models --context ShopDbContext`,
  },
  {
    id: 'ef-4',
    level: 'junior',
    topic: 'efcore',
    difficulty: 'medium',
    simple: {
      hi: 'Migrations ghar ki renovation diary jaisi hai. Har page par likha hai \'is din ek kamra joda\' aur use kaise hataana hai. Diary dekh kar koi bhi naya ghar bilkul same tarah bana sakta hai.',
      en: 'Migrations are like a home renovation diary. Each page says \'on this day we added a room\' and how to remove it. Using the diary, anyone can build a new house exactly the same way.',
      bn: 'Migrations হলো বাড়ি মেরামতের ডায়েরির মতো। প্রতিটা পাতায় লেখা \'এই দিন একটা ঘর যোগ হলো\' আর সেটা কীভাবে সরাতে হয়। ডায়েরি দেখে যে কেউ হুবহু একই রকম নতুন বাড়ি বানাতে পারে।',
    },
    question: 'What are EF Core migrations and how do you apply them safely in production?',
    answer: 'Migrations are versioned C# files that describe incremental schema changes (Up and Down methods) generated by comparing your current model with the last model snapshot. You create them with `dotnet ef migrations add <Name>` and apply them with `dotnet ef database update`; EF Core records applied migrations in the __EFMigrationsHistory table. In production prefer generating an idempotent SQL script or a migration bundle and running it as a deployment step, rather than calling Database.Migrate() at app startup, which can race when several instances start together.',
    points: [
      'Each migration has Up/Down plus an updated ModelSnapshot',
      '__EFMigrationsHistory table tracks which migrations are applied',
      'dotnet ef migrations script --idempotent produces a reviewable SQL script',
      'dotnet ef migrations bundle creates a self-contained executable for CI/CD',
      'Review generated code: renames can appear as drop + add and lose data',
      'Remove an unapplied migration with dotnet ef migrations remove',
    ],
    code: `dotnet ef migrations add AddProductSku
dotnet ef database update                       # dev machine

# production-friendly options
dotnet ef migrations script --idempotent -o migrate.sql
dotnet ef migrations bundle -o efbundle
./efbundle --connection "<prod connection string>"

// Generated migration (excerpt)
public partial class AddProductSku : Migration
{
    protected override void Up(MigrationBuilder mb) =>
        mb.AddColumn<string>("Sku", "Products", maxLength: 50, nullable: true);

    protected override void Down(MigrationBuilder mb) =>
        mb.DropColumn("Sku", "Products");
}`,
  },
  {
    id: 'ef-5',
    level: 'junior',
    topic: 'efcore',
    difficulty: 'medium',
    simple: {
      hi: 'Change tracking ek class monitor jaisa hai jo yaad rakhta hai har bachche ki seat kahan thi. Teacher (SaveChanges) aate hi monitor batata hai kisne seat badli. Agar sirf attendance dekhni hai to monitor ki zaroorat nahi, wahi AsNoTracking hai.',
      en: 'Change tracking is like a class monitor who remembers where every student was sitting. When the teacher (SaveChanges) comes, the monitor reports who changed seats. If you only want to see attendance, you don\'t need the monitor: that is AsNoTracking.',
      bn: 'Change tracking হলো ক্লাস মনিটরের মতো, যে মনে রাখে প্রত্যেক ছাত্র কোথায় বসেছিল। Teacher (SaveChanges) এলে মনিটর বলে দেয় কে সিট বদলেছে। শুধু হাজিরা দেখতে চাইলে মনিটরের দরকার নেই, সেটাই AsNoTracking।',
    },
    question: 'How does change tracking work in EF Core, and when should you use AsNoTracking?',
    answer: 'When a tracked query returns entities, the DbContext\'s change tracker keeps each entity with a state (Unchanged, Modified, Added, Deleted or Detached) plus a snapshot of its original values. On SaveChanges it calls DetectChanges, compares current values with the snapshot and generates SQL only for changed columns. AsNoTracking skips this bookkeeping, making read-only queries faster and lighter on memory, so use it for queries whose results you will not update (lists, reports, API GET endpoints).',
    points: [
      'Entity states: Added, Unchanged, Modified, Deleted, Detached',
      'Snapshot comparison happens in DetectChanges, called by SaveChanges',
      'AsNoTracking: no snapshot, no identity resolution, faster reads',
      'AsNoTrackingWithIdentityResolution keeps one instance per key without tracking',
      'Set QueryTrackingBehavior.NoTracking globally for read-heavy contexts',
      'Projections to DTOs (Select) are not tracked anyway',
    ],
    code: `// Tracked: EF Core notices the change and issues an UPDATE
var product = await db.Products.FirstAsync(p => p.Id == id);
product.Price = 999;
Console.WriteLine(db.Entry(product).State); // Modified
await db.SaveChangesAsync();                // UPDATE Products SET Price = @p0 WHERE Id = @p1

// Read-only: no tracking overhead
var list = await db.Products
    .AsNoTracking()
    .Where(p => p.Price > 100)
    .ToListAsync();`,
  },
  {
    id: 'ef-6',
    level: 'junior',
    topic: 'efcore',
    difficulty: 'medium',
    simple: {
      hi: 'Shaadi ke khaane ka socho: eager loading matlab thali mein sab kuch ek saath aa gaya. Lazy loading matlab har item maangne par waiter alag se laata hai. Explicit loading matlab tum khud bolte ho \'ab dal le aao\'.',
      en: 'Think of a wedding meal: eager loading means everything comes together on one thali. Lazy loading means the waiter brings each item separately when you reach for it. Explicit loading means you yourself say \'now bring the dal\'.',
      bn: 'বিয়েবাড়ির খাবার ভাবো: eager loading মানে থালায় সব একসাথে চলে এল। Lazy loading মানে প্রতিটা পদ চাইলে তবে ওয়েটার আলাদা করে আনে। Explicit loading মানে তুমি নিজেই বলো \'এবার ডাল নিয়ে এসো\'।',
    },
    question: 'Explain eager, lazy and explicit loading of related data in EF Core.',
    answer: 'Eager loading fetches related data in the same query using Include and ThenInclude. Lazy loading fetches a navigation property automatically the first time you access it; in EF Core it is opt-in (for example via the Microsoft.EntityFrameworkCore.Proxies package with UseLazyLoadingProxies and virtual navigation properties) and it easily causes N+1 queries. Explicit loading means you load a navigation later on demand with context.Entry(entity).Collection(...).LoadAsync() or Reference(...).LoadAsync().',
    points: [
      'Eager: Include/ThenInclude, one round trip (or split queries)',
      'Filtered Include: Include(b => b.Posts.Where(p => p.IsPublished))',
      'Lazy: opt-in, needs proxies and virtual navigations, hidden extra queries',
      'Explicit: Entry(x).Collection(..).LoadAsync() / Reference(..).LoadAsync()',
      'For APIs, projection with Select is often better than any of the three',
    ],
    code: `// Eager
var blogs = await db.Blogs
    .Include(b => b.Posts.Where(p => p.IsPublished))
        .ThenInclude(p => p.Author)
    .ToListAsync();

// Explicit
var blog = await db.Blogs.FirstAsync(b => b.Id == 1);
await db.Entry(blog).Collection(b => b.Posts).LoadAsync();
await db.Entry(blog).Reference(b => b.Owner).LoadAsync();

// Lazy (opt-in)
builder.Services.AddDbContext<AppDbContext>(o =>
    o.UseSqlServer(conn).UseLazyLoadingProxies());
public class Blog
{
    public int Id { get; set; }
    public virtual ICollection<Post> Posts { get; set; } = [];
}`,
  },
  {
    id: 'ef-7',
    level: 'junior',
    topic: 'efcore',
    difficulty: 'medium',
    simple: {
      hi: 'Socho class ke 40 bachchon ki copy check karni hai aur tum har copy ke liye alag se staff room jaate ho. 40 chakkar! Samajhdaari yeh hai ki ek hi baar mein saari copies le aao, yahi N+1 ka fix hai.',
      en: 'Imagine checking 40 students\' notebooks and walking to the staff room separately for each one. That is 40 trips! The smart way is to bring all the notebooks in one trip, and that is the fix for N+1.',
      bn: 'ভাবো ক্লাসের ৪০ জন ছাত্রের খাতা দেখতে হবে আর তুমি প্রতিটা খাতার জন্য আলাদা করে স্টাফ রুমে যাচ্ছ। ৪০ বার যাতায়াত! বুদ্ধিমানের কাজ হলো একবারেই সব খাতা নিয়ে আসা, এটাই N+1-এর সমাধান।',
    },
    question: 'What is the N+1 query problem? How do you detect and fix it in EF Core?',
    answer: 'N+1 happens when you run one query to load a list of N parent rows and then one extra query per row to load its related data, giving N+1 database round trips; with lazy loading it is hidden inside a simple foreach. It works fine on 10 rows in development but becomes very slow in production. Detect it by logging generated SQL (LogTo, logging category Microsoft.EntityFrameworkCore.Database.Command, or an APM/profiler) and fix it with eager loading (Include) or, better, a projection with Select that fetches exactly the needed columns in one query.',
    points: [
      'Symptom: same SELECT repeated many times with different parameter values',
      'Common cause: lazy loading or querying inside a loop',
      'Fix 1: Include/ThenInclude',
      'Fix 2: Select into a DTO (one query, only needed columns)',
      'Fix 3: load children in one batch with WHERE Id IN (...) then group in memory',
      'Detect via LogTo/console logging, MiniProfiler or Application Insights',
    ],
    code: `// BAD: 1 query for orders + 1 query per order for customer (lazy loading)
var orders = await db.Orders.ToListAsync();
foreach (var o in orders)
    Console.WriteLine(o.Customer.Name);   // triggers a query each time

// GOOD: single query with projection
var rows = await db.Orders
    .Select(o => new { o.Id, CustomerName = o.Customer.Name, o.Total })
    .ToListAsync();

// See the SQL EF Core sends
optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);`,
  },
  {
    id: 'ef-8',
    level: 'mid',
    topic: 'efcore',
    difficulty: 'medium',
    simple: {
      hi: 'IQueryable ek grocery list jaisi hai jo tum dukaandaar ko dete ho, wo godown mein hi chhaant kar sirf zaroori saaman bhejta hai. IEnumerable matlab poora godown ghar mangwa liya, phir ghar par chhaant rahe ho.',
      en: 'IQueryable is like a grocery list you give the shopkeeper; he sorts things in his godown and sends only what you need. IEnumerable is like getting the whole godown delivered home and then sorting it yourself.',
      bn: 'IQueryable হলো দোকানদারকে দেওয়া বাজারের ফর্দের মতো, সে গুদামেই বাছাই করে শুধু দরকারি জিনিস পাঠায়। IEnumerable মানে পুরো গুদাম বাড়িতে আনিয়ে তারপর নিজে বাছাই করা।',
    },
    question: 'What is the difference between IQueryable and IEnumerable in EF Core, and what is client evaluation?',
    answer: 'IQueryable<T> builds an expression tree that the EF Core provider translates to SQL when the query is enumerated, so Where, OrderBy, Take and Select run inside the database. IEnumerable<T> (for example after AsEnumerable() or ToList()) runs the remaining LINQ in memory, so any filter applied after that point is done after all the rows are downloaded. Client evaluation means running parts of a query in .NET; modern EF Core only allows it in the final Select projection and throws an InvalidOperationException ("could not be translated") if an untranslatable expression appears in Where, OrderBy and similar places, instead of silently loading the whole table.',
    points: [
      'IQueryable = expression tree + provider; IEnumerable = in-memory delegates',
      'Query executes on enumeration: ToListAsync, FirstAsync, foreach, Count...',
      'Calling a custom C# method inside Where -> translation exception',
      'Final Select may call client methods (evaluated after rows arrive)',
      'Use ToQueryString() to see the SQL for an IQueryable',
      'Keep repository methods returning materialised results or well-defined IQueryable, not accidental IEnumerable',
    ],
    code: `static bool IsPremium(Customer c) => c.Orders.Count > 10; // plain C# method

// Translated to SQL: filter runs in the database
IQueryable<Customer> q = db.Customers.Where(c => c.City == "Pune");
Console.WriteLine(q.ToQueryString());

// Throws InvalidOperationException: IsPremium cannot be translated
// var bad = await db.Customers.Where(c => IsPremium(c)).ToListAsync();

// Works, but downloads every customer first (dangerous on big tables)
var slow = db.Customers.AsEnumerable().Where(c => c.Name.StartsWith("A"));

// Allowed: client method only in the final projection
var dto = await db.Customers
    .Where(c => c.City == "Pune")
    .Select(c => new { c.Id, Label = FormatName(c.Name) })
    .ToListAsync();
static string FormatName(string n) => n.ToUpperInvariant();`,
  },
  {
    id: 'ef-9',
    level: 'mid',
    topic: 'efcore',
    difficulty: 'medium',
    simple: {
      hi: 'Transaction ek ATM withdrawal jaisa hai: ya to paisa account se kate aur haath mein aaye, ya dono na ho. Aadha kaam kabhi nahi hona chahiye. SaveChanges akela ek chhota ATM transaction hai, explicit transaction kai steps ko ek saath bandhta hai.',
      en: 'A transaction is like an ATM withdrawal: either money is debited and you receive it, or neither happens. Half-done is never allowed. One SaveChanges is a small transaction; an explicit transaction ties several steps together.',
      bn: 'Transaction হলো ATM থেকে টাকা তোলার মতো: হয় অ্যাকাউন্ট থেকে টাকা কাটবে আর হাতে আসবে, নয়তো কোনোটাই হবে না। অর্ধেক কাজ কখনো চলবে না। একটা SaveChanges ছোট একটা transaction, explicit transaction অনেকগুলো ধাপকে একসাথে বেঁধে রাখে।',
    },
    question: 'How do transactions work with SaveChanges in EF Core? When do you need an explicit transaction?',
    answer: 'By default every SaveChanges/SaveChangesAsync call wraps all pending inserts, updates and deletes in a single database transaction (for relational providers), so either all of them succeed or none do. You need an explicit transaction when several SaveChanges calls, raw SQL commands or ExecuteUpdate/ExecuteDelete calls must commit or roll back together; use context.Database.BeginTransactionAsync() then CommitAsync(). If you enable a retrying execution strategy (EnableRetryOnFailure), wrap the whole transaction in strategy.ExecuteAsync so the entire unit is retried.',
    points: [
      'One SaveChanges = one transaction automatically',
      'Explicit: BeginTransactionAsync / CommitAsync / RollbackAsync (disposing without commit rolls back)',
      'ExecuteUpdate/ExecuteDelete and raw SQL run immediately, outside SaveChanges, but join an explicit transaction',
      'With EnableRetryOnFailure, use CreateExecutionStrategy().ExecuteAsync(...)',
      'TransactionScope is supported too, but keep transactions short',
      'Savepoints are created automatically around SaveChanges inside an explicit transaction',
    ],
    code: `var strategy = db.Database.CreateExecutionStrategy();
await strategy.ExecuteAsync(async () =>
{
    await using var tx = await db.Database.BeginTransactionAsync();

    var order = new Order { CustomerId = 7, Total = 1500 };
    db.Orders.Add(order);
    await db.SaveChangesAsync();                 // gets order.Id

    await db.Products
        .Where(p => p.Id == 42)
        .ExecuteUpdateAsync(s => s.SetProperty(p => p.Stock, p => p.Stock - 1));

    db.Payments.Add(new Payment { OrderId = order.Id, Amount = 1500 });
    await db.SaveChangesAsync();

    await tx.CommitAsync();                      // all or nothing
});`,
  },
  {
    id: 'ef-10',
    level: 'mid',
    topic: 'efcore',
    difficulty: 'hard',
    simple: {
      hi: 'Socho do log ek hi train seat book kar rahe hain. Seat ke saath ek version number hai; jo pehle book karta hai uska version badal jaata hai. Doosre ka purana version match nahi karta, to use bataya jaata hai \'seat badal gayi, dobara dekho\'.',
      en: 'Imagine two people booking the same train seat. The seat has a version number; whoever books first changes the version. The second person\'s old version no longer matches, so they are told \'the seat changed, please check again\'.',
      bn: 'ভাবো দুজন একই ট্রেনের সিট বুক করছে। সিটের সঙ্গে একটা version নম্বর আছে; যে আগে বুক করে তার জন্য version বদলে যায়। দ্বিতীয়জনের পুরনো version আর মেলে না, তাই তাকে বলা হয় \'সিট বদলে গেছে, আবার দেখো\'।',
    },
    question: 'How do you handle optimistic concurrency in EF Core using concurrency tokens?',
    answer: 'Optimistic concurrency assumes conflicts are rare: instead of locking rows, EF Core includes the original value of a concurrency token in the WHERE clause of UPDATE/DELETE statements. If another user changed the row in the meantime, zero rows are affected and EF Core throws DbUpdateConcurrencyException. On SQL Server you typically use a rowversion column ([Timestamp] byte[]), which the database bumps automatically; other properties can be marked with [ConcurrencyCheck] or IsConcurrencyToken(). You then catch the exception and decide: reload and show the user, client-wins, or merge.',
    points: [
      '[Timestamp] / IsRowVersion() -> SQL Server rowversion, auto-updated',
      '[ConcurrencyCheck] or IsConcurrencyToken() for app-managed tokens (e.g. a Guid you change on each update)',
      'Generated SQL: UPDATE ... WHERE Id = @id AND RowVersion = @originalVersion',
      '0 rows affected -> DbUpdateConcurrencyException',
      'Resolve via ex.Entries, GetDatabaseValuesAsync, OriginalValues.SetValues',
      'In web APIs send the token to the client (e.g. ETag) and back on update',
    ],
    code: `public class Account
{
    public int Id { get; set; }
    public decimal Balance { get; set; }
    [Timestamp] public byte[] RowVersion { get; set; } = [];
}

try
{
    account.Balance -= 500;
    await db.SaveChangesAsync();
}
catch (DbUpdateConcurrencyException ex)
{
    var entry = ex.Entries.Single();
    var dbValues = await entry.GetDatabaseValuesAsync();
    if (dbValues is null) throw new InvalidOperationException("Row was deleted");

    // Strategy here: refresh original values, re-apply the business rule, retry
    entry.OriginalValues.SetValues(dbValues);
    entry.CurrentValues.SetValues(dbValues);
    account.Balance -= 500;
    await db.SaveChangesAsync();
}`,
  },
  {
    id: 'ef-11',
    level: 'senior',
    topic: 'efcore',
    difficulty: 'hard',
    simple: {
      hi: 'LINQ ek automatic car jaisa hai, aaram se chalti hai. Raw SQL aur Dapper manual gear wali car hain: mehnat zyada, par pahadi raste (complex query) par tum poora control le sakte ho. Rozana ke liye automatic, mushkil raaste ke liye manual.',
      en: 'LINQ is like an automatic car: easy to drive. Raw SQL and Dapper are manual-gear cars: more effort, but on a hilly road (a complex query) you get full control. Use automatic daily and manual for tough roads.',
      bn: 'LINQ হলো automatic গাড়ির মতো, আরামে চলে। Raw SQL আর Dapper হলো manual gear-এর গাড়ি: খাটুনি বেশি, কিন্তু পাহাড়ি রাস্তায় (complex query) পুরো নিয়ন্ত্রণ তোমার হাতে। রোজকার জন্য automatic, কঠিন রাস্তায় manual।',
    },
    question: 'When would you use raw SQL in EF Core or Dapper instead of LINQ? How do you choose?',
    answer: 'Use LINQ by default because it is type-safe, composable and benefits from change tracking. Drop to raw SQL in EF Core (FromSql / FromSqlInterpolated for entities, Database.SqlQuery<T> for scalar or unmapped results, ExecuteSql for commands) when you need database-specific features, hand-tuned queries, stored procedures or table-valued functions; interpolated versions are parameterised, so they are safe from SQL injection. Dapper is a micro-ORM that maps SQL results to objects with minimal overhead and no change tracking; it is a good fit for read-heavy, complex reporting queries or performance-critical paths, and many teams use EF Core for writes and Dapper for reads in the same app (it can share the same DbConnection).',
    points: [
      'EF LINQ: productivity, migrations, change tracking, provider portability',
      'EF raw SQL: FromSql (entity types, composable), SqlQuery<T>, ExecuteSqlAsync',
      'Never concatenate user input into SQL; FromSqlRaw only with explicit parameters',
      'Dapper: you write all SQL, fast materialisation, no tracking/migrations',
      'Mixed approach: EF for commands, Dapper for complex queries (CQRS-style reads)',
      'Measure first: modern EF Core is often close enough to Dapper for simple queries',
    ],
    code: `// EF Core: parameterised interpolated SQL, still composable with LINQ
var top = await db.Products
    .FromSql($"SELECT * FROM Products WHERE CategoryId = {categoryId}")
    .AsNoTracking()
    .OrderByDescending(p => p.Price)
    .Take(10)
    .ToListAsync();

// EF Core: unmapped result type
var totals = await db.Database
    .SqlQuery<decimal>($"SELECT SUM(Total) AS Value FROM Orders WHERE CustomerId = {id}")
    .SingleAsync();

// Dapper on the same connection
using Dapper;
var conn = db.Database.GetDbConnection();
var report = await conn.QueryAsync<SalesRow>(
    "SELECT CategoryId, SUM(Total) AS Revenue FROM Orders GROUP BY CategoryId HAVING SUM(Total) > @min",
    new { min = 100000 });`,
  },
  {
    id: 'ef-12',
    level: 'senior',
    topic: 'efcore',
    difficulty: 'hard',
    simple: {
      hi: 'Library mein kitaab dhoondhna socho. Bina index ke har shelf dekhni padegi; index (catalogue) ho to seedha sahi rack par jaate ho. Aur poori almirah uthane ke bajaye sirf wahi page photocopy karo jo chahiye, yahi projection hai.',
      en: 'Think of finding a book in a library. Without an index you check every shelf; with an index (catalogue) you go straight to the right rack. And instead of carrying the whole cupboard, photocopy only the page you need: that is projection.',
      bn: 'লাইব্রেরিতে বই খোঁজার কথা ভাবো। Index ছাড়া প্রতিটা তাক দেখতে হবে; index (ক্যাটালগ) থাকলে সোজা সঠিক র‍্যাকে যাও। আর পুরো আলমারি না তুলে শুধু দরকারি পাতাটা ফটোকপি করো, এটাই projection।',
    },
    question: 'Scenario: an EF Core endpoint listing orders is slow in production. How do you investigate and speed it up?',
    answer: 'First measure: log the generated SQL (LogTo or logging, ToQueryString) and its duration, then run it in the database to inspect the execution plan for scans, missing indexes and huge row counts. Typical fixes are: add indexes on filtered, joined and sorted columns (HasIndex in the model plus a migration), project with Select to fetch only needed columns, use AsNoTracking for reads, paginate (Skip/Take or keyset pagination for deep pages), remove N+1 patterns, and use AsSplitQuery when several collection Includes cause a cartesian explosion. For bulk changes use ExecuteUpdate/ExecuteDelete, and for very hot queries consider compiled queries or caching.',
    points: [
      'Measure first: SQL logs, execution plan, APM traces',
      'Indexes: HasIndex(...) including composite and filtered indexes',
      'Projection (Select) beats Include for read models',
      'AsNoTracking + pagination (keyset for large offsets)',
      'AsSplitQuery for multiple collection Includes (watch consistency)',
      'ExecuteUpdate/ExecuteDelete for set-based writes; compiled queries / caching for hot paths',
    ],
    code: `// Model configuration -> migration creates the index
modelBuilder.Entity<Order>()
    .HasIndex(o => new { o.CustomerId, o.CreatedAt });

// Fast read endpoint
var page = await db.Orders
    .AsNoTracking()
    .Where(o => o.CustomerId == customerId && o.CreatedAt < lastSeen) // keyset
    .OrderByDescending(o => o.CreatedAt)
    .Take(20)
    .Select(o => new OrderListDto(o.Id, o.CreatedAt, o.Total, o.Items.Count))
    .ToListAsync();

// Several collection includes: avoid cartesian explosion
var full = await db.Orders
    .Include(o => o.Items)
    .Include(o => o.Payments)
    .AsSplitQuery()
    .FirstAsync(o => o.Id == id);`,
  },
];

export const QUIZ: QuizQuestion[] = [
  {
    id: 'qn-c1',
    level: 'junior',
    topic: 'cs-basics',
    question: 'What happens when this runs?\nobject o = 5;\nlong l = (long)o;',
    options: [
      'l becomes 5',
      'Compile-time error',
      'InvalidCastException at run time',
      'l becomes 0',
    ],
    correct: 2,
    explanation: 'A boxed int can only be unboxed to int; unboxing directly to long throws InvalidCastException.',
  },
  {
    id: 'qn-c2',
    level: 'fresher',
    topic: 'cs-basics',
    question: 'What is printed?\nstring s = "Hi";\nstring t = s;\ns += "!";\nConsole.WriteLine(t);',
    options: [
      'Hi',
      'Hi!',
      '!',
      'An empty line',
    ],
    correct: 0,
    explanation: 'Strings are immutable, so += creates a new string for s while t still refers to "Hi".',
  },
  {
    id: 'qn-c3',
    level: 'junior',
    topic: 'cs-basics',
    question: 'What is printed?\nvar list = new List<int> { 1, 2 };\nvar q = list.Where(x => x > 0);\nlist.Add(3);\nConsole.WriteLine(q.Count());',
    options: [
      '0',
      '1',
      '2',
      '3',
    ],
    correct: 3,
    explanation: 'Where uses deferred execution, so the query runs at Count() and sees the added item.',
  },
  {
    id: 'qn-c4',
    level: 'mid',
    topic: 'cs-basics',
    question: 'Base has `public string M() => "Base";` and Derived has `public new string M() => "Derived";`. What does `Base b = new Derived(); Console.WriteLine(b.M());` print?',
    options: [
      'Derived',
      'Base',
      'Compile-time error',
      'Runtime exception',
    ],
    correct: 1,
    explanation: 'new hides rather than overrides, so the compile-time type Base decides which method runs.',
  },
  {
    id: 'qn-c5',
    level: 'fresher',
    topic: 'cs-basics',
    question: 'Which field can be assigned a value inside the constructor?',
    options: [
      'A const field',
      'A static const field',
      'A readonly field',
      'None of these',
    ],
    correct: 2,
    explanation: 'readonly fields can be set at declaration or in a constructor; const must be set at declaration.',
  },
  {
    id: 'qn-c6',
    level: 'mid',
    topic: 'cs-basics',
    question: 'Why should you avoid `async void` methods except for event handlers?',
    options: [
      'The caller cannot await them or catch their exceptions',
      'They always run synchronously',
      'They cannot use the await keyword',
      'They block the calling thread',
    ],
    correct: 0,
    explanation: 'async void returns nothing to await, so completion is untracked and exceptions escape the caller and can crash the process.',
  },
  {
    id: 'qn-a1',
    level: 'fresher',
    topic: 'aspnet',
    question: 'In ASP.NET Core, which service lifetime gives one instance per HTTP request?',
    options: [
      'Singleton',
      'Transient',
      'Scoped',
      'Static',
    ],
    correct: 2,
    explanation: 'Scoped services are created once per scope, and each HTTP request is its own scope.',
  },
  {
    id: 'qn-a2',
    level: 'fresher',
    topic: 'aspnet',
    question: 'Which method adds terminal middleware that never calls the next component?',
    options: [
      'app.Run',
      'app.Use',
      'app.Map',
      'app.UseWhen',
    ],
    correct: 0,
    explanation: 'app.Run registers a terminal delegate; nothing after it in the pipeline executes.',
  },
  {
    id: 'qn-a3',
    level: 'junior',
    topic: 'aspnet',
    question: 'A request carries a valid JWT, but the user lacks the role required by [Authorize(Roles = "Admin")]. What status code is returned by default?',
    options: [
      '400 Bad Request',
      '401 Unauthorized',
      '404 Not Found',
      '403 Forbidden',
    ],
    correct: 3,
    explanation: 'The user is authenticated but not authorized, so the challenge becomes a 403 Forbid.',
  },
  {
    id: 'qn-a4',
    level: 'mid',
    topic: 'aspnet',
    question: 'A singleton service needs the latest value of a configuration section, including changes after a config reload. What should it inject?',
    options: [
      'IOptions<T>',
      'IOptionsMonitor<T>',
      'IOptionsSnapshot<T>',
      'IConfigurationSection<T>',
    ],
    correct: 1,
    explanation: 'IOptionsMonitor<T> is a singleton exposing CurrentValue and OnChange; IOptionsSnapshot<T> is scoped and cannot go into a singleton.',
  },
  {
    id: 'qn-a5',
    level: 'mid',
    topic: 'aspnet',
    question: 'Which statement about output caching (AddOutputCache) compared to response caching is correct?',
    options: [
      'Output caching only sets HTTP headers so browsers cache the response',
      'Response caching supports tag-based eviction with EvictByTagAsync',
      'Output caching is server-controlled and is not bypassed by the client\'s Cache-Control: no-cache header',
      'Output caching caches POST responses by default',
    ],
    correct: 2,
    explanation: 'Output caching is a server-side policy with tags and eviction; response caching follows HTTP cache headers that clients can influence.',
  },
  {
    id: 'qn-e1',
    level: 'junior',
    topic: 'efcore',
    question: 'Which EF Core method loads related entities in the same query as the main entity?',
    options: [
      'AsNoTracking()',
      'Include()',
      'Entry(x).Collection(...).LoadAsync()',
      'Find()',
    ],
    correct: 1,
    explanation: 'Include() performs eager loading as part of the original query; Entry(...).LoadAsync() is explicit loading in a separate query.',
  },
  {
    id: 'qn-e2',
    level: 'mid',
    topic: 'efcore',
    question: 'With a [Timestamp] rowversion property, what happens when SaveChanges finds the row was modified by someone else?',
    options: [
      'The update silently overwrites the other change',
      'EF Core automatically merges both changes',
      'The row is locked until the other transaction ends',
      'A DbUpdateConcurrencyException is thrown',
    ],
    correct: 3,
    explanation: 'The UPDATE\'s WHERE clause includes the original rowversion, so zero rows are affected and EF Core throws DbUpdateConcurrencyException.',
  },
  {
    id: 'qn-d1',
    level: 'fresher',
    topic: 'dotnet-advanced',
    question: 'In .NET, where is a new byte[100_000] array allocated?',
    options: [
      'Gen 0 of the small object heap',
      'On the stack',
      'The Large Object Heap',
      'Gen 1 of the small object heap',
    ],
    correct: 2,
    explanation: 'Objects of 85,000 bytes or more go to the Large Object Heap, which is collected with Gen 2.',
  },
  {
    id: 'qn-d2',
    level: 'mid',
    topic: 'dotnet-advanced',
    question: 'Which type can be stored in a class field and used across an await?',
    options: [
      'Memory<T>',
      'Span<T>',
      'ReadOnlySpan<T>',
      'A stackalloc buffer',
    ],
    correct: 0,
    explanation: 'Span<T> and ReadOnlySpan<T> are ref structs limited to the stack; Memory<T> is the heap-storable, async-friendly counterpart.',
  },
  {
    id: 'qn-d3',
    level: 'junior',
    topic: 'dotnet-advanced',
    question: 'In a WPF button click handler, calling LoadAsync().Result where LoadAsync awaits Task.Delay without ConfigureAwait(false) typically causes what?',
    options: [
      'It runs normally but slower',
      'A deadlock',
      'A compile-time error',
      'An immediate InvalidOperationException',
    ],
    correct: 1,
    explanation: 'The UI thread blocks on .Result while the await continuation needs that same UI thread, so neither can proceed.',
  },
];
