import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {map} from "rxjs/operators";
import {Observable} from 'rxjs';

import {AuthenticationService} from "../../core/authentication/authentication.service";
import {ObjectUtil} from "../../core/utilities/object.util";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  private readonly _loginUrl: UrlTree;

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router
  ) {
    this._loginUrl = this._router.parseUrl('auth/login')
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authenticationService.authenticatedStatus$()
      .pipe(
        map(user => {
          if (ObjectUtil.isDefined(user)) {
            return true;
          } else {
            return this._loginUrl;
          }
        })
      );
  }

}
