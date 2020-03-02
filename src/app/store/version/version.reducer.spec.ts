import { SET_VERSION } from 'src/app/store/version/version.actions';
import { initialVersionState, versionReducer, VersionState } from 'src/app/store/version/version.reducer';

describe(versionReducer.name, () => {
    describe(SET_VERSION.type, () => {
        it('should set version', () => {
            const version: VersionState = {
                dateMod: '1',
                deprecated: '1',
                major: '1',
                minor: '1',
                patch: '1',
            };

            const action = SET_VERSION({ version });

            const state = versionReducer(initialVersionState, action);
            expect(state).toEqual(version);
        });
    });
});
