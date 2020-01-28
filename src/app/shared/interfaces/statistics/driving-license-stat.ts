export interface DrivingLicenseStat {
    id?: string;
    'data-statystyki': string;
    'wojewodztwo-kod': string;
    'wojewodztwo-nazwa': string;
    plec: 'K' | 'M';
    wiek: string;
    ilosc: number;
}