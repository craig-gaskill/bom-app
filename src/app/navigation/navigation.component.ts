import {Component, OnDestroy, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {map, shareReplay, takeUntil} from 'rxjs/operators';

import {MatDialog} from '@angular/material/dialog';

import {AuthenticationService} from '../core/authentication/authentication.service';

@Component({
  selector: 'bom-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  private _unsubscribed$ = new Subject();

  public isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      takeUntil(this._unsubscribed$),
      map(result => result.matches),
      shareReplay()
    );

  public leftExpanded = false;
  public rightExpanded = false;

  constructor(private _breakpointObserver: BreakpointObserver,
              private _authenticationService: AuthenticationService,
              private _router: Router,
              private _dialog: MatDialog
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._unsubscribed$.next();
    this._unsubscribed$.complete();
  }

  public onLogout(): void {
    this._dialog.closeAll();
    this._authenticationService.logout();
    this._router.navigateByUrl('/auth/login');
  }
}
