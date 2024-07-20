import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import facebookIcon from "../../assets/icons/auth/facebook.svg";
import googleIcon from "../../assets/icons/auth/google.svg";
import appleIcon from "../../assets/icons/auth/apple.svg";
import eyeIcon from '../../assets/icons/meta/eye.svg';
import eyeOffIcon from '../../assets/icons/meta/eye-off.svg';

import "../../styles/auth/auth-modal.scss";
import React, { useContext, useEffect, useState, FormEvent } from "react";

import phoneCodes from "../../resources/phoneCodes";
import InputDropdown from "../app/InputDropdown";
import AuthContext from "./AuthenticationContext";

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
    const [showPassword, setShowPassword] = useState(false);
    const [phoneCodesOptions, setPhoneCodeOptions] = useState<{ display: string; value: string }[]>([]);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { login } = authContext;
    const navigate = useNavigate();

    useEffect(() => {
        const setupOptions = () => {
            setPhoneCodeOptions(phoneCodes.map((ph) => ({ display: `${ph.name} (${ph.phone})`, value: ph.phone })));
        };

        setupOptions();
    }, []);

    const onPhoneSignInHandle = async function PhoneSignIn(event: FormEvent<HTMLButtonElement>) {
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

    const handleCodeChoose = (value: string) => {
        setPhoneNumber(value);
    }

    const onEmailChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
  
    const onPasswordChangeHandle = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    }

    return (
        <>
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
                            <label>{t('EmailFieldAuthModalTab')}</label>
                            <input 
                                className="input" 
                                placeholder={t('EmailInputAuthModalPlaceholder')}
                                onChange={onEmailChangeHandle}/>
                            
                        </div>
                        <div className="input-group">
                            <label>{t('PasswordFieldAuthModalTab')}</label>
                            <div className="password-input">
                                <input 
                                    type={!showPassword ? 'password' : 'text'}
                                    placeholder={t('PasswordInputAuthModalPlaceholder')}
                                    onChange={onPasswordChangeHandle}/>
                                <img src={!showPassword ? eyeOffIcon : eyeIcon} onClick={() => setShowPassword(!showPassword)}/>
                            </div>
                        </div>
                        <button 
                            className="sign-in-btn"
                            onClick={onEmailSignInHandle}>
                            {t('EnterAuthModalBtn')}
                        </button>
                    </div> : ''}
                    {activeTab === 1 ? 
                    <div className="tab-content">
                        <div className="input-group">
                            <label>{t('CountryCodeFieldAuthModalTab')}</label>
                            <InputDropdown 
                                options={phoneCodesOptions}
                                defaultValue={phoneCodesOptions[0]}
                                onChange={handleCodeChoose}/>
                        </div>
                        <div className="input-group">
                            <label>{t('PhoneNumberFieldAuthModalTab')}</label>
                            <input 
                                value={phoneNumber}
                                className="input"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}/>
                        </div>
                        <button 
                            className="sign-in-btn"
                            onClick={onPhoneSignInHandle}>
                            {t('EnterAuthModalBtn')}
                        </button>
                    </div> : ''}
                </div>
                
                {/* <button 
                    className="sign-in-btn">
                    {t('EnterAuthModalBtn')}
                </button> */}
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
                    <Link to='signup'>{t('SignUpAuthModalLabel')}</Link>
                </div>
            </div>
        </>    
    )
}