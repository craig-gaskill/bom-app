import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BomBreadcrumbComponent} from './bom-breadcrumb.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BomBreadcrumbComponent
  ],
  exports: [
    BomBreadcrumbComponent
  ]
})
export class BomBreadcrumbModule { }
