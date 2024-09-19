import { useState } from 'react';
import heartEmptyIcon from '../../assets/icons/meta/heart-icon-2.svg';
import heartFilledIcon from '../../assets/icons/meta/heart-icon-filled-2.svg';

interface HeartIconProps {
    filled: boolean;
    onClick: () => void;
    className?: string;
}

export default function HeartIcon({ filled, className = '', onClick }: HeartIconProps) {
    const [state, setState] = useState(filled);
    
    const handleClick = () => {
        setState(!state);
        onClick();
    }

    return (
        state ? (
            <img src={heartFilledIcon} className={className} onClick={handleClick}/>
        ) : (
            <img src={heartEmptyIcon} className={className} onClick={handleClick}/> 
        )
    );
}