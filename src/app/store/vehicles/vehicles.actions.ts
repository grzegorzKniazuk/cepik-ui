import { createAction, props } from '@ngrx/store';
import { Vehicle } from 'src/app/shared/interfaces';

const ACTION_LABEL = '[VEHICLES]';

export const SHOW_VEHICLE_CARD = createAction(
    `${ACTION_LABEL} SHOW_VEHICLE_CARD`,
    props<{ id: string }>(),
);

export const SET_VEHICLE = createAction(
    `${ACTION_LABEL} SET_VEHICLE`,
    props<{ vehicle: Vehicle }>(),
);
