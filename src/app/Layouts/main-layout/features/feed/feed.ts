import { Component, inject } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Post } from '../post/post';
import { Posts } from '../../../../core/services/posts/posts';
import { Iposts } from '../../../../core/services/models/posts/iposts';
import { CreatePost } from '../create-post/create-post';
import { PostsSharedService } from '../../../../shared/components/services/Posts/posts-shared-service';

@Component({
  selector: 'app-feed',
  imports: [Post, CreatePost],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {

   private readonly postServices = inject(Posts);
   private shared = inject(PostsSharedService);

   allPosts:Iposts[]=[];
   isLoading: boolean = false;

   currentPage: number = 1;
   hasMore: boolean = true;
   isLoadingMore: boolean = false;

  loadPosts() {

  if (!this.hasMore || this.isLoadingMore) return;

  this.isLoadingMore = true;

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
      this.isLoadingMore = false;
    },
    complete: () => {
      this.isLoadingMore = false;
    }
  });
}

  onScroll = (): void => {

    const threshold = 200; // قبل ما توصل بـ 200px
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position >= height - threshold) {
      this.loadPosts();
    }
  };

  ngOnInit(): void {
    this.isLoading = true;

    this.loadPosts();

    this.shared.posts$.subscribe(posts => {
      this.allPosts = posts;
      this.isLoading = false;
    });

    window.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy(): void {
  window.removeEventListener('scroll', this.onScroll, true);
}

}
