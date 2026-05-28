export interface WeatherResponse {
    city: string;
    temperature: number;
    message: string;
}

export interface AverageTemperatureResponse {
    city: string;
    averageTemperature: number;
}