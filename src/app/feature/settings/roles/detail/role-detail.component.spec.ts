import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StoreModule} from '@ngrx/store';

import {SharedModule} from '../../../../shared/shared.module';
import {RoleDetailComponent} from './role-detail.component';
import {roleFeature} from '../store/role-store.state';
import {roleReducer} from '../store/role-store.reducer';
import {Role} from '../../../../core/role/role.model';

describe('RoleDetailComponent', () => {
  let component: RoleDetailComponent;
  let fixture: ComponentFixture<RoleDetailComponent>;

  const adminRole: Role = {
    roleId: 1,
    name: 'Administrator',
    fullAccess: true,
    permissions: [
      {
        permissionId: 2,
        featureId: 1,
        code: 'settings.dictionary.view',
        display: 'Access Dictionaries',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 6,
        featureId: 1,
        code: 'settings.role.view',
        display: 'Access Roles',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 1,
        featureId: 1,
        code: 'settings.view',
        display: 'Access Settings',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 10,
        featureId: 1,
        code: 'settings.staff.view',
        display: 'Access Staff',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 3,
        featureId: 1,
        code: 'settings.dictionary.add',
        display: 'Add Dictionaries',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 7,
        featureId: 1,
        code: 'settings.role.add',
        display: 'Add Roles',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 11,
        featureId: 1,
        code: 'settings.staff.add',
        display: 'Add Staff',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 5,
        featureId: 1,
        code: 'settings.dictionary.delete',
        display: 'Delete Dictionaries',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 9,
        featureId: 1,
        code: 'settings.role.delete',
        display: 'Delete Roles',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 13,
        featureId: 1,
        code: 'settings.staff.delete',
        display: 'Delete Staff',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 4,
        featureId: 1,
        code: 'settings.dictionary.edit',
        display: 'Edit Dictionaries',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 8,
        featureId: 1,
        code: 'settings.role.edit',
        display: 'Edit Roles',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 12,
        featureId: 1,
        code: 'settings.staff.edit',
        display: 'Edit Staff',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 15,
        featureId: 1,
        code: 'settings.user.lock',
        display: 'Lock User',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 16,
        featureId: 1,
        code: 'settings.user.unlock',
        display: 'Un-Lock User',
        granted: false,
        active: false,
        updatedCount: 0
      },
      {
        permissionId: 14,
        featureId: 1,
        code: 'settings.user.group',
        display: 'User Settings',
        granted: false,
        active: false,
        updatedCount: 0
      }
    ],
    active: true,
    updatedCount: 0
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(roleFeature, roleReducer),
        SharedModule
      ],
      declarations: [
        RoleDetailComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('_parseIntoSections', () => {
    it('should return undefined if the role is undefined', () => {
      const actual = component['_parseIntoSections'](undefined);

      expect(actual).toBeUndefined();
    });

    it('should return undefined if the role has no permissions', () => {
      const role: Role = {
        name: 'Test',
        fullAccess: false,
        active: true,
        updatedCount: 0
      };

      const actual = component['_parseIntoSections'](role);

      expect(actual).toBeUndefined();
    });

    it('should parse the permissions into sections', () => {
      const actual = component['_parseIntoSections'](adminRole);

      expect(actual).toBeDefined();
      expect(actual).toBeInstanceOf(Map);
      expect(actual.size).toEqual(5);
    });
  });
});

