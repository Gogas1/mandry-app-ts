import { useState } from 'react';
import '../../styles/app/dropdown-addition.scss';
 
export interface DropdownOption {
    display: string;
    value: any;
}
  
interface DropdownProps {
    options: DropdownOption[];
    defaultValue?: DropdownOption;
    onChange: (value: DropdownOption) => void;
    className?: string;
}

export default function DropdownAddition({ options, defaultValue, onChange, className }: DropdownProps) {
    const [filteredOptions, setFilteredOptions] = useState<DropdownOption[]>([]);


    return ( <div className={`dropdown-addition-panel ${className}`}>
        <div className='dropdown-addition-content'>
            {options.map((o, index) => (
                <div 
                    key={index}
                    className='item'
                    onClick={() => { onChange(o) }}>
                    {o.display}
                </div>
            ))}
        </div>     
    </div> 
    )
}