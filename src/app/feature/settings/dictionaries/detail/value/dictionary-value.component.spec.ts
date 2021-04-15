import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {StoreModule} from '@ngrx/store';

import {DictionaryValueComponent} from './dictionary-value.component';
import {dictionaryFeature} from '../../store/dictionary-store.state';
import {dictionaryReducer} from '../../store/dictionary-store.reducer';
import {SharedModule} from '../../../../../shared/shared.module';

describe('DictionaryValueComponent', () => {
  let component: DictionaryValueComponent;
  let fixture: ComponentFixture<DictionaryValueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(dictionaryFeature, dictionaryReducer),
        SharedModule
      ],
      declarations: [
        DictionaryValueComponent
      ]
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
