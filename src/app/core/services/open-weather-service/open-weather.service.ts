import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { TemperatureUnitsEnum } from '../../enums/temperature-units.enum';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {

  constructor(
    private apiService: ApiService
  ) { }

  public getClimate(latitute: number, longitude: number): Observable<any> {
    return this.apiService.getClimate(latitute.toFixed(2), longitude.toFixed(2), TemperatureUnitsEnum.CELSIUS);
  }
}
