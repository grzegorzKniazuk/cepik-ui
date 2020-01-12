import { VehicleQueryParamDate } from 'src/app/shared/enums';

export interface VehicleListQueryParams {
    wojewodztwo: string; // Kod teryt województwa, w którym zarejestrowane jest auto lub, w przypadku wyrejestrowanych aut, było ostatnio zarejestrowane
    'data-od': string; // Wymagany parametr daty podawany w formacie YYYYMMDD. Określa datę początkową okresu pierwszej lub ostatniej rejestracji w kraju (domyślnie pierwszej), dla którego zostaną udostępnione informacje o pojazdach.
    'data-do': string; // Parametr daty podawany w formacie YYYYMMDD. Określa koniec okresu, dla którego pojazdy mają być zwrócone.
    'typ-daty': VehicleQueryParamDate; // // Parametr określający jakiej daty dotyczy warunek wyszukiwania określony parametrami data-od i data-do
    'tylko-zarejestrowane': string; // Parametr określający czy mają zostać zwrócone dane tylko pojazdów zarejestrowanych.
    'pokaz-wszystkie-pola': string; // Parametr określający czy mają zostać zwrócone wszystkie pola w zwróconych danych technicznych pojazdów.
    limit: string; // Parametr mechanizmu stronicowania określający ilość wyników na stronie.
    page: string; // Parametr mechanizmu stronicowania określający, którą stronę wyników chce pobrać użytkownik.
    sort?: string[]; // Parametr mechanizmu sortowania. Jako wartość przyjmuje nazwy atrybutów rozdzielone przecinkiem.
}
