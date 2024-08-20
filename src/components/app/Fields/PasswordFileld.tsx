import { useTranslation } from "react-i18next";
import TextInputMaterial from "../TextInputMaterial";
import { useState } from "react";

import eyeIcon from '../../../assets/icons/meta/eye.svg';
import eyeOffIcon from '../../../assets/icons/meta/eye-off.svg';

interface PasswordFieldProps {
    onValueChange: (value: string) => void;
    label?: string;
    onFocus?: () => void;
    onBlur?: () => void;

    showValidationError?: boolean;
}

export default function PasswordField({onValueChange, label, onFocus, onBlur, showValidationError = false}: PasswordFieldProps) {
    const { t } = useTranslation();

    const [showPassword, setShowPassword] = useState(false);

    if(!label) label = t('PasswordFieldDefaultLabel');

    return (
        <>
            <TextInputMaterial 
                label={label}
                onChange={onValueChange}
                hideText={!showPassword}
                icon={!showPassword ? eyeOffIcon : eyeIcon}
                iconCursorPointer={true}
                onIconClick={() => setShowPassword(!showPassword)}
                onFocus={onFocus}
                onBlur={onBlur}
                validationError={showValidationError}
            />
        </>
    );
}