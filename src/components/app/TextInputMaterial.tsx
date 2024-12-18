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
    disabled?: boolean; 
    enableIconClick?: boolean;
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
  validationError,
  disabled = false,
  enableIconClick = false
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
      <div className={`text-input-material ${validationError ? 'error' : ''} ${className ? className : ''}  ${focused || value || outerValue ? 'focused' : ''} ${disabled && 'disabled'}`}>
        <label className="label-material">{label}</label>
        <div className="input-container">
            <input 
              className="input-material"
              type={`${hideText ? 'password' : 'text'}`}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              value={outerValue ? outerValue : value}
              disabled={disabled}
               />
            {icon ? 
            (<img 
              src={icon} 
              className={`${iconCursorPointer && (!disabled || enableIconClick) ? 'pointer' : ''}`}
              onClick={!disabled || enableIconClick ? onIconClick : undefined} />) 
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