import { Inject, Injectable } from '@angular/core';
import { ApiService } from 'src/app/shared/services/base/api.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/shared/constants';
import { Observable } from 'rxjs';
import { Version } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class VersionService extends ApiService {

    constructor(
        protected readonly httpClient: HttpClient,
        @Inject(API_URL) protected readonly apiUrl: string,
    ) {
        super();
    }

    public getVersion(): Observable<Version> {
        return this.httpClient.get<Version>(`${this.apiUrl}/version`);
    }
}
