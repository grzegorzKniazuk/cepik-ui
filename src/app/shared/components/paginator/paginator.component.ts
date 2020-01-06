import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'cpk-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: [ './paginator.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }

}
