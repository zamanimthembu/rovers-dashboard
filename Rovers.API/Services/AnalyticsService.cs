using Microsoft.EntityFrameworkCore;
using Rovers.API.Data;

namespace Rovers.API.Services
{
    public class MatchSummary
    {
        public int MatchId { get; set; }
        public string MatchTitle { get; set; } = "";
        public int TotalPlayers { get; set; }
        public double AveragePerformancePct { get; set; }
        public double TotalKpiScore { get; set; }
        public int KpisMet { get; set; }
        public int KpisMissed { get; set; }
        public int TotalEventsCoded { get; set; }
    }

    public class AnalyticsService
    {
        private readonly RoversDbContext _db;

        public AnalyticsService(RoversDbContext db)
        {
            _db = db;
        }

        public async Task<MatchSummary?> GetMatchSummaryAsync(int matchId)
        {
            var match = await _db.Matches.FindAsync(matchId);
            if (match is null) return null;

            var stats = await _db.PlayerMatchStats
                                 .Where(s => s.MatchId == matchId)
                                 .ToListAsync();

            var kpis = await _db.TeamKpis
                                .Where(k => k.MatchId == matchId)
                                .ToListAsync();

            var eventCount = await _db.MatchEvents
                                      .Where(e => e.MatchId == matchId)
                                      .CountAsync();

            return new MatchSummary
            {
                MatchId              = matchId,
                MatchTitle           = match.MatchTitle,
                TotalPlayers         = stats.Count,
                AveragePerformancePct = stats.Count > 0
                    ? Math.Round(stats.Average(s => s.PerformancePct ?? 0) * 100, 1)
                    : 0,
                TotalKpiScore  = stats.Sum(s => s.KpiScore ?? 0),
                KpisMet        = kpis.Count(k => k.MetTarget == true),
                KpisMissed     = kpis.Count(k => k.MetTarget == false),
                TotalEventsCoded = eventCount,
            };
        }
    }
}
