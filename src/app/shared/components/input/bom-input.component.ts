import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input, OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormControl, NgControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ThemePalette} from '@angular/material/core';

import {ConfigurationService} from '../../../core/configuration/configuration.service';

@Component({
  selector: 'bom-input',
  templateUrl: './bom-input.component.html',
  styleUrls: ['./bom-input.component.scss']
})
export class BomInputComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private _unsubscribed$ = new Subject();

  constructor(private _configurationService: ConfigurationService,
              @Optional() @Self() private _ngControl: NgControl
  ) {
    if (this._ngControl) {
      this._ngControl.valueAccessor = this;
    }
  }

  @Input() public id: string;
  @Input() public name: string;
  @Input() public label: string;
  @Input() public type = 'text';
  @Input() public editing = false;
  @Input() public maxlength: number;
  @Input() public autocomplete: string;
  @Input() public autofocus = false;
  @Input() public color: ThemePalette;
  @Input() public hintLabelLeft: string;
  @Input() public hintLabelRight: string;

  @Input() public minlength: number;
  @Input() public minlengthErrorMessage: string;

  @Input() public required = false;
  @Input() public requiredErrorMessage = 'This field is required.';

  public innerFormControl: FormControl = new FormControl();

  @ViewChild('innerElement', {read: ElementRef})
  private _innerElement: ElementRef;

  @HostBinding('tabindex')
  public tabindex = 0;

  public configuration$ = this._configurationService.getConfiguration$();

  public ngOnInit(): void {
    if (this._ngControl) {
      this.innerFormControl.setValidators(this._ngControl.validator);
      this.innerFormControl.setAsyncValidators(this._ngControl.asyncValidator);

      this._ngControl.control.statusChanges
        .pipe(
          takeUntil(this._unsubscribed$)
        )
        .subscribe(change => {
          if (change === 'INVALID') {
            if (this.innerFormControl.valid) {
              this.innerFormControl.setErrors(this._ngControl.control.errors);
            }
          }
        });
    }
  }

  public ngOnDestroy(): void {
    this._unsubscribed$.next();
    this._unsubscribed$.complete();
  }

  @HostListener('focus')
  public focus(): void {
    if (this._innerElement) {
      this._innerElement.nativeElement.focus();
    }
  }

  public onTouched = () => {};

  public registerOnChange(fn: any): void {
    this.innerFormControl.valueChanges.subscribe(fn);
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.innerFormControl.disable();
      this.tabindex = -1;
    } else {
      this.innerFormControl.enable();
      this.tabindex = 0;
    }
  }

  public writeValue(val: string): void {
    this.innerFormControl.setValue(val, {emitEvent: false});
  }
}
