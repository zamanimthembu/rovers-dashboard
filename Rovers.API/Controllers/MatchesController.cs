using Microsoft.AspNetCore.Mvc;
using Rovers.API.Services;

namespace Rovers.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchesController : ControllerBase
    {
        private readonly MatchService _service;

        public MatchesController(MatchService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var match = await _service.GetByIdAsync(id);
            return match is null ? NotFound() : Ok(match);
        }

        [HttpGet("{id}/players")]
        public async Task<IActionResult> GetPlayerStats(int id) =>
            Ok(await _service.GetPlayerStatsAsync(id));

        [HttpGet("{id}/teamkpis")]
        public async Task<IActionResult> GetTeamKpis(int id) =>
            Ok(await _service.GetTeamKpisAsync(id));

        [HttpGet("{id}/events")]
        public async Task<IActionResult> GetEvents(int id) =>
            Ok(await _service.GetEventsAsync(id));
    }
}
