import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'cpk-boolean-radio-control',
    templateUrl: './boolean-radio-control.component.html',
    styleUrls: [ './boolean-radio-control.component.scss' ],
})
export class BooleanRadioControlComponent implements ControlValueAccessor {

    @Input() public readonly label: string;
    @Input() public set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    public _disabled: boolean;
    public _value: boolean;

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

    public setValue(value: boolean): void {
        if (this.ngControl.enabled) {
            this.writeValue(value);
        }
    }

    public writeValue(value: boolean): void {
        this._value = value;
        this.propagateChange(this._value);
        this.propagateTouch();
    }
}
