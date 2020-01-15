import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BaseValueAccessor } from 'src/app/shared/value-accessors/base-value-accessor';

@Component({
    selector: 'cpk-select-control',
    templateUrl: './select-control.component.html',
    styleUrls: [ './select-control.component.scss' ],
})
export class SelectControlComponent extends BaseValueAccessor<string> implements ControlValueAccessor {

    @Input() public readonly optionValueName: string;
    @Input() public readonly optionKeyName: string;
    @Input() public readonly dataset: any[] = [];
}
