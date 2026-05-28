using System.Text.Json;
using Weather.Models;
using WeatherAPI.Data;

namespace Weather.Services;

public class WeatherService : IWeatherService
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;
    private readonly AppDbContext _context;

    public WeatherService(HttpClient httpClient, IConfiguration config, AppDbContext context)
    {
        _httpClient = httpClient;
        _apiKey = config["OpenWeather:APIKey"];
        _context = context;
    }

    public async Task<WeatherResponse> GetWeather(string city)
    {
        string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric";
        var response = await _httpClient.GetAsync(url);

        if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
        {
            throw new HttpRequestException("City not found", null, System.Net.HttpStatusCode.NotFound);
        }

        var json = await response.Content.ReadAsStringAsync();
        var openWeatherData = JsonSerializer.Deserialize<OpenWeatherResponse>(json);

        double temp = openWeatherData.Main.Temp;

        return new WeatherResponse
        {
            City = city,
            Temperature = temp,
            Message = $"Temperature in {city}: {temp}C"
        };
    }

    public async Task<WeatherResponse> SaveWeather(string city)
    {
        var newWeather = await GetWeather(city);

        _context.Add(newWeather);
        await _context.SaveChangesAsync();
        return newWeather;
    }
}