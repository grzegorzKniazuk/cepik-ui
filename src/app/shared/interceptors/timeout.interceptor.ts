import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap, timeout } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/shared/services';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

    constructor(
        private readonly toastService: ToastService,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            timeout(5000),
            retry(1),
            tap((error: any) => this.toastService.error('Błąd zapytania', error.message)),
            catchError((error: HttpErrorResponse) => throwError(error)),
        );
    }
}
