import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  ActivationStart,
  NavigationStart,
  Router,
  RouterOutlet
} from '@angular/router';
import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

import {ObjectUtil} from '../../core/utilities/object.util';

@Component({
  selector: 'bom-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private _unsubscribed$ = new Subject();

  public childRoute: string;

  @ViewChild(RouterOutlet)
  private _outlet: RouterOutlet;

  constructor(private _router: Router) { }

  public ngOnInit(): void {
    this._router.events
      .pipe(
        takeUntil(this._unsubscribed$),
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: NavigationStart) => {
        const segments = (event && event.url ? event.url.split('/') : undefined);
        if (segments && segments.length > 2) {
          this.childRoute = segments[2].trim();
        } else {
          this.childRoute = undefined;
        }
      });

    this._router.events
      .pipe(
        takeUntil(this._unsubscribed$),
        filter(event => event instanceof ActivationStart)
      )
      .subscribe(() => {
        if (this._outlet) {
          this._outlet.deactivate();
        }
      });
  }

  public ngOnDestroy(): void {
    this._unsubscribed$.next();
    this._unsubscribed$.complete();
  }

  public get childRouteName(): string {
    if (ObjectUtil.isUndefined(this.childRoute)) {
      return undefined;
    }

    switch (this.childRoute) {
      case 'dictionaries':
        return 'Dictionaries';

      case 'roles':
        return 'Roles';

      case 'staff':
        return 'Staff';

      default:
        return undefined;
    }
  }
}
