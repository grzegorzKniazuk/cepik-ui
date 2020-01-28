import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiResponse, PermissionStat } from 'src/app/shared/interfaces';
import { StatisticsService } from 'src/app/shared/services';
import { Observable, of } from 'rxjs';
import { first, map, pluck, switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SET_PERMISSIONS_STATISTICS } from 'src/app/store/statistics/permissions/permissions-statistics.actions';
import { selectPermissionsStatistics } from 'src/app/store/statistics/permissions/permissions-statistics.selector';

@Injectable()
export class PermissionsStatisticsResolver implements Resolve<PermissionStat[]> {

    constructor(
        private readonly statisticsService: StatisticsService,
        private readonly store: Store<AppState>,
    ) {
    }

    public resolve(): Observable<PermissionStat[]> {
        return this.store.pipe(
            select(selectPermissionsStatistics),
            first(),
            switchMap((entities: PermissionStat[] | []) => {
                if (entities && entities.length) {
                    return of(entities);
                } else {
                    return this.statisticsService.getNumberOfPermissionsRecords().pipe(
                        switchMap((count) => this.statisticsService.getPermissionsStatistics(count)),
                        pluck<ApiResponse<PermissionStat[]>, PermissionStat[]>('data'),
                        map((statistics) => {
                            return statistics.map((statistic: PermissionStat) => {
                                return {
                                    id: this.createEntityId(statistic),
                                    ...statistic,
                                };
                            });
                        }),
                        tap((statistics) => this.store.dispatch(SET_PERMISSIONS_STATISTICS({ statistics }))),
                    );
                }
            }),
        );
    }

    // id tworzone wedlug opisu w https://api.cepik.gov.pl/doc
    private createEntityId(permission: PermissionStat): string {
        return `${permission['data-statystyki']},${permission['wojewodztwo-kod']},${permission['kod-uprawnienia']},${permission.plec},${permission.wiek}`;
    }
}
