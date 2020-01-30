import { ComponentFactoryResolver, ComponentRef, Directive, HostListener, OnInit, ViewContainerRef } from '@angular/core';
import { ArrowUpComponent } from 'src/app/shared/components';
import { WindowService } from 'src/app/shared/services';

@Directive({
    selector: '[cpkArrowUp]',
})
export class ArrowUpDirective implements OnInit {

    private readonly arrowUpComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ArrowUpComponent);
    private arrowUpComponentRef: ComponentRef<ArrowUpComponent>;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly windowService: WindowService,
    ) {
    }

    ngOnInit() {
        this.createArrowToTop();
        this.getScrollPosition();
    }

    @HostListener('wheel')
    @HostListener('click')
    private getScrollPosition(): void {
        this.arrowUpComponentRef.instance.show$.next(this.windowService.pageYOffset > 10);
    }

    private createArrowToTop(): void {
        this.arrowUpComponentRef = this.viewContainerRef.createComponent(this.arrowUpComponentFactory);
    }
}
