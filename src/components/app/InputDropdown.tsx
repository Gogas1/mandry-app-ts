import React, { useState } from "react";
import "../../styles/app/input-dropdown.scss";

interface InputDropdownOption {
    display: string;
    value: any;
  }

interface InputDropdownProps {
    options: InputDropdownOption[];
    defaultValue: InputDropdownOption;
    onChange: (value: any) => void;
    className?: string;
}

export default function InputDropdown({
        options,
        defaultValue,
        onChange,
        className = ''
    }: InputDropdownProps) {

    const [isOpened, setIsOpened] = useState(false);
    const [value, setValue] = useState(defaultValue.display || options[0].display);
    const [filteredOptions, setFilteredOptions] = useState<InputDropdownOption[]>([])

    const toggleMenu = () => {
        setIsOpened(!isOpened);
    }

    const filterOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if(event.target.value.length > 0) {
            setFilteredOptions(options.filter((o) => o.display.includes(event.target.value)));
        }
    }

    return (
        <div className={`input-dropdown ${className}`}>
            <input 
                className="input"
                value={value}
                onFocus={toggleMenu}
                onChange={filterOptions} />
            {isOpened && (
                <div className="dropdown-menu">
                    {filteredOptions.length < 0 ? 
                    options.map((option, index) => (
                        <div 
                            key={index} 
                            className="menu-item"
                            onClick={() => {
                                setValue(option.display);
                                onChange(option.value);
                                toggleMenu();
                            }}
                            >
                            {option.display}
                        </div>
                    )) : filteredOptions.map((option, index) => (
                        <div 
                            key={index} 
                            className="menu-item"
                            onClick={() => {
                                setValue(option.display);
                                onChange(option.value);
                                toggleMenu();
                            }}
                            >
                            {option.display}
                        </div>
                    ))}
                    
                </div>
            )}
        </div>
    )
}