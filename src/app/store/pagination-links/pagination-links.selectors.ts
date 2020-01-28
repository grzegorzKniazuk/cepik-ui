import { createFeatureSelector } from '@ngrx/store';
import { PaginationLinksState } from 'src/app/store/pagination-links/pagination-links.reducer';
import { AppState } from 'src/app/store/index';
import { PAGINATION_LINKS_FEATURE_KEY } from 'src/app/store/feature-names';

export const selectPaginationLinksState = createFeatureSelector<AppState, PaginationLinksState>(PAGINATION_LINKS_FEATURE_KEY);
