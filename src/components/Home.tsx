import '../styles/pages/home/home.scss'

import searchIcon from '../assets/icons/home/search.svg';
import destinationIcon from '../assets/icons/home/dest_icn1.svg';
import calendarIcon from '../assets/icons/home/calendar_icn1.svg';
import groupIcon from '../assets/icons/home/group_icn1.svg';

import { useTranslation } from 'react-i18next';
import TextFieldMy from './home/TextFieldMy';
import DestinationPopup from './home/DestinationPopup';
import { useState } from 'react';
import CalendarPopup from './home/CalendarPopup';
import TravelersPopup, { TravelersPopupData } from './home/TravelersPopup';

import background from '../assets/bg2.jpeg';
import TopDestinationsSection from './home/TopDestinationsSection';
import HousingsSection from './home/HousingsSection';
import PromotionsSection from './home/PromotionsSection';
import AccessbilitiesSection from './home/AccessbilitiesSection';
import TopHotelsSection from './home/TopHotels.Section';
import PartnersSection from './home/PartnersSection';
import FooterSection from './home/FooterSection';

export default function Home() {
    const { t } = useTranslation();
    document.title = `Mandry - ${t('homeTitle')}`

    const [openedPopup, setOpenedPopup] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');

    const [travelersValue, setTravelersValue] = useState('');

    

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

    
    
    return (
        <>
            <div className="home-page">
                <div className='content-container'>
                    <div className='floor-container first-container'>
                        <div className='n-banner'>
                            <img src={background} />                            
                        </div>
                        <div className='n-content'>
                            <div className='search-block'>
                                <div className='search-panel-border'>
                                    <div className='search-panel'>
                                        <div className='search-input-group'>
                                            <img src={destinationIcon} alt='destination' className='inner-icon' />                                        
                                            <TextFieldMy 
                                                label={t('searchDestinationLabel')}
                                                text={selectedDestination}                                            
                                                onFocus={onDestinationFieldFocus}
                                                onBlur={onDestinationFieldBlur}
                                                onChange={setSelectedDestination}/>
                                        </div>
                                        <div className='divider'></div>
                                        <div className='search-input-group'>
                                            <img src={calendarIcon} alt='destination' className='inner-icon'/>
                                            <TextFieldMy 
                                                label={t('searchDatesLabel')}
                                                text=''
                                                onFocus={onDatesFieldFocus}
                                                onBlur={onDatesFieldBlur} 
                                                onChange={s => s}/>
                                        </div>
                                        <div className='divider'></div>
                                        <div className='search-input-group'>
                                            <img src={groupIcon} alt='destination' className='inner-icon'/>
                                            <TextFieldMy 
                                                label={t('searchPeopleSettingsLabel')} 
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
                                        />
                                    <TravelersPopup
                                        isOpen={openedPopup === 'travelersPopup'}
                                        closeAll={handleCloseAllPopups}
                                        onChange={handleTravelersChange}
                                        />
                                </div>
                            </div>
                            <div className='main-caption'>
                                {t('mainCaption')}
                            </div>
                        </div>
                        {/* <div className='banner-container'>
                            <div className='banner'>
                                <div className='main-caption'>
                                    {t('mainCaption')}
                                </div>
                                <img src={background} />
                            </div>
                            
                        </div>
                        <div className='search-block'>
                            <div className='search-panel-border'>
                                <div className='search-panel'>
                                    <div className='search-input-group'>
                                        <img src={destinationIcon} alt='destination' className='inner-icon' />                                        
                                        <TextFieldMy 
                                            label={t('searchDestinationLabel')}
                                            text={selectedDestination}                                            
                                            onFocus={onDestinationFieldFocus}
                                            onBlur={onDestinationFieldBlur}
                                            onChange={setSelectedDestination}/>
                                    </div>
                                    <div className='divider'></div>
                                    <div className='search-input-group'>
                                        <img src={calendarIcon} alt='destination' className='inner-icon'/>
                                        <TextFieldMy 
                                            label={t('searchDatesLabel')}
                                            text=''
                                            onFocus={onDatesFieldFocus}
                                            onBlur={onDatesFieldBlur} 
                                            onChange={s => s}/>
                                    </div>
                                    <div className='divider'></div>
                                    <div className='search-input-group'>
                                        <img src={groupIcon} alt='destination' className='inner-icon'/>
                                        <TextFieldMy 
                                            label={t('searchPeopleSettingsLabel')} 
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
                                    />
                                <TravelersPopup
                                    isOpen={openedPopup === 'travelersPopup'}
                                    closeAll={handleCloseAllPopups}
                                    onChange={handleTravelersChange}
                                    />
                            </div>
                        </div> */}
                        {/* <div className='main-caption'>
                            {t('mainCaption')}
                        </div>  */}
                    </div>
                    <TopDestinationsSection />
                    <HousingsSection className='floor-container' />
                    <PromotionsSection className='floor-container fourth-container' />
                    <AccessbilitiesSection className='floor-container fifth-container' />
                    <TopHotelsSection />
                    <PartnersSection className='floor-container partners-block'/>
                    <FooterSection />
                </div>
            </div>            
        </>
    );
}

