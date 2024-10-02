import { useTranslation } from 'react-i18next';
import '../../../styles/account/profile/travels-page.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth/AuthenticationContext';
import FeatureService from '../../../helpers/FeatureService';

interface Reservations {
    id: string;
    from: string;
    to: string;
    code: string;
    price: string;
    housing: {
        name: string;
        image?: string;
    }
}

export default function TravelsPage() {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const [reservations, setReservations] = useState<Reservations[]>([]);

    document.title = t('Titles.TravelsPage');

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { isReady } = authContext;

    useEffect(() => {
        const fetchReservations = async () => {
            const token = authContext.authState.token;

            if (token && isReady) {
                try {
                    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/reservation/user-reservations";
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            "ngrok-skip-browser-warning": "true",
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();

                        if (data.hasReservations) {
                            setReservations(data.reservations);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching reservations", error);
                }
            }
        };

        fetchReservations();
    }, [isReady]);

    return (
        <div className='travels-page'>
            <div className='content-container'>

                <div className='header'>
                    {t('Travels.Header')}
                </div>
                {reservations.length > 0 ? (
                    <>
                        {reservations.length > 1 ? (    
                            <div className='travels-title'>{t('Travels.TitleMult')}</div>
                        ) : (
                            <div className='travels-title'>{t('Travels.TitleSing')}</div>
                        )}
                        {reservations.map((reservations, index) => (
                            <div className='reserv-item' key={index}>
                                <div className='reserv-item__content'>
                                    <div className='reserv-item-img'><img src={reservations.housing.image && FeatureService.getFeatureIcon(reservations.housing.image[0])}></img></div>
                                    <div className='reserv-item-info'>
                                        <div className='reserv-item-info__name'>{reservations.housing.name}</div> 
                                        <div className='reserv-item-info__date'>{`${reservations.from} - ${reservations.to}`}</div> 
                                        <div className='divider-blue'></div>
                                        <div className='reserv-item-info__price'>{t('Travels.Total')} {reservations.price}</div> 
                                        <div className='divider-blue'></div>
                                        <div className='reserv-item-info__code'>{t('Travels.Code')} {reservations.code}</div> 
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <div className='reservation-travels'>
                            {t('Travels.NoReserved')}
                        </div>
                        <div className='reservation-desc'>
                            {t('Travels.NoReservedDesc')}
                        </div>
                        <button className='start-search-button'
                            onClick={() => navigate('../../search')}
                        >
                            {t('Travels.StartSearch')}
                        </button>
                    </>
                )}

                <div className='divider' />
                <div className='cant-find-reserv'>
                    {reservations.length > 0 ? (
                            <div className='cf-header'>
                                {t('Travels.ResNotMatch')}
                            </div>
                        ) : (
                            <div className='cf-header'>
                                {t('Travels.CantFindRes')}
                            </div>
                        )}
                    <div className='to-faq'
                        onClick={() => navigate('../../help')}
                    >
                        {t('Travels.ToFAQ')}
                    </div>
                </div>
            </div>
        </div>
    )
}