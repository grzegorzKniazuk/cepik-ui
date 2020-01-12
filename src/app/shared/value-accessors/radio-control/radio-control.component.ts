import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'cpk-radio-control',
    templateUrl: './radio-control.component.html',
    styleUrls: [ './radio-control.component.scss' ],
})
export class RadioControlComponent implements ControlValueAccessor {

    @Input() public readonly optionValueName: string;
    @Input() public readonly optionKeyName: string;
    @Input() public readonly dataset: any[] = [];
    @Input() public readonly label: string;
    @Input() public set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    public _disabled: boolean;
    public _value: string;

    public propagateChange: any = () => {
    };
    public propagateTouch: any = () => {
    };

    constructor(
        @Self() @Optional() private readonly ngControl: NgControl,
    ) {
        ngControl.valueAccessor = this;
    }

    public registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    public registerOnTouched(fn: any): void {
        this.propagateTouch = fn;
    }

    public setDisabledState(disabled: boolean): void {
        this._disabled = disabled;
    }

    public setValue(value: string): void {
        if (this.ngControl.enabled) {
            this.writeValue(value);
        }
    }

    public writeValue(value: string): void {
        this._value = value;
        this.propagateChange(this._value);
        this.propagateTouch();
    }
}
