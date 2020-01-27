import { Links } from 'src/app/shared/interfaces/links';
import { Meta } from 'src/app/shared/interfaces/meta';

export interface ApiResponse<T> {
    meta: Meta;
    links: Partial<Links>;
    data: T;
}
