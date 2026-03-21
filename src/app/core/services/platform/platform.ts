import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Platform {

  private platformId = inject(PLATFORM_ID);

  checkBrowserPlatform() {
    return isPlatformBrowser(this.platformId);
  }

}