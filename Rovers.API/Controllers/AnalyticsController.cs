using Microsoft.AspNetCore.Mvc;
using Rovers.API.Services;

namespace Rovers.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyticsController : ControllerBase
    {
        private readonly AnalyticsService _service;

        public AnalyticsController(AnalyticsService service)
        {
            _service = service;
        }

        [HttpGet("matches/{id}/summary")]
        public async Task<IActionResult> GetMatchSummary(int id)
        {
            var summary = await _service.GetMatchSummaryAsync(id);
            return summary is null ? NotFound() : Ok(summary);
        }
    }
}
