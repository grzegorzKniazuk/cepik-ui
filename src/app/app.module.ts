import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { API_URL } from './shared/tokens';
import { environment } from '../environments/environment';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { DashboardComponent, DictionariesComponent } from 'src/app/views';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from 'src/app/store';
import { RUNTIME_CHECKS, STORE_ROUTER_CONNECTING_CONFIG } from 'src/app/shared/constants';
import { DictionaryIdsResolver, DictionaryItemsResolver } from 'src/app/resolvers';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpErrorInterceptor, HttpLoaderInterceptor } from 'src/app/shared/interceptors';

const components: any[] = [
    AppComponent,
    DashboardComponent,
    DictionariesComponent,
];

const store: any[] = [
    StoreModule.forRoot(appReducers, { runtimeChecks: RUNTIME_CHECKS }),
    StoreRouterConnectingModule.forRoot(STORE_ROUTER_CONNECTING_CONFIG),
    EffectsModule.forRoot([]),
    environment.production ? [] : [ StoreDevtoolsModule.instrument() ],
];

const resolvers: any[] = [
    DictionaryIdsResolver,
    DictionaryItemsResolver,
];

const interceptors: any[] = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpLoaderInterceptor, multi: true },
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        SharedModule,
        AppRoutingModule,
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
