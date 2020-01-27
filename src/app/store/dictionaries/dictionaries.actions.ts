import { createAction, props } from '@ngrx/store';
import { DictionaryItem } from 'src/app/shared/interfaces';

const ACTION_LABEL = '[DICTIONARIES]';

export const SET_DICTIONARY_ITEM = createAction(
    `${ACTION_LABEL} SET_DICTIONARY_ITEM`,
    props<{ item: { id: string, items: DictionaryItem[] } }>(),
);
