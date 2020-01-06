import { createAction } from '@ngrx/store';

const ACTION_LABEL = '[LOADER]';

export const SHOW_LOADER = createAction(
    `${ACTION_LABEL} SHOW_LOADER`,
);

export const HIDE_LOADER = createAction(
    `${ACTION_LABEL} HIDE_LOADER`,
);
