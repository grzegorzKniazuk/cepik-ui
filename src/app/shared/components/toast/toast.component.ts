import { ChangeDetectionStrategy, Component, EventEmitter, Inject } from '@angular/core';
import { TOAST_OPTIONS } from 'src/app/shared/constants/injection-tokens';
import { ToastOptions } from 'src/app/shared/interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'cpk-toast',
    templateUrl: './toast.component.html',
    styleUrls: [ './toast.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('toast', [
            state('in', style({ opacity: 1 })),
            transition(':enter', [
                style({ opacity: 0 }),
                animate(150),
            ]),
            transition(':leave',
                animate(150, style({ opacity: 0 }))),
        ]),
    ],
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
