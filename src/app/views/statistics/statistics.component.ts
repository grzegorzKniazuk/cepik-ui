import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectDrivingLicensesStatistics } from 'src/app/store/statistics/driving-license/driving-licenses-statistics.selectors';
import { selectPermissionsStatistics } from 'src/app/store/statistics/permissions/permissions-statistics.selector';

@Component({
    selector: 'cpk-statistics',
    templateUrl: './statistics.component.html',
    styleUrls: [ './statistics.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {

    public readonly drivingLicensesStatistics$ = this.store.pipe(select(selectDrivingLicensesStatistics));
    public readonly permissionsStatistics$ = this.store.pipe(select(selectPermissionsStatistics));

    constructor(
        private readonly store: Store<AppState>,
    ) {
        this.drivingLicensesStatistics$.subscribe(console.log);
        this.permissionsStatistics$.subscribe(console.log);
    }
}
