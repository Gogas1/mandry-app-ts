import ACIcon from '../assets/icons/features/conditioner.svg';
import kitchenIcon from '../assets/icons/features/kitchen.svg';
import parkingIcon from '../assets/icons/features/parking.svg';
import tvIcon from '../assets/icons/features/tv.svg';
import washingIcon from '../assets/icons/features/washing.svg';
import wifiIcon from '../assets/icons/features/wifi.svg';

export default class FeatureService {
    static features: Feature[] = [
        {
            id: 'wifi',
            icon: wifiIcon,
            nameKey: "Features.Wifi"
        },
        {
            id: 'airconditioning',
            icon: ACIcon,
            nameKey: "Features.AC"
        },
        {
            id: 'kitchen',
            icon: kitchenIcon,
            nameKey: "Features.Kitchen"
        },
        {
            id: 'parking',
            icon: parkingIcon,
            nameKey: "Features.Parking"
        },
        {
            id: 'tv',
            icon: tvIcon,
            nameKey: "Features.TV"
        },
        {
            id: 'washing',
            icon: washingIcon,
            nameKey: "Features.Washing"
        }
    ];

    static getFeatures(): Feature[] {
        return this.features;
    }
}

export interface Feature {
    id: string;
    icon: string;
    nameKey: string;
}