import { Observable, Subscriber, Subscription } from 'rxjs';

export function hasProperty<T = any>(prop: string): (source$: Observable<T>) => Observable<T> {
    return (source$: Observable<T>): Observable<T> => {

        return new Observable((subscriber: Subscriber<T>): Subscription => {
            return source$.subscribe(
                (value: T) => {
                    if (value && value.hasOwnProperty(prop)) {
                        subscriber.next(value);
                    }
                },
                (error: any) => subscriber.error(error),
                () => subscriber.complete(),
            );
        });
    };
}
