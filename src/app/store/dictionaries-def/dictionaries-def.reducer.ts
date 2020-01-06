import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { DictionaryDef } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { SET_DICTIONARIES_DEF } from 'src/app/store/dictionaries-def/dictionaries-def.actions';

export interface DictionariesDefState extends EntityState<DictionaryDef> {
    loaded: boolean;
}

const adapter = createEntityAdapter<DictionaryDef>();

const initialDictionaryDefState = adapter.getInitialState({
    loaded: false,
});

const reducer = createReducer(
    initialDictionaryDefState,
    on(SET_DICTIONARIES_DEF, (state, { def }) => {
        return adapter.addAll(def, {
            ...state,
            loaded: true,
        });
    }),
);

export function dictionariesDefReducer(state: DictionariesDefState, action: Action): DictionariesDefState {
    return reducer(state, action);
}

export const { selectAll } = adapter.getSelectors();
