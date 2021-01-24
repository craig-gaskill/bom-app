import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {RoleStoreEffects} from './role-store.effects';
import {roleReducer} from './role-store.reducer';
import {roleFeature} from './role-store.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(roleFeature, roleReducer),
    EffectsModule.forFeature([RoleStoreEffects])
  ],
  providers: [
    RoleStoreEffects
  ]
})
export class RoleStoreModule { }
