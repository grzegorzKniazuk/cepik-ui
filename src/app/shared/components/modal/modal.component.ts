import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MODAL_OPTIONS } from 'src/app/shared/constants/injection-tokens';
import { ModalOptions } from 'src/app/shared/interfaces';

@Component({
    selector: 'cpk-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {

    public readonly close$ = new EventEmitter<void>();

    constructor(
        @Inject(MODAL_OPTIONS) private readonly modalOptions: ModalOptions,
    ) {
    }

    ngOnInit() {
    }

    public closeOnBackdropClick(): void {
        if (this.modalOptions.closeOnBackdropClick) {
            // this.close();
        }
    }

    public close(): void {
        this.close$.emit();
    }
}
