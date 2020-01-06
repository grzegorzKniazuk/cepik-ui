import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { dictionariesDefReducer, DictionariesDefState } from 'src/app/store/dictionaries-def/dictionaries-def.reducer';
import { dictionariesReducer, DictionariesState } from 'src/app/store/dictionaries/dictionaries.reducer';
import { paginationReducer, PaginationState } from 'src/app/store/pagination/pagination.reducer';

export interface AppState {
    router: RouterReducerState;
    dictionariesDef: DictionariesDefState;
    dictionaries: DictionariesState;
    pagination: PaginationState;
}

export const appReducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    dictionariesDef: dictionariesDefReducer,
    dictionaries: dictionariesReducer,
    pagination: paginationReducer,
};
