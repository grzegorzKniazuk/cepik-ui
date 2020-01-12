import { NgModule } from '@angular/core';
import { IconComponent, LoaderComponent, NavBarComponent, PaginatorComponent, ToastComponent } from 'src/app/shared/components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooleanRadioControlComponent, RadioControlComponent, SelectControlComponent } from 'src/app/shared/value-accessors';

const entryComponents: any[] = [
    ToastComponent,
];

const valueAccessors: any[] = [
    SelectControlComponent,
    RadioControlComponent,
    BooleanRadioControlComponent,
];

const components: any[] = [
    ...entryComponents,
    ...valueAccessors,
    NavBarComponent,
    PaginatorComponent,
    LoaderComponent,
    IconComponent,
];

@NgModule({
    entryComponents: [
        ...entryComponents,
    ],
    declarations: [
        ...components,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        ...components,
    ],
})
export class SharedModule {
}
