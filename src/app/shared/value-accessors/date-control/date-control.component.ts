import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BaseValueAccessor } from 'src/app/shared/value-accessors/base-value-accessor';

@Component({
    selector: 'cpk-date-control',
    templateUrl: './date-control.component.html',
    styleUrls: [ './date-control.component.scss' ],
})
export class DateControlComponent extends BaseValueAccessor<string> implements ControlValueAccessor {

    public writeValue(value: string | undefined): void {
        if (value) {
            this._value = value.replace(/-/g, '');
            this.propagateChange(this._value);
            this.propagateTouch();
        }
    }
}
