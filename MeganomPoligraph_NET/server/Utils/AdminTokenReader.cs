using System.Security.Claims;

namespace MeganomPoligraph.Utils
{
    public static class AdminTokenReader
    {
        public static bool TryGetAdminIdFromToken(ClaimsPrincipal user, out int adminId, out string? errorMessage)
        {
            adminId = 0;
            errorMessage = null;

            var idClaim = user.Claims.FirstOrDefault(c => c.Type == "id")?.Value;
            if (idClaim == null)
            {
                errorMessage = "Missing admin ID in token.";
                return false;
            }

            if (!int.TryParse(idClaim, out adminId))
            {
                errorMessage = "Invalid admin ID format in token.";
                return false;
            }

            return true;
        }
    }
}
