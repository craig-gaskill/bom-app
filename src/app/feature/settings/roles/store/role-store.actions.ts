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
