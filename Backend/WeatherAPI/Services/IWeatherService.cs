    using Weather.Models;

namespace Weather.Services
{
    public interface IWeatherService
    {
        Task<AverageTempResponse> GetAverageTemp(string city);
        Task<WeatherResponse> GetWeather(string city);
        Task SaveWeather(string city);
    }
}