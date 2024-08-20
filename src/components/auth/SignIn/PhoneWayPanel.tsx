import { FormEvent, useEffect, useState } from "react";
import PhonePickerBlock from "../../app/Fields/PhonePickerBlock";
import { useTranslation } from "react-i18next";
import SignInValidator, { PhoneValidationErrorCode } from "../../../helpers/validation/SignInValidator";

import warningIcon from '../../../assets/icons/meta/warning.svg';

export interface PhoneWayCredentials {
    phone: string;
}

interface PhoneWayProps {
    phoneAuthHandler: (data: PhoneWayCredentials) => void;
    showAuthError: boolean;
}

export default function PhoneWayPanel({ phoneAuthHandler, showAuthError }: PhoneWayProps) {
    const { t } = useTranslation();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneValidation, setPhoneValidation] = useState<PhoneValidationErrorCode | undefined>(PhoneValidationErrorCode.NOT_VALIDATED);

    const [validationPassed, setValidationPassed] = useState(false);

    const validateButton = () => {
        if(!phoneValidation) {
            setValidationPassed(true);
        } else {
            setValidationPassed(false);
        }
    }

    useEffect(() => {
        validateButton();
    }, [phoneNumber, phoneValidation])


    const onPhoneChangeHandle = (value: string) => {
        setPhoneNumber(value);
        setPhoneValidation(SignInValidator.ValidatePhone(value));
        console.log(value);
    }

    const onPhoneSignInHandle = (event: FormEvent<HTMLButtonElement>) => {
        event.preventDefault();
        phoneAuthHandler({ phone: phoneNumber });
    }

    const getPhoneValidationErrorKey = (errorCode: PhoneValidationErrorCode | undefined) => {
        switch (errorCode) {
            case PhoneValidationErrorCode.REQUIRED:
                return "Validation.SignIn.Messages.Phone.Required";
            default:
                return "";
        };
    }

    return (
        <>
            <div className="tab-content">
                <PhonePickerBlock 
                    onPhoneChange={onPhoneChangeHandle}
                    validationMessage={t(getPhoneValidationErrorKey(phoneValidation))}
                />
                {showAuthError ? 
                    (<div className="result-block phone-result">
                        <img src={warningIcon} />
                        {t('Validation.SignIn.Messages.Phone.FailedAttempt')}
                    </div>) 
                : ''}
                <button 
                    className={`sign-in-btn ${validationPassed ? '' : 'disabled'}`}
                    onClick={validationPassed ? onPhoneSignInHandle : undefined}>
                    {t('EnterAuthModalBtn')}
                </button>
            </div>
        </>
    );
}