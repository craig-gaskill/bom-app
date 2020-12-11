import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from '@angular/forms';
import {Directive, Input} from "@angular/core";

@Directive({
  selector: '[mustMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MustMatchValidator,
      multi: true
    }
  ]
})
export class MustMatchValidator implements Validator {
  private _matchingComponentName: string;

  @Input()
  public get matchingComponentName(): string {
    return this._matchingComponentName;
  }

  public set matchingComponentName(matchingComponentName: string) {
    this._matchingComponentName = matchingComponentName;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (!control || !control.parent || !control.value) {
      return null;
    }

    const parent = control.parent.get(this._matchingComponentName);
    if (!parent) {
      return null;
    }

    const checkValue = (control.value ? control.value : '');
    const matchValue = (parent.value ? parent.value : '');

    if (checkValue.toLowerCase() !== matchValue.toLowerCase()) {
      return {mustMatch: true};
    }

    return null;
  }
}
