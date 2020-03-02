import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { ApiResponse, DictionaryItemList } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class DictionaryService {

    constructor(
        protected readonly httpClient: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getDictionary(dictionary: string): Observable<ApiResponse<DictionaryItemList>> {
        return this.httpClient.get<ApiResponse<DictionaryItemList>>(`${this.apiUrl}/slowniki/${dictionary}`);
    }
}
