using Microsoft.EntityFrameworkCore;
using Weather.Models;

namespace WeatherAPI.Data;
public class AppDbContext: DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){ }

    public DbSet<WeatherResponse> Weather { get; set; }
}

