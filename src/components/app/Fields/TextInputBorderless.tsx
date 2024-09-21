import { ChangeEvent, useState } from 'react';
import '../../../styles/app/fields/text-input-borderless.scss';

interface TextInputBorderlessProps {
    label: string;

    className?: string;

    icon?: string;
    iconCursorPointer?: boolean;
    onIconClick?: () => void;

    showLabelAlways?: boolean;
    disableManual?: boolean;
    
    outerValue?: string;
    onChange?: (value: string) => void;
    onClick?: () => void;
}

export default function TextInputBorderless(
    { 
        label,
        className = '', 
        icon, 
        iconCursorPointer, 
        onIconClick, 
        showLabelAlways = false, 
        disableManual = false, 
        onChange,
        onClick,
        outerValue = ''
    }: TextInputBorderlessProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleClick = () => {
        if(onClick) {
            onClick();
            console.log(1);
        } 
    }

    const handleBlur = () => {
        setIsFocused(false);
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        if(newValue.length > label.length) {
            setValue(newValue.substring(label.length + 2));
        } else {
            setValue(newValue);
        }

        if (onChange) onChange(newValue);
    }

    return (
        <>
            <div className={`text-input-borderless ${className}`}>
                <div
                    className='main-text-input-container'>
                    {icon ? 
                            (
                            <div className='icon'>
                                <img 
                                src={icon} 
                                className={`${iconCursorPointer ? 'pointer' : ''}`}
                                onClick={onIconClick} />
                            </div>) 
                            : ''} 
                    <div 
                        className="input-container">
                        {!isFocused && !value && !outerValue ? (
                            <div className='label-container' >
                                <label className="label" >{label}</label>
                            </div> 
                        ) : ''}
                        <textarea 
                            className={`input-borderless ${disableManual ? 'disabled' : ''}`}
                            value={showLabelAlways && (value || outerValue) ? (`${label}: ${outerValue ? outerValue : value}`) : (`${outerValue ? outerValue : value}`)}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onClick={handleClick}                  
                            disabled={disableManual}
                            spellCheck={false}></textarea>
                    </div>
                </div>
                <div className="underline"></div>
            </div>
        </>
    );
}