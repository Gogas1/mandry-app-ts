import { useTranslation } from "react-i18next";
import arrowIcon from "../../assets/icons/meta/arrow.svg";

import '../../styles/navbar/profile-links-popup.scss';

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}

export default function ProfileLinksPopup({ isOpen, closeAll }: PopupProps) {
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
        
    }

    const handleHelpTransition = () => {
        
    }

    const handleLogOut = () => {

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

                <div className="panel-item" onClick={handleFavsTransition}>
                    <div className="panel-text big">{t('NavbarPopupProfileLinksFavouritesLink')}</div>
                </div>

                <div className="divider"></div>

                <div className="panel-item" onClick={handleOfferHousingTransition}>
                    <div className="panel-text">{t('NavbarPopupProfileLinksOfferHousingLink')}</div>
                </div>

                <div className="panel-item" onClick={handleAccountTransition}>
                    <div className="panel-text">{t('NavbarPopupProfileLinksAccountLink')}</div>
                </div>

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