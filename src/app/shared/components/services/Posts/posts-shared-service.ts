import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iposts } from '../../../../core/services/models/posts/iposts';

@Injectable({
  providedIn: 'root',
})
export class PostsSharedService {

private posts = new BehaviorSubject<Iposts[]>([]);
  posts$ = this.posts.asObservable();

  setPosts(posts: Iposts[]) {
    this.posts.next(posts);
  }

  addPost(post: Iposts) {
    this.posts.next([post, ...this.posts.value]);
  }  
}
