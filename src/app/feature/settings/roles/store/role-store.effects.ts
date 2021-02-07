import {Injectable} from '@angular/core';
import {catchError, exhaustMap, map, withLatestFrom} from 'rxjs/operators';
import {of} from 'rxjs';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';

import {RoleStoreState} from './role-store.state';
import {RoleService} from '../../../../core/role/role.service';
import {loadRole, loadRoleFailed, loadRoles, loadRolesFailed, loadRolesSucceeded, loadRoleSucceeded} from './role-store.actions';
import {selectRoleStates} from './role-store.selectors';
import {LoadStatus} from '../../../../app-store.state';

@Injectable()
export class RoleStoreEffects {
  constructor(private _roleStore: Store<RoleStoreState>,
              private _actions$: Actions,
              private _roleService: RoleService
  ) { }

  /**
   * Effect that responds to the [loadRoles] action to retrieve Roles from the back-end.
   */
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

  /**
   * Effect that responds to the [loadRole] action to retrieve the details for the specified Role
   * if they have not already been retrieved.
   */
  public loadRole$ = createEffect(() => this._actions$
    .pipe(
      ofType(loadRole),
      withLatestFrom(this._roleStore.select(selectRoleStates)),
      exhaustMap(([action, state]) => {
        const rs = state.find(r => r.roleId === action.roleId);
        if (rs && (rs.roleLoadStatus === LoadStatus.Loaded || rs.roleLoadStatus === LoadStatus.NoContent)) {
          return of(loadRoleSucceeded({role: rs.role}));
        } else {
          return this._roleService.getRole(action.roleId, ['permissions'])
            .pipe(
              map(result =>
                loadRoleSucceeded({role: result})
              ),
              catchError(err =>
                of(loadRoleFailed({roleId: action.roleId, error: err.error.message}))
              )
            );
        }
      })
    )
  );
}
