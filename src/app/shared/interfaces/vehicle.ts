import { Links } from 'src/app/shared/interfaces/links';
import { VehicleDetails } from 'src/app/shared/interfaces/vehicle-details';

export interface Vehicle {
    id: string;
    type: string;
    links: Pick<Links, 'self'>;
    attributes: VehicleDetails;
}
