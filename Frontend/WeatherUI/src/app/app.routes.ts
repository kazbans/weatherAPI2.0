import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';

export const routes: Routes = [
    { path: '', redirectTo: 'weather/lviv', pathMatch: 'full' },
    { path: 'weather/:city', component: WeatherComponent }
];
