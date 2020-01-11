import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'cpk-regions',
    templateUrl: './regions.component.html',
    styleUrls: [ './regions.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegionsComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
