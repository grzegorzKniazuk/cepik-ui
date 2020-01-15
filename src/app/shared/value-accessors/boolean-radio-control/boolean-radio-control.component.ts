import { Component } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BaseValueAccessor } from 'src/app/shared/value-accessors/base-value-accessor';

@Component({
    selector: 'cpk-boolean-radio-control',
    templateUrl: './boolean-radio-control.component.html',
    styleUrls: [ './boolean-radio-control.component.scss' ],
})
export class BooleanRadioControlComponent extends BaseValueAccessor<boolean> implements ControlValueAccessor {
}
