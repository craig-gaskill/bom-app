import {Action, createReducer, on} from '@ngrx/store';

import {initialRoleStoreState, RoleStoreState} from './role-store.state';
import {loadRoleFailed, loadRoles, loadRolesFailed, loadRolesSucceeded, loadRoleSucceeded, resetRoles} from './role-store.actions';
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
  on(loadRoleSucceeded, (state, action) => {
    const idx = state.roleStates.findIndex(s => s.roleId === action.role.roleId);
    const rs = [...state.roleStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      rs.splice(idx, 1);
    }

    rs.push({
      roleId: action.role.roleId,
      role: action.role,
      roleLoadStatus: (action.role ? LoadStatus.Loaded : LoadStatus.NoContent),
      roleLoadError: undefined
    });

    return {
      ...state,
      roleStates: rs
    };
  }),
  on(loadRoleFailed, (state, action) => {
    const idx = state.roleStates.findIndex(s => s.roleId === action.roleId);
    const rs = [...state.roleStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      rs.splice(idx, 1);
    }

    rs.push({
      roleId: action.roleId,
      role: undefined,
      roleLoadStatus: LoadStatus.Error,
      roleLoadError: action.error
    });

    return {
      ...state,
      roleStates: rs
    };
  }),
  on(resetRoles, () => initialRoleStoreState)
);

export function roleReducer(state: RoleStoreState | undefined, action: Action) {
  return reducer(state, action);
}
