import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
import { Observable, of } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { ApiResponse, Vehicle } from 'src/app/shared/interfaces';
import {
    DATA_DO_KEY,
    DATA_OD_KEY,
    FILTER_MARKA_KEY,
    FILTER_MODEL_KEY,
    FILTER_POCHODZENIE_POJAZDU_KEY,
    FILTER_PRZEZNACZENIE_POJAZDU_KEY,
    FILTER_REJESTRACJA_GMINA_KEY,
    FILTER_REJESTRACJA_POWIAT_KEY,
    FILTER_RODZAJ_PALIWA_KEY,
    FILTER_RODZAJ_POJAZDU_KEY,
    LIMIT_KEY,
    PAGE_KEY,
    POKAZ_WSZYSTKIE_POLA_KEY,
    TYLKO_ZAREJESTROWANE_KEY,
    TYP_DATY_KEY,
    WOJEWODZTWO_KEY,
} from 'src/app/shared/constants';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SET_PAGINATION_LINKS } from 'src/app/store/pagination-links/pagination-links.actions';
import { ADD_MANY_VEHICLES } from 'src/app/store/vehicles/vehicles.actions';

@Injectable()
export class VehiclesResolver implements Resolve<Vehicle[]> {

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly store: Store<AppState>,
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Vehicle[]> {
        if (route.queryParams[WOJEWODZTWO_KEY]) {
            return this.vehicleService.getVehicles({
                [WOJEWODZTWO_KEY]: route.queryParams[WOJEWODZTWO_KEY],
                [PAGE_KEY]: route.queryParams[PAGE_KEY],
                [LIMIT_KEY]: route.queryParams[LIMIT_KEY],
                [TYP_DATY_KEY]: route.queryParams[TYP_DATY_KEY],
                [DATA_OD_KEY]: route.queryParams[DATA_OD_KEY],
                [DATA_DO_KEY]: route.queryParams[DATA_DO_KEY],
                [TYLKO_ZAREJESTROWANE_KEY]: route.queryParams[TYLKO_ZAREJESTROWANE_KEY],
                [POKAZ_WSZYSTKIE_POLA_KEY]: true,
                [FILTER_MARKA_KEY]: route.queryParams[FILTER_MARKA_KEY],
                [FILTER_MODEL_KEY]: route.queryParams[FILTER_MODEL_KEY],
                [FILTER_RODZAJ_POJAZDU_KEY]: route.queryParams[FILTER_RODZAJ_POJAZDU_KEY],
                [FILTER_RODZAJ_PALIWA_KEY]: route.queryParams[FILTER_RODZAJ_PALIWA_KEY],
                [FILTER_POCHODZENIE_POJAZDU_KEY]: route.queryParams[FILTER_POCHODZENIE_POJAZDU_KEY],
                [FILTER_PRZEZNACZENIE_POJAZDU_KEY]: route.queryParams[FILTER_PRZEZNACZENIE_POJAZDU_KEY],
                [FILTER_REJESTRACJA_POWIAT_KEY]: route.queryParams[FILTER_REJESTRACJA_POWIAT_KEY],
                [FILTER_REJESTRACJA_GMINA_KEY]: route.queryParams[FILTER_REJESTRACJA_GMINA_KEY],
            }).pipe(
                tap(({ links }: ApiResponse<Vehicle[]>) => this.store.dispatch(SET_PAGINATION_LINKS({ links }))),
                pluck<ApiResponse<Vehicle[]>, Vehicle[]>('data'),
                tap((vehicles) => this.store.dispatch(ADD_MANY_VEHICLES({ vehicles }))),
            );
        }

        return of([]);
    }
}
