import { Observable, Subscriber, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

export function debug<T = any>(): (source$: Observable<T>) => Observable<T> {
    return (source$: Observable<T>): Observable<T> => {

        return new Observable((subscriber: Subscriber<T>): Subscription => {
            return source$.subscribe(
                (value: T) => {
                    if (!environment.production) {
                        console.log(value);
                    }

                    subscriber.next(value);
                },
                (error: any) => subscriber.error(error),
                () => subscriber.complete(),
            );
        });
    };
}