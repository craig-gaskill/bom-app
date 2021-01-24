import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';

import {RolesRoutingModule} from './roles-routing.module';
import {RoleStoreModule} from './store/role-store.module';

import {RolesComponent} from './roles.component';
import {RoleDetailComponent} from './detail/role-detail.component';

@NgModule({
  imports: [
    SharedModule,

    RolesRoutingModule,
    RoleStoreModule
  ],
  declarations: [
    RolesComponent,
    RoleDetailComponent
  ],
})
export class RolesModule { }
