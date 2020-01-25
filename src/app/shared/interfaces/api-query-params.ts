import { VehicleQueryParamDate } from 'src/app/shared/enums';
import {
    DATA_DO_KEY,
    DATA_OD_KEY,
    FILTER_MARKA_KEY,
    FILTER_MODEL_KEY,
    FILTER_POCHODZENIE_POJAZDU_KEY,
    FILTER_PRZEZNACZENIE_POJAZDU_KEY,
    FILTER_REJESTRACJA_GMINA_KEY,
    FILTER_REJESTRACJA_POWIAT_KEY,
    FILTER_RODZAJ_PALIWA_KEY,
    FILTER_RODZAJ_POJAZDU_KEY,
    LIMIT_KEY,
    PAGE_KEY,
    POKAZ_WSZYSTKIE_POLA_KEY,
    SORT_KEY,
    TYLKO_ZAREJESTROWANE_KEY,
    TYP_DATY_KEY,
    WOJEWODZTWO_KEY,
} from 'src/app/shared/constants';

export interface VehicleListQueryParams {
    readonly [index: string]: boolean | string | string[];

    [WOJEWODZTWO_KEY]: string;
    [DATA_OD_KEY]: string;
    [DATA_DO_KEY]: string;
    [TYP_DATY_KEY]: VehicleQueryParamDate;
    [TYLKO_ZAREJESTROWANE_KEY]: string;
    [POKAZ_WSZYSTKIE_POLA_KEY]: boolean;
    [LIMIT_KEY]: string;
    [PAGE_KEY]: string;
    [SORT_KEY]?: string[];
    [FILTER_MARKA_KEY]?: string;
    [FILTER_MODEL_KEY]?: string;
    [FILTER_RODZAJ_POJAZDU_KEY]?: string;
    [FILTER_RODZAJ_PALIWA_KEY]?: string;
    [FILTER_POCHODZENIE_POJAZDU_KEY]?: string;
    [FILTER_PRZEZNACZENIE_POJAZDU_KEY]?: string;
    [FILTER_REJESTRACJA_POWIAT_KEY]?: string;
    [FILTER_REJESTRACJA_GMINA_KEY]?: string;
}
