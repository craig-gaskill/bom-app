import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";

import {DictionariesComponent} from "./dictionaries.component";
import {AuthenticationGuard} from "../../../security/guards/authentication.guard";

const dictionaryRoutes: Routes = [
  {
    path: '',
    component: DictionariesComponent,
    canActivate: [AuthenticationGuard]
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dictionaryRoutes)
  ]
})
export class DictionaryRoutingModule { }
