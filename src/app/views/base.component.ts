import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

export abstract class BaseComponent {

    protected readonly subscriptions = new Subscription();

    protected constructor(
        protected readonly activatedRoute: ActivatedRoute,
        protected readonly router: Router,
    ) {
    }

    protected unsubscribe(): void {
        this.subscriptions.unsubscribe();
    }

    protected resolveParams(queryParams: Params): Promise<boolean> {
        return this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams,
            queryParamsHandling: 'merge',
        });
    }
}
