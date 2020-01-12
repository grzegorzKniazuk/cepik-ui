import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'cpk-icon',
    templateUrl: './icon.component.html',
    styleUrls: [ './icon.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
    @Input() public readonly icon: string;
    @Input() public readonly size: number;
}
