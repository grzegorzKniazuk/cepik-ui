import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiResponse, DrivingLicenseStat } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { StatisticsService } from 'src/app/shared/services';
import { pluck, switchMap } from 'rxjs/operators';

@Injectable()
export class DrivingLicensesStatisticsResolver implements Resolve<DrivingLicenseStat[]> {

    constructor(
        private readonly statisticsService: StatisticsService,
    ) {
    }

    public resolve(): Observable<DrivingLicenseStat[]> {
        return this.statisticsService.getNumberOfRecords().pipe(
            switchMap((count) => this.statisticsService.getDrivingLicensesStatistics(count)),
            pluck<ApiResponse<DrivingLicenseStat[]>, DrivingLicenseStat[]>('data'),
        );
    }
}
