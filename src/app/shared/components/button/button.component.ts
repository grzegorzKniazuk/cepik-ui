import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'cpk-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {

    @Input() public readonly type: string;
    @Input() public readonly size: string;
    @Input() public readonly outline: boolean;
    public isDisabled: boolean;
    @ViewChild('button', { static: true }) private readonly button: ElementRef;

    constructor(
        private readonly renderer2: Renderer2,
    ) {
    }

    @Input()
    public set disabled(disabled: boolean) {
        this.isDisabled = disabled;

        if (disabled) {
            this.renderer2.addClass(this.button.nativeElement, `disabled`);
            this.renderer2.setAttribute(this.button.nativeElement, 'title', 'Akcja niedostępna');
        } else {
            this.renderer2.removeClass(this.button.nativeElement, 'disabled');
            this.renderer2.removeAttribute(this.button.nativeElement, 'title');
        }
    }

    ngOnInit() {
        if (this.type) {
            if (this.outline) {
                this.renderer2.addClass(this.button.nativeElement, `btn-outline-${this.type}`);
            } else {
                this.renderer2.addClass(this.button.nativeElement, `btn-${this.type}`);
            }
        }

        if (this.size) {
            this.renderer2.addClass(this.button.nativeElement, `btn-${this.size}`);
        }
    }
}
