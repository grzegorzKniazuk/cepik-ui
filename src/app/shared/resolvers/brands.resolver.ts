import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DictionaryService } from 'src/app/shared/services';
import { BaseDictionaryResolver } from 'src/app/shared/resolvers/base/base-dictionary.resolver';

@Injectable()
export class BrandsResolver extends BaseDictionaryResolver {

    protected readonly dictionaryKey = 'marka';

    constructor(
        store: Store<AppState>,
        dictionaryService: DictionaryService,
    ) {
        super(store, dictionaryService);
    }
}
