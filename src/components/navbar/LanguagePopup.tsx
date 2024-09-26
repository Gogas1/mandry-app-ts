import i18next from 'i18next';

import arrowIcon from "../../assets/icons/meta/arrow.svg";

import '../../styles/navbar/language-menu.scss';
import { useTranslation } from 'react-i18next';
import Dropdown from '../app/Dropdown';
import { useEffect, useState } from 'react';
import i18n from '../../i18n';
import { CurrencyHelper } from '../../helpers/CurrencyHelper';
import { useUserSettings } from '../app/UserSettingsContext';

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
}


export default function LanguagePopup({ isOpen, closeAll }: PopupProps) {
    const { t } = useTranslation();
    const userSettingsContext = useUserSettings();

    const [languageOptions, setLanguageOptions] = useState<{ display: string; value: string }[]>([]);
    const [selectedLangugageOption, setSelectedLanguageOption] = useState<{ display: string; value: string } | undefined>(undefined);

    const [currencyOptions, setCurrecyOptions] = useState<{ display: string; value: string }[]>([]);
    const [selectedCurrencyOption, setSelectedCurrencyOption] = useState<{ display: string; value: string } | undefined>(undefined);

    const getCurrencyOptions = (): { display: string; value: string }[] => {
      return [
        {
          display: t(CurrencyHelper.USD.translationString),
          value: CurrencyHelper.USD.value
        },
        {
          display: t(CurrencyHelper.EUR.translationString),
          value: CurrencyHelper.EUR.value
        },
        {
          display: t(CurrencyHelper.UAH.translationString),
          value: CurrencyHelper.UAH.value
        }
      ]
    }

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

            const selectedLanguage = dropdownOptions.find(d => d.value === i18n.language);

            setLanguageOptions(dropdownOptions);
            setSelectedLanguageOption(selectedLanguage);

            // Set default selected option if options are available
            if (dropdownOptions.length > 0) {
                setSelectedLanguageOption(dropdownOptions[0]);
            }
        };

        setCurrecyOptions(getCurrencyOptions());
        setSelectedCurrencyOption({
          display: t(CurrencyHelper.USD.translationString),
          value: CurrencyHelper.USD.value
        });
        userSettingsContext.updateCurrency(CurrencyHelper.USD.value);
        fetchResources();
    }, []);

    const handleChange = (value: any) => {        
        const selected = languageOptions.find(option => option.value === value);
        setSelectedLanguageOption(selected);
        i18next.changeLanguage(selected?.value);
    };

    const handleCurrencyChange = (value: any) => {
      const selected = currencyOptions.find(option => option.value === value);
      if(selected) {
        userSettingsContext.updateCurrency(selected.value);
      }
    }

  return (
    <div className={`language-popup-wrapper ${isOpen ? 'opened' : 'closed'}`}>
      <div className='popup-border'></div>
      <div className='popup-panel'></div>
      <div className='popup-panel-content'>
        <div className='text'>{t('languageSelectionLabel')}</div>
        <div>
          {languageOptions.length > 0 && selectedLangugageOption && (
            <Dropdown
              options={languageOptions}
              defaultValue={selectedLangugageOption}
              onChange={handleChange}
              className='language-dd'
            />
          )}
        </div>
        <div className='text'>{t('currencySelectionLabel')}</div>
        {currencyOptions.length > 0 && selectedCurrencyOption && (
          <Dropdown
            options={currencyOptions}
            defaultValue={selectedCurrencyOption}
            onChange={handleCurrencyChange}
            className='currency-dd'
          />
        )}
      </div>
      <div className='popup-hide' onClick={closeAll}>
        <img src={arrowIcon} alt="arrow" />
      </div>
    </div>
  );
}