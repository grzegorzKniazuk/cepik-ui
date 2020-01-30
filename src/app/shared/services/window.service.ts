import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class WindowService {

    constructor(
        @Inject(PLATFORM_ID) private readonly platformId: Object,
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

    public scrollTo(options?: ScrollToOptions): void {
        this.nativeWindow.scrollTo(options);
    }

    public get pageYOffset(): number {
        return this.nativeWindow.pageYOffset;
    }
}
