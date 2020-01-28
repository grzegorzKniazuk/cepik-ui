import { Links } from 'src/app/shared/interfaces/links';
import { DictionaryAttributes } from 'src/app/shared/interfaces/dictionary/dictionary-attributes';
import { DictionaryItem } from 'src/app/shared/interfaces/dictionary/dictionary-item';

export interface DictionaryItemList {
    id: string;
    type: string;
    links: Pick<Links, 'self'>;
    attributes: Pick<DictionaryAttributes<DictionaryItem>, 'dostepne-rekordy-slownika' | 'ilosc-rekordow-slownika'>
}
