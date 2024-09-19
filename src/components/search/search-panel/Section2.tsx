import { Slider } from '@mui/material';
import arrowBlue from '../../../assets/icons/meta/arrow-blue.svg';

import { useTranslation } from "react-i18next";
import { SyntheticEvent, useState } from 'react';
import DropdownAddition, { DropdownOption } from '../../app/DropdownAddition';
import { FilterSetting, PricesRange } from '../SearchPage';

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

export type Category = {
    id: string,
    nameKey: string,
    isCategoryPropertyRequired: boolean,
    categoryPropertyDescriptionKey: string,
    categoryTranslations: Translation[]
    categoryPropertyTranslations: Translation[]
}

type Translation = {
    key: string;
    languageCode: string;
    text: string;
}

interface Section2Props {
    filters: FilterSetting;
    categories: Category[];
    priceRange: PricesRange;
    filterChangeHandler: (filters: FilterSetting) => void;
}

export default function Section2({ filters, categories, priceRange, filterChangeHandler }: Section2Props) {
    const { t } = useTranslation();

    const [housingTypeDropdownOpened, setHousingTypeDropdownOpened] = useState(false);
    const [housingRoomsPopupOpened, setHousingRoomsPopupOpened] = useState(false);
    const [sliderValue, setSliderValue] = useState<number | number[]>([filters.priceRange[0], filters.priceRange[1]]);

    const handlePriceStateChange = (event: Event, newValue: number | number[]) => {
        setSliderValue(newValue);
    }

    const categoriesOptions = categories.map(category => {
        return { display: t(category.nameKey), value: category } as DropdownOption;
    });

    const handlePriceRangeChange = (event: Event | SyntheticEvent, newValue: number | number[]) => {
        const updatedFilter = { ...filters }
        updatedFilter.priceRange = newValue as number[];
        filterChangeHandler(updatedFilter);
    };
    
    const handleTypeChange = (option: DropdownOption) => {
        const updatedFilter = { ...filters }
        updatedFilter.category = option.value;

        filterChangeHandler(updatedFilter);        
    }

    const formatHousingRooms = function (rooms: SearchHousingRooms): string {
        const formatRoomString = (labelKey: string, count: number): string => 
            count > 0 ? `${t(labelKey)}: ${count}` : '';
    
        const bedsString = formatRoomString('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Beds', rooms.beds);
        const bedroomsString = formatRoomString('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bedrooms', rooms.bedrooms);
        const bathroomsString = formatRoomString('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bathrooms', rooms.bathrooms);
    
        const result = [bedsString, bedroomsString, bathroomsString].filter(Boolean).join(' ').trim()

        return result ? result : t('SearchPage.SearchPanel.Filters.FilterRooms.NotSelected');
    }

    const handleTypeDropdownOpening = () => {
        setHousingTypeDropdownOpened(!housingTypeDropdownOpened);
    }  
    
    const handleRoomsPopupOpening = () => {
        setHousingRoomsPopupOpened(!housingRoomsPopupOpened);
    }

    const handleBedsChange = (value: number) => {
        if(value > -1) {
            const updatedFilter = { ...filters }
            updatedFilter.beds = value;
    
            filterChangeHandler(updatedFilter);
        }
    }

    const handleBedroomsChange = (value: number) => {
        if(value > -1) {
            const updatedFilter = { ...filters }
            updatedFilter.bedrooms = value;
    
            filterChangeHandler(updatedFilter);
        }
    }

    const handleBathroomsChange = (value: number) => {
        if(value > -1) {
            const updatedFilter = { ...filters }
            updatedFilter.bathrooms = value;
    
            filterChangeHandler(updatedFilter);
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
                                <DropdownAddition options={categoriesOptions} onChange={handleTypeChange} className='type-dropdown' />
                            ) : ''}
                            
                        </div>
                        <div className='selected-type'>
                            {filters.category ? (
                                t(filters.category.nameKey)
                            ): (
                                t('SearchPage.SearchPanel.Filters.FilterType.Selector.Options.None')
                            )}
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
                                        <button className="counter-control travelers-decrease" onClick={() => handleBedsChange(filters.beds - 1)}>                                    
                                            <div className="line"></div>
                                        </button>
                                        {filters.beds}
                                        <button className="counter-control travelers-increase" onClick={() => handleBedsChange(filters.beds + 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='divider'></div>
                                <div className='room-item'>
                                    {t('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bedrooms')}
                                    <div className='controls-block'>
                                        <button className="counter-control travelers-decrease" onClick={() => handleBedroomsChange(filters.bedrooms - 1)}>                                    
                                            <div className="line"></div>
                                        </button>
                                        {filters.bedrooms}
                                        <button className="counter-control travelers-increase" onClick={() => handleBedroomsChange(filters.bedrooms + 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className='divider'></div>
                                <div className='room-item'>
                                    {t('SearchPage.SearchPanel.Filters.FilterRooms.Selector.Options.Bathrooms')}
                                    <div className='controls-block'>
                                        <button className="counter-control travelers-decrease" onClick={() => handleBathroomsChange(filters.bathrooms - 1)}>                                    
                                            <div className="line"></div>
                                        </button>
                                        {filters.bathrooms}
                                        <button className="counter-control travelers-increase" onClick={() => handleBathroomsChange(filters.bathrooms + 1)}>
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            ) : ''}
                            
                        </div>
                        <div className='selected-bedrooms'>
                            {formatHousingRooms({ beds: filters.beds, bedrooms: filters.bedrooms, bathrooms: filters.bathrooms })}
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
                            value={sliderValue}
                            onChange={handlePriceStateChange}
                            onChangeCommitted={handlePriceRangeChange}
                            valueLabelDisplay='auto'
                            min={priceRange.minPrice}
                            max={priceRange.maxPrice}
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
                            {filters.priceRange[0]}
                        </div>
                        <div className='max-label'>
                            {filters.priceRange[1]}+
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}