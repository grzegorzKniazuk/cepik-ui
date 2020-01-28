import { createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/index';
import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { ROUTER_FEATURE_KEY } from 'src/app/store/feature-names';

export const selectRouter = createFeatureSelector<AppState, RouterReducerState<any>>(ROUTER_FEATURE_KEY);

export const { selectRouteData, selectQueryParam } = getSelectors(selectRouter);
