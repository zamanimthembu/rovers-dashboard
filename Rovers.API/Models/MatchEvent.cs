using System.Text.Json.Serialization;

namespace Rovers.API.Models
{
    public class MatchEvent
    {
        public int Id { get; set; }

        // --- Structured foreign keys (nullable to preserve existing string-based events) ---

        [JsonPropertyName("match_id")]
        public int? MatchId { get; set; }

        [JsonPropertyName("player_id")]
        public int? PlayerId { get; set; }

        [JsonPropertyName("event_type_id")]
        public int? EventTypeId { get; set; }

        // --- Legacy string fields kept for backward compatibility with the Video Coding panel ---

        [JsonPropertyName("player_name")]
        public string PlayerName { get; set; } = "";

        [JsonPropertyName("event_type")]
        public string EventType { get; set; } = "";

        [JsonPropertyName("match_time")]
        public string MatchTime { get; set; } = "";

        public string Notes { get; set; } = "";

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }

        // --- Navigation properties ---
        public Match? Match { get; set; }
        public PlayerProfile? Player { get; set; }
        public EventType? EventTypeNavigation { get; set; }
    }
}
