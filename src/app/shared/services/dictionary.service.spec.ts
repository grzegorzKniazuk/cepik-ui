import { DictionaryService } from 'src/app/shared/services/dictionary.service';
import { TestBed } from '@angular/core/testing';
import { API_URL } from 'src/app/shared/constants';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe(DictionaryService.name, () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: DictionaryService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', [ 'get' ]);

        TestBed.configureTestingModule({
            providers: [
                { provide: API_URL, useValue: 'fakeApiUrl' },
            ],
        });

        service = new DictionaryService(httpClientSpy as any, TestBed.inject(API_URL));
    });

    it('should return dictionary data by given dictionary name', () => {
        const mockedDictionaryItem = {
            meta: {
                count: 1,
                'json-ld-id': '/slowniki/wojewodztwa',
                schema: 'https://api.cepik.gov.pl/www/schema/dictionary.json',
                'dc:title': 'Słownik',
                'schema:provider': 'Ministerstwo Cyfryzacji',
                'schema:dateModified': '2020-02-22',
                'dc:description': 'Słownik zawierający wartości, które można wykorzystać przy przeszukiwaniu danych API, np przy filtrowaniu',
                'dc:language': 'pl',
                'sy:updatePeriod': 'weekly',
                'sy:updateFrequency': '1',
                'sy:updateBase': '2020-02-29',
                'schema:contentType': 'application/json',
                'schema:isPartOf': 'https://api.cepik.gov.pl/slowniki',
                'dc:rights': 'brak',
                'schema:keywords': 'słowniki',
            },
            links: {
                self: 'https://api.cepik.gov.pl/slowniki/wojewodztwa',
            },
            data: {
                id: 'wojewodztwa',
                type: 'slowniki',
                links: { self: 'https://api.cepik.gov.pl/slowniki/wojewodztwa' },
                attributes: {
                    'dostepne-rekordy-slownika': [ {
                        'klucz-slownika': '02',
                        'wartosc-slownika': 'DOLNOŚLĄSKIE',
                        'liczba-wystapien': 2862108,
                    }, {
                        'klucz-slownika': '04',
                        'wartosc-slownika': 'KUJAWSKO-POMORSKIE',
                        'liczba-wystapien': 2168556,
                    }, { 'klucz-slownika': '06', 'wartosc-slownika': 'LUBELSKIE', 'liczba-wystapien': 2500611 }, {
                        'klucz-slownika': '08',
                        'wartosc-slownika': 'LUBUSKIE',
                        'liczba-wystapien': 1142386,
                    }, { 'klucz-slownika': '10', 'wartosc-slownika': 'ŁÓDZKIE', 'liczba-wystapien': 2808142 }, {
                        'klucz-slownika': '12',
                        'wartosc-slownika': 'MAŁOPOLSKIE',
                        'liczba-wystapien': 3419909,
                    }, { 'klucz-slownika': '14', 'wartosc-slownika': 'MAZOWIECKIE', 'liczba-wystapien': 6670288 }, {
                        'klucz-slownika': '16',
                        'wartosc-slownika': 'OPOLSKIE',
                        'liczba-wystapien': 1112349,
                    }, {
                        'klucz-slownika': '18',
                        'wartosc-slownika': 'PODKARPACKIE',
                        'liczba-wystapien': 2411398,
                    }, { 'klucz-slownika': '20', 'wartosc-slownika': 'PODLASKIE', 'liczba-wystapien': 1311444 }, {
                        'klucz-slownika': '22',
                        'wartosc-slownika': 'POMORSKIE',
                        'liczba-wystapien': 2307688,
                    }, { 'klucz-slownika': '24', 'wartosc-slownika': 'ŚLĄSKIE', 'liczba-wystapien': 4389714 }, {
                        'klucz-slownika': '26',
                        'wartosc-slownika': 'ŚWIĘTOKRZYSKIE',
                        'liczba-wystapien': 1459582,
                    }, {
                        'klucz-slownika': '28',
                        'wartosc-slownika': 'WARMIŃSKO-MAZURSKIE',
                        'liczba-wystapien': 1449861,
                    }, {
                        'klucz-slownika': '30',
                        'wartosc-slownika': 'WIELKOPOLSKIE',
                        'liczba-wystapien': 4522246,
                    }, {
                        'klucz-slownika': '32',
                        'wartosc-slownika': 'ZACHODNIOPOMORSKIE',
                        'liczba-wystapien': 1634016,
                    }, { 'klucz-slownika': 'XX', 'wartosc-slownika': 'NIEOKREŚLONE', 'liczba-wystapien': 1117896 } ],
                    'ilosc-rekordow-slownika': 17,
                },
            },
        };

        httpClientSpy.get.and.returnValue(of(mockedDictionaryItem));

        service.getDictionary('wojewodztwa').subscribe((dictionaryItem) => {
            expect(dictionaryItem).toEqual(mockedDictionaryItem);
        });

        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404, statusText: 'Not Found',
        });

        httpClientSpy.get.and.returnValue(throwError(errorResponse));

        service.getDictionary('test value').subscribe(
            () => fail('expected an error, not heroes'),
            (error) => expect(error.message).toContain('404 Not Found'),
        );

        expect(httpClientSpy.get.calls.count()).toBe(1);
    });
});
