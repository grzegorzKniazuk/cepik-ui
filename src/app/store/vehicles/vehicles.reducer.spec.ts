import { initialVehiclesState, vehiclesReducer, VehiclesState } from 'src/app/store/vehicles/vehicles.reducer';
import { ADD_ONE_VEHICLE, UPSERT_MANY_VEHICLES } from 'src/app/store/vehicles/vehicles.actions';

describe(vehiclesReducer.name, () => {

    describe(ADD_ONE_VEHICLE.type, () => {
        it('should add vehicle item into store', () => {
            const action = ADD_ONE_VEHICLE({
                vehicle: {
                    id: 'sample-id-1',
                    type: 'vehicle type 1',
                    links: {
                        self: 'self link',
                    },
                    attributes: {},
                },
            });

            const state = vehiclesReducer(initialVehiclesState, action);
            const expectedState: VehiclesState = {
                ids: [ 'sample-id-1' ],
                entities: {
                    'sample-id-1': {
                        id: 'sample-id-1',
                        type: 'vehicle type 1',
                        links: {
                            self: 'self link',
                        },
                        attributes: {},
                    },
                },
            };

            expect(state).toEqual(expectedState);
        });
    });

    describe(UPSERT_MANY_VEHICLES.type, () => {
        it('should upsert many vehicles in store', () => {
            const action = UPSERT_MANY_VEHICLES({
                vehicles: [
                    {
                        id: 'sample-id-1',
                        type: 'vehicle type 1',
                        links: {
                            self: 'self link',
                        },
                        attributes: {},
                    },
                    {
                        id: 'sample-id-2',
                        type: 'vehicle type 2',
                        links: {
                            self: 'self link',
                        },
                        attributes: {},
                    },
                ],
            });

            const state = vehiclesReducer(initialVehiclesState, action);
            const expectedState: VehiclesState = {
                ids: [ 'sample-id-1', 'sample-id-2' ],
                entities: {
                    'sample-id-1': {
                        id: 'sample-id-1',
                        type: 'vehicle type 1',
                        links: {
                            self: 'self link',
                        },
                        attributes: {},
                    },
                    'sample-id-2': {
                        id: 'sample-id-2',
                        type: 'vehicle type 2',
                        links: {
                            self: 'self link',
                        },
                        attributes: {},
                    },
                },
            };

            expect(state).toEqual(expectedState);
        });
    });
});
