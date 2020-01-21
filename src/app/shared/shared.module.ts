import { NgModule } from '@angular/core';
import { ButtonComponent, IconComponent, LoaderComponent, ModalComponent, NavBarComponent, PaginatorComponent, ToastComponent } from 'src/app/shared/components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooleanRadioControlComponent, DateControlComponent, RadioControlComponent, SelectControlComponent } from 'src/app/shared/value-accessors';
import { MaskPipe } from 'src/app/shared/pipes';

const entryComponents: any[] = [
    ToastComponent,
    ModalComponent,
];

const valueAccessors: any[] = [
    SelectControlComponent,
    RadioControlComponent,
    BooleanRadioControlComponent,
    DateControlComponent,
];

const components: any[] = [
    ...entryComponents,
    ...valueAccessors,
    NavBarComponent,
    PaginatorComponent,
    LoaderComponent,
    IconComponent,
    ButtonComponent,
];

const pipes: any[] = [
    MaskPipe,
];

@NgModule({
    entryComponents: [
        ...entryComponents,
    ],
    declarations: [
        ...components,
        ...pipes,
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
        ...pipes,
    ],
})
export class SharedModule {
}
