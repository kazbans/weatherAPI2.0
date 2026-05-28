import { Injectable } from '@angular/core';
import { AverageTemperatureResponse, WeatherResponse } from '../interfaces/weather.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeather(city: string){
    return this.http.get<WeatherResponse>(`/api/Weather/${city}`);
  }

  saveWeather(city: string){
    return this.http.post(`/api/Weather/${city}`, {});
  }

  getAverageTemperature(city: string) {
    return this.http.get<AverageTemperatureResponse>(`/api/Weather/${city}/average`);
  }
}
