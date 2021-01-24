import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {RoleStoreState} from './store/role-store.state';
import {Role} from '../../../core/role/role.model';
import {selectAllRoles, selectRoleLoadStatus} from './store/role-store.selectors';
import {LoadStatus} from '../../../app-store.state';
import {loadRoles, resetRoles} from './store/role-store.actions';

@Injectable({
  providedIn: 'root'
})
export class RolesManager {
  constructor(private _roleStore: Store<RoleStoreState>) { }

  /**
   * Will return an {Observable} that can be subscribed to to listen for changes to the list of Roles.
   */
  public selectAllRoles(): Observable<Role[]> {
    return this._roleStore.select(selectAllRoles);
  }

  /**
   * Will load the roles and set that as the list of roles, appending if necessary.
   */
  public loadAllRoles(): Observable<LoadStatus> {
    this._roleStore.dispatch(loadRoles());
    return this._roleStore.select(selectRoleLoadStatus);
  }

  /**
   * Will reset the RolesStore back to its initial state.
   */
  public resetRoles(): void {
    this._roleStore.dispatch(resetRoles());
  }
}
