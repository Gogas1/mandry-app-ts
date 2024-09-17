import { useTranslation } from "react-i18next";

import "../../styles/auth/signup-modal.scss";
import "../../styles/app/checkbox.scss";

import TextInputMaterial from "../app/TextInputMaterial";
import React, { CSSProperties, useContext, useEffect, useState } from "react";
import DatePicker from "../app/DatePicker/DatePicker";

import arrowIcon from "../../assets/icons/meta/arrow.svg";
import warningIcon from '../../assets/icons/meta/warning.svg';

import { useModal } from "../app/ModalContext";
import AuthModal from "./AuthModal";

import PasswordField from "../app/Fields/PasswordFileld";
import PhonePickerBlock from "../app/Fields/PhonePickerBlock";
import AuthContext from "./AuthenticationContext";
import { useNavigate } from "react-router-dom";
import ValidationError from "../app/Validation/ValidationError";
import CredentialValidator, { BirthDateErrorCode, EmailValidationErrorCode, NameValidationErrorCode, PasswordValidationErrorCode, PhoneValidationErrorCode } from "../../helpers/validation/CredentialValidator";
import AgreementModal from "./AgreementModal";

interface SignupModalProps {
    hideModal: () => void;
}

export enum SignUpError {
    INVALID_DATA = "INVALID_DATA",
    USER_EXIST = "USER_EXIST",
    UNKNOWN = "UNKNOWN" 
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
    const [surname, setSurname] = useState('');
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [loading, setLoading] = useState(false);

    const [signUpError, setSignUpError] = useState<SignUpError>();

    const nameValidation = CredentialValidator.ValidateName(name);
    const birthdateValidation = CredentialValidator.ValidateBirthDate(birthdate);

    let emailValidation: EmailValidationErrorCode | undefined;
    let phoneValidation: PhoneValidationErrorCode | undefined;
    let passwordValidation: PasswordValidationErrorCode | undefined;

    const validateEPP = () => {
        let emailNotValidated = CredentialValidator.ValidateEmail(email);
        let passwordNotValidated = CredentialValidator.ValidatePassword(password, true, passwordConfirmation);
        let phoneNotValidated = CredentialValidator.ValidatePhone(phone);

        if(((emailNotValidated || passwordNotValidated) && !phoneNotValidated) || (!emailNotValidated && !passwordNotValidated)) {
            return;
        }

        emailValidation = emailNotValidated;
        passwordValidation = passwordNotValidated;
        phoneValidation = phoneNotValidated;
    }

    validateEPP();
    
    const validatePasswords = (): boolean => {
        if(password && passwordConfirmation) {
            if(password === passwordConfirmation) return true;
        }

        return false;
    }

    const validateCredentials = () => {
        if(loading) return false;

        if(name && birthdate && (phone || (email && validatePasswords()))) {
            return true;
        } else {
            return false;
        }
    }

    const validationPassed = validateCredentials();

    useEffect(() => {
        validateCredentials();
    });
    
    const nameChangeHandle = (value: string) => {
        setName(value);
    }

    const surnameChangeHandle = (value: string) => {
        setSurname(value);        
    }

    const emailChangeHandle = (value: string) => {
        setEmail(value);
    }

    const phoneChangeHandle = (value: string) => {
        setPhone(value);
    }

    const passwordChangeHandle = (value: string) => {
        setPassword(value);
    }

    const passwordConfirmationChangeHandle = (value: string) => {
        setPasswordConfirmation(value);
    }

    const birthdateChangeHandle = (date: Date) => {
        setBirthdate(date);
    }

    const closeHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();

