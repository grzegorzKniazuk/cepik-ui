export interface VehicleBase {
    marka: string;
    model: string;
    'rodzaj-pojazdu': string;
    'kategoria-pojazdu': string;
    typ: string;
    wariant: string;
    'pochodzenie-pojazdu': string;
    'rok-produkcji': string;
    'data-pierwszej-rejestracji-w-kraju': string;
    'pojemnosc-skokowa-silnika'?: number;
    'masa-wlasna': number;
    'rodzaj-paliwa': string;
    'wojewodztwo-kod': string;
}
