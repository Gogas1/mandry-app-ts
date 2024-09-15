import '../../../styles/search/filter-modal/reservation-filter.scss';
import flashIcon from '../../../assets/icons/search/flash.svg';
import keyIcon from '../../../assets/icons/search/key.svg';
import pawIcon from '../../../assets/icons/search/paw.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function ReservationFilter() {
    const { t } = useTranslation();

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <div className="reservation-filter">
                <h2 className='reservation-filter__header'>
                    {t("Modals.Filters.Sections.Reservations.Header")}
                </h2>
                <div className='reservation-filter__reservations'>
                    <div 
                        className={`reservation-item ${selectedIndex === 0 ? 'selected' : ''}`}
                        onClick={() => setSelectedIndex(0)}>
                        <img src={flashIcon} />
                        {t("Modals.Filters.Sections.Reservations.Instant")}
                    </div>
                    <div 
                        className={`reservation-item ${selectedIndex === 1 ? 'selected' : ''}`}
                        onClick={() => setSelectedIndex(1)}>
                        <img src={keyIcon} />
                        {t("Modals.Filters.Sections.Reservations.Self")}
                    </div>
                    <div 
                        className={`reservation-item ${selectedIndex === 2 ? 'selected' : ''}`}
                        onClick={() => setSelectedIndex(2)}>
                        <img src={pawIcon} />
                        {t("Modals.Filters.Sections.Reservations.Pets")}
                    </div>
                </div>
                
            </div>
        </>
    );
}