import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Input, Optional, Self } from '@angular/core';

export abstract class BaseValueAccessor<T> implements ControlValueAccessor {
    @Input() public readonly label: string;
    @Input() public set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    public _disabled: boolean;
    public _value: T;

    public propagateChange: any = () => {
    };
    public propagateTouch: any = () => {
    };

    protected constructor(
        @Self() @Optional() protected readonly ngControl: NgControl,
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

    public setValue(value: T): void {
        if (this.ngControl.enabled) {
            this.writeValue(value);
        }
    }

    public writeValue(value: T): void {
        this._value = value;
        this.propagateChange(this._value);
        this.propagateTouch();
    }
}
