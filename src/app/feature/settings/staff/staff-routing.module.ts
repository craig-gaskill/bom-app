import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {StaffComponent} from "./staff.component";
import {AuthenticationGuard} from "../../../security/guards/authentication.guard";

const staffRoutes: Routes = [
  {
    path: '',
    component: StaffComponent,
    canActivate: [AuthenticationGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(staffRoutes)
  ]
})
export class StaffRoutingModule { }
