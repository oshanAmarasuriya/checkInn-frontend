import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservComponent } from './reserv/reserv.component';


export const routes: Routes = [{ path: '', component: HomeComponent }, // Default route
    { path: 'reservations', component: ReservComponent },];

