import { useTranslation } from 'react-i18next';
import '../../../styles/account/profile/travels-page.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth/AuthenticationContext';

export default function TravelsPage() {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);

    /*useEffect(() => {
        if(!authContext.authState.isAuthenticated) {
            navigate('/');
        }
    }, []);*/

    return (
        <div className='travels-page'>
            <div className='content-container'>
                <div className='header'>
                    {t('Travels.Header')}
                </div>
                <div className='reservation-travels'>
                    {t('Travels.CantFindRes')}
                </div>
                <div className='reservation-desc'>
                    {t('Travels.NoReserved')}
                </div>
                <button className='start-search-button'>
                    {t('Travels.StartSearch')}
                </button>
                <div className='divider'/>
                <div className='cant-find-reserv'>
                    <div className='cf-header'>
                        {t('Travels.CantFindRes')}
                    </div>
                    <div className='to-faq'>
                        {t('Travels.ToFAQ')}
                    </div>
                </div>
            </div>
        </div>
    )
}