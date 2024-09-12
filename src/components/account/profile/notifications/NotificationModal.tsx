import { useTranslation } from "react-i18next";

import { useModal } from "../../../app/ModalContext";

import { useEffect, useState } from "react";

import '../../../../styles/account/profile/notification-modal.scss';

import drawerIcon from '../../../../assets/icons/account/drawer.svg';
import paperPlaneIcon from '../../../../assets/icons/account/paper-airplane.svg';

interface NotificationProps {
    hideModal: () => void;
}

export default function NotificationModal({ hideModal }: NotificationProps) {
    const { t } = useTranslation();

    return (
        <div className="border">
            <div className="notification-modal-panel">
                <div className="notification-modal-content">
                    <p className="notification-model-header">{t('Notifications.NotificationsModal.Header')}</p>
                    <div className="divider"></div>
                    <div className="notification-model-archive">
                        <img className="drawer-icon" src={drawerIcon} />
                        {t('Notifications.NotificationsModal.Archive')}
                    </div>
                    <div className="feedback">
                        <img className="drawer-icon" src={paperPlaneIcon} />
                        {t('Notifications.NotificationsModal.Feedback')}
                    </div>
                </div>
            </div>
            <button className="notification-modal-close-button" onClick={hideModal}>
            1
            </button>
        </div>
    )
}