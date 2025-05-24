using System;
using System.Collections.Generic;

namespace MeganomPoligraph.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<ProductCategory> ProductCategories { get; set; }
        public ICollection<ProductDescription> ProductDescriptions { get; set; }
        public bool IsLocked { get; set; }
        public int? LockedBy { get; set; }
        public DateTime? LockedAt { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
