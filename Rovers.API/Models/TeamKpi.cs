using System.Text.Json.Serialization;

namespace Rovers.API.Models
{
    public class TeamKpi
    {
        public int Id { get; set; }

        [JsonPropertyName("match_id")]
        public int MatchId { get; set; }

        [JsonPropertyName("metric_name")]
        public string MetricName { get; set; } = "";

        [JsonPropertyName("target_value")]
        public double? TargetValue { get; set; }

        [JsonPropertyName("actual_value")]
        public double? ActualValue { get; set; }

        public string? Unit { get; set; }

        [JsonPropertyName("met_target")]
        public bool? MetTarget { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public Match? Match { get; set; }
    }
}
