import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/index';
import { DrivingLicensesStatisticsState, selectAll } from 'src/app/store/statistics/driving-license/driving-licenses-statistics.reducer';
import { DRIVING_LICENSES_STATISTICS_FEATURE_KEY } from 'src/app/store/feature-names';

export const selectDrivingLicensesStatisticsState = createFeatureSelector<AppState, DrivingLicensesStatisticsState>(DRIVING_LICENSES_STATISTICS_FEATURE_KEY);

export const selectDrivingLicensesStatistics = createSelector(
    selectDrivingLicensesStatisticsState,
    selectAll,
);
