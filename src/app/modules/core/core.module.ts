import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from 'src/app/modules/core/views';
import { CoreComponent } from './core.component';

@NgModule({
    declarations: [
        DashboardComponent,
        CoreComponent,
    ],
    imports: [
        CoreRoutingModule,
        SharedModule,
    ],
})
export class CoreModule {
}
