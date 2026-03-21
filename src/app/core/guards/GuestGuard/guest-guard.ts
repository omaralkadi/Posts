import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Platform } from '../../services/platform/platform';

export const guestGuard: CanActivateFn = (route, state) => {

const platform = inject(Platform);
  const router = inject(Router);

  if (!platform.checkBrowserPlatform()) {
    return  true;
  }

  const token = localStorage.getItem('token');

return token
  ? router.createUrlTree(['/main/feed'])
  : true;
};
