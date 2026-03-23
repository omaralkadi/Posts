import { Component, inject } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Post } from '../post/post';
import { Posts } from '../../../../core/services/posts/posts';
import { Iposts } from '../../../../core/services/models/posts/iposts';
import { CreatePost } from '../create-post/create-post';
import { PostsSharedService } from '../../../../shared/components/services/Posts/posts-shared-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-feed',
  imports: [Post, CreatePost, RouterLink],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {

   private readonly postServices = inject(Posts);
   private shared = inject(PostsSharedService);

   allPosts:Iposts[]=[];
   isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading=true;
    this.postServices.getAllPosts(1).subscribe({
      next: (response) => { 
         this.shared.setPosts(response.data.posts);
          this.shared.posts$.subscribe(posts => {
          this.allPosts = posts;
    });
      },
      error: (error) => {
        console.error('Error fetching posts:', error);
        this.isLoading=false;
      },
      complete: () => {
        this.isLoading=false;
      }
    });

}

}
