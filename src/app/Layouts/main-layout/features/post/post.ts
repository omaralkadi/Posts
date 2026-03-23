import { Component, inject, Input, input } from '@angular/core';
import { Iposts } from '../../../../core/services/models/posts/iposts';
import { Comment } from "../comment/comment";
import { commentService } from '../../../../core/services/comment/commentService';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post',
  imports: [Comment, ReactiveFormsModule,RouterLink],
  templateUrl: './post.html',
  styleUrl: './post.css',
})
export class Post {


  errorMessage: string = '';
  @Input({required:true}) post!: Iposts;

  private readonly commentService: commentService = inject(commentService);

}
