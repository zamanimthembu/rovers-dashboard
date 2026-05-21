using Microsoft.EntityFrameworkCore;
using Rovers.API.Models;

namespace Rovers.API.Data
{
    public class RoversDbContext : DbContext
    {
        public RoversDbContext(DbContextOptions<RoversDbContext> options) : base(options) { }

        public DbSet<Season> Seasons { get; set; }
        public DbSet<Opponent> Opponents { get; set; }
        public DbSet<Match> Matches { get; set; }
        public DbSet<PlayerProfile> Players { get; set; }
        public DbSet<PlayerMatchStat> PlayerMatchStats { get; set; }
        public DbSet<TeamKpi> TeamKpis { get; set; }
        public DbSet<EventType> EventTypes { get; set; }
        public DbSet<MatchEvent> MatchEvents { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ── Season ───────────────────────────────────────────────────────
            modelBuilder.Entity<Season>(e =>
            {
                e.HasKey(s => s.Id);
                e.Property(s => s.Name).IsRequired().HasMaxLength(100);
            });

            // ── Opponent ──────────────────────────────────────────────────────
            modelBuilder.Entity<Opponent>(e =>
            {
                e.HasKey(o => o.Id);
                e.Property(o => o.Name).IsRequired().HasMaxLength(100);
                e.Property(o => o.ShortName).HasMaxLength(20);
            });

            // ── Match ─────────────────────────────────────────────────────────
            modelBuilder.Entity<Match>(e =>
            {
                e.HasKey(m => m.Id);
                e.Property(m => m.MatchTitle).IsRequired().HasMaxLength(200);
                e.Property(m => m.Venue).HasMaxLength(100);
                e.Property(m => m.Competition).HasMaxLength(100);
                e.Property(m => m.Result).HasMaxLength(10);

                e.HasOne(m => m.Season)
                 .WithMany(s => s.Matches)
                 .HasForeignKey(m => m.SeasonId);

                e.HasOne(m => m.Opponent)
                 .WithMany(o => o.Matches)
                 .HasForeignKey(m => m.OpponentId);
            });

            // ── PlayerProfile ────────────────────────────────────────────────
            modelBuilder.Entity<PlayerProfile>(e =>
            {
                e.HasKey(p => p.Id);
                e.ToTable("Players");
                e.Property(p => p.FullName).IsRequired().HasMaxLength(100);
                e.Property(p => p.ShortName).HasMaxLength(30);
                e.Property(p => p.PrimaryPosition).HasMaxLength(50);
                e.Property(p => p.PositionGroup).HasMaxLength(20);
            });

            // ── PlayerMatchStat ───────────────────────────────────────────────
            modelBuilder.Entity<PlayerMatchStat>(e =>
            {
                e.HasKey(s => s.Id);

                // One player cannot have two stat rows for the same match
                e.HasIndex(s => new { s.MatchId, s.PlayerId }).IsUnique();

                e.HasOne(s => s.Match)
                 .WithMany(m => m.PlayerStats)
                 .HasForeignKey(s => s.MatchId);

                e.HasOne(s => s.Player)
                 .WithMany(p => p.MatchStats)
                 .HasForeignKey(s => s.PlayerId);
            });

            // ── TeamKpi ───────────────────────────────────────────────────────
            modelBuilder.Entity<TeamKpi>(e =>
            {
                e.HasKey(k => k.Id);
                e.Property(k => k.MetricName).IsRequired().HasMaxLength(100);
                e.Property(k => k.Unit).HasMaxLength(20);

                e.HasOne(k => k.Match)
                 .WithMany(m => m.TeamKpis)
                 .HasForeignKey(k => k.MatchId);
            });

            // ── EventType ─────────────────────────────────────────────────────
            modelBuilder.Entity<EventType>(e =>
            {
                e.HasKey(et => et.Id);
                e.Property(et => et.Name).IsRequired().HasMaxLength(50);
                e.Property(et => et.Category).HasMaxLength(30);
                e.Property(et => et.StatField).HasMaxLength(30);
            });

            // ── MatchEvent ────────────────────────────────────────────────────
            modelBuilder.Entity<MatchEvent>(e =>
            {
                e.HasKey(me => me.Id);
                e.Property(me => me.PlayerName).IsRequired().HasMaxLength(100);
                e.Property(me => me.EventType).IsRequired().HasMaxLength(50);
                e.Property(me => me.MatchTime).HasMaxLength(10);
                e.Property(me => me.Notes).HasMaxLength(500);

                e.HasOne(me => me.Match)
                 .WithMany(m => m.Events)
                 .HasForeignKey(me => me.MatchId)
                 .IsRequired(false);

                e.HasOne(me => me.Player)
                 .WithMany()
                 .HasForeignKey(me => me.PlayerId)
                 .IsRequired(false);

                e.HasOne(me => me.EventTypeNavigation)
                 .WithMany()
                 .HasForeignKey(me => me.EventTypeId)
                 .IsRequired(false);
            });
        }
    }
}
