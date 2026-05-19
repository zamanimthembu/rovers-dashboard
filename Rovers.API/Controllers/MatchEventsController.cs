using Microsoft.AspNetCore.Mvc;
using Rovers.API.Models;
using Rovers.API.Services;

namespace Rovers.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MatchEventsController : ControllerBase
    {
        private readonly MatchEventService _service;

        public MatchEventsController(MatchEventService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll() => Ok(_service.GetAll());

        [HttpPost]
        public IActionResult Create([FromBody] MatchEventDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.PlayerName) || string.IsNullOrWhiteSpace(dto.EventType))
                return BadRequest("PlayerName and EventType are required.");

            var created = _service.Add(dto);
            return CreatedAtAction(nameof(GetAll), new { id = created.Id }, created);
        }
    }
}
