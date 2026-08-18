import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Lockers } from './lockers/lockers';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard
  },
  {

    path: 'lockers',
    component: Lockers
  }
];
