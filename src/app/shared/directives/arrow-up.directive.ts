import { ComponentFactoryResolver, ComponentRef, Directive, NgZone, OnDestroy, OnInit, Renderer2, ViewContainerRef } from '@angular/core';
import { ArrowUpComponent } from 'src/app/shared/components';
import { WindowService } from 'src/app/shared/services';

@Directive({
    selector: '[cpkArrowUp]',
})
export class ArrowUpDirective implements OnInit, OnDestroy {

    private readonly arrowUpComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ArrowUpComponent);
    private arrowUpComponentRef: ComponentRef<ArrowUpComponent>;
    private wheelListener: () => void;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly viewContainerRef: ViewContainerRef,
        private readonly windowService: WindowService,
        private readonly ngZone: NgZone,
        private readonly renderer2: Renderer2,
    ) {
    }

    ngOnInit() {
        this.createArrowComponent();
        this.listenToWheelEvent();
    }

    ngOnDestroy() {
        if (this.wheelListener) {
            this.wheelListener();
        }
    }

    public listenToWheelEvent(): void {
        this.ngZone.runOutsideAngular(() => {
            this.wheelListener = this.renderer2.listen(this.windowService.nativeWindow, 'wheel', () => {
                this.arrowUpComponentRef.instance.show$.next(this.windowService.pageYOffset > 10);
            });
        });
    }

    private createArrowComponent(): void {
        this.arrowUpComponentRef = this.viewContainerRef.createComponent(this.arrowUpComponentFactory);
    }
}
