import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { TOAST_OPTIONS } from 'src/app/shared/constants';
import { ToastOptions } from 'src/app/shared/interfaces';

@Component({
    selector: 'cpk-toast',
    templateUrl: './toast.component.html',
    styleUrls: [ './toast.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
    public readonly close$ = new EventEmitter<void>();

    constructor(
        @Inject(TOAST_OPTIONS) public readonly toastOptions: ToastOptions,
    ) {
    }

    public onClose(): void {
        this.close$.emit();
    }
}
