export interface ModalOptions<T = null> {
    closeOnBackdropClick: boolean;
    title: string;
    data?: T;
}
