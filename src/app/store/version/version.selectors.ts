import { createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/index';
import { VersionState } from 'src/app/store/version/version.reducer';

export const selectVersionState = createFeatureSelector<AppState, VersionState>('version');
