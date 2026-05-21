using Microsoft.EntityFrameworkCore;
using Rovers.API.Data;
using Rovers.API.Models;

namespace Rovers.API.Services
{
    public class EventTypeService
    {
        private readonly RoversDbContext _db;

        public EventTypeService(RoversDbContext db)
        {
            _db = db;
        }

        public async Task<List<EventType>> GetAllAsync() =>
            await _db.EventTypes
                     .OrderBy(et => et.Category)
                     .ThenBy(et => et.Name)
                     .ToListAsync();
    }
}
