using Microsoft.EntityFrameworkCore;
using MontyHall_Backend.Models;

namespace MontyHall_Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Game> Games => Set<Game>();
}
