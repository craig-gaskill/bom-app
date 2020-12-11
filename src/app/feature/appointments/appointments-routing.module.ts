import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {AppointmentsComponent} from "./appointments.component";
import {AuthenticationGuard} from "../../security/guards/authentication.guard";

const appointmentRoutes: Routes = [
  {
    path: '',
    component: AppointmentsComponent,
    canActivate: [AuthenticationGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appointmentRoutes)
  ]
})
export class AppointmentsRoutingModule { }
