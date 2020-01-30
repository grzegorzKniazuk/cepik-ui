import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { VehicleCardComponent, VehiclesComponent, VehiclesQueryFilersComponent, VehiclesQueryOptionsComponent } from 'src/app/views';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from 'src/app/store';
import { API_URL, RUNTIME_CHECKS, STORE_ROUTER_CONNECTING_CONFIG } from 'src/app/shared/constants';
import { BrandsResolver, FuelTypesResolver, RegionsResolver, VehicleOriginResolver, VehiclesResolver, VehicleTypesResolver } from 'src/app/shared/resolvers';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor, HttpLoaderInterceptor } from 'src/app/shared/interceptors';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehiclesEffects } from 'src/app/store/vehicles/vehicles.effects';
import { VersionEffects } from 'src/app/store/version/version.effects';

const entryComponents: any[] = [
    VehiclesQueryOptionsComponent,
    VehicleCardComponent,
    VehiclesQueryFilersComponent,
];

const views: any[] = [
    AppComponent,
    VehiclesComponent,
];

const components: any[] = [
    ...entryComponents,
    ...views,
];

const store: any[] = [
    StoreModule.forRoot(appReducers, { runtimeChecks: RUNTIME_CHECKS }),
    StoreRouterConnectingModule.forRoot(STORE_ROUTER_CONNECTING_CONFIG),
    EffectsModule.forRoot([ VersionEffects, VehiclesEffects ]),
    environment.production ? [] : [ StoreDevtoolsModule.instrument() ],
];

const resolvers: any[] = [
    VehiclesResolver,
    RegionsResolver,
    BrandsResolver,
    VehicleTypesResolver,
    FuelTypesResolver,
    VehicleOriginResolver,
];

const interceptors: any[] = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true },
];

@NgModule({
    entryComponents: [
        ...entryComponents,
    ],
    declarations: [
        ...components,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        ...store,
    ],
    providers: [
        { provide: API_URL, useValue: environment.apiUrl },
        ...resolvers,
        ...interceptors,
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
