import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DictionaryItem, Vehicle } from 'src/app/shared/interfaces';
import { selectQueryParam } from 'src/app/store/router/router.selectors';
import { LIMIT_KEY, WOJEWODZTWO_KEY } from 'src/app/shared/constants';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BaseViewComponent } from 'src/app/shared/components';

@Component({
    selector: 'cpk-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: [ './vehicles.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent extends BaseViewComponent {

    public readonly selectedRegion$ = this.store.pipe(select(selectQueryParam(WOJEWODZTWO_KEY)));
    public readonly regions: DictionaryItem[] = this.activatedRoute.snapshot.data['regions'];
    public readonly vehicles$: Observable<Vehicle[]> = this.activatedRoute.data.pipe(pluck<Data, Vehicle[]>('vehicles'));

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        store: Store<AppState>,
    ) {
        super(activatedRoute, router, store);
    }

    public onRegionSelect(region: string): void {
        this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { wojewodztwo: region, page: 1, limit: this.activatedRoute.snapshot.queryParams[LIMIT_KEY] || 10 },
            queryParamsHandling: 'merge',
        });
    }
}
