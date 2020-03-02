import { MaskPipe } from 'src/app/shared/pipes/mask.pipe';

describe(MaskPipe.name, () => {

    let pipe: MaskPipe;

    beforeEach(() => {
        pipe = new MaskPipe();
    });

    it('should return undefined for undefined value', () => {
        expect(pipe.transform(undefined, '')).toBeUndefined();
    });

    it('should append given mask to input value', () => {
        expect(pipe.transform('20200228', 'xxxx-xx-xx')).toEqual('2020-02-28');
    });
});
