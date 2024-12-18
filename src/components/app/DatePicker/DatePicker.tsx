import { ChangeEvent, useState } from "react";

import '../../../styles/app/date-picker/date-picker.scss'
import DatePickerCalendar from "./DatePickerCalendar";
// import { IsDatesEqual } from "../../../helpers/DateUtils";

interface DatePickerProps {
    label: string;
    
    className?: string;
    icon?: string;
    iconCursorPointer?: boolean;
    showError?: boolean;

    outerValue?: Date;
    outerValueOverride?: boolean;
    disable?: boolean;

    onChange: (date: Date) => void;

    onFocus?: () => void;
    onIconClick?: () => void;
}

export default function DatePicker(
    { 
        label, 
        onChange, 
        onFocus, 
        onIconClick, 
        className = '', 
        icon, 
        iconCursorPointer, 
        showError = false, 
        outerValue, 
        outerValueOverride = true, 
        disable 
    }: DatePickerProps) {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);

    const handleFocus = () => {
        setFocused(true);
        setShowCalendar(!showCalendar);
        if(onFocus) {
          onFocus();
        }
    }

    const toDateString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
    
        const localDateString = `${year}-${month}-${day}`;

        return localDateString;
    }

    if(outerValueOverride) {
        if(outerValue) {
            if(value != toDateString(outerValue)) {
                setValue(toDateString(outerValue));
            }
        }
        else {
            if(value) {
                setValue('');
            }
        }
    }
    
    
        

    const handleBlur = () => {
        setFocused(false);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;

      setValue(text);
      onChange(new Date(text));
    };

    const handleDateSelection = (date: Date | undefined) => {
        if(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
    
            const localDateString = `${year}-${month}-${day}`;
    
            setValue(localDateString);
            onChange(date);

            return;
        }
        
        setValue('');
    }

    return (
        <div className={`date-input-container ${className ? className : ''}`}>
            <div className={`date-input-material ${focused || value ? 'focused' : ''} ${showError ? 'error' : ''}`}>
                <label className="label-material">{label}</label>
                <div className="input-container">
                    <input 
                        className="input-material"
                        type='date'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={value}
                        disabled={disable}
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

            {showCalendar ? (<DatePickerCalendar
                onDateSelect={handleDateSelection}
                className="dp-calendar"
                 />) : ''}
            
        </div>
        
      );
}