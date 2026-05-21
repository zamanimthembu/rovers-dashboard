namespace Rovers.API.Models
{
    public class Season
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Year { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<Match> Matches { get; set; } = new List<Match>();
    }
}
