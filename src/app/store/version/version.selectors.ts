import { createFeatureSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/index';
import { VersionState } from 'src/app/store/version/version.reducer';
import { VERSION_FEATURE_KEY } from 'src/app/store/feature-names';

export const selectVersionState = createFeatureSelector<AppState, VersionState>(VERSION_FEATURE_KEY);
