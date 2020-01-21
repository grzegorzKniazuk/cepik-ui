import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TimeService } from 'src/app/shared/services';

export function dateRangeValidator(dateFromControlName: string, dateToControlName: string, range: number): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {

        const dateFromValue = formGroup.value[dateFromControlName];
        const dateToValue = formGroup.value[dateToControlName];

        if (!dateFromValue || !dateToValue) {
            throw new Error('Nie znaleziono kontrolki daty o podanej nazwie');
        }

        if (dateFromValueValidity(dateFromValue, dateToValue, range) && dateToValueValidity(dateFromValue, dateToValue, range)) {
            if (formGroup.get(dateFromControlName).errors) {
                delete formGroup.get(dateFromControlName).errors['invalidRange'];
            }

            if (formGroup.get(dateToControlName).errors) {
                delete formGroup.get(dateToControlName).errors['invalidRange'];
            }

            return null;
        }

        formGroup.get(dateFromControlName).setErrors({ invalidRange: true });
        formGroup.get(dateToControlName).setErrors({ invalidRange: true });
    };
}

function dateFromValueValidity(dateFromValue: string, dateToValue: string, range: number): boolean {
    return TimeService.isSameOrBefore(dateFromValue, TimeService.yearsAheadFromDate(dateToValue, range)) && TimeService.isSameOrAfter(dateFromValue, TimeService.yearsBackFromDate(dateToValue, range));
}

function dateToValueValidity(dateFromValue: string, dateToValue: string, range: number): boolean {
    return TimeService.isSameOrBefore(dateToValue, TimeService.yearsAheadFromDate(dateFromValue, range)) && TimeService.isSameOrAfter(dateToValue, TimeService.yearsBackFromDate(dateFromValue, range));
}
