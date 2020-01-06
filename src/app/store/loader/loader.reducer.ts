import { Action, createReducer, on } from '@ngrx/store';
import { HIDE_LOADER, SHOW_LOADER } from 'src/app/store/loader/loader.actions';

export interface LoaderState {
    enabled: boolean;
}

const initialLoaderState: LoaderState = {
    enabled: false,
};

const reducer = createReducer(
    initialLoaderState,
    on(SHOW_LOADER, (state) => {
        return {
            ...state,
            enabled: true,
        };
    }),
    on(HIDE_LOADER, (state) => {
        return {
            ...state,
            enabled: false,
        };
    }),
);

export function loaderReducer(state: LoaderState, action: Action): LoaderState {
    return reducer(state, action);
}
