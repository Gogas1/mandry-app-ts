import '../../styles/pages/home/destination-popup.scss';

import arrowIcon from "../../assets/icons/meta/arrow.svg";
import loadingAnim from '../../assets/anim/loading.webm';

import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AuthContext from '../auth/AuthenticationContext';

interface PopupProps {
    isOpen: boolean;
    searchValue?: string;
    closeAll: () => void;
    assignValue: (value: string) => void;
}

export default function DestinationPopup({ isOpen, searchValue, closeAll, assignValue }: PopupProps) {
    const { t } = useTranslation();

    const [locationsList, setLocationsList] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchLocations = async () => {
            if(searchValue) {
                setLoading(true);

                try {
                    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/destinations/get?name=${searchValue}`;

                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });

                    if(response.ok) {
                        const data = await response.json();
                        if(data.destinations as string[]) {
                            setLocationsList(data.destinations);
                        }
                    }

                    setLoading(false);
                } 
                catch (error) {
                    setLoading(false);
                }
            }
        }

        fetchLocations();
    }, [searchValue]);

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
                        {loading ? (
                            <div className="location">
                                {t('Popups.Destinations.Loading')}
                            </div>
                        ) : locationsList.length > 0 ? 
                        (locationsList.map((loc, index) => (
                                <div key={index} className="location" onClick={() => handleSelection(loc)}>
                                    {loc}
                                </div>
                            ))
                        ) : 
                        (
                            <div className="location">
                                {t('Popups.Destinations.Empty')}
                            </div>
                        )}                        
                    </div>
                </div>
                <div className="popup-hide" onClick={closeAll}>
                    <img src={arrowIcon} alt="arrow" />
                </div>
            </div>
        </>
    )
}

// function generateTouristLocations(length: number): string[] {
//     const sampleData = [
//         "Париж, Франція",
//         "Лондон, Велика Британія",
//         "Рим, Італія",
//         "Токіо, Японія",
//         "Нью-Йорк, США",
//         "Барселона, Іспанія",
//         "Амстердам, Нідерланди",
//         "Сідней, Австралія",
//         "Ріо-де-Жанейро, Бразилія",
//         "Берлін, Німеччина",
//         "Дубай, ОАЕ",
//         "Пекін, Китай",
//         "Мехіко, Мексика",
//         "Кейптаун, ПАР",
//         "Стамбул, Туреччина",
//         "Мумбаї, Індія",
//         "Москва, Росія",
//         "Ванкувер, Канада",
//         "Бангкок, Таїланд",
//         "Куала-Лумпур, Малайзія",
//         "Каїр, Єгипет",
//         "Афіни, Греція",
//         "Венеція, Італія",
//         "Санкт-Петербург, Росія",
//         "Сан-Франциско, США",
//         "Сеул, Південна Корея",
//         "Буенос-Айрес, Аргентина",
//         "Прага, Чехія",
//         "Відень, Австрія",
//         "Гонконг, Китай",
//         "Сінгапур, Сінгапур",
//         "Лісабон, Португалія",
//         "Мадрид, Іспанія",
//         "Бангкок, Таїланд",
//         "Ханой, В'єтнам",
//         "Рейк'явік, Ісландія",
//         "Маракеш, Марокко",
//         "Лима, Перу",
//         "Київ, Україна"
//     ];

//     const result: string[] = [];
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * sampleData.length);
//         result.push(sampleData[randomIndex]);
//     }

//     return result;
// }