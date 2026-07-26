import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Platform } from '../platform/platform';
import { User } from '../models/posts/iposts';

@Injectable({
  providedIn: 'root',
})  
export class AuthService {

  private readonly http:HttpClient=inject(HttpClient);
  private platform = inject(Platform);


     Register(data:Object):Observable<any>
      {
        return this.http.post(`${environment.baseUrl}/users/signup`,data);
      }

      Login(data:Object):Observable<any>
      {
        return this.http.post(`${environment.baseUrl}/users/signin`,data);
      }

    getToken(): string | null {
      if (this.platform.checkBrowserPlatform()) {
        return localStorage.getItem('token');
      }
      return null;
    }

    getUserData(): User {
      const userData = localStorage.getItem('userData');
      return userData ? JSON.parse(userData) : {} as User;
    }

    getFollowers(): Observable<any> {
      return this.http.get(`${environment.baseUrl}/users/suggestions?limit=5`);
    }

    makeFollow(followerId: string): Observable<any> {
      return this.http.put(`${environment.baseUrl}/users/${followerId}/follow`, {});
    }

}
