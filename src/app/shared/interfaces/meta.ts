// https://api.cepik.gov.pl/doc

export interface Meta {
    count: number; // Liczba zasobów spełniających kryteria wyszukiwania
    page?: number; // Numer strony, dla której zwrócono dane. Metadana związana z mechanizmem stronicowania
    limit?: number; // Przyjęty limit maksymalnej liczby elementów na stronie. Metadana związana z mechanizmem stronicowania
    'json-ld-id': string;
    schema: string;
    'dc:title': string; // Nazwa zasobu informacyjnego, która umożliwia jego identyfikację
    'schema:provider': string; // Opis dostawcy zasobu informacyjnego
    'schema:datePublished': string; // Data i czas publikacji zasobu z dokładnością do jednej sekundy
    'schema:dateModified': string; // Data ostatniej modyfikacji zasobu z dokładnością do jednej sekundy
    'dc:description': string; // Opis zasobu informacyjnego
    'dc:language': string; // Określa język zasobu
    'sy:updatePeriod': string; // Informuje o tym, jaki jest interwał aktualizacji zasobu, np.: co miesiąc, co rok, co godzinę, co 10 sekund
    'sy:updateFrequency': string; // Informuje o tym, jaki jest interwał aktualizacji zasobu, np.: co miesiąc, co rok, co godzinę, co 10 sekund
    'sy:updateBase': string; // Informuje o tym, jaki jest interwał aktualizacji zasobu, np.: co miesiąc, co rok, co godzinę, co 10 sekund
    'schema:contentType': string;
    'schema:isPartOf': string; // Określenie przynależności do grupy np. zasobów
    'dc:rights': string;
    'schema:keywords': string;
}
