using System.Text.Json.Serialization;

namespace Rovers.API.Models
{
    public class EventType
    {
        public int Id { get; set; }

        public string Name { get; set; } = "";

        // e.g. Defence, Attack, Discipline, Error, Breakdown
        public string? Category { get; set; }

        // Maps to a stat field on PlayerMatchStat, e.g. TackMade, Missed, Carries
        [JsonPropertyName("stat_field")]
        public string? StatField { get; set; }

        [JsonPropertyName("is_positive")]
        public bool? IsPositive { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
