using Rovers.API.Models;

namespace Rovers.API.Services
{
    public class MatchEventService
    {
        private readonly List<MatchEvent> _events = new();
        private int _nextId = 1;

        public IReadOnlyList<MatchEvent> GetAll() => _events.AsReadOnly();

        public IReadOnlyList<MatchEvent> GetRecent(int count = 50) =>
            _events.OrderByDescending(e => e.CreatedAt).Take(count).ToList().AsReadOnly();

        public MatchEvent Add(MatchEventDto dto)
        {
            var matchEvent = new MatchEvent
            {
                Id = _nextId++,
                PlayerName = dto.PlayerName,
                EventType = dto.EventType,
                MatchTime = dto.MatchTime,
                Notes = dto.Notes,
                CreatedAt = DateTime.UtcNow,
            };
            _events.Add(matchEvent);
            return matchEvent;
        }
    }
}
