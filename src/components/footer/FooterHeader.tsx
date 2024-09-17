import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import NotificationSearch from '../account/profile/notifications/NotificationSearch';
import '../../styles/pages/footer/footer-header.scss'

interface HeaderProps {
    title: string;
    className?: string;
    breadcrumps?: string[];
}

export default function FooterHeader({title, className=''}: HeaderProps) {
    const { t } = useTranslation();

    return (
        <div className='footer-header'>
            <div className='header'>
                {t(title)}
                <NotificationSearch />
            </div>
            <div className='divider' />
        </div>
    )
}