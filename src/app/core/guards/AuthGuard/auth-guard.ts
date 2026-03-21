import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { Platform } from '../../services/platform/platform';

export const authGuard: CanActivateFn = (route, state) => 
{
const router = inject(Router);
const platform = inject(Platform);

if (!platform.checkBrowserPlatform()) {
  return router.createUrlTree(['/auth/login']);
}

const token = localStorage.getItem('token');

return token
  ? true
  : router.createUrlTree(['/auth/login']);
}

 