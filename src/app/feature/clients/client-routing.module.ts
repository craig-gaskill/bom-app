import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {ClientComponent} from "./client.component";
import {AuthenticationGuard} from "../../security/guards/authentication.guard";

const clientRoutes: Routes = [
  {
    path: '',
    component: ClientComponent,
    canActivate: [AuthenticationGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes)
  ]
})
export class ClientRoutingModule { }
