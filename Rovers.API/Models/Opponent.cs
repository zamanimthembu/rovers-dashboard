namespace Rovers.API.Models
{
    public class Opponent
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string? ShortName { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Match> Matches { get; set; } = new List<Match>();
    }
}
