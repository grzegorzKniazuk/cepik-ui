import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, RendererFactory2, Type } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from 'src/app/shared/components';
import { MODAL_DATA, MODAL_OPTIONS } from 'src/app/shared/constants';
import { ModalOptions } from 'src/app/shared/interfaces';

@Injectable({
    providedIn: 'root',
})
export class ModalService<ComponentType, ModalParamsDataType = null> {

    private readonly renderer2 = this.rendererFactory2.createRenderer(this.document.body, null);

    private readonly baseModalOptions: ModalOptions = {
        closeOnBackdropClick: true,
        title: '',
        data: null,
    };

    private contentFactory: ComponentFactory<ComponentType>;
    private contentComponentRef: ComponentRef<ComponentType>;

    private modalFactory: ComponentFactory<ModalComponent>;
    private modalComponentRef: ComponentRef<ModalComponent>;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly rendererFactory2: RendererFactory2,
        private readonly injector: Injector,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
    }

    public open(content: Type<ComponentType>, modalOptions?: Partial<ModalOptions<ModalParamsDataType>>): void {
        this.buildContentComponent(content, modalOptions);
        this.buildModalComponent(modalOptions);
        this.refreshHostViews();
        this.pushComponentsIntoView();
    }

    public close(): void {
        return this.renderer2.removeChild(this.document.body, this.modalComponentRef.location.nativeElement);
    }

    private buildContentComponent(content: Type<ComponentType>, modalOptions?: Partial<ModalOptions<ModalParamsDataType>>): void {
        this.contentFactory = this.componentFactoryResolver.resolveComponentFactory(content);

        this.contentComponentRef = this.contentFactory.create(Injector.create({
            providers: [
                {
                    provide: MODAL_DATA,
                    useValue: modalOptions ? modalOptions.data : null,
                },
            ],
            parent: this.injector,
            name: 'MODAL_DATA',
        }));
    }

    private buildModalComponent(modalOptions?: Partial<ModalOptions<ModalParamsDataType>>): void {
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
    }

    private refreshHostViews(): void {
        this.modalComponentRef.hostView.detectChanges();
        this.contentComponentRef.hostView.detectChanges();
    }

    private pushComponentsIntoView(): void {
        this.renderer2.appendChild(this.document.body, this.modalComponentRef.location.nativeElement);

        this.modalComponentRef.instance.close$.subscribe(() => this.close());
    }
}
