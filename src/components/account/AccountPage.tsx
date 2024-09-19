import { useTranslation } from 'react-i18next';
import '../../styles/account/account-page.scss';
import { Link } from 'react-router-dom';

import loadingGif from '../../assets/anim/loading2.gif';
import credentialIcon from '../../assets/icons/account/credentials.svg';
import dataIcon from '../../assets/icons/account/data.svg';
import giftsIcon from '../../assets/icons/account/gifts.svg';
import paymentIcon from '../../assets/icons/account/payment.svg';
import securityIcon from '../../assets/icons/account/security.svg';
import settingsIcon from '../../assets/icons/account/settings.svg';
import sharingIcon from '../../assets/icons/account/sharing.svg';
import skongIcon from '../../assets/icons/account/skong.svg';
import tableIcon from '../../assets/icons/account/table.svg';
import walletIcon from '../../assets/icons/account/wallet.svg';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../auth/AuthenticationContext';

interface UserData {
    id: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
}

export default function AccountPage() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { t } = useTranslation();
    const { isReady } = authContext;

    document.title = t('Titles.AccountPage');

    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserData>({ id: '', name: 'loading...', surname: 'loading...', email: 'loading...', phone: 'loading...' } as UserData);

    useEffect(() => {
        const fetchData = async () => {
            const token = authContext.authState.token;

            if (token && isReady) {
                try {
                    const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/a/data";

                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });

                    if (response.ok) {
                        const data = await response.json();

                        if (data.userData) {
                            const uData = data.userData;

                            setUserData({ id: uData.id, name: uData.name, surname: uData.surname, email: uData.email, phone: uData.phone } as UserData)
                        }
                    }
                }
                catch (error) {
                    console.log(error);
                }

                setLoading(false);
            }
        }

        fetchData();
    }, [isReady]);

    return (
        <div className="account-page">
            <div className='account-page-content'>
                {loading ? (
                    <div className='page-loading'>
                        <img src={loadingGif} />
                    </div>
                ) : (
                    <>
                        <div className='page-header'>{t('AccountPageHeader')}</div>
                        <div className='account-data'>
                            <div className='name-surname email'>
                                {userData.name} {userData.surname}, {userData.email}
                            </div>
                            <div className='profile-link'>
                                <Link to={`/account/profile/my`}>
                                    {t('AccountPageProfileLink')}
                                </Link>
                            </div>
                        </div>
                        <div className='panel-links'>
                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={credentialIcon} alt='credentials' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageCredentialsLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageCredentialsBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={securityIcon} alt='security' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageSecurityLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageSecurityBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={paymentIcon} alt='payments' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPagePaymentsLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPagePaymentsBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={sharingIcon} alt='sharing' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageSharingLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageSharingBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={walletIcon} alt='taxes' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageTaxesLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageTaxesBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={skongIcon} alt='notifications' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageNotificationsLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageNotificationsBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={settingsIcon} alt='settings' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageSettingsLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageSettingsBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={dataIcon} alt='data' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageDataLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageDataBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={tableIcon} alt='travel' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageTravelLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageTravelBodyText')}
                                </div>
                            </div>

                            <div className='panel-link'>
                                <div className='panel-link-header'>
                                    <img className='panel-link-header-icon' src={giftsIcon} alt='bonuses' />
                                    <div className='panel-link-header-lable'>
                                        {t('AccountPageBonusesLinkHeaderLabel')}
                                    </div>
                                </div>
                                <div className='panel-link-body'>
                                    {t('AccountPageBonusesBodyText')}
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    );
}