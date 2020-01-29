import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from 'src/app/views';
import { BrandsResolver, FuelTypesResolver, RegionsResolver, VehicleOriginResolver, VehiclesResolver, VehicleTypesResolver } from 'src/app/shared/resolvers';

const routes: Routes = [
    {
        path: '',
        component: VehiclesComponent,
        data: { title: 'Lista pojazdów' },
        resolve: {
            vehicles: VehiclesResolver,
            regions: RegionsResolver,
            brands: BrandsResolver,
            vehicleTypes: VehicleTypesResolver,
            fuelTypes: FuelTypesResolver,
            origin: VehicleOriginResolver,
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
