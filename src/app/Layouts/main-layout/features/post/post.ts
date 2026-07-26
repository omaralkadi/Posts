import { Component, inject, Input, input, ViewChild } from '@angular/core';
import { Iposts } from '../../../../core/services/models/posts/iposts';
import { Comment } from "../comment/comment";
import { commentService } from '../../../../core/services/comment/commentService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PostsSharedService } from '../../../../shared/components/services/Posts/posts-shared-service';
import { Posts } from '../../../../core/services/posts/posts';
import { AuthService } from '../../../../core/services/Auth/auth-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  imports: [Comment, ReactiveFormsModule,RouterLink],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {

  IsLiked: boolean = false;
  errorMessage: string = '';
  @Input({required:true}) post!: Iposts;
  private readonly PostService = inject(Posts);
  private readonly sharedPosts=inject(PostsSharedService);

  private readonly authService = inject(AuthService);

  @ViewChild(Comment) CommentComponent!: Comment; 

  foucsOnComment() {
    this.CommentComponent.focusOnComment();
  }

SharePost(postId: string) {
  Swal.fire({
    title: 'هل تريد مشاركة هذا البوست؟',
    text: 'سيتم مشاركة البوست مع متابعيك',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'نعم، مشاركة',
    cancelButtonText: 'لا'
  }).then((result) => {

    if (!result.isConfirmed) {
      return;
    }

    this.PostService.sharePost(postId).subscribe({
      next: (response) => {

        const newSharedPost: Iposts = response.data.post;
        const updatedOriginalPost: Iposts = response.data.post.sharedPost;

        // تحديث عدد الشير للبوست الأصلي
        this.sharedPosts.updatedPost(updatedOriginalPost);

        // إضافة بوست الشير الجديد في الفيد
        this.sharedPosts.addPost(newSharedPost);

      },
      error: (error) => {
        this.errorMessage = 'An error occurred while sharing the post.';
        console.error('Error sharing post:', error);

        Swal.fire({
          icon: 'error',
          title: 'حدث خطأ',
          text: 'لم يتم مشاركة البوست'
        });
      },
      complete: () => {
         Swal.fire({
          icon: 'success',
          title: 'تمت المشاركة',
          text: 'تمت مشاركة البوست بنجاح',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });

  });
}


  MakeLike(postId: string) 
  {
    this.PostService.likeAndUlikePost(postId).subscribe({

      next: (response) => {
        this.errorMessage = '';

        const updatedPost: Iposts = response.data.post;
        this.sharedPosts.updatedPost(updatedPost);
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while liking the post.';
        console.error('Error liking post:', error);
      },
      complete: () => {
        this.IsLiked = !this.IsLiked;
      }
    });

  }



deletePost(postId: string) {
  Swal.fire({
    title: 'هل تريد حذف هذا البوست؟',
    text: 'سيتم حذف البوست نهائياً',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'نعم، احذف',
    cancelButtonText: 'لا'
  }).then((result) => {
    if (result.isConfirmed) {
      this.PostService.deletePost(postId).subscribe({
        next: () => {
          this.errorMessage = '';
          this.sharedPosts.deletePost(postId);

          Swal.fire('تم', 'تم حذف البوست بنجاح', 'success');
        },
        error: (error) => {
          this.errorMessage = 'An error occurred while deleting the post.';
          console.error('Error deleting post:', error);

          Swal.fire('خطأ', 'حدث خطأ أثناء حذف البوست', 'error');
        }
      });
    }
  });
}

  checkIfMyPost(postId: string): boolean {
    return this.authService.getUserData()?._id === postId; 
  }

}
