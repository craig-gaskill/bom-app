import {Role} from '../../../../core/role/role.model';
import {LoadStatus} from '../../../../app-store.state';

export const roleFeature = 'roleFeature';

export interface RoleStoreState {
  roles: Role[];
  rolesLoadStatus: LoadStatus;
  rolesLoadError: string;
}

export const initialRoleStoreState: RoleStoreState = {
  roles: undefined,
  rolesLoadStatus: undefined,
  rolesLoadError: undefined
};
