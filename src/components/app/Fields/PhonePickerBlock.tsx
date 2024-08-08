import { useTranslation } from "react-i18next";
import DropdownField from "../DropdownField";
import TextInputMaterial from "../TextInputMaterial";

import phoneCodes from "../../../helpers/phoneCodes";

import '../../../styles/app/fields/phone-picker-block.scss';
import { useEffect, useState } from "react";

interface PhonePickerBlockProps {
    onPhoneChange: (value: string) => void;
    onCodeChange?: (value: string) => void;

    className?: string;
}

export default function PhonePickerBlock({ onPhoneChange, className = '' }: PhonePickerBlockProps) {
    const { t } = useTranslation();

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneCodesOptions, setPhoneCodeOptions] = useState<{ display: string; value: string }[]>([]);

    const handleCodeChoose = (value: string) => {
        setPhoneNumber(value);
        onPhoneChange(value);
    }

    useEffect(() => {
        const setupOptions = () => {
            setPhoneCodeOptions(phoneCodes.map((ph) => ({ display: `${ph.name} (${ph.phone})`, value: ph.phone })));
        };

        setupOptions();
    }, []);

    return (
        <>
            <div className={`phone-picker ${className}`}>
                <DropdownField
                    label={t('CountryCodeFieldAuthModalTab')}
                    onChange={handleCodeChoose} 
                    options={phoneCodesOptions}
                    className="code-picker" 
                />
                <TextInputMaterial 
                    label={t('PhoneNumberFieldAuthModalTab')}
                    onChange={setPhoneNumber}
                    outerValue={phoneNumber}
                    className="phone-input"
                />
            </div>     
        </>
    );
}