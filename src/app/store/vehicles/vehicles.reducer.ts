import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Vehicle } from 'src/app/shared/interfaces';
import { Action, createReducer } from '@ngrx/store';

export interface VehiclesState extends EntityState<Vehicle> {
}

const adapter = createEntityAdapter<Vehicle>();

const initialState = adapter.getInitialState();

const reducer = createReducer(
    initialState,
);

export function vehiclesReducer(state: VehiclesState, action: Action): VehiclesState {
    return reducer(state, action);
}
