import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/Interceptors/header/header-interceptor';
import { errorInterceptor } from './core/Interceptors/Error/error-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/Interceptors/Loading/loading-interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withViewTransitions({skipInitialTransition: true}),withInMemoryScrolling(
      {scrollPositionRestoration:'enabled'})),
       /*provideClientHydration(withEventReplay()),*/
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor,errorInterceptor,loadingInterceptor])),
    importProvidersFrom(NgxSpinnerModule),
    provideAnimations(),
     provideToastr()
  ]
};