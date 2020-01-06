import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { API_URL } from './shared/tokens';
import { environment } from '../environments/environment';
import { CoreModule } from 'src/app/modules/core/core.module';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CoreModule,
        AppRoutingModule,
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
