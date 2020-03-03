import { VehiclesEffects } from 'src/app/store/vehicles/vehicles.effects';
import { Observable } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { TestScheduler } from 'rxjs/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ModalService, VehicleService } from 'src/app/shared/services';
import { DICTIONARIES_FEATURE_KEY, LOADER_FEATURE_KEY, PAGINATION_LINKS_FEATURE_KEY, ROUTER_FEATURE_KEY, VEHICLES_FEATURE_KEY, VERSION_FEATURE_KEY } from 'src/app/store/feature-names';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AppState } from 'src/app/store/index';
import { selectVehicleDetails } from 'src/app/store/vehicles/vehicles.selectors';
import { ModalComponent } from 'src/app/shared/components';
import { VehicleDetails } from 'src/app/shared/interfaces';

const mockedVehicle1 = {
    id: 'sample-id-1',
    type: 'type',
    links: {
        self: '',
    },
    attributes: {
        marka: 'value 1',
        model: 'value 1',
        'rodzaj-pojazdu': 'value',
        'kategoria-pojazdu': 'value',
        typ: 'value',
        wariant: 'value',
        'pochodzenie-pojazdu': 'value',
        'rok-produkcji': 'value',
        'data-pierwszej-rejestracji-w-kraju': 'value',
        'pojemnosc-skokowa-silnika': 1,
        'masa-wlasna': 1000,
        'rodzaj-paliwa': 'value',
        'wojewodztwo-kod': 'value',
        wersja: 'value',
        'podrodzaj-pojazdu': 'value',
        'przeznaczenie-pojazdu': 'value',
        'rodzaj-tabliczki-znamionowej': 'value',
        'sposob-produkcji': 'value',
        'data-ostatniej-rejestracji-w-kraju': 'value',
        'data-rejestracji-za-granica': 'value',
        'stosunek-mocy-silnika-do-masy-wlasnej-motocykle': 1,
        'moc-netto-silnika': 1,
        'moc-netto-silnika-hybrydowego': 1,
        'masa-pojazdu-gotowego-do-jazdy': 1,
        'dopuszczalna-masa-calkowita': 1,
        'max-masa-calkowita': 1,
        'dopuszczalna-ladownosc': 1,
        'max-ladownosc': 1,
        'dopuszczalna-masa-calkowita-zespolu-pojazdow': 1,
        'liczba-osi': 1,
        'dopuszczalny-nacisk-osi': 1,
        'maksymalny-nacisk-osi': 1,
        'max-masa-calkowita-przyczepy-z-hamulcem': 1,
        'max-masa-calkowita-przyczepy-bez-hamulca': 1,
        'liczba-miejsc-ogolem': 1,
        'liczba-miejsc-siedzacych': 1,
        'liczba-miejsc-stojacych': 1,
        'rodzaj-pierwszego-paliwa-alternatywnego': 'value',
        'rodzaj-drugiego-paliwa-alternatywnego': 'value',
        'srednie-zuzycie-paliwa': 1,
        'poziom-emisji-co2': 1,
        'rodzaj-zawieszenia': 'value',
        'wyposazenie-i-rodzaj-urzadzenia-radarowego': 'value',
        hak: true,
        'kierownica-po-prawej-stronie': true,
        'kierownica-po-prawej-stronie-pierwotnie': true,
        'katalizator-pochlaniacz': true,
        'nazwa-producenta': 'value',
        'kod-instytutu-transaportu-samochodowego': 'value',
        'rozstaw-kol-osi-kierowanej-pozostalych-osi': 'value',
        'max-rozstaw-kol': 1,
        'avg-rozstaw-kol': 1,
        'min-rozstaw-kol': 1,
        'redukcja-emisji-spalin': 1,
        'data-pierwszej-rejestracji': 'value',
        'rodzaj-kodowania-rodzaj-podrodzaj-przeznaczenie': 'value',
        'kod-rodzaj-podrodzaj-przeznaczenie': 'value',
        'data-wyrejestrowania-pojazdu': 'value',
        'przyczyna-wyrejestrowania-pojazdu': 'value',
        'data-wprowadzenia-danych': 'value',
        'rejestracja-wojewodztwo': 'value',
        'rejestracja-powiat': 'value',
        'rejestracja-gmina': 'value',
        'wlasciciel-wojewodztwo': 'value',
        'wlasciciel-powiat': 'value',
        'wlasciciel-gmina': 'value',
        'wlasciciel-wojewodztwo-kod': 'value',
        'poziom-emisji-co2-paliwo-alternatywne-1': 1,
    },
};

