import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOAD_VEHICLE } from 'src/app/store/vehicles/vehicles.actions';
import { pluck, switchMap, tap } from 'rxjs/operators';
import { VehicleService } from 'src/app/shared/services';
import { ApiResponse, Vehicle } from 'src/app/shared/interfaces';

@Injectable()
export class VehiclesEffects {

    public readonly loadVehicle$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOAD_VEHICLE),
            switchMap(({ id }) => {
                return this.vehicleService.getVehicle(id);
            }),
            pluck<ApiResponse<Vehicle>, Vehicle>('data'),
            tap(console.log),
        );
    }, { dispatch: false });

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly actions$: Actions,
    ) {
    }
}
