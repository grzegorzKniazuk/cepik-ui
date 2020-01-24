import { createFeatureSelector } from '@ngrx/store';
import { PaginationLinksState } from 'src/app/store/pagination-links/pagination-links.reducer';
import { AppState } from 'src/app/store/index';

export const selectPaginationLinksState = createFeatureSelector<AppState, PaginationLinksState>('paginationLinks');
