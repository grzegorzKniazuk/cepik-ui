import { createAction, props } from '@ngrx/store';
import { Version } from 'src/app/shared/interfaces';

const ACTION_NAME = '[VERSION]';

export const SET_VERSION = createAction(
    `${ACTION_NAME} SET_VERSION`,
    props<{ version: Version }>(),
);
