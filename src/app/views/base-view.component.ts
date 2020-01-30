import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectQueryParam } from 'src/app/store/router/router.selectors';
import { LIMIT_KEY } from 'src/app/shared/constants';
import { AppState } from 'src/app/store';
import { ActivatedRoute, Router } from '@angular/router';
import { map, share } from 'rxjs/operators';
import { PaginationLinksState } from 'src/app/store/pagination-links/pagination-links.reducer';
import { selectPaginationLinksState } from 'src/app/store/pagination-links/pagination-links.selectors';
import { BaseComponent } from 'src/app/views/base.component';

export abstract class BaseViewComponent extends BaseComponent {
    public readonly selectedLimit$: Observable<number> = this.store.pipe(select(selectQueryParam(LIMIT_KEY)), map(Number), share());
    public readonly paginationLinksState$: Observable<PaginationLinksState> = this.store.pipe(select(selectPaginationLinksState), share());

    protected constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        protected readonly store: Store<AppState>,
    ) {
        super(activatedRoute, router);
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
