import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ApiResponse, DictionaryItem, DictionaryItemList } from 'src/app/shared/interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DictionaryService } from 'src/app/shared/services/dictionary.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SET_DICTIONARY_ITEM } from 'src/app/store/dictionaries/dictionaries.actions';
import { selectDictionary } from 'src/app/store/dictionaries/dictionaries.selectors';
import { CATEGORY_KEY } from 'src/app/shared/constants';

@Injectable()
export class DictionaryItemsResolver implements Resolve<DictionaryItem[]> {

    constructor(
        private readonly dictionaryService: DictionaryService,
        private readonly store: Store<AppState>,
    ) {
    }

    public resolve(route: ActivatedRouteSnapshot): Observable<DictionaryItem[]> {
        if (route.queryParams.hasOwnProperty(CATEGORY_KEY)) {
            return this.store.pipe(
                select(selectDictionary, { id: route.queryParams[CATEGORY_KEY] }),
                switchMap((dictionaryItems: DictionaryItem[]) => {
                    if (Array.isArray(dictionaryItems)) {
                        return of(dictionaryItems);
                    }
                    return this.dictionaryService.getDictionary(route.queryParams[CATEGORY_KEY]).pipe(
                        tap((response: ApiResponse<DictionaryItemList>) => {
                            this.store.dispatch(SET_DICTIONARY_ITEM({
                                item: {
                                    id: response.data.id,
                                    items: response.data.attributes['dostepne-rekordy-slownika'],
                                    total: response.data.attributes['ilosc-rekordow-slownika'],
                                },
                            }));
                        }),
                        map((response) => response.data.attributes['dostepne-rekordy-slownika']),
                    );
                }),
            );
        }

        return of([]);
    }
}
