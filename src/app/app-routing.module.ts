import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent, DictionariesComponent } from 'src/app/views';
import { DictionaryIdsResolver, DictionaryItemsResolver } from 'src/app/resolvers';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        data: { title: 'Strona główna' },
    },
    {
        path: 'dictionaries',
        component: DictionariesComponent,
        data: { title: 'Słowniki' },
        resolve: {
            dictionaryIds: DictionaryIdsResolver,
            dictionaryItems: DictionaryItemsResolver,
        },
        runGuardsAndResolvers: 'always',
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            onSameUrlNavigation: 'reload',
            paramsInheritanceStrategy: 'always',
        }),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {
}
