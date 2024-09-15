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
// import FeatureService, { Feature } from '../../helpers/FeatureService';
import Section2, { Category } from './search-panel/Section2';
import { Translation } from '../../helpers/TranslationService';
import FeatureService from '../../helpers/FeatureService';
import { FilterSetting } from './SearchPage';
import { useModal } from '../app/ModalContext';
import FiltersModal from './FiltersModal';

interface SearchPanelProps {
    className?: string;
    filters: FilterSetting;
    categories: Category[];
    features: Feature[];
    searchHandler: () => void;
    filterChangeHandler: (filters: FilterSetting) => void;
}

type Image = {
    id: string,
    src: string,
}

export type Feature = {
    id: string,
    nameCode: string,
    descriptionCode: string,
    typeCode: string,
    featureIcon: Image,
    isHouseRule: boolean,

    translations: Translation[]
}

export default function SearchPanel({ filters, categories, features, className = '', searchHandler, filterChangeHandler }: SearchPanelProps) {
    const { t } = useTranslation();

    const { openModal, closeModal } = useModal();

    const [openedPopup, setOpenedPopup] = useState('');
    const [destinationSearchValue, setDestinationSearchValue] = useState('');

    const handleFeatureCheck = (feature: Feature) => {
        const updatedFilter = { ...filters };
        updatedFilter.features = [...filters.features, feature]

        filterChangeHandler(updatedFilter);
    };

    const handleFeatureUncheck = (feature: Feature) => {
        const updatedFilter = { ...filters };
        updatedFilter.features = [...filters.features.filter((targetFeature) => targetFeature.id !== feature.id)]

        filterChangeHandler(updatedFilter);
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
        
        const updatedFilter = { ...filters };
        updatedFilter.travelers = { adults: values.adults, children: values.children, toddlers: values.toddlers, pets: values.pets }
        filterChangeHandler(updatedFilter);
    }

    const handleDestinationSelection = (value: string) => {
        const updatedFilters = { ...filters };
        updatedFilters.destination = value;
        filterChangeHandler(updatedFilters);
        setDestinationSearchValue(value);
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
        const updatedFilters = { ...filters };
        if(firstDate && secondDate) {
            updatedFilters.period = { startDate: firstDate, endDate: secondDate }
        }
        else {
            updatedFilters.period = undefined;
        }

        filterChangeHandler(updatedFilters);
    }

    const handleFiltersModalCall = () => {
        openModal(
            "filtersModal", 
            <FiltersModal 
                hideModal={() => closeModal("filtersModal")}
                filters={filters}
                features={features}
                categories={categories}
                searchHandler={searchHandler}
                filterChangeHandler={filterChangeHandler} />,
            { minWidth: '35%', maxWidth: '35%' });
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
                                    text={destinationSearchValue}                                          
                                    onFocus={onDestinationFieldFocus}
                                    onBlur={onDestinationFieldBlur}
                                    onChange={setDestinationSearchValue}/>
                            </div>
                            <div className="divider"></div>
                            <div className="input-group">
                                <img src={calendarIcon} alt='destination' className='inner-icon'/>
                                <TextFieldMy 
                                    label={t('SearchPage.SearchPanel.Filters.Filter1.Period')}
                                    text={formatDates(filters.period?.startDate, filters.period?.endDate)}
                                    onFocus={onDatesFieldFocus}
                                    onBlur={onDatesFieldBlur} 
                                    onChange={s => s}/>
                            </div>
                            <div className="divider"></div>
                            <div className="input-group">
                                <img src={groupIcon} alt='destination' className='inner-icon'/>
                                <TextFieldMy 
                                    label={t('SearchPage.SearchPanel.Filters.Filter1.Travelers')} 
                                    text={formatTravelers(filters.travelers)}
                                    onFocus={onTravelersFieldFocus}
                                    onBlur={onTravelersFieldBlur}
                                    onChange={s => s}/>
                            </div>
                            <button className='search-button' onClick={searchHandler}>
                                <img src={searchIcon} alt='search' />
                            </button>
                        </div>
                    </div>
                    <div className='popup-wrapper'>
                        <DestinationPopup 
                            isOpen={openedPopup === 'destinationPopup'}
                            searchValue={destinationSearchValue} 
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
                <Section2 
                    categories={categories}
                    filterChangeHandler={filterChangeHandler} 
                    filters={filters} />
                <div className="filter-section filter-section--3">
                    <div className='filter-panel feature-filter'>
                        {features.slice(0, 6).map((feature, index) => (
                            <div className='feature' key={index}>
                                <div className='feature-main'>
                                    <img src={FeatureService.getFeatureIcon(feature.featureIcon.src)} className='feature-icon' />
                                    <div className='feature-name'>
                                        {t(feature.nameCode)}
                                    </div>
                                </div>
                                <CheckboxRound
                                    onCheck={() => handleFeatureCheck(feature)}
                                    onUncheck={() => handleFeatureUncheck(feature)}
                                    isChecked={filters.features.some(f => f.id === feature.id)} />
                            </div>
                        ))}
                    </div>
                    <div className='filter-panel filters-filter'>
                        {t('SearchPage.SearchPanel.Filters.FilterFilters.Label')}
                        <img src={filtersIcon} onClick={handleFiltersModalCall} />
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
