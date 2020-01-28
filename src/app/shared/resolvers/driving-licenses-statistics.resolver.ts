import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiResponse, DrivingLicenseStat } from 'src/app/shared/interfaces';
import { Observable, of } from 'rxjs';
import { StatisticsService } from 'src/app/shared/services';
import { first, map, pluck, switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SET_DRIVING_LICENSES_STATISTICS } from 'src/app/store/statistics/driving-license/driving-licenses-statistics.actions';
import { selectDrivingLicensesStatistics } from 'src/app/store/statistics/driving-license/driving-licenses-statistics.selectors';

@Injectable()
export class DrivingLicensesStatisticsResolver implements Resolve<DrivingLicenseStat[]> {

    constructor(
        private readonly statisticsService: StatisticsService,
        private readonly store: Store<AppState>,
    ) {
    }

    public resolve(): Observable<DrivingLicenseStat[]> {
        return this.store.pipe(
            select(selectDrivingLicensesStatistics),
            first(),
            switchMap((entities: DrivingLicenseStat[] | []) => {
                if (entities && entities.length) {
                    return of(entities);
                } else {
                    return this.statisticsService.getNumberOfDrivingLicensesRecords().pipe(
                        switchMap((count) => this.statisticsService.getDrivingLicensesStatistics(count)),
                        pluck<ApiResponse<DrivingLicenseStat[]>, DrivingLicenseStat[]>('data'),
                        map((statistics) => {
                            return statistics.map((statistic: DrivingLicenseStat) => {
                                return {
                                    id: this.createEntityId(statistic),
                                    ...statistic,
                                };
                            });
                        }),
                        tap((statistics) => this.store.dispatch(SET_DRIVING_LICENSES_STATISTICS({ statistics })))
                    );
                }
            })
        );
    }

    // id tworzone wedlug opisu w https://api.cepik.gov.pl/doc
    private createEntityId(license: DrivingLicenseStat): string {
        return `${license['data-statystyki']},${license['wojewodztwo-kod']},${license.plec},${license.wiek}`;
    }
}
