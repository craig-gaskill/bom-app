import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {RolesComponent} from './roles.component';
import {AuthenticationGuard} from '../../../security/guards/authentication.guard';

const roleRoutes: Routes = [
  {
    path: '',
    component: RolesComponent,
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(roleRoutes)
  ]
})
export class RolesRoutingModule { }
