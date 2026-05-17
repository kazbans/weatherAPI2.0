import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../interfaces/weather.interface';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);

  weatherData: WeatherResponse | null = null;

  ngOnInit() {
    
    const city = 'Lviv';

    this.weatherService.getWeather(city).subscribe((response) => {
      this.weatherData = response;
    });
  }
}