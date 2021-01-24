import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {Role} from '../../../core/role/role.model';
import {RolesManager} from './roles.manager';
import {LoadStatus} from '../../../app-store.state';

@Component({
  selector: 'bom-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolesComponent implements OnInit, OnDestroy {
  public readonly LOAD_STATUSES = LoadStatus;

  public roles$: Observable<Role[]>;
  public loadStatus$: Observable<LoadStatus>;
  public expandedRoleId: number;

  constructor(private _rolesManager: RolesManager) { }

  public ngOnInit(): void {
    this.roles$ = this._rolesManager.selectAllRoles();

    this.loadStatus$ = this._rolesManager.loadAllRoles();
  }

  public ngOnDestroy(): void {
    this._rolesManager.resetRoles();
  }

  public onExpandRole(roleId: number): void {
    this.expandedRoleId = roleId;
  }
}
