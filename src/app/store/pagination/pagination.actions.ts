import { createAction, props } from '@ngrx/store';
import { Pagination } from 'src/app/shared/interfaces';

const ACTION_LABEL = '[PAGINATION]';

export const UPDATE_PAGINATION = createAction(
    `${ACTION_LABEL} UPDATE_PAGINATION`,
    props<{ pagination: Partial<Pagination> }>(),
);
