import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated$.pipe(
    map((isAuthenticated: boolean) => {
      if (!isAuthenticated) {
        if (state.url !== '/login') {
          router.navigate(['/login']);
        }
        return false;
      }
      return true;
    })
  );
};
