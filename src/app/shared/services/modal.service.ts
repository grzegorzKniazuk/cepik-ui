import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, RendererFactory2, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from 'src/app/shared/components';
import { MODAL_OPTIONS } from 'src/app/shared/constants/injection-tokens';
import { ModalOptions } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class ModalService<T> {

    private readonly renderer2 = this.rendererFactory2.createRenderer(this.document.body, null);

    private readonly baseModalOptions: ModalOptions = {
        closeOnBackdropClick: true,
    };

    private contentFactory: ComponentFactory<T>;
    private contentComponentRef: ComponentRef<T>;

    private modalFactory: ComponentFactory<ModalComponent>;
    private modalComponentRef: ComponentRef<ModalComponent>;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly rendererFactory2: RendererFactory2,
        private readonly injector: Injector,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
    }

    public open(content: Type<T>, modalOptions?: ModalOptions): void {
        this.contentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        this.contentComponentRef = this.contentFactory.create(this.injector);

        this.modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        this.modalComponentRef = this.modalFactory.create(Injector.create({
            providers: [
                {
                    provide: MODAL_OPTIONS,
                    useValue: {
                        ...this.baseModalOptions,
                        ...modalOptions,
                    },
                },
            ],
            parent: this.injector,
            name: 'MODAL_OPTIONS',
        }), [ [ this.contentComponentRef.location.nativeElement ] ]);

        this.modalComponentRef.hostView.detectChanges();
        this.contentComponentRef.hostView.detectChanges();

        this.renderer2.appendChild(this.document.body, this.modalComponentRef.location.nativeElement);

        this.modalComponentRef.instance.close$.subscribe(() => this.close());
    }

    public close(): void {
        return this.renderer2.removeChild(this.document.body, this.modalComponentRef.location.nativeElement);
    }
}
