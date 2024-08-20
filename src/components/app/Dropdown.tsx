import React, { useState } from 'react';

import '../../styles/app/dropdown.scss';

import arrowIcon from '../../assets/icons/meta/arrow2.svg';
import DropdownAddition, { DropdownOption } from './DropdownAddition';

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
        <img src={arrowIcon} className={`arrow ${isOpen ? 'opened' : ''}`} />
      </div>
      {isOpen && (
        <DropdownAddition 
          options={options}
          onChange={handleSelect}
          className='dropdown-menu'
        />
      )}
    </div>
  );
};

export default Dropdown;
