import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {InactiveDialogComponent} from './inactive-dialog.component';

describe('InactiveDialogComponent', () => {
  let component: InactiveDialogComponent;
  let fixture: ComponentFixture<InactiveDialogComponent>;

  beforeEach(async(() => {
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
