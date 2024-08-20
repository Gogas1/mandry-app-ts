import { useTranslation } from "react-i18next";
import TextInputMaterial from "../../app/TextInputMaterial";
import ValidationError from "../../app/Validation/ValidationError";
import PasswordField from "../../app/Fields/PasswordFileld";
import { FormEvent, useEffect, useState } from "react";
import SignInValidator, { EmailValidationErrorCode, PasswordValidationErrorCode } from "../../../helpers/validation/SignInValidator";

import warningIcon from '../../../assets/icons/meta/warning.svg';

interface EmailWayProps {
    emailAuthHandler: (data: EmailWayCredentials) => void;
    showAuthError: boolean;
}

export interface EmailWayCredentials {
    email: string;
    password: string;
}

export default function EmailWayPanel({ emailAuthHandler, showAuthError }: EmailWayProps) {
    const { t } = useTranslation();

    const [email, setEmail] = useState('');
    const [emailValidation, setEmailValidation] = useState<EmailValidationErrorCode>();

    const [password, setPassword] = useState('');
    const [passwordValidation, setPasswordValidation] = useState<PasswordValidationErrorCode>();

    const [validationPassed, setValidationPassed] = useState(false);

    const validateButton = () => {
        if(!emailValidation && !passwordValidation && (email && password)) {
            setValidationPassed(true);
        } else {
            setValidationPassed(false);
        }
    }

    useEffect(() => {     
        validateButton();
    }, [email, password, emailValidation, passwordValidation]);

    const onEmailChangeHandle = (value: string) => {
        setEmail(value); 

        const result = SignInValidator.ValidateEmail(value);
        setEmailValidation(result);
    }
  
    const onPasswordChangeHandle = (value: string) => {
        setPassword(value);

        const result = SignInValidator.ValidatePassowrd(value);
        setPasswordValidation(result);
    }

    const handleEmailBlur = () => {
        const result = SignInValidator.ValidateEmail(email);
        setEmailValidation(result);
    }

    const handlePasswordBlur = () => {
        const result = SignInValidator.ValidatePassowrd(password);
        setPasswordValidation(result);
    }

    const onEmailSignInHandle = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        emailAuthHandler({ email: email, password: password } as EmailWayCredentials);
    }

    const getEmailValidationErrorKey = (errorCode: EmailValidationErrorCode) => {
        switch (errorCode) {
            case EmailValidationErrorCode.REQUIRED:
                return "Validation.SignIn.Messages.Email.Required";
            case EmailValidationErrorCode.INVALID_EMAIL:
                return "Validation.SignIn.Messages.Email.Invalid";
            default:
                return "Validation.SignIn.Messages.Email.Invalid";
        };
    }

    const getPasswordValidationErrorKey = (errorCode: PasswordValidationErrorCode) => {
        switch (errorCode) {
            case PasswordValidationErrorCode.REQUIRED:
                return "Validation.SignIn.Messages.Password.Required";
            default:
                return "Validation.SignIn.Messages.Password.Required";
        };
    }

    return (
        <>
            <div className="tab-content">
                <div className="input-group">
                    <TextInputMaterial 
                        label={t('EmailInputAuthModalPlaceholder')}
                        onChange={onEmailChangeHandle} 
                        validationError={emailValidation ? true : false}
                        onBlur={handleEmailBlur}/>
                                    
                        {emailValidation ? (
                            <ValidationError label={t(getEmailValidationErrorKey(emailValidation))} />
                        ) : ''}
                                
                </div>
                <div className="input-group">
                    <PasswordField 
                        label={t('PasswordInputAuthModalPlaceholder')}
                        onValueChange={onPasswordChangeHandle}
                        onBlur={handlePasswordBlur}
                        showValidationError={passwordValidation ? true : false}
                    />
                    {passwordValidation ? (
                        <ValidationError label={t(getPasswordValidationErrorKey(passwordValidation))} />
                    ) : ''}
                </div>
                {showAuthError ? 
                    (<div className="result-block">
                        <img src={warningIcon} />
                            {t('Validation.SignIn.Messages.Email.FailedAttempt')}
                    </div>) 
                : ''}
                            
                 <button 
                    className={`sign-in-btn ${validationPassed ? '' : 'disabled'}`}
                    onClick={validationPassed ? onEmailSignInHandle : undefined}>
                        {t('EnterAuthModalBtn')}
                </button>
            </div>
        </>
    );
}