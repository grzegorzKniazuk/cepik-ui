import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ToastService } from 'src/app/shared/services';
import { catchError, timeout } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TimeoutInterceptor implements HttpInterceptor {

    constructor(
        private readonly toastService: ToastService,
        private readonly router: Router,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            timeout(5000),
            catchError((error: { message: string, name: string }) => {
                this.router.navigate([], {
                    queryParamsHandling: 'preserve',
                }).then(() => {
                    this.toastService.error(error.message, error.name);
                });

                return throwError(error);
            }),
        );
    }
}
