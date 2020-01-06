import { Links } from 'src/app/shared/interfaces/links';
import { Attributes } from 'src/app/shared/interfaces/attributes';
import { DictionaryItem } from 'src/app/shared/interfaces/dictionary-item';

export interface DictionaryItemList {
    id: string;
    type: string;
    links: Pick<Links, 'self'>;
    attributes: Pick<Attributes<DictionaryItem>, 'dostepne-rekordy-slownika' | 'ilosc-rekordow-slownika'>
}
