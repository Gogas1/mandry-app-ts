import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import facebookIcon from "../../assets/icons/auth/facebook.svg";
import googleIcon from "../../assets/icons/auth/google.svg";
import appleIcon from "../../assets/icons/auth/apple.svg";
import closeIcon from '../../assets/icons/meta/close-cross.svg';

import "../../styles/auth/auth-modal.scss";
import { useContext, useState } from "react";

import AuthContext from "./AuthenticationContext";
import { useModal } from "../app/ModalContext";
import SignupModal from "./SignupModal";
import EmailWayPanel, { EmailWayCredentials } from "./SignIn/EmailWayPanel";
import PhoneWayPanel, { PhoneWayCredentials } from "./SignIn/PhoneWayPanel";

interface AuthModalProps {
    hideModal: () => void;
}

export default function AuthModal({ hideModal }: AuthModalProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { t } = useTranslation();

    const [activeTab, setActiveTab] = useState(0);

    const [loading, setLoading] = useState(false);

    const [isEmailAttemptFailed, setIsEmailAttemptFailed] = useState(false);
    const [isPhoneAttemptFailed, setIsPhoneAttemptFailed] = useState(false);
    
    const { login } = authContext;
    const navigate = useNavigate();

    const { openModal, closeModal } = useModal();

    const handleSignUpModalCall = () => {
        openModal('signup', <SignupModal hideModal={() => closeModal('signup')} />);
    }

    const onPhoneSignInHandle = async function PhoneSignIn({ phone }: PhoneWayCredentials) {
        setLoading(true);
        setIsPhoneAttemptFailed(false);
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/auth/phone"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                login(data.token, data.userData);
                hideModal();
                navigate("/");
              } else if (response.status === 400) {
                setIsPhoneAttemptFailed(true);
              } else if (response.status === 401) {;
                setIsPhoneAttemptFailed(true);
              }
        } 
        catch (error) {
            console.log('error', error);
        }

        setLoading(false);
    }

    const onEmailSignInHandle = async function EmailSignIn({ email, password }: EmailWayCredentials) {      
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/auth/email"
        setIsEmailAttemptFailed(false);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password
                }),
            });
            if (response.ok) {
                const data = await response.json();
                login(data.token, data.userData);
                hideModal();
                navigate("/");
              } else if (response.status === 400) {
                setIsEmailAttemptFailed(true);
              } else if (response.status === 401) {
                setIsEmailAttemptFailed(true);
              }
        } 
        catch (error) {
            console.log('error', error);
        }
    }

    const handleTabSwitch = (index: number) => {
        setActiveTab(index);
    }

    return (
        <>
            <div className='auth-modal-border'></div>
            <div className='auth-modal-panel'>
                <div className="auth-modal">
                    <div className="signin-main-label">{t('SignInAuthModalLabel')}</div>
                    <div className="welcome-label-group">
                        <div className="welcome-label">{t('WelcomeBackAuthModalLabel')}</div>
                        <div className="enter-creds-label">{t('EnterCredsAuthModalLabel')}</div>
                    </div>
                    <div className="tabs-switch-group">
                        <div className="switch-group">
                            <div 
                            className={`tab-label ${activeTab === 0 ? 'active' : ''}`} 
                            onClick={() => handleTabSwitch(0)}>
                                {t('EmailWayAuthModalTab')}
                            </div>
                            <div 
                            className={`tab-label ${activeTab === 1 ? 'active' : ''}`} 
                            onClick={() => handleTabSwitch(1)}>
                                {t('PhoneWayAuthModalTab')}
                            </div>
                        </div>
                        <div className={`tabs-underline`}></div>
                        <div className="underline-paint" style={{transform: `translateX(${activeTab * 100}%)`}}></div>
                    </div>
                    <div className="tab-content-wrapper">
                        {activeTab === 0 ? 
                        <EmailWayPanel
                            emailAuthHandler={onEmailSignInHandle} 
                            showAuthError={isEmailAttemptFailed} />
                         : ''}
                        {activeTab === 1 ? 
                        <PhoneWayPanel 
                            phoneAuthHandler={onPhoneSignInHandle}
                            showAuthError={isPhoneAttemptFailed}
                        />
                         : ''}
                    </div>
                    <div className="oauth-group">
                        <div className="top-divider-group">
                            <div className="divider"></div>
                            <div className="top-divider-label">{t('OrAuthModalLabel')}</div>
                            <div className="divider"></div>
                        </div>
                        <div className="oauth-buttons-group">
                            <div className="oauth-button facebook-button">
                                <img src={facebookIcon} alt="facebook"/>
                            </div>
                            <div className="oauth-button google-button">
                                <img src={googleIcon} alt="google"/>
                            </div>
                            <div className="oauth-button apple-button">
                                <img src={appleIcon} alt="apple"/>
                            </div>
                        </div>
                        <div className="divider-bottom"></div>
                    </div>
                    <div className="signup-group">
                        <div className="signup-text">{t('SignUpOfferAuthModalLabel')}</div>
                        <div className="signup-link" onClick={handleSignUpModalCall}>{t('SignUpAuthModalLabel')}</div>
                    </div>
                </div>
            </div>
            <button className="auth-modal-close-button" onClick={hideModal}>
                <img src={closeIcon} alt='close' />
            </button>  
            
        </>    
    )
}