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
import { CATEGORY_KEY, LIMIT_KEY } from 'src/app/shared/constants';
import { BaseViewComponent } from '../base-view.component';

@Component({
    selector: 'cpk-dictionaries',
    templateUrl: './dictionaries.component.html',
    styleUrls: [ './dictionaries.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionariesComponent extends BaseViewComponent {

    public readonly dictionariesDef$: Observable<DictionaryDef[]> = this.store.pipe(select(selectAllDictionariesDef));
    public readonly selectedCategory$: Observable<string> = this.store.pipe(select(selectQueryParam(CATEGORY_KEY)));

    public readonly numberOfDictionaryItems$: Observable<number> = combineLatest([
        this.selectedCategory$,
        this.searchPhrase$,
    ]).pipe(switchMap(([ id, phrase ]: string[]) => this.store.pipe(select(selectNumberOfDictionaryItems, { id, phrase }))));

    public readonly dictionaryItems$: Observable<DictionaryItem[]> = combineLatest([
        this.selectedCategory$,
        this.selectedPage$,
        this.selectedLimit$,
        this.searchPhrase$,
    ]).pipe(switchMap(([ id, page, limit, phrase ]: [ string, string, number, string ]) => this.store.pipe(select(selectDictionaryWithPaginationAndFilters, { id, page, limit, phrase }))));

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        store: Store<AppState>,
    ) {
        super(activatedRoute, router, store);
    }

    public onCategorySelect(category: string): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { category, page: 1, limit: this.activatedRoute.snapshot.queryParams[LIMIT_KEY] || 10, phrase: undefined },
            queryParamsHandling: 'merge',
        });
    }
}
