import { createFeatureSelector } from '@ngrx/store';
import { PaginationLinksState } from 'src/app/store/pagination-links/pagination-links.reducer';

export const selectPaginationLinksState = createFeatureSelector<PaginationLinksState>('paginationLinks');
