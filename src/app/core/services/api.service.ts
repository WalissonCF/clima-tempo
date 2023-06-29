import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

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

  public getClimate(latitute: string, longitude: string, units: TemperatureUnitsEnum): Observable<any> {
    return this.api.get<any>(`${this.getUrl()}/onecall?lat=${encodeURIComponent(latitute)}&lon=${encodeURIComponent(longitude)}&units=${units}&appid=${this.getApiKey()}`);
  }
}
