import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { dictionariesReducer, DictionariesState } from 'src/app/store/dictionaries/dictionaries.reducer';
import { loaderReducer, LoaderState } from 'src/app/store/loader/loader.reducer';
import { paginationLinksReducer, PaginationLinksState } from 'src/app/store/pagination-links/pagination-links.reducer';
import { vehiclesReducer, VehiclesState } from 'src/app/store/vehicles/vehicles.reducer';

export interface AppState {
    router: RouterReducerState;
    dictionaries: DictionariesState;
    vehicles: VehiclesState;
    loader: LoaderState;
    paginationLinks: PaginationLinksState;
}

export const appReducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    dictionaries: dictionariesReducer,
    vehicles: vehiclesReducer,
    loader: loaderReducer,
    paginationLinks: paginationLinksReducer,
};
