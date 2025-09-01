namespace MontyHall_Backend.DTOs;

public class SimulationResultDto
{
    public int TotalGames { get; set; }
    public int Wins { get; set; }
    public int Losses { get; set; }
    public double WinPercentage { get; set; }
}
