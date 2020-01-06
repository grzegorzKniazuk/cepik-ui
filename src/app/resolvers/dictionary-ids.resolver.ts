import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DictionaryService } from 'src/app/shared/services/dictionary.service';
import { first, map, pluck, switchMap, tap } from 'rxjs/operators';
import { DictionaryDef } from 'src/app/shared/interfaces';
import { SET_DICTIONARIES_DEF } from 'src/app/store/dictionaries-def/dictionaries-def.actions';
import { selectAllDictionariesDef, selectIsDictionariesDefLoaded } from 'src/app/store/dictionaries-def/dictionary-def.selectors';

@Injectable()
export class DictionaryIdsResolver implements Resolve<string[]> {

    constructor(
        private readonly store: Store<AppState>,
        private readonly dictionaryService: DictionaryService,
    ) {
    }

    public resolve(): Observable<string[]> {
        return this.store.pipe(
            select(selectIsDictionariesDefLoaded),
            switchMap((isLoaded: boolean) => {
                if (isLoaded) {
                    return this.store.pipe(
                        select(selectAllDictionariesDef),
                        map((defs: DictionaryDef[]) => defs.map((def) => def.id)),
                    );
                }
                return this.dictionaryService.getDictionariesDef().pipe(
                    tap(({ data }) => this.store.dispatch(SET_DICTIONARIES_DEF({ def: data }))),
                    pluck('data'),
                    map((defs: DictionaryDef[]) => defs.map((def) => def.id)),
                );
            }),
            first(),
        );
    }
}
