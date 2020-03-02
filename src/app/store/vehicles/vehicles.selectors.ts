import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectEntities, VehiclesState } from 'src/app/store/vehicles/vehicles.reducer';
import { Dictionary } from '@ngrx/entity';
import { Vehicle } from 'src/app/shared/interfaces';
import { AppState } from 'src/app/store/index';
import { VEHICLES_FEATURE_KEY } from 'src/app/store/feature-names';

export const selectVehiclesState = createFeatureSelector<AppState, VehiclesState>(VEHICLES_FEATURE_KEY);

export const selectVehiclesEntities = createSelector(
    selectVehiclesState,
    selectEntities,
);

export const selectVehicle = createSelector(
    selectVehiclesEntities,
    ((entities: Dictionary<Vehicle>, { id }: { id: string }) => {
        return entities[id] ? entities[id].attributes : null;
    }),
);

export const selectVehicles = createSelector(
    selectVehiclesEntities,
    ((entities: Dictionary<Vehicle>, { ids }: { ids: string[] }) => {
        const items: Vehicle[] = [];

        ids.forEach((id) => {
            if (entities[id]) {
                items.push(entities[id]);
            }
        });

        return items;
    }),
);
