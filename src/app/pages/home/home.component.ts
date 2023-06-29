import { Component, OnInit } from '@angular/core';

import { tap } from 'rxjs';

import { OpenWeatherService } from 'src/app/core/services/open-weather-service/open-weather.service';
import { OpenWeatherResponse } from 'src/app/core/models/open-weather-response.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public openWeatherResponse: OpenWeatherResponse = {} as OpenWeatherResponse;
  private options: PositionOptions = {
    enableHighAccuracy: true, // Define para obter uma localização mais precisa (se possível)
    timeout: 5000, // Tempo limite para obter a localização (em milissegundos)
    maximumAge: 0 // Descarta a localização em cache
  };

  constructor(
    private openWeatherService: OpenWeatherService
  ) { }

  ngOnInit(): void {
    this.getLocationUser();
  }

  private getLocationUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => this.handleSuccess(position),
        this.handleError,
        this.options);
    } else {
      console.log('Geolocalização não suportada no navegador.');
    }
  }

  private handleSuccess(position: GeolocationPosition): void {
    const latitude: number = position.coords.latitude;
    const longitude: number = position.coords.longitude;

    // this.getClimate(latitude, longitude);
    console.log(latitude, longitude);
  }

  private handleError(error: GeolocationPositionError): void {
    console.log('Erro ao obter a localização:', error);
  }

  private getClimate(latitude: number, longitude: number): void {
    this.openWeatherService
      .getClimate(latitude, longitude)
      .pipe(
        tap((response) => {
          this.openWeatherResponse = response;
          console.log('response', this.openWeatherResponse.current);
        })
      )
      .subscribe();
  }
}