const mockedVehicle2 = {
    id: 'sample-id-2',
    type: 'type',
    links: {
        self: '',
    },
    attributes: {
        marka: 'value 2',
        model: 'value 2',
        'rodzaj-pojazdu': 'value',
        'kategoria-pojazdu': 'value',
        typ: 'value',
        wariant: 'value',
        'pochodzenie-pojazdu': 'value',
        'rok-produkcji': 'value',
        'data-pierwszej-rejestracji-w-kraju': 'value',
        'pojemnosc-skokowa-silnika': 1,
        'masa-wlasna': 1000,
        'rodzaj-paliwa': 'value',
        'wojewodztwo-kod': 'value',
        wersja: 'value',
        'podrodzaj-pojazdu': 'value',
        'przeznaczenie-pojazdu': 'value',
        'rodzaj-tabliczki-znamionowej': 'value',
        'sposob-produkcji': 'value',
        'data-ostatniej-rejestracji-w-kraju': 'value',
        'data-rejestracji-za-granica': 'value',
        'stosunek-mocy-silnika-do-masy-wlasnej-motocykle': 1,
        'moc-netto-silnika': 1,
        'moc-netto-silnika-hybrydowego': 1,
        'masa-pojazdu-gotowego-do-jazdy': 1,
        'dopuszczalna-masa-calkowita': 1,
        'max-masa-calkowita': 1,
        'dopuszczalna-ladownosc': 1,
        'max-ladownosc': 1,
        'dopuszczalna-masa-calkowita-zespolu-pojazdow': 1,
        'liczba-osi': 1,
        'dopuszczalny-nacisk-osi': 1,
        'maksymalny-nacisk-osi': 1,
        'max-masa-calkowita-przyczepy-z-hamulcem': 1,
        'max-masa-calkowita-przyczepy-bez-hamulca': 1,
        'liczba-miejsc-ogolem': 1,
        'liczba-miejsc-siedzacych': 1,
        'liczba-miejsc-stojacych': 1,
        'rodzaj-pierwszego-paliwa-alternatywnego': 'value',
        'rodzaj-drugiego-paliwa-alternatywnego': 'value',
        'srednie-zuzycie-paliwa': 1,
        'poziom-emisji-co2': 1,
        'rodzaj-zawieszenia': 'value',
        'wyposazenie-i-rodzaj-urzadzenia-radarowego': 'value',
        hak: true,
        'kierownica-po-prawej-stronie': true,
        'kierownica-po-prawej-stronie-pierwotnie': true,
        'katalizator-pochlaniacz': true,
        'nazwa-producenta': 'value',
        'kod-instytutu-transaportu-samochodowego': 'value',
        'rozstaw-kol-osi-kierowanej-pozostalych-osi': 'value',
        'max-rozstaw-kol': 1,
        'avg-rozstaw-kol': 1,
        'min-rozstaw-kol': 1,
        'redukcja-emisji-spalin': 1,
        'data-pierwszej-rejestracji': 'value',
        'rodzaj-kodowania-rodzaj-podrodzaj-przeznaczenie': 'value',
        'kod-rodzaj-podrodzaj-przeznaczenie': 'value',
        'data-wyrejestrowania-pojazdu': 'value',
        'przyczyna-wyrejestrowania-pojazdu': 'value',
        'data-wprowadzenia-danych': 'value',
        'rejestracja-wojewodztwo': 'value',
        'rejestracja-powiat': 'value',
        'rejestracja-gmina': 'value',
        'wlasciciel-wojewodztwo': 'value',
        'wlasciciel-powiat': 'value',
        'wlasciciel-gmina': 'value',
        'wlasciciel-wojewodztwo-kod': 'value',
        'poziom-emisji-co2-paliwo-alternatywne-1': 1,
    },
};

