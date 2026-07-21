import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit, OnDestroy {
  // Variables del reloj
  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  
  private countdownInterval: any;

  // NUEVO: Inyectamos PLATFORM_ID y ChangeDetectorRef
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.iniciarCuentaRegresiva();
  }

  iniciarCuentaRegresiva() {
    const targetDate = new Date('2026/09/19 16:00:00').getTime();

    const actualizarReloj = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Si la fecha ya llegó, detenemos el reloj en ceros
      if (distance < 0) {
        if (this.countdownInterval) clearInterval(this.countdownInterval);
        this.days = 0; this.hours = 0; this.minutes = 0; this.seconds = 0;
        this.cdr.detectChanges(); // Obligamos a pintar los ceros
        return;
      }

      // Cálculos de tiempo
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // NUEVO: Forzamos a Angular a actualizar la pantalla en este microsegundo
      this.cdr.detectChanges(); 
    };

    // NUEVO: Evaluamos si estamos en el navegador para correr el intervalo
    if (isPlatformBrowser(this.platformId)) {
      actualizarReloj(); // Pintamos de inmediato
      this.countdownInterval = setInterval(actualizarReloj, 1000); // Arrancamos el motor
    } else {
      // Si el servidor (SSR) está construyendo la página, solo calcula una vez para no dejarlo en 00
      actualizarReloj();
    }
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  goToWeddingBooking() {
    window.location.href = 'https://lab.vancity.mx/reserva-boda';
  }

  goToAirportBooking() {
    window.location.href = 'https://lab.vancity.mx/reserva';
  }
}