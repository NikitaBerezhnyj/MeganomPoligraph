namespace MeganomPoligraph.Models
{
    public class ProductDescription
    {
        public int ProductID { get; set; }
        public string LanguageCode { get; set; }
        public string Description { get; set; }
        public Product Product { get; set; }
    }
}
