import { useTranslation } from "react-i18next"

import crossIcon from '../../assets/icons/meta/close-cross.svg';

import "../../styles/navbar/favourites-popup.scss";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/AuthenticationContext";
import { Housing } from "../housing/HousingPage";
import FeatureService from "../../helpers/FeatureService";
import { Link } from "react-router-dom";

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}

export default function FavouritesPopup({ isOpen, closeAll }: PopupProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    
    const { authState, isReady } = authContext;
    const { t } = useTranslation();

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
                    setFavourites(data.housings as Housing[]);
                }
            }
            catch (error) {
                console.error(error);
            }
        }
        if(isReady && authState.isAuthenticated && isOpen) {
            fetchFavourites();
        }
    }, [isReady, authState.token, isOpen]);

    return (
        <>
            <div className={`favourites-popup ${isOpen ? 'opened' : 'closed'}`}>
                <div className="popup-border"></div>
                <div className="popup-panel">
                    <div className="favs-header">{t('FavouritesPopupHeader')}</div>
                    <div className="divider"></div>
                    {authState.isAuthenticated ? (
                        favourites.length === 0 ? (
                            <div className="no-items">
                                {t('FavouritesPopup.NoItems')}
                            </div>
                        ) : (
                            <div className="favourites-list">
                                {favourites.map((item, index) => (
                                    <Link to={`/housing/${item.id}`} className="list-item" key={index}>
                                        <img src={FeatureService.getFeatureIcon(item.images[0].src)} alt="Placeholder Image" />
                                        <div className="text">
                                            <div className="label">{item.name}</div>
                                            {/* <div className="count">({index + 1})</div> */}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )
                    ) : (
                        <div className="no-items">
                            {t('FavouritesPopup.AuthPlease')}
                        </div>
                    )}
                    
                    <div className="divider"></div>
                    <button className="create-list-popup">{t('CreateFavsListBtnText')}</button>
                </div>
                <div className="popup-hide" onClick={closeAll}>
                    <img src={crossIcon} alt="close"/>
                </div>
            </div>
        </>
    )
}