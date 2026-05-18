using System.Text.Json.Serialization;

namespace Rovers.API.Models
{
    public class Player
    {
        public int Pos { get; set; }
        public string Name { get; set; } = "";

        [JsonPropertyName("tack_made")]
        public double? TackMade { get; set; }

        [JsonPropertyName("tack_ass")]
        public double? TackAss { get; set; }

        public double? Missed { get; set; }
        public double? Carries { get; set; }
        public double? Offloads { get; set; }

        [JsonPropertyName("line_breaks")]
        public double? LineBreaks { get; set; }

        [JsonPropertyName("rucks_clean")]
        public double? RucksClean { get; set; }

        [JsonPropertyName("turn_overs")]
        public double? TurnOvers { get; set; }

        [JsonPropertyName("pen_c")]
        public double? PenC { get; set; }

        [JsonPropertyName("hand_err")]
        public double? HandErr { get; set; }

        public double? Target { get; set; }

        [JsonPropertyName("time_play")]
        public double? TimePlay { get; set; }

        [JsonPropertyName("kpi_score")]
        public double? KpiScore { get; set; }

        [JsonPropertyName("performance_pct")]
        public double? PerformancePct { get; set; }
    }
}
