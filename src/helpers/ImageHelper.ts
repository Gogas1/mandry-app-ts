import BaliImage from '../assets/images/Bali.png';
import BarcelonaImage from '../assets/images/Barcelona.png';
import DubaiImage from '../assets/images/Dubai.png';
import RomeImage from '../assets/images/Rome.png';
import SidneyImage from '../assets/images/Sidney.png';
import TokyoImage from '../assets/images/Tokyo.png';

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