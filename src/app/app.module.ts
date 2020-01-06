import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { API_URL } from './shared/tokens';
import { environment } from '../environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashboardComponent } from 'src/app/views';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from 'src/app/store';
import { RUNTIME_CHECKS, STORE_ROUTER_CONNECTING_CONFIG } from 'src/app/shared/constants';

const components: any[] = [
    AppComponent,
    DashboardComponent,
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        StoreModule.forRoot(appReducers, { runtimeChecks: RUNTIME_CHECKS }),
        StoreRouterConnectingModule.forRoot(STORE_ROUTER_CONNECTING_CONFIG),
        EffectsModule.forRoot([]),
        environment.production ? [] : [ StoreDevtoolsModule.instrument() ],
    ],
    providers: [
        { provide: API_URL, useValue: environment.apiUrl },
    ],
    bootstrap: [
        AppComponent,
    ],
})
export class AppModule {
}
