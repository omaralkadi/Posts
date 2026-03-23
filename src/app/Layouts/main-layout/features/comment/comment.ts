import { Component, inject, Input, input } from '@angular/core';
import { commentService } from '../../../../core/services/comment/commentService';
import { IComment } from '../../../../core/services/models/Comments/icomment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './comment.html',
  styleUrl: './comment.css',
})
export class Comment {

  @Input({required:true}) PostId!: string;
  errorMessage: string = '';

  isSubmitting:boolean = false;

  currentPage: number = 1;
  hasMore: boolean = true;
  isLoadingMore: boolean = false;

  private readonly commentService:commentService=inject(commentService);
  commentList: IComment[] = [];

ngOnInit(): void {
  this.loadComments();
}

loadComments() {

  if (!this.hasMore || this.isLoadingMore) return;

  this.isLoadingMore = true;

  this.commentService.getComments(this.PostId, this.currentPage).subscribe({

    next: (response) => {

      const newComments = response.data.comments;

      // 🔥 ضيف على القديم
      this.commentList = [
        ...this.commentList,
        ...newComments
      ];

      // 🧠 pagination
      if (!response.pagination?.nextPage && newComments.length < 5) {
        this.hasMore = false;
      } else {
        this.currentPage++;
      }

    },

    error: (error) => {
      console.error(error);
      this.isLoadingMore = false;
    },

    complete: () => {
      this.isLoadingMore = false;
    }

  });
}

   commentForm:FormGroup=new FormGroup({
    'comment':new FormControl(null,[Validators.required]),
  });

submitComment() {

  if (this.commentForm.valid) {
    this.isSubmitting = true;

    const commentData = {
      content: this.commentForm.value.comment
    };

    this.commentService.createComment(this.PostId, commentData).subscribe({
      next: (response) => {
        this.commentList.unshift(response.data.comment);
        this.commentForm.reset();

      },
      error: (error) => {
        this.errorMessage = 'Failed to add comment';
        this.isSubmitting = false;

      },
      complete: () => {
        this.isSubmitting = false;
      }

    });

  }
}

}
