import { selectDictionary } from 'src/app/store/dictionaries/dictionaries.selectors';
import { Dictionary } from '@ngrx/entity';
import { DictionaryItem } from 'src/app/shared/interfaces';

describe('dictionaries selectors', () => {

    const mockedDictionariesState: Dictionary<{ id: string, items: DictionaryItem[] }> = {
        wojewodztwa: {
            id: 'wojewodztwa',
            items: [ {
                'klucz-slownika': 'key',
                'wartosc-slownika': 'value',
                'liczba-wystapien': 1,
            } ],
        },
    };

    describe('selectDictionary', () => {
        it('should select dictionary items by given dictionary id id', () => {
            expect(selectDictionary.projector(mockedDictionariesState, { id: 'wojewodztwa' })).toEqual([ {
                'klucz-slownika': 'key',
                'wartosc-slownika': 'value',
                'liczba-wystapien': 1,
            } ]);
        });
    });
});