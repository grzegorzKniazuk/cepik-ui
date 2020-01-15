import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BaseValueAccessor } from 'src/app/shared/value-accessors/base-value-accessor';

@Component({
    selector: 'cpk-radio-control',
    templateUrl: './radio-control.component.html',
    styleUrls: [ './radio-control.component.scss' ],
})
export class RadioControlComponent extends BaseValueAccessor<string> implements ControlValueAccessor {

    @Input() public readonly optionValueName: string;
    @Input() public readonly optionKeyName: string;
    @Input() public readonly dataset: any[] = [];
}
