import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Vehicle } from 'src/app/shared/interfaces';
import { Action, createReducer, on } from '@ngrx/store';
import { UPSERT_MANY_VEHICLES, ADD_ONE_VEHICLE } from 'src/app/store/vehicles/vehicles.actions';

export interface VehiclesState extends EntityState<Vehicle> {
}

const adapter = createEntityAdapter<Vehicle>();

const initialState = adapter.getInitialState();

const reducer = createReducer(
    initialState,
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
