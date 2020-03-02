import { selectVehicle, selectVehicles } from 'src/app/store/vehicles/vehicles.selectors';
import { Dictionary } from '@ngrx/entity';
import { Vehicle, VehicleDetails } from 'src/app/shared/interfaces';

describe('vehicles selectors', () => {

    const mockedVehiclesState: Dictionary<Vehicle | { attributes: Partial<VehicleDetails> }> = {
        'sample-id-1': {
            id: 'sample-id-1',
            type: 'sample type',
            attributes: {
                marka: 'marka 1',
                model: 'model 1',
            },
            links: null,
        },
        'sample-id-2': {
            id: 'sample-id-2',
            type: 'sample type',
            attributes: {
                marka: 'marka 2',
                model: 'model 2',
            },
            links: null,
        },
        'sample-id-3': {
            id: 'sample-id-3',
            type: 'sample type',
            attributes: {
                marka: 'marka 3',
                model: 'model 3',
            },
            links: null,
        },
    };

    describe('selectVehicle', () => {
        it('should return vehicle details by given id', () => {
            expect(selectVehicle.projector(mockedVehiclesState, { id: 'sample-id-1' })).toEqual({
                marka: 'marka 1',
                model: 'model 1',
            });
        });
    });

    describe('selectVehicles', () => {
        it('should return vehicles array by given ids', () => {
            expect(selectVehicles.projector(mockedVehiclesState, { ids: [ 'sample-id-1', 'sample-id-2' ] })).toEqual([
                {
                    id: 'sample-id-1',
                    type: 'sample type',
                    attributes: {
                        marka: 'marka 1',
                        model: 'model 1',
                    },
                    links: null,
                },
                {
                    id: 'sample-id-2',
                    type: 'sample type',
                    attributes: {
                        marka: 'marka 2',
                        model: 'model 2',
                    },
                    links: null,
                },
            ]);
        });
    });
});
