import { useTranslation } from "react-i18next";

import arrowIcon from "../../assets/icons/meta/arrow.svg";

import '../../styles/pages/home/travelers-popup.scss';
import { useEffect, useState } from "react";

export interface TravelersPopupData {
    adults: number;
    children: number;
    toddlers: number;
    pets: number;
}

interface PopupProps {
    isOpen: boolean;
    showBackButton?: boolean;
    className?: string;
    closeAll: () => void;
    onChange: (values: TravelersPopupData) => void;
    capConditionFunction?: (values: TravelersPopupData) => boolean;
    
    //assignValue: (value: string) => void;
}

export default function TravelersPopup({ isOpen, showBackButton = true, className = '', closeAll, onChange, capConditionFunction }: PopupProps) {
    const { t } = useTranslation();

    const [adultsCounter, setAdultsCounter] = useState(0);
    const [childrenCounter, setChildrenCounter] = useState(0);
    const [toddlersCounter, setToddlersCounter] = useState(0);
    const [petsCounter, setPetsCounter] = useState(0);

    useEffect(() => {
        onChange({ adults: adultsCounter, children: childrenCounter, toddlers: toddlersCounter, pets: petsCounter } as TravelersPopupData);
    }, [adultsCounter, childrenCounter, toddlersCounter, petsCounter]);

    const handleAdultsChange = (newValue: number) => {
        if(newValue < 0) return;
        if(capConditionFunction) {
            if(!capConditionFunction({ 
                adults: newValue, 
                children: childrenCounter, 
                toddlers: toddlersCounter, 
                pets: petsCounter } as TravelersPopupData)) {
                    return;
                }
        }

        setAdultsCounter(newValue);
    }

    const handleChildrenChange = (newValue: number) => {
        if(newValue < 0) return;
        if(capConditionFunction) {
            if(!capConditionFunction({ 
                adults: adultsCounter, 
                children: newValue, 
                toddlers: toddlersCounter, 
                pets: petsCounter } as TravelersPopupData)) {
                    return;
                }
        }

        setChildrenCounter(newValue);
    }

    const handleToddlersChange = (newValue: number) => {
        if(newValue < 0) return;
        if(capConditionFunction) {
            if(!capConditionFunction({ 
                adults: adultsCounter, 
                children: childrenCounter, 
                toddlers: newValue, 
                pets: petsCounter } as TravelersPopupData)) {
                    return;
                }
        }

        setToddlersCounter(newValue);
    }

    const handlePetsChange = (newValue: number) => {
        if(newValue < 0) return;
        if(capConditionFunction) {
            if(!capConditionFunction({ 
                adults: adultsCounter, 
                children: childrenCounter, 
                toddlers: toddlersCounter, 
                pets: newValue } as TravelersPopupData)) {
                    return;
                }
        }

        setPetsCounter(newValue);
    }

    return (
        <>
            <div className={`travelers-popup ${isOpen ? 'opened' : 'closed'} ${className}`}>
                <div className={`popup-border ${showBackButton ? 'show-back-icon' : ''}`}></div>
                <div className={`popup-panel ${showBackButton ? 'show-back-icon' : ''}`}>
                    <div className='traveler'>
                        <div className="travelers-header">{t('travelersAdults')}
                            <div className="travelers-number-selector">
                                <button className="counter-control travelers-decrease" onClick={() => handleAdultsChange(adultsCounter - 1)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{adultsCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handleAdultsChange(adultsCounter + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='age-notification'>
                            {t('travelersAdultAge')}
                        </div>
                        <div className="divider"></div>
                    </div>

                    <div className='traveler'>
                        <div className="travelers-header">{t('travelersChildren')}
                            <div className="travelers-number-selector">
                                <button className="counter-control travelers-decrease" onClick={() => handleChildrenChange(childrenCounter - 1)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{childrenCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handleChildrenChange(childrenCounter + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='age-notification'>
                            {t('travelersChildrenAge')}
                        </div>
                        <div className="divider"></div>
                    </div>

                    <div className='traveler'>
                        <div className="travelers-header">{t('travelersInfants')}
                            <div className="travelers-number-selector">
                                <button className="counter-control travelers-decrease" onClick={() => handleToddlersChange(toddlersCounter - 1)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{toddlersCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handleToddlersChange(toddlersCounter + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='age-notification'>
                            {t('travelersInfantAge')}
                        </div>
                        <div className="divider"></div>
                    </div>

                    <div className='traveler'>
                        <div className="travelers-header">{t('travelersPats')}
                            <div className="travelers-number-selector">
                                <button className="counter-control travelers-decrease" onClick={() => handlePetsChange(petsCounter - 1)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{petsCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handlePetsChange(petsCounter + 1)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='age-notification'>
                            {t('travelersServicePats')}
                        </div>
                    </div>
                </div>
                {showBackButton ? (
                    <div className="popup-hide" onClick={closeAll}>
                        <img src={arrowIcon} alt="arrow" />
                    </div>
                ) : ''}                
            </div>
        </>
    )
}