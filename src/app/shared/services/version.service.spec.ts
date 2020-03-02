import { VersionService } from 'src/app/shared/services/version.service';
import { TestBed } from '@angular/core/testing';
import { API_URL } from 'src/app/shared/constants';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe(VersionService.name, () => {

    let httpClientSpy: { get: jasmine.Spy };
    let service: VersionService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', [ 'get' ]);

        TestBed.configureTestingModule({
            providers: [
                { provide: API_URL, useValue: 'fakeApiUrl' },
            ],
        });

        service = new VersionService(httpClientSpy as any, TestBed.inject(API_URL));
    });

    it('should return version data', () => {
        const mockedVersionItem = { major: '1', minor: '1', patch: '3-beta', dateMod: '2020-01-29' };

        httpClientSpy.get.and.returnValue(of(mockedVersionItem));

        service.getVersion().subscribe((version) => {
            expect(version).toEqual(mockedVersionItem);
        });

        expect(httpClientSpy.get.calls.count()).toBe(1);
    });

    it('should return an error when the server returns a 404', () => {
        const errorResponse = new HttpErrorResponse({
            error: '404 error',
            status: 404, statusText: 'Not Found',
        });

        httpClientSpy.get.and.returnValue(throwError(errorResponse));

        service.getVersion().subscribe(
            () => fail('expected an error, not heroes'),
            (error) => expect(error.message).toContain('404 Not Found'),
        );

        expect(httpClientSpy.get.calls.count()).toBe(1);
    });
});
