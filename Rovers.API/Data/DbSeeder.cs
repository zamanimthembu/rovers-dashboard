using Rovers.API.Models;

namespace Rovers.API.Data
{
    // Seeds the initial dataset so the API is immediately useful for analytics.
    // Data is sourced from the rovers_vc_game1_clean.json match.
    // This runs once at startup; if data already exists it is skipped.
    public static class DbSeeder
    {
        public static void Seed(RoversDbContext db)
        {
            if (db.Seasons.Any()) return; // already seeded

            // ── Event Types ───────────────────────────────────────────────────
            var eventTypes = new List<EventType>
            {
                new() { Name = "Tackle Made",      Category = "Defence",    StatField = "TackMade",   IsPositive = true  },
                new() { Name = "Tackle Assist",    Category = "Defence",    StatField = "TackAss",    IsPositive = true  },
                new() { Name = "Missed Tackle",    Category = "Defence",    StatField = "Missed",     IsPositive = false },
                new() { Name = "Carry",            Category = "Attack",     StatField = "Carries",    IsPositive = true  },
                new() { Name = "Offload",          Category = "Attack",     StatField = "Offloads",   IsPositive = true  },
                new() { Name = "Line Break",       Category = "Attack",     StatField = "LineBreaks", IsPositive = true  },
                new() { Name = "Ruck Clean",       Category = "Breakdown",  StatField = "RucksClean", IsPositive = true  },
                new() { Name = "Turnover",         Category = "Breakdown",  StatField = "TurnOvers",  IsPositive = true  },
                new() { Name = "Penalty Conceded", Category = "Discipline", StatField = "PenC",       IsPositive = false },
                new() { Name = "Handling Error",   Category = "Error",      StatField = "HandErr",    IsPositive = false },
            };
            db.EventTypes.AddRange(eventTypes);

            // ── Season ────────────────────────────────────────────────────────
            var season = new Season { Name = "2026 Season", Year = 2026 };
            db.Seasons.Add(season);

            // ── Opponent ──────────────────────────────────────────────────────
            var opponent = new Opponent { Name = "Villager Cricket Club", ShortName = "VC" };
            db.Opponents.Add(opponent);

            db.SaveChanges(); // get IDs for season and opponent

            // ── Match ─────────────────────────────────────────────────────────
            var match = new Match
            {
                SeasonId    = season.Id,
                OpponentId  = opponent.Id,
                MatchDate   = new DateTime(2026, 3, 1, 0, 0, 0, DateTimeKind.Utc),
                Venue       = "Rovers Park",
                Competition = "KwaZulu-Natal Cup",
                MatchTitle  = "vs VC — Game 1",
                RoversScore = 28,
                OpponentScore = 29,
                Result      = "Loss",
            };
            db.Matches.Add(match);
            db.SaveChanges();

            // ── Players (master register) ─────────────────────────────────────
            var players = new List<PlayerProfile>
            {
                new() { FullName = "Jaret",   ShortName = "Jaret",   PrimaryPosition = "Loosehead Prop", PositionGroup = "Forward", JerseyNumber = 1  },
                new() { FullName = "Mr T",    ShortName = "Mr T",    PrimaryPosition = "Hooker",          PositionGroup = "Forward", JerseyNumber = 2  },
                new() { FullName = "Thinus",  ShortName = "Thinus",  PrimaryPosition = "Tighthead Prop",  PositionGroup = "Forward", JerseyNumber = 3  },
                new() { FullName = "Red",     ShortName = "Red",     PrimaryPosition = "Lock",            PositionGroup = "Forward", JerseyNumber = 4  },
                new() { FullName = "Danny",   ShortName = "Danny",   PrimaryPosition = "Lock",            PositionGroup = "Forward", JerseyNumber = 5  },
                new() { FullName = "Nanto",   ShortName = "Nanto",   PrimaryPosition = "Blindside Flanker", PositionGroup = "Forward", JerseyNumber = 6 },
                new() { FullName = "Kevin",   ShortName = "Kevin",   PrimaryPosition = "Openside Flanker",  PositionGroup = "Forward", JerseyNumber = 7 },
                new() { FullName = "Mesuli",  ShortName = "Mesuli",  PrimaryPosition = "Number 8",        PositionGroup = "Forward", JerseyNumber = 8  },
                new() { FullName = "Darryl",  ShortName = "Darryl",  PrimaryPosition = "Scrum Half",      PositionGroup = "Back",    JerseyNumber = 9  },
                new() { FullName = "Inny",    ShortName = "Inny",    PrimaryPosition = "Fly Half",        PositionGroup = "Back",    JerseyNumber = 10 },
                new() { FullName = "Skinny",  ShortName = "Skinny",  PrimaryPosition = "Wing",            PositionGroup = "Back",    JerseyNumber = 11 },
                new() { FullName = "Seun",    ShortName = "Seun",    PrimaryPosition = "Inside Centre",   PositionGroup = "Back",    JerseyNumber = 12 },
                new() { FullName = "Sergio",  ShortName = "Sergio",  PrimaryPosition = "Outside Centre",  PositionGroup = "Back",    JerseyNumber = 13 },
                new() { FullName = "Tythan",  ShortName = "Tythan",  PrimaryPosition = "Wing",            PositionGroup = "Back",    JerseyNumber = 14 },
                new() { FullName = "Quan",    ShortName = "Quan",    PrimaryPosition = "Fullback",        PositionGroup = "Back",    JerseyNumber = 15 },
                new() { FullName = "Pina",    ShortName = "Pina",    PrimaryPosition = "Prop",            PositionGroup = "Forward", JerseyNumber = 16 },
                new() { FullName = "Lucky",   ShortName = "Lucky",   PrimaryPosition = "Hooker",          PositionGroup = "Forward", JerseyNumber = 17 },
                new() { FullName = "Jono",    ShortName = "Jono",    PrimaryPosition = "Prop",            PositionGroup = "Forward", JerseyNumber = 18 },
                new() { FullName = "Stairs",  ShortName = "Stairs",  PrimaryPosition = "Lock",            PositionGroup = "Forward", JerseyNumber = 19 },
                new() { FullName = "Ntsika",  ShortName = "Ntsika",  PrimaryPosition = "Flanker",         PositionGroup = "Forward", JerseyNumber = 20 },
                new() { FullName = "Fanele",  ShortName = "Fanele",  PrimaryPosition = "Back",            PositionGroup = "Back",    JerseyNumber = 21 },
                new() { FullName = "Dylan",   ShortName = "Dylan",   PrimaryPosition = "Back",            PositionGroup = "Back",    JerseyNumber = 22 },
                new() { FullName = "Reuben",  ShortName = "Reuben",  PrimaryPosition = "Back",            PositionGroup = "Back",    JerseyNumber = 23 },
            };
            db.Players.AddRange(players);
            db.SaveChanges();

            // Helper: look up player by jersey number
            PlayerProfile ByNum(int n) => players.First(p => p.JerseyNumber == n);

            // ── Player Match Stats ────────────────────────────────────────────
            var stats = new List<PlayerMatchStat>
            {
                new() { MatchId = match.Id, PlayerId = ByNum(1).Id,  Pos = 1,  TackMade = 2,  TackAss = 2,   Missed = null, Carries = 6,    Offloads = null, LineBreaks = null, RucksClean = 8,  TurnOvers = null, PenC = null, HandErr = null, Target = 23,  TimePlay = 57,  KpiScore = 18, PerformancePct = 0.78 },
                new() { MatchId = match.Id, PlayerId = ByNum(2).Id,  Pos = 2,  TackMade = 3,  TackAss = 1,   Missed = null, Carries = 8,    Offloads = 2,    LineBreaks = null, RucksClean = 4,  TurnOvers = null, PenC = null, HandErr = null, Target = 27,  TimePlay = 57,  KpiScore = 20, PerformancePct = 0.74 },
                new() { MatchId = match.Id, PlayerId = ByNum(3).Id,  Pos = 3,  TackMade = 1,  TackAss = null, Missed = null, Carries = 3,   Offloads = 1,    LineBreaks = null, RucksClean = 6,  TurnOvers = null, PenC = null, HandErr = null, Target = 23,  TimePlay = 57,  KpiScore = 11, PerformancePct = 0.48 },
                new() { MatchId = match.Id, PlayerId = ByNum(4).Id,  Pos = 4,  TackMade = 2,  TackAss = null, Missed = 1,    Carries = 4,   Offloads = null, LineBreaks = null, RucksClean = 9,  TurnOvers = null, PenC = null, HandErr = null, Target = 21,  TimePlay = 46,  KpiScore = 15, PerformancePct = 0.71 },
                new() { MatchId = match.Id, PlayerId = ByNum(5).Id,  Pos = 5,  TackMade = 4,  TackAss = null, Missed = 2,    Carries = 7,   Offloads = null, LineBreaks = null, RucksClean = 14, TurnOvers = 1,    PenC = null, HandErr = null, Target = 35,  TimePlay = 80,  KpiScore = 26, PerformancePct = 0.74 },
                new() { MatchId = match.Id, PlayerId = ByNum(6).Id,  Pos = 6,  TackMade = 4,  TackAss = null, Missed = 1,    Carries = 7,   Offloads = 1,    LineBreaks = 3,    RucksClean = 19, TurnOvers = 2,    PenC = null, HandErr = null, Target = 45,  TimePlay = 80,  KpiScore = 36, PerformancePct = 0.80 },
                new() { MatchId = match.Id, PlayerId = ByNum(7).Id,  Pos = 7,  TackMade = 3,  TackAss = null, Missed = 5,    Carries = null, Offloads = 1,   LineBreaks = 1,    RucksClean = 11, TurnOvers = null, PenC = null, HandErr = null, Target = 26,  TimePlay = 46,  KpiScore = 21, PerformancePct = 0.81 },
                new() { MatchId = match.Id, PlayerId = ByNum(8).Id,  Pos = 8,  TackMade = 5,  TackAss = 1,   Missed = null, Carries = 13,   Offloads = 1,    LineBreaks = null, RucksClean = 8,  TurnOvers = null, PenC = null, HandErr = 1,   Target = 36,  TimePlay = 50,  KpiScore = 28, PerformancePct = 0.78 },
                new() { MatchId = match.Id, PlayerId = ByNum(9).Id,  Pos = 9,  TackMade = 5,  TackAss = null, Missed = null, Carries = 4,   Offloads = null, LineBreaks = null, RucksClean = 1,  TurnOvers = null, PenC = null, HandErr = 1,   Target = 15,  TimePlay = 80,  KpiScore = 10, PerformancePct = 0.67 },
                new() { MatchId = match.Id, PlayerId = ByNum(10).Id, Pos = 10, TackMade = 4,  TackAss = null, Missed = 1,    Carries = 5,   Offloads = null, LineBreaks = null, RucksClean = 3,  TurnOvers = null, PenC = null, HandErr = null, Target = 15,  TimePlay = 80,  KpiScore = 12, PerformancePct = 0.80 },
                new() { MatchId = match.Id, PlayerId = ByNum(11).Id, Pos = 11, TackMade = 3,  TackAss = null, Missed = null, Carries = 8,   Offloads = 1,    LineBreaks = 2,    RucksClean = 2,  TurnOvers = 1,    PenC = null, HandErr = 1,   Target = 10,  TimePlay = 80,  KpiScore = 17, PerformancePct = 1.70 },
                new() { MatchId = match.Id, PlayerId = ByNum(12).Id, Pos = 12, TackMade = 4,  TackAss = 1,   Missed = null, Carries = 2,   Offloads = null, LineBreaks = null, RucksClean = 2,  TurnOvers = null, PenC = null, HandErr = null, Target = 8,   TimePlay = 39,  KpiScore = 9,  PerformancePct = 1.13 },
                new() { MatchId = match.Id, PlayerId = ByNum(13).Id, Pos = 13, TackMade = 4,  TackAss = 1,   Missed = 2,    Carries = 7,   Offloads = null, LineBreaks = null, RucksClean = 6,  TurnOvers = null, PenC = null, HandErr = 1,   Target = 10,  TimePlay = 80,  KpiScore = 18, PerformancePct = 1.80 },
                new() { MatchId = match.Id, PlayerId = ByNum(14).Id, Pos = 14, TackMade = 2,  TackAss = null, Missed = 2,    Carries = 3,   Offloads = null, LineBreaks = null, RucksClean = 3,  TurnOvers = null, PenC = null, HandErr = 1,   Target = 10,  TimePlay = 80,  KpiScore = 8,  PerformancePct = 0.80 },
                new() { MatchId = match.Id, PlayerId = ByNum(15).Id, Pos = 15, TackMade = 3,  TackAss = null, Missed = null, Carries = 3,   Offloads = 1,    LineBreaks = null, RucksClean = 3,  TurnOvers = null, PenC = null, HandErr = null, Target = 9,   TimePlay = 68,  KpiScore = 10, PerformancePct = 1.11 },
                new() { MatchId = match.Id, PlayerId = ByNum(16).Id, Pos = 16, TackMade = null, TackAss = null, Missed = null, Carries = 2,  Offloads = null, LineBreaks = null, RucksClean = 2,  TurnOvers = null, PenC = null, HandErr = 1,   Target = 11,  TimePlay = 23,  KpiScore = 4,  PerformancePct = 0.37 },
                new() { MatchId = match.Id, PlayerId = ByNum(17).Id, Pos = 17, TackMade = null, TackAss = null, Missed = null, Carries = 2,  Offloads = null, LineBreaks = null, RucksClean = 3,  TurnOvers = null, PenC = null, HandErr = null, Target = 9,   TimePlay = 23,  KpiScore = 5,  PerformancePct = 0.56 },
                new() { MatchId = match.Id, PlayerId = ByNum(18).Id, Pos = 18, TackMade = null, TackAss = null, Missed = null, Carries = 2,  Offloads = null, LineBreaks = null, RucksClean = 3,  TurnOvers = null, PenC = null, HandErr = null, Target = 9,   TimePlay = 23,  KpiScore = 5,  PerformancePct = 0.56 },
                new() { MatchId = match.Id, PlayerId = ByNum(19).Id, Pos = 19, TackMade = 3,  TackAss = null, Missed = null, Carries = null, Offloads = null, LineBreaks = null, RucksClean = 10, TurnOvers = null, PenC = null, HandErr = null, Target = 15,  TimePlay = 34,  KpiScore = 13, PerformancePct = 0.87 },
                new() { MatchId = match.Id, PlayerId = ByNum(20).Id, Pos = 20, TackMade = 1,  TackAss = null, Missed = null, Carries = 2,   Offloads = null, LineBreaks = 1,    RucksClean = 4,  TurnOvers = null, PenC = null, HandErr = null, Target = 17,  TimePlay = 30,  KpiScore = 8,  PerformancePct = 0.47 },
                new() { MatchId = match.Id, PlayerId = ByNum(21).Id, Pos = 21, TackMade = 2,  TackAss = null, Missed = null, Carries = 2,   Offloads = null, LineBreaks = null, RucksClean = 5,  TurnOvers = null, PenC = null, HandErr = null, Target = 19,  TimePlay = 34,  KpiScore = 9,  PerformancePct = 0.47 },
                new() { MatchId = match.Id, PlayerId = ByNum(22).Id, Pos = 22, TackMade = null, TackAss = null, Missed = null, Carries = null, Offloads = null, LineBreaks = null, RucksClean = null, TurnOvers = null, PenC = null, HandErr = null, Target = 8, TimePlay = 41, KpiScore = 6,  PerformancePct = 0.75 },
                new() { MatchId = match.Id, PlayerId = ByNum(23).Id, Pos = 23, TackMade = null, TackAss = null, Missed = null, Carries = null, Offloads = null, LineBreaks = null, RucksClean = null, TurnOvers = null, PenC = null, HandErr = null, Target = 2, TimePlay = 12, KpiScore = 1,  PerformancePct = 0.50 },
            };
            db.PlayerMatchStats.AddRange(stats);

            // ── Team KPIs ─────────────────────────────────────────────────────
            var kpis = new List<TeamKpi>
            {
                new() { MatchId = match.Id, MetricName = "Scrums",           TargetValue = 90,  ActualValue = 100, Unit = "%",   MetTarget = true  },
                new() { MatchId = match.Id, MetricName = "Line Outs",        TargetValue = 85,  ActualValue = 77,  Unit = "%",   MetTarget = false },
                new() { MatchId = match.Id, MetricName = "Kick Offs",        TargetValue = 90,  ActualValue = 67,  Unit = "%",   MetTarget = false },
                new() { MatchId = match.Id, MetricName = "Pen Conceded",     TargetValue = 8,   ActualValue = 9,   Unit = "num", MetTarget = false },
                new() { MatchId = match.Id, MetricName = "Cards",            TargetValue = 0,   ActualValue = 0,   Unit = "num", MetTarget = true  },
                new() { MatchId = match.Id, MetricName = "Tries For",        TargetValue = 4,   ActualValue = 4,   Unit = "num", MetTarget = true  },
                new() { MatchId = match.Id, MetricName = "Tries Against",    TargetValue = 0,   ActualValue = 5,   Unit = "num", MetTarget = false },
                new() { MatchId = match.Id, MetricName = "Handling Errors",  TargetValue = 12,  ActualValue = 6,   Unit = "num", MetTarget = true  },
                new() { MatchId = match.Id, MetricName = "Ruck Won",         TargetValue = 90,  ActualValue = 93,  Unit = "%",   MetTarget = true  },
                new() { MatchId = match.Id, MetricName = "Tackle %",         TargetValue = 85,  ActualValue = 87,  Unit = "%",   MetTarget = true  },
            };
            db.TeamKpis.AddRange(kpis);

            db.SaveChanges();
        }
    }
}
