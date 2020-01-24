import { VehicleBase } from 'src/app/shared/interfaces/vehicle-base';

export interface VehicleDetails extends VehicleBase {
    wersja: string; // Wersja pojazdu
    'podrodzaj-pojazdu': string; // Podrodzaj pojazdu
    'przeznaczenie-pojazdu': string; // Przeznaczenie pojazdu
    'rodzaj-tabliczki-znamionowej': string; // Rodzaj tabliczki znamionowej
    'sposob-produkcji': string; // Sposób produkcji
    'data-ostatniej-rejestracji-w-kraju': string; // Data pierwszej rejestracji
    'data-rejestracji-za-granica': string; // Data rejestracji za granicą
    'stosunek-mocy-silnika-do-masy-wlasnej-motocykle': number; // Stosunek maksymalnej mocy netto silnika do masy własnej (dotyczy tylko motocykli)
    'moc-netto-silnika': number; // Moc netto silnika
    'moc-netto-silnika-hybrydowego': number; // Maksymalna moc netto silnika (silników) pojazdu hybrydowego, jeżeli dotyczy
    'masa-pojazdu-gotowego-do-jazdy': number; // Masa pojazdu gotowego do jazdy
    'dopuszczalna-masa-calkowita': number; // Dopuszczalna masa calkowita
    'max-masa-calkowita': number; // Maksymalna masa calkowita
    'dopuszczalna-ladownosc': number; // Dopuszczalna ladownosc
    'max-ladownosc': number; // Maksymalna ładowność
    'dopuszczalna-masa-calkowita-zespolu-pojazdow': number; // Dopuszczalna masa całkowita zespołu pojazdów
    'liczba-osi': number; // Liczba osi
    'dopuszczalny-nacisk-osi': number; // Największy dopuszczalny nacisk osi
    'maksymalny-nacisk-osi': number; // Największy maksymalny nacisk osi
    'max-masa-calkowita-przyczepy-z-hamulcem': number; // Maksymalna masa całkowita ciągniętej przyczepy z hamulcem
    'max-masa-calkowita-przyczepy-bez-hamulca': number; // Maksymalna masa całkowita ciągniętej przyczepy bez hamulca
    'liczba-miejsc-ogolem': number; //	Liczba miejsc ogółem
    'liczba-miejsc-siedzacych': number; // Liczba miejsc siedzących
    'liczba-miejsc-stojacych': number; // Liczba miejsc stojących
    'rodzaj-pierwszego-paliwa-alternatywnego': string; // Rodzaj pierwszego paliwa alternatywnego
    'rodzaj-drugiego-paliwa-alternatywnego': string; // Rodzaj drugiego paliwa alternatywnego
    'srednie-zuzycie-paliwa': number; // Średnie zużycie paliwa
    'poziom-emisji-co2': number; // Poziom emisji co2
    'rodzaj-zawieszenia': string; // Rodzaj zawieszenia
    'wyposazenie-i-rodzaj-urzadzenia-radarowego': string; // Wyposażenie i rodzaj urządzenia radarowego
    hak: boolean; // Zamontowany hak
    'kierownica-po-prawej-stronie': boolean; // Kierownica po prawej stronie
    'kierownica-po-prawej-stronie-pierwotnie': boolean; // Kierownica po prawej stronie pierwotnie
    'katalizator-pochlaniacz': boolean; // Zamontowany katalizator/pochłaniacz
    'nazwa-producenta': string; // Nazwa producenta pojazdu
    'kod-instytutu-transaportu-samochodowego': string; // Kod instytutu transportu samochodowego
    'rozstaw-kol-osi-kierowanej-pozostalych-osi': string; // Rozstaw kół osi kierowanej i rozstaw kół pozostałych osi
    'max-rozstaw-kol': number; // Maksymalny rozstaw kół
    'avg-rozstaw-kol': number; // Średni rozstaw kół
    'min-rozstaw-kol': number; // Minimalny rozstaw kół
    'redukcja-emisji-spalin': number; // Redukcja emisji spalin w wyniku zastosowania technologii innowacyjnej lub grupy technologii innowacyjnych
    'data-pierwszej-rejestracji': string; // Data pierwszej rejestracji
    'rodzaj-kodowania-rodzaj-podrodzaj-przeznaczenie': string; // Rodzaj kodowania rodzaj podrodzaj przeznaczenie
    'kod-rodzaj-podrodzaj-przeznaczenie': string; // Kod rodzaj-podrodzaj-przeznaczenie
    'data-wyrejestrowania-pojazdu': string; // Data wyrejestrowania pojazdu
    'przyczyna-wyrejestrowania-pojazdu': string; // Przyczyna wyrejestrowania pojazdu
    'data-wprowadzenia-danych': string; // Data wprowadzenia danych
    'rejestracja-wojewodztwo': string; // Aktualne miejsce rejestracji - województwo
    'rejestracja-gmina': string; // Aktualne miejsce rejestracji - gmina
    'rejestracja-powiat': string; // Aktualne miejsce rejestracji - powiat
    'wlasciciel-wojewodztwo': string; // Siedziba lub miejsce zamieszkania właściciela (pierwszego jeżeli jest współwłasność) pojazdu (województwo)
    'wlasciciel-powiat': string; // Siedziba lub miejsce zamieszkania właściciela (pierwszego jeżeli jest współwłasność) pojazdu (powiat)
    'wlasciciel-gmina': string; // Siedziba lub miejsce zamieszkania właściciela (pierwszego jeżeli jest współwłasność) pojazdu (gmina)
    'wlasciciel-wojewodztwo-kod': string; // Kod teryt województwa zamiaszkania właściciela pojazdu
    'poziom-emisji-co2-paliwo-alternatywne-1': number; // Poziom emisji co2 pierwszego paliwa alternatywnego
}
