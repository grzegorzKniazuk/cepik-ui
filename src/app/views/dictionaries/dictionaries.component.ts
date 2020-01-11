import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DictionaryDef, DictionaryItem } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectQueryParam } from 'src/app/store/router/router.selectors';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { selectAllDictionariesDef } from 'src/app/store/dictionaries-def/dictionary-def.selectors';
import { selectDictionaryWithPaginationAndFilters, selectNumberOfDictionaryItems } from 'src/app/store/dictionaries/dictionaries.selectors';
import { CATEGORY_KEY, LIMIT_KEY, PAGE_KEY, PHRASE_KEY } from 'src/app/shared/constants';

@Component({
    selector: 'cpk-dictionaries',
    templateUrl: './dictionaries.component.html',
    styleUrls: [ './dictionaries.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionariesComponent {

    public readonly dictionariesDef$: Observable<DictionaryDef[]> = this.store.pipe(select(selectAllDictionariesDef));
    public readonly selectedCategory$: Observable<string> = this.store.pipe(select(selectQueryParam(CATEGORY_KEY)));
    public readonly selectPage$: Observable<string> = this.store.pipe(select(selectQueryParam(PAGE_KEY)));
    public readonly selectLimit$: Observable<string> = this.store.pipe(select(selectQueryParam(LIMIT_KEY)));
    public readonly searchPhrase$: Observable<string> = this.store.pipe(select(selectQueryParam(PHRASE_KEY)));

    public readonly numberOfDictionaryItems$: Observable<number> = combineLatest([
        this.selectedCategory$,
        this.searchPhrase$,
    ]).pipe(switchMap(([ id, phrase ]: string[]) => this.store.pipe(select(selectNumberOfDictionaryItems, { id, phrase }))));

    public readonly dictionaryItems$: Observable<DictionaryItem[]> = combineLatest([
        this.selectedCategory$,
        this.selectPage$,
        this.selectLimit$,
        this.searchPhrase$,
    ]).pipe(switchMap(([ id, page, limit, phrase ]: string[]) => this.store.pipe(select(selectDictionaryWithPaginationAndFilters, { id, page, limit, phrase }))));

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly store: Store<AppState>,
    ) {
    }

    public onCategorySelect(category: string): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { category, page: 1, limit: this.activatedRoute.snapshot.queryParams[LIMIT_KEY] || 10, phrase: undefined },
            queryParamsHandling: 'merge',
        });
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
