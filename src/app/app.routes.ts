import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Lockers } from './lockers/lockers';
import { Login } from './auth/login/login';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
    
  },
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'lockers',
    component: Lockers,
    canActivate: [authGuard]
  }
];