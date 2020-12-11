import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";

import {SharedModule} from "../../shared/shared.module";

import {SettingsRoutingModule} from "./settings-routing.module";
import {SettingsComponent} from './settings.component';

@NgModule({
  imports: [
    SharedModule,

    SettingsRoutingModule,
    RouterModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }
