import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { OpenWeatherResponse } from '../models/open-weather-response.model';
import { TemperatureUnitsEnum } from '../enums/temperature-units.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private api: HttpClient
  ) { }

  private getUrl(): string {
    return environment.openweathermapApiUrl;
  }

  private getApiKey(): string {
    return environment.openweathermapApiKey;
  }

  public getClimate(latitute: string, longitude: string, units: TemperatureUnitsEnum): Observable<OpenWeatherResponse> {
    return this.api.get<OpenWeatherResponse>(`${this.getUrl()}/onecall?lat=${encodeURIComponent(latitute)}&lon=${encodeURIComponent(longitude)}&units=${units}&appid=${this.getApiKey()}`);
  }
}
