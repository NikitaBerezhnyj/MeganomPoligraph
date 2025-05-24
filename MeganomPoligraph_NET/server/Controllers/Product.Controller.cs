using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MeganomPoligraph.Data;
using MeganomPoligraph.Models;
using MeganomPoligraph.Models.RequestsModels;
using Microsoft.AspNetCore.Authorization;


namespace MeganomPoligraph.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly string _uploadsPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

        public ProductController(ApplicationDbContext context)
        {
            _context = context;

            if (!Directory.Exists(_uploadsPath))
            {
                Directory.CreateDirectory(_uploadsPath);
            }
        }

        [HttpGet]
        public IActionResult GetAllProducts()
        {
            var products = _context.Products
                .Include(p => p.ProductCategories)
                    .ThenInclude(pc => pc.Category)
                .Include(p => p.ProductDescriptions)
                .ToList();

            var formattedProducts = products.Select(p => new
            {
                productID = p.ProductID,
                imageUrl = p.ImageUrl,
                productCategories = p.ProductCategories.Select(pc => pc.Category.Name).ToList(),
                productDescriptions = p.ProductDescriptions.ToDictionary(pd => pd.LanguageCode, pd => pd.Description),
                isLocked = p.IsLocked,
                createdAt = p.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ss")
            }).ToList();

            return Ok(formattedProducts);
        }

        [HttpGet("{id}")]
        public IActionResult GetProductById(int id)
        {
            var product = _context.Products
                .Include(p => p.ProductCategories)
                    .ThenInclude(pc => pc.Category)
                .Include(p => p.ProductDescriptions)
                .FirstOrDefault(p => p.ProductID == id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            var formattedProduct = new
            {
                productID = product.ProductID,
                imageUrl = product.ImageUrl,
                productCategories = product.ProductCategories.Select(pc => pc.Category.Name).ToList(),
                productDescriptions = product.ProductDescriptions.ToDictionary(pd => pd.LanguageCode, pd => pd.Description),
                isLocked = product.IsLocked,
                createdAt = product.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ss")
            };

            return Ok(formattedProduct);
        }

        [HttpGet("category/{category}")]
        public IActionResult GetProductsByCategory(string category)
        {
            var categoryEntity = _context.Categories.FirstOrDefault(c => c.Name == category);

            if (categoryEntity == null && category != "logo-bags")
            {
                return NotFound(new { message = "Category not found." });
            }

            var categoryId = categoryEntity?.CategoryID;

            var productsQuery = _context.Products
                .Include(p => p.ProductCategories)
                    .ThenInclude(pc => pc.Category)
                .Include(p => p.ProductDescriptions)
                .AsQueryable();

            if (category == "logo-bags")
            {
                productsQuery = productsQuery.Where(p => !p.ProductCategories.Any(pc =>
                    pc.Category.Name == "branded-folders" || pc.Category.Name == "gift-bags"));
            }
            else if (categoryId != null)
            {
                productsQuery = productsQuery.Where(p => p.ProductCategories.Any(pc => pc.CategoryID == categoryId));
            }

            var products = productsQuery.ToList();

            var formattedProducts = products.Select(p => new
            {
                productID = p.ProductID,
                imageUrl = p.ImageUrl,
                productCategories = p.ProductCategories.Select(pc => pc.Category.Name).ToList(),
                productDescriptions = p.ProductDescriptions.ToDictionary(pd => pd.LanguageCode, pd => pd.Description),
                isLocked = p.IsLocked,
                createdAt = p.CreatedAt.ToString("yyyy-MM-ddTHH:mm:ss")
            }).ToList();

            return Ok(formattedProducts);
        }

        [HttpPost]
        [Authorize]
        public IActionResult AddProduct([FromBody] ProductRequest request)
        {
            if (request == null)
            {
                return BadRequest("No product data provided.");
            }

            try
            {
                var product = new Product
                {
                    ImageUrl = request.ImageUrl,
                    IsLocked = request.IsLocked,
                    CreatedAt = DateTime.UtcNow
                };

                if (request.ProductCategories != null)
                {
                    var categoryIds = _context.Categories
                        .Where(c => request.ProductCategories.Contains(c.Name))
                        .Select(c => c.CategoryID)
                        .ToList();

                    var productCategories = categoryIds.Select(categoryId => new ProductCategory
                    {
                        Product = product,
                        CategoryID = categoryId
                    }).ToList();

                    _context.ProductCategories.AddRange(productCategories);
                }

                if (request.ProductDescriptions != null)
                {
                    var productDescriptions = request.ProductDescriptions
                        .Select(pd => new ProductDescriptionRequest
                        {
                            LanguageCode = pd.Key,
                            Description = pd.Value
                        })
                        .ToList();

                    var productDescriptionEntities = productDescriptions.Select(pd => new ProductDescription
                    {
                        Product = product,
                        LanguageCode = pd.LanguageCode,
                        Description = pd.Description
                    }).ToList();

                    _context.ProductDescriptions.AddRange(productDescriptionEntities);
                }

                _context.Products.Add(product);
                _context.SaveChanges();

                return Ok(new { message = "Product added successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("upload")]
        [Authorize]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new { message = "No file uploaded" });
            }

            var allowedExtensions = new[] { ".jpg", ".jpeg", ".png" };
            var fileExtension = Path.GetExtension(file.FileName).ToLower();

            if (Array.IndexOf(allowedExtensions, fileExtension) == -1)
            {
                return BadRequest(new { message = "Invalid file type. Only image files are allowed." });
            }

            var originalName = Path.GetFileNameWithoutExtension(file.FileName);
            var timeStamp = DateTime.Now.ToString("yyyy-MM-dd_HH-mm-ss");
            var newFileName = $"{originalName}_{timeStamp}{fileExtension}";

            var filePath = Path.Combine(_uploadsPath, newFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            return Ok(new { message = "File uploaded successfully", filePath = $"/uploads/{newFileName}" });
        }

        [HttpPost("{id}/lock")]
        [Authorize]
        public IActionResult LockProduct(int id, [FromBody] LockRequest request)
        {
            var product = _context.Products.FirstOrDefault(p => p.ProductID == id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            var lockDuration = TimeSpan.FromMinutes(30);
            var now = DateTime.UtcNow;

            var productsLockedByUser = _context.Products
                .Where(p => p.LockedBy == request.UserId && p.ProductID != id && p.IsLocked)
                .ToList();

            foreach (var lockedProduct in productsLockedByUser)
            {
                lockedProduct.IsLocked = false;
                lockedProduct.LockedBy = null;
                lockedProduct.LockedAt = null;
            }

            if (product.IsLocked)
            {
                if (product.LockedAt.HasValue && now - product.LockedAt > lockDuration)
                {
                    product.LockedBy = request.UserId;
                    product.LockedAt = now;
                    _context.SaveChanges();
                    return Ok(new { message = "Product lock has been reassigned due to timeout." });
                }

                if (product.LockedBy != request.UserId)
                {
                    return BadRequest("Product is locked by another user.");
                }

                return Ok(new { message = "You already have access to this product." });
            }

            product.IsLocked = true;
            product.LockedBy = request.UserId;
            product.LockedAt = now;
            _context.SaveChanges();

            return Ok(new { message = "Product locked successfully." });
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateProduct(int id, [FromBody] ProductRequest request)
        {
            if (request == null)
            {
                return BadRequest("No product data provided.");
            }

            var product = _context.Products
                .Include(p => p.ProductCategories)
                .Include(p => p.ProductDescriptions)
                .FirstOrDefault(p => p.ProductID == id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            var currentUserId = User.FindFirst("id")?.Value;

            int userId = int.Parse(currentUserId);
            if (product.IsLocked && product.LockedBy != userId)
            {
                return BadRequest("You cannot edit this product. It is locked by another user.");
            }

            try
            {
                product.ImageUrl = request.ImageUrl;

                if (request.ProductCategories != null)
                {
                    var existingCategories = product.ProductCategories.ToList();
                    _context.ProductCategories.RemoveRange(existingCategories);

                    var categoryIds = _context.Categories
                        .Where(c => request.ProductCategories.Contains(c.Name))
                        .Select(c => c.CategoryID)
                        .ToList();

                    var productCategories = categoryIds.Select(categoryId => new ProductCategory
                    {
                        ProductID = product.ProductID,
                        CategoryID = categoryId
                    }).ToList();

                    _context.ProductCategories.AddRange(productCategories);
                }

                if (request.ProductDescriptions != null)
                {
                    foreach (var pd in request.ProductDescriptions)
                    {
                        var existingDescription = product.ProductDescriptions
                            .FirstOrDefault(d => d.LanguageCode == pd.Key);

                        if (existingDescription != null)
                        {
                            existingDescription.Description = pd.Value;
                        }
                        else
                        {
                            product.ProductDescriptions.Add(new ProductDescription
                            {
                                ProductID = product.ProductID,
                                LanguageCode = pd.Key,
                                Description = pd.Value
                            });
                        }
                    }
                }

                product.IsLocked = false;
                product.LockedBy = null;
                product.LockedAt = null;

                _context.SaveChanges();

                return Ok(new { message = "Product updated successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteProduct(int id)
        {
            var product = _context.Products
                .Include(p => p.ProductCategories)
                .Include(p => p.ProductDescriptions)
                .FirstOrDefault(p => p.ProductID == id);

            if (product == null)
            {
                return NotFound("Product not found.");
            }

            try
            {
                _context.Products.Remove(product);
                _context.SaveChanges();

                return Ok(new { message = "Product deleted successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
