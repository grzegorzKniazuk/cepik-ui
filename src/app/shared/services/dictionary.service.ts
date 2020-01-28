import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { ApiService } from 'src/app/shared/services/base/api.service';
import { ApiResponse, DictionaryItemList } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class DictionaryService extends ApiService {

    constructor(
        protected readonly httpClient: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
        super();
    }

    public getDictionary(dictionary: string): Observable<ApiResponse<DictionaryItemList>> {
        return this.httpClient.get(`${this.apiUrl}/slowniki/${dictionary}`) as Observable<ApiResponse<DictionaryItemList>>;
    }
}
