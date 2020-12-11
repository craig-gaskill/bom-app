import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {A11yModule} from '@angular/cdk/a11y';

import {MaterialModule} from './material.module';

import {ProcessingSpinnerDirective} from "./directive/processing-spinner.directive";
import {EmailInUseValidator} from "./validator/email-in-use.validator";
import {MustMatchValidator} from "./validator/must-match.validator";
import {ConfirmationDialogComponent} from "./confirmation/confirmation-dialog.component";

import {BomEmailComponent} from "./components/email/bom-email.component";
import {BomInputComponent} from "./components/input/bom-input.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,

    MaterialModule
  ],
  declarations: [
    ProcessingSpinnerDirective,
    EmailInUseValidator,
    MustMatchValidator,
    ConfirmationDialogComponent,

    BomEmailComponent,
    BomInputComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,

    MaterialModule,

    ProcessingSpinnerDirective,
    EmailInUseValidator,
    MustMatchValidator,
    ConfirmationDialogComponent,

    BomEmailComponent,
    BomInputComponent
  ]
})
export class SharedModule { }
