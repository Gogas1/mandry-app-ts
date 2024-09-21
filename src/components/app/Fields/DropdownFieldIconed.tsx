import { useTranslation } from 'react-i18next';
import '../../../styles/app/dropdown-field-iconed.scss';

import arrowDownIcon from '../../../assets/icons/meta/arrow-black.svg';
import { useState } from 'react';

interface DropdownFieldIconedProps {
    label: string;
    options: DropdownFieldIconedOption[];
    defaultOption?: DropdownFieldIconedOption;
    onChoose: (value: any) => void;
}

export interface DropdownFieldIconedOption {
    icon: string;
    dispayValue: string;
    displayValueKey?: string;
    value: any;
}

export default function DropdownFieldIconed({ label, options, defaultOption, onChoose }: DropdownFieldIconedProps) {
    const { t } = useTranslation();

    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DropdownFieldIconedOption | undefined>(defaultOption)

    const handleDropdownSwitch = () => {
        setDropdownOpened(!dropdownOpened);
    }

    const handleChoose = (option: DropdownFieldIconedOption) => {
        onChoose(option.value);
        setSelectedOption(option);
    }

    return (
        <>
            <div className="dropdown-field-iconed">
                {selectedOption ? (
                    <div className='selected-option' onClick={handleDropdownSwitch}>
                        <div className='item-icon'>
                            <img src={selectedOption.icon} />
                        </div>
                                
                        {selectedOption.displayValueKey ? 
                            t(selectedOption.displayValueKey) :
                            selectedOption.dispayValue
                        }
                    </div>
                ) : (
                    <p className="default-label" onClick={handleDropdownSwitch}>{label}</p>
                )}
                
                <img 
                    src={arrowDownIcon} 
                    onClick={handleDropdownSwitch}
                    className={`arrow-icon ${dropdownOpened && 'opened'}`} />
                    {dropdownOpened && (
                        <ul className='dropdown'>
                        {options.map((item, index) => (
                            <li 
                                className='dropdown__item' 
                                onClick={() => handleChoose(item)}
                                key={index}>
                                <div className='item-icon'>
                                    <img src={item.icon} />
                                </div>
                                
                                {item.displayValueKey ? 
                                    t(item.displayValueKey) :
                                    item.dispayValue
                                }
                            </li>
                        ))}                        
                    </ul>
                )}                
            </div>
        </>
    )
}