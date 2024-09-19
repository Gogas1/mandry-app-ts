import { useState } from 'react';
import heartEmptyIcon from '../../assets/icons/meta/heart-icon-2.svg';
import heartFilledIcon from '../../assets/icons/meta/heart-icon-filled-2.svg';

interface HeartIconProps {
    filled: boolean;
    onClick: () => void;
    className?: string;
    iconFalse?: string;
    iconTrue?: string;
}

export default function HeartIcon({ filled, className = '', iconFalse = heartEmptyIcon, iconTrue = heartFilledIcon, onClick }: HeartIconProps) {
    const [state, setState] = useState(filled);
    
    const handleClick = () => {
        setState(!state);
        onClick();
    }

    return (
        state ? (
            <img src={iconTrue} className={className} onClick={handleClick}/>
        ) : (
            <img src={iconFalse} className={className} onClick={handleClick}/> 
        )
    );
}