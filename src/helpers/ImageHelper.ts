import BaliImage from '../assets/images/top-destinations/Bali.png';
import BarcelonaImage from '../assets/images/top-destinations/Barcelona.png';
import DubaiImage from '../assets/images/top-destinations/Dubai.png';
import RomeImage from '../assets/images/top-destinations/Rome.png';
import SidneyImage from '../assets/images/top-destinations/Sidney.png';
import TokyoImage from '../assets/images/top-destinations/Tokyo.png';

import FarmImage from '../assets/images/housings/farm.png';
import BoatImage from '../assets/images/housings/boat.png';
import CampImage from '../assets/images/housings/camp.png';
import CastleImage from '../assets/images/housings/castle.png';
import FlatImage from '../assets/images/housings/flat.png';
import HouseImage from '../assets/images/housings/house.png';

import HotelImage from '../assets/images/promotions/hotel.jpeg';
import KarpatyImage from '../assets/images/promotions/karpaty.jpeg';
import KlenImage from '../assets/images/promotions/klen.png';

import PoolImage from '../assets/images/accessbilities/pool.png';
import ACImage from '../assets/images/accessbilities/ac.png';
import GarageImage from '../assets/images/accessbilities/garage.png';
import PetsImage from '../assets/images/accessbilities/pets.png';
import TVImage from '../assets/images/accessbilities/tv.png';
import WashingImage from '../assets/images/accessbilities/washing.png';

export default class TopDestinationsHelper {
    static BaliInfo = 
    { 
        image: BaliImage, 
        name: "о. Балі, Індонезія",
        text: "Острів Балі, розташований в Індонезії, відомий своїми чарівними пляжами з білим піском та бірюзовими водами. Це місце славиться своєю..." 
    };

    static BarcelonaInfo = {
        image: BarcelonaImage,
        name: "Барселона, Іспанія",
        text: "Барселона - це динамічне місто на узбережжі Середземного моря, відоме своєю унікальною архітектурою та багатою культурною спадщин..."
    }

    static DubaiInfo = {
        image: DubaiImage,
        name: "Дубаї, ОАЕ",
        text: "Дубаї – це сучасне місто, яке відоме своїми розкішними хмарочосами, зокрема всесвітньо відомим Бурдж-Халіфа, найвищою будівлею у світі..."
    }

    static RomeInfo = {
        image: RomeImage,
        name: "Рим, Італія",
        text: "Рим – це місто з багатою історією, яке називають \"вічним містом\" через його неперервний вплив на культуру та архітектуру протягом тисячоліть. ..."
    }

    static SidneyInfo = {
        image: SidneyImage,
        name: "Сідней, Австралія",
        text: "Сучасний мегаполіс з високими хмарочосами, розкішними торговими центрами та унікальною архітектурою, що приваблює мільйони туристів."
    }

    static TokyoInfo = {
        image: TokyoImage,
        name: "Токіо, Японія",
        text: "Токіо – це столиця Японії, яка поєднує в собі стародавні традиції та ультрасучасні технології. Місто відоме своїми неоновими вивісками, високо..."
    }
}

export class HousingsImageHelper {
    static BoatHInfo = {
        image: BoatImage,
        name: 'Будинок на воді'
    };
    
    static CampingHInfo = {
        image: CampImage,
        name: 'Глемпінг'
    };

    static FarmHInfo = {
        image: FarmImage,
        name: 'Фермерський будинок'
    };

    static HouseHInfo = {
        image: HouseImage,
        name: 'Будинок'
    };

    static FlatHInfo = {
        image: FlatImage,
        name: 'Квартира'
    };

    static CastleInfo = {
        image: CastleImage,
        name: 'Замок'
    };
}

export class PromotionsImageHelper {
    static KlenInfo = {
        image: KlenImage,
        name: 'Готель “Klen”'
    };
    
    static HotelInfo = {
        image: HotelImage,
        name: 'Готель “ Carpathian Luxe Resort”'
    };

    static KarpatyInfo = {
        image: KarpatyImage,
        name: 'Готель “Карпати”'
    };
}

export class AccessbImageHelper {
    static ACInfo = {
        image: ACImage,
        name: 'Кондиціонер'
    };
    
    static GarageInfo = {
        image: GarageImage,
        name: 'Гараж'
    };

    static PetsInfo = {
        image: PetsImage,
        name: 'Тварини'
    };

    static PoolInfo = {
        image: PoolImage,
        name: 'Басейн'
    };

    static TVInfo = {
        image: TVImage,
        name: 'ТВ'
    };

    static WashingInfo = {
        image: WashingImage,
        name: 'Пральна машина'
    };
}