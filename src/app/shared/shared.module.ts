import { NgModule } from '@angular/core';
import { ButtonComponent, IconComponent, LoaderComponent, ModalComponent, PaginatorComponent, ToastComponent } from 'src/app/shared/components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooleanRadioControlComponent, DateControlComponent, RadioControlComponent, SelectControlComponent, TextControlComponent } from 'src/app/shared/value-accessors';
import { MaskPipe, YesNoPipe } from 'src/app/shared/pipes';

const entryComponents: any[] = [
    ToastComponent,
    ModalComponent,
];

const valueAccessors: any[] = [
    SelectControlComponent,
    RadioControlComponent,
    BooleanRadioControlComponent,
    DateControlComponent,
    TextControlComponent,
];

const components: any[] = [
    ...entryComponents,
    ...valueAccessors,
    PaginatorComponent,
    LoaderComponent,
    IconComponent,
    ButtonComponent,
];

const directives: any[] = [];

const pipes: any[] = [
    MaskPipe,
    YesNoPipe,
];

@NgModule({
    entryComponents: [
        ...entryComponents,
    ],
    declarations: [
        ...components,
        ...directives,
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
        ...directives,
        ...pipes,
    ],
})
export class SharedModule {
}
