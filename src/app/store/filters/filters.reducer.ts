import { Action, createReducer, on } from '@ngrx/store';
import { SET_SEARCH_PHRASE } from 'src/app/store/filters/filters.actions';

export interface FiltersState {
    phrase: string;
}

const initialState: FiltersState = {
    phrase: '',
};

const reducer = createReducer(
    initialState,
    on(SET_SEARCH_PHRASE, (state, { phrase }) => {
        return {
            ...state,
            phrase,
        };
    }),
);

export function filtersReducer(state: FiltersState, action: Action): FiltersState {
    return reducer(state, action);
}
