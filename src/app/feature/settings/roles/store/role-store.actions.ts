import {createAction, props} from '@ngrx/store';

import {Role} from '../../../../core/role/role.model';

export const loadRoles =
  createAction('[Roles] Load');
export const loadRolesSucceeded =
  createAction('[Roles] Load Succeeded', props<{roles: Role[]}>());
export const loadRolesFailed =
  createAction('[Roles] Load Failed', props<{error: string}>());
export const resetRoles =
  createAction('[Roles] Reset');

export const loadRole =
  createAction('[Role] Load', props<{roleId: number}>());
export const loadRoleSucceeded =
  createAction('[Role] Load Succeeded', props<{role: Role}>());
export const loadRoleFailed =
  createAction('[Role] Load Failed', props<{roleId: number, error: string}>());
