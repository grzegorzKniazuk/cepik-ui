import { createAction, props } from '@ngrx/store';
import { LOADER_FEATURE_KEY } from 'src/app/store/feature-names';
import { Links, Meta } from 'src/app/shared/interfaces';

const ACTION_LABEL = `[${LOADER_FEATURE_KEY.toUpperCase()}]`;

export const SHOW_LOADER = createAction(
    `${ACTION_LABEL} SHOW_LOADER`,
);

export const HIDE_LOADER = createAction(
    `${ACTION_LABEL} HIDE_LOADER`,
);

export const SET_LOADED_PAGE_DATA = createAction(
    `${ACTION_LABEL} SET_LOADED_PAGE_DATA`,
    props<{ url: string, data: { meta: Meta; links: Partial<Links>, data: string[] } }>()
);
