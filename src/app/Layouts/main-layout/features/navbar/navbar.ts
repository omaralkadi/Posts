import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Flowbite } from '../../../../core/services/Flowbite/flowbite';
import { initFlowbite } from 'flowbite';
import { Platform } from '../../../../core/services/platform/platform';
import { User } from '../../../../core/services/models/posts/iposts';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

   private readonly platform:Platform= inject(Platform);

   private readonly router:Router=inject(Router)

   UserData: User | null = null;

   constructor(private flowbiteService: Flowbite) {
   }
    ngOnInit(): void {
      this.flowbiteService.loadFlowbite((flowbite) => {
        initFlowbite();
      });

      this.DisplayUserDate();

    }

    DisplayUserDate(){
      if (this.platform.checkBrowserPlatform()) {
          const data = localStorage.getItem('userData');
          if (data) 
            this.UserData = JSON.parse(data);
        }
    } 

   SignOut() {
      if(localStorage.getItem("token")){
        localStorage.removeItem("token");
      }
      if(localStorage.getItem("userData")){
        localStorage.removeItem("userData")
      }
      this.router.navigate(["/auth/login"])
    }

   

}


