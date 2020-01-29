import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoaderState } from 'src/app/store/loader/loader.reducer';
import { AppState } from 'src/app/store/index';
import { LOADER_FEATURE_KEY } from 'src/app/store/feature-names';

export const loaderState = createFeatureSelector<AppState, LoaderState>(LOADER_FEATURE_KEY);

export const selectLoaderState = createSelector(
    loaderState,
    (state) => state.enabled,
);

export const selectPageData = createSelector(
    loaderState,
    (state: LoaderState, { url }: { url: string }) => {
        if (state.loadedPages) {
            return state.loadedPages[url];
        }
        return null;
});
