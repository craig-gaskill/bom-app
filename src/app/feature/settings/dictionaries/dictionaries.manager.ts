import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {DictionaryState} from './store/dictionary-store.state';
import {
  selectAllDictionaries,
  selectAllDictionaryValues,
  selectDictionaryLoadStatus,
  selectDictionaryViewStatus,
} from './store/dictionary-store.selectors';
import {
  dictionaryValueAdd,
  dictionaryValueCancel,
  dictionaryValueDelete,
  dictionaryValueEdit,
  dictionaryValueSave,
  loadDictionaries,
  loadDictionaryValues,
  resetDictionaries,
  resetDictionaryValues
} from './store/dictionary-store.actions';
import {LoadStatus, ViewStatus} from '../../../app-store.state';
import {Dictionary} from '../../../core/dictionary/dictionary.model';
import {DictionaryValue} from '../../../core/dictionary/value/dictionary-value.model';

@Injectable({
  providedIn: 'root'
})
export class DictionariesManager {
  constructor(private _dictionaryStore: Store<DictionaryState>) { }

  /**
   * Will return an {Observable} that can be subscribed to to listen for changes to the list of Dictionaries.
   */
  public selectAllDictionaries(): Observable<Dictionary[]> {
    return this._dictionaryStore.select(selectAllDictionaries);
  }

  /**
   * Will load the dictionaries and set that as the list of dictionaries, appending if necessary.
   */
  public loadAllDictionaries(): Observable<LoadStatus> {
    this._dictionaryStore.dispatch(loadDictionaries());
    return this._dictionaryStore.select(selectDictionaryLoadStatus);
  }

  /**
   * Will reset the DictionariesStore back to its initial state.
   */
  public resetDictionaries(): void {
    this._dictionaryStore.dispatch(resetDictionaries());
  }

  /**
   * Will return an {Observable} that can be subscribed to to listen for changes to the view-status of the Dictionaries.
   */
  public getViewStatus(): Observable<ViewStatus> {
    return this._dictionaryStore.select(selectDictionaryViewStatus);
  }

  /**
   * Will return an {Observable} that can be subscribed to to listen for changes to the list of Dictionary Values for the specified
   * dictionary meaning.
   *
   * @param dictionaryMeaning
   *    The meaning of the Dictionary to listed for changes to Dictionary Values on.
   */
  public selectAllDictionaryValues(dictionaryMeaning: string): Observable<DictionaryValue[]> {
    return this._dictionaryStore.select(selectAllDictionaryValues(dictionaryMeaning));
  }

  /**
   * Will load the dictionary values for the specified dictionary meaning.
   */
  public loadAllDictionaryValues(dictionaryMeaning: string): Observable<LoadStatus> {
    this._dictionaryStore.dispatch(loadDictionaryValues({dictionaryMeaning}));
    return this._dictionaryStore.select(selectDictionaryLoadStatus);
  }

  /**
   * Will reset the dictionary values (for the specified dictionary meaning) back to its initial state.
   */
  public resetDictionaryValues(dictionaryMeaning: string): void {
    this._dictionaryStore.dispatch(resetDictionaryValues({dictionaryMeaning}));
  }

  public addDictionaryValue(dictionaryMeaning: string): void {
    this._dictionaryStore.dispatch(dictionaryValueAdd({dictionaryMeaning}));
  }

  public editDictionaryValue(dictionaryMeaning: string, dictionaryValue: DictionaryValue): void {
    this._dictionaryStore.dispatch(dictionaryValueEdit({dictionaryMeaning, dictionaryValue}));
  }

  public cancelDictionaryValue(dictionaryMeaning: string, dictionaryValue: DictionaryValue): void {
    this._dictionaryStore.dispatch(dictionaryValueCancel({dictionaryMeaning, dictionaryValue}));
  }

  public saveDictionaryValue(dictionaryMeaning: string, dictionaryValue: DictionaryValue): void {
    this._dictionaryStore.dispatch(dictionaryValueSave({dictionaryMeaning, dictionaryValue}));
  }

  public deleteDictionaryValue(dictionaryMeaning: string, dictionaryValue: DictionaryValue): void {
    this._dictionaryStore.dispatch(dictionaryValueDelete({dictionaryMeaning, dictionaryValue}));
  }
}
