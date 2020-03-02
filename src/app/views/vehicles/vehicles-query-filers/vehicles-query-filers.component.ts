import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/views/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/shared/services';
import { DictionaryItem } from 'src/app/shared/interfaces';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectRouteData } from 'src/app/store/router/router.selectors';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FILTER_MARKA_KEY, FILTER_MODEL_KEY, FILTER_POCHODZENIE_POJAZDU_KEY, FILTER_PRZEZNACZENIE_POJAZDU_KEY, FILTER_REJESTRACJA_GMINA_KEY, FILTER_REJESTRACJA_POWIAT_KEY, FILTER_RODZAJ_PALIWA_KEY, FILTER_RODZAJ_POJAZDU_KEY } from 'src/app/shared/constants';

@Component({
    selector: 'cpk-vehicles-query-filers',
    templateUrl: './vehicles-query-filers.component.html',
    styleUrls: [ './vehicles-query-filers.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesQueryFilersComponent extends BaseComponent implements OnInit, OnDestroy {

    public readonly brands$: Observable<DictionaryItem[]> = this.store.pipe(select(selectRouteData), pluck('brands'));
    public readonly vehicleTypes$: Observable<DictionaryItem[]> = this.store.pipe(select(selectRouteData), pluck('vehicleTypes'));
    public readonly fuelTypes$: Observable<DictionaryItem[]> = this.store.pipe(select(selectRouteData), pluck('fuelTypes'));
    public readonly origin$: Observable<DictionaryItem[]> = this.store.pipe(select(selectRouteData), pluck('origin'));
    public filersForm: FormGroup;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        private readonly store: Store<AppState>,
        private readonly formBuilder: FormBuilder,
        private readonly modalService: ModalService<VehiclesQueryFilersComponent>,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
        super(activatedRoute, router);
    }

    ngOnInit() {
        this.buildForm();
        this.subscriptions$.add(this.filersForm.valueChanges.subscribe(() => this.changeDetectorRef.detectChanges()));
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    @HostListener('document:keyup.enter')
    public onFilterSubmit(): void {
        if (this.filersForm.valid) {
            this.modalService.close();

            this.resolveParams({
                page: 1,
                ...this.filersForm.value,
            });
        }
    }

    public onFilterReset(): void {
        this.modalService.close();

        this.resolveParams({
            page: 1,
            [FILTER_MARKA_KEY]: null,
            [FILTER_MODEL_KEY]: null,
            [FILTER_RODZAJ_POJAZDU_KEY]: null,
            [FILTER_RODZAJ_PALIWA_KEY]: null,
            [FILTER_POCHODZENIE_POJAZDU_KEY]: null,
            [FILTER_PRZEZNACZENIE_POJAZDU_KEY]: null,
            [FILTER_REJESTRACJA_POWIAT_KEY]: null,
            [FILTER_REJESTRACJA_GMINA_KEY]: null,
        });
    }

    private buildForm(): void {
        this.filersForm = this.formBuilder.group({
            [FILTER_MARKA_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_MARKA_KEY] ],
            [FILTER_MODEL_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_MODEL_KEY] ],
            [FILTER_RODZAJ_POJAZDU_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_RODZAJ_POJAZDU_KEY] ],
            [FILTER_RODZAJ_PALIWA_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_RODZAJ_PALIWA_KEY] ],
            [FILTER_POCHODZENIE_POJAZDU_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_POCHODZENIE_POJAZDU_KEY] ],
            [FILTER_PRZEZNACZENIE_POJAZDU_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_PRZEZNACZENIE_POJAZDU_KEY] ],
            [FILTER_REJESTRACJA_POWIAT_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_REJESTRACJA_POWIAT_KEY] ],
            [FILTER_REJESTRACJA_GMINA_KEY]: [ this.activatedRoute.snapshot.queryParams[FILTER_REJESTRACJA_GMINA_KEY] ],
        });
    }
}
