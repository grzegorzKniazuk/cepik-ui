import { Observable, Subscriber, Subscription } from 'rxjs';

export function falsy<T = any>(): (source$: Observable<T>) => Observable<T> {
    return (source$: Observable<T>): Observable<T> => {

        return new Observable((subscriber: Subscriber<T>): Subscription => {
            return source$.subscribe(
                (value: T) => {
                    if (!!value === false) {
                        subscriber.next(value);
                    }
                },
                (error: any) => subscriber.error(error),
                () => subscriber.complete(),
            );
        });
    };
}
