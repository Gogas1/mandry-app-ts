
import personIcon from "../../assets/icons/navbar/person.svg";
import keyIcon from "../../assets/icons/navbar/key.svg";
import arrowIcon from "../../assets/icons/meta/arrow.svg";

import "../../styles/navbar/profile-popup.scss";

import { useTranslation } from "react-i18next";

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}

export default function ProfilePopup({ isOpen, closeAll }: PopupProps) {

    const { t } = useTranslation();

    return (
        <div id="profile-popup-wrapper" className={`${isOpen ? 'opened' : 'closed'}`}>
              <div id="profile-popup-border">
                
              </div>
              <div id="profile-popup-panel">
                <div className="panel-item">
                    <img src={personIcon} className="inner-icon" />
                    <div className="panel-text">{t('navGuest')}</div>
                </div>
                <div className="divider"></div>
                <div className="panel-item">
                    <img src={keyIcon} className="inner-icon" />
                    <div className="panel-text">{t('navOwner')}</div>
                </div>
            </div>
                
            <div id="profile-popup-hide" onClick={closeAll}>
                <img src={arrowIcon} alt="arrow" />
            </div>
        </div>
    );
} 