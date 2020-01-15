import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { DictionaryItem, Vehicle, VehiclesListOptions } from 'src/app/shared/interfaces';
import { DATA_DO_KEY, DATA_OD_KEY, LIMIT_KEY, PAGE_KEY, TYLKO_ZAREJESTROWANE_KEY, TYP_DATY_KEY, WOJEWODZTWO_KEY } from 'src/app/shared/constants';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { VehicleQueryParamDate } from 'src/app/shared/enums';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TimeService } from 'src/app/shared/services';
import { BaseViewComponent } from 'src/app/views/base-view.component';

@Component({
    selector: 'cpk-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: [ './vehicles.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesComponent extends BaseViewComponent implements OnInit, OnDestroy {

    public readonly dateTypeDataset = [
        { key: 'Data pierwszej rejestracji pojazdu w Polsce', value: VehicleQueryParamDate.PIERWSZA_REJESTRACJA_POJAZDU_W_POLSCE },
        { key: 'Data ostatniej rejestracji pojazdu', value: VehicleQueryParamDate.OSTATNIA_REJESTRACJA_POJAZDU },
    ];
    public readonly regions: DictionaryItem[] = this.activatedRoute.snapshot.data['regions'];
    public readonly vehicles$: Observable<Vehicle[]> = this.activatedRoute.data.pipe(pluck<Data, Vehicle[]>('vehicles'));
    public readonly selectedRegion = this.formBuilder.control([ this.activatedRoute.snapshot.queryParams[WOJEWODZTWO_KEY] ]);
    public optionsForm: FormGroup;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        store: Store<AppState>,
        private readonly formBuilder: FormBuilder,
        private readonly timeService: TimeService,
    ) {
        super(activatedRoute, router, store);
    }

    ngOnInit() {
        this.buildOptionsForm();
        this.subscriptions.add(this.selectedRegion.valueChanges.subscribe((region: string) => this.onRegionSelect(region)));
        this.subscriptions.add(this.optionsForm.valueChanges.subscribe((vehiclesListOptions: VehiclesListOptions) => this.onOptionsChange(vehiclesListOptions)));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private buildOptionsForm(): void {
        this.optionsForm = this.formBuilder.group({
            [DATA_OD_KEY]: [ this.activatedRoute.snapshot.queryParams[DATA_OD_KEY] ],
            [DATA_DO_KEY]: [ this.activatedRoute.snapshot.queryParams[DATA_DO_KEY] ],
            [TYP_DATY_KEY]: [ this.activatedRoute.snapshot.queryParams[TYP_DATY_KEY] ],
            [TYLKO_ZAREJESTROWANE_KEY]: [ this.activatedRoute.snapshot.queryParams[TYLKO_ZAREJESTROWANE_KEY] ],
        });
    }

    public onRegionSelect(region: string): void {
        if (this.optionsForm.valid) {
            this.resolveParams({
                [WOJEWODZTWO_KEY]: region,
                [PAGE_KEY]: 1,
                [LIMIT_KEY]: this.activatedRoute.snapshot.queryParams[LIMIT_KEY] || 10,
                [TYP_DATY_KEY]: this.activatedRoute.snapshot.queryParams[TYP_DATY_KEY] || VehicleQueryParamDate.PIERWSZA_REJESTRACJA_POJAZDU_W_POLSCE,
                [DATA_OD_KEY]: this.activatedRoute.snapshot.queryParams[DATA_OD_KEY] || this.timeService.yearsFromToday(),
                [DATA_DO_KEY]: this.activatedRoute.snapshot.queryParams[DATA_DO_KEY] || this.timeService.todayDate,
                [TYLKO_ZAREJESTROWANE_KEY]: this.activatedRoute.snapshot.queryParams[TYLKO_ZAREJESTROWANE_KEY] || true,
            });
        }
    }

    public onOptionsChange(vehiclesListOptions: VehiclesListOptions): void {
        if (this.optionsForm.valid) {
            this.resolveParams({
                ...vehiclesListOptions,
            });
        }
    }
}
