import { useTranslation } from "react-i18next";
import arrowIcon from "../../assets/icons/meta/arrow.svg";

import '../../styles/navbar/profile-links-popup.scss';
import { useContext } from "react";
import AuthContext from "../auth/AuthenticationContext";
import { Link, useNavigate } from "react-router-dom";

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}

export default function ProfileLinksPopup({ isOpen, closeAll }: PopupProps) {
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { logout } = authContext;

    const { t } = useTranslation();

    const handleNotificationsTransition = () => {

    }

    const handleTravelsTransition = () => {

    }

    const handleFavsTransition = () => {
        
    }

    const handleOfferHousingTransition = () => {
        
    }
    
    const handleAccountTransition = () => {
        navigate('/account')
    }

    const handleHelpTransition = () => {
        
    }

    const handleLogOut = () => {
        logout();
        closeAll();
    }

    return (
        <div className={`profile-links-popup-wrapper ${isOpen ? 'opened' : 'closed'}`}>
            <div className="profile-links-popup-border"></div>
            <div className="profile-links-popup-panel">
                <div className="panel-item" onClick={handleNotificationsTransition}>
                    <div className="panel-text big">{t('NavbarPopupProfileLinksNotificationsLink')}</div>
                </div>
                
                <div className="panel-item" onClick={handleTravelsTransition}>
                    <div className="panel-text big">{t('NavbarPopupProfileLinksTravelsLink')}</div>
                </div>

                <Link to={'/account/favourites'} className="panel-item" onClick={handleFavsTransition}>
                    <div className="panel-text big">{t('NavbarPopupProfileLinksFavouritesLink')}</div>
                </Link>

                <div className="divider"></div>

                <div className="panel-item" onClick={handleOfferHousingTransition}>
                    <div className="panel-text">{t('NavbarPopupProfileLinksOfferHousingLink')}</div>
                </div>

                <Link to={'/account'} className="panel-item">
                    <div className="panel-text">{t('NavbarPopupProfileLinksAccountLink')}</div>
                </Link>

                <div className="divider"></div>

                <div className="panel-item" onClick={handleHelpTransition}>
                    <div className="panel-text">{t('NavbarPopupProfileLinksHelpLink')}</div>
                </div>

                <div className="panel-item" onClick={handleLogOut}>
                    <div className="panel-text">{t('NavbarPopupProfileLinksLogOut')}</div>
                </div>
            </div>
                
            <div className="profile-links-popup-hide" onClick={closeAll}>
                <img src={arrowIcon} alt="arrow" />
            </div>
        </div>
    );
}