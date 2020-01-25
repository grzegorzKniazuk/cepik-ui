import { createAction, props } from '@ngrx/store';
import { Vehicle } from 'src/app/shared/interfaces';

const ACTION_LABEL = '[VEHICLES]';

export const SHOW_VEHICLE_CARD = createAction(
    `${ACTION_LABEL} SHOW_VEHICLE_CARD`,
    props<{ id: string }>(),
);

export const ADD_ONE_VEHICLE = createAction(
    `${ACTION_LABEL} ADD_ONE_VEHICLE`,
    props<{ vehicle: Vehicle }>(),
);

export const ADD_MANY_VEHICLES = createAction(
    `${ACTION_LABEL} ADD_MANY_VEHICLES`,
    props<{ vehicles: Vehicle[] }>(),
);
