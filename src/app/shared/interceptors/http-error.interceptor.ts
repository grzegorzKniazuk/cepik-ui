import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiErrorResponse } from 'src/app/shared/interfaces';
import { ToastService } from 'src/app/shared/services';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly toastService: ToastService,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        if (error && error.error && Array.isArray(error.error.errors) && error.error.errors.length) {
            error.error.errors.forEach((error: ApiErrorResponse) => {
                console.log(error);
                this.toastService.error(error['error-code'], error['error-result'], error.id);
            });
        }

        return throwError(error);
    }
}
