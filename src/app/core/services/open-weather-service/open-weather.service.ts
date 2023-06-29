import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { OpenWeatherResponse } from '../../models/open-weather-response.model';
import { TemperatureUnitsEnum } from '../../enums/temperature-units.enum';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(
    private apiService: ApiService
  ) { }

  public getClimate(latitute: number, longitude: number): Observable<OpenWeatherResponse> {
    return this.apiService.getClimate(latitute.toFixed(2), longitude.toFixed(2), TemperatureUnitsEnum.CELSIUS);
  }
}
