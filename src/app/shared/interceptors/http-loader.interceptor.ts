import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { finalize, map, withLatestFrom } from 'rxjs/operators';
import { AppState } from 'src/app/store';
import { HIDE_LOADER, SHOW_LOADER } from 'src/app/store/loader/loader.actions';
import { selectLoaderState } from 'src/app/store/loader/loader.selectors';

@Injectable()
export class HttpLoaderInterceptor implements HttpInterceptor {

    constructor(
        private readonly store: Store<AppState>,
    ) {
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            withLatestFrom(this.store.pipe(select(selectLoaderState))),
            map(([ request, loaderState ]: [ HttpEvent<any>, boolean ]) => {
                if (!loaderState) {
                    this.store.dispatch(SHOW_LOADER());
                }
                return request;
            }),
            finalize(() => this.store.dispatch(HIDE_LOADER())),
        );
    }
}
