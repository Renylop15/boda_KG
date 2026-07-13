import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  // Las siguientes rutas se agregarán conforme creemos los componentes
  // { path: 'reserva-boda', component: WeddingBookingComponent },
  // { path: 'reserva-aeropuerto', component: AirportBookingComponent }
];