        hideModal();
        openModal('signin', <AuthModal hideModal={() => closeModal('signin')} />);
    }

    const handleAgreementTrans = () => {
        if(validationPassed) {
            openModal('agreement', 
                <AgreementModal 
                    hideModal={() => { closeModal('agreement'); }}
                    data={{ name: name, surname: surname, birthdate: birthdate, email: email, phone: phone, password: password }}
                    errorCodeHandler={setSignUpError}
                     />, 
                { minWidth: '32.5%', maxWidth: '32.5%' } as CSSProperties);
        }
    }

    const handleSignUpRequest = async () => {
        if(validationPassed) {
            setLoading(true);
            setSignUpError(undefined);
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
                        surname: surname,
                        phone: phone,
                        email: email,
                        password: password,
                        BirthDate: birthdate
                    })
                });
            
                if (response.ok) {
                    const data = await response.json();
                    login(data.token, data.userData);
                    hideModal();
                    navigate("/");
                } else if (response.status === 400) {
                    setSignUpError(SignUpError.INVALID_DATA);
                } else if (response.status === 409) {
                    setSignUpError(SignUpError.USER_EXIST);
                }
            } catch (error) {
                console.error('Error:', error);
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
                                validationError={nameValidation ? true : false}
                            />
                        </div>
                        <div className="input-group surname-input-group">

                            <TextInputMaterial 
                                label={t('SignUpSurnameInputLabel')}
                                onChange={surnameChangeHandle}/>
                        </div>
                        {nameValidation ? (
                            <ValidationError 
                                label={t(GetNameValidationErrorKey(nameValidation))} 
                                className="signup-validation-error"/>
                        ): ''}
                        <div className="block-text-end">
                            {t('SignUpNamesTextEnd')}
                        </div>
                    </div>
                    <div className="block birthdate-block">
                        <div className="block-header">{t('SignUpBirthdateBlockHeader')}</div>
                        <DatePicker 
                            label={t('SignUpBirthDateInputLabel')}
                            onChange={birthdateChangeHandle}
                            showError={birthdateValidation ? true : false}
                            outerValueOverride={false}
                            />
                        {birthdateValidation ? (
                            <ValidationError 
                                label={t(GetBirthDateValidationErrorKey(birthdateValidation))} 
                                className="signup-validation-error"/>
                        ) : ''}
                        <div className="block-text-end">
                            {t('SignUpBirthDateTextEnd')}
                        </div>
                    </div>
                    <div className="block email-block">
                        <div className="block-header">{t('SignUpEmailBlockHeader')}</div>
                        <div className="input-group email-input-group">
                            <TextInputMaterial 
                                label={t('SignUpEmailInputLabel')}
                                onChange={emailChangeHandle}
                                validationError={emailValidation ? true : false}/>
                        </div>
                        {emailValidation ? (
                            <ValidationError 
                                label={t(GetEmailValidationErrorKey(emailValidation))} 
                                className="signup-validation-error"/>
                        ) : ''}
                        <div className="block-text-end">
                            {t('SignUpEmailTextEnd')}
                        </div>
                    </div>
                    <div className="block password-block">
                        <div className="input-group">
                            <PasswordField 
                                onValueChange={passwordChangeHandle}
                                showValidationError={passwordValidation ? true : false}
                            />
                            <label>{t('SignUpPasswordReq')}</label>
                        </div>
                        <div className="input-group password-repeat">
                            <PasswordField 
                                label={t('Modals.SignUp.PasswordConfirmation')}
                                onValueChange={passwordConfirmationChangeHandle}
                                showValidationError={passwordValidation ? true : false}
                            />
                        </div>
                        {passwordValidation ? (
                            <ValidationError 
                                label={t(GetPasswordValidationErrorKey(passwordValidation))} 
                                className="signup-validation-error"/>
                        ) : ''}
                    </div>
                    <div className="block phone-block">
                        <PhonePickerBlock 
                            onPhoneChange={phoneChangeHandle}
                            validationMessage={phoneValidation ? t(GetPhoneValidationErrorKey(phoneValidation)) : ''} 
                        />
                    </div>
                    <div className="agreement-text">
                        {t('SignUpAgreement')}
                    </div>
                    {signUpError ? 
                    (<>
                        <div className="sign-up-error">
                            <img src={warningIcon} />
                            {t(GetSignUpAttemptErrorKey(signUpError))}
                        </div>
                    </>) :
                    ''}
                    <button 
                        onClick={handleAgreementTrans}
                        className={`continue-button ${validationPassed ? '' : 'disabled'}`}>{t('SignUpContinueButtonLabel')}</button>
                    {/* <button 
                        onClick={handleSignUpRequest}
                        className={`continue-button ${validationPassed ? '' : 'disabled'}`}>{t('SignUpContinueButtonLabel')}</button> */}
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

function GetSignUpAttemptErrorKey(errorCode: SignUpError) {
    switch (errorCode) {
        case SignUpError.INVALID_DATA:
            return "Validation.SignUp.Attempt.Invalid";
        case SignUpError.USER_EXIST:
            return "Validation.SignUp.Attempt.Conflict";
        case SignUpError.UNKNOWN:
            return "Validation.SignUp.Attempt.Unknown";
        default:
            return "Validation.SignUp.Attempt.Invalid";
    }
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