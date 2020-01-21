import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'cpk-icon',
    templateUrl: './icon.component.html',
    styleUrls: [ './icon.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
}
