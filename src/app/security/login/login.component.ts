import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {finalize, takeWhile} from 'rxjs/operators';

import {AuthenticationService, LoginStatus} from '../../core/authentication/authentication.service';

@Component({
  selector: 'bom-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly _SOURCE = 'LOGIN';

  private _subscribed = true;
  private _returnUrl: string;

  public loginForm: FormGroup;
  public errorMessage: string;
  public processing = false;

  constructor(private _formBuilder: FormBuilder,
              private _route: ActivatedRoute,
              private _router: Router,
              private _authenticationService: AuthenticationService
  ) {
    this.loginForm = this._formBuilder.group({
      email: undefined,
      password: undefined
    });
  }

  public ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this._returnUrl = this._route.snapshot.queryParams.returnUrl || '/';
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }

  public onLogin(): void {
    if (this.processing) {
      return;
    } else {
      this.processing = true;
    }

    const formValues = this.loginForm.value;

    this._authenticationService.login(formValues.email, formValues.password, this._SOURCE)
      .pipe(
        takeWhile(() => this._subscribed),
        finalize(() => this.processing = false)
      )
      .subscribe(loginStatus => {
        if (loginStatus === LoginStatus.AccountDisabled) {
          this.errorMessage = 'Your account is disabled!';
        } else if (loginStatus === LoginStatus.AccountLocked) {
          this.errorMessage = 'Your account is locked!';
        } else if (loginStatus === LoginStatus.AccountExpired) {
          this.errorMessage = 'Your account has expired!';
        } else if (loginStatus === LoginStatus.Invalid) {
          this.errorMessage = 'Please enter a valid Email Address and Password!';
        } else if (loginStatus === LoginStatus.Valid) {
          this._router.navigateByUrl(this._returnUrl);
        }
      }, (errorResponse: HttpErrorResponse) => {
        const err = errorResponse.error;
        if (err && err.status) {
          const errorType = err.status;

          if (errorType === LoginStatus.AccountDisabled) {
            this.errorMessage = 'Your account is disabled!';
          } else if (errorType === LoginStatus.AccountLocked) {
            this.errorMessage = 'Your account is locked!';
          } else if (errorType === LoginStatus.AccountExpired) {
            this.errorMessage = 'Your account has expired!';
          } else {
            this.errorMessage = 'Please enter a valid Email Address and Password!';
          }
        }
      });
  }

  public onRegister(): void {
    this._router.navigateByUrl('/auth/register');
  }
}
