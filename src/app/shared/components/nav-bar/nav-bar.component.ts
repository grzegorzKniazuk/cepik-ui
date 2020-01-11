import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PHRASE_KEY } from 'src/app/shared/constants';
import { filter, first, pluck, skip, tap } from 'rxjs/operators';

@Component({
    selector: 'cpk-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: [ './nav-bar.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent implements OnInit {

    @Output() public readonly search = new EventEmitter<string>();
    public phrase: string;

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit() {
        this.setSearchPhraseFromQueryParams();
    }

    private setSearchPhraseFromQueryParams(): void {
        this.activatedRoute.queryParams.pipe(
            skip(1),
            first(),
            filter((params) => params && params.hasOwnProperty(PHRASE_KEY)),
            pluck<Params, string>('phrase'),
            tap((phrase) => this.phrase = phrase),
        ).subscribe(() => this.changeDetectorRef.detectChanges());
    }

    public onSearch(): void {
        this.search.emit(this.phrase);
    }
}
