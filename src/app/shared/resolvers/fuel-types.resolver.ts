import { BaseDictionaryResolver } from 'src/app/shared/resolvers/base/base-dictionary.resolver';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DictionaryService } from 'src/app/shared/services';
import { Injectable } from '@angular/core';

@Injectable()
export class FuelTypesResolver extends BaseDictionaryResolver {

    protected readonly dictionaryKey = 'rodzaj-paliwa';

    constructor(
        store: Store<AppState>,
        dictionaryService: DictionaryService,
    ) {
        super(store, dictionaryService);
    }
}
