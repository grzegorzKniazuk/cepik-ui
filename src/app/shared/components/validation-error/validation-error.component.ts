import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
    selector: 'cpk-validation-error',
    templateUrl: './validation-error.component.html',
    styleUrls: [ './validation-error.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorComponent {

    @Input() public readonly errors: ValidationErrors;

    public readonly errorMessages: { [key: string]: string } = {
        invalidRange: 'Zakres dat nie może być większy niż 2 lata',
    };
}
