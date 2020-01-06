import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DictionariesState, selectEntities } from 'src/app/store/dictionaries/dictionaries.reducer';
import { DictionaryItem, Pagination } from 'src/app/shared/interfaces';
import { Dictionary } from '@ngrx/entity';

export const selectDictionariesState = createFeatureSelector<DictionariesState>('dictionaries');

export const selectDictionariesEntities = createSelector(
    selectDictionariesState,
    selectEntities,
);

export const selectDictionary = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[] }>, { id }: { id: string }) => entities[id] ? entities[id].items : undefined),
);

export const selectDictionaryWithPaginationAndFilters = createSelector(
    selectDictionariesEntities,
    ((entities: Dictionary<{ id: string, items: DictionaryItem[] }>, { id, pagination, phrase }: { id: string, pagination: Pagination, phrase: string }) => {

        if (entities[id] && Array.isArray(entities[id].items)) {
            return entities[id].items.filter((entity: DictionaryItem) => {
                if (phrase) {
                    return entity['klucz-slownika'].toString().toLowerCase().includes(phrase.toLowerCase())
                        || entity['wartosc-slownika'].toString().toLowerCase().includes(phrase.toLowerCase())
                        || entity['liczba-wystapien'].toString().toLowerCase().includes(phrase.toLowerCase());
                }
                return entity;
            }).filter((_, index: number) => {
                return index < pagination.page * pagination.limit && index >= pagination.page * pagination.limit - pagination.limit;
            });
        }

        return undefined;
    }),
);
