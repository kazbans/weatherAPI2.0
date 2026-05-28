import { Injectable } from '@angular/core';
import { WeatherResponse } from '../interfaces/weather.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeather(city: string){
    return this.http.get<WeatherResponse>(`https://localhost:7127/api/Weather/${city}`);
  }

  saveWeather(city: string){
    return this.http.post(`https://localhost:7127/api/Weather/${city}`, {});
  }
}
