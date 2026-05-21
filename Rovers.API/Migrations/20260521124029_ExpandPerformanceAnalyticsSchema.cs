using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rovers.API.Migrations
{
    /// <inheritdoc />
    public partial class ExpandPerformanceAnalyticsSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EventTypeId",
                table: "MatchEvents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MatchId",
                table: "MatchEvents",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PlayerId",
                table: "MatchEvents",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EventTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    StatField = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    IsPositive = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Opponents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Opponents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Players",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    PrimaryPosition = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    PositionGroup = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    JerseyNumber = table.Column<int>(type: "int", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Players", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Seasons",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Seasons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Matches",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SeasonId = table.Column<int>(type: "int", nullable: false),
                    OpponentId = table.Column<int>(type: "int", nullable: false),
                    MatchDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Venue = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Competition = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    MatchTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    RoversScore = table.Column<int>(type: "int", nullable: true),
                    OpponentScore = table.Column<int>(type: "int", nullable: true),
                    Result = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Matches", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Matches_Opponents_OpponentId",
                        column: x => x.OpponentId,
                        principalTable: "Opponents",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Matches_Seasons_SeasonId",
                        column: x => x.SeasonId,
                        principalTable: "Seasons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PlayerMatchStats",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    PlayerId = table.Column<int>(type: "int", nullable: false),
                    Pos = table.Column<int>(type: "int", nullable: false),
                    TackMade = table.Column<double>(type: "float", nullable: true),
                    TackAss = table.Column<double>(type: "float", nullable: true),
                    Missed = table.Column<double>(type: "float", nullable: true),
                    Carries = table.Column<double>(type: "float", nullable: true),
                    Offloads = table.Column<double>(type: "float", nullable: true),
                    LineBreaks = table.Column<double>(type: "float", nullable: true),
                    RucksClean = table.Column<double>(type: "float", nullable: true),
                    TurnOvers = table.Column<double>(type: "float", nullable: true),
                    PenC = table.Column<double>(type: "float", nullable: true),
                    HandErr = table.Column<double>(type: "float", nullable: true),
                    Target = table.Column<double>(type: "float", nullable: true),
                    TimePlay = table.Column<double>(type: "float", nullable: true),
                    KpiScore = table.Column<double>(type: "float", nullable: true),
                    PerformancePct = table.Column<double>(type: "float", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlayerMatchStats", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlayerMatchStats_Matches_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PlayerMatchStats_Players_PlayerId",
                        column: x => x.PlayerId,
                        principalTable: "Players",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TeamKpis",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    MetricName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    TargetValue = table.Column<double>(type: "float", nullable: true),
                    ActualValue = table.Column<double>(type: "float", nullable: true),
                    Unit = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    MetTarget = table.Column<bool>(type: "bit", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeamKpis", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TeamKpis_Matches_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Matches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MatchEvents_EventTypeId",
                table: "MatchEvents",
                column: "EventTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchEvents_MatchId",
                table: "MatchEvents",
                column: "MatchId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchEvents_PlayerId",
                table: "MatchEvents",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_OpponentId",
                table: "Matches",
                column: "OpponentId");

            migrationBuilder.CreateIndex(
                name: "IX_Matches_SeasonId",
                table: "Matches",
                column: "SeasonId");

            migrationBuilder.CreateIndex(
                name: "IX_PlayerMatchStats_MatchId_PlayerId",
                table: "PlayerMatchStats",
                columns: new[] { "MatchId", "PlayerId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PlayerMatchStats_PlayerId",
                table: "PlayerMatchStats",
                column: "PlayerId");

            migrationBuilder.CreateIndex(
                name: "IX_TeamKpis_MatchId",
                table: "TeamKpis",
                column: "MatchId");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchEvents_EventTypes_EventTypeId",
                table: "MatchEvents",
                column: "EventTypeId",
                principalTable: "EventTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchEvents_Matches_MatchId",
                table: "MatchEvents",
                column: "MatchId",
                principalTable: "Matches",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_MatchEvents_Players_PlayerId",
                table: "MatchEvents",
                column: "PlayerId",
                principalTable: "Players",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchEvents_EventTypes_EventTypeId",
                table: "MatchEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchEvents_Matches_MatchId",
                table: "MatchEvents");

            migrationBuilder.DropForeignKey(
                name: "FK_MatchEvents_Players_PlayerId",
                table: "MatchEvents");

            migrationBuilder.DropTable(
                name: "EventTypes");

            migrationBuilder.DropTable(
                name: "PlayerMatchStats");

            migrationBuilder.DropTable(
                name: "TeamKpis");

            migrationBuilder.DropTable(
                name: "Players");

            migrationBuilder.DropTable(
                name: "Matches");

            migrationBuilder.DropTable(
                name: "Opponents");

            migrationBuilder.DropTable(
                name: "Seasons");

            migrationBuilder.DropIndex(
                name: "IX_MatchEvents_EventTypeId",
                table: "MatchEvents");

            migrationBuilder.DropIndex(
                name: "IX_MatchEvents_MatchId",
                table: "MatchEvents");

            migrationBuilder.DropIndex(
                name: "IX_MatchEvents_PlayerId",
                table: "MatchEvents");

            migrationBuilder.DropColumn(
                name: "EventTypeId",
                table: "MatchEvents");

            migrationBuilder.DropColumn(
                name: "MatchId",
                table: "MatchEvents");

            migrationBuilder.DropColumn(
                name: "PlayerId",
                table: "MatchEvents");
        }
    }
}
