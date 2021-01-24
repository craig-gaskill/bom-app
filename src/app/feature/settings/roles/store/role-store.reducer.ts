import {Action, createReducer, on} from '@ngrx/store';

import {initialRoleStoreState, RoleStoreState} from './role-store.state';
import {loadRoles, loadRolesFailed, loadRolesSucceeded, resetRoles} from './role-store.actions';
import {LoadStatus} from '../../../../app-store.state';
import {ArrayUtil} from '../../../../core/utilities/array.util';

const reducer = createReducer(initialRoleStoreState,
  on(loadRoles, (state) => ({
    ...state,
    roles: undefined,
    rolesLoadStatus: LoadStatus.Loading,
    rolesLoadError: undefined
  })),
  on(loadRolesSucceeded, (state, action) => ({
    ...state,
    roles: action.roles,
    rolesLoadStatus: (ArrayUtil.isNotEmpty(action.roles) ? LoadStatus.Loaded : LoadStatus.NoContent)
  })),
  on(loadRolesFailed, (state, action) => ({
    ...state,
    rolesLoadStatus: LoadStatus.Error,
    rolesLoadError: action.error
  })),
  on(resetRoles, () => initialRoleStoreState)
);

export function roleReducer(state: RoleStoreState | undefined, action: Action) {
  return reducer(state, action)
}
