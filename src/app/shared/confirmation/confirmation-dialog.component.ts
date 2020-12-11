import {Component, Inject, OnInit, SecurityContext} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

export interface ConfirmDialogData {
  title?: string;
  message: string;
  approveButtonText: string;
  approveButtonColor?: string;
  approveButtonData?: any;
  denyButtonText?: string;
  denyButtonColor?: string;
  denyButtonData?: any;
}

@Component({
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public sanitizedMessage: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
              private _dialogRef: MatDialogRef<ConfirmationDialogComponent, boolean>,
              private _domSanitizer: DomSanitizer
  ) {
    this.sanitizedMessage = this._domSanitizer.sanitize(SecurityContext.HTML, data.message);
  }

  public ngOnInit(): void {
  }
}
