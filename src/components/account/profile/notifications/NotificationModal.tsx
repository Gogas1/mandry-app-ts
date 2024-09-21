import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

import '../../../../styles/account/profile/notification-modal.scss';

import drawerIcon from '../../../../assets/icons/account/drawer.svg';
import closeIcon from '../../../../assets/icons/meta/close-cross.svg';
import paperPlaneIcon from '../../../../assets/icons/account/paper-airplane.svg';

interface NotificationProps {
    hideModal: () => void;
    closeOverlay: () => void;
    handleArchive: (value: string) => void;
}

export default function NotificationModal({ hideModal, closeOverlay, handleArchive }: NotificationProps) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handeCloseModal = () => {
        hideModal();
        closeOverlay();
    }

    const handleArchiveClick = (value:string) => {
        handleArchive(value);
        hideModal();
        closeOverlay();
    }

    const handleFeedbackClick = () => {
        navigate('../../feedback');
        hideModal();
        closeOverlay();
    }

    return (
        <div className="notification-modal">
            <div className="notification-modal-panel">
                <div className="notification-modal-content">
                    <div className="notification-modal-header">{t('Notifications.NotificationsModal.Header')}</div>
                    <div className="divider"></div>
                    <div className="notification-modal-block"
                        onClick={() => handleArchiveClick('archive')}
                    >
                        <img className="drawer-icon" src={drawerIcon} 
                        />
                        {t('Notifications.NotificationsModal.Archive')}
                    </div>
                    <div className="notification-modal-block"
                        onClick={() => handleFeedbackClick()}
                    >
                        <img className="drawer-icon" src={paperPlaneIcon} />
                        {t('Notifications.NotificationsModal.Feedback')}
                    </div>
                </div>
            </div>
            <button className="notification-modal-close-button" onClick={handeCloseModal}>
                <img className="close-icon" src={closeIcon} />
            </button>
        </div>
    )
}