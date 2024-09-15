import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import '../../../../styles/account/profile/notifications-dropdown.scss';
import messageIcon from '../../../../assets/icons/account/message.svg';
import pMessageIcon from '../../../../assets/icons/account/pointed-message.svg';
import suitcaseIcon from '../../../../assets/icons/account/suitcase.svg';
import handshakeIcon from '../../../../assets/icons/account/handshake.svg';


interface DropdownProps {
    isOpen: boolean;
    toggleDropdown: () => void;
    closeDropdown: () => void;
    assignCategory: (value: string) => void;
}

export default function NotificationDropdown({ isOpen, toggleDropdown, closeDropdown, assignCategory }: DropdownProps)  {
    const { t } = useTranslation();
    const navigate = useNavigate()

    const handleSelection = (value: string) => {
        assignCategory(value);
        closeDropdown();
    }

    return (
        <div className={`notification-dropdown ${isOpen ? 'opened' : 'closed'}`}>
            <div className="content">
                <button className="element"
                    onClick={() => handleSelection('unread')}
                >
                    <img src={pMessageIcon} alt="p-message" />
                    {t('Notifications.NotificationsDropdown.Unread')}
                </button>
                <button className="element"
                    onClick={() => handleSelection('all')}
                >
                    <img src={messageIcon} alt="message" />
                    {t('Notifications.NotificationsDropdown.All')}        
                </button>
                <button className="element"
                    onClick={() => navigate('../account/travels')}
                >
                    <img src={suitcaseIcon} alt="suitcase" />
                    {t('Notifications.NotificationsDropdown.Travels')}
                </button>
                <button className="element"
                    onClick={() => handleSelection('support')}
                >
                    <img src={handshakeIcon} alt="handshake" />
                    {t('Notifications.NotificationsDropdown.Support')}
                </button>
            </div>
        </div>
    )
}