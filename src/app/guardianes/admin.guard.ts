import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AutenticarService } from '../services/autenticar.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => verificarAcceso();

export const adminChildGuard: CanActivateChildFn = (route, state) => verificarAcceso();


const verificarAcceso = (): boolean => {
  const autenticarService = inject(AutenticarService);
  const router = inject(Router);

  const rol = autenticarService.getRol();

  if (rol === 'ADMIN') {
    return true;
  }

  router.navigate(['/error/no-autorizado']);
  return false;
}