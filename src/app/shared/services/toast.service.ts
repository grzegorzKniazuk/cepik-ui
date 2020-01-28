import { ComponentFactoryResolver, ComponentRef, Inject, Injectable, Injector, Renderer2, RendererFactory2 } from '@angular/core';
import { ToastComponent } from 'src/app/shared/components';
import { DOCUMENT } from '@angular/common';
import { TOAST_OPTIONS } from 'src/app/shared/constants';
import { ToastType } from 'src/app/shared/enums';
import { animationFrameScheduler, timer } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    private readonly toastComponentFactory = this.componentFactoryResolver.resolveComponentFactory<ToastComponent>(ToastComponent);
    private readonly renderer2: Renderer2;
    private toastComponentRef: ComponentRef<ToastComponent>;

    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private readonly injector: Injector,
        private readonly rendererFactory2: RendererFactory2,
        @Inject(DOCUMENT) private readonly document: Document,
    ) {
        this.renderer2 = this.rendererFactory2.createRenderer(document.body, null);
    }

    public error(title: string, message: string, id?: string): void {
        this.open(ToastType.DANGER, title, message, id);
    }

    private open(type: ToastType, title: string, message: string, id?: string): void {
        this.toastComponentRef = this.toastComponentFactory.create(Injector.create({
            providers: [
                {
                    provide: TOAST_OPTIONS,
                    useValue: {
                        type,
                        message,
                        title,
                        id,
                    },
                },
            ],
            parent: this.injector,
            name: 'TOAST_OPTIONS',
        }));

        this.toastComponentRef.hostView.detectChanges();

        this.toastComponentRef.instance.close$.subscribe(() => this.hide());

        this.renderer2.appendChild(this.document.body, this.toastComponentRef.location.nativeElement);

        timer(53000, animationFrameScheduler).subscribe(() => this.hide());
    }

    private hide(): void {
        this.renderer2.removeChild(this.document.body, this.toastComponentRef.location.nativeElement);
    }
}
