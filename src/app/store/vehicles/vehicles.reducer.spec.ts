import { initialVehiclesState, vehiclesReducer, VehiclesState } from 'src/app/store/vehicles/vehicles.reducer';
import { ADD_ONE_VEHICLE, UPSERT_MANY_VEHICLES } from 'src/app/store/vehicles/vehicles.actions';

const mockedVehicleDetails1 = {
    marka: 'marka 1',
    model: 'model 1',
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
};

const mockedVehicleDetails2 = {
    marka: 'marka 2',
    model: 'model 2',
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
};

describe(vehiclesReducer.name, () => {

    describe(ADD_ONE_VEHICLE.type, () => {
        it('should add vehicle item into store', () => {
            const action = ADD_ONE_VEHICLE({
                vehicle: {
                    id: 'sample-id-1',
                    type: 'vehicle type 1',
                    links: {
                        self: 'self link',
                    },
                    attributes: mockedVehicleDetails1,
                },
            });

            const state = vehiclesReducer(initialVehiclesState, action);
            const expectedState: VehiclesState = {
                ids: [ 'sample-id-1' ],
                entities: {
                    'sample-id-1': {
                        id: 'sample-id-1',
                        type: 'vehicle type 1',
                        links: {
                            self: 'self link',
                        },
                        attributes: mockedVehicleDetails1,
                    },
                },
            };

            expect(state).toEqual(expectedState);
        });
    });

    describe(UPSERT_MANY_VEHICLES.type, () => {
        it('should upsert many vehicles in store', () => {
            const action = UPSERT_MANY_VEHICLES({
                vehicles: [
                    {
                        id: 'sample-id-1',
                        type: 'vehicle type 1',
                        links: {
                            self: 'self link',
                        },
                        attributes: mockedVehicleDetails1,
                    },
                    {
                        id: 'sample-id-2',
                        type: 'vehicle type 2',
                        links: {
                            self: 'self link',
                        },
                        attributes: mockedVehicleDetails2,
                    },
                ],
            });

            const state = vehiclesReducer(initialVehiclesState, action);
            const expectedState: VehiclesState = {
                ids: [ 'sample-id-1', 'sample-id-2' ],
                entities: {
                    'sample-id-1': {
                        id: 'sample-id-1',
                        type: 'vehicle type 1',
                        links: {
                            self: 'self link',
                        },
                        attributes: mockedVehicleDetails1,
                    },
                    'sample-id-2': {
                        id: 'sample-id-2',
                        type: 'vehicle type 2',
                        links: {
                            self: 'self link',
                        },
                        attributes: mockedVehicleDetails2,
                    },
                },
            };

            expect(state).toEqual(expectedState);
        });
    });
});
