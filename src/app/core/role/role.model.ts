import {BaseModel} from '../base.model';
import {RolePermission} from './role-permission.model';

export interface Role extends BaseModel {
  roleId?: number;
  name: string;
  fullAccess: boolean;
  permissions?: RolePermission[];
}

export abstract class RoleUtil {
  public static deserializeRoles(roles: any): Role[] {
    return roles;
  }

  public static deserializeRole(role: any): Role {
    return role;
  }

  public static serializeRoles(roles: Role[]): any {
    return roles;
  }

  public static serializeRole(role: Role): any {
    return role;
  }
}
