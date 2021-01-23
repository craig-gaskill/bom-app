import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map, takeWhile} from 'rxjs/operators';

import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DEFAULT_INTERRUPTSOURCES, Idle} from '@ng-idle/core';

import {AuthenticationService, LoginStatus} from './core/authentication/authentication.service';
import {environment} from '../environments/environment';
import {InactiveDialogComponent} from './security/inactive/inactive-dialog.component';

@Component({
  selector: 'bom-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _subscribed = true;
  private _idleInactiveSeconds = environment.idleInactiveSeconds;
  private _idleTimeoutSeconds = environment.idleTimeoutSeconds;
  private _inactiveDialog: MatDialogRef<any>;

  public isAuthenticated$: Observable<boolean> = this._authenticationService.authenticatedStatus$()
    .pipe(
      takeWhile(() => this._subscribed),
      map(loginStatus => loginStatus === LoginStatus.Valid)
    );

  constructor(private _authenticationService: AuthenticationService,
              private _idle: Idle,
              private _router: Router,
              private _dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this._authenticationService.authenticatedStatus$()
      .pipe(
        takeWhile(() => this._subscribed)
      )
      .subscribe(result => {
        if (result === LoginStatus.Valid) {
          this._setupIdleTimers();
        }
      });
  }

  public ngOnDestroy(): void {
    this._subscribed = true;
  }

  private _setupIdleTimers(): void {
    // sets an idle timeout of 5 seconds, for testing purposes.
    this._idle.setIdle(this._idleInactiveSeconds);

    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this._idle.setTimeout(this._idleTimeoutSeconds);

    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this._idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this._idle.onIdleStart
      .pipe(
        takeWhile(() => this._subscribed)
      )
      .subscribe(() => {
        this._inactiveDialog = this._dialog.open(InactiveDialogComponent, {
          width: '400px',
          disableClose: true
        });

        this._inactiveDialog.afterClosed()
          .pipe(
            takeWhile(() => this._subscribed)
          )
          .subscribe(result => {
            if (result === 'LOGOUT') {
              this._logout();
            } else {
              this._idle.watch();
            }
          });
      });

    this._idle.onIdleEnd
      .pipe(
        takeWhile(() => this._subscribed)
      )
      .subscribe(() => {
        if (this._inactiveDialog) {
          this._inactiveDialog.close();
          this._inactiveDialog = undefined;
        }
      });

    this._idle.onTimeout.subscribe(() => this._logout());

    this._idle.watch();
  }

  private _logout(): void {
    this._dialog.closeAll();
    this._authenticationService.logout();
    this._router.navigateByUrl('/auth/login');
  }
}
