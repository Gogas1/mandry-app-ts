import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import NotificationSearch from '../account/profile/notifications/NotificationSearch';
import '../../styles/pages/footer/footer-header.scss'

export default function FooterHeader() {
    const { t } = useTranslation();

    return (
        <div className='footer-header'>
            <div className='header'>
                {t('MainPage.Sections.Footer.Pages.News.Header')}
                <NotificationSearch />
            </div>
            <div className='divider' />
        </div>
    )
}