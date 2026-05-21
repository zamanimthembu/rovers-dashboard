using Microsoft.AspNetCore.Mvc;
using Rovers.API.Services;

namespace Rovers.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EventTypesController : ControllerBase
    {
        private readonly EventTypeService _service;

        public EventTypesController(EventTypeService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _service.GetAllAsync());
    }
}
