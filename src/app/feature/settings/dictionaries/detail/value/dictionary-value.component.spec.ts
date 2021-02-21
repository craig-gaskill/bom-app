import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {DictionaryValueComponent} from './dictionary-value.component';

describe('ValueComponent', () => {
  let component: DictionaryValueComponent;
  let fixture: ComponentFixture<DictionaryValueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
