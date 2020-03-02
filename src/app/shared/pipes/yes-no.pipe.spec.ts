import { YesNoPipe } from 'src/app/shared/pipes/yes-no.pipe';

describe(YesNoPipe.name, () => {

    let pipe: YesNoPipe;

    beforeEach(() => {
        pipe = new YesNoPipe();
    });

    it('should return "Tak" for true value', () => {
        expect(pipe.transform(true)).toEqual('Tak');
    });

    it('should return "Nie" for false value', () => {
        expect(pipe.transform(false)).toEqual('Nie');
    });
});
