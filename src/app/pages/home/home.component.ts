import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private options: PositionOptions = {
    enableHighAccuracy: true, // Define para obter uma localização mais precisa (se possível)
    timeout: 5000, // Tempo limite para obter a localização (em milissegundos)
    maximumAge: 0 // Descarta a localização em cache
  };

  ngOnInit(): void {
    this.getLocationUser();
  }

  private getLocationUser(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError, this.options);
    } else {
      console.log('Geolocalização não suportada no navegador.');
    }
  }

  private handleSuccess(position: GeolocationPosition): void {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude, longitude);
  }

  private handleError(error: GeolocationPositionError): void {
    console.log('Erro ao obter a localização:', error);
  }
}
