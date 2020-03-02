import { VehiclesEffects } from 'src/app/store/vehicles/vehicles.effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { VersionEffects } from 'src/app/store/version/version.effects';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ModalService, VehicleService } from 'src/app/shared/services';
import { VehicleCardComponent } from 'src/app/views';
import { VehicleDetails } from 'src/app/shared/interfaces';

describe(VehiclesEffects.name, () => {

    let actions$: Observable<Action>;
    let effects: VersionEffects;
    let testScheduler: TestScheduler;

    let vehicleServiceSpy: jasmine.SpyObj<VehicleService>;
    let modalServiceSpy: jasmine.SpyObj<ModalService<VehicleCardComponent, VehicleDetails>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VehiclesEffects,
                provideMockActions(() => actions$),
                {
                    provide: VehicleService,
                    useValue: {
                        getVehicle: jasmine.createSpy(),
                    },
                },
                {
                    provide: ModalService,
                    useValue: {
                        open: jasmine.createSpy(),
                    },
                },
            ],
        });

        effects = TestBed.inject(VehiclesEffects);
        vehicleServiceSpy = TestBed.inject(VehicleService as any);
        modalServiceSpy = TestBed.inject(ModalService as any);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    describe('showVehicleCard$', () => {
        testScheduler.run(({ cold, hot, expectObservable }) => {
            actions$ = hot('-a');
        });
    });
});
