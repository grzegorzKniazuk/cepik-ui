import { createAction, props } from '@ngrx/store';
import { Links } from 'src/app/shared/interfaces';
import { PAGINATION_LINKS_FEATURE_KEY } from 'src/app/store/feature-names';

const ACTION_LABEL = `[${PAGINATION_LINKS_FEATURE_KEY.toUpperCase()}]`;

export const SET_PAGINATION_PAGE_NUMBERS = createAction(
    `${ACTION_LABEL} SET_PAGINATION_PAGE_NUMBERS`,
    props<{ links: Partial<Links> }>(),
);
