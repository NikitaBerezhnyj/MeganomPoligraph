using MeganomPoligraph.Models.Enums;

namespace MeganomPoligraph.Models
{
    public class Request
    {
        public int RequestID { get; set; }
        public string Name { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Type { get; set; }
        public string? Size { get; set; }
        public string? Material { get; set; }
        public string? Print { get; set; }
        public string? Embossing { get; set; }
        public string? Handles { get; set; }
        public int Circulation { get; set; }
        public string? Notes { get; set; }
        public RequestStatus Status { get; set; } = RequestStatus.New;
        public int? AssignedAdminId { get; set; }
        public Admin? AssignedAdmin { get; set; }
        public string Language { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
