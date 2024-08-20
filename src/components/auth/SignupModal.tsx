import { useTranslation } from "react-i18next";

import "../../styles/auth/signup-modal.scss";
import "../../styles/app/checkbox.scss";

import TextInputMaterial from "../app/TextInputMaterial";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "../app/DatePicker/DatePicker";

import arrowIcon from "../../assets/icons/meta/arrow.svg";

import { useModal } from "../app/ModalContext";
import AuthModal from "./AuthModal";

import PasswordField from "../app/Fields/PasswordFileld";
import PhonePickerBlock from "../app/Fields/PhonePickerBlock";
import AuthContext from "./AuthenticationContext";
import { useNavigate } from "react-router-dom";
import ValidationError from "../app/Validation/ValidationError";
import CredentialValidator, { BirthDateErrorCode, EmailValidationErrorCode, NameValidationErrorCode, PasswordValidationErrorCode, PhoneValidationErrorCode } from "../../helpers/validation/CredentialValidator";

interface SignupModalProps {
    hideModal: () => void;
}

export default function SignupModal({ hideModal }: SignupModalProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { t } = useTranslation();
    const { login } = authContext;
    const navigate = useNavigate();

    const { openModal, closeModal } = useModal();

    const [name, setName] = useState('');
    const [surnname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [nameValidation, setNameValidation] = useState<NameValidationErrorCode | undefined>(NameValidationErrorCode.NOT_VALIDATED);
    const [birthdateValidation, setBirthdateValidation] = useState<BirthDateErrorCode | undefined>(BirthDateErrorCode.NOT_VALIDATED);
    const [emailValidation, setEmailValidation] = useState<EmailValidationErrorCode | undefined>();
    const [phoneValidation, setPhoneValidation] = useState<PhoneValidationErrorCode | undefined>(PhoneValidationErrorCode.NOT_VALIDATED);
    const [passwordValidation, setPasswordValidation] = useState<PasswordValidationErrorCode | undefined>();

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [signUpButtonActivation, setSignUpButtonActivation] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const validateCredentials = () => {
        if(loading) return false;

        if(name && surnname && birthdate && (phone || (email && validatePasswords()))) {
            setSignUpButtonActivation(true);
        } else {
            setSignUpButtonActivation(false);
        }
    }

    const validatePasswords = (): boolean => {
        if(password && passwordConfirmation) {
            if(password === passwordConfirmation) return true;
        }

        return false;
    }

    useEffect(() => {
        validateCredentials();
    });
    
    const nameChangeHandle = (value: string) => {
        setName(value);

        setNameValidation(CredentialValidator.ValidateName(value));
    }

    const surnameChangeHandle = (value: string) => {
        setSurname(value);        
    }

    const emailChangeHandle = (value: string) => {
        setEmail(value);
        
        setEmailValidation(CredentialValidator.ValidateEmail(value));
    }

    const phoneChangeHandle = (value: string) => {
        setPhone(value);
        
        setPhoneValidation(CredentialValidator.ValidatePhone(value));
    }

    const passwordChangeHandle = (value: string) => {
        setPassword(value);
        
        setPasswordValidation(CredentialValidator.ValidatePassword(value, true, passwordConfirmation));
    }

    const passwordConfirmationChangeHandle = (value: string) => {
        setPasswordConfirmation(value);
        
        setPasswordValidation(CredentialValidator.ValidatePassword(value, true, password));
    }

    const birthdateChangeHandle = (date: Date) => {
        setBirthdate(date);

        setBirthdateValidation(CredentialValidator.ValidateBirthDate(date));
    }

    

    const closeHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        hideModal();
        openModal('signin', <AuthModal hideModal={() => closeModal('signin')} />);
    }

    const handleSignUpRequest = async () => {
        setLoading(true);
        if(signUpButtonActivation) {
            const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + "/a/auth/signup";

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true'
                    }, 
                    body: JSON.stringify({
                        name: name,
                        surname: surnname,
                        phone: phone,
                        email: email,
                        password: password,
                        BirthDate: birthdate
                    })
                });
    
                if(response.ok) {
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
                } else if(response.status === 409) {
                    const errorData = await response.json();
                    console.log(errorData);
                }
            }
            catch (error) {
                console.log('error', error);
            }
        }
        setLoading(false);
    }

    return (
        <>
            <div className="signup-modal-border"></div>
            <div className="signup-modal-panel">
                <div className="panel-header">{t('SignUpFinishHeader')}</div>
                <div className="divider"></div>
                <div className="scroll-block">
                    <div className="block names-block">
                        <div className="block-header">{t('SignUpNamesBlockHeader')}</div>
                        <div className="input-group name-input-group">
                            <TextInputMaterial
                                label={t('SignUpNameInputLabel')}
                                onChange={nameChangeHandle}
                                />
                            {nameValidation ? (
                                <ValidationError label={t(GetNameValidationErrorKey(nameValidation))} />
                            ): ''}
                        </div>
                        <div className="input-group surname-input-group">

                            <TextInputMaterial 
                                label={t('SignUpSurnameInputLabel')}
                                onChange={surnameChangeHandle}/>
                        </div>
                        <div className="block-text-end">
                            {t('SignUpNamesTextEnd')}
                        </div>
                    </div>
                    <div className="block birthdate-block">
                        <div className="block-header">{t('SignUpBirthdateBlockHeader')}</div>
                        <DatePicker 
                            label={t('SignUpBirthDateInputLabel')}
                            onChange={birthdateChangeHandle}
                            />
                        <div className="block-text-end">
                            {t('SignUpBirthDateTextEnd')}
                        </div>
                    </div>
                    <div className="block email-block">
                        <div className="block-header">{t('SignUpEmailBlockHeader')}</div>
                        <div className="input-group email-input-group">
                            <TextInputMaterial 
                                label={t('SignUpEmailInputLabel')}
                                onChange={emailChangeHandle}/>
                        </div>
                        <div className="block-text-end">
                            {t('SignUpEmailTextEnd')}
                        </div>
                    </div>
                    <div className="block password-block">
                        <div className="input-group">
                            <PasswordField 
                                onValueChange={passwordChangeHandle}
                            />
                            <label>{t('SignUpPasswordReq')}</label>
                        </div>
                        <div className="input-group password-repeat">
                            <PasswordField 
                                label=""
                                onValueChange={passwordConfirmationChangeHandle}
                            />
                        </div>
                    </div>
                    <div className="block phone-block">
                        <PhonePickerBlock 
                            onPhoneChange={phoneChangeHandle}
                        />
                    </div>
                    <div className="agreement-text">
                        {t('SignUpAgreement')}
                    </div>
                    <button 
                        onClick={handleSignUpRequest}
                        className={`continue-button ${signUpButtonActivation ? '' : 'disabled'}`}>{t('SignUpContinueButtonLabel')}</button>
                    <div className="marketing-agreement">
                        {t('SignUpMarketingAgreement')}
                    </div>
                    <div className="marketing-waiver-block">
                        <label className="checkbox-container">{t('SignUpWaiverText')}
                            <input 
                                type="checkbox" 
                                />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                
            </div>
            <button className="signup-modal-close-button" onClick={closeHandle}>
                <img src={arrowIcon}  alt='close' />
            </button>  
        </>  
    );
}

