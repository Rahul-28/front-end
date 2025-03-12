import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { dashboardRoutes } from './layout/dashboard/dashboard.routes';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { authGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignInComponent },
  {
    path: 'dashboard',
    loadChildren: () => dashboardRoutes,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

  // for navbar
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar',
  },
];
