import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilKeyChanged, pluck } from 'rxjs/operators';
import { SORT_KEY } from 'src/app/shared/constants';
import { fromEvent } from 'rxjs';
import { BaseComponent } from 'src/app/views/base.component';

@Directive({
    selector: '[cpkSortable]',
})
export class SortableDirective extends BaseComponent implements OnInit, OnDestroy {

    @Input('cpkSortable') private readonly key: string;

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        private readonly elementRef: ElementRef,
        private readonly renderer2: Renderer2,
    ) {
        super(activatedRoute, router);
    }

    ngOnInit() {
        this.setColScope();
        this.watchOnQueryParamsChange();
        this.watchOnColTitleClick();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private setColScope(): void {
        this.renderer2.setProperty(this.elementRef.nativeElement, 'scope', 'col');
    }

    private watchOnQueryParamsChange(): void {
        this.subscriptions$.add(
            this.activatedRoute.queryParams.pipe(
                distinctUntilKeyChanged(SORT_KEY),
                pluck(SORT_KEY),
            ).subscribe((actualKey: string) => {
                console.log(actualKey);
            }),
        );
    }

    private watchOnColTitleClick(): void {
        this.subscriptions$.add(
            fromEvent(this.elementRef.nativeElement, 'click').subscribe(() => {
                const actualKey: string = this.activatedRoute.snapshot.queryParams[SORT_KEY];

                if (this.key === actualKey) {
                    this.resolveParams({
                        [SORT_KEY]: `-${this.key}`,
                    });
                } else {
                    this.resolveParams({
                        [SORT_KEY]: this.key,
                    });
                }
            }),
        );
    }
}
