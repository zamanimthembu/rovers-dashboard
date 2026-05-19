using Microsoft.EntityFrameworkCore;
using Rovers.API.Data;
using Rovers.API.Models;

namespace Rovers.API.Services
{
    public class MatchEventService
    {
        private readonly RoversDbContext _db;

        public MatchEventService(RoversDbContext db)
        {
            _db = db;
        }

        public async Task<List<MatchEvent>> GetAllAsync() =>
            await _db.MatchEvents
                     .OrderByDescending(e => e.CreatedAt)
                     .ToListAsync();

        public async Task<MatchEvent> AddAsync(MatchEventDto dto)
        {
            var matchEvent = new MatchEvent
            {
                PlayerName = dto.PlayerName,
                EventType = dto.EventType,
                MatchTime = dto.MatchTime,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
            };
            _db.MatchEvents.Add(matchEvent);
            await _db.SaveChangesAsync();
            return matchEvent;
        }
    }
}
