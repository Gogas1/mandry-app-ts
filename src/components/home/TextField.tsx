import React, { useState, ChangeEvent, FocusEvent } from 'react';
import '../../styles/pages/home/text-field.scss'

interface TextFieldProps {
    label: string;
  }

export default function TextField({ label }: TextFieldProps) {
    const [value, setValue] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };
    
      const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setFocused(true);
      };
    
      const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setFocused(false);
      };

    return (
        <div className={`textfield ${focused || value ? 'focused' : ''}`}>
          <label className="textfield__label">{label}</label>
          <input
            className="textfield__input"
            type="text"
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
    );
};