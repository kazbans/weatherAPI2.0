    using Weather.Models;

namespace Weather.Services
{
    public interface IWeatherService
    {
        Task<WeatherResponse> GetWeather(string city);
    }
}