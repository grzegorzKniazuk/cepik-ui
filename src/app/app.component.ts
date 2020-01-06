import { Component } from '@angular/core';
import { CepikDictionaryService } from 'src/app/shared/services/cepik-dictionary.service';

@Component({
    selector: 'cpk-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent {

    constructor(
        private readonly cepikApiService: CepikDictionaryService,
    ) {
        this.cepikApiService.getDictionaries().subscribe(console.log);
        this.cepikApiService.getDictionary('wojewodztwa').subscribe(console.log);
    }
}
