import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {BomSlideToggleComponent} from './bom-slide-toggle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSlideToggleModule
  ],
  declarations: [
    BomSlideToggleComponent
  ],
  exports: [
    BomSlideToggleComponent
  ]
})
export class BomSlideToggleModule { }
