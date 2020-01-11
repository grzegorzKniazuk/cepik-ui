import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { SET_DICTIONARY_ITEM } from 'src/app/store/dictionaries/dictionaries.actions';

export interface DictionariesState extends EntityState<{ id: string, items: DictionaryItem[], total: number }> {
}

const adapter = createEntityAdapter<{ id: string, items: DictionaryItem[], total: number }>({
    selectId: (state) => state.id,
});

const initialState: DictionariesState = adapter.getInitialState();

const reducer = createReducer(
    initialState,
    on(SET_DICTIONARY_ITEM, (state, { item }) => {
        return adapter.addOne(item, state);
    }),
);

export function dictionariesReducer(state: DictionariesState, action: Action): DictionariesState {
    return reducer(state, action);
}

export const { selectEntities } = adapter.getSelectors();
