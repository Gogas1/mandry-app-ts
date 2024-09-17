import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import NotificationSearch from '../account/profile/notifications/NotificationSearch';

import FooterSection from '../home/FooterSection';
import FooterHeader from './FooterHeader';
import '../../styles/pages/footer/footer-contacts.scss'

export default function ContactsPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className='contact-page'>
            <div className='content-container'>
                <FooterHeader title='MainPage.Sections.Footer.Pages.Contacts.Header' />
            </div>
            <FooterSection />
        </div>
    )
}