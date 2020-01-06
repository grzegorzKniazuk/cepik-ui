import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const modules: any[] = [
    CommonModule,
];

@NgModule({
    imports: [
        ...modules,
    ],
    exports: [
        ...modules,
    ],
})
export class SharedModule {

}
