import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StoreModule} from '@ngrx/store';
import {DictionariesComponent} from './dictionaries.component';
import {SharedModule} from '../../../shared/shared.module';
import {dictionaryFeature} from './store/dictionary-store.state';
import {dictionaryReducer} from './store/dictionary-store.reducer';

describe('DictionariesComponent', () => {
  let component: DictionariesComponent;
  let fixture: ComponentFixture<DictionariesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature(dictionaryFeature, dictionaryReducer),
        SharedModule
      ],
      declarations: [
        DictionariesComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
