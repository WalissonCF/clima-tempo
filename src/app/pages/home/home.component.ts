import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
 
import { map, tap } from 'rxjs';

import { OpenWeatherService } from 'src/app/core/services/open-weather-service/open-weather.service';

import { getClimate } from 'src/app/core/store/selectors/climate.selector';
import { loadClimateSuccess } from 'src/app/core/store/actions/climate.action';
import { DateUtils } from 'src/app/core/utils/date.utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private options: PositionOptions = {
    enableHighAccuracy: true, // Define para obter uma localização mais precisa (se possível)
    timeout: 10000, // Tempo limite para obter a localização (em milissegundos)
    maximumAge: 0 // Descarta a localização em cache
  };

  constructor(
    private openWeatherService: OpenWeatherService,
    private store: Store
  ) { }

  climate$ = this.store.pipe(
    select(getClimate)
  );

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

    this.getClimate(latitude, longitude);
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
          this.store.dispatch(loadClimateSuccess({ payload: response }));
          this.climate$.subscribe({
            next: (clima) => {
              console.log('clima', clima);
            }
          });
        })
      )
      .subscribe();
  }

  get temp(): string {
    let tempAtual: string = '';

    this.climate$.pipe(
      map((climate) => {
        if (climate && Object.keys(climate).length > 0) {
          tempAtual = climate.current.temp.toFixed(0) + '°C';
        }
      })
    ).subscribe();
    return tempAtual || '0°C';
  }

  get hasAlerts(): boolean {
    let alert: boolean = false;

    this.climate$.pipe(
      map((climate) => {
        if (climate.alerts && Object.keys(climate.alerts)) {
          alert = true
        }
      })
    ).subscribe();
    return alert;
  }

  getDayOfWeek(dt: number): string {
    const date = new Date(dt * 1000);
    const dayIndex = date.getDay();
    return DateUtils.daysOfWeekAbbreviations[dayIndex];
  }
}