using MeganomPoligraph.Models;

namespace MeganomPoligraph.Services
{
    public interface IAuthService
    {
        void CreatePasswordHash(string password, out byte[] passwordHash);
        bool VerifyPassword(string password, byte[] storedHash);
        string GenerateJwtToken(Admin admin);
    }
}
