import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { DEFAULT_TIMEOUT } from 'src/app/shared/tokens';

@Injectable()
export class HttpTimeoutInterceptor implements HttpInterceptor {

    constructor(
        @Inject(DEFAULT_TIMEOUT) private readonly defaultTimeout: number,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(timeout(+(req.headers.get('timeout') || this.defaultTimeout)));
    }
}
