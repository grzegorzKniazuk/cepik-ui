import { Action, createReducer, on } from '@ngrx/store';
import { SET_PAGINATION_PAGE_NUMBERS } from 'src/app/store/pagination-links/pagination-links.actions';

export interface PaginationLinksState {
    first: number;
    last: number;
    next: number;
    prev: number;
    self: number;
}

export const initialPaginationLinksState: PaginationLinksState = {
    first: null,
    last: null,
    next: null,
    prev: null,
    self: null,
};

const reducer = createReducer(
    initialPaginationLinksState,
    on(SET_PAGINATION_PAGE_NUMBERS, (state, { links }) => {
        return {
            ...state,
            first: links && links.first ? linkStringToPageNumber(links.first) : null,
            last: links && links.last ? linkStringToPageNumber(links.last) : null,
            next: links && links.next ? linkStringToPageNumber(links.next) : null,
            prev: links && links.prev ? linkStringToPageNumber(links.prev) : null,
            self: links && links.self ? linkStringToPageNumber(links.self) : null,
        };
    }),
);

function linkStringToPageNumber(link: string): number {
    return +link.match(/page=\d+/)[0].slice(5);
}

export function paginationLinksReducer(state: PaginationLinksState, action: Action): PaginationLinksState {
    return reducer(state, action);
}
