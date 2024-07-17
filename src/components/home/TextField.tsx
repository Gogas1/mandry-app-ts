import { useState, ChangeEvent } from 'react';
import '../../styles/pages/home/text-field.scss'

interface TextFieldProps {
    label: string;
    text: string;
    onFocus: () => void;
    onBlur: () => void;
}

export default function TextField({ label, onFocus, onBlur }: TextFieldProps) {
    const [value, setValue] = useState<string>('');
    const [focused, setFocused] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
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