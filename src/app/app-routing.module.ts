import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: `dashboard`,
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: ``,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            onSameUrlNavigation: 'reload',
            paramsInheritanceStrategy: 'always',
            relativeLinkResolution: 'corrected',
            scrollPositionRestoration: 'top',
        }),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {
}
