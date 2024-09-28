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
// import { useNavigate } from "react-router-dom";
import ValidationError from "../app/Validation/ValidationError";
import CredentialValidator, { BirthDateErrorCode, EmailValidationErrorCode, NameValidationErrorCode, PasswordValidationErrorCode, PhoneValidationErrorCode } from "../../helpers/validation/CredentialValidator";
import AgreementModal from "./AgreementModal";

interface GoogleData {
    accessToken: string;
    id: string;
    email: string;
    verifiedEmail: boolean;
    name: string;
    givenName: string;
    familyName: string;
    picture: string;
}

interface SignupModalProps {
    hideModal: () => void;
    googleData?: GoogleData;
}

export enum SignUpError {
    INVALID_DATA = "INVALID_DATA",
    USER_EXIST = "USER_EXIST",
    UNKNOWN = "UNKNOWN" 
}

export default function SignupModal({ hideModal, googleData }: SignupModalProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }
    const { t } = useTranslation();
    // const { login } = authContext;
    // const navigate = useNavigate();

    const { openModal, closeModal } = useModal();

    const [name, setName] = useState(googleData ? googleData.givenName : '');
    const [surname, setSurname] = useState(googleData ? googleData.familyName : '');
    const [birthdate, setBirthdate] = useState<Date>(new Date());
    const [email, setEmail] = useState(googleData ? googleData.email : '');
    const [phone, setPhone] = useState('');

    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [loading, ] = useState(false);

    const [signUpError, setSignUpError] = useState<SignUpError>();

    // const [googleUserData, setGoogleUserData] = useState(googleData);

    const nameValidation = CredentialValidator.ValidateName(name);
    const birthdateValidation = CredentialValidator.ValidateBirthDate(birthdate);

    let emailValidation: EmailValidationErrorCode | undefined;
    let phoneValidation: PhoneValidationErrorCode | undefined;
    let passwordValidation: PasswordValidationErrorCode | undefined;

    const validateEPP = () => {
        let emailNotValidated = CredentialValidator.ValidateEmail(email);
        let passwordNotValidated = !googleData ? CredentialValidator.ValidatePassword(password, true, passwordConfirmation) : undefined;
        let phoneNotValidated = !googleData ? CredentialValidator.ValidatePhone(phone) : undefined;

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

        if(!nameValidation && !birthdateValidation && (!phoneValidation || (!emailValidation && validatePasswords()))) {
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
            console.log(googleData);
            openModal('agreement', 
                <AgreementModal 
                    hideModal={() => { closeModal('agreement'); }}
                    data={{ name: name, surname: surname, birthdate: birthdate, email: email, phone: phone, password: password, accessToken: googleData?.accessToken }}
                    errorCodeHandler={setSignUpError}
                     />, 
                { minWidth: '32.5%', maxWidth: '32.5%' } as CSSProperties);
        }
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
                                outerValue={name}
                            />
                        </div>
                        <div className="input-group surname-input-group">

                            <TextInputMaterial 
                                label={t('SignUpSurnameInputLabel')}
                                onChange={surnameChangeHandle}
                                outerValue={surname}/>
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
                                validationError={emailValidation ? true : false} 
                                outerValue={email}
                                disabled={googleData ? true : false}/>
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
                                disabled={googleData ? true : false}                                
                            />
                            <label>{t('SignUpPasswordReq')}</label>
                        </div>
                        <div className="input-group password-repeat">
                            <PasswordField 
                                label={t('Modals.SignUp.PasswordConfirmation')}
                                onValueChange={passwordConfirmationChangeHandle}
                                showValidationError={passwordValidation ? true : false}
                                disabled={googleData ? true : false}
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