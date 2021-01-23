import {Component, Input} from '@angular/core';

export interface Breadcrumb {
  name: string;
  description?: string;
  icon?: string;
  routerLink?: string;
  routerLinkActive?: string;
  crumbs?: Breadcrumb[];
}

@Component({
  selector: 'bom-breadcrumb',
  templateUrl: './bom-breadcrumb.component.html',
  styleUrls: ['./bom-breadcrumb.component.scss']
})
export class BomBreadcrumbComponent {
  @Input()
  public breadcrumbs: Breadcrumb[];
}
