import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from 'src/app/modules/core/views';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        SharedModule,
        RouterModule,
    ],
})
export class CoreModule {
}
