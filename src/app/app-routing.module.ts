import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/core/views';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: { title: 'Strona główna' },
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
