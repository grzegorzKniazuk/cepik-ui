import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
    selector: 'cpk-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {

    @ViewChild('button', { static: true }) private readonly button: ElementRef;
    @Input() public readonly type: string;
    @Input() public readonly size: string;
    @Input() public readonly outline: boolean;
    @Input() public readonly disabled: boolean;

    constructor(
        private readonly renderer2: Renderer2,
    ) {
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
