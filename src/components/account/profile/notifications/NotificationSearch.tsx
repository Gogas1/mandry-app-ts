import { useTranslation } from 'react-i18next';
import '../../../../styles/account/profile/notification-search.scss';
// import { useContext, useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

import searchIcon from '../../../../assets/icons/account/search.svg';

export default function NotificationsSearch() {
    const { t } = useTranslation();

    // const navigate = useNavigate();

    // const handleSearch = () => {
        
    // }

    return (
        <div className='search-field'>
            <input type="text" placeholder={t('Notifications.NotificationsList.SearchPlaceholder')} className='input-field'/>
            <img src={searchIcon} className='search-icon'/>
        </div>
    )
}