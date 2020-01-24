import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from 'src/app/store/loader/loader.reducer';
import { AppState } from 'src/app/store/index';

export const loaderState = createFeatureSelector<AppState, LoaderState>('loader');

export const selectLoaderState = createSelector(
    loaderState,
    (state) => state.enabled,
);
