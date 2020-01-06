import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryDef, DictionaryItem } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectQueryParam } from 'src/app/store/router/router.selectors';
import { Observable } from 'rxjs';
import { distinctUntilChanged, first, startWith, switchMap } from 'rxjs/operators';
import { selectDictionary } from 'src/app/store/dictionaries/dictionaries.selectors';
import { selectAllDictionariesDef } from 'src/app/store/dictionaries-def/dictionary-def.selectors';

@Component({
    selector: 'cpk-dictionaries',
    templateUrl: './dictionaries.component.html',
    styleUrls: [ './dictionaries.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DictionariesComponent {

    public readonly dictionariesDef$: Observable<DictionaryDef[]> = this.store.pipe(select(selectAllDictionariesDef));
    public readonly selectedCategory$: Observable<string> = this.store.pipe(select(selectQueryParam('category')));
    public readonly dictionaryItems$: Observable<DictionaryItem[]> = this.selectedCategory$.pipe(
        distinctUntilChanged(),
        switchMap((id: string) => this.store.pipe(select(selectDictionary, { id }), first())),
        startWith([]),
    );

    constructor(
        private readonly router: Router,
        private readonly store: Store<AppState>,
    ) {
    }

    public onCategorySelect(category: string): void {
        this.router.navigate([ './', 'dictionaries' ], { queryParams: { category }, queryParamsHandling: 'merge' });
    }
}
