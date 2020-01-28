import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { PermissionStat } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { SET_PERMISSIONS_STATISTICS } from 'src/app/store/statistics/permissions/permissions-statistics.actions';

export interface PermissionsStatisticsState extends EntityState<PermissionStat> {
}

const adapter = createEntityAdapter<PermissionStat>();

const initialState = adapter.getInitialState();

const reducer = createReducer(
    initialState,
    on(SET_PERMISSIONS_STATISTICS, (state, { statistics }) => {
        return adapter.addAll(statistics, state);
    }),
);

export function permissionsStatisticsReducer(state: PermissionsStatisticsState, action: Action): PermissionsStatisticsState {
    return reducer(state, action);
}

export const { selectAll } = adapter.getSelectors();
