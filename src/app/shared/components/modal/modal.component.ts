import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'cpk-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
