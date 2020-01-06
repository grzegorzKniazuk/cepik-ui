import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const modules: any[] = [
    CommonModule,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        ...modules,
    ],
})
export class SharedModule {

}
