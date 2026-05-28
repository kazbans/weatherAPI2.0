import { Component, inject, OnInit, signal } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../interfaces/weather.interface';
import { ActivatedRoute } from '@angular/router';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-weather',
  imports: [TitleCasePipe],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);
  private route = inject(ActivatedRoute);

  weatherData = signal<WeatherResponse | undefined>(undefined);
  errorMessage = signal<string | undefined>(undefined);
  currentCity = signal<string>('');

  ngOnInit() {
    const city = this.route.snapshot.paramMap.get('city') || 'lviv';
    this.currentCity.set(city);

    this.weatherService.getWeather(city).subscribe({
      next: (response) => {
        this.weatherData.set(response);
      },
      error: (error) => {
        this.errorMessage.set('Not found weather data for the specified city');
      }
    });
  }

  saveWeather() {
    const city = this.currentCity();
    this.weatherService.saveWeather(city).subscribe();
  }
}