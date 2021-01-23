import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {catchError, takeWhile} from 'rxjs/operators';

import {RoleService} from '../../../core/role/role.service';
import {Role} from '../../../core/role/role.model';
import {NotificationService} from '../../../core/notification/notification.service';

@Component({
  selector: 'bom-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent implements OnInit, OnDestroy {
  private _subscribed = true;

  public roles$: Observable<Role[]>;
  public expandedRoleId: number;

  constructor(private _roleService: RoleService,
              private _notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.roles$ = this._roleService.getRoles()
      .pipe(
        takeWhile(() => this._subscribed),
        catchError(() => {
          this._notificationService.failure('Unable to retrieve Roles.');
          return EMPTY;
        })
      );
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }

  public onExpandRole(roleId: number): void {
    this.expandedRoleId = roleId;
  }
}
