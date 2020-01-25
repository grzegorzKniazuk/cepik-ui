import { Injectable } from '@angular/core';
import { BaseDictionaryResolver } from 'src/app/shared/resolvers/base-dictionary.resolver';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DictionaryService } from 'src/app/shared/services';

@Injectable()
export class VehicleTypesResolver extends BaseDictionaryResolver {

    protected readonly dictionaryKeyName = 'rodzaj-pojazdu';

    constructor(
        store: Store<AppState>,
        dictionaryService: DictionaryService,
    ) {
        super(store, dictionaryService);
    }
}
