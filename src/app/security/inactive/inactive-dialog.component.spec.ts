import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {InactiveDialogComponent} from './inactive-dialog.component';

describe('InactiveDialogComponent', () => {
  let component: InactiveDialogComponent;
  let fixture: ComponentFixture<InactiveDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveDialogComponent ]
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
