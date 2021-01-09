import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from "./security/login/login.component";
import {RegisterComponent} from "./security/register/register.component";
import {HomeComponent} from "./feature/home/home.component";
import {AuthenticationGuard} from "./security/guards/authentication.guard";

const routes: Routes = [
  // authentication routes
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/register',
    component: RegisterComponent
  },

  // primary routes
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'appointments',
    loadChildren: () => import('./feature/appointments/appointments.module').then(m => m.AppointmentsModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'clients',
    loadChildren: () => import('./feature/clients/client.module').then(m => m.ClientModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./feature/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./feature/settings/settings.module').then(m => m.SettingsModule),
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
