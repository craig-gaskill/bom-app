import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";

import {AppointmentsRoutingModule} from "./appointments-routing.module";
import {AppointmentsComponent} from './appointments.component';

@NgModule({
  imports: [
    SharedModule,

    AppointmentsRoutingModule
  ],
  declarations: [
    AppointmentsComponent
  ],
})
export class AppointmentsModule { }
