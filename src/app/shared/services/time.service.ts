import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class TimeService {
    public get todayDate(): string {
        return moment().format('YYYYMMDD');
    }

    public yearsFromToday(years = 2): string {
        return moment().add(-years, 'year').format('YYYYMMDD');
    }
}
