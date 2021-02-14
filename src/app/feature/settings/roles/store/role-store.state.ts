import {Role} from '../../../../core/role/role.model';
import {LoadStatus} from '../../../../app-store.state';

export const roleFeature = 'roleFeature';

export interface RoleState {
  roleId: number;
  role: Role;
  roleLoadStatus: LoadStatus;
  roleLoadError: string;
}

export interface RoleStoreState {
  roles: Role[];
  rolesLoadStatus: LoadStatus;
  rolesLoadError: string;
  roleStates: RoleState[];
}

export const initialRoleStoreState: RoleStoreState = {
  roles: undefined,
  rolesLoadStatus: undefined,
  rolesLoadError: undefined,
  roleStates: []
};
