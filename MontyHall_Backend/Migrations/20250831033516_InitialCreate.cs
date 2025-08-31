using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MontyHall_Backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ChosenDoor = table.Column<int>(type: "INTEGER", nullable: false),
                    PrizeDoor = table.Column<int>(type: "INTEGER", nullable: false),
                    RevealedDoor = table.Column<int>(type: "INTEGER", nullable: false),
                    Switched = table.Column<bool>(type: "INTEGER", nullable: false),
                    Win = table.Column<bool>(type: "INTEGER", nullable: false),
                    PlayedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");
        }
    }
}
