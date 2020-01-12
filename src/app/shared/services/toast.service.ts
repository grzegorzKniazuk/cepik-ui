import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ToastService {

    private readonly baseConfig: Partial<IndividualConfig> = {
        positionClass: 'toast-top-right',
        timeOut: 5000,
    };

    constructor(
        private readonly toastrService: ToastrService,
    ) {
    }

    public error(message?: string, title = 'Błąd', override?: Partial<IndividualConfig>): void {
        this.toastrService.error(message, title, { ...this.baseConfig, ...override });
    }
}
