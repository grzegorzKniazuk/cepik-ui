import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from 'src/app/shared/components';
import { HttpClientModule } from '@angular/common/http';

const components: any[] = [
    NavBarComponent,
];

const modules: any[] = [
    CommonModule,
    HttpClientModule,
];

@NgModule({
    declarations: [
        ...components,
    ],
    imports: [
        ...modules,
    ],
    exports: [
        ...modules,
        NavBarComponent,
    ],
})
export class SharedModule {

}
