import { HIDE_LOADER, SET_LOADED_PAGE_DATA, SHOW_LOADER } from 'src/app/store/loader/loader.actions';
import { initialLoaderState, loaderReducer } from 'src/app/store/loader/loader.reducer';

describe(loaderReducer.name, () => {
    describe(SHOW_LOADER.type, () => {
        it('should set enabled flag to true', () => {
            const action = SHOW_LOADER();

            const newState = loaderReducer(initialLoaderState, action);
            const expectedState = { ...initialLoaderState, enabled: true };

            expect(newState).toEqual(expectedState);
        });
    });
    describe(HIDE_LOADER.type, () => {
        it('should set enabled flag to false', () => {
            const action = HIDE_LOADER();

            const newState = loaderReducer({ enabled: true, loadedPages: {} }, action);
            const expectedState = { enabled: false, loadedPages: {} };

            expect(newState).toEqual(expectedState);
        });
    });
    describe(SET_LOADED_PAGE_DATA.type, () => {
        it('should store loaded page data', () => {
            const mockPageData = {
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
                data: [ 'sample data 1', 'sample data 2' ],
            };

            const action = SET_LOADED_PAGE_DATA({ url: 'sample/url/2', data: mockPageData });

            const state = loaderReducer(initialLoaderState, action);
            const expectedState = { enabled: false, loadedPages: { 'sample/url/2': mockPageData } };

            expect(state).toEqual(expectedState);
        });
    });
});
