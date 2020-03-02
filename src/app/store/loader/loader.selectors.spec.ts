import { selectPageData } from 'src/app/store/loader/loader.selectors';
import { LoaderState } from 'src/app/store/loader/loader.reducer';

describe('loader selectors', () => {

    const mockLoaderState: LoaderState = {
        enabled: false,
        loadedPages: {
            'sample/url/1': {
                meta: {
                    count: 0,
                    'json-ld-id': '',
                    schema: '',
                    'dc:title': '',
                    'schema:provider': '',
                    'dc:description': '',
                    'dc:language': '',
                    'sy:updatePeriod': '',
                    'sy:updateFrequency': '',
                    'sy:updateBase': '',
                    'schema:contentType': '',
                    'schema:isPartOf': '',
                    'dc:rights': '',
                    'schema:keywords': '',
                },
                links: {},
                data: [],
            },
        },
    };

    describe('selectPageData', () => {
        it('should return undefined if page not exists in store', () => {
            expect(selectPageData.projector(mockLoaderState, { url: 'sample/url/2' })).toBeUndefined();
        });

        it('should return page data if page exists in store', () => {
            expect(selectPageData.projector(mockLoaderState, { url: 'sample/url/1' })).toBeTruthy();
        });
    });
});
