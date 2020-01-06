import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from 'src/app/store/loader/loader.reducer';

export const loaderState = createFeatureSelector<LoaderState>('loader');

export const selectLoaderState = createSelector(
    loaderState,
    (state) => state.enabled,
);
