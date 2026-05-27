using System.Text.Json.Serialization;

namespace Rovers.API.Models
{
    public class MatchEventDto
    {
        [JsonPropertyName("match_id")]
        public int? MatchId { get; set; }

        [JsonPropertyName("player_name")]
        public string PlayerName { get; set; } = "";

        [JsonPropertyName("event_type")]
        public string EventType { get; set; } = "";

        [JsonPropertyName("match_time")]
        public string MatchTime { get; set; } = "";

        public string Notes { get; set; } = "";
    }
}
