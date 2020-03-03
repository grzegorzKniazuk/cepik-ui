import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { VersionEffects } from 'src/app/store/version/version.effects';
import { VersionState } from 'src/app/store/version/version.reducer';
import { VersionService } from 'src/app/shared/services';
import { TestScheduler } from 'rxjs/testing';
import { SET_VERSION, VERSION_EFFECTS_INIT } from 'src/app/store/version/version.actions';

const mockVersionResponse: VersionState = {
    dateMod: '1',
    deprecated: '1',
    major: '1',
    minor: '1',
    patch: '1',
};

describe(VersionEffects.name, () => {

    let actions$: Observable<Action>;
    let effects: VersionEffects;
    let testScheduler: TestScheduler;

    let versionServiceSpy: jasmine.SpyObj<VersionService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                VersionEffects,
                provideMockActions(() => actions$),
                {
                    provide: VersionService,
                    useValue: {
                        getVersion: jasmine.createSpy('getVersion'),
                    },
                },
            ],
        });

        effects = TestBed.inject(VersionEffects);
        versionServiceSpy = TestBed.inject(VersionService as any);

        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    describe('init$', () => {
        it('should set api version on effects init', () => {
            testScheduler.run(({ cold, hot, expectObservable }) => {

                actions$ = hot('-a', { a: VERSION_EFFECTS_INIT });

                versionServiceSpy.getVersion.and.returnValue(cold('--a|', { a: mockVersionResponse }));

                expectObservable(effects.init$).toBe('---r', {
                    r: {
                        type: SET_VERSION.type,
                        version: mockVersionResponse,
                    },
                });
            });
        });
    });
});
