import {Component, Input} from "@angular/core";

import {Role} from "../../../../core/role/role.model";

@Component({
  selector: 'bom-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent {
  @Input()
  public role: Role;
}
