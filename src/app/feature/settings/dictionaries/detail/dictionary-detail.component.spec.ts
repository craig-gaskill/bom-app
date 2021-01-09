import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DictionaryDetailComponent} from './dictionary-detail.component';

describe('DictionaryDetailComponent', () => {
  let component: DictionaryDetailComponent;
  let fixture: ComponentFixture<DictionaryDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
