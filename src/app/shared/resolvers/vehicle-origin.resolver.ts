import { BaseDictionaryResolver } from 'src/app/shared/resolvers/base-dictionary.resolver';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { DictionaryService } from 'src/app/shared/services';
import { Injectable } from '@angular/core';

@Injectable()
export class VehicleOriginResolver extends BaseDictionaryResolver {

    protected readonly dictionaryKey = 'pochodzenie-pojazdu';

    constructor(
        store: Store<AppState>,
        dictionaryService: DictionaryService,
    ) {
        super(store, dictionaryService);
    }
}
