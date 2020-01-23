import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cpk-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: [ './nav-bar.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
}
