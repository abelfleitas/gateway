import { Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { DeviceComponent } from 'src/app/views/device/device.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'devices', component: DeviceComponent },
];
