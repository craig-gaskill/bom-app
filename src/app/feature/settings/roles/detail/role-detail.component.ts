import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {takeWhile} from 'rxjs/operators';
import {ReplaySubject} from 'rxjs';

import {Role} from '../../../../core/role/role.model';
import {NotificationService} from '../../../../core/notification/notification.service';
import {RolesManager} from '../roles.manager';

export interface RolePermission {
  key: string;
  permission: RolePermission;
  isLeaf: boolean;
  hasViewPermission: boolean;
  hasAddPermission: boolean;
  hasEditPermission: boolean;
  hasDeletePermission: boolean;
}

@Component({
  selector: 'bom-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  private _subscribed = true;
  private _sections: Map<string, RolePermission> = new Map<string, RolePermission>();

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
        result.permissions.forEach(permission => {
          const parts = permission.code.split('.');
        });

        this.role$.next(result);
      });
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }
}
