import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class commentService {

  private readonly http: HttpClient=inject(HttpClient);
  private readonly userToken: any= `Bearer ${localStorage.getItem('token')}`;


  getComments(postId: string):Observable<any>
  {
    return this.http.get(`${environment.baseUrl}/posts/${postId}/comments?page=1&limit=5`, {
      headers: {
        Authorization: this.userToken
      }
    })
  }

  createComment(postId: string, commentData: any):Observable<any>
  {
    return this.http.post(`${environment.baseUrl}/posts/${postId}/comments`, commentData, {
      headers: {
        Authorization: this.userToken
      }
    })
  }
  
}
