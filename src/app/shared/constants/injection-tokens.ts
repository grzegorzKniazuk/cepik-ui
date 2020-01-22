import { InjectionToken } from '@angular/core';
import { ModalOptions, ToastOptions } from 'src/app/shared/interfaces';

export const API_URL: InjectionToken<string> = new InjectionToken<string>('API_URL');
export const TOAST_OPTIONS: InjectionToken<ToastOptions> = new InjectionToken<ToastOptions>('TOAST_OPTIONS');
export const MODAL_OPTIONS: InjectionToken<ModalOptions> = new InjectionToken<ModalOptions>('MODAL_OPTIONS');
