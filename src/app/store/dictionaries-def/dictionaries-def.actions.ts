import { createAction, props } from '@ngrx/store';
import { DictionaryDef } from 'src/app/shared/interfaces/dictionary-def';

const ACTION_LABEL = '[DICTIONARIES_DEF]';

export const SET_DICTIONARIES_DEF = createAction(
    `${ACTION_LABEL} SET_DICTIONARIES_DEF`,
    props<{ def: DictionaryDef[] }>(),
);
