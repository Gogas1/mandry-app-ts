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
    closeAll: () => void;
    onChange: (values: TravelersPopupData) => void;
    
    //assignValue: (value: string) => void;
}

export default function TravelersPopup({ isOpen, closeAll, onChange }: PopupProps) {
    const { t } = useTranslation();

    const [adultsCounter, setAdultsCounter] = useState(0);
    const [childrenCounter, setChildrenCounter] = useState(0);
    const [toddlersCounter, setToddlersCounter] = useState(0);
    const [petsCounter, setPetsCounter] = useState(0);

    useEffect(() => {
        onChange({ adults: adultsCounter, children: childrenCounter, toddlers: toddlersCounter, pets: petsCounter } as TravelersPopupData);
    }, [adultsCounter, childrenCounter, toddlersCounter, petsCounter]);

    const handleIncrease = (currentNumber: number, setter: (value: number) => void) => {
        setter(currentNumber + 1);

        
    }

    const handleDecrease = (currentNumber: number, setter: (value: number) => void) => {
        if((currentNumber - 1) >= 0) {
            setter(currentNumber - 1);
        } else {
            setter(0);
        }  
    }

    return (
        <>
            <div className={`travelers-popup ${isOpen ? 'opened' : 'closed'}`}>
                <div className="popup-border"></div>
                <div className="popup-panel">
                    <div className='traveler'>
                        <div className="travelers-header">{t('travelersAdults')}
                            <div className="travelers-number-selector">
                                <button className="counter-control travelers-decrease" onClick={() => handleDecrease(adultsCounter, setAdultsCounter)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{adultsCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handleIncrease(adultsCounter, setAdultsCounter)}>
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
                                <button className="counter-control travelers-decrease" onClick={() => handleDecrease(childrenCounter, setChildrenCounter)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{childrenCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handleIncrease(childrenCounter, setChildrenCounter)}>
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
                                <button className="counter-control travelers-decrease" onClick={() => handleDecrease(toddlersCounter, setToddlersCounter)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{toddlersCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handleIncrease(toddlersCounter, setToddlersCounter)}>
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
                                <button className="counter-control travelers-decrease" onClick={() => handleDecrease(petsCounter, setPetsCounter)}>                                    
                                    <div className="line"></div>
                                </button>
                                <a className="travelers-counter">{petsCounter}</a>
                                <button className="counter-control travelers-increase" onClick={() => handleIncrease(petsCounter, setPetsCounter)}>
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='age-notification'>
                            {t('travelersServicePats')}
                        </div>
                    </div>
                </div>
                <div className="popup-hide" onClick={closeAll}>
                    <img src={arrowIcon} alt="arrow" />
                </div>
            </div>
        </>
    )
}