import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MODAL_DATA } from 'src/app/shared/constants/injection-tokens';
import { VehicleDetails } from 'src/app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'cpk-vehicle-card',
    templateUrl: './vehicle-card.component.html',
    styleUrls: [ './vehicle-card.component.scss' ],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class VehicleCardComponent {

    public readonly isMotorcycle = this.details['rodzaj-pojazdu'].toLowerCase() === 'motocykl';
    public readonly activeTabId$ = new BehaviorSubject<number>(0);
    public readonly tabs = [
        {
            id: 0,
            title: 'Podstawowe',
        },
        {
            id: 1,
            title: 'Silnik',
        },
        {
            id: 2,
            title: 'Emisja spalin'
        },
        {
            id: 3,
            title: 'Masa',
        },
        {
            id: 4,
            title: 'Rejestracja',
        },
        {
            id: 5,
            title: 'Właściciel',
        },
        {
            id: 6,
            title: 'Daty',
        },
        {
            id: 7,
            title: 'Pozostałe',
        },
    ];

    constructor(
        @Inject(MODAL_DATA) public readonly details: VehicleDetails,
    ) {
    }

    public selectTab(id: number): void {
        this.activeTabId$.next(id);
    }
}
