import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BaseValueAccessor } from 'src/app/shared/value-accessors/base-value-accessor';

@Component({
    selector: 'cpk-text-control',
    templateUrl: './text-control.component.html',
    styleUrls: [ './text-control.component.scss' ],
})
export class TextControlComponent extends BaseValueAccessor<string> implements AfterViewInit {
    @Input() public readonly dataList: { [key: string]: any }[] = [];
    @Input() public readonly valueKey: string;
    @Input() public readonly counterKey: string;

    @ViewChild('input') private readonly inputElement: ElementRef;
    @ViewChild('datalist') private readonly dataListElement: ElementRef;

    ngAfterViewInit() {
        this.setDataListId();
    }

    private setDataListId(): void {
        const uuid = this.uuidService.generate();

        this.renderer2.setAttribute(this.inputElement.nativeElement, 'list', uuid);
        this.renderer2.setAttribute(this.dataListElement.nativeElement, 'id', uuid);
    }

    public get isEmpty(): boolean {
        return !this._value || this._value.length === 0;
    }

    public onReset(): void {
        this.writeValue(null);
    }
}
