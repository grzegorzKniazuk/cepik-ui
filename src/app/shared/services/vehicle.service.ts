import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, Vehicle, VehicleQueryParams } from 'src/app/shared/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/constants';

@Injectable({
    providedIn: 'root',
})
export class VehicleService {

    constructor(
        protected readonly httpClient: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getVehicles(queryParams: VehicleQueryParams): Observable<ApiResponse<Vehicle[]>> {
        let params: HttpParams = new HttpParams();

        for (const key in queryParams) {
            if (queryParams.hasOwnProperty(key) && queryParams[key] !== undefined && queryParams[key] !== null) {
                params = params.set(key, queryParams[key].toString());
            }
        }

        return this.httpClient.get<ApiResponse<Vehicle[]>>(`${this.apiUrl}/pojazdy`, { params }).pipe(
            catchError(() => of({ meta: null, links: null, data: [] })),
        );
    }

    public getVehicle(id: string): Observable<ApiResponse<Vehicle>> {
        return this.httpClient.get<ApiResponse<Vehicle>>(`${this.apiUrl}/pojazdy/${id}`);
    }
}
