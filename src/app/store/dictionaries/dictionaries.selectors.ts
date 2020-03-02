import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DictionariesState, selectEntities } from 'src/app/store/dictionaries/dictionaries.reducer';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { Dictionary } from '@ngrx/entity';
import { AppState } from 'src/app/store/index';
import { DICTIONARIES_FEATURE_KEY } from 'src/app/store/feature-names';

export const selectDictionariesState = createFeatureSelector<AppState, DictionariesState>(DICTIONARIES_FEATURE_KEY);

export const selectDictionariesEntities = createSelector(
    selectDictionariesState,
    selectEntities,
);

export const selectDictionary = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[] }>, { id }: { id: string }) => {
        if (entities[id]) {
            return entities[id].items;
        }
    }),
);
