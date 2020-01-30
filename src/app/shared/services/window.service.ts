import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class WindowService {

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: string,
    ) {
    }

    public get nativeWindow(): Window | never {
        if (isPlatformBrowser(this.platformId)) {
            return window;
        } else {
            throw new Error('Window is not available');
        }
    }

    public open(url?: string, target?: string, features?: string, replace?: boolean): void {
        this.nativeWindow.open(url, target, features, replace);
    }
}