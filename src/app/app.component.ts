import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { distinctUntilChanged, filter, pluck } from 'rxjs/operators';
import { selectRouteData } from 'src/app/store/router/router.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'cpk-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

    private readonly subscription$ = new Subscription();

    constructor(
        private readonly title: Title,
        private readonly store: Store<AppState>,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.subscription$.add(
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
        this.subscription$.unsubscribe();
    }

    public onNavbarSearch(phrase: string | Event): void {
        if (typeof phrase === 'string' && phrase.length) {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { phrase, page: 1 },
                queryParamsHandling: 'merge',
            });
        } else {
            this.router.navigate([], {
                relativeTo: this.activatedRoute,
                queryParams: { phrase: undefined, page: 1 },
                queryParamsHandling: 'merge',
            });
        }
    }
}
