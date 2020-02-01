import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services';
import { ApiErrorResponse } from 'src/app/shared/interfaces';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
        private readonly toastService: ToastService,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => this.handleError(error)));
    }

    private handleError(response: HttpErrorResponse): Observable<never> {
        if (response && response.error && Array.isArray(response.error.errors) && response.error.errors.length) {
            response.error.errors.forEach((error: ApiErrorResponse) => {
                console.log(error);
                this.toastService.error(error['error-code'], error['error-result']);
            });
        }

        return throwError(response);
    }
}
