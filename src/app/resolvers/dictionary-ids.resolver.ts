import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DictionaryService } from 'src/app/shared/services/dictionary.service';
import { defaultIfEmpty, filter, first, mapTo, pluck, switchAll, tap } from 'rxjs/operators';
import { DictionaryDef } from 'src/app/shared/interfaces';
import { SET_DICTIONARIES_DEF } from 'src/app/store/dictionaries-def/dictionaries-def.actions';
import { selectAllDictionariesDef, selectIsDictionariesDefLoaded } from 'src/app/store/dictionaries-def/dictionary-def.selectors';

@Injectable()
export class DictionaryIdsResolver implements Resolve<DictionaryDef[]> {

    constructor(
        private readonly store: Store<AppState>,
        private readonly dictionaryService: DictionaryService,
    ) {
    }

    public resolve(): Observable<DictionaryDef[]> {
        return this.store.pipe(
            select(selectIsDictionariesDefLoaded),
            first(),
            filter((isLoaded) => !isLoaded),
            mapTo(this.dictionaryService.getDictionariesDef().pipe(
                pluck('data'),
                tap((defs: DictionaryDef[]) => this.store.dispatch(SET_DICTIONARIES_DEF({ defs: defs }))),
                ),
            ),
            defaultIfEmpty(this.store.pipe(select(selectAllDictionariesDef))),
            switchAll(),
            first(),
        );
    }
}
