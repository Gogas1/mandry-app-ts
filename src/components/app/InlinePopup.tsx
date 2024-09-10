import { ReactNode, useState } from "react";

import crossIcon from '../../assets/icons/meta/close-cross.svg';

import '../../styles/app/inline-popup.scss';

interface InlinePopupProps {
    children: ReactNode;
    popupContent: ReactNode;
    className?: string;
}

export default function InlinePopup({ children, popupContent, className = '' }: InlinePopupProps) {
    const [popupOpened, setPopupOpened] = useState(false);

    const handleClick = () => {
        if(!popupOpened) {
            setPopupOpened(true);

        }
    }

    return (
        <>
            <span onClick={handleClick} className={`inline-popup ${className}`}>
                {children}

                {popupOpened ? (
                    <div className="inline-popup-wrapper">
                        <div className="inline-popup-panel">
                            {popupContent}
                        </div>
                        <button className="inline-popup-button" onClick={() => setPopupOpened(false)}>
                            <img src={crossIcon} />
                        </button>
                    </div>
                ): ''}                
            </span>
        </>
    );
}