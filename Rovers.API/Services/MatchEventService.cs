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
            // Resolve Player FK — match on FullName or ShortName
            var player = await _db.Players
                .FirstOrDefaultAsync(p =>
                    p.FullName == dto.PlayerName ||
                    p.ShortName == dto.PlayerName);

            // Resolve EventType FK — match on Name
            var eventType = await _db.EventTypes
                .FirstOrDefaultAsync(et => et.Name == dto.EventType);

            var matchEvent = new MatchEvent
            {
                MatchId      = dto.MatchId ?? 1,
                PlayerId     = player?.Id,
                EventTypeId  = eventType?.Id,
                PlayerName   = dto.PlayerName,
                EventType    = dto.EventType,
                MatchTime    = dto.MatchTime,
                Notes        = dto.Notes,
                CreatedAt    = DateTime.UtcNow,
            };

            _db.MatchEvents.Add(matchEvent);
            await _db.SaveChangesAsync();
            return matchEvent;
        }
    }
}
