import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class TimeService {

    public static isSameOrBefore(date: string, compareTo: string): boolean {
        return moment(date).isSameOrBefore(compareTo);
    }

    public static isSameOrAfter(date: string, compareTo: string): boolean {
        return moment(date).isSameOrAfter(compareTo);
    }

    public static get todayDate(): string {
        return moment().format('YYYYMMDD');
    }

    public static yearsFromToday(years: number): string {
        return moment().add(-years, 'year').format('YYYYMMDD');
    }

    public static yearsBackFromDate(date: string, years = 2): string {
        return moment(date).add(-years, 'year').format('YYYYMMDD');
    }

    public static yearsAheadFromDate(date: string, years = 2): string {
        return moment(date).add(years, 'year').format('YYYYMMDD');
    }

    public get todayDate(): string {
        return TimeService.todayDate;
    }

    public yearsBackFromToday(years: number): string {
        return TimeService.yearsFromToday(years);
    }
}
