import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {ProfileComponent} from "./profile.component";
import {AuthenticationGuard} from "../../security/guards/authentication.guard";

const profileRoutes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(profileRoutes)
  ]
})
export class ProfileRoutingModule { }
