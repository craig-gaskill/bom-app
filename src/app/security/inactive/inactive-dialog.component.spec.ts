import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {NgIdleModule} from '@ng-idle/core';
import {InactiveDialogComponent} from './inactive-dialog.component';

describe('InactiveDialogComponent', () => {
  let component: InactiveDialogComponent;
  let fixture: ComponentFixture<InactiveDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NgIdleModule
      ],
      declarations: [
        InactiveDialogComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
