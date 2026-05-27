using Microsoft.AspNetCore.Mvc;
using Rovers.API.DTOs;
using Rovers.API.Models;
using Rovers.API.Services;

namespace Rovers.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly PlayerService _service;

        public PlayersController(PlayerService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpPost]
        public IActionResult Add(PlayerDto dto)
        {
            var player = new Player
            {
                Pos = dto.Pos,
                Name = dto.Name,
                TackMade = dto.TackMade,
                TackAss = dto.TackAss,
                Missed = dto.Missed,
                Carries = dto.Carries,
                Offloads = dto.Offloads,
                LineBreaks = dto.LineBreaks,
                RucksClean = dto.RucksClean,
                TurnOvers = dto.TurnOvers,
                PenC = dto.PenC,
                HandErr = dto.HandErr,
                Target = dto.Target,
                TimePlay = dto.TimePlay,
                KpiScore = dto.KpiScore,
                PerformancePct = dto.PerformancePct,
            };

            return Ok(_service.Add(player));
        }
    }
}
