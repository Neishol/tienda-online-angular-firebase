import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardianService {
  constructor() {}
}

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginService);
  const router = inject(Router);

  if (!authService.isAutenticado()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
