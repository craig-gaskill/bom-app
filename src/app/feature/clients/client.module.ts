import {NgModule} from '@angular/core';

import {SharedModule} from "../../shared/shared.module";

import {ClientRoutingModule} from "./client-routing.module";
import {ClientComponent} from './client.component';

@NgModule({
  imports: [
    SharedModule,

    ClientRoutingModule
  ],
  declarations: [
    ClientComponent
  ]
})
export class ClientModule { }
