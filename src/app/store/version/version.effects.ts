import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { VersionService } from 'src/app/shared/services';
import { map, switchMap } from 'rxjs/operators';
import { Version } from 'src/app/shared/interfaces';
import { SET_VERSION } from 'src/app/store/version/version.actions';

@Injectable()
export class VersionEffects implements OnInitEffects {

    public readonly init$ = createEffect(() => {
        return this.actions$.pipe(
            ofType('VERSION_EFFECT_INIT'),
            switchMap(() => this.versionService.getVersion()),
            map((version: Version) => SET_VERSION({ version })),
        );
    });

    constructor(
        private readonly actions$: Actions,
        private readonly versionService: VersionService,
    ) {
    }

    ngrxOnInitEffects(): Action {
        return { type: 'VERSION_EFFECT_INIT' };
    }
}
