import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WindowService } from 'src/app/shared/services';

@Component({
    selector: 'cpk-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: [ './nav-bar.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

    constructor(
        private readonly windowService: WindowService,
    ) {
    }

    public openGithubReportPage(): void {
        this.windowService.open('https://github.com/grzegorzKniazuk/cepik-ui/issues', '_blank');
    }
}
