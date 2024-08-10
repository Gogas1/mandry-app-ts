import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import facebookIcon from "../../assets/icons/auth/facebook.svg";
import googleIcon from "../../assets/icons/auth/google.svg";
import appleIcon from "../../assets/icons/auth/apple.svg";
import closeIcon from '../../assets/icons/meta/close-cross.svg';

import "../../styles/auth/auth-modal.scss";
import { useContext, useState, FormEvent, useEffect } from "react";

import AuthContext from "./AuthenticationContext";
import { useModal } from "../app/ModalContext";
import SignupModal from "./SignupModal";
import TextInputMaterial from "../app/TextInputMaterial";
import PasswordField from "../app/Fields/PasswordFileld";
import PhonePickerBlock from "../app/Fields/PhonePickerBlock";

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

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [validationPassed, setValidationPassed] = useState(false);
    
    const { login } = authContext;
    const navigate = useNavigate();

    const { openModal, closeModal } = useModal();

    useEffect(() => {
        const validateButton = () => {
            if((phoneNumber !== '' || (password !== '' && email !== '')) && !loading) {
                setValidationPassed(true);
            } else {
                setValidationPassed(false);
            }
        }

        validateButton();
    }, [phoneNumber, password, email, loading])

    

    const handleSignUpModalCall = () => {
        openModal('signup', <SignupModal hideModal={() => closeModal('signup')} />);
    }

    const onPhoneSignInHandle = async function PhoneSignIn(event: FormEvent<HTMLButtonElement>) {
        setLoading(true);
        event.preventDefault();
      
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/auth/phone"

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                login(data.token, data.userData);
                hideModal();
                navigate("/");
              } else if (response.status === 400) {
                const errorData = await response.json();
                console.log(errorData.validationErrorsGrous);
              } else if (response.status === 401) {
                const errorData = await response.json();
                console.log(errorData);
              }
        } 
        catch (error) {
            console.log('error', error);
        }

        setLoading(false);
    }

    const onEmailSignInHandle = async function EmailSignIn(event: FormEvent<HTMLButtonElement>) {
        event.preventDefault();
      
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/auth/email"

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
                const errorData = await response.json();
                console.log(errorData.validationErrorsGrous);
              } else if (response.status === 401) {
                const errorData = await response.json();
                console.log(errorData);
              }
        } 
        catch (error) {
            console.log('error', error);
        }
    }

    const handleTabSwitch = (index: number) => {
        setActiveTab(index);
    }

    const onEmailChangeHandle = (value: string) => {
        setEmail(value);
    }
  
    const onPasswordChangeHandle = (value: string) => {
      setPassword(value);
    }

    const onPhoneChangeHandle = (value: string) => {
        setPhoneNumber(value);
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
                        <div className="tab-content">
                            <div className="input-group">
                                <TextInputMaterial 
                                    label={t('EmailInputAuthModalPlaceholder')}
                                    onChange={onEmailChangeHandle} />       
                            </div>
                            <div className="input-group">
                                <PasswordField 
                                    label={t('PasswordInputAuthModalPlaceholder')}
                                    onValueChange={onPasswordChangeHandle}
                                />
                            </div>
                            <button 
                                className={`sign-in-btn ${validationPassed ? '' : 'disabled'}`}
                                onClick={validationPassed ? onEmailSignInHandle : undefined}>
                                {t('EnterAuthModalBtn')}
                            </button>
                        </div> : ''}
                        {activeTab === 1 ? 
                        <div className="tab-content">
                            <PhonePickerBlock 
                                onPhoneChange={onPhoneChangeHandle}
                            />
                            <button 
                                className={`sign-in-btn ${validationPassed ? '' : 'disabled'}`}
                                onClick={validationPassed ? onPhoneSignInHandle : undefined}>
                                {t('EnterAuthModalBtn')}
                            </button>
                        </div> : ''}
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