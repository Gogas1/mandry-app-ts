import { ChangeEvent, useState } from "react";
import "../../styles/app/text-input-material.scss";

interface TextInputProps {
    label: string;
    onChange: (text: string) => void;
    className?: string;
    hideText?: boolean;
    icon?: string;
    iconCursorPointer?: boolean;
    onIconClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    outerValue?: string;
    validationError?: boolean;
}

export default function TextInputMaterial({ 
  label, 
  onChange, 
  className, 
  icon, 
  hideText = false, 
  iconCursorPointer = false, 
  onIconClick,
  onFocus,
  onBlur,
  outerValue = undefined,
  validationError
  }: TextInputProps) {
    
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');

    const handleFocus = () => {
        setFocused(true);
        if(onFocus) {
          onFocus();
        }
    }

    const handleBlur = () => {
        setFocused(false);

        if(onBlur) {
          onBlur();
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      
      setValue(text);
      onChange(text);
    };

    return (
      <div className={`text-input-material ${validationError ? 'error' : ''} ${className ? className : ''}  ${focused || value || outerValue ? 'focused' : ''}`}>
        <label className="label-material">{label}</label>
        <div className="input-container">
            <input 
              className="input-material"
              type={`${hideText ? 'password' : 'text'}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={outerValue ? outerValue : value}
               />
            {icon ? 
            (<img 
              src={icon} 
              className={`${iconCursorPointer ? 'pointer' : ''}`}
              onClick={onIconClick} />) 
            : ''} 
            <fieldset className="fieldset">
                <legend className="legend">
                    <span>{label}</span>
                </legend>
            </fieldset>
        </div>    
      </div>
    );
}