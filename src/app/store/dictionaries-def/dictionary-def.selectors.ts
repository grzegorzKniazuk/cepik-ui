import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DictionariesDefState, selectAll } from 'src/app/store/dictionaries-def/dictionaries-def.reducer';

export const selectDictionariesDefState = createFeatureSelector<DictionariesDefState>('dictionariesDef');

export const selectIsDictionariesDefLoaded = createSelector(
    selectDictionariesDefState,
    (state) => state.loaded,
);

export const selectAllDictionariesDef = createSelector(
    selectDictionariesDefState,
    selectAll,
);
