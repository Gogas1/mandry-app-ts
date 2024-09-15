import { useState, ChangeEvent } from 'react';
import '../../styles/pages/home/text-field.scss'

interface TextFieldProps {
    label: string;
    text: string;
    onFocus: () => void;
    onBlur: () => void;
    onChange: (value: string) => void;
}

export default function TextFieldMy({ label, text, onFocus, onBlur, onChange }: TextFieldProps) {
    const [value, setValue] = useState<string>(text);
    const [focused, setFocused] = useState<boolean>(false);

    

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e.target.value);
    };
    
      const handleFocus = () => {
        setFocused(true);
        onFocus();
      };
    
      const handleBlur = () => {
        setFocused(false);
        onBlur();
      };

    return (
        <div className={`textfield ${focused || value || text ? 'focused' : ''}`}>
          <label className="textfield__label">{label}</label>
          <input
            className="textfield__input"
            type="text"
            // defaultValue={text}
            value={text ? text : value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
    );
};