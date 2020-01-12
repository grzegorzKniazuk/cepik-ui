import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { VehicleService } from 'src/app/shared/services/vehicle.service';
import { Observable, of } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';
import { ApiResponse, Vehicle } from 'src/app/shared/interfaces';
import { DATA_DO_KEY, DATA_OD_KEY, LIMIT_KEY, PAGE_KEY, TYLKO_ZAREJESTROWANE_KEY, TYP_DATY_KEY, WOJEWODZTWO_KEY } from 'src/app/shared/constants';
import { VehicleQueryParamDate } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SET_PAGINATION_LINKS } from 'src/app/store/pagination-links/pagination-links.actions';

@Injectable()
export class VehiclesResolver implements Resolve<Vehicle[]> {

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly timeService: TimeService,
        private readonly store: Store<AppState>,
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<Vehicle[]> {
        if (route.queryParams[WOJEWODZTWO_KEY]) {
            return this.vehicleService.getVehicles({
                wojewodztwo: route.queryParams[WOJEWODZTWO_KEY],
                'data-od': route.queryParams[DATA_OD_KEY] || this.timeService.yearsFromToday(),
                'data-do': route.queryParams[DATA_DO_KEY] || this.timeService.todayDate,
                'typ-daty': route.queryParams[TYP_DATY_KEY] || VehicleQueryParamDate.PIERWSZA_REJESTRACJA_POJAZDU_W_POLSCE,
                'tylko-zarejestrowane': route.queryParams[TYLKO_ZAREJESTROWANE_KEY] || `${true}`,
                'pokaz-wszystkie-pola': `${false}`,
                limit: route.queryParams[LIMIT_KEY] || `${100}`,
                page: route.queryParams[PAGE_KEY] || `${1}`,
            }).pipe(
                tap(console.log),
                tap(({ links }: ApiResponse<Vehicle[]>) => this.store.dispatch(SET_PAGINATION_LINKS({ links }))),
                pluck<ApiResponse<Vehicle[]>, Vehicle[]>('data'),
            );
        }

        return of([]);
    }
}
