import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { DrivingLicenseStat } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { SET_DRIVING_LICENSES_STATISTICS } from 'src/app/store/statistics/driving-license/driving-licenses-statistics.actions';

export interface DrivingLicensesStatisticsState extends EntityState<DrivingLicenseStat> {

}

const adapter = createEntityAdapter<DrivingLicenseStat>();

const initialState: DrivingLicensesStatisticsState = adapter.getInitialState();

const reducer = createReducer(
    initialState,
    on(SET_DRIVING_LICENSES_STATISTICS, (state, { statistics }) => {
        return adapter.addAll(statistics, state);
    })
);

export function drivingLicensesReducer(state: DrivingLicensesStatisticsState, action: Action): DrivingLicensesStatisticsState {
    return reducer(state, action);
}

export const { selectAll } = adapter.getSelectors();