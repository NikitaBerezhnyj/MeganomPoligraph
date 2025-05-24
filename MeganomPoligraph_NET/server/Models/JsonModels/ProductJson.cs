namespace MeganomPoligraph.Models.JsonModels
{
    public class ProductJson
    {
        public string imageUrl { get; set; }
        public List<string> productCategories { get; set; }
        public Dictionary<string, string> productDescriptions { get; set; }
        public bool isLocked { get; set; }
    }
}