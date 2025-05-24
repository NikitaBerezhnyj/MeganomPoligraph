using Microsoft.EntityFrameworkCore;
using MeganomPoligraph.Models;

namespace MeganomPoligraph.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<ProductDescription> ProductDescriptions { get; set; }
        public DbSet<ProductCategory> ProductCategories { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Visitor> Visitors { get; set; }
        public DbSet<Request> Requests { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ProductDescription>()
                .HasKey(pd => new { pd.ProductID, pd.LanguageCode });

            modelBuilder.Entity<ProductCategory>()
                .HasKey(pc => new { pc.ProductID, pc.CategoryID });
                        
            modelBuilder.Entity<Request>()
                .Property(r => r.Status)
                .HasConversion<string>();
            
            modelBuilder.Entity<Request>()
                .HasOne(r => r.AssignedAdmin)
                .WithMany()
                .HasForeignKey(r => r.AssignedAdminId)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
