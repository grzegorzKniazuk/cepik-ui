import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { VehicleService } from 'src/app/shared/services';
import { Observable, of } from 'rxjs';
import { ApiResponse, Links, Meta, Vehicle } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectPageData } from 'src/app/store/loader/loader.selectors';
import { first, map, pluck, switchMap, tap } from 'rxjs/operators';
import { DATA_DO_KEY, DATA_OD_KEY, FILTER_MARKA_KEY, FILTER_MODEL_KEY, FILTER_POCHODZENIE_POJAZDU_KEY, FILTER_PRZEZNACZENIE_POJAZDU_KEY, FILTER_REJESTRACJA_GMINA_KEY, FILTER_REJESTRACJA_POWIAT_KEY, FILTER_RODZAJ_PALIWA_KEY, FILTER_RODZAJ_POJAZDU_KEY, LIMIT_KEY, PAGE_KEY, POKAZ_WSZYSTKIE_POLA_KEY, TYLKO_ZAREJESTROWANE_KEY, TYP_DATY_KEY, WOJEWODZTWO_KEY } from 'src/app/shared/constants';
import { UPSERT_MANY_VEHICLES } from 'src/app/store/vehicles/vehicles.actions';
import { SET_PAGINATION_LINKS } from 'src/app/store/pagination-links/pagination-links.actions';
import { SET_LOADED_PAGE_DATA } from 'src/app/store/loader/loader.actions';
import { selectVehicles } from 'src/app/store/vehicles/vehicles.selectors';

@Injectable()
export class VehiclesResolver implements Resolve<Vehicle[]> {

    constructor(
        private readonly vehicleService: VehicleService,
        private readonly store: Store<AppState>,
    ) {
    }

    public resolve({ queryParams }: ActivatedRouteSnapshot, { url }: RouterStateSnapshot): Observable<Vehicle[]> {
        return this.store.pipe(
            select(selectPageData, { url }),
            first(),
            switchMap((pageData: { meta: Meta; links: Partial<Links>, data: string[] } | null) => {
                if (pageData) {
                    return this.store.pipe(
                        select(selectVehicles, { ids: pageData.data }),
                        map((vehicles) => {
                            return {
                                meta: pageData.meta,
                                links: pageData.links,
                                data: vehicles,
                            };
                        }),
                        first(),
                    );
                }

                if (queryParams[WOJEWODZTWO_KEY]) {
                    return this.vehicleService.getVehicles({
                        [WOJEWODZTWO_KEY]: queryParams[WOJEWODZTWO_KEY],
                        [PAGE_KEY]: queryParams[PAGE_KEY],
                        [LIMIT_KEY]: queryParams[LIMIT_KEY],
                        [TYP_DATY_KEY]: queryParams[TYP_DATY_KEY],
                        [DATA_OD_KEY]: queryParams[DATA_OD_KEY],
                        [DATA_DO_KEY]: queryParams[DATA_DO_KEY],
                        [TYLKO_ZAREJESTROWANE_KEY]: queryParams[TYLKO_ZAREJESTROWANE_KEY],
                        [POKAZ_WSZYSTKIE_POLA_KEY]: true,
                        [FILTER_MARKA_KEY]: queryParams[FILTER_MARKA_KEY],
                        [FILTER_MODEL_KEY]: queryParams[FILTER_MODEL_KEY],
                        [FILTER_RODZAJ_POJAZDU_KEY]: queryParams[FILTER_RODZAJ_POJAZDU_KEY],
                        [FILTER_RODZAJ_PALIWA_KEY]: queryParams[FILTER_RODZAJ_PALIWA_KEY],
                        [FILTER_POCHODZENIE_POJAZDU_KEY]: queryParams[FILTER_POCHODZENIE_POJAZDU_KEY],
                        [FILTER_PRZEZNACZENIE_POJAZDU_KEY]: queryParams[FILTER_PRZEZNACZENIE_POJAZDU_KEY],
                        [FILTER_REJESTRACJA_POWIAT_KEY]: queryParams[FILTER_REJESTRACJA_POWIAT_KEY],
                        [FILTER_REJESTRACJA_GMINA_KEY]: queryParams[FILTER_REJESTRACJA_GMINA_KEY],
                    }).pipe(
                        tap((data: ApiResponse<Vehicle[]>) => {
                            this.store.dispatch(SET_LOADED_PAGE_DATA({
                                url,
                                data: {
                                    meta: data.meta,
                                    links: data.links,
                                    data: this.extractVehiclesIds(data.data),
                                }
                            }));
                        }),
                        tap(({ data }) => {
                            this.store.dispatch(UPSERT_MANY_VEHICLES({ vehicles: data }));
                        }),
                    );
                }

                return of({ meta: null, links: null, data: [] });
            }),
            tap(({ links }: ApiResponse<Vehicle[]>) => this.store.dispatch(SET_PAGINATION_LINKS({ links }))),
            pluck<ApiResponse<Vehicle[]>, Vehicle[]>('data'),
        );
    }

    private extractVehiclesIds(vehicles: Vehicle[]): string[] {
        return vehicles.map((vehicle) => vehicle.id);
    }
}
