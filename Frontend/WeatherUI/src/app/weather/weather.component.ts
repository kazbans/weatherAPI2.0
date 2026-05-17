import { Component, inject, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { WeatherResponse } from '../interfaces/weather.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather',
  imports: [],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  private weatherService = inject(WeatherService);
  private route = inject(ActivatedRoute);

  weatherData: WeatherResponse | null = null;

  ngOnInit() {

    const city = this.route.snapshot.paramMap.get('city') || 'lviv';

    this.weatherService.getWeather(city).subscribe((response) => {
      this.weatherData = response;
    });
  }
}