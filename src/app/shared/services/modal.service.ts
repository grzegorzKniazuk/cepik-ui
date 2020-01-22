import { ComponentFactoryResolver, Inject, Injectable, Injector, RendererFactory2, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from 'src/app/shared/components';
import { MODAL_OPTIONS } from 'src/app/shared/constants/injection-tokens';
import { ModalOptions } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class ModalService {

    private readonly renderer2 = this.rendererFactory2.createRenderer(this.document.body, null);

    private readonly baseModalOptions: ModalOptions = {
        closeOnBackdropClick: true,
    };

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly rendererFactory2: RendererFactory2,
        private readonly injector: Injector,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
    }

    public open<T>(content: Type<T>, modalOptions?: ModalOptions): void {
        const modalFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);

        const contentFactory = this.componentFactoryResolver.resolveComponentFactory(content);
        const contentComponentRef = contentFactory.create(this.injector);

        const modalComponentRef = modalFactory.create(Injector.create({
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
        }), [ [ contentComponentRef.location.nativeElement ] ]);

        modalComponentRef.hostView.detectChanges();

        this.renderer2.appendChild(this.document.body, modalComponentRef.location.nativeElement);

        modalComponentRef.instance.close$.subscribe(() => {
            this.renderer2.removeChild(this.document.body, modalComponentRef.location.nativeElement);
        });
    }
}
