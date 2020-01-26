import { createFeatureSelector, createSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { LoaderState } from 'src/app/store/loader/loader.reducer';
import { AppState } from 'src/app/store/index';

export const loaderState = createFeatureSelector<AppState, LoaderState>('loader');

export const selectLoaderState = createSelector(
    loaderState,
    (state) => state.enabled,
);

export const selectPageData: MemoizedSelectorWithProps<AppState, { url: string }, any> = createSelector(
    loaderState,
    (state: LoaderState, { url }: { url: string }) => {
        if (state.loadedPages) {
            return state.loadedPages[url];
        }
        return null;
});
