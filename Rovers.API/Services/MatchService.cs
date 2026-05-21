using Microsoft.EntityFrameworkCore;
using Rovers.API.Data;
using Rovers.API.Models;

namespace Rovers.API.Services
{
    public class MatchService
    {
        private readonly RoversDbContext _db;

        public MatchService(RoversDbContext db)
        {
            _db = db;
        }

        public async Task<List<Match>> GetAllAsync() =>
            await _db.Matches
                     .Include(m => m.Season)
                     .Include(m => m.Opponent)
                     .OrderByDescending(m => m.MatchDate)
                     .ToListAsync();

        public async Task<Match?> GetByIdAsync(int id) =>
            await _db.Matches
                     .Include(m => m.Season)
                     .Include(m => m.Opponent)
                     .FirstOrDefaultAsync(m => m.Id == id);

        public async Task<List<PlayerMatchStat>> GetPlayerStatsAsync(int matchId) =>
            await _db.PlayerMatchStats
                     .Include(s => s.Player)
                     .Where(s => s.MatchId == matchId)
                     .OrderBy(s => s.Pos)
                     .ToListAsync();

        public async Task<List<TeamKpi>> GetTeamKpisAsync(int matchId) =>
            await _db.TeamKpis
                     .Where(k => k.MatchId == matchId)
                     .OrderBy(k => k.MetricName)
                     .ToListAsync();

        public async Task<List<MatchEvent>> GetEventsAsync(int matchId) =>
            await _db.MatchEvents
                     .Where(e => e.MatchId == matchId)
                     .OrderByDescending(e => e.CreatedAt)
                     .ToListAsync();
    }
}
