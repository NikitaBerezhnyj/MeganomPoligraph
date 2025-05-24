using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using MeganomPoligraph.Data;
using MeganomPoligraph.Models;
using MeganomPoligraph.Models.Enums;
using MeganomPoligraph.Models.JsonModels;
using MeganomPoligraph.Services;

namespace MeganomPoligraph.Infrastructure
{
    public class ApplicationInitializer
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IConfiguration _configuration;
        private readonly ILogger<ApplicationInitializer> _logger;
        private readonly IAuthService? _authService;
        private readonly ApplicationDbContext? _context;

        public ApplicationInitializer(
            IServiceProvider serviceProvider,
            IConfiguration configuration,
            ILogger<ApplicationInitializer> logger,
            IAuthService? authService = null,
            ApplicationDbContext? context = null)
        {
            _serviceProvider = serviceProvider;
            _configuration = configuration;
            _logger = logger;
            _authService = authService;
            _context = context;
        }

        public async Task PerformStartupChecksAsync()
        {
            using var scope = _serviceProvider.CreateScope();
            var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

            CheckRequiredSettings();
            await EnsureDatabaseCreatedAndMigratedAsync(dbContext);
            await EnsureRequiredCategoriesSeededAsync(dbContext);

            string serverUrl = _configuration["Url:ServerUrl"];

            _logger.LogInformation("✅ Startup checks completed successfully.");
            _logger.LogInformation("Server running at: " + serverUrl);
        }

        private void CheckRequiredSettings()
        {
            _logger.LogInformation("🔍 Validating required configuration settings...");

            var required = new[]
            {
                "Url:ClientUrl",
                "Url:ServerUrl",
                "Database:ConnectionString",
                "SmtpSettings:Host",
                "SmtpSettings:Port",
                "SmtpSettings:SenderMail",
                "SmtpSettings:SenderPassword",
                "SmtpSettings:RecipientMail",
                "JwtSettings:Secret"
            };

            var missing = required
                .Where(key => string.IsNullOrWhiteSpace(_configuration[key]))
                .ToList();

            if (missing.Any())
            {
                foreach (var key in missing)
                    _logger.LogError($"❌ Missing configuration: {key}");

                _logger.LogError("❌ Critical configuration missing. Exiting...");
                Environment.Exit(1);
            }

            _logger.LogInformation("✅ All required settings are set.");
        }

