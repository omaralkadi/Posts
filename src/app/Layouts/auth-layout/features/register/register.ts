import { Component, inject } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { RouterLink } from "@angular/router";  
import { AuthService } from '../../../../core/services/Auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  
  isLoading:boolean=false;  
  errorMessage:string="";
  
  private readonly authService:AuthService=inject(AuthService);
  private readonly router:Router=inject(Router);
  
  registerForm:FormGroup=new FormGroup({
    'name':new FormControl(null,[Validators.required,Validators.pattern('^[A-Za-z]{2,20}$')]),
    'username':new FormControl(null,[Validators.required,Validators.pattern('^[A-Za-z]{2,20}$')]),
    'email':new FormControl(null,[Validators.required, Validators.email]),
    'dateOfBirth':new FormControl(null,[Validators.required]),
    'gender':new FormControl(null,[Validators.required]),
    'password':new FormControl(null,[Validators.required, Validators.minLength(8),Validators.pattern('^[A-Z][a-z]{2,9}[@-_][0-9]{3,9}$')]),
    'rePassword':new FormControl(null,[Validators.required,Validators.minLength(8),Validators.pattern('^[A-Z][a-z]{2,9}[@-_][0-9]{3,9}$')]),
  },this.PasswordMatch)

  OnSubmit() 
  {
    if(this.registerForm.valid){
this.isLoading=true;
    this.authService.Register(this.registerForm.value).subscribe({

      next:(response)=>{
        if(response.success==true)
         {
           localStorage.setItem('token',response.data.token);
           localStorage.setItem('userData',JSON.stringify(response.data.user));
           this.router.navigate(['auth/login']);
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
      this.registerForm.markAsTouched();
    }
    
  }

  PasswordMatch(fg:AbstractControl) {

    let password=fg.get('password')?.value;
    let rePassword=fg.get('rePassword')?.value;

    if(password==rePassword) {
      return null;
    }else{
      fg.get('rePassword')?.setErrors({'passwordMismatch':true});
      return {'passwordMismatch':true};
    }
  }

    togglePassword(input:HTMLInputElement)
    {
      if(input.getAttribute('type')=='password')
      {
        input.setAttribute('type','text');
      }
      else
      {
        input.setAttribute('type','password');
      }

    }
}
