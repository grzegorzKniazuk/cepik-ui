import { InjectionToken } from '@angular/core';
import { ToastOptions } from 'src/app/shared/interfaces';

export const API_URL: InjectionToken<string> = new InjectionToken<string>('API_URL');
export const TOAST_OPTIONS: InjectionToken<ToastOptions> = new InjectionToken<ToastOptions>('TOAST_OPTIONS');
