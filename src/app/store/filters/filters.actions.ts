import { createAction, props } from '@ngrx/store';

const ACTION_LABEL = '[FILTERS]';

export const SET_SEARCH_PHRASE = createAction(
    `${ACTION_LABEL} SET_SEARCH_PHRASE`,
    props<{ phrase: string }>(),
);
