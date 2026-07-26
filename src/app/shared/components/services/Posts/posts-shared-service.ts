import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Iposts } from '../../../../core/services/models/posts/iposts';

@Injectable({
  providedIn: 'root',
})
export class PostsSharedService {

  private posts=new BehaviorSubject<Iposts[]>([])
  Posts$=this.posts.asObservable();

  setPosts(posts:Iposts[])
  {
    this.posts.next(posts);
  }

  addPost(post:Iposts)
  {
    this.posts.next([post,...this.posts.value]);
  }

    deletePost(postId: string) {
    const updatedPosts = this.posts.value.filter(post => post._id !== postId);
    this.posts.next(updatedPosts);
  }

  updatedPost(updatedPost: Iposts) {
    const updatedPosts=this.posts.value.map(post=>
      post._id === updatedPost._id ? updatedPost : post
    );
    this.posts.next(updatedPosts);
  }
 
}
