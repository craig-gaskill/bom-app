import {createFeatureSelector, createSelector} from '@ngrx/store';

import {roleFeature, RoleStoreState} from './role-store.state';
import {Role} from '../../../../core/role/role.model';
import {LoadStatus} from '../../../../app-store.state';

const getAllRoles = (state: RoleStoreState): Role[] => state.roles;
const getRoleLoadStatus = (state: RoleStoreState): LoadStatus => state.rolesLoadStatus;
const getRoleLoadError  = (state: RoleStoreState): string => state.rolesLoadError;

const selectRoleState = createFeatureSelector<RoleStoreState>(roleFeature);

export const selectAllRoles = createSelector(selectRoleState, getAllRoles);
export const selectRoleLoadStatus = createSelector(selectRoleState, getRoleLoadStatus);
export const selectRoleLoadError  = createSelector(selectRoleState, getRoleLoadError);
