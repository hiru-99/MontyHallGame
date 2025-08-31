namespace MontyHall_Backend.Models;

public class Game
{
    public int Id { get; set; }
    public int ChosenDoor { get; set; }
    public int PrizeDoor { get; set; }
    public int RevealedDoor { get; set; }
    public bool Switched { get; set; }
    public bool Win { get; set; }
    public DateTime PlayedAt { get; set; } = DateTime.Now;
}
