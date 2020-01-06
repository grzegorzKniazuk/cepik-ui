import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryDef, DictionaryItem, Pagination } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectQueryParam } from 'src/app/store/router/router.selectors';
import { combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, first, startWith, switchMap } from 'rxjs/operators';
import { selectAllDictionariesDef } from 'src/app/store/dictionaries-def/dictionary-def.selectors';
import { selectPaginationState } from 'src/app/store/pagination/pagination.selectors';
import { selectDictionaryWithPagination } from 'src/app/store/dictionaries/dictionaries.selectors';
import { UPDATE_PAGINATION } from 'src/app/store/pagination/pagination.actions';

@Component({
    selector: 'cpk-dictionaries',
    templateUrl: './dictionaries.component.html',
    styleUrls: [ './dictionaries.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionariesComponent {

    public readonly dictionariesDef$: Observable<DictionaryDef[]> = this.store.pipe(select(selectAllDictionariesDef), startWith([]));
    public readonly selectedCategory$: Observable<string> = this.store.pipe(select(selectQueryParam('category')));
    public readonly dictionaryItems$: Observable<DictionaryItem[]> = combineLatest([
        this.selectedCategory$.pipe(distinctUntilChanged()),
        this.store.pipe(select(selectPaginationState)),
    ]).pipe(
        switchMap(([ id, pagination ]: [ string, Pagination ]) => this.store.pipe(select(selectDictionaryWithPagination, { id, pagination }), first())),
        startWith([]),
    );

    public readonly paginator$: Observable<Pagination> = this.store.pipe(select(selectPaginationState));

    constructor(
        private readonly router: Router,
        private readonly store: Store<AppState>,
    ) {
    }

    public onCategorySelect(category: string): void {
        this.router.navigate([ './', 'dictionaries' ], { queryParams: { category }, queryParamsHandling: 'merge' });
    }

    public onPageChange({ page, limit, total }: Pick<Pagination, 'page' | 'limit' | 'total'>): void {
        this.store.dispatch(UPDATE_PAGINATION({ pagination: { page, limit, total } }));
    }

    public onLimitChange({ limit, total }: Pick<Pagination, 'limit' | 'total'>): void {
        this.store.dispatch(UPDATE_PAGINATION({
                pagination: {
                    page: 1,
                    total,
                    limit,
                },
            },
        ));
    }
}
