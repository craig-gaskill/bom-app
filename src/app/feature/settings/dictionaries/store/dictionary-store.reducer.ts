import {Action, createReducer, on} from '@ngrx/store';

import {DictionaryState, DictionaryValueState, initialDictionaryState} from './dictionary-store.state';
import {
  dictionaryValueAdd,
  dictionaryValueCancel,
  dictionaryValueCreated,
  dictionaryValueDeleted,
  dictionaryValueEdit,
  dictionaryValueUpdated,
  loadDictionaries,
  loadDictionariesFailed,
  loadDictionariesSucceeded,
  loadDictionaryValues,
  loadDictionaryValuesFailed,
  loadDictionaryValuesSucceeded,
  resetDictionaries,
  resetDictionaryValues
} from './dictionary-store.actions';
import {LoadStatus, ViewStatus} from '../../../../app-store.state';
import {DictionaryValue} from '../../../../core/dictionary/value/dictionary-value.model';
import {ArrayUtil} from '../../../../core/utilities/array.util';

const reducer = createReducer(initialDictionaryState,
  on(loadDictionaries, (state) => ({
    ...state,
    dictionaries: undefined,
    dictionariesLoadStatus: LoadStatus.Loading,
    dictionariesLoadError: undefined
  })),
  on(loadDictionariesSucceeded, (state, action) => ({
    ...state,
    dictionaries: action.dictionaries,
    dictionariesLoadStatus: (ArrayUtil.isNotEmpty(action.dictionaries) ? LoadStatus.Loaded : LoadStatus.NoContent)
  })),
  on(loadDictionariesFailed, (state, action) => ({
    ...state,
    dictionariesLoadStatus: LoadStatus.Error,
    dictionariesLoadError: action.error
  })),
  on(resetDictionaries, () => initialDictionaryState),
  on(loadDictionaryValues, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx === -1) {
      dvs.push({
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: undefined,
        dictionaryValuesLoadStatus: LoadStatus.Loading,
        dictionaryValuesLoadError: undefined
      });
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(loadDictionaryValuesSucceeded, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    dvs.push({
      dictionaryMeaning: action.dictionaryMeaning,
      dictionaryValues: action.values,
      dictionaryValuesLoadStatus: (action.values && action.values.length > 0) ? LoadStatus.Loaded : LoadStatus.NoContent,
      dictionaryValuesLoadError: undefined
    });

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(loadDictionaryValuesFailed, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    dvs.push({
      dictionaryMeaning: action.dictionaryMeaning,
      dictionaryValues: undefined,
      dictionaryValuesLoadStatus: LoadStatus.Error,
      dictionaryValuesLoadError: action.error
    });

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(resetDictionaryValues, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      // remove the old one (if it existed)
      dvs.splice(idx, 1);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  }),
  on(dictionaryValueAdd, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values: DictionaryValue[] = [
        ...dvs[idx].dictionaryValues, {
          display: '',
          meaning: '',
          viewable: true,
          editable: true,
          deletable: true,
          active: true,
          updateCount: 0
        }
      ];

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs,
      dictionaryViewStatus: ViewStatus.Add
    };
  }),
  on(dictionaryValueEdit, (state) => ({
    ...state,
    dictionaryViewStatus: ViewStatus.Edit
  })),
  on(dictionaryValueCancel, (state, action) => {
    // if we are canceling a new Dictionary Value
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (!action.dictionaryValue.dictionaryValueId && idx >= 0) {
      const values = [...dvs[idx].dictionaryValues];
      const existingIdx = values.findIndex(v => v.dictionaryValueId === action.dictionaryValue.dictionaryValueId);
      if (existingIdx >= 0) {
        // remove the new Dictionary Value that was canceled
        values.splice(existingIdx, 1);
      }

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs,
      dictionaryViewStatus: ViewStatus.View
    };
  }),
  on(dictionaryValueCreated, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values = [...dvs[idx].dictionaryValues, action.dictionaryValue]
        .filter(v => v.dictionaryValueId > 0); // filter out anything w/o an ID (the empty one that was added)

      values.sort((lhs, rhs) => lhs.display.localeCompare(rhs.display));

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs,
      dictionaryViewStatus: ViewStatus.View
    };
  }),
  on(dictionaryValueUpdated, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values = [...dvs[idx].dictionaryValues];
      const existingIdx = values.findIndex(v => v.dictionaryValueId === action.dictionaryValue.dictionaryValueId);
      if (existingIdx >= 0) {
        values.splice(existingIdx, 1, action.dictionaryValue);
      }
      values.sort((lhs, rhs) => lhs.display.localeCompare(rhs.display));

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs,
      dictionaryViewStatus: ViewStatus.View
    };
  }),
  on(dictionaryValueDeleted, (state, action) => {
    const idx = state.dictionaryValueStates.findIndex(s => s.dictionaryMeaning === action.dictionaryMeaning);
    const dvs = [...state.dictionaryValueStates];

    if (idx >= 0) {
      const values = [...dvs[idx].dictionaryValues];
      const existingIdx = values.findIndex(v => v.dictionaryValueId === action.dictionaryValue.dictionaryValueId);
      if (existingIdx >= 0) {
        values.splice(existingIdx, 1);
      }

      const dv: DictionaryValueState = {
        dictionaryMeaning: action.dictionaryMeaning,
        dictionaryValues: values,
        dictionaryValuesLoadStatus: dvs[idx].dictionaryValuesLoadStatus,
        dictionaryValuesLoadError: dvs[idx].dictionaryValuesLoadError
      };

      // remove the old one (if it existed)
      dvs.splice(idx, 1, dv);
    }

    return {
      ...state,
      dictionaryValueStates: dvs
    };
  })
);

export function dictionaryReducer(state: DictionaryState | undefined, action: Action) {
  return reducer(state, action);
}
