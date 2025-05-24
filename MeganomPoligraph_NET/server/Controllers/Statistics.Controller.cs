using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using MeganomPoligraph.Data;
using MeganomPoligraph.Configs;
using MeganomPoligraph.Models;
using MeganomPoligraph.Models.RequestsModels;
using MeganomPoligraph.Models.Enums;
using Microsoft.AspNetCore.Authorization;

namespace MeganomPoligraph.Controllers
{
    [Route("api/statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StatisticsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetStatisticsData(string timePeriod = "all")
        {
            DateTime currentDate = DateTime.Now;

            DateTime startDate;

            switch (timePeriod.ToLower())
            {
                case "month":
                    startDate = new DateTime(currentDate.Year, currentDate.Month, 1);
                    break;
                case "year":
                    startDate = new DateTime(currentDate.Year, 1, 1);
                    break;
                case "all":
                default:
                    startDate = DateTime.MinValue;
                    break;
            }

            int totalUsers = _context.Visitors.Count(u => u.VisitTime >= startDate);
            int uniqueUsers = _context.Visitors.Count(u => u.IsUnique == true && u.VisitTime >= startDate);
            int totalRequests = _context.Requests.Count(r => r.CreatedAt >= startDate);

            var statistics = new
            {
                TotalUsers = totalUsers,
                UniqueUsers = uniqueUsers,
                TotalRequests = totalRequests
            };

            return Ok(statistics);
        }

        [HttpGet("requests")]
        [Authorize]
        public IActionResult GetAllRequests()
        {
            var requests = _context.Requests.Include(r => r.AssignedAdmin).ToList();

            if (requests == null || !requests.Any())
            {
                return NotFound(new { message = "No requests found." });
            }

            var response = requests.Select(request => new 
            {
                request.RequestID,
                request.Name,
                request.Phone,
                request.Email,
                request.Type,
                request.Size,
                request.Material,
                request.Print,
                request.Embossing,
                request.Handles,
                request.Circulation,
                request.Notes,
                Status = Enum.GetName(typeof(RequestStatus), request.Status),
                AssignedAdminId = request.AssignedAdminId,
                AssignedAdmin = request.AssignedAdmin != null ? request.AssignedAdmin.Name : null,
                request.CreatedAt,
            }).ToList();

            Console.WriteLine(response);

            return Ok(response);
        }
    }
}
