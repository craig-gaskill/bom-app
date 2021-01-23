import {BaseModel} from '../base.model';

export interface RolePermission extends BaseModel {
  rolePermissionId: number;
  permissionId: number;
  featureId: number;
  code: string;
  display: string;
  description: string;
  granted: boolean;
}

export abstract class RolePermissionUtil {
  public static deserializeRolePermissions(rolePermissions: any): RolePermission[] {
    return rolePermissions;
  }

  public static deserializeRolePermission(rolePermission: any): RolePermission {
    return rolePermission;
  }

  public static serializeRolePermissions(rolePermissions: RolePermission[]): any {
    return rolePermissions;
  }

  public static serializeRolePermission(rolePermission: RolePermission): any {
    return rolePermission;
  }
}
