import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Para usuarios logueados (todo menos login y register), si no están logueados se les envía al inicio de sesión
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isLogged() ? true : router.createUrlTree(['/login']);
};
