using System.Text.Json.Serialization;

namespace Rovers.API.Models
{
    public class Match
    {
        public int Id { get; set; }

        [JsonPropertyName("season_id")]
        public int SeasonId { get; set; }

        [JsonPropertyName("opponent_id")]
        public int OpponentId { get; set; }

        [JsonPropertyName("match_date")]
        public DateTime? MatchDate { get; set; }

        public string? Venue { get; set; }
        public string? Competition { get; set; }

        [JsonPropertyName("match_title")]
        public string MatchTitle { get; set; } = "";

        [JsonPropertyName("rovers_score")]
        public int? RoversScore { get; set; }

        [JsonPropertyName("opponent_score")]
        public int? OpponentScore { get; set; }

        public string? Result { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Season? Season { get; set; }
        public Opponent? Opponent { get; set; }
        public ICollection<PlayerMatchStat> PlayerStats { get; set; } = new List<PlayerMatchStat>();
        public ICollection<TeamKpi> TeamKpis { get; set; } = new List<TeamKpi>();
        public ICollection<MatchEvent> Events { get; set; } = new List<MatchEvent>();
    }
}
