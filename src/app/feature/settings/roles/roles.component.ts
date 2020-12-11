import {Component, OnDestroy, OnInit} from '@angular/core';
import {EMPTY} from "rxjs";
import {catchError, takeWhile} from "rxjs/operators";

import {RoleService} from "../../../core/role/role.service";
import {Role} from "../../../core/role/role.model";
import {NotificationService} from "../../../core/notification/notification.service";

@Component({
  selector: 'bom-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit, OnDestroy {
  private _subscribed = true;

  public roles: Role[] = [];

  constructor(private _roleService: RoleService,
              private _notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this._roleService.getRoles()
      .pipe(
        takeWhile(() => this._subscribed),
        catchError(() => {
          this._notificationService.failure('Unable to retrieve Roles.');
          return EMPTY;
        })
      )
      .subscribe(results => this.roles = results);
  }

  public ngOnDestroy(): void {
    this._subscribed = false;
  }
}