describe(VehiclesEffects.name, () => {

    let actions$: Observable<Action>;
    let effects: VehiclesEffects;

    let vehicleServiceSpy: jasmine.SpyObj<VehicleService>;
    let modalServiceSpy: jasmine.SpyObj<ModalService<ModalComponent, VehicleDetails>>;

    let mockStore: MockStore<AppState>;

    let testScheduler: TestScheduler;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VehiclesEffects,
                provideMockActions(() => actions$),
                provideMockStore<AppState>({
                    initialState: {
                        [ROUTER_FEATURE_KEY]: null,
                        [DICTIONARIES_FEATURE_KEY]: null,
                        [VEHICLES_FEATURE_KEY]: {
                            ids: [ 'sample-id-2' ],
                            entities: {
                                'sample-id-2': mockedVehicle2,
                            },
                        },
                        [LOADER_FEATURE_KEY]: null,
                        [VERSION_FEATURE_KEY]: null,
                        [PAGINATION_LINKS_FEATURE_KEY]: null,
                    },
                }),
                {
                    provide: VehicleService,
                    useValue: {
                        getVehicle: jasmine.createSpy('getVehicle'),
                    },
                },
                {
                    provide: ModalService,
                    useValue: {
                        open: jasmine.createSpy('open'),
                    },
                },
            ],
        });
    });

    beforeEach(() => {
        effects = TestBed.inject(VehiclesEffects);
        vehicleServiceSpy = TestBed.inject(VehicleService as any);
        modalServiceSpy = TestBed.inject(ModalService as any);

        mockStore = TestBed.inject(Store as any);
        mockStore.refreshState();

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    describe('showVehicleCard$', () => {
        it('should get vehicle details from api if requested data not exists in store', async () => {
            testScheduler.run(({ cold, hot, expectObservable }) => {

                mockStore.overrideSelector(selectVehicleDetails, null);

                vehicleServiceSpy.getVehicle.and.returnValue(cold('--a|', {
                    a: {
                        meta: {
                            count: 0,
                            'json-ld-id': '',
                            schema: '',
                            'dc:title': '',
                            'schema:provider': '',
                            'dc:description': '',
                            'dc:language': '',
                            'sy:updatePeriod': '',
                            'sy:updateFrequency': '',
                            'sy:updateBase': '',
                            'schema:contentType': '',
                            'schema:isPartOf': '',
                            'dc:rights': '',
                            'schema:keywords': '',
                        },
                        links: {},
                        data: mockedVehicle1,
                    },
                }));

                modalServiceSpy.open.and.callFake(() => {});

                actions$ = hot('-a', {
                    a: {
                        type: `[${VEHICLES_FEATURE_KEY.toUpperCase()}] SHOW_VEHICLE_CARD`,
                        id: 'sample-id-1',
                    },
                });

                expectObservable(effects.showVehicleCard$).toBe('---r', {
                    r: mockedVehicle1.attributes,
                });
            });
        });

        it('should get vehicle details from store if requested data exists in store', async () => {
            testScheduler.run(({ hot, expectObservable }) => {

                mockStore.overrideSelector(selectVehicleDetails, mockedVehicle1.attributes);

                actions$ = hot('-a', {
                    a: {
                        type: `[${VEHICLES_FEATURE_KEY.toUpperCase()}] SHOW_VEHICLE_CARD`,
                        id: 'sample-id-1',
                    },
                });

                expectObservable(effects.showVehicleCard$).toBe('-r', {
                    r: mockedVehicle1.attributes,
                });
            });
        });
    });
});
