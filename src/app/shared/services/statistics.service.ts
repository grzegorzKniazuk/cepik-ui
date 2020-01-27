import { Inject, Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants/injection-tokens';
import { Observable } from 'rxjs';
import { first, map, pluck } from 'rxjs/operators';
import { ApiResponse, DrivingLicenseStat, Meta } from 'src/app/shared/interfaces';

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

    public getNumberOfRecords(): Observable<number> {
        return this.httpClient.get<ApiResponse<DrivingLicenseStat[]>>(`${this.apiUrl}/prawa-jazdy?limit=1`).pipe(
            map((response) => response.meta),
            pluck<Meta, number>('count'),
            first(),
        );
    }

    public getDrivingLicensesStatistics(limit: number): Observable<ApiResponse<DrivingLicenseStat[]>> {
        const params: HttpParams = new HttpParams({
            fromObject: { limit: `${limit}` },
        });

        return this.httpClient.get(`${this.apiUrl}/prawa-jazdy`, { params }) as Observable<ApiResponse<DrivingLicenseStat[]>>;
    }
}
