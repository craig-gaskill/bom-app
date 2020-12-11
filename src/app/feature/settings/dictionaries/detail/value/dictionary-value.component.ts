import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

import {MatDialog} from "@angular/material/dialog";

import {ViewStatus} from "../../../../../app-store.state";
import {DictionaryValue} from "../../../../../core/dictionary/value/dictionary-value.model";
import {DictionariesManager} from "../../dictionaries.manager";
import {ConfirmDialogData} from "../../../../../shared/confirmation/confirmation-dialog.component";
import {ConfirmationDialogComponent} from "../../../../../shared/confirmation/confirmation-dialog.component";

@Component({
  selector: 'bom-dictionary-value',
  templateUrl: './dictionary-value.component.html',
  styleUrls: ['./dictionary-value.component.scss']
})
export class DictionaryValueComponent implements OnInit {
  public readonly VIEW_STATUS = ViewStatus;

  private _dictionaryValue: DictionaryValue;

  public formGroup: FormGroup;
  public viewStatus$: Observable<ViewStatus>;
  public editing = false;

  constructor(private _formBuilder: FormBuilder,
              private _dialog: MatDialog,
              private _dictionariesManager: DictionariesManager
  ) {
    this.formGroup = this._formBuilder.group({
      display: undefined,
      meaning: undefined
    });
  }

  @Input()
  public dictionaryMeaning: string;

  @Input()
  public get dictionaryValue(): DictionaryValue {
    return this._dictionaryValue;
  }

  public set dictionaryValue(value: DictionaryValue) {
    this._dictionaryValue = value;

    this.formGroup.reset({
      display: value ? value.display : undefined,
      meaning: value ? value.meaning : undefined
    });
  }

  public ngOnInit(): void {
    if (this._dictionaryValue && !this._dictionaryValue.dictionaryValueId) {
      // if it is a new Dictionary Values
      // place in edit mode so they can complete it
      this.editing = true;
    }

    this.viewStatus$ = this._dictionariesManager.getViewStatus();
  }

  public onEdit(): void {
    this.editing = true;
    this._dictionariesManager.editDictionaryValue(this.dictionaryMeaning, this._dictionaryValue);
  }

  public onDelete(): void {
    const confirmDelete: ConfirmDialogData = {
      title: 'Please Confirm',
      message: `Are you sure you want to delete <b>${this._dictionaryValue.display}</b>?`,
      approveButtonText: 'DELETE',
      approveButtonData: 'DELETE',
      denyButtonText: 'CANCEL'
    };

    this._dialog.open(ConfirmationDialogComponent, {data: confirmDelete, autoFocus: false})
      .afterClosed()
      .subscribe(result =>
        result === confirmDelete.approveButtonData ?
          this._dictionariesManager.deleteDictionaryValue(this.dictionaryMeaning, this._dictionaryValue) :
          undefined
      );
  }

  public onSave(): void {
    const formModel = this.formGroup.value;

    const dv: DictionaryValue = {
      dictionaryValueId: this._dictionaryValue.dictionaryValueId,
      display: formModel.display,
      meaning: formModel.meaning,
      viewable: this._dictionaryValue.viewable,
      editable: this._dictionaryValue.editable,
      deletable: this._dictionaryValue.deletable,
      active: this._dictionaryValue.active,
      updateCount: this.dictionaryValue.updateCount
    };

    this._dictionariesManager.saveDictionaryValue(this.dictionaryMeaning, dv);
  }

  public onCancel(): void {
    this.editing = false;
    this.dictionaryValue = this._dictionaryValue;
    this._dictionariesManager.cancelDictionaryValue(this.dictionaryMeaning, this._dictionaryValue);
  }
}
