import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FiltersState } from 'src/app/store/filters/filters.reducer';

export const selectFiltersState = createFeatureSelector<FiltersState>('filters');

export const selectFilterPhrase = createSelector(
    selectFiltersState,
    (state) => state.phrase,
);
