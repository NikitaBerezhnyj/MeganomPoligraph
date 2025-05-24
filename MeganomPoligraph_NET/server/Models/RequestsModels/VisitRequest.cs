using System.Text.Json.Serialization;

namespace MeganomPoligraph.Models.RequestsModels
{
    public class VisitRequest
    {
        public string IPAddress { get; set; }
        public string UserAgent { get; set; }
        public DateTime VisitTime { get; set; }
    }
}
