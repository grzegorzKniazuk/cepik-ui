import { createFeatureSelector, createSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { DictionariesState, selectEntities } from 'src/app/store/dictionaries/dictionaries.reducer';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { Dictionary } from '@ngrx/entity';
import { AppState } from 'src/app/store/index';

export const selectDictionariesState = createFeatureSelector<AppState, DictionariesState>('dictionaries');

export const selectDictionariesEntities = createSelector(
    selectDictionariesState,
    selectEntities,
);

export const selectDictionary: MemoizedSelectorWithProps<AppState, { id: string }, DictionaryItem[] | null> = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[], total: number }>, { id }: { id: string }) => {
        return entities[id] ? entities[id].items : null;
    }),
);
