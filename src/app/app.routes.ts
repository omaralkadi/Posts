import { Routes } from '@angular/router';
import { Auth } from './Layouts/auth-layout/auth/auth';
import { Login } from './Layouts/auth-layout/features/login/login';
import { Register } from './Layouts/auth-layout/features/register/register';
import { ForgetPassword } from './Layouts/auth-layout/features/forget-password/forget-password';
import { Main } from './Layouts/main-layout/main/main';
import { Profile } from './Layouts/main-layout/features/profile/profile';
import { Notification } from './Layouts/main-layout/features/notification/notification';
import { ChangePassword } from './Layouts/main-layout/features/change-password/change-password';
import { NotFound } from './Layouts/features/not-found/not-found';
import { Feed } from './Layouts/main-layout/features/feed/feed';
import { guestGuard } from './core/guards/GuestGuard/guest-guard';
import { authGuard } from './core/guards/AuthGuard/auth-guard';
import { PostDetails } from './Layouts/main-layout/features/post-details/post-details';

export const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path: 'auth',
    component: Auth,
    children: [
      { path: 'login', component: Login,canActivate:[guestGuard] },
      { path: 'register', component: Register,canActivate:[guestGuard] },
      { path: 'forget-password', component: ForgetPassword,canActivate:[guestGuard] }
    ]
  },

  {
    path: 'main',
    component: Main,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      { path: 'feed', component: Feed },
      { path: 'profile', component: Profile },
      { path: 'notifications', component: Notification },
      { path: 'changepassword', component: ChangePassword },
      { path: 'details/:id', component: PostDetails }
    ]
  },

  { path: '**', component: NotFound }

];