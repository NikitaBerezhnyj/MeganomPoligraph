namespace MeganomPoligraph.Models.RequestsModels
{
    public class AuthRequest
    {
        public string? Name { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }

}