using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using MeganomPoligraph.Data;
using MeganomPoligraph.Configs;
using MeganomPoligraph.Models;
using MeganomPoligraph.Models.RequestsModels;
using MeganomPoligraph.Utils;
using Microsoft.AspNetCore.Authorization;

namespace MeganomPoligraph.Controllers
{
    [Route("api")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly SmtpSettings _smtpSettings;
        
        public ClientController(ApplicationDbContext context, IOptions<SmtpSettings> smtpSettings)
        {
            _context = context;
            _smtpSettings = smtpSettings.Value;
        }

        [HttpPost("visit")]
        public IActionResult TrackVisitor([FromBody] VisitRequest visitorData)
        {
            try
            {
                var ipAddress = HttpContext.Connection.RemoteIpAddress.ToString();
                var userAgent = Request.Headers["User-Agent"].ToString();
                var visitTime = DateTime.UtcNow;

                var existingVisitor = _context.Visitors
                    .FirstOrDefault(v => v.IPAddress == ipAddress && v.UserAgent == userAgent);

                if (existingVisitor != null)
                {
                    existingVisitor.VisitTime = visitTime;
                    existingVisitor.IsUnique = false;
                    _context.Visitors.Update(existingVisitor);
                }
                else
                {
                    var newVisitor = new Visitor
                    {
                        IPAddress = ipAddress,
                        UserAgent = userAgent,
                        VisitTime = visitTime,
                        IsUnique = true
                    };
                    _context.Visitors.Add(newVisitor);
                }

                _context.SaveChanges();

                return Ok(new { message = "Visitor tracked successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("send_mail")]
        public IActionResult SendMail([FromBody] EmailRequest request)
        {
            if (string.IsNullOrEmpty(_smtpSettings.SenderMail))
            {
                return BadRequest("The sender address is not configured.");
            }
            if (string.IsNullOrEmpty(_smtpSettings.RecipientMail))
            {
                return BadRequest("The recipient address is not configured.");
            }
            if (request == null || string.IsNullOrEmpty(request.Name) || (string.IsNullOrEmpty(request.Phone) && string.IsNullOrEmpty(request.Email)))
            {
                return BadRequest("Invalid input data");
            }

            try
            {
                                string emailBody = $@"
                <div style='width:50%; padding:2.5%; background-color:#FFFFFF; margin:auto; border:1px solid #999999;'>
                    <div style='padding:2.5%; color:#333333; background-color:#F5F5F5; font-size:1.25rem; border:1px solid #999999;'>
                        <h1 style='text-align:center; color:#2498EE;'>Замовлення з сайту!</h1>
                        <p><strong>Ім'я:</strong> {request.Name}</p>
                        <hr style='border-color: #999999;'>
                        <p><strong>Телефон:</strong> {MappedValue.GetMappedValue(request.Phone)}</p>
                        <hr style='border-color: #999999;'>
                        <p><strong>E-Mail:</strong> {MappedValue.GetMappedValue(request.Email)}</p>
                        <hr style='border-color: #999999;'>
                        <p><strong>Тип:</strong> {MappedValue.GetMappedValue(request.Type, dictionaryType: "type")}</p>
                        <p><strong>Розмір:</strong> {MappedValue.GetMappedValue(request.Size)}</p>
                        <p><strong>Матеріал:</strong> {MappedValue.GetMappedValue(request.Material, dictionaryType: "material")}</p>
                        <p><strong>Друк:</strong> {MappedValue.GetMappedValue(request.Print, dictionaryType: "print")}</p>
                        <p><strong>Тиснення:</strong> {MappedValue.GetMappedValue(request.Embossing, dictionaryType: "embossing")}</p>
                        <p><strong>Ручки:</strong> {MappedValue.GetMappedValue(request.Handles, dictionaryType: "handles")}</p>
                        <p><strong>Тираж:</strong> {request.Circulation}</p>
                        <p><strong>Мова:</strong> {request.Language}</p>
                        <hr style='border-color: #999999;'>
                        <p><strong>Повідомлення:</strong> {MappedValue.GetMappedValue(request.Notes)}</p>
                    </div>
                </div>";

                SmtpClient smtpClient = new SmtpClient(_smtpSettings.Host, _smtpSettings.Port)
                {
                    Credentials = new NetworkCredential(_smtpSettings.SenderMail, _smtpSettings.SenderPassword),
                    EnableSsl = true
                };

                MailMessage mailMessage = new MailMessage
                {
                    From = new MailAddress(_smtpSettings.SenderMail),
                    Subject = "Замовлення з сайту",
                    Body = emailBody,
                    IsBodyHtml = true
                };

                mailMessage.To.Add(_smtpSettings.RecipientMail);

                smtpClient.Send(mailMessage);

                var requestToSave = new Request
                {
                    Name = request.Name,
                    Phone = string.IsNullOrEmpty(request.Phone) ? null : request.Phone,
                    Email = string.IsNullOrEmpty(request.Email) ? null : request.Email,
                    Type = string.IsNullOrEmpty(request.Type) ? null : request.Type,
                    Size = string.IsNullOrEmpty(request.Size) ? null : request.Size,
                    Material = string.IsNullOrEmpty(request.Material) ? null : request.Material,
                    Print = string.IsNullOrEmpty(request.Print) ? null : request.Print,
                    Embossing = string.IsNullOrEmpty(request.Embossing) ? null : request.Embossing,
                    Handles = string.IsNullOrEmpty(request.Handles) ? null : request.Handles,
                    Circulation = request.Circulation,
                    Notes = string.IsNullOrEmpty(request.Notes) ? null : request.Notes,
                    Language = request.Language
                };

                _context.Requests.Add(requestToSave);
                _context.SaveChanges();

                return Ok(new { message = "Letter sent successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
