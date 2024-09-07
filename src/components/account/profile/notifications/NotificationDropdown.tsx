import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";

import '../../../../styles/account/profile/notifications-dropdown.scss';
import messageIcon from '../../../../assets/icons/account/message.svg';
import pMessageIcon from '../../../../assets/icons/account/pointed-message.svg';
import suitcaseIcon from '../../../../assets/icons/account/suitcase.svg';
import handshakeIcon from '../../../../assets/icons/account/handshake.svg';


interface DropdownProps {
    isOpen: boolean;
    toggleDropdown: () => void;
    //handleItemClick: (value: string) => void;
}

export default function NotificationDropdown({ isOpen, toggleDropdown, /*handleItemClick*/ }: DropdownProps)  {
    const { t } = useTranslation();

    return (
        <div className={`notification-dropdown ${isOpen ? 'opened' : 'closed'}`}>
            <div className="content">
                <button className="element">
                    <img src={pMessageIcon} alt="p-message" />
                    {t('Notifications.NotificationsDropdown.Unread')}
                </button>
                <button className="element">
                    <img src={messageIcon} alt="message" />
                    {t('Notifications.NotificationsDropdown.All')}        
                </button>
                <button className="element">
                    <img src={suitcaseIcon} alt="suitcase" />
                    {t('Notifications.NotificationsDropdown.Travels')}
                </button>
                <button className="element">
                    <img src={handshakeIcon} alt="handshake" />
                    {t('Notifications.NotificationsDropdown.Support')}
                </button>
            </div>
        </div>
    )
}