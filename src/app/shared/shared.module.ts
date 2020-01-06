import { NgModule } from '@angular/core';
import { NavBarComponent, PaginatorComponent } from 'src/app/shared/components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const components: any[] = [
    NavBarComponent,
    PaginatorComponent,
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
    ],
    exports: [
        ...components,
    ],
})
export class SharedModule {
}
