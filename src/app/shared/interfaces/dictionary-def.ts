import { Links } from 'src/app/shared/interfaces/links';
import { Attributes } from 'src/app/shared/interfaces/attributes';

export interface DictionaryDef {
    id: string;
    type: string;
    links: Pick<Links, 'self'>;
    attributes: Pick<Attributes, 'opis-slownika'>
}
