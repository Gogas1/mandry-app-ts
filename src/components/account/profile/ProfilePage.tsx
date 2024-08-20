import { useTranslation } from "react-i18next";

import '../../../styles/account/profile/profile-page.scss';

import profileIcon from '../../../assets/icons/profile/user-circle-stroke-rounded 1.svg';
import { Link } from "react-router-dom";

export default function ProfilePage() {
    const { t } = useTranslation();

    const name = 'Nikita';

    return (
        <div className="profile-page">
            <div className="profile-page-content">
                <div className="create-profile">
                    <div className="create-profile-panel">
                        <div className="panel-header">
                            {t('Profile.CreatePanel.Header')}
                        </div>
                        <div className="panel-body">
                            {t('Profile.CreatePanel.Body')}
                        </div>
                        <Link to={"/account/information"} className="panel-button">
                            {t('Profile.CreatePanel.Button')}
                        </Link>
                    </div>
                </div>
                <div className="profile-things">
                    <div className="main-info">
                        <div className="avatar">
                            <img src={profileIcon} alt="profile" />
                        </div>
                        <div className="name text">
                            {name}
                        </div>
                        <div className="status text">
                            {t('Profile.Status')}
                        </div>
                    </div>
                    <div className="verification">
                        <div className="verified-info">
                            <div className="verified-info-header">{t('Profile.Verification.ConfirmedInfoHeader')}</div>
                            <div className="verified-info-list">
                                <div className="verification-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                                        <path d="M17 1L6 12L1 7" stroke="#515151" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    {t('Profile.Verification.Email')}
                                </div>
                                <div className="verification-item">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="13" viewBox="0 0 18 13" fill="none">
                                        <path d="M17 1L6 12L1 7" stroke="#515151" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    {t('Profile.Verification.Email')}
                                </div>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="verification-start">
                            <div className="verification-start-header">{t('Profile.Verification.Header')}</div>
                            <div className="verification-start-body">{t('Profile.Verification.Body')}</div>                            
                            <Link to={'/account/verification'} className="verification-start-button">{t('Profile.Verification.Button')}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}