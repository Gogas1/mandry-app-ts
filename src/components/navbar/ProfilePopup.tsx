
import personIcon from "../../assets/icons/navbar/person.svg";
import keyIcon from "../../assets/icons/navbar/key.svg";
import arrowIcon from "../../assets/icons/meta/arrow.svg";

import "../../styles/navbar/profile-popup.scss";

import { useTranslation } from "react-i18next";
import { useModal } from "../app/ModalContext";
import AuthModal from "../auth/AuthModal";
import { CSSProperties } from "react";

interface PopupProps {
    isOpen: boolean;
    style?: CSSProperties;
    closeAll: () => void;
}

export default function ProfilePopup({ isOpen, style, closeAll }: PopupProps) {

    const { t } = useTranslation();
    const { openModal, closeModal } = useModal();

    const handleClick = () => {
        // showModal((hideModal) => <AuthModal hideModal={hideModal} />);
        openModal('signin', <AuthModal hideModal={() => closeModal('signin')} />);
        closeAll();
    }

    return (
        <div id="profile-popup-wrapper" className={`${isOpen ? 'opened' : 'closed'}`} style={style}>
              <div id="profile-popup-border">
                
              </div>
              <div id="profile-popup-panel">
                <div className="panel-item" onClick={handleClick}>
                    <img src={personIcon} className="inner-icon" />
                    <div className="panel-text">{t('navGuest')}</div>
                </div>
                <div className="divider"></div>
                <div className="panel-item" onClick={handleClick}>
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