import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
    selector: 'cpk-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: [ './paginator.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {

    public readonly limitButtonsParams = [ 10, 20, 50, 100, 200, 500 ];
    public pageNumbers: number[] = [];

    @Input() public readonly first: number;
    @Input() public readonly last: number;
    @Input() public readonly next: number;
    @Input() public readonly prev: number;
    @Input() public readonly self: number;
    @Input() public readonly limit: number;

    @Output() public readonly pageChange = new EventEmitter<number>();
    @Output() public readonly limitChange = new EventEmitter<number>();

    ngOnChanges() {
        if (this.self > 2 && this.next !== this.last && !this.isLastPage) {
            if (this.next === this.last) {
                this.pageNumbers = [ this.first, this.prev, this.self, this.next ];
            } else {
                this.pageNumbers = [ this.first, this.prev, this.self, this.next, this.last ];
            }
        } else if (this.self > 2 && !this.isLastPage) {
            this.pageNumbers = [ this.first, this.prev, this.self, this.next ];
        } else if (this.self > 1 && !this.isLastPage) {
            if (this.next === this.last) {
                this.pageNumbers = [ this.prev, this.self, this.next ];
            } else {
                this.pageNumbers = [ this.prev, this.self, this.next, this.last ];
            }
        } else if (this.isLastPage) {
            this.pageNumbers = [ this.first, this.prev, this.self ];
        } else if (this.isFirstPage) {
            if (this.next === this.last) {
                this.pageNumbers = [ this.self, this.next ];
            } else {
                this.pageNumbers = [ this.self, this.next, this.last ];
            }
        }
    }

    public get isFirstPage(): boolean {
        return  this.self !== null && this.self === 1;
    }

    public get isLastPage(): boolean {
        return this.self !== null && this.self === this.last;
    }

    public onPageChange(page: number): void {
        if (page > 0 && page <= this.last) {
            this.pageChange.emit(page);
        }
    }

    public onLimitChange(limit: number): void {
        this.limitChange.emit(limit);
    }
}
