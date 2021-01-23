import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {catchError, takeWhile} from 'rxjs/operators';

import {Role} from '../../../../core/role/role.model';
import {RoleService} from '../../../../core/role/role.service';
import {NotificationService} from '../../../../core/notification/notification.service';
import {ArrayUtil} from '../../../../core/utilities/array.util';

@Component({
  selector: 'bom-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDetailComponent implements OnInit, OnDestroy {
  private _subscribed = true;

  @Input()
  public role: Role;

  public role$: Observable<Role>;

  constructor(private _roleService: RoleService,
              private _notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.role$ = ArrayUtil.isNotEmpty(this.role.permissions) ?
      of(this.role) :
      this._roleService.getRole(this.role.roleId, ['permissions'])
        .pipe(
          takeWhile(() => this._subscribed),
          catchError(() => {
            this._notificationService.failure('Failed to retrieve Role');
            return EMPTY;
          })
        );
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }
}
