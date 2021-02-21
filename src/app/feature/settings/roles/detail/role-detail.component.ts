import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';

import {Role} from '../../../../core/role/role.model';
import {RolePermission} from '../../../../core/role/role-permission.model';
import {NotificationService} from '../../../../core/notification/notification.service';
import {RolesManager} from '../roles.manager';
import {ArrayUtil} from '../../../../core/utilities/array.util';
import {ObjectUtil} from '../../../../core/utilities/object.util';

export interface RoleSection {
  key: string;
  permission: RolePermission;
  viewPermission?: RolePermission;
  addPermission?: RolePermission;
  editPermission?: RolePermission;
  deletePermission?: RolePermission;
  customPermissions?: RolePermission[];
}

@Component({
  selector: 'bom-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  private readonly PERMISSION_GROUP  = 'group';
  private readonly PERMISSION_VIEW   = 'view';
  private readonly PERMISSION_ADD    = 'add';
  private readonly PERMISSION_EDIT   = 'edit';
  private readonly PERMISSION_DELETE = 'delete';

  private _subscribed = true;
  private _sections: Map<string, RoleSection> = new Map<string, RoleSection>();

  @Input()
  public roleId: number;

  public role$: ReplaySubject<Role> = new ReplaySubject<Role>(1);

  constructor(private _roleManager: RolesManager,
              private _notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this._roleManager.loadRole(this.roleId);

    this._roleManager.selectRole(this.roleId)
      .pipe(
        takeWhile(() => this._subscribed)
      )
      .subscribe(result => {
        this._sections = this._parseIntoSections(result);
        this.role$.next(result);
      });
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }

  /**
   * Will make the Permissions associated to the Role into sections by associating the
   * View, Add, Edit, Delete and custom permissions to the corresponding grouping permission.
   *
   * A "grouping" permission is any permission that ends with ".view" or ".group". This
   * will allow the following permissions to be viewed as follows:
   *
   * <pre>
   *   dictionary.view                 Access Dictionaries
   *   dictionary.add                      Add Dictionaries
   *   dictionary.edit                     Edit Dictionaries
   *   dictionary.delete                   Delete Dictionaries
   * </pre>
   */
  private _parseIntoSections(role: Role): Map<string, RoleSection> {
    if (ObjectUtil.isUndefined(role) || ArrayUtil.isEmpty(role.permissions)) {
      return undefined;
    }

    const sections: Map<string, RoleSection> = new Map<string, RoleSection>();
    role.permissions.forEach(permission => {
      const parts = permission.code.split('.');
      if (ArrayUtil.isNotEmpty(parts)) {
        const endPart = parts[parts.length - 1];
        let key = '';

        parts.forEach((part, idx) => {
          if (idx !== (parts.length - 1)) {
            if (idx > 0) {
              key += '.';
            }
            key += part;
          }
        });

        let section = sections.get(key);
        if (!section) {
          section = {
            key,
            permission,
            customPermissions: []
          };

        }

        if (this.PERMISSION_GROUP !== endPart) {
          if (this.PERMISSION_VIEW === endPart) {
            section = {
              key,
              permission,
              viewPermission: permission,
              addPermission: section.addPermission,
              editPermission: section.editPermission,
              deletePermission: section.deletePermission,
              customPermissions: section.customPermissions
            };
          } else if (this.PERMISSION_ADD === endPart) {
            section = {
              key,
              permission: section.permission,
              viewPermission: section.viewPermission,
              addPermission: permission,
              editPermission: section.editPermission,
              deletePermission: section.deletePermission,
              customPermissions: section.customPermissions
            };
          } else if (this.PERMISSION_EDIT === endPart) {
            section = {
              key,
              permission: section.permission,
              viewPermission: section.viewPermission,
              addPermission: section.addPermission,
              editPermission: permission,
              deletePermission: section.deletePermission,
              customPermissions: section.customPermissions
            };
          } else if (this.PERMISSION_DELETE === endPart) {
            section = {
              key,
              permission: section.permission,
              viewPermission: section.viewPermission,
              addPermission: section.addPermission,
              editPermission: section.editPermission,
              deletePermission: permission,
              customPermissions: section.customPermissions
            };
          } else {
            section = {
              key,
              permission: section.permission,
              viewPermission: section.viewPermission,
              addPermission: section.addPermission,
              editPermission: section.editPermission,
              deletePermission: section.deletePermission,
              customPermissions: [...section.customPermissions, permission]
            };
          }
        }

        sections.set(key, section);
      }
    });

    return sections;
  }

  /**
   * Will group the map of RoleSection into an array of RoleSections maintaining
   * the hierarchy from the mapping.
   *
   * <pre>
   *   settings                        Access Settings
   *   settings.dictionary                 Access Dictionaries
   *   settings.role                       Access Roles
   *   clients                         Access Clients
   *   clients.demographics                Access Client Demographics
   *   clients.notes                       Access Client Notes
   * </pre>
   */
  private _groupSections(sections: Map<string, RoleSection>): Map<string, RoleSection[]> {
    if (ObjectUtil.isUndefined(sections)) {
      return undefined;
    }

    const groups: Map<string, RoleSection[]> = new Map<string, RoleSection[]>();
    // sections.forEach((section, key) => {
    //   const parts = section.permission.code.split('.');
    //   if (ArrayUtil.isNotEmpty(parts)) {
    //     if (parts.length > 1) {
    //       let key = '';
    //
    //       parts.forEach((part, idx) => {
    //         if (idx !== 0) {
    //           if (idx > 1) {
    //             key += '.';
    //           }
    //           key += part;
    //         }
    //       });
    //
    //       const part = this._groupSections(key, section);
    //     }
    //   }
    // });

    return groups;
  }
}
