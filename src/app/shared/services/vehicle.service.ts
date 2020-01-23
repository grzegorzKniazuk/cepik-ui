import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, Vehicle, VehicleListQueryParams } from 'src/app/shared/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/constants/injection-tokens';

@Injectable({
    providedIn: 'root',
})
export class VehicleService {
    constructor(
        private readonly httpClient: HttpClient,
        @Inject(API_URL) private readonly apiUrl: string,
    ) {
    }

    public getVehicles(queryParams: VehicleListQueryParams): Observable<ApiResponse<Vehicle[]>> {
        const params: HttpParams = new HttpParams({
            fromObject: { ...queryParams },
        });

        return this.httpClient.get(`${this.apiUrl}/pojazdy`, { params }).pipe(
            catchError(() => of([])),
        ) as Observable<ApiResponse<Vehicle[]>>;
    }

    public getVehicle(id: string): Observable<ApiResponse<Vehicle>> {
        return this.httpClient.get(`${this.apiUrl}/pojazdy/${id}`) as Observable<ApiResponse<Vehicle>>;
    }
}
