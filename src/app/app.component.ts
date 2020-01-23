import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { distinctUntilChanged, filter, pluck } from 'rxjs/operators';
import { selectRouteData } from 'src/app/store/router/router.selectors';
import { selectLoaderState } from 'src/app/store/loader/loader.selectors';
import { BaseComponent } from 'src/app/views/base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'cpk-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

    public readonly loadingState$: Observable<boolean> = this.store.pipe(select(selectLoaderState));

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        private readonly title: Title,
        private readonly store: Store<AppState>,
    ) {
        super(activatedRoute, router);
    }

    ngOnInit() {
        this.subscriptions$.add(
            this.store.pipe(
                select(selectRouteData),
                filter((data) => data && data.hasOwnProperty('title')),
                pluck('title'),
                distinctUntilChanged(),
            ).subscribe((title: string) => {
                this.title.setTitle(`CEPiK UI | ${title}`);
            }),
        );
    }

    ngOnDestroy() {
        this.subscriptions$.unsubscribe();
    }
}
