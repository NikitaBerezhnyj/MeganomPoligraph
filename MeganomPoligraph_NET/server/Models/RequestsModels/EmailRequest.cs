using System.Text.Json.Serialization;

namespace MeganomPoligraph.Models.RequestsModels
{
    public class EmailRequest
    {
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("email")]
        public string? Email { get; set; }
        [JsonPropertyName("phone")]
        public string? Phone { get; set; }
        [JsonPropertyName("type")]
        public string? Type { get; set; }
        [JsonPropertyName("size")]
        public string? Size { get; set; }
        [JsonPropertyName("material")]
        public string? Material { get; set; }
        [JsonPropertyName("print")]
        public string? Print { get; set; }
        [JsonPropertyName("embossing")]
        public string? Embossing { get; set; }
        [JsonPropertyName("handles")]
        public string? Handles { get; set; }
        [JsonPropertyName("circulation")]
        public int Circulation { get; set; }
        [JsonPropertyName("notes")]
        public string? Notes { get; set; }
        [JsonPropertyName("language")]
        public string Language { get; set; }
    }
}
