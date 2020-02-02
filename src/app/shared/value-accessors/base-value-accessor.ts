import { ControlValueAccessor, NgControl, ValidationErrors } from '@angular/forms';
import { Input, Optional, Renderer2, Self } from '@angular/core';
import { UuidService } from 'src/app/shared/services';

export abstract class BaseValueAccessor<T> implements ControlValueAccessor {
    @Input() public readonly label: string;
    public _value: T;

    protected constructor(
        @Self() @Optional() protected readonly ngControl: NgControl,
        protected readonly renderer2: Renderer2,
        protected readonly uuidService: UuidService,
    ) {
        this.ngControl.valueAccessor = this;
    }

    public _disabled: boolean;

    @Input()
    public set disabled(disabled: boolean) {
        this._disabled = disabled;
    }

    public get errors(): ValidationErrors | null {
        return this.ngControl ? this.ngControl.errors : null;
    }

    public propagateChange: any = () => {
    };

    public propagateTouch: any = () => {
    };

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
