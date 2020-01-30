import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectLoaderState } from 'src/app/store/loader/loader.selectors';
import { BaseComponent } from 'src/app/views/base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Directive({
    selector: '[cpkLoadingBlur]',
})
export class LoadingBlurDirective extends BaseComponent implements OnInit, OnDestroy {

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        private readonly elementRef: ElementRef,
        private readonly store: Store<AppState>,
        private readonly renderer2: Renderer2,
    ) {
        super(activatedRoute, router);
    }

    ngOnInit() {
        this.subscriptions$.add(
            this.store.pipe(select(selectLoaderState)).subscribe((loaderState) => {
                if (loaderState) {
                    this.renderer2.setStyle(this.elementRef.nativeElement, 'filter', 'blur(6px)');
                } else {
                    this.renderer2.removeStyle(this.elementRef.nativeElement, 'filter');
                }
            }),
        );
    }

    ngOnDestroy() {
        this.unsubscribe();
    }
}
