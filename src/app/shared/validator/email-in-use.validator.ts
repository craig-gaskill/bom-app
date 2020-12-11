import {Directive, OnDestroy} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {map, switchMap, takeWhile} from 'rxjs/operators';

import {AuthenticationService} from '../../core/authentication/authentication.service';

@Directive({
  selector: '[emailInUse]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: EmailInUseValidator,
      multi: true
    }
  ]
})
export class EmailInUseValidator implements AsyncValidator, OnDestroy {
  private _subscribed = true;

  constructor(private _authService: AuthenticationService) { }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }

  public validate(control: AbstractControl): Observable<ValidationErrors|null> {
    if (!control || !control.value) {
      return null;
    }

    return timer(250)
      .pipe(
        takeWhile(() => this._subscribed),
        switchMap(() => this._authService.checkForEmail(control.value)
          .pipe(
            takeWhile(() => this._subscribed),
            map(result => result ? {emailInUse: true} : null)
          )
        )
      );
  }
}
