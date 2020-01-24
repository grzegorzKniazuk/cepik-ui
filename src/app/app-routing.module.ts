import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, VehiclesComponent } from 'src/app/views';
import { RegionsResolver, VehiclesBrandsResolver, VehiclesResolver } from 'src/app/shared/resolvers';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: { title: 'Strona główna' },
    },
    {
        path: 'vehicles',
        component: VehiclesComponent,
        data: { title: 'Pojazdy' },
        resolve: {
            vehicles: VehiclesResolver,
            regions: RegionsResolver,
            brands: VehiclesBrandsResolver,
        },
        runGuardsAndResolvers: 'always',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            onSameUrlNavigation: 'reload',
            paramsInheritanceStrategy: 'always',
        }),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {
}
