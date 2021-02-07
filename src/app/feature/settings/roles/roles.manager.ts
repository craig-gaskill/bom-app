import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';

import {RoleStoreState} from './store/role-store.state';
import {Role} from '../../../core/role/role.model';
import {selectAllRoles, selectRole, selectRoleLoadStatus} from './store/role-store.selectors';
import {LoadStatus} from '../../../app-store.state';
import {loadRole, loadRoles, resetRoles} from './store/role-store.actions';

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
   * Will return an {Observable} that can be subscribed to to listen for when the Role
   * (associated with the specified roleId) is available.
   *
   * @param roleId
   *    The unique identifier of the Role to select.
   */
  public selectRole(roleId: number): Observable<Role> {
    return this._roleStore.select(selectRole(roleId));
  }

  /**
   * Will load the role with all the necessary details for the specified roleId.
   */
  public loadRole(roleId: number): Observable<LoadStatus> {
    this._roleStore.dispatch(loadRole({roleId}));
    return this._roleStore.select(selectRoleLoadStatus);
  }

  /**
   * Will reset the RolesStore back to its initial state.
   */
  public resetRoles(): void {
    this._roleStore.dispatch(resetRoles());
  }
}
