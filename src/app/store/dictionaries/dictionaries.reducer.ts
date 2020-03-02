import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { ADD_DICTIONARY_ITEM } from 'src/app/store/dictionaries/dictionaries.actions';

export interface DictionariesState extends EntityState<{ id: string, items: DictionaryItem[] }> {
}

const adapter = createEntityAdapter<{ id: string, items: DictionaryItem[] }>();

export const initialDictionariesState: DictionariesState = adapter.getInitialState();

const reducer = createReducer(
    initialDictionariesState,
    on(ADD_DICTIONARY_ITEM, (state, { item }) => {
        return adapter.addOne(item, state);
    }),
);

export function dictionariesReducer(state: DictionariesState, action: Action): DictionariesState {
    return reducer(state, action);
}

export const { selectEntities } = adapter.getSelectors();
