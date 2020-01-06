import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { finalize } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { HIDE_LOADER, SHOW_LOADER } from 'src/app/store/loader/loader.actions';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

    constructor(
        private readonly store: Store<AppState>,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.store.dispatch(SHOW_LOADER());

        return next.handle(req).pipe(finalize(() => this.store.dispatch(HIDE_LOADER())));
    }
}
