import { createAction, props } from '@ngrx/store';
import { Links } from 'src/app/shared/interfaces';

const ACTION_LABEL = '[PAGINATION_LINKS]';

export const SET_PAGINATION_LINKS = createAction(
    `${ACTION_LABEL} SET_PAGINATION_LINKS`,
    props<{ links: Partial<Links> }>(),
);
