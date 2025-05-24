namespace MeganomPoligraph.Models.RequestsModels
{
    public class ProductRequest
    {
        public int? AdminID { get; set; }
        public string ImageUrl { get; set; }
        public bool IsLocked { get; set; }
        public List<string> ProductCategories { get; set; }
        public Dictionary<string, string> ProductDescriptions { get; set; }
    }
}