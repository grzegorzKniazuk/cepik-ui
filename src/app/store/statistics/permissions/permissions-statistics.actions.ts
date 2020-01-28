import { PERMISSIONS_STATISTICS_FEATURE_KEY } from 'src/app/store/feature-names';
import { createAction, props } from '@ngrx/store';
import { PermissionStat } from 'src/app/shared/interfaces';

const ACTION_LABEL = `[${PERMISSIONS_STATISTICS_FEATURE_KEY.toUpperCase()}]`;

export const SET_PERMISSIONS_STATISTICS = createAction(
    `${ACTION_LABEL} SET_PERMISSIONS_STATISTICS`,
    props<{ statistics: PermissionStat[] }>(),
);
