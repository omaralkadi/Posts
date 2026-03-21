import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})  
export class AuthService {

  private readonly http:HttpClient=inject(HttpClient);

     Register(data:Object):Observable<any>
      {
        return this.http.post(`${environment.baseUrl}users/signup`,data);
      }

      Login(data:Object):Observable<any>
      {
        return this.http.post(`${environment.baseUrl}users/signin`,data);
      }

}
