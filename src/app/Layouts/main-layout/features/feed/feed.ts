import { Component, inject } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Post } from '../post/post';
import { Posts } from '../../../../core/services/posts/posts';
import { Iposts } from '../../../../core/services/models/posts/iposts';
import { CreatePost } from '../create-post/create-post';
import { PostsSharedService } from '../../../../shared/components/services/Posts/posts-shared-service';
import { Platform } from '../../../../core/services/platform/platform';
import { Followers } from "../followers/followers";

@Component({
  selector: 'app-feed',
  imports: [Post, CreatePost, Followers],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {

   private readonly postServices = inject(Posts);
   private shared = inject(PostsSharedService);
   private platform=inject(Platform);

   allPosts:Iposts[]=[];
   isLoading: boolean = false;

   currentPage: number = 1;
   hasMore: boolean = true;

  loadPosts() {
  if (!this.hasMore) return;

  if(this.platform.checkBrowserPlatform()){
      this.postServices.getAllPosts(this.currentPage).subscribe({
    next: (response) => {

      const newPosts = response.data.posts;

      this.shared.setPosts([
        ...this.allPosts,
        ...newPosts
      ]);

      if (!response.meta.pagination.nextPage) {
        this.hasMore = false;
      } else {
        this.currentPage++;
      }

    },
    error: () => {
    },
    complete: () => {
    }
  });
  }

  }

  onScroll = (): void => {

    const threshold = 200;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position >= height - threshold) {
      this.loadPosts();
    }
  };

  ngOnInit(): void {

    this.loadPosts();

    this.shared.Posts$.subscribe(posts => {
      this.allPosts = posts;
    });

    if (this.platform.checkBrowserPlatform()) {
      window.addEventListener('scroll', this.onScroll, true);
    }
  }



  ngOnDestroy(): void {

   if (this.platform.checkBrowserPlatform()) {
      window.removeEventListener('scroll', this.onScroll, true);
    }
}

}
