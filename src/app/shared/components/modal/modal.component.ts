import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { MODAL_OPTIONS } from 'src/app/shared/constants/injection-tokens';
import { ModalOptions } from 'src/app/shared/interfaces';

@Component({
    selector: 'cpk-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {

    public readonly close$ = new EventEmitter<void>();
    public readonly title = this.modalOptions.title;

    constructor(
        @Inject(MODAL_OPTIONS) private readonly modalOptions: ModalOptions,
    ) {
    }

    public modalContainerClick(): void {
        if (this.modalOptions.closeOnBackdropClick) {
            this.close();
        }
    }

    public modalBodyClick($event: Event): void {
        $event.stopPropagation();
    }

    public close(): void {
        this.close$.emit();
    }
}