        private async Task EnsureDatabaseCreatedAndMigratedAsync(ApplicationDbContext dbContext)
        {
            _logger.LogInformation("🔍 Ensuring database is reachable and migrated...");

            try
            {
                if (!await dbContext.Database.CanConnectAsync())
                {
                    _logger.LogWarning("⚠️ Database unreachable. Creating new...");

                    await dbContext.Database.EnsureCreatedAsync();

                    _logger.LogInformation("✅ New database created successfully.");
                    return;
                }

                bool migrationTableExists = false;
                try
                {
                    migrationTableExists = await dbContext.Database.ExecuteSqlRawAsync(
                        "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = '__EFMigrationsHistory'") > 0;
                }
                catch
                {
                    migrationTableExists = false;
                }
                
                if (!migrationTableExists)
                {
                    _logger.LogWarning("⚠️ Migration history table not found. Creating database schema...");
                    await dbContext.Database.EnsureCreatedAsync();
                    _logger.LogInformation("✅ Database schema created successfully.");
                }
                else
                {
                    _logger.LogInformation("Applying pending migrations...");
                    await dbContext.Database.MigrateAsync();
                    _logger.LogInformation("✅ Migrations applied successfully.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Database initialization failed: {Message}", ex.Message);
                _logger.LogWarning("⚠️ Attempting to create database from scratch...");
                
                try
                {
                    await dbContext.Database.EnsureDeletedAsync();
                    await dbContext.Database.EnsureCreatedAsync();
                    _logger.LogInformation("✅ Database recreated successfully.");
                }
                catch (Exception innerEx)
                {
                    _logger.LogError(innerEx, "❌ Failed to recreate database: {Message}", innerEx.Message);
                    throw;
                }
            }
        }

        private async Task EnsureRequiredCategoriesSeededAsync(ApplicationDbContext dbContext)
        {
            _logger.LogInformation("🔍 Checking required categories...");

            var requiredCategories = new[]
            {
                "paper-bags-laminated",
                "logo-bags",
                "cardboard-bags",
                "kraft-bags",
                "gift-bags",
                "branded-folders",
                "designer-paper-bags",
                "uv-lacquer-bags",
                "embossed-bags"
            };

            var existing = await dbContext.Categories.Select(c => c.Name).ToListAsync();
            var toAdd = requiredCategories
                .Where(name => !existing.Contains(name))
                .Select(name => new Category { Name = name })
                .ToList();

            if (toAdd.Any())
            {
                await dbContext.Categories.AddRangeAsync(toAdd);
                await dbContext.SaveChangesAsync();
                _logger.LogInformation($"✅ {toAdd.Count} missing categories added.");
            }
            else
            {
                _logger.LogInformation("✅ All required categories already exist.");
            }
        }

        public void InitializeDevelopmentDatabase()
        {
            if (_context == null || _authService == null)
                throw new InvalidOperationException("Context or AuthService not injected for development setup.");

            _logger.LogInformation("🔧 Initializing development database...");

            CreateAndMigrateDatabase();
            ResetDatabase();
            SeedSuperAdmin();
            SeedDefaultCategories();
            SeedProductsFromJson("./Infrastructure/SeedProducts.json");

            _logger.LogInformation("✅ Development DB initialization complete.");
        }

        public void InitializeTestDatabase(int admins = 10, int visitors = 100, int requests = 50)
        {
            if (_context == null || _authService == null)
                throw new InvalidOperationException("Context or AuthService not injected for test setup.");

            _logger.LogInformation("🧪 Initializing test database...");

            CreateAndMigrateDatabase();
            ResetDatabase();
            SeedSuperAdmin();
            SeedMultipleAdmins(admins);
            SeedDefaultCategories();
            SeedProductsFromJson("./Infrastructure/SeedProducts.json");
            SeedRandomVisitors(visitors);
            SeedRandomRequests(requests);

            _logger.LogInformation("✅ Test DB initialization complete.");
        }

        private void CreateAndMigrateDatabase()
        {
            _logger.LogInformation("🛠 Creating or migrating database...");

            try
            {
                string? connStr = _configuration["Database:ConnectionString"];
                if (!string.IsNullOrEmpty(connStr))
                {
                    var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                        .UseNpgsql(connStr)
                        .Options;
                        
                    using var ctx = new ApplicationDbContext(options);

                    if (!ctx.Database.CanConnect())
                    {
                        _logger.LogWarning("⚠️ Database unreachable. Creating new...");
                        ctx.Database.EnsureCreated();
                        _logger.LogInformation("✅ Database created successfully.");
                        return;
                    }

                    bool migrationTableExists = false;
                    try
                    {
                        migrationTableExists = ctx.Database.ExecuteSqlRaw(
                            "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = '__EFMigrationsHistory'") > 0;
                    }
                    catch
                    {
                        migrationTableExists = false;
                    }
                    
                    if (!migrationTableExists)
                    {
                        _logger.LogWarning("⚠️ Migration history table not found. Creating database schema...");
                        ctx.Database.EnsureCreated();
                        _logger.LogInformation("✅ Database schema created successfully.");
                    }
                    else
                    {
                        ctx.Database.Migrate();
                        _logger.LogInformation("✅ Migrations applied successfully.");
                    }
                }
                else
                {
                    if (_context != null)
                    {
                        if (!_context.Database.CanConnect())
                        {
                            _context.Database.EnsureCreated();
                        }
                        else
                        {
                            bool migrationTableExists = false;
                            try
                            {
                                migrationTableExists = _context.Database.ExecuteSqlRaw(
                                    "SELECT COUNT(*) FROM information_schema.tables WHERE table_name = '__EFMigrationsHistory'") > 0;
                            }
                            catch
                            {
                                migrationTableExists = false;
                            }
                            
                            if (!migrationTableExists)
                            {
                                _context.Database.EnsureCreated();
                            }
                            else
                            {
                                _context.Database.Migrate();
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "❌ Database creation/migration failed: {Message}", ex.Message);
                _logger.LogWarning("⚠️ Attempting to create database from scratch...");
                
                try
                {
                    if (_context != null)
                    {
                        _context.Database.EnsureDeleted();
                        _context.Database.EnsureCreated();
                        _logger.LogInformation("✅ Database recreated successfully.");
                    }
                    else
                    {
                        string? connStr = _configuration["Database:ConnectionString"];
                        if (!string.IsNullOrEmpty(connStr))
                        {
                            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                                .UseNpgsql(connStr)
                                .Options;
                                
                            using var ctx = new ApplicationDbContext(options);
                            ctx.Database.EnsureDeleted();
                            ctx.Database.EnsureCreated();
                            _logger.LogInformation("✅ Database recreated successfully.");
                        }
                    }
                }
                catch (Exception innerEx)
                {
                    _logger.LogError(innerEx, "❌ Failed to recreate database: {Message}", innerEx.Message);
                    throw;
                }
            }
        }

        private void ResetDatabase()
        {
            _context!.ProductCategories.RemoveRange(_context.ProductCategories);
            _context.ProductDescriptions.RemoveRange(_context.ProductDescriptions);
            _context.Categories.RemoveRange(_context.Categories);
            _context.Products.RemoveRange(_context.Products);
            _context.Admins.RemoveRange(_context.Admins);
            _context.Visitors.RemoveRange(_context.Visitors);
            _context.Requests.RemoveRange(_context.Requests);

            _context.Database.ExecuteSqlRaw("ALTER SEQUENCE \"Admins_AdminID_seq\" RESTART WITH 1;");
            _context.Database.ExecuteSqlRaw("ALTER SEQUENCE \"Categories_CategoryID_seq\" RESTART WITH 1;");
            _context.Database.ExecuteSqlRaw("ALTER SEQUENCE \"Products_ProductID_seq\" RESTART WITH 1;");
            _context.Database.ExecuteSqlRaw("ALTER SEQUENCE \"Visitors_VisitorID_seq\" RESTART WITH 1;");
            _context.Database.ExecuteSqlRaw("ALTER SEQUENCE \"Requests_RequestID_seq\" RESTART WITH 1;");

            _context.SaveChanges();
            _logger.LogInformation("✅ Database reset complete.");
        }

        private void SeedSuperAdmin()
        {
            _authService!.CreatePasswordHash("admin", out byte[] hash);

            var admin = new Admin
            {
                Login = "admin",
                Name = "Nikita",
                Password = Convert.ToBase64String(hash),
                Role = "SuperAdmin"
            };

            _context!.Admins.Add(admin);
            _context.SaveChanges();
            _logger.LogInformation("✅ SuperAdmin seeded.");
        }

        private void SeedMultipleAdmins(int count)
        {
            var rand = new Random();
            var roles = new[] { "Admin", "SuperAdmin" };
            _authService!.CreatePasswordHash("admin", out byte[] hash);

            for (int i = 0; i < count; i++)
            {
                var admin = new Admin
                {
                    Name = $"Admin {i + 1}",
                    Login = $"admin{i + 1}",
                    Password = Convert.ToBase64String(hash),
                    Role = roles[rand.Next(roles.Length)]
                };
                _context!.Admins.Add(admin);
            }

            _context!.SaveChanges();
            _logger.LogInformation($"✅ {count} test admins seeded.");
        }

        private void SeedDefaultCategories()
        {
            var categories = new[]
            {
                "paper-bags-laminated",
                "logo-bags",
                "cardboard-bags",
                "kraft-bags",
                "gift-bags",
                "branded-folders",
                "designer-paper-bags",
                "uv-lacquer-bags",
                "embossed-bags"
            }.Select(name => new Category { Name = name });

            _context!.Categories.AddRange(categories);
            _context.SaveChanges();
            _logger.LogInformation("✅ Default categories seeded.");
        }

        private void SeedProductsFromJson(string path)
        {
            if (!File.Exists(path))
            {
                _logger.LogError($"❌ File not found: {path}");
                return;
            }

            var json = File.ReadAllText(path);
            var products = JsonSerializer.Deserialize<List<ProductJson>>(json);

            if (products == null)
            {
                _logger.LogWarning("⚠️ No product data in JSON.");
                return;
            }

            DateTime timestamp = DateTime.UtcNow;
            int index = 0;

            foreach (var p in products)
            {
                var product = new Product
                {
                    ImageUrl = p.imageUrl,
                    IsLocked = p.isLocked,
                    CreatedAt = timestamp.AddSeconds(index++)
                };

                _context!.Products.Add(product);
                _context.SaveChanges();

                foreach (var catName in p.productCategories)
                {
                    var category = _context.Categories.FirstOrDefault(c => c.Name == catName);
                    if (category != null)
                    {
                        _context.ProductCategories.Add(new ProductCategory
                        {
                            ProductID = product.ProductID,
                            CategoryID = category.CategoryID
                        });
                    }
                }

                foreach (var desc in p.productDescriptions)
                {
                    _context.ProductDescriptions.Add(new ProductDescription
                    {
                        ProductID = product.ProductID,
                        LanguageCode = desc.Key,
                        Description = desc.Value
                    });
                }

                _context.SaveChanges();
            }

            _logger.LogInformation("✅ Products seeded from JSON.");
        }

        private void SeedRandomVisitors(int count)
        {
            var rand = new Random();
            var visitors = Enumerable.Range(0, count).Select(i => new Visitor
            {
                IsUnique = rand.Next(2) == 1,
                VisitTime = DateTime.UtcNow.AddDays(-rand.Next(1, 1000)),
                IPAddress = $"192.168.0.{rand.Next(1, 255)}",
                UserAgent = rand.Next(2) == 0 ? "Mobile" : "Desktop"
            }).ToList();

            _context!.Visitors.AddRange(visitors);
            _context.SaveChanges();
            _logger.LogInformation($"✅ {count} test visitors seeded.");
        }

        private void SeedRandomRequests(int count)
        {
            var rand = new Random();
            var requests = new List<Request>();

            var types = new[] { "bag", "folder" };
            var sizes = new Dictionary<string, List<string>>
            {
                ["bag"] = new() { "14x21x8", "20x30x10", "25x32x8", "32x40x10", "60x45x20" },
                ["folder"] = new() { "A4", "A5" }
            };
            var materials = new[] { "paper", "cardboard", "kraft", "custom" };
            var prints = new[] { "pantone_1_0", "pantone_2_0", "pantone_3_0", "pantone_4_0", "custom" };
            var embossings = new[] { "matte", "glossy", "none" };
            var handles = new[] { "cord", "ribbon_satin", "ribbon_reps", "none" };
            var languages = new[] { "en", "ua", "ru" };
            var adminIds = _context!.Admins.Select(a => a.AdminID).ToList();
            var statuses = Enum.GetValues<RequestStatus>();

            for (int i = 0; i < count; i++)
            {
                string type = types[rand.Next(types.Length)];
                string size = sizes[type][rand.Next(sizes[type].Count)];
                string material = materials[rand.Next(materials.Length)];
                string print = prints[rand.Next(prints.Length)];
                string embossing = embossings[rand.Next(embossings.Length)];
                string handle = handles[rand.Next(handles.Length)];
                string language = languages[rand.Next(languages.Length)];

                string name = $"Name_{i + 1}";
                string contact = $"Contact_{i + 1}";
                string email = $"email{i + 1}@example.com";

                bool hasPhone = rand.NextDouble() < 0.7;
                bool hasEmail = rand.NextDouble() < 0.7;
                string? phone = hasPhone ? contact : null;
                string? emailValue = hasEmail ? email : null;

                if (phone == null && emailValue == null)
                {
                    if (rand.Next(2) == 0)
                        phone = contact;
                    else
                        emailValue = email;
                }

                string? notes = rand.NextDouble() < 0.5 ? "Some test note" : null;
                
                var randomStatus = statuses[rand.Next(statuses.Length)];
                int? assignedAdminId = (randomStatus != RequestStatus.New && adminIds.Any())
                    ? adminIds[rand.Next(adminIds.Count)]
                    : null;

                var request = new Request
                {
                    Name = name,
                    Phone = phone,
                    Email = emailValue,
                    Type = type,
                    Size = size,
                    Material = material,
                    Print = print,
                    Embossing = embossing,
                    Handles = handle,
                    Circulation = rand.Next(1, 10000),
                    Notes = notes,
                    Language = language,
                    Status = randomStatus,
                    AssignedAdminId = assignedAdminId,
                    CreatedAt = DateTime.UtcNow.AddDays(-rand.Next(1, 365 * 5))
                };

                requests.Add(request);
            }

            _context!.Requests.AddRange(requests);
            _context.SaveChanges();
            _logger.LogInformation($"✅ {count} test requests added with full simulation.");
        }
    }
}
