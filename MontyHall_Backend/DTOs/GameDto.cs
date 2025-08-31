namespace MontyHall_Backend.DTOs;

public class GameDto
{
    public int ChosenDoor { get; set; }
    public int RevealedDoor { get; set; }
    public bool Switched { get; set; }
    public bool Win { get; set; }
}
