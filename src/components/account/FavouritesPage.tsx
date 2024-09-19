import { useTranslation } from 'react-i18next';
import '../../styles/account/favourites-page.scss';
import { Link } from 'react-router-dom';

import heartFilled from "../../assets/icons/meta/heart-filled.svg";
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthenticationContext';
import { Housing } from '../housing/HousingPage';
import FeatureService from '../../helpers/FeatureService';

export default function FavouritesPage() {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { authState, isReady } = authContext;

    const [favourites, setFavourites] = useState<Housing[]>([]);

    useEffect(() => {
        const fetchFavourites = async () => {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/favourites/get";

            try {
                const response = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'ngrok-skip-browser-warning': 'true',
                        'Authorization': `Bearer ${authState.token}`
                    }
                });
                if(response.ok) {
                    const data = await response.json();
                    console.log(data.housings as Housing[]);
                    setFavourites(data.housings as Housing[]);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        if(isReady) {
            fetchFavourites();
        }
    }, [isReady]);

    const { t } = useTranslation();

    document.title = t('Titles.FavouritesPage');
    
    console.log(favourites);

    return (
        <>
            <div className="favourites-page">
                <div className="favourites-page-content">
                    <div className="top-content">
                        <h1 className='caption'>{t('FavsPage.Caption')}</h1>
                        <Link to={'/account/favourites/edit'}>
                            {t('FavsPage.Edit')}
                        </Link>
                    </div>
                    <div className="favourites-list">
                        {favourites.map((item, index) => (
                            <div className='fav-item' key={index}>
                                <Link to={`/housing/${item.id}`} className='image-container'>
                                    <img className='image' src={item.images && FeatureService.getFeatureIcon(item.images[0].src)} />
                                </Link>
                                <div className='labels'>
                                    <label>{item.name}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}