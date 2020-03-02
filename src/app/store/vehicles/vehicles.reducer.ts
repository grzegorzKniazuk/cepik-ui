import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Vehicle } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { ADD_ONE_VEHICLE, UPSERT_MANY_VEHICLES } from 'src/app/store/vehicles/vehicles.actions';

export interface VehiclesState extends EntityState<Vehicle> {
}

const adapter = createEntityAdapter<Vehicle>();

export const initialVehiclesState = adapter.getInitialState();

const reducer = createReducer(
    initialVehiclesState,
    on(ADD_ONE_VEHICLE, (state, { vehicle }) => {
        return adapter.addOne(vehicle, state);
    }),
    on(UPSERT_MANY_VEHICLES, (state, { vehicles }) => {
        return adapter.upsertMany(vehicles, state);
    }),
);

export function vehiclesReducer(state: VehiclesState, action: Action): VehiclesState {
    return reducer(state, action);
}

export const { selectEntities } = adapter.getSelectors();
