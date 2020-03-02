import { UuidService } from 'src/app/shared/services/uuid.service';

describe(UuidService.name, () => {

    let service: UuidService;

    beforeEach(() => {
        service = new UuidService();
    });

    it(`${UuidService.generate.name}() should return new uuid`, () => {
        const spy = spyOn(service, 'generate').and.returnValue('e651a4c3-2d7c-49e5-8450-4d38f38658ae');

        expect(service.generate()).toMatch('e651a4c3-2d7c-49e5-8450-4d38f38658ae');
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
