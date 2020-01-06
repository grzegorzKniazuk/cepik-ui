import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DictionariesState, selectEntities } from 'src/app/store/dictionaries/dictionaries.reducer';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { Dictionary } from '@ngrx/entity';

export const selectDictionariesState = createFeatureSelector<DictionariesState>('dictionaries');

export const selectDictionariesEntities = createSelector(
    selectDictionariesState,
    selectEntities,
);

export const selectDictionary = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[] }>, { id }: { id: string }) => entities[id] ? entities[id].items : undefined),
);
