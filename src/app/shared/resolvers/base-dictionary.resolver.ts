import { Resolve } from '@angular/router';
import { ApiResponse, DictionaryItem, DictionaryItemList } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DictionaryService } from 'src/app/shared/services';
import { Observable, of } from 'rxjs';
import { selectDictionary } from 'src/app/store/dictionaries/dictionaries.selectors';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { SET_DICTIONARY_ITEM } from 'src/app/store/dictionaries/dictionaries.actions';

export abstract class BaseDictionaryResolver implements Resolve<DictionaryItem[]> {

    protected abstract readonly dictionaryKey: string;

    protected constructor(
        protected readonly store: Store<AppState>,
        protected readonly dictionaryService: DictionaryService,
    ) {
    }

    public resolve(): Observable<DictionaryItem[]> {
        return this.store.pipe(
            select(selectDictionary, { id: this.dictionaryKey }),
            switchMap((dictionaryItems: DictionaryItem[]) => {
                if (Array.isArray(dictionaryItems)) {
                    return of(dictionaryItems);
                }
                return this.dictionaryService.getDictionary(this.dictionaryKey).pipe(
                    tap((response: ApiResponse<DictionaryItemList>) => {
                        this.store.dispatch(SET_DICTIONARY_ITEM({
                            item: {
                                id: response.data.id,
                                items: response.data.attributes['dostepne-rekordy-slownika'],
                            },
                        }));
                    }),
                    map((response) => response.data.attributes['dostepne-rekordy-slownika']),
                );
            }),
            first(),
        );
    }
}
