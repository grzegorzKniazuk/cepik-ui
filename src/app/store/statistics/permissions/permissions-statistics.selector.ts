import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/index';
import { PERMISSIONS_STATISTICS_FEATURE_KEY } from 'src/app/store/feature-names';
import { PermissionsStatisticsState, selectAll } from 'src/app/store/statistics/permissions/permissions-statistics.reducer';

export const selectPermissionsStatisticsState = createFeatureSelector<AppState, PermissionsStatisticsState>(PERMISSIONS_STATISTICS_FEATURE_KEY);

export const selectPermissionsStatistics = createSelector(
    selectPermissionsStatisticsState,
    selectAll,
);
