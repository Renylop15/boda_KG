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
    this.router.navigate(['/reserva-boda']);
  }

  goToAirportBooking() {
    this.router.navigate(['/reserva-aeropuerto']);
  }
}