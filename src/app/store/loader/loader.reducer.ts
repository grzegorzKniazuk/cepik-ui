import { Action, createReducer, on } from '@ngrx/store';
import { HIDE_LOADER, SET_LOADED_PAGE_DATA, SHOW_LOADER } from 'src/app/store/loader/loader.actions';
import { Links, Meta } from 'src/app/shared/interfaces';

export interface LoaderState {
    enabled: boolean;
    loadedPages: {
        [key: string]: {
            meta: Meta;
            links: Partial<Links>,
            data: string[]
        }
    };
}

export const initialLoaderState: LoaderState = {
    enabled: false,
    loadedPages: {},
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
    on(SET_LOADED_PAGE_DATA, (state, { url, data }) => {
        return {
            ...state,
            loadedPages: {
                ...state.loadedPages,
                [url]: data,
            },
        };
    }),
);

export function loaderReducer(state: LoaderState, action: Action): LoaderState {
    return reducer(state, action);
}
