import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { Version } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class VersionService {

    constructor(
        protected readonly httpClient: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
    }

    public getVersion(): Observable<Version> {
        return this.httpClient.get<Version>(`${this.apiUrl}/version`);
    }
}
