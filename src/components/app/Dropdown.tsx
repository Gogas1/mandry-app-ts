import React, { useState } from 'react';

import '../../styles/app/dropdown.scss';

interface DropdownOption {
  display: string;
  value: any;
}

interface DropdownProps {
  options: DropdownOption[];
  defaultValue?: DropdownOption;
  onChange: (value: any) => void;
  className?: string;
  style?: React.CSSProperties;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  defaultValue,
  onChange,
  className = '',
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue || options[0]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option.value);
  };

  return (
    <div className={`dropdown ${className}`} style={style}>
      <div className="dropdown-toggle" onClick={toggleDropdown}>
        {selectedOption.display}
        <i className={`arrow ${isOpen ? 'up' : 'down'}`}></i>
      </div>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
