import { createFeatureSelector, createSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { selectEntities, VehiclesState } from 'src/app/store/vehicles/vehicles.reducer';
import { Dictionary } from '@ngrx/entity';
import { Vehicle, VehicleDetails } from 'src/app/shared/interfaces';
import { AppState } from 'src/app/store/index';
import { VEHICLES_FEATURE_KEY } from 'src/app/store/feature-names';

export const selectVehiclesState = createFeatureSelector<AppState, VehiclesState>(VEHICLES_FEATURE_KEY);

export const selectVehiclesEntities = createSelector(
    selectVehiclesState,
    selectEntities,
);

export const selectVehicle: MemoizedSelectorWithProps<AppState, { id: string }, VehicleDetails | null> = createSelector(
    selectVehiclesEntities,
    ((entities: Dictionary<Vehicle>, { id }: { id: string }) => {
        return entities[id] ? entities[id].attributes as VehicleDetails : null;
    }),
);
