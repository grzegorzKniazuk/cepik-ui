import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MODAL_DATA } from 'src/app/shared/constants';
import { VehicleDetails } from 'src/app/shared/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'cpk-vehicle-card',
    templateUrl: './vehicle-card.component.html',
    styleUrls: [ './vehicle-card.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
            title: 'Emisja spalin',
        },
        {
            id: 3,
            title: 'Zawieszenie',
        },
        {
            id: 4,
            title: 'Układ kierowniczy',
        },
        {
            id: 5,
            title: 'Właściciel',
        },
        {
            id: 6,
            title: 'Rejestracja',
        },
        {
            id: 7,
            title: 'Wyrejestrowanie',
        },
        {
            id: 8,
            title: 'Daty',
        },
        {
            id: 9,
            title: 'Pozostałe',
        },
    ];

    constructor(
        @Inject(MODAL_DATA) public readonly details: VehicleDetails,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    public selectTab(id: number): void {
        this.activeTabId$.next(id);
        this.changeDetectorRef.detectChanges();
    }
}
