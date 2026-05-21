using System.Text.Json.Serialization;

namespace Rovers.API.Models
{
    // Master player register — identity and position data only.
    // Statistical output per match is stored in PlayerMatchStats.
    public class PlayerProfile
    {
        public int Id { get; set; }

        [JsonPropertyName("full_name")]
        public string FullName { get; set; } = "";

        [JsonPropertyName("short_name")]
        public string? ShortName { get; set; }

        [JsonPropertyName("primary_position")]
        public string? PrimaryPosition { get; set; }

        [JsonPropertyName("position_group")]
        public string? PositionGroup { get; set; }

        [JsonPropertyName("jersey_number")]
        public int? JerseyNumber { get; set; }

        [JsonPropertyName("is_active")]
        public bool IsActive { get; set; } = true;

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<PlayerMatchStat> MatchStats { get; set; } = new List<PlayerMatchStat>();
    }
}
