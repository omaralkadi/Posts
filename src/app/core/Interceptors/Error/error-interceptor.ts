import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Platform } from '../../services/platform/platform';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {

   let toastr = inject(ToastrService);
   let platformId = inject(Platform);
  return next(req).pipe(catchError((error) => {

    if(platformId.checkBrowserPlatform()){

      toastr.error('An error occurred while processing your request.');
    }

    return throwError(() => error);

  }));
};
