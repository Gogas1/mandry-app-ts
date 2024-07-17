import i18next from 'i18next';

import arrowIcon from "../../assets/icons/meta/arrow.svg";

import '../../styles/navbar/language-menu.scss';
import { useTranslation } from 'react-i18next';
import Dropdown from '../app/Dropdown';
import { useEffect, useState } from 'react';

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}


export default function LanguagePopup({ isOpen, closeAll }: PopupProps) {
    const { t } = useTranslation();
    const [languageOptions, setLanguageOptions] = useState<{ display: string; value: string }[]>([]);
    const [selectedLangugageOption, setSelectedLanguageOption] = useState<{ display: string; value: string } | undefined>(undefined);

    const [currencyOptions, setCurrencyOptions] = useState<{ display: string; value: string }[]>([]);
    const [selectedCurrencyOption, setSelectedCurrencyOption] = useState<{ display: string; value: string } | undefined>(undefined);

    useEffect(() => {
        const fetchResources = async () => {
            const resources = i18next.options.resources as Record<string, any>;
            const lngs = Object.keys(resources).map(code => ({
                code: code,
                name: resources[code].translation.nativeName
            }));

            const dropdownOptions = lngs.map(lang => ({
                display: lang.name,
                value: lang.code
            }));

            setLanguageOptions(dropdownOptions);

            // Set default selected option if options are available
            if (dropdownOptions.length > 0) {
                setSelectedLanguageOption(dropdownOptions[0]);
            }
        };

        fetchResources();
    }, []);

    const handleChange = (value: any) => {        
        const selected = languageOptions.find(option => option.value === value);
        setSelectedLanguageOption(selected);
        i18next.changeLanguage(selected?.value);
    };

    return (
        <div className={`language-popup-wrapper ${isOpen ? 'opened' : 'closed'}`}>
          <div className='popup-border'></div>
          <div className='popup-panel'>
            <div className='text'>{t('languageSelectionLabel')}</div>
            <div>
              {languageOptions.length > 0 && selectedLangugageOption && (
                <Dropdown
                  options={languageOptions}
                  defaultValue={selectedLangugageOption}
                  onChange={handleChange}
                />
              )}
            </div>
            <div className='text'>{t('currencySelectionLabel')}</div>
            <div>
                {currencyOptions.length > 0 && selectedCurrencyOption && (
                    <Dropdown
                    options={currencyOptions}
                    defaultValue={selectedCurrencyOption}
                    onChange={handleChange}
                    />
                )}
            </div>
          </div>
          <div className='popup-hide' onClick={closeAll}>
            <img src={arrowIcon} alt="arrow" />
          </div>
        </div>
    );
}