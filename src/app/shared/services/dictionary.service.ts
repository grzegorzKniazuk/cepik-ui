import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse, DictionaryDef, DictionaryItemList } from '../interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { API_URL } from 'src/app/shared/constants/injection-tokens';

@Injectable({
    providedIn: 'root',
})
export class DictionaryService {

    constructor(
        private readonly httpClient: HttpClient,
        @Inject(API_URL) private readonly apiUrl: string,
    ) {
    }

    public getDictionariesDef(limit = '100', page = '1'): Observable<ApiResponse<DictionaryDef[]>> {
        const params: HttpParams = new HttpParams({
            fromObject: {
                limit,
                page,
            },
        });

        return this.httpClient.get(`${this.apiUrl}/slowniki`, { params }).pipe(
            catchError(() => of([])),
        ) as Observable<ApiResponse<DictionaryDef[]>>;
    }

    public getDictionary(dictionary: string): Observable<ApiResponse<DictionaryItemList>> {
        return this.httpClient.get(`${this.apiUrl}/slowniki/${dictionary}`) as Observable<ApiResponse<DictionaryItemList>>;
    }
}
