import { createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/index';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';

export const selectRouter = createFeatureSelector<AppState, RouterReducerState<any>>('router');

export const { selectRouteData, selectQueryParam } = getSelectors(selectRouter);
