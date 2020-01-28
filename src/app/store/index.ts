import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { dictionariesReducer, DictionariesState } from 'src/app/store/dictionaries/dictionaries.reducer';
import { loaderReducer, LoaderState } from 'src/app/store/loader/loader.reducer';
import { paginationLinksReducer, PaginationLinksState } from 'src/app/store/pagination-links/pagination-links.reducer';
import { vehiclesReducer, VehiclesState } from 'src/app/store/vehicles/vehicles.reducer';
import { versionReducer, VersionState } from 'src/app/store/version/version.reducer';
import { DICTIONARIES_FEATURE_KEY, DRIVING_LICENSES_STATISTICS_FEATURE_KEY, LOADER_FEATURE_KEY, PAGINATION_LINKS_FEATURE_KEY, PERMISSIONS_STATISTICS_FEATURE_KEY, ROUTER_FEATURE_KEY, VEHICLES_FEATURE_KEY, VERSION_FEATURE_KEY } from 'src/app/store/feature-names';
import { drivingLicensesReducer, DrivingLicensesStatisticsState } from 'src/app/store/statistics/driving-license/driving-licenses-statistics.reducer';
import { permissionsStatisticsReducer, PermissionsStatisticsState } from 'src/app/store/statistics/permissions/permissions-statistics.reducer';

export interface AppState {
    [ROUTER_FEATURE_KEY]: RouterReducerState;
    [DICTIONARIES_FEATURE_KEY]: DictionariesState;
    [VEHICLES_FEATURE_KEY]: VehiclesState;
    [LOADER_FEATURE_KEY]: LoaderState;
    [VERSION_FEATURE_KEY]: VersionState;
    [PAGINATION_LINKS_FEATURE_KEY]: PaginationLinksState;
    [DRIVING_LICENSES_STATISTICS_FEATURE_KEY]: DrivingLicensesStatisticsState;
    [PERMISSIONS_STATISTICS_FEATURE_KEY]: PermissionsStatisticsState;
}

export const appReducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    dictionaries: dictionariesReducer,
    vehicles: vehiclesReducer,
    loader: loaderReducer,
    version: versionReducer,
    pagination_links: paginationLinksReducer,
    driving_licenses_statistics: drivingLicensesReducer,
    permissions_statistics: permissionsStatisticsReducer,
};
