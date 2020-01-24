import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/views/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MARKA_KEY } from 'src/app/shared/constants';
import { ModalService } from 'src/app/shared/services';

@Component({
    selector: 'cpk-vehicles-query-filers',
    templateUrl: './vehicles-query-filers.component.html',
    styleUrls: [ './vehicles-query-filers.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesQueryFilersComponent extends BaseComponent implements OnInit {

    public filersForm: FormGroup;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly modalService: ModalService<VehiclesQueryFilersComponent>,
    ) {
        super(activatedRoute, router);
    }

    ngOnInit() {
        this.buildForm();
    }

    private buildForm(): void {
        this.filersForm = this.formBuilder.group({
            [MARKA_KEY]: [ '' ],
        });
    }

    public onFilterSubmit(): void {
        if (this.filersForm.valid) {
            this.modalService.close();
        }
    }

    public onFilterReset(): void {

    }
}
