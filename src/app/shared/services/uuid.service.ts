import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
    providedIn: 'root',
})
export class UuidService {

    public static generate(): string {
        return uuid.v4();
    }

    public generate(): string {
        return UuidService.generate();
    }
}
