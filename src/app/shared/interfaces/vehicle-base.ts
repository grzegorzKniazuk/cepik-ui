export interface VehicleBase {
    marka: string;
    'kategoria-pojazdu': string;
    typ: string;
    model: string;
    wariant: string;
    'rodzaj-pojazdu': string;
    'pochodzenie-pojazdu': string;
    'rok-produkcji': string;
    'data-pierwszej-rejestracji-w-kraju': string;
    'pojemnosc-skokowa-silnika'?: number;
    'masa-wlasna': number;
    'rodzaj-paliwa': string;
    'wojewodztwo-kod': string;
}
