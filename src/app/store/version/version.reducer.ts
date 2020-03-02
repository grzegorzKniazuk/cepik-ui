import { Action, createReducer, on } from '@ngrx/store';
import { SET_VERSION } from 'src/app/store/version/version.actions';

export interface VersionState {
    dateMod: string;
    deprecated: string;
    major: string;
    minor: string;
    patch: string;
}

export const initialVersionState: VersionState = {
    dateMod: null,
    deprecated: null,
    major: null,
    minor: null,
    patch: null,
};

const reducer = createReducer(
    initialVersionState,
    on(SET_VERSION, (state, { version }) => {
        return {
            ...state,
            ...version,
        };
    }),
);

export function versionReducer(state: VersionState, action: Action): VersionState {
    return reducer(state, action);
}
