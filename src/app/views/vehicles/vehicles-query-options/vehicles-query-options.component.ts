import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DATA_DO_KEY, DATA_OD_KEY, TYLKO_ZAREJESTROWANE_KEY, TYP_DATY_KEY } from 'src/app/shared/constants';
import { dateRangeValidator } from 'src/app/shared/validators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleQueryParamDate } from 'src/app/shared/enums';
import { BaseComponent } from 'src/app/views/base.component';
import { ModalService } from 'src/app/shared/services';

@Component({
    selector: 'cpk-vehicles-query-options',
    templateUrl: './vehicles-query-options.component.html',
    styleUrls: [ './vehicles-query-options.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesQueryOptionsComponent extends BaseComponent implements OnInit {

    public readonly dateTypeDataset = [
        { key: 'Data pierwszej rejestracji pojazdu w Polsce', value: VehicleQueryParamDate.PIERWSZA_REJESTRACJA_POJAZDU_W_POLSCE },
        { key: 'Data ostatniej rejestracji pojazdu', value: VehicleQueryParamDate.OSTATNIA_REJESTRACJA_POJAZDU },
    ];

    public optionsForm: FormGroup;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly modalService: ModalService<VehiclesQueryOptionsComponent>,
    ) {
        super(activatedRoute, router);
    }

    ngOnInit() {
        this.buildOptionsForm();
    }

    private buildOptionsForm(): void {
        this.optionsForm = this.formBuilder.group({
            [DATA_OD_KEY]: [ this.activatedRoute.snapshot.queryParams[DATA_OD_KEY] ],
            [DATA_DO_KEY]: [ this.activatedRoute.snapshot.queryParams[DATA_DO_KEY] ],
            [TYP_DATY_KEY]: [ this.activatedRoute.snapshot.queryParams[TYP_DATY_KEY] ],
            [TYLKO_ZAREJESTROWANE_KEY]: [ this.activatedRoute.snapshot.queryParams[TYLKO_ZAREJESTROWANE_KEY] ],
        }, {
            validators: [ dateRangeValidator(DATA_OD_KEY, DATA_DO_KEY, 2) ],
        });
    }

    public onQuerySubmit(): void {
        if (this.optionsForm.valid) {
            this.modalService.close();

            this.resolveParams({
                ...this.optionsForm.value,
            });
        }
    }
}
