using Rovers.API.Models;

namespace Rovers.API.Services
{
    public class PlayerService
    {
        private readonly List<Player> _players = new()
        {
            new() { Pos = 1,  Name = "Jaret",  TackMade = 2,  TackAss = 2,  Carries = 6,  RucksClean = 8,  Target = 23, TimePlay = 57, KpiScore = 18, PerformancePct = 0.78 },
            new() { Pos = 2,  Name = "Mr T",   TackMade = 3,  TackAss = 1,  Carries = 8,  Offloads = 2,   RucksClean = 4,  Target = 27, TimePlay = 57, KpiScore = 20, PerformancePct = 0.74 },
            new() { Pos = 3,  Name = "Thinus", TackMade = 1,                Carries = 3,  Offloads = 1,   RucksClean = 6,  Target = 23, TimePlay = 57, KpiScore = 11, PerformancePct = 0.48 },
            new() { Pos = 4,  Name = "Red",    TackMade = 2,  Missed = 1,   Carries = 4,  RucksClean = 9,  Target = 21, TimePlay = 46, KpiScore = 15, PerformancePct = 0.71 },
            new() { Pos = 5,  Name = "Danny",  TackMade = 4,  Missed = 2,   Carries = 7,  RucksClean = 14, TurnOvers = 1, Target = 35, TimePlay = 80, KpiScore = 26, PerformancePct = 0.74 },
            new() { Pos = 6,  Name = "Nanto",  TackMade = 4,  Missed = 1,   Carries = 7,  Offloads = 1,   LineBreaks = 3, RucksClean = 19, TurnOvers = 2, Target = 45, TimePlay = 80, KpiScore = 36, PerformancePct = 0.80 },
            new() { Pos = 7,  Name = "Kevin",  TackMade = 3,  Missed = 5,   Offloads = 1, LineBreaks = 1, RucksClean = 11, Target = 26, TimePlay = 46, KpiScore = 21, PerformancePct = 0.81 },
            new() { Pos = 8,  Name = "Mesuli", TackMade = 5,  TackAss = 1,  Carries = 13, Offloads = 1,   RucksClean = 8,  HandErr = 1, Target = 36, TimePlay = 50, KpiScore = 28, PerformancePct = 0.78 },
            new() { Pos = 9,  Name = "Darryl", TackMade = 5,               Carries = 4,  RucksClean = 1,  HandErr = 1, Target = 15, TimePlay = 80, KpiScore = 10, PerformancePct = 0.67 },
            new() { Pos = 10, Name = "Inny",   TackMade = 4,  Missed = 1,   Carries = 5,  RucksClean = 3,  Target = 15, TimePlay = 80, KpiScore = 12, PerformancePct = 0.80 },
            new() { Pos = 11, Name = "Skinny", TackMade = 3,               Carries = 8,  Offloads = 1,   LineBreaks = 2, RucksClean = 2,  TurnOvers = 1, HandErr = 1, Target = 10, TimePlay = 80, KpiScore = 17, PerformancePct = 1.70 },
            new() { Pos = 12, Name = "Seun",   TackMade = 4,  TackAss = 1,  Carries = 2,  RucksClean = 2,  Target = 8,  TimePlay = 39, KpiScore = 9,  PerformancePct = 1.13 },
            new() { Pos = 13, Name = "Sergio", TackMade = 4,  TackAss = 1,  Missed = 2,   Carries = 7,  RucksClean = 6,  HandErr = 1, Target = 10, TimePlay = 80, KpiScore = 18, PerformancePct = 1.80 },
            new() { Pos = 14, Name = "Tythan", TackMade = 2,  Missed = 2,   Carries = 3,  RucksClean = 3,  HandErr = 1, Target = 10, TimePlay = 80, KpiScore = 8,  PerformancePct = 0.80 },
            new() { Pos = 15, Name = "Quan",   TackMade = 3,               Carries = 3,  Offloads = 1,   RucksClean = 3,  Target = 9,  TimePlay = 68, KpiScore = 10, PerformancePct = 1.11 },
            new() { Pos = 16, Name = "Pina",                               Carries = 2,  RucksClean = 2,  HandErr = 1, Target = 11, TimePlay = 23, KpiScore = 4,  PerformancePct = 0.37 },
            new() { Pos = 17, Name = "Lucky",                              Carries = 2,  RucksClean = 3,  Target = 9,  TimePlay = 23, KpiScore = 5,  PerformancePct = 0.56 },
            new() { Pos = 18, Name = "Jono",                               Carries = 2,  RucksClean = 3,  Target = 9,  TimePlay = 23, KpiScore = 5,  PerformancePct = 0.56 },
            new() { Pos = 19, Name = "Stairs", TackMade = 3,               RucksClean = 10, Target = 15, TimePlay = 34, KpiScore = 13, PerformancePct = 0.87 },
            new() { Pos = 20, Name = "Ntsika", TackMade = 1,               Carries = 2,  LineBreaks = 1, RucksClean = 4,  Target = 17, TimePlay = 30, KpiScore = 8,  PerformancePct = 0.47 },
            new() { Pos = 21, Name = "Fanele", TackMade = 2,               Carries = 2,  RucksClean = 5,  Target = 19, TimePlay = 34, KpiScore = 9,  PerformancePct = 0.47 },
            new() { Pos = 22, Name = "Dylan",                                            Target = 8,  TimePlay = 41, KpiScore = 6,  PerformancePct = 0.75 },
            new() { Pos = 23, Name = "Reuben",                                           Target = 2,  TimePlay = 12, KpiScore = 1,  PerformancePct = 0.50 },
        };

        public List<Player> GetAll() => _players;

        public Player Add(Player player)
        {
            _players.Add(player);
            return player;
        }
    }
}
