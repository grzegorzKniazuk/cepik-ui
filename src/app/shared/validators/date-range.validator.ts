import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { TimeService } from 'src/app/shared/services/time.service';

export function dateRangeValidator(dateFromControlName: string, dateToControlName: string, range: number): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {

        const dateFromValue = formGroup.value[dateFromControlName];
        const dateToValue = formGroup.value[dateToControlName];

        if (!formGroup.value.hasOwnProperty(dateFromControlName) || !formGroup.value.hasOwnProperty(dateToControlName)) {
            throw new Error('Nie znaleziono kontrolki daty o podanej nazwie');
        }

        if (dateFromValueValidity(dateFromValue, dateToValue, range) && dateToValueValidity(dateFromValue, dateToValue, range)) {
            return null;
        }

        return {
            invalidRange: true,
        };
    };
}

function dateFromValueValidity(dateFromValue: string, dateToValue: string, range: number): boolean {
    return TimeService.isSameOrBefore(dateFromValue, TimeService.yearsAheadFromDate(dateToValue, range))
        && TimeService.isSameOrAfter(dateFromValue, TimeService.yearsBackFromDate(dateToValue, range));
}

function dateToValueValidity(dateFromValue: string, dateToValue: string, range: number): boolean {
    return TimeService.isSameOrBefore(dateToValue, TimeService.yearsAheadFromDate(dateFromValue, range))
        && TimeService.isSameOrAfter(dateToValue, TimeService.yearsBackFromDate(dateFromValue, range));
}
