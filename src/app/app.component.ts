import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { selectRouteData } from 'src/app/store/router/router.selectors';
import { selectLoaderState } from 'src/app/store/loader/loader.selectors';
import { BaseComponent } from 'src/app/views/base.component';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { hasProperty } from 'src/app/shared/operators';
import { selectVersionState } from 'src/app/store/version/version.selectors';

@Component({
    selector: 'cpk-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {

    public readonly loadingState$ = this.store.pipe(select(selectLoaderState));
    public readonly apiVersion$ = this.store.pipe(select(selectVersionState));

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
                hasProperty<Data>('title'),
                pluck<Data, string>('title'),
                distinctUntilChanged(),
            ).subscribe((title: string) => {
                this.title.setTitle(`CEPiK UI | ${title}`);
            }),
        );
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}
