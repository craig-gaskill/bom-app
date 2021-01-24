import {Dictionary} from '../../../../core/dictionary/dictionary.model';
import {DictionaryValue} from '../../../../core/dictionary/value/dictionary-value.model';
import {LoadStatus, ViewStatus} from '../../../../app-store.state';

export const dictionaryFeature = 'dictionaryFeature';

export interface DictionaryValueState {
  dictionaryMeaning: string;
  dictionaryValues: DictionaryValue[];
  dictionaryValuesLoadStatus: LoadStatus;
  dictionaryValuesLoadError: string;
}

export interface DictionaryState {
  dictionaries: Dictionary[];
  dictionariesLoadStatus: LoadStatus;
  dictionariesLoadError: string;
  dictionaryValueStates: DictionaryValueState[];
  dictionaryViewStatus: ViewStatus;
}

export const initialDictionaryState: DictionaryState = {
  dictionaries: undefined,
  dictionariesLoadStatus: undefined,
  dictionariesLoadError: undefined,
  dictionaryValueStates: [],
  dictionaryViewStatus: ViewStatus.View
};
