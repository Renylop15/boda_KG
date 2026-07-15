import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToWeddingBooking() {
    window.location.href = 'https://lab.vancity.mx/reserva-boda';
  }

  goToAirportBooking() {
    // Esto redireccionará a la página de Vancity en la misma pestaña
    window.location.href = 'https://lab.vancity.mx/reserva';
  }
}