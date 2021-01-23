import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';

import {MaterialModule} from './material.module';

import {ProcessingSpinnerDirective} from './directive/processing-spinner.directive';
import {EmailInUseValidator} from './validator/email-in-use.validator';
import {MustMatchValidator} from './validator/must-match.validator';
import {ConfirmationDialogComponent} from './confirmation/confirmation-dialog.component';

import {BomInputModule} from './components/input/bom-input.module';
import {BomEmailModule} from './components/email/bom-email.module';
import {BomSlideToggleModule} from './components/slidetoggle/bom-slide-toggle.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    MaterialModule,

    BomInputModule,
    BomEmailModule,
    BomSlideToggleModule
  ],
  declarations: [
    ProcessingSpinnerDirective,
    EmailInUseValidator,
    MustMatchValidator,
    ConfirmationDialogComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    MaterialModule,

    BomInputModule,
    BomEmailModule,
    BomSlideToggleModule,

    ProcessingSpinnerDirective,
    EmailInUseValidator,
    MustMatchValidator,
    ConfirmationDialogComponent
  ]
})
export class SharedModule { }
