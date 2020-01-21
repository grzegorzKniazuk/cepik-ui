import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';
import { Input, Optional, Self } from '@angular/core';

export abstract class BaseValueAccessor<T> implements ControlValueAccessor {
    @Input() public readonly label: string;

    @Input()
    public set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    public _disabled: boolean;
    public _value: T;

    public readonly validationMessages: ValidationErrors = {
        invalidRange: 'Zakres dat nie może być większy niż 2 lata',
    };

    public propagateChange: any = () => {
    };
    public propagateTouch: any = () => {
    };

    protected constructor(
        @Self() @Optional() protected readonly ngControl: NgControl,
    ) {
        this.ngControl.valueAccessor = this;
    }

    public get invalid(): boolean {
        return this.ngControl ? this.ngControl.invalid : false;
    }

    public get errors(): ValidationErrors | null {
        return this.ngControl ? this.ngControl.errors : null;
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
