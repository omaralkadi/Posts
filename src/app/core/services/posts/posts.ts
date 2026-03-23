import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Posts {

  private readonly http: HttpClient= inject(HttpClient);
  private readonly userToken: any= `Bearer ${localStorage.getItem('token')}`;

  getAllPosts(page: number): Observable<any> {
    
    const headers = new HttpHeaders({
      authorization: this.userToken
    });

    return this.http.get(`${environment.baseUrl}/posts`, {
      headers,
      params: { page }
    });
  }

  CreatePost(postData: any):Observable<any> 
  {
    return this.http.post(`${environment.baseUrl}/posts`, postData, {
      headers: {
        authorization: this.userToken
      }
    });
  } 

  getSinglePost(PostId: any):Observable<any> 
  {
    return this.http.get(`${environment.baseUrl}/posts/${PostId}`, {
      headers: {
        authorization: this.userToken
      }
    });
  } 
  
}
