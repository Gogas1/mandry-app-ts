import { ChangeEvent, useState } from "react";

import '../../../styles/app/date-picker/date-picker.scss'
import DatePickerCalendar from "./DatePickerCalendar";

interface DatePickerProps {
    label: string;
    onChange: (text: string) => void;
    onFocus?: () => void;
    className?: string;
    icon?: string;
    iconCursorPointer?: boolean;
    onIconClick?: () => void;
}

export default function DatePicker({ label, onChange, onFocus, onIconClick, className = '', icon, iconCursorPointer }: DatePickerProps) {
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

    const handleBlur = () => {
        setFocused(false);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      
      setValue(text);
      onChange(text);
    };

    const handleDateSelection = (date: Date | undefined) => {
        if(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
    
            const localDateString = `${year}-${month}-${day}`;
    
            setValue(localDateString);

            return;
        }
        
        setValue('');
    }

    return (
        <div className="date-input-container">
            <div className={`date-input-material ${className ? className : ''}  ${focused || value ? 'focused' : ''}`}>
                <label className="label-material">{label}</label>
                <div className="input-container">
                    <input 
                        className="input-material"
                        type='date'
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={value}
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
                 />) : ''}
            
        </div>
        
      );
}