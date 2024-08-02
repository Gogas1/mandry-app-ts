import { useState } from "react";
import DropdownAddition, { DropdownOption } from "./DropdownAddition";
import TextInputMaterial from "./TextInputMaterial";

import '../../styles/app/dropdown-field.scss';
  
interface DropdownFieldProps {
    options: DropdownOption[];
    defaultValue?: DropdownOption;
    onChange: (value: string) => void;
    label: string;
    className?: string;
    hideText?: boolean;
    icon?: string;
    iconCursorPointer?: boolean;
    onIconClick?: () => void;
}

export default function DropdownField({ label, options, onChange, className = '' }: DropdownFieldProps) {
    const [isOpened, setIsOpened] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState('');
    const [filteredOptions, setFilteredOptions] = useState<DropdownOption[]>([]);

    const handlePick = (option: DropdownOption) => {
        toggleDropdown();
        onChange(option.value);
        setTextFieldValue(option.display);
    }

    const handleChange = (t: string) => {
        setTextFieldValue(t);
        filterOptions(t);
    }

    const filterOptions = (filter: string = '') => {
        if(filter.length > 0 && filter != '') {
            setFilteredOptions(options.filter((o) => o.display.toLocaleLowerCase().includes(filter.toLocaleLowerCase())));
        }
    }

    const toggleDropdown = () => setIsOpened(!isOpened);

    return ( 
        <div className={`dropdown-field-group ${className}`}>
            <TextInputMaterial
                label={label}
                onChange={handleChange}
                onFocus={toggleDropdown}
                outerValue={textFieldValue}
            />
            <DropdownAddition 
                options={filteredOptions.length < 1 ? options : filteredOptions}
                onChange={handlePick}
                className={`dropdown-field-dropdown ${isOpened ? 'opened' : ''}`}/>
        </div>
    )
}