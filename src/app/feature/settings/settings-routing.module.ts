import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {SettingsComponent} from './settings.component';
import {AuthenticationGuard} from '../../security/guards/authentication.guard';

const settingsRoutes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthenticationGuard],

    children: [
      {
        path: 'dictionaries',
        loadChildren: () => import('./dictionaries/dictionaries.module').then(m => m.DictionariesModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
        canActivate: [AuthenticationGuard]
      },
      {
        path: 'staff',
        loadChildren: () => import('./staff/staff.module').then(m => m.StaffModule),
        canActivate: [AuthenticationGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(settingsRoutes)
  ]
})
export class SettingsRoutingModule { }
