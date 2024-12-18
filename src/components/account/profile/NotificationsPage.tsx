import { useTranslation } from 'react-i18next';
import '../../../styles/account/profile/profile-notifications-page.scss';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../auth/AuthenticationContext';
import { useModal } from "../../app/ModalContext";

import NotivicationSearch from './notifications/NotificationSearch';
import NotificationDropdown from './notifications/NotificationDropdown';
import NotificationModal from './notifications/NotificationModal';

import arrowIcon from '../../../assets/icons/account/arrow-bottom.svg';
import messageIcon from '../../../assets/icons/account/message.svg';


export default function NotificationsPage() {
    const { t } = useTranslation();
    const authContext = useContext(AuthContext);
    const [openedDropdown, setOpenedDropdown] = useState('');
    const [sortCategory, setSortCategory] = useState('');
    const [overlay, showOverlay] = useState(false);
    const { openModal, closeModal } = useModal();

    document.title = t('Titles.NotificationsPage');

    const toggleDropdown = () => {
        if (openedDropdown === '') {
            setOpenedDropdown('notificationDropdown');
        }
        else {
            setOpenedDropdown('');
        }
    };

    const closeDopdown = () => {
        setOpenedDropdown('');
    };

    const handleSortCategory = (value: string) => {
        setSortCategory(value);
    };

    const clearSortCategory = () => {
        setSortCategory('');
    }

    const closeOverlay = () => {
        showOverlay(false);
    }

    const handleNotificationModal = () => {
        openModal('settings', <NotificationModal hideModal={() => closeModal('settings')} closeOverlay={closeOverlay} handleArchive={handleSortCategory} />)
        showOverlay(true);
    }

    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const navigate = useNavigate()

    useEffect(() => {
        if(!authContext.authState.isAuthenticated) {
            navigate('/');
        }
    }, []);

    return (
        <>
            {overlay&&(<div className='overlay'></div>)}
            <div className='notifications-page'>
                <div className='content-container'>
                    <div className='notifications'>
                        <div className='notifications-content'>
                            <div className='notifications-header'>
                                <div className='button-allnot'>
                                {t('Notifications.NotificationsList.Header')}
                                <button className='dropdown-button'
                                    onClick={toggleDropdown}
                                ><img src={arrowIcon} alt="arrow" /></button>
                                <NotificationDropdown
                                    isOpen={openedDropdown === 'notificationDropdown'}
                                    toggleDropdown={toggleDropdown}
                                    closeDropdown={closeDopdown}
                                    assignCategory={handleSortCategory}
                                />
                                </div>
                                <button className='settings-button'
                                    onClick={handleNotificationModal}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M20 6H10M10 6C10 5.46957 9.78929 4.96086 9.41421 4.58579C9.03914 4.21071 8.53043 4 8 4C7.46957 4 6.96086 4.21071 6.58579 4.58579C6.21071 4.96086 6 5.46957 6 6M10 6C10 6.53043 9.78929 7.03914 9.41421 7.41421C9.03914 7.78929 8.53043 8 8 8C7.46957 8 6.96086 7.78929 6.58579 7.41421C6.21071 7.03914 6 6.53043 6 6M6 6H4M20 12H18M18 12C18 11.4696 17.7893 10.9609 17.4142 10.5858C17.0391 10.2107 16.5304 10 16 10C15.4696 10 14.9609 10.2107 14.5858 10.5858C14.2107 10.9609 14 11.4696 14 12M18 12C18 12.5304 17.7893 13.0391 17.4142 13.4142C17.0391 13.7893 16.5304 14 16 14C15.4696 14 14.9609 13.7893 14.5858 13.4142C14.2107 13.0391 14 12.5304 14 12M14 12H4M20 18H10M10 18C10 17.4696 9.78929 16.9609 9.41421 16.5858C9.03914 16.2107 8.53043 16 8 16C7.46957 16 6.96086 16.2107 6.58579 16.5858C6.21071 16.9609 6 17.4696 6 18M10 18C10 18.5304 9.78929 19.0391 9.41421 19.4142C9.03914 19.7893 8.53043 20 8 20C7.46957 20 6.96086 19.7893 6.58579 19.4142C6.21071 19.0391 6 18.5304 6 18M6 18H4" stroke="#515151" stroke-linecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <NotivicationSearch />
                            <div className='no-notifications'>
                                <img src={messageIcon} className='message-icon' />
                                <div className='no-notifications-text'>{t('Notifications.NotificationsList.NoNotification')}</div>
                                <div className='no-notifications-description'>{t('Notifications.NotificationsList.NoNotificationDescription')}</div>
                            </div>
                            {sortCategory && (
                                <div className='clear-sort'>
                                    <button className='clear-sort-button'
                                        onClick={clearSortCategory}
                                    >{t('Notifications.NotificationsList.ClearSort')}</button>
                                </div>)}
                        </div>
                    </div>
                    <div className='mid'>

                    </div>
                    <div className='details'>
                        <div className='details-content'>
                            <div className='details-header'>
                                {t('Notifications.DetailsList.Header')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}