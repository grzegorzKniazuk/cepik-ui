import { createFeatureSelector } from '@ngrx/store';
import { PaginationState } from 'src/app/store/pagination/pagination.reducer';

export const selectPaginationState = createFeatureSelector<PaginationState>('pagination');
