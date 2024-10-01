import { useTranslation } from 'react-i18next';
import '../../../styles/account/profile/travels-page.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth/AuthenticationContext';

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

    useEffect(() => {
        const fetchReservations = async () => {
            const token = authContext.authState.token;

            if (token) {
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
    }, []);

    return (
        <div className='travels-page'>
            <div className='content-container'>

                <div className='header'>
                    {t('Travels.Header')}
                </div>
                {reservations.length > 0 ? (
                    <>
                        {reservations.length > 1 ? (
                            <div className='travels-title'></div>
                        ) : (
                            <div className='travels-title'></div>
                        )}
                        {reservations.map((reservations, index) => (
                            <div className='reserv-item' key={index}>
                                
                            </div>
                        ))}
                    </>
                ) : (
                    <>
                        <div className='reservation-travels'>
                            {t('Travels.CantFindRes')}
                        </div>
                        <div className='reservation-desc'>
                            {t('Travels.NoReserved')}
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
                                {t('Travels.CantFindRes')}
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