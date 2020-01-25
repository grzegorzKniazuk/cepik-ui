import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SET_VEHICLE, SHOW_VEHICLE_CARD } from 'src/app/store/vehicles/vehicles.actions';
import { concatMap, pluck, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ModalService, VehicleService } from 'src/app/shared/services';
import { ApiResponse, Vehicle, VehicleDetails } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/index';
import { selectVehicle } from 'src/app/store/vehicles/vehicles.selectors';
import { of } from 'rxjs';
import { VehicleCardComponent } from 'src/app/views';

@Injectable()
export class VehiclesEffects {

    public readonly showVehicleCard$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SHOW_VEHICLE_CARD),
            concatMap(({ id }) => {
                return of(id).pipe(withLatestFrom(this.store.pipe(select(selectVehicle, { id }))));
            }),
            switchMap(([ id, vehicle ]: [ string, VehicleDetails | null ]) => {
                if (vehicle) {
                    return of(vehicle);
                }
                return this.vehicleService.getVehicle(id).pipe(
                    pluck<ApiResponse<Vehicle>, Vehicle>('data'),
                    tap((response: Vehicle) => {
                        this.store.dispatch(SET_VEHICLE({ vehicle: response }));
                    }),
                    pluck<Vehicle, VehicleDetails>('attributes'),
                );
            }),
            tap((details: VehicleDetails) => {
                this.modalService.open(VehicleCardComponent, {
                    title: this.prepareVehicleCardTitle(details),
                    data: details,
                });
            }),
        );
    }, { dispatch: false });

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly actions$: Actions,
        private readonly store: Store<AppState>,
        private readonly modalService: ModalService<VehicleCardComponent, VehicleDetails>,
    ) {
    }

    private prepareVehicleCardTitle(details: VehicleDetails): string {
        return `Szczegóły pojazdu ${details['marka']} ${details.model} ${details['podrodzaj-pojazdu'] !== '---' ? details['podrodzaj-pojazdu'] : ''} (${details['rodzaj-pojazdu']})`;
    }
}
