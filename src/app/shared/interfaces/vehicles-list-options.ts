import { DATA_DO_KEY, DATA_OD_KEY, TYLKO_ZAREJESTROWANE_KEY, TYP_DATY_KEY } from 'src/app/shared/constants';

export interface VehiclesListOptions {
    [DATA_OD_KEY]: string;
    [DATA_DO_KEY]: string;
    [TYP_DATY_KEY]: string;
    [TYLKO_ZAREJESTROWANE_KEY]: string;
}
