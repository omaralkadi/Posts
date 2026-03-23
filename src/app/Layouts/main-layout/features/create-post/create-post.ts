import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flowbite } from '../../../../core/services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { Posts } from '../../../../core/services/posts/posts';
import Swal from 'sweetalert2';
import { PostsSharedService } from '../../../../shared/components/services/Posts/posts-shared-service';

@Component({
  selector: 'app-create-post',
  imports: [FormsModule],
  templateUrl: './create-post.html',
  styleUrl: './create-post.css',
})
export class CreatePost {

  private readonly PostsService:Posts=inject(Posts);
  private shared = inject(PostsSharedService);

  isLoading:boolean=false;

    constructor(private flowbiteService: Flowbite) {}
    ngOnInit(): void {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });
    }

    postContent = '';
    selectedFile!: File;
    imagePreview: string | null = null;

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }

submitPost() {

  if (!this.postContent && !this.selectedFile) return;

    this.isLoading = true;

    let postForm = new FormData();

    if (this.postContent) {
      postForm.append("body", this.postContent);
    }

    if (this.selectedFile) {
      postForm.append("image", this.selectedFile);
    }

  this.PostsService.CreatePost(postForm).subscribe({

  next: (response) => {
    const currentUser = JSON.parse(localStorage.getItem('userData')!);

    const newPost = 
    {
      ...response.data.post,
      user:currentUser
    };
    
    this.shared.addPost(newPost);

    this.postContent = '';
    this.imagePreview = null;

    (document.querySelector('[data-modal-hide="postModal"]') as HTMLElement)?.click();

    Swal.fire({
      icon: 'success',
      title: 'Done!',
      text: 'Post created successfully',
      timer: 2000,
      showConfirmButton: false
    });
  },

    error: (error) => {
      this.isLoading = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create post'
      });
    },

    complete: () => {
      this.isLoading = false;
    }
  });
}
}
