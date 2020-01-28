import { DRIVING_LICENSES_STATISTICS_FEATURE_KEY } from 'src/app/store/feature-names';
import { createAction, props } from '@ngrx/store';
import { DrivingLicenseStat } from 'src/app/shared/interfaces';

const ACTION_LABEL = `${DRIVING_LICENSES_STATISTICS_FEATURE_KEY.toUpperCase()}`;

export const SET_DRIVING_LICENSES_STATISTICS = createAction(
    `${ACTION_LABEL} SET_DRIVING_LICENSES_STATISTICS`,
    props<{ statistics: DrivingLicenseStat[] }>(),
);
