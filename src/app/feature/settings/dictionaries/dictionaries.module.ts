import {NgModule} from '@angular/core';

import {SharedModule} from '../../../shared/shared.module';

import {DictionaryRoutingModule} from './dictionary-routing.module';
import {DictionaryStoreModule} from './store/dictionary-store.module';

import {DictionariesComponent} from './dictionaries.component';
import {DictionaryDetailComponent} from './detail/dictionary-detail.component';
import {DictionaryValueComponent} from './detail/value/dictionary-value.component';

@NgModule({
  imports: [
    SharedModule,

    DictionaryRoutingModule,
    DictionaryStoreModule
  ],
  declarations: [
    DictionariesComponent,
    DictionaryDetailComponent,
    DictionaryValueComponent
  ],
})
export class DictionariesModule { }
