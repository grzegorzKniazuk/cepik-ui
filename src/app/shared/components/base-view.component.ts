import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectQueryParam } from 'src/app/store/router/router.selectors';
import { LIMIT_KEY, PAGE_KEY, PHRASE_KEY } from 'src/app/shared/constants';
import { AppState } from 'src/app/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectLoaderState } from 'src/app/store/loader/loader.selectors';
import { map, share } from 'rxjs/operators';
import { PaginationLinksState } from 'src/app/store/pagination-links/pagination-links.reducer';
import { selectPaginationLinksState } from 'src/app/store/pagination-links/pagination-links.selectors';

export abstract class BaseViewComponent {
    public readonly selectedPage$: Observable<string> = this.store.pipe(select(selectQueryParam(PAGE_KEY)), share());
    public readonly selectedLimit$: Observable<number> = this.store.pipe(select(selectQueryParam(LIMIT_KEY)), map(v => +v), share());
    public readonly searchPhrase$: Observable<string> = this.store.pipe(select(selectQueryParam(PHRASE_KEY)), share());
    public readonly loadingState$: Observable<boolean> = this.store.pipe(select(selectLoaderState), share());
    public readonly paginationLinksState$: Observable<PaginationLinksState> = this.store.pipe(select(selectPaginationLinksState), share());

    protected constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly router: Router,
        protected readonly store: Store<AppState>,
    ) {
    }

    public onPageChange(page: number): void {
        this.router.navigate([],
            {
                relativeTo: this.activatedRoute,
                queryParams: { page },
                queryParamsHandling: 'merge',
            });
    }

    public onLimitChange(limit: number): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page: 1, limit },
            queryParamsHandling: 'merge',
        });
    }
}
