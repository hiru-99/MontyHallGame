using Microsoft.AspNetCore.Mvc;
using MontyHall_Backend.Services;
using MontyHall_Backend.DTOs;

namespace MontyHall_Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MontyHallController : ControllerBase
{
    private readonly GameService _gameService;

    public MontyHallController(GameService gameService) => _gameService = gameService;

    [HttpPost("play")]
    public async Task<IActionResult> Play([FromQuery] int selectedDoor, [FromQuery] bool didSwitch)
    {
        try
        {
            var gameRecord = await _gameService.PlayAsync(selectedDoor, didSwitch);

            // Map to DTO
            var gameDto = new GameDto
            {
                ChosenDoor = gameRecord.ChosenDoor,
                RevealedDoor = gameRecord.RevealedDoor,
                Switched = gameRecord.Switched,
                Win = gameRecord.Win
            };

            return Ok(gameDto);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message); // 400 for invalid input
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while playing the game."); // 500 for server errors
        }
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllGames()
    {
        try
        {
            var allGames = await _gameService.GetAllGamesAsync();

            var gameDtos = allGames.Select(g => new GameDto
            {
                ChosenDoor = g.ChosenDoor,
                RevealedDoor = g.RevealedDoor,
                Switched = g.Switched,
                Win = g.Win
            }).ToList();

            return Ok(gameDtos);
        }
        catch (Exception)
        {
            return StatusCode(500, "An error occurred while retrieving all games.");
        }
    }
}
