import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DictionaryItem, Vehicle } from 'src/app/shared/interfaces';
import { DATA_DO_KEY, DATA_OD_KEY, LIMIT_KEY, PAGE_KEY, TYLKO_ZAREJESTROWANE_KEY, TYP_DATY_KEY, WOJEWODZTWO_KEY } from 'src/app/shared/constants';
import { pluck, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VehicleQueryParamDate } from 'src/app/shared/enums';
import { FormBuilder } from '@angular/forms';
import { ModalService, TimeService } from 'src/app/shared/services';
import { BaseViewComponent } from 'src/app/views/base-view.component';
import { VehiclesQueryOptionsComponent } from 'src/app/views/vehicles/vehicles-query-options/vehicles-query-options.component';

@Component({
    selector: 'cpk-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: [ './vehicles.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent extends BaseViewComponent implements OnInit, OnDestroy {

    public readonly regions: DictionaryItem[] = this.activatedRoute.snapshot.data['regions'];
    public readonly vehicles$: Observable<Vehicle[]> = this.activatedRoute.data.pipe(pluck<Data, Vehicle[]>('vehicles'));
    public readonly selectedRegionControl = this.formBuilder.control(this.activatedRoute.snapshot.queryParams[WOJEWODZTWO_KEY]);
    public readonly selectedRegion$ = this.selectedRegionControl.valueChanges.pipe(startWith(this.selectedRegionControl.value));

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        store: Store<AppState>,
        private readonly formBuilder: FormBuilder,
        private readonly timeService: TimeService,
        private readonly modalService: ModalService<VehiclesQueryOptionsComponent>,
    ) {
        super(activatedRoute, router, store);
    }

    ngOnInit() {
        this.subscriptions.add(this.selectedRegionControl.valueChanges.subscribe((region: string) => this.onRegionSelect(region)));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    public openVehiclesQueryOptionsModal(): void {
        this.modalService.open(VehiclesQueryOptionsComponent, { title: 'Parametry zapytania' });
    }

    public resetQueryOptions(): void {
        this.resolveParams({
            [WOJEWODZTWO_KEY]: this.activatedRoute.snapshot.queryParams[WOJEWODZTWO_KEY],
            [PAGE_KEY]: 1,
            [LIMIT_KEY]: 10,
            [TYP_DATY_KEY]: VehicleQueryParamDate.PIERWSZA_REJESTRACJA_POJAZDU_W_POLSCE,
            [DATA_OD_KEY]: this.timeService.yearsBackFromToday(2),
            [DATA_DO_KEY]: this.timeService.todayDate,
            [TYLKO_ZAREJESTROWANE_KEY]: true,
        });
    }

    public onRegionSelect(region: string): void {
        this.resolveParams({
            [WOJEWODZTWO_KEY]: region,
            [PAGE_KEY]: 1,
            [LIMIT_KEY]: this.activatedRoute.snapshot.queryParams[LIMIT_KEY] || 10,
            [TYP_DATY_KEY]: this.activatedRoute.snapshot.queryParams[TYP_DATY_KEY] || VehicleQueryParamDate.PIERWSZA_REJESTRACJA_POJAZDU_W_POLSCE,
            [DATA_OD_KEY]: this.activatedRoute.snapshot.queryParams[DATA_OD_KEY] || this.timeService.yearsBackFromToday(2),
            [DATA_DO_KEY]: this.activatedRoute.snapshot.queryParams[DATA_DO_KEY] || this.timeService.todayDate,
            [TYLKO_ZAREJESTROWANE_KEY]: this.activatedRoute.snapshot.queryParams[TYLKO_ZAREJESTROWANE_KEY] || true,
        });
    }
}
