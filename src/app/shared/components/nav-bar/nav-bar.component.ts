import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'cpk-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: [ './nav-bar.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

    @Output() public readonly search = new EventEmitter<string>();
    public phrase: string;

    public onSearch(): void {
        this.search.emit(this.phrase);
    }
}
