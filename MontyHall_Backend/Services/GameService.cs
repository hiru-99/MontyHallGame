using MontyHall_Backend.Data;
using MontyHall_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace MontyHall_Backend.Services;

public class GameService
{
    private readonly AppDbContext _dbContext;
    private readonly Random _random = new Random();

    public GameService(AppDbContext dbContext) => _dbContext = dbContext;

    public async Task<Game> PlayAsync(int selectedDoor, bool didSwitch)
    {
        try
        {
            // Validate input
            if (selectedDoor < 1 || selectedDoor > 3)
                throw new ArgumentException("Selected door must be 1, 2, or 3.");

            // Randomly assign prize door
            int prizeDoor = _random.Next(1, 4);

            // Host opens a door (not the selected or prize door)
            int revealedDoorByHost = Enumerable.Range(1, 3)
                .First(d => d != selectedDoor && d != prizeDoor);

            // Determine final choice based on switch
            int finalDoorChoice = didSwitch
                ? Enumerable.Range(1, 3).First(d => d != selectedDoor && d != revealedDoorByHost)
                : selectedDoor;

            bool didWin = finalDoorChoice == prizeDoor;

            // Create game record
            var gameRecord = new Game
            {
                ChosenDoor = selectedDoor,
                PrizeDoor = prizeDoor,
                RevealedDoor = revealedDoorByHost,
                Switched = didSwitch,
                Win = didWin
            };

            await _dbContext.Games.AddAsync(gameRecord);
            await _dbContext.SaveChangesAsync();

            return gameRecord;
        }
        catch (Exception ex)
        {
            // Log exception (optional)
            Console.WriteLine($"Error in PlayAsync: {ex.Message}");
            throw; // Let the controller handle the error response
        }
    }

    public async Task<List<Game>> GetAllGamesAsync()
    {
        try
        {
            return await _dbContext.Games.ToListAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error in GetAllGamesAsync: {ex.Message}");
            throw;
        }
    }
}
