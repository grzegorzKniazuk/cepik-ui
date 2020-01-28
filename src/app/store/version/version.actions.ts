import { createAction, props } from '@ngrx/store';
import { Version } from 'src/app/shared/interfaces';
import { VERSION_FEATURE_KEY } from 'src/app/store/feature-names';

const ACTION_NAME = `[${VERSION_FEATURE_KEY.toUpperCase()}]`;

export const VERSION_EFFECTS_INIT = createAction(
    `${ACTION_NAME} VERSION_EFFECTS_INIT`
);

export const SET_VERSION = createAction(
    `${ACTION_NAME} SET_VERSION`,
    props<{ version: Version }>(),
);
