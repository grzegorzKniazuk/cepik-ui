import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, DictionaryItemList } from '../interfaces';
import { HttpClient } from '@angular/common/http';
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

    public getDictionary(dictionary: string): Observable<ApiResponse<DictionaryItemList>> {
        return this.httpClient.get(`${this.apiUrl}/slowniki/${dictionary}`) as Observable<ApiResponse<DictionaryItemList>>;
    }
}
