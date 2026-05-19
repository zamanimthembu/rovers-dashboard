using Microsoft.EntityFrameworkCore;
using Rovers.API.Models;

namespace Rovers.API.Data
{
    public class RoversDbContext : DbContext
    {
        public RoversDbContext(DbContextOptions<RoversDbContext> options) : base(options) { }

        public DbSet<MatchEvent> MatchEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MatchEvent>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.PlayerName).IsRequired().HasMaxLength(100);
                entity.Property(e => e.EventType).IsRequired().HasMaxLength(50);
                entity.Property(e => e.MatchTime).HasMaxLength(10);
                entity.Property(e => e.Notes).HasMaxLength(500);
            });
        }
    }
}
