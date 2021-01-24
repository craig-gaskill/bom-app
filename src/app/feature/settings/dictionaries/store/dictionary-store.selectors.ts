import {createFeatureSelector, createSelector} from '@ngrx/store';

import {Dictionary} from '../../../../core/dictionary/dictionary.model';
import {dictionaryFeature, DictionaryState, DictionaryValueState} from './dictionary-store.state';
import {LoadStatus, ViewStatus} from '../../../../app-store.state';

const getAllDictionaries       = (state: DictionaryState): Dictionary[] => state.dictionaries;
const getDictionaryLoadStatus  = (state: DictionaryState): LoadStatus => state.dictionariesLoadStatus;
const getDictionaryLoadError   = (state: DictionaryState): string => state.dictionariesLoadError;
const getDictionaryValueStates = (state: DictionaryState): DictionaryValueState[] => state.dictionaryValueStates;
const getDictionaryViewStatus  = (state: DictionaryState): ViewStatus => state.dictionaryViewStatus;

const selectDictionaryState      = createFeatureSelector<DictionaryState>(dictionaryFeature);

export const selectAllDictionaries      = createSelector(selectDictionaryState, getAllDictionaries);
export const selectDictionaryLoadStatus = createSelector(selectDictionaryState, getDictionaryLoadStatus);
export const selectDictionaryLoadError  = createSelector(selectDictionaryState, getDictionaryLoadError);
export const selectDictionaryViewStatus = createSelector(selectDictionaryState, getDictionaryViewStatus);

export const selectDictionaryValueStates = createSelector(selectDictionaryState, getDictionaryValueStates);

export const selectAllDictionaryValues = (dictionaryMeaning: string) =>
  createSelector(selectDictionaryValueStates, states => {
    const state = states.find(s => s.dictionaryMeaning === dictionaryMeaning);
    return state ? state.dictionaryValues : undefined;
  });
