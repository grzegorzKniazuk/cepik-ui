import { ADD_DICTIONARY_ITEM } from 'src/app/store/dictionaries/dictionaries.actions';
import { dictionariesReducer, DictionariesState, initialDictionariesState } from 'src/app/store/dictionaries/dictionaries.reducer';

describe(dictionariesReducer.name, () => {

    describe(ADD_DICTIONARY_ITEM.type, () => {
        it('should add dictionary item into store', () => {
            const action = ADD_DICTIONARY_ITEM({
                item: {
                    id: 'wojewodztwa',
                    items: [ {
                        'klucz-slownika': 'key',
                        'wartosc-slownika': 'value',
                        'liczba-wystapien': 1,
                    } ],
                },
            });

            const state = dictionariesReducer(initialDictionariesState, action);
            const expectedState: DictionariesState = {
                ids: [ 'wojewodztwa' ],
                entities: {
                    wojewodztwa: {
                        id: 'wojewodztwa',
                        items: [ {
                            'klucz-slownika': 'key',
                            'wartosc-slownika': 'value',
                            'liczba-wystapien': 1,
                        } ],
                    },
                },
            };

            expect(state).toEqual(expectedState);
        });
    });
});
