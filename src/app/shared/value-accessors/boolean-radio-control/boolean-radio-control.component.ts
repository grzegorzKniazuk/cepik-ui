import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BaseValueAccessor } from 'src/app/shared/value-accessors/base-value-accessor';

@Component({
    selector: 'cpk-boolean-radio-control',
    templateUrl: './boolean-radio-control.component.html',
    styleUrls: [ './boolean-radio-control.component.scss' ],
})
export class BooleanRadioControlComponent extends BaseValueAccessor<boolean> implements ControlValueAccessor {

    public writeValue(value: boolean | string): void {
        if (typeof value === 'boolean') {
            this._value = value;
        } else {
            this._value = value === 'true';
        }

        this.propagateChange(this._value);
        this.propagateTouch();
    }
}