function GetNameValidationErrorKey(errorCode: NameValidationErrorCode) {
    switch (errorCode){
        case NameValidationErrorCode.REQUIRED:
            return "Validation.SignUp.Name.Required";
        default:
            return "Validation.SignUp.Name.Required";
    }
}

function GetBirthDateValidationErrorKey(errorCode: BirthDateErrorCode) {
    switch (errorCode) {
        case BirthDateErrorCode.REQUIRED:
            return "Validation.SignUp.BirthDate.Required";
        case BirthDateErrorCode.INVALID_DATE:
            return "Validation.SignUp.BirthDate.Invalid";
        default:
            return "Validation.SignUp.BirthDate.Required";
    }
}

function GetEmailValidationErrorKey(errorCode: EmailValidationErrorCode) {
    switch (errorCode) {
        case EmailValidationErrorCode.REQUIRED:
            return "Validation.SignUp.Email.Required";
        case EmailValidationErrorCode.INVALID_EMAIL:
            return "Validation.SignUp.Email.Invalid";
        default:
            return "Valdiation.SingUp.Email.Required";
    }
}

function GetPasswordValidationErrorKey(errorCode: PasswordValidationErrorCode) {
    switch (errorCode) {
        case PasswordValidationErrorCode.REQUIRED:
            return "Validation.SignUp.Password.Required";
        case PasswordValidationErrorCode.INVALID:
            return "Validation.SignUp.Password.Invalid";
        case PasswordValidationErrorCode.DIFF_PASSOWORDS:
            return "Validation.SignUp.Password.NotEqual";
        default:
            return "Valdiation.SingUp.Password.Required";
    }
}

function GetPhoneValidationErrorKey(errorCode: PhoneValidationErrorCode) {
    switch (errorCode){
        case PhoneValidationErrorCode.REQUIRED:
            return "Validation.SignUp.Phone.Required";
        default:
            return "Validation.SignUp.Phone.Required";
    }
}