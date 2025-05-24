using System.Text;
using MeganomPoligraph.Data;
using MeganomPoligraph.Configs;
using MeganomPoligraph.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MeganomPoligraph.Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;

var builder = WebApplication.CreateBuilder(args);
var connectionString = builder.Configuration["Database:ConnectionString"];
var clientUrl = builder.Configuration["Url:ClientUrl"];

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString)
);

builder.Services.Configure<SmtpSettings>(builder.Configuration.GetSection("SmtpSettings"));
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ApplicationInitializer>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins(clientUrl)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllersWithViews();
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(options =>
{
    var secretKey = builder.Configuration["JwtSettings:Secret"];
    if (string.IsNullOrEmpty(secretKey))
    {
        throw new ArgumentNullException("JwtSettings:Secret", "Secret key for JWT authentication is not configured.");
    }

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ClockSkew = TimeSpan.Zero
    };

    options.Events = new JwtBearerEvents
    {
        OnChallenge = context =>
        {
            if (context.Response.StatusCode == 401)
            {
                context.Response.Headers.Add("WWW-Authenticate", "Bearer");
            }
            return Task.CompletedTask;
        }
    };
});

var app = builder.Build();

using var scope = app.Services.CreateScope();
var initializer = scope.ServiceProvider.GetRequiredService<ApplicationInitializer>();

if (args.Contains("--setup"))
{
    initializer.InitializeDevelopmentDatabase();
    Environment.Exit(0);
}
else if (args.Contains("--test-setup"))
{
    initializer.InitializeTestDatabase();
    Environment.Exit(0);
}

await initializer.PerformStartupChecksAsync();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
