using System.Text.Json.Serialization;

namespace Weather.Models;

public class WeatherResponse
{
    public int Id { get; set; }
    public string City { get; set; }
    public double Temperature { get; set; }
    public string Message { get; set; }
}

public class OpenWeatherResponse
{
    [JsonPropertyName("main")]
    public MainInfo Main { get; set; }
}

public class MainInfo
{
    [JsonPropertyName("temp")]
    public double Temp { get; set; }
}

public class AverageTempResponse
{
    public string City { get; set; }
    public double AverageTemperature { get; set; }
}
