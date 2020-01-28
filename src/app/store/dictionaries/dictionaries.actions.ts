import { createAction, props } from '@ngrx/store';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { DICTIONARIES_FEATURE_KEY } from 'src/app/store/feature-names';

const ACTION_LABEL = `[${DICTIONARIES_FEATURE_KEY.toUpperCase()}]`;

export const SET_DICTIONARY_ITEM = createAction(
    `${ACTION_LABEL} SET_DICTIONARY_ITEM`,
    props<{ item: { id: string, items: DictionaryItem[] } }>(),
);
