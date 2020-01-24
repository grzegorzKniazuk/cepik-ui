import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Vehicle } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { SET_VEHICLE } from 'src/app/store/vehicles/vehicles.actions';

export interface VehiclesState extends EntityState<Vehicle> {
}

const adapter = createEntityAdapter<Vehicle>();

const initialState = adapter.getInitialState();

const reducer = createReducer(
    initialState,
    on(SET_VEHICLE, (state, { vehicle }) => {
        return adapter.addOne(vehicle, state);
    }),
);

export function vehiclesReducer(state: VehiclesState, action: Action): VehiclesState {
    return reducer(state, action);
}

export const { selectEntities } = adapter.getSelectors();
