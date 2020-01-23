import { createAction, props } from '@ngrx/store';
import { Vehicle } from 'src/app/shared/interfaces';

const ACTION_LABEL = '[VEHICLES]';

export const LOAD_VEHICLE = createAction(
    `${ACTION_LABEL} LOAD_VEHICLE`,
    props<{ id: string }>(),
);

export const SET_VEHICLE = createAction(
    `${ACTION_LABEL} SET_VEHICLE`,
    props<{ vehicle: Vehicle }>(),
);
