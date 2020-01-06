import { Action, createReducer, on } from '@ngrx/store';
import { UPDATE_PAGINATION } from 'src/app/store/pagination/pagination.actions';

export interface PaginationState {
    page: number;
    pages: number;
    limit: number;
    total: number;
}

const initialState: PaginationState = {
    page: 1,
    pages: 1,
    limit: 10,
    total: 0,
};

const reducer = createReducer(
    initialState,
    on(UPDATE_PAGINATION, (state, { pagination }) => {
        return {
            ...state,
            ...pagination,
            pages: Math.round(pagination.total / pagination.limit) || 1
        };
    }),
);

export function paginationReducer(state: PaginationState, action: Action): PaginationState {
    return reducer(state, action);
}
