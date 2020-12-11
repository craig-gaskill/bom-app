import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";

import {environment} from "../environments/environment";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true
      }
    }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'bom',
      maxAge: 50,                       // retain last 50 states
      logOnly: environment.production   // restrict extension to log-only mode
    })
  ]
})
export class AppStoreModule { }
