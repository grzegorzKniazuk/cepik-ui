import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, StatisticsComponent, VehiclesComponent } from 'src/app/views';
import { BrandsResolver, DrivingLicensesStatisticsResolver, FuelTypesResolver, PermissionsStatisticsResolver, RegionsResolver, VehicleOriginResolver, VehiclesResolver, VehicleTypesResolver } from 'src/app/shared/resolvers';

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
            brands: BrandsResolver,
            vehicleTypes: VehicleTypesResolver,
            fuelTypes: FuelTypesResolver,
            origin: VehicleOriginResolver,
        },
        runGuardsAndResolvers: 'always',
    },
    {
        path: 'statistics',
        component: StatisticsComponent,
        data: { title: 'Statystyki' },
        resolve: {
            drivingLicenses: DrivingLicensesStatisticsResolver,
            permissions: PermissionsStatisticsResolver,
        },
        runGuardsAndResolvers: 'always'
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
