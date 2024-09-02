import '../../styles/search/search-panel.scss';

import searchIcon from '../../assets/icons/home/search.svg';
import destinationIcon from '../../assets/icons/home/dest_icn1.svg';
import calendarIcon from '../../assets/icons/home/calendar_icn1.svg';
import groupIcon from '../../assets/icons/home/group_icn1.svg';


import filtersIcon from '../../assets/icons/meta/settings.svg';

import TextFieldMy from '../home/TextFieldMy';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TravelersPopup, { TravelersPopupData } from '../home/TravelersPopup';
import DestinationPopup from '../home/DestinationPopup';
import CalendarPopup from '../home/CalendarPopup';
import CheckboxRound from '../app/CheckboxRound';
import FeatureService, { Feature } from '../../helpers/FeatureService';
import Section2 from './search-panel/Section2';

interface SearchPanelProps {
    className?: string;
}

export default function SearchPanel({ className = '' }: SearchPanelProps) {
    const { t } = useTranslation();

    const [openedPopup, setOpenedPopup] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');
    const [selectedDates, setSelectedDates] 
        = useState<{firstDate: Date | undefined, secondDate: Date | undefined}>
        ({firstDate: undefined, secondDate: undefined});

    const [travelersValue, setTravelersValue] = useState('');

    const [selectedFeatures, setSelectedFeatures] = useState<{feature: Feature, isChecked: boolean}[]>(
        FeatureService.getFeatures().map(f => ({
            feature: f,
            isChecked: false
        })));

    const handleFeatureCheck = (feature: Feature) => {
        setSelectedFeatures(prevSelectedFeatures =>
            prevSelectedFeatures.map(item => item.feature.id === feature.id 
                ? { ...item, isChecked: true }
                : item
            )
        );
    };

    const handleFeatureUncheck = (feature: Feature) => {
        setSelectedFeatures(prevSelectedFeatures =>
            prevSelectedFeatures.map(item => item.feature.id === feature.id 
                ? { ...item, isChecked: false }
                : item
            )
        );
    };

    const formatTravelers = ({
        adults,
        children,
        toddlers,
        pets,
      }: {
        adults: number;
        children: number;
        toddlers: number;
        pets: number;
      }) => {
        if((adults + children + toddlers + pets) === 0) return '';

        const adultsText = adults > 0 ? `${t('travelersAdults')}: ${adults}` : '';
        const childrenText = children > 0 ? `${t('travelersChildren')}: ${children}` : '';
        const toddlersText = toddlers > 0 ? `${t('travelersInfants')}: ${toddlers}` : '';
        const petsText = pets > 0 ? `${t('travelersPats')}: ${pets}` : '';

        return `${adultsText} ${childrenText} ${toddlersText} ${petsText}`;
      };

    const handleTravelersChange = (values: TravelersPopupData) => {
        setTravelersValue(formatTravelers(values));
    }

    const handleDestinationSelection = (value: string) => {
        setSelectedDestination(value);
    }

    const handleCloseAllPopups = () => {
        setOpenedPopup('');
    }

    const onDestinationFieldFocus = () => {
        handleCloseAllPopups();
        setOpenedPopup('destinationPopup');
    }

    const onDestinationFieldBlur = () => {
    }

    const onDatesFieldFocus = () => {
        handleCloseAllPopups();
        setOpenedPopup('calendarPopup');
    }

    const onDatesFieldBlur = () => {
        
    }

    const onTravelersFieldFocus = () => {
        handleCloseAllPopups();
        setOpenedPopup('travelersPopup');
    }

    const onTravelersFieldBlur = () => {
        
    }

    const handleDatesChange = (firstDate: Date | undefined, secondDate: Date | undefined) => {
        setSelectedDates({ firstDate: firstDate, secondDate: secondDate });
    }

    return (
        <>
            <section className={`filters-section ${className}`}>
                <div className="filter-section filter-section--1">
                    <div className="border">
                        <div className="panel">
                            <div className="input-group">
                                <img src={destinationIcon} alt='destination' className='inner-icon' />
                                <TextFieldMy 
                                    label={t('SearchPage.SearchPanel.Filters.Filter1.Destination')}
                                    text={selectedDestination}                                            
                                    onFocus={onDestinationFieldFocus}
                                    onBlur={onDestinationFieldBlur}
                                    onChange={setSelectedDestination}/>
                            </div>
                            <div className="divider"></div>
                            <div className="input-group">
                                <img src={calendarIcon} alt='destination' className='inner-icon'/>
                                <TextFieldMy 
                                    label={t('SearchPage.SearchPanel.Filters.Filter1.Period')}
                                    text={formatDates(selectedDates.firstDate, selectedDates.secondDate)}
                                    onFocus={onDatesFieldFocus}
                                    onBlur={onDatesFieldBlur} 
                                    onChange={s => s}/>
                            </div>
                            <div className="divider"></div>
                            <div className="input-group">
                                <img src={groupIcon} alt='destination' className='inner-icon'/>
                                <TextFieldMy 
                                    label={t('SearchPage.SearchPanel.Filters.Filter1.Travelers')} 
                                    text={travelersValue}
                                    onFocus={onTravelersFieldFocus}
                                    onBlur={onTravelersFieldBlur}
                                    onChange={s => s}/>
                            </div>
                            <button className='search-button'>
                                <img src={searchIcon} alt='search' />
                            </button>
                        </div>
                    </div>
                    <div className='popup-wrapper'>
                        <DestinationPopup 
                            isOpen={openedPopup === 'destinationPopup'}
                            searchValue={selectedDestination} 
                            assignValue={handleDestinationSelection} 
                            closeAll={handleCloseAllPopups} />
                        <CalendarPopup
                            isOpen={openedPopup === 'calendarPopup'}
                            closeAll={handleCloseAllPopups}
                            onChange={handleDatesChange}
                        />
                        <TravelersPopup
                            isOpen={openedPopup === 'travelersPopup'}
                            closeAll={handleCloseAllPopups}
                            onChange={handleTravelersChange}
                        />
                    </div>
                </div>
                <Section2 />
                <div className="filter-section filter-section--3">
                    <div className='filter-panel feature-filter'>
                        {selectedFeatures.map((feature, index) => (
                            <div className='feature' key={index}>
                                <div className='feature-main'>
                                    <img src={feature.feature.icon} className='feature-icon' />
                                    <div className='feature-name'>
                                        {t(feature.feature.nameKey)}
                                    </div>
                                </div>
                                <CheckboxRound
                                    onCheck={() => handleFeatureCheck(feature.feature)}
                                    onUncheck={() => handleFeatureUncheck(feature.feature)}
                                    isChecked={feature.isChecked} />
                            </div>
                        ))}
                    </div>
                    <div className='filter-panel filters-filter'>
                        {t('SearchPage.SearchPanel.Filters.FilterFilters.Label')}
                        <img src={filtersIcon} />
                    </div>
                </div>
            </section>
        </>
    );
}

function formatDates(firstDate: Date | undefined, secondDate: Date | undefined): string {
    const formatDate = (date: Date | undefined): string => {
        return date ? date.toLocaleDateString('en-GB').split('/').join('.') : '';
    };

    const formattedFirstDate = formatDate(firstDate);
    const formattedSecondDate = formatDate(secondDate);

    // If both dates are undefined, return an empty string
    if (!formattedFirstDate && !formattedSecondDate) {
        return '';
    }

    // Return the formatted dates with a space if one of the dates is missing
    return `${formattedFirstDate} - ${formattedSecondDate}`;
}
