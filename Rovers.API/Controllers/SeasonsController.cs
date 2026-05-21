using Microsoft.AspNetCore.Mvc;
using Rovers.API.Services;

namespace Rovers.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeasonsController : ControllerBase
    {
        private readonly SeasonService _service;

        public SeasonsController(SeasonService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _service.GetAllAsync());

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var season = await _service.GetByIdAsync(id);
            return season is null ? NotFound() : Ok(season);
        }
    }
}
