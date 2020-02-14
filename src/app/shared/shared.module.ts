import { NgModule } from '@angular/core';
import { ArrowUpComponent, ButtonComponent, IconComponent, LoaderComponent, ModalComponent, NavBarComponent, PaginatorComponent, ToastComponent, ValidationErrorComponent } from 'src/app/shared/components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooleanRadioControlComponent, DateControlComponent, RadioControlComponent, SelectControlComponent, TextControlComponent } from 'src/app/shared/value-accessors';
import { MaskPipe, YesNoPipe } from 'src/app/shared/pipes';
import { ArrowUpDirective, LoadingBlurDirective, SortableDirective } from 'src/app/shared/directives';

const valueAccessors: any[] = [
    SelectControlComponent,
    RadioControlComponent,
    BooleanRadioControlComponent,
    DateControlComponent,
    TextControlComponent,
];

const components: any[] = [
    ...valueAccessors,
    PaginatorComponent,
    LoaderComponent,
    ButtonComponent,
    NavBarComponent,
    ValidationErrorComponent,
    ToastComponent,
    ModalComponent,
    IconComponent,
    ArrowUpComponent,
];

const directives: any[] = [
    LoadingBlurDirective,
    SortableDirective,
    ArrowUpDirective,
];

const pipes: any[] = [
    MaskPipe,
    YesNoPipe,
];

@NgModule({
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
