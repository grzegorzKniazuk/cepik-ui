import { ComponentFactoryResolver, ComponentRef, Directive, ElementRef, Inject, Injector, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilKeyChanged, pluck, tap } from 'rxjs/operators';
import { SORT_KEY } from 'src/app/shared/constants';
import { fromEvent } from 'rxjs';
import { BaseComponent } from 'src/app/views/base.component';
import { IconComponent } from 'src/app/shared/components';
import { DOCUMENT } from '@angular/common';
import { truthy } from 'src/app/shared/operators';

@Directive({
    selector: '[cpkSortable]',
})
export class SortableDirective extends BaseComponent implements OnInit, OnDestroy {

    @Input('cpkSortable') private readonly key: string;

    private readonly iconComponentFactory = this.componentFactoryResolver.resolveComponentFactory(IconComponent);
    private readonly keyboardArrowUpNode = this.document.createTextNode('keyboard_arrow_up');
    private readonly keyboardArrowDownNode = this.document.createTextNode('keyboard_arrow_down');

    constructor(
        activatedRoute: ActivatedRoute,
        router: Router,
        private readonly elementRef: ElementRef,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly renderer2: Renderer2,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
        super(activatedRoute, router);
    }

    ngOnInit() {
        this.setInitialStyles();
        this.watchOnQueryParamsChange();
        this.watchOnElementClick();
    }

    ngOnDestroy() {
        this.unsubscribe();
    }

    private setInitialStyles(): void {
        this.renderer2.setProperty(this.elementRef.nativeElement, 'scope', 'col');
        this.renderer2.setStyle(this.elementRef.nativeElement, 'position', 'relative');
        this.renderer2.setStyle(this.elementRef.nativeElement, 'padding-right', '25px');
    }

    private watchOnQueryParamsChange(): void {
        this.subscriptions$.add(
            this.activatedRoute.queryParams.pipe(
                distinctUntilKeyChanged(SORT_KEY),
                pluck(SORT_KEY),
                truthy(),
                tap(() => this.viewContainerRef.clear()),
            ).subscribe((actualKey: string) => {
                if (this.key === actualKey) {
                    const iconComponent = this.viewContainerRef.createComponent(this.iconComponentFactory, 0, this.injector, [ [ this.keyboardArrowUpNode ] ]);
                    this.appendIconElement(iconComponent);
                } else if (actualKey.startsWith('-') && actualKey.slice(1) === this.key) {
                    const iconComponent = this.viewContainerRef.createComponent(this.iconComponentFactory, 0, this.injector, [ [ this.keyboardArrowDownNode ] ]);
                    this.appendIconElement(iconComponent);
                }
            }),
        );
    }

    private appendIconElement(component: ComponentRef<IconComponent>): void {
        this.renderer2.setStyle(component.location.nativeElement, 'position', 'absolute');
        this.renderer2.setStyle(component.location.nativeElement, 'right', '0');
        this.renderer2.setStyle(component.location.nativeElement, 'top', '55%');
        this.renderer2.setStyle(component.location.nativeElement, 'transform', 'translateY(-45%)');

        this.renderer2.appendChild(this.elementRef.nativeElement, component.location.nativeElement);
    }

    private watchOnElementClick(): void {
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
