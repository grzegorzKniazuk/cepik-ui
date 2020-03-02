/*
import { TestScheduler } from 'rxjs/testing';
import { catchError, debounceTime, delay, distinctUntilChanged, map, mergeMap, pluck, startWith, switchMap, toArray } from 'rxjs/operators';
import { concat, EMPTY, from, fromEvent, interval, Observable, of, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';

const input$ = fromEvent(document, 'input');
const breweryTypeahead = (ajaxMock = ajax) => (sourceObservable: Observable<any>) => {
    return sourceObservable.pipe(
        debounceTime(200),
        pluck<Event, string>('target', 'value'),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
            return ajaxMock.getJSON(`url?by_name=${searchTerm}`).pipe(
                catchError(() => EMPTY),
            );
        }),
    );
};

input$.pipe(breweryTypeahead()).subscribe(() => {
    // update ui
});

describe('Marble testing in RxJS', () => {
    let testScheduler: TestScheduler;

    beforeEach(() => {
        testScheduler = new TestScheduler((actual, expected) => {
            expect(actual).toEqual(expected);
        });
    });

    it('should convert ascii diagrams with params into observables', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const source$ = cold('--a-b---c', { a: 1, b: 2, c: 3 });
            const final$ = source$.pipe(map(val => val * 10));

            const expected = '--a-b---c';

            expectObservable(final$).toBe(expected, { a: 10, b: 20, c: 30 });

        });
    });

    it('should let you identify subscription points', () => {
        testScheduler.run(({ cold, expectObservable, expectSubscriptions }) => {
            const source1$ = cold('-a---b-|');
            const source2$ = cold('-c---d-|');
            const final$ = concat(source1$, source2$);

            const expected = '-a---b--c---d-|';
            const source1ExpectedSub = '^-------!';
            const source2ExpectedSub = '^-------^-------!';

            expectObservable(final$).toBe(expected);
            expectSubscriptions(source1$.subscriptions).toBe(source1ExpectedSub);
            expectSubscriptions(source2$.subscriptions).toBe(source2ExpectedSub);
        });
    });

    it('test hot observables', () => {
        testScheduler.run(({ hot, expectObservable }) => {
            const source$ = hot('--a-b-^-c');

            const expected = '--c';

            expectObservable(source$).toBe(expected);
        });
    });

    it('should let you test synchronous operations', () => {
        testScheduler.run(({ expectObservable }) => {
            const source$ = from([ 1, 2, 3, 4, 5 ]);

            const expected = '(abcde|)';

            expectObservable(source$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
        });
    });

    it('should let you test asynchronous operations', () => {
        testScheduler.run(({ expectObservable }) => {
            const source$ = from([ 1, 2, 3, 4, 5 ]);
            const final$ = source$.pipe(delay(200));

            const expected = '200ms (abcde|)';

            expectObservable(final$).toBe(expected, { a: 1, b: 2, c: 3, d: 4, e: 5 });
        });
    });

    it('should debounce input by 200ms', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const searchTerm = 'testing';
            const source$ = cold('a', { a: { target: { value: searchTerm } } });
            const final$ = source$.pipe(
                breweryTypeahead({
                    getJSON: () => of(searchTerm).pipe(delay(300)),
                }),
            );

            const expected = '500ms a';

            expectObservable(final$).toBe(expected, { a: { target: { value: searchTerm } } });
        });
    });

    it('should cancel active request if another value is emitted', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const searchTerm = 'testing';

            const source$ = cold('a 250ms b', {
                a: { target: { value: 'first' } },
                b: { target: { value: 'second' } },
            });
            const final$ = source$.pipe(
                breweryTypeahead({
                    getJSON: () => of(searchTerm).pipe(delay(300)),
                }),
            );

            const expected = '751ms b';

            expectObservable(final$).toBe(expected, { a: { target: { value: searchTerm } } });
        });
    });

    it('should not emit duplicate values in a row', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const searchTerm = 'testing';

            const source$ = cold('a 250ms b', {
                a: { target: { value: 'first' } },
                b: { target: { value: 'first' } },
            });
            const final$ = source$.pipe(
                breweryTypeahead({
                    getJSON: () => of(searchTerm).pipe(delay(300)),
                }),
            );

            const expected = '500ms b';

            expectObservable(final$).toBe(expected, { a: { target: { value: searchTerm } } });
        });
    });

    it('should ignore ajax errors', () => {
        testScheduler.run(({ cold, expectObservable }) => {
            const source$ = cold('a 250ms b', {
                a: { target: { value: 'first' } },
                b: { target: { value: 'first' } },
            });
            const final$ = source$.pipe(
                breweryTypeahead({
                    getJSON: () => throwError('error'),
                }),
            );

            const expected = '';

            expectObservable(final$).toBe(expected);
        });
    });

    it('should let you test errors and error messages', () => {
        testScheduler.run(({ expectObservable }) => {
            const source$ = of({ firstName: 'Brian', lastName: 'Smith' }).pipe(
                startWith(null),
                map((v) => `${v.firstName} ${v.lastName}`),
                catchError(() => throwError('invalid user!')),
            );

            const expected = '(a#)';

            expectObservable(source$).toBe(expected, { a: 'Brian Smith' }, 'invalid user!');
        });
    });

    it('should let you test snapshots of strams that do not complete', () => {
        testScheduler.run(({ expectObservable }) => {
            const source$ = interval(1000).pipe(
                map((val) => `${val + 1}sec`),
            );

            const expected = '1s a 999b 999s c';
            const unsubscribe = '4s !';

            expectObservable(source$, unsubscribe).toBe(expected, { a: '1sec', b: '2sec', c: '3sec' });
        });
    });
});

describe('subscribe & assert testing in RxJS', () => {
    it('should compare each emitted value', () => {
        const source$ = of(1, 2, 3);
        const final$ = source$.pipe(
            map(v => v * 10),
            toArray(),
        );

        const expected = [ 10, 20, 30 ];

        final$.subscribe(val => {
            expect(val).toEqual(expected);
        });
    });

    it('should let you test async operations with done callback', done => {
        const source$ = of('Ready', 'Set', 'Go!').pipe(
            mergeMap((message, index) => {
                return of(message).pipe(
                    delay(index * 1000),
                );
            }),
        );

        const expected = [ 'Ready', 'Set', 'Go!' ];
        let i = 0;

        source$.subscribe(val => {
            expect(val).toEqual(expected[i]);
            i++;
        }, null, done);
    });
});
*/
