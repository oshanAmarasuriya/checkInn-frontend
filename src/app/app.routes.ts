import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReservComponent } from './reserv/reserv.component';
import { PricingComponent } from './pricing/pricing.component';
import { AboutComponent } from './about/about.component';


export const routes: Routes = [{ path: '', component: HomeComponent }, // Default route
    { path: 'reservations', component: ReservComponent },
    { path: 'pricing', component: PricingComponent },
    { path: 'about', component: AboutComponent }];

