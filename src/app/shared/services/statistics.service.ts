import { Inject, Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/base/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ApiResponse, DrivingLicenseStat, PermissionStat } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class StatisticsService extends ApiService {

    constructor(
        protected readonly httpClient: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
        super();
    }

    public getNumberOfDrivingLicensesRecords(): Observable<number> {
        return this.getDrivingLicensesStatistics(1).pipe(
            pluck<ApiResponse<DrivingLicenseStat[]>, number>('meta', 'count'),
        );
    }

    public getDrivingLicensesStatistics(limit: number): Observable<ApiResponse<DrivingLicenseStat[]>> {
        const params: HttpParams = new HttpParams({
            fromObject: { limit: `${limit}` },
        });

        return this.httpClient.get(`${this.apiUrl}/prawa-jazdy`, { params }) as Observable<ApiResponse<DrivingLicenseStat[]>>;
    }

    public getNumberOfPermissionsRecords(): Observable<number> {
        return this.getPermissionsStatistics(1).pipe(
            pluck<ApiResponse<PermissionStat[]>, number>('meta', 'count'),
        );
    }

    public getPermissionsStatistics(limit: number): Observable<ApiResponse<PermissionStat[]>> {
        const params: HttpParams = new HttpParams({
            fromObject: { limit: `${limit}` },
        });

        return this.httpClient.get(`${this.apiUrl}/uprawnienia`, { params }) as Observable<ApiResponse<PermissionStat[]>>;
    }
}
