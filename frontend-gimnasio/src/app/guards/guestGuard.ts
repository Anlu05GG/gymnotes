import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Para usuarios no logueados (login y register), cuando inicien sesión se les envia a la ventana de sesiones
export const guestGuard = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return !auth.isLogged() ? true : router.createUrlTree(['/entrenar']);
};
