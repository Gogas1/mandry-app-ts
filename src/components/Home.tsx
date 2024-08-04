import '../styles/pages/home/home.scss'

import searchIcon from '../assets/icons/home/search.svg';
import destinationIcon from '../assets/icons/home/dest_icn.svg';
import calendarIcon from '../assets/icons/home/calendar_icn.svg';
import groupIcon from '../assets/icons/home/group_icn.svg';

import { useTranslation } from 'react-i18next';
import TextFieldMy from './home/TextFieldMy';
import DestinationPopup from './home/DestinationPopup';
import { useState } from 'react';
import CalendarPopup from './home/CalendarPopup';
import TravelersPopup from './home/TravelersPopup';

export default function Home() {
    const { t } = useTranslation();
    document.title = `Mandry - ${t('homeTitle')}`

    const [openedPopup, setOpenedPopup] = useState('');
    const [selectedDestination, setSelectedDestination] = useState('');

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
                        <div className='search-block'>
                            <div className='search-panel-border'>
                                <div className='search-panel'>
                                    <div className='search-input-group'>
                                        <img src={destinationIcon} alt='destination' className='inner-icon' />                                        
                                        <TextFieldMy 
                                            label={t('searchDestinationLabel')}
                                            text={selectedDestination} 
                                            onFocus={onDestinationFieldFocus}
                                            onBlur={onDestinationFieldBlur}/>
                                    </div>
                                    <div className='divider'></div>
                                    <div className='search-input-group'>
                                        <img src={calendarIcon} alt='destination' className='inner-icon'/>
                                        <TextFieldMy 
                                            label={t('searchDatesLabel')}
                                            text=''
                                            onFocus={onDatesFieldFocus}
                                            onBlur={onDatesFieldBlur} />
                                    </div>
                                    <div className='divider'></div>
                                    <div className='search-input-group'>
                                        <img src={groupIcon} alt='destination' className='inner-icon'/>
                                        <TextFieldMy 
                                            label={t('searchPeopleSettingsLabel')} 
                                            text=''
                                            onFocus={onTravelersFieldFocus}
                                            onBlur={onTravelersFieldBlur}/>
                                    </div>
                                    <button className='search-button'>
                                        <img src={searchIcon} alt='search' />
                                    </button>
                                </div>
                            </div>
                            <div className='popup-wrapper'>
                                <DestinationPopup 
                                    isOpen={openedPopup === 'destinationPopup'} 
                                    assignValue={handleDestinationSelection} 
                                    closeAll={handleCloseAllPopups} />
                                <CalendarPopup 
                                    isOpen={openedPopup === 'calendarPopup'}
                                    closeAll={handleCloseAllPopups}
                                    />
                                <TravelersPopup
                                    isOpen={openedPopup === 'travelersPopup'}
                                    closeAll={handleCloseAllPopups}
                                    />
                            </div>
                        </div>
                        <div className='main-caption'>
                            {t('mainCaption')}
                        </div> 
                    </div>
                    
                </div>
            </div>            
        </>
    );
}