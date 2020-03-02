import { SET_PAGINATION_PAGE_NUMBERS } from 'src/app/store/pagination-links/pagination-links.actions';
import { initialPaginationLinksState, paginationLinksReducer } from 'src/app/store/pagination-links/pagination-links.reducer';

describe(paginationLinksReducer.name, () => {
    describe(SET_PAGINATION_PAGE_NUMBERS.type, () => {
        it('should set pagination page numbers', () => {
            const action = SET_PAGINATION_PAGE_NUMBERS({
                links: {
                    first: 'page=1',
                    last: 'page=1',
                    next: 'page=1',
                    prev: 'page=1',
                    self: 'page=1',
                },
            });

            const state = paginationLinksReducer(initialPaginationLinksState, action);

            expect(state).toEqual({
                first: 1,
                last: 1,
                next: 1,
                prev: 1,
                self: 1,
            });
        });
    });
});
