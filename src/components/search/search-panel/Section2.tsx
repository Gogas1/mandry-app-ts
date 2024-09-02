import { Slider } from '@mui/material';
import arrowBlue from '../../../assets/icons/meta/arrow-blue.svg';

import { Trans, useTranslation } from "react-i18next";
import { useState } from 'react';
import DropdownAddition, { DropdownOption } from '../../app/DropdownAddition';

export enum SearchHousingType {
    HOUSE = "HOUSE",
    FLAT = "FLAT",
    GUEST_HOUSE = "GUEST_HOUSE",
    HOTEL = "HOTEL",
    NONE = "NONE"
}

export interface SearchHousingRooms {
    beds: number,
    bedrooms: number,
    bathrooms: number
}

export default function Section2() {
    const { t } = useTranslation();
    
    const [priceRange, setPriceRange] = useState<number[]>([9, 360]);
    const [housingType, setHousingType] = useState<SearchHousingType>(SearchHousingType.NONE);
    
    const [bedsCounter, setBedsCounter] = useState(0);
    const [bedroomsCounter, setBedroomsCounter] = useState(0);
    const [bathroomsCounter, setBathroomsCounter] = useState(0);

    const [housingTypeDropdownOpened, setHousingTypeDropdownOpened] = useState(false);
    const [housingRoomsPopupOpened, setHousingRoomsPopupOpened] = useState(false);

    const dropdownOptions = Object.values(SearchHousingType).map((item) => ({ value: item, display: t(formatHousingType(item)) } as DropdownOption));

    const handlePriceRangeChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[]);
    };
    
    const handleTypeChange = (option: DropdownOption) => {
        setHousingType(option.value);
    }

    const formatHousingRooms = function (rooms: SearchHousingRooms): string {
        const formatRoomString = (labelKey: string, count: number): string => 
            count > 0 ? `${t(labelKey)}: ${count}` : '';
    
        const bedsString = formatRoomString('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Beds', rooms.beds);
        const bedroomsString = formatRoomString('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bedrooms', rooms.bedrooms);
        const bathroomsString = formatRoomString('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bathrooms', rooms.bathrooms);
    
        return [bedsString, bedroomsString, bathroomsString].filter(Boolean).join(' ').trim();
    }

    const handleTypeDropdownOpening = () => {
        setHousingTypeDropdownOpened(!housingTypeDropdownOpened);
    }  
    
    const handleRoomsPopupOpening = () => {
        setHousingRoomsPopupOpened(!housingRoomsPopupOpened);
    }

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
            <div className="filter-section filter-section--2">
                <div className='filter-panel housing-comp-filter'>
                    <div className='housing-type-filter'>
                        <div className='selector selector--types'>
                            <label>{t('SearchPage.SearchPanel.Filters.FilterType.Selector.Label')}</label>
                            <div className='img-container' onClick={handleTypeDropdownOpening}>
                                <img 
                                    className={`${housingTypeDropdownOpened ? 'opened' : 'closed'}`} 
                                    src={arrowBlue} />
                            </div>
                            
                            {housingTypeDropdownOpened ? (
                                <DropdownAddition options={dropdownOptions} onChange={handleTypeChange} className='type-dropdown' />
                            ) : ''}
                            
                        </div>
                        <div className='selected-type'>
                            {t(formatHousingType(housingType))}
                        </div>
                    </div>
                    <div className='housing-bedroom-filter'>
                        <div className='selector selector--rooms'>
                            <label>{t('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Label')}</label>
                            <div className='img-container' onClick={handleRoomsPopupOpening}>
                                <img 
                                    className={`${housingRoomsPopupOpened ? 'opened' : 'closed'}`}
                                    src={arrowBlue} />
                            </div>
                            {housingRoomsPopupOpened ? (
                            <div className='rooms-popup'>
                                <div className='room-item'>
                                    {t('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Beds')}
                                    <div className='controls-block'>
                                        <button className="counter-control travelers-decrease" onClick={() => handleDecrease(bedsCounter, setBedsCounter)}>                                    
                                            <div className="line"></div>
                                        </button>
                                        {bedsCounter}
                                        <button className="counter-control travelers-increase" onClick={() => handleIncrease(bedsCounter, setBedsCounter)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='divider'></div>
                                <div className='room-item'>
                                    {t('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bedrooms')}
                                    <div className='controls-block'>
                                        <button className="counter-control travelers-decrease" onClick={() => handleDecrease(bedroomsCounter, setBedroomsCounter)}>                                    
                                            <div className="line"></div>
                                        </button>
                                        {bedroomsCounter}
                                        <button className="counter-control travelers-increase" onClick={() => handleIncrease(bedroomsCounter, setBedroomsCounter)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='divider'></div>
                                <div className='room-item'>
                                    {t('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bathrooms')}
                                    <div className='controls-block'>
                                        <button className="counter-control travelers-decrease" onClick={() => handleDecrease(bathroomsCounter, setBathroomsCounter)}>                                    
                                            <div className="line"></div>
                                        </button>
                                        {bathroomsCounter}
                                        <button className="counter-control travelers-increase" onClick={() => handleIncrease(bathroomsCounter, setBathroomsCounter)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ) : ''}
                            
                        </div>
                        <div className='selected-bedrooms'>
                            {formatHousingRooms({ beds: bedsCounter, bedrooms: bedroomsCounter, bathrooms: bathroomsCounter })}
                        </div>
                    </div>
                </div>
                <div className='filter-panel price-filter'>
                    <div className='caption-block'>
                        <div className='caption'>
                            {t('SearchPage.SearchPanel.Filters.FilterPrice.Label')}
                        </div>
                        <div className='currency-label'>
                            EUR
                        </div>
                    </div>
                    <div className='slider-block'>
                        <Slider 
                            value={priceRange}
                            onChange={handlePriceRangeChange}
                            valueLabelDisplay='auto'
                            min={9}
                            max={360}
                            sx={{
                                '& .MuiSlider-rail': {
                                    backgroundColor: '#B7B7B7',
                                    boxShadow: '0px 0px 4px 5px rgba(0, 0, 0, 0.75) inset',
                                    borderRadius: '15px',
                                    height: '4px'
                                },
                                '& .MuiSlider-track': {
                                    backgroundColor: '#FD941A',
                                    borderRadius: '15px',
                                    border: '1px solid #9F9F9F',
                                    height: '4px'
                                },
                                '& .MuiSlider-thumb': {
                                    background: 'radial-gradient(50% 50% at 50% 50%, #FD941A 0%, #DF5114 100%)'
                                },
                                '& .MuiSlider-thumb.Mui-active': {
                                    boxShadow: '0'
                                },
                                '& .MuiSlider-thumb.Mui-focusVisible': {
                                    boxShadow: '0'
                                }
                            }}
                        />
                    </div>
                    <div className='minmax-block'>
                        <div className='min-label'>
                            9
                        </div>
                        <div className='max-label'>
                            360+
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

function formatHousingType(type: SearchHousingType): string {
    switch (type) {
        case SearchHousingType.FLAT:
            return 'SearchPage.SearchPanel.Filters.FilterType.Selector.Options.Flat';
        case SearchHousingType.GUEST_HOUSE:
            return 'SearchPage.SearchPanel.Filters.FilterType.Selector.Options.GuestHouse';
        case SearchHousingType.HOTEL:
            return 'SearchPage.SearchPanel.Filters.FilterType.Selector.Options.Hotel';
        case SearchHousingType.HOUSE:
            return 'SearchPage.SearchPanel.Filters.FilterType.Selector.Options.House';
        case SearchHousingType.NONE:
            return 'SearchPage.SearchPanel.Filters.FilterType.Selector.Options.None';
    }
}