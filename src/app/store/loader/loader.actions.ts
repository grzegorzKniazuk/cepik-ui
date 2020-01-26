import { createAction, props } from '@ngrx/store';

const ACTION_LABEL = '[LOADER]';

export const SHOW_LOADER = createAction(
    `${ACTION_LABEL} SHOW_LOADER`,
);

export const HIDE_LOADER = createAction(
    `${ACTION_LABEL} HIDE_LOADER`,
);

export const SET_LOADED_PAGE_DATA = createAction(
    `${ACTION_LABEL} SET_LOADED_PAGE_DATA`,
    props<{ url: string, data: any }>()
);
