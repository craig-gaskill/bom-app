import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {DictionaryStoreEffects} from './dictionary-store.effects';
import {dictionaryReducer} from './dictionary-store.reducer';
import {dictionaryFeature} from './dictionary-store.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(dictionaryFeature, dictionaryReducer),
    EffectsModule.forFeature([DictionaryStoreEffects])
  ],
  providers: [
    DictionaryStoreEffects
  ]
})
export class DictionaryStoreModule { }
