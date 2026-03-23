import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {

  return next(req).pipe(catchError((error) => {

    console.log('Error Intercepted:', error);
    return throwError(() => error);

  }));
};
