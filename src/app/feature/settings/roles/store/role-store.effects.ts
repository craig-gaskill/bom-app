import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {of} from 'rxjs';

import {RoleStoreState} from './role-store.state';
import {RoleService} from '../../../../core/role/role.service';
import {loadRoles, loadRolesFailed, loadRolesSucceeded} from './role-store.actions';

@Injectable()
export class RoleStoreEffects {
  constructor(private _roleStore: Store<RoleStoreState>,
              private _actions$: Actions,
              private _roleService: RoleService
  ) { }

  public loadRoles$ = createEffect(() => this._actions$
    .pipe(
      ofType(loadRoles),
      exhaustMap(() => this._roleService.getRoles(0, 0)
        .pipe(
          map(roles => loadRolesSucceeded({roles})),
          catchError(err => of(loadRolesFailed({error: err.error.message})))
        )
      )
    )
  );
}
