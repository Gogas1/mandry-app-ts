import { MouseEvent, useRef } from 'react';
import '../../styles/app/radio.scss';

interface RadioProps {
    name: string;
    label?: string;
    className?: string;
    value: string;
    onCheck: (value: string) => void;
    allowUncheck?: boolean;
}

export default function Radio({ name, label = '', className = '', value, onCheck, allowUncheck = false }: RadioProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = (event: MouseEvent<HTMLInputElement>) => {
        if(allowUncheck) {
            if(inputRef.current) {
                if(inputRef.current.checked) {
                    inputRef.current.checked = false;
                }
                
            }
        }
    }

    return (
        <label className={`radio ${className}`}>{label}
            <input type="radio" name={name} onChange={() => onCheck(value)} ref={inputRef} />
            <span className="checkmark"></span>
        </label>
    );
}