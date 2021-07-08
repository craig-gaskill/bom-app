import {Directive, OnDestroy} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {Observable, Subject, timer} from 'rxjs';
import {map, switchMap, takeUntil} from 'rxjs/operators';

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
  private _unsubscribed$ = new Subject();

  constructor(private _authService: AuthenticationService) { }

  public ngOnDestroy(): void {
    this._unsubscribed$.next();
    this._unsubscribed$.complete();
  }

  public validate(control: AbstractControl): Observable<ValidationErrors|null> {
    if (!control || !control.value) {
      return null;
    }

    return timer(250)
      .pipe(
        takeUntil(this._unsubscribed$),
        switchMap(() => this._authService.checkForEmail(control.value)
          .pipe(
            takeUntil(this._unsubscribed$),
            map(result => result ? {emailInUse: true} : null)
          )
        )
      );
  }
}
