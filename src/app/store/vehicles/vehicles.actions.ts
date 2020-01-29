import { createAction, props } from '@ngrx/store';
import { Vehicle } from 'src/app/shared/interfaces';
import { VEHICLES_FEATURE_KEY } from 'src/app/store/feature-names';

const ACTION_LABEL = `[${VEHICLES_FEATURE_KEY.toUpperCase()}]`;

export const SHOW_VEHICLE_CARD = createAction(
    `${ACTION_LABEL} SHOW_VEHICLE_CARD`,
    props<{ id: string }>(),
);

export const ADD_ONE_VEHICLE = createAction(
    `${ACTION_LABEL} ADD_ONE_VEHICLE`,
    props<{ vehicle: Vehicle }>(),
);

export const UPSERT_MANY_VEHICLES = createAction(
    `${ACTION_LABEL} ADD_MANY_VEHICLES`,
    props<{ vehicles: Vehicle[] }>(),
);
