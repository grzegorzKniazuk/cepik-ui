import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Pagination } from 'src/app/shared/interfaces';

@Component({
    selector: 'cpk-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: [ './paginator.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent implements OnChanges {

    public readonly limitButtonsParams = [ 10, 20, 50, 100, 200, 500 ];
    public pageNumbers: number[] = [];

    @Input() public readonly limit: number;
    @Input() public readonly page: number;
    @Input() public readonly total: number;
    @Input() public readonly pages: number;

    @Output() public readonly pageChange = new EventEmitter<Pick<Pagination, 'page' | 'limit' | 'total'>>();
    @Output() public readonly limitChange = new EventEmitter<Pick<Pagination, 'limit' | 'total'>>();

    public ngOnChanges(): void {
        this.pageNumbers = [];

        if (this.pages <= 5) {
            for (let i = 1; i <= this.pages; i++) {
                this.pageNumbers.push(i);
            }
        } else {
            for (let i = this.page - 2; i <= this.page + 2; i++) {
                if (i > 0 && i <= this.pages) {
                    this.pageNumbers.push(i);
                }
            }
        }
    }

    public onPageChange(page: number): void {
        if (page > 0 && page <= this.pages) {
            this.pageChange.emit({ page, limit: this.limit, total: this.total });
        }
    }

    public onLimitChange(limit: number): void {
        this.limitChange.emit({ limit, total: this.total });
    }
}
