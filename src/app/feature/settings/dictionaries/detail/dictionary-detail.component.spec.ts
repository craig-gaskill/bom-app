import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {StoreModule} from '@ngrx/store';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {DictionaryDetailComponent} from './dictionary-detail.component';
import {dictionaryFeature, initialDictionaryState} from '../store/dictionary-store.state';
import {dictionaryReducer} from '../store/dictionary-store.reducer';
import {SharedModule} from '../../../../shared/shared.module';

describe('DictionaryDetailComponent', () => {
  let component: DictionaryDetailComponent;
  let fixture: ComponentFixture<DictionaryDetailComponent>;
  let store: MockStore;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
//        StoreModule.forRoot({}),
//        StoreModule.forFeature(dictionaryFeature, dictionaryReducer),
        SharedModule
      ],
      declarations: [
        DictionaryDetailComponent
      ],
      providers: [
        provideMockStore({
          initialState: initialDictionaryState
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DictionaryDetailComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    component.dictionary = {
      dictionaryId: 1,
      display: 'Test',
      meaning: 'TEST',
      viewable: true,
      editable: true,
      deletable: true,
      active: true,
      updatedCount: 0
    };

    store.refreshState();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
