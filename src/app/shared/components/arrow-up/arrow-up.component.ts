import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowService } from 'src/app/shared/services';
import { Subject } from 'rxjs';

@Component({
    selector: 'cpk-arrow-up',
    templateUrl: './arrow-up.component.html',
    styleUrls: [ './arrow-up.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrowUpComponent {

    public readonly show$ = new Subject<boolean>();

    constructor(
        private readonly windowService: WindowService,
    ) {
    }

    public goToUp(): void {
        this.windowService.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        this.show$.next(false);
    }
}
