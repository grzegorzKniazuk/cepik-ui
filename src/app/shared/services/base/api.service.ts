import { HttpClient } from '@angular/common/http';

export abstract class ApiService {

    protected abstract readonly httpClient: HttpClient;
    protected abstract readonly apiUrl: string;
}
