import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/Auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  isLoading:boolean=false;  
    errorMessage:string="";

    isShowPassword:boolean=false;
  
    private readonly authService:AuthService=inject(AuthService);
    private readonly router:Router=inject(Router);
    

  loginForm:FormGroup=new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required]),
  })

  
    OnSubmit() 
    {
      if(this.loginForm.valid){

        this.isLoading=true;
      this.authService.Login(this.loginForm.value).subscribe({
  
        next:(response)=>{
          if(response.success==true)
           {
             localStorage.setItem('token',response.data.token);
             localStorage.setItem('userData',JSON.stringify(response.data.user));
              this.router.navigate(['main/feed']);
          }
          this.isLoading=false; 
        },
        error:(errors)=>{
          this.errorMessage=errors.error.message;
          console.log(this.errorMessage);
          this.isLoading=false;
        },
        complete:()=>{
          this.isLoading=false;
        }
  
      });
        
      }else{
        this.loginForm.markAsTouched();
      }
      
    }

    togglePassword(){
      this.isShowPassword=!this.isShowPassword;
    }
  
}
