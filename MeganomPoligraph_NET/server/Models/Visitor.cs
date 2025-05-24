namespace MeganomPoligraph.Models
{
    public class Visitor
    {
        public int VisitorID { get; set; }
        public string IPAddress { get; set; }
        public string UserAgent { get; set; }
        public DateTime VisitTime { get; set; } = DateTime.UtcNow;
        public bool IsUnique { get; set; }
    }
}
