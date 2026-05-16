using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Weather.Models;
using Weather.Services;

namespace WeatherAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {

        private readonly IWeatherService _weatherService;

        public WeatherController(IWeatherService weatherService)
        {
            _weatherService = weatherService;
        }

        [HttpGet("{city}")]
        public async Task<ActionResult<WeatherResponse>> GetWeather(string city)
        {
            try
            {
                var weather = await _weatherService.GetWeather(city);
                return Ok(weather);
            }
            catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound(new { message = $"City {city} not found" });
            }
        }
    }
}
