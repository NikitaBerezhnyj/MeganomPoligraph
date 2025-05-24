using Microsoft.AspNetCore.Mvc;
using MeganomPoligraph.Data;
using MeganomPoligraph.Models;
using MeganomPoligraph.Models.RequestsModels;
using MeganomPoligraph.Models.Enums;
using MeganomPoligraph.Services;
using MeganomPoligraph.Utils;
using Microsoft.AspNetCore.Authorization;


namespace MeganomPoligraph.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ApplicationDbContext _context;

        public AdminController(IAuthService authService, ApplicationDbContext context)
        {
            _authService = authService;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetAllAdmins()
        {
            var admins = _context.Admins.ToList();

            if (admins == null || !admins.Any())
            {
                return NotFound(new { message = "No administrators found." });
            }

            return Ok(admins);
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetAdminById(int id)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.AdminID == id);

            if (admin == null)
            {
                return NotFound(new { message = "Administrator not found." });
            }

            return Ok(admin);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] AuthRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Login) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Login and password required." });
            }

            Admin? admin = _context.Admins.FirstOrDefault(a => a.Login == request.Login);
            if (admin == null)
            {
                return Unauthorized(new { message = "Incorrect Login or password." });
            }

            byte[] storedHash = Convert.FromBase64String(admin.Password);

            if (!_authService.VerifyPassword(request.Password, storedHash))
            {
                return Unauthorized(new { message = "Incorrect Login or password." });
            }

            string token = _authService.GenerateJwtToken(admin);

            return Ok(new { message = "Login successful.", jwt_token = token });
        }

        [HttpPost("register")]
        [Authorize]
        public IActionResult Register([FromBody] AuthRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Login) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest(new { message = "Login and password required." });
            }

            if (_context.Admins.Any(a => a.Login == request.Login))
            {
                return Conflict(new { message = "Administrator with this login already exists." });
            }

            _authService.CreatePasswordHash(request.Password, out byte[] passwordHash);

            var newAdmin = new Admin
            {
                Name = request.Name,
                Login = request.Login,
                Password = Convert.ToBase64String(passwordHash),
                Role = request.Role
            };

            _context.Admins.Add(newAdmin);
            _context.SaveChanges();

            return Ok(new { message = "Administrator registered successfully!" });
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult UpdateAdmin(int id, [FromBody] UpdateAdminRequest request)
        {
            if (request == null || (string.IsNullOrEmpty(request.Name) && string.IsNullOrEmpty(request.Login) && string.IsNullOrEmpty(request.Password)))
            {
                return BadRequest(new { message = "At least one field (Name, Login, or Password) must be provided." });
            }

            var admin = _context.Admins.FirstOrDefault(a => a.AdminID == id);
            if (admin == null)
            {
                return NotFound(new { message = "Administrator not found." });
            }

            if (!string.IsNullOrEmpty(request.Name))
            {
                admin.Name = request.Name;
            }

            if (!string.IsNullOrEmpty(request.Login))
            {
                admin.Login = request.Login;
            }

            if (!string.IsNullOrEmpty(request.Password))
            {
                _authService.CreatePasswordHash(request.Password, out byte[] passwordHash);
                admin.Password = Convert.ToBase64String(passwordHash);
            }

            _context.SaveChanges();

            return Ok(new { message = "Administrator updated successfully." });
        }

        [HttpPut("request/{requestId}/status")]
        [Authorize]
        public IActionResult ChangeRequestStatus(int requestId, [FromBody] ChangeRequestStatusRequest request)
        {
            var order = _context.Requests.FirstOrDefault(r => r.RequestID == requestId);
            if (order == null)
            {
                return NotFound(new { message = "Request not found." });
            }

            if (!AdminTokenReader.TryGetAdminIdFromToken(User, out int parsedAdminId, out string? error))
            {
                return Unauthorized(new { message = error });
            }

            if (!Enum.TryParse<RequestStatus>(request.Status, true, out var status))
            {
                return BadRequest(new { message = "Invalid status value." });
            }

            if (status == RequestStatus.New)
            {
                order.AssignedAdminId = null;
            }
            else
            {
                order.AssignedAdminId = parsedAdminId;
            }

            order.Status = status;

            _context.SaveChanges();

            return Ok(new { message = "Request status updated successfully." });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult DeleteAdmin(int id)
        {
            var admin = _context.Admins.FirstOrDefault(a => a.AdminID == id);
            if (admin == null)
            {
                return NotFound(new { message = "Administrator not found." });
            }

            if (admin.Role == "SuperAdmin")
            {
                var otherSuperAdmins = _context.Admins.Count(a => a.Role == "SuperAdmin" && a.AdminID != id);

                if (otherSuperAdmins == 0)
                {
                    return BadRequest(new { message = "Cannot delete the last SuperAdmin. The system must have at least one." });
                }
            }

            _context.Admins.Remove(admin);
            _context.SaveChanges();

            return Ok(new { message = "Administrator deleted successfully." });
        }
    }
}
