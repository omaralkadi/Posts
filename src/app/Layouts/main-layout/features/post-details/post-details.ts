import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Posts } from '../../../../core/services/posts/posts';
import { error } from 'console';
import { Iposts } from '../../../../core/services/models/posts/iposts';
import { Post } from "../post/post";

@Component({
  selector: 'app-post-details',
  imports: [Post],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails {

  private readonly activeRoute:ActivatedRoute=inject(ActivatedRoute);
  private readonly postServices:Posts=inject(Posts);
  isLoading:boolean=false;

   Post!: Iposts;
  
  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((res)=>{
      let id=res.get("id");

       this.isLoading=true;
        this.postServices.getSinglePost(id).subscribe({
        next: (response) => {
            this.Post = response.data.post;
        },error: (error) => {
            console.error('Error fetching post details:', error);
            this.isLoading=false;

        },complete: () => {
            this.isLoading=false;
        }
    });
    });

 

  }

}
