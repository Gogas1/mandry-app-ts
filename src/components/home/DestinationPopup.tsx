import '../../styles/pages/home/destination-popup.scss';

import arrowIcon from "../../assets/icons/meta/arrow.svg";

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
    assignValue: (value: string) => void;
}

export default function DestinationPopup({ isOpen, closeAll, assignValue }: PopupProps) {
    const locations = generateTouristLocations(8);

    const handleSelection = (value: string) => {
        assignValue(value);
        closeAll();
    }

    return (
        <>
            <div className={`destination-popup ${isOpen ? 'opened' : 'closed'}`}>
                <div className="popup-border"></div>
                <div className="popup-panel">
                    <div className="list">
                        {locations.map((loc, index) => (
                            <div key={index} className="location" onClick={() => handleSelection(loc)}>
                                {loc}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="popup-hide" onClick={closeAll}>
                    <img src={arrowIcon} alt="arrow" />
                </div>
            </div>
        </>
    )
}

function generateTouristLocations(length: number): string[] {
    const sampleData = [
        "Париж, Франція",
        "Лондон, Велика Британія",
        "Рим, Італія",
        "Токіо, Японія",
        "Нью-Йорк, США",
        "Барселона, Іспанія",
        "Амстердам, Нідерланди",
        "Сідней, Австралія",
        "Ріо-де-Жанейро, Бразилія",
        "Берлін, Німеччина",
        "Дубай, ОАЕ",
        "Пекін, Китай",
        "Мехіко, Мексика",
        "Кейптаун, ПАР",
        "Стамбул, Туреччина",
        "Мумбаї, Індія",
        "Москва, Росія",
        "Ванкувер, Канада",
        "Бангкок, Таїланд",
        "Куала-Лумпур, Малайзія",
        "Каїр, Єгипет",
        "Афіни, Греція",
        "Венеція, Італія",
        "Санкт-Петербург, Росія",
        "Сан-Франциско, США",
        "Сеул, Південна Корея",
        "Буенос-Айрес, Аргентина",
        "Прага, Чехія",
        "Відень, Австрія",
        "Гонконг, Китай",
        "Сінгапур, Сінгапур",
        "Лісабон, Португалія",
        "Мадрид, Іспанія",
        "Бангкок, Таїланд",
        "Ханой, В'єтнам",
        "Рейк'явік, Ісландія",
        "Маракеш, Марокко",
        "Лима, Перу",
        "Київ, Україна"
    ];

    const result: string[] = [];
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * sampleData.length);
        result.push(sampleData[randomIndex]);
    }

    return result;
}