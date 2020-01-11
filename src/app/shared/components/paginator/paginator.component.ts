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

    @Input() public set limit(limit: string) {
        this._limit = +limit;
    }
    @Input() public set page(page: string) {
        this._page = +page;
    }
    @Input() public readonly total: number;
    public _limit: number;
    public _page: number;
    public pages : number;

    @Output() public readonly pageChange = new EventEmitter<number>();
    @Output() public readonly limitChange = new EventEmitter<number>();

    public onPageChange(page: number): void {
        if (page > 0 && page <= this.pages) {
            this.pageChange.emit(page);
        }
    }

    public onLimitChange(limit: number): void {
        this.limitChange.emit(limit);
    }

    ngOnChanges() {
        this.pageNumbers = [];

        this.pages = Math.round(this.total / this._limit) || 1;
        if (this.pages <= 5) {
            for (let i = 1; i <= this.pages; i++) {
                this.pageNumbers.push(i);
            }
        } else {
            for (let i = this._page - 2; i <= this._page + 2; i++) {
                if (i > 0 && i <= this.pages) {
                    this.pageNumbers.push(i);
                }
            }
        }
    }
}
