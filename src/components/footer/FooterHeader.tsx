import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import NotificationSearch from '../account/profile/notifications/NotificationSearch';
import '../../styles/pages/footer/footer-header.scss'

interface HeaderProps {
    title: string;
    className?: string;
    breadcrumbs?: string[];
}

export default function FooterHeader({ title, className = '', breadcrumbs = [] }: HeaderProps) {
    const { t } = useTranslation();

    return (
        <div className='footer-header'>
            <div className='header'>
                {t(title)}
                <NotificationSearch />
            </div>
            <div className='divider' />
            <div className='breadcrumbs'>
                {breadcrumbs.map((item, index) => (
                    <>
                        <span className='breadcrumb'>
                            {item}
                        </span>
                        {index < breadcrumbs.length - 1 && `-`}
                    </>
                ))}
            </div>
        </div>
    )
}