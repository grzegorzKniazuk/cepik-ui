import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DictionariesState, selectEntities } from 'src/app/store/dictionaries/dictionaries.reducer';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { Dictionary } from '@ngrx/entity';

export const selectDictionariesState = createFeatureSelector<DictionariesState>('dictionaries');

export const selectDictionariesEntities = createSelector(
    selectDictionariesState,
    selectEntities,
);

export const selectDictionary = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[], total: number }>, { id }: { id: string }) => entities[id] ? entities[id].items : undefined),
);

export const selectNumberOfDictionaryItems = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[], total: number }>, { id, phrase }: { id: string, phrase: string }) => {
        if (entities[id] && Array.isArray(entities[id].items)) {
            return entities[id].items.filter((entity: DictionaryItem) => filterDictionaryByPhrase(entity, phrase)).length;
        }

        return 0;
    }),
);

export const selectDictionaryWithPaginationAndFilters = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[], total: number }>, { id, page, limit, phrase }: { id: string, page: string, limit: string, phrase: string }) => {

        if (entities[id] && Array.isArray(entities[id].items)) {
            return entities[id].items.filter((entity: DictionaryItem) => filterDictionaryByPhrase(entity, phrase)).filter((_, index: number) => filterDictionaryByPageAndLimit(index, page, limit));
        }

        return [];
    }),
);

function filterDictionaryByPageAndLimit(index: number, page: string, limit: string): boolean {
    return index < +page * +limit && index >= +page * +limit - +limit;
}

function filterDictionaryByPhrase(entity: DictionaryItem, phrase: string): boolean {
    if (phrase) {
        return entity['klucz-slownika'] && entity['klucz-slownika'].toString().toLowerCase().includes(phrase.toLowerCase())
            || entity['wartosc-slownika'] && entity['wartosc-slownika'].toString().toLowerCase().includes(phrase.toLowerCase())
            || entity['liczba-wystapien'] && entity['liczba-wystapien'].toString().toLowerCase().includes(phrase.toLowerCase());
    }

    return true;
}
