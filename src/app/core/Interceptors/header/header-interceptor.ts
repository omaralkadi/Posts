import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Platform } from '../../services/platform/platform';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {

  let platform:Platform= inject(Platform);

  if(platform.checkBrowserPlatform()){
      if(localStorage.getItem('token')){
        req =req.clone({
          setHeaders: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      };
  }
  
  return next(req);
};
