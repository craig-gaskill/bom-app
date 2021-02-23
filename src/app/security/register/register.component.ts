import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StepperSelectionEvent} from '@angular/cdk/stepper';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';

import {RegisterRequest} from '../../core/authentication/register-request.model';
import {AuthenticationService, LoginStatus} from '../../core/authentication/authentication.service';
import {BomInputComponent} from '../../shared/components/input/bom-input.component';

@Component({
  selector: 'bom-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private readonly _SOURCE = 'REGISTRATION';

  private _subscribed = true;

  public tenantRegistrationForm: FormGroup;
  public userRegistrationForm: FormGroup;
  public processing = false;

  @ViewChild('firstName')
  private _firstNameComponent: BomInputComponent;

  constructor(private _formBuilder: FormBuilder,
              private _router: Router,
              private _authenticationService: AuthenticationService
  ) {
    this.tenantRegistrationForm = this._formBuilder.group({
      tenantName: undefined
    });

    this.userRegistrationForm = this._formBuilder.group({
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      password: undefined,
      confirmationPassword: undefined
    });
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }

  public onStepChanged(event: StepperSelectionEvent): void {
    if (event && event.selectedIndex === 1 && this._firstNameComponent) {
      setTimeout(() => {
        this._firstNameComponent.focus();
      }, 250);
    }
  }

  public onCancel(): void {
    this._router.navigateByUrl('/auth/login');
  }

  public onRegister(): void {
    const registerRequest: RegisterRequest = {
      tenantName: this.tenantRegistrationForm.value.tenantName,
      firstName: this.userRegistrationForm.value.firstName,
      lastName: this.userRegistrationForm.value.lastName,
      email: this.userRegistrationForm.value.email,
      password: this.userRegistrationForm.value.password,
      confirmationPassword: this.userRegistrationForm.value.confirmationPassword
    };

    this._authenticationService.register(registerRequest, this._SOURCE)
      .pipe(
        takeWhile(() => this._subscribed)
      )
      .subscribe(result => {
        if (result === LoginStatus.Valid) {
          this._router.navigateByUrl('/home');
        }
      });
  }

}
