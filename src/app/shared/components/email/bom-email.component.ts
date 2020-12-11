import {Component, ElementRef, HostBinding, HostListener, Input, OnInit, Self, ViewChild} from "@angular/core";
import {ControlValueAccessor, FormControl, NgControl} from "@angular/forms";

import {ThemePalette} from "@angular/material/core";

import {ConfigurationService} from "../../../core/configuration/configuration.service";

@Component({
  selector: 'bom-email',
  templateUrl: './bom-email.component.html',
  styleUrls: ['./bom-email.component.scss']
})
export class BomEmailComponent implements ControlValueAccessor, OnInit {
  @Input() public id: string;
  @Input() public name: string;
  @Input() public label: string;
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
  @Input() public requiredErrorMessage = 'Please provide a valid email address.';

  public innerFormControl: FormControl = new FormControl();

  constructor(private _configurationService: ConfigurationService,
              @Self() public _ngControl: NgControl
  ) {
    this._ngControl.valueAccessor = this;
  }

  public ngOnInit(): void {
    if (this._ngControl) {
      this.innerFormControl.setValidators(this._ngControl.validator);
      this.innerFormControl.setAsyncValidators(this._ngControl.asyncValidator);
    }
  }

  @ViewChild("innerElement")
  private _innerElement: ElementRef;

  @HostBinding('tabindex')
  public tabindex = 0;

  @HostListener('focus')
  public focus(): void {
    if (this._innerElement) {
      this._innerElement.nativeElement.focus();
    }
  }

  public configuration$ = this._configurationService.getConfiguration$();

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
