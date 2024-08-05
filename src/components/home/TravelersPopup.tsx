import { useTranslation } from "react-i18next";

import arrowIcon from "../../assets/icons/meta/arrow.svg";
import plusIcon from "../../assets/icons/meta/plus-circle.svg";
import removeIcon from "../../assets/icons/meta/remove-circle.svg";

import '../../styles/pages/home/travelers-popup.scss';

interface PopupProps {
    isOpen: boolean;
    closeAll: () => void;
    //assignValue: (value: string) => void;
}

export default function TravelersPopup({ isOpen, closeAll }: PopupProps) {
    const { t } = useTranslation();
    return (
        <>
            <div className={`travelers-popup ${isOpen ? 'opened' : 'closed'}`}>
                <div className="popup-border"></div>
                <div className="popup-panel">
                    <div className='traveler'>
                        <div className="travelers-header">{t('travelersAdults')}
                            <div className="travelers-number-selector">
                                <div className="travelers-decrease"><img src={removeIcon} alt="decrease" /></div>
                                <a className="travelers-counter">0</a>
                                <div className="travelers-increase"><img src={plusIcon} alt="increase" /></div>
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
                                <div className="travelers-decrease"><img src={removeIcon} alt="decrease" /></div>
                                <a className="travelers-counter">0</a>
                                <div className="travelers-increase"><img src={plusIcon} alt="increase" /></div>
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
                                <div className="travelers-decrease"><img src={removeIcon} alt="decrease" /></div>
                                <a className="travelers-counter">0</a>
                                <div className="travelers-increase"><img src={plusIcon} alt="increase" /></div>
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
                                <div className="travelers-decrease"><img src={removeIcon} alt="decrease" /></div>
                                <a className="travelers-counter">0</a>
                                <div className="travelers-increase"><img src={plusIcon} alt="increase" /></div>
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