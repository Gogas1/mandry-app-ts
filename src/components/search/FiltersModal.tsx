import { useTranslation } from 'react-i18next';
import crossIcon from '../../assets/icons/meta/close-cross.svg';

import '../../styles/search/filters-modal.scss';
import { convertToFilterSettings, FilterSetting, PricesRange, toQueryString } from './SearchPage';
import AppliedFilters from './filter-modal/AppliedFilters';
import RoomsFilters from './filter-modal/RoomsFilters';
import { useEffect, useState } from 'react';
import PriceFilter from './filter-modal/PriceFilter';
import CategoryFilter from './filter-modal/CategoryFilter';
import { Category } from './search-panel/Section2';
import { Feature } from './SearchPanel';
import FeaturesFilter from './filter-modal/FeaturesFilter';
import ReservationFilter from './filter-modal/ReservationFilter';
import LanguagesFilter from './filter-modal/LanguagesFilter';

interface FiltersModalProps {
    filters: FilterSetting;
    categories: Category[];
    features: Feature[];
    priceRange: PricesRange;
    hideModal: () => void;
    searchHandler: (settings: FilterSetting) => void;
    filterChangeHandler: (filters: FilterSetting) => void;
}

export default function FiltersModal(
    { 
        filters, 
        categories, 
        features, 
        priceRange,
        hideModal, 
        searchHandler, 
        filterChangeHandler, 
    }: FiltersModalProps) {
    const { t } = useTranslation();
    const [filtersSettings, setFiltersSettings] = useState({ ...filters });
    const [amountFound, setAmountFound] = useState(0);
    
    useEffect(() => {
        filterHousingsCount(filtersSettings);
    }, [filtersSettings]);

    const filterHousingsCount = async (filters: FilterSetting) => {
        const queryString = toQueryString(convertToFilterSettings(filters));
        const url = import.meta.env.VITE_REACT_APP_BACKEND_URL + `/housing/filter?${queryString}`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if(response.ok) {
                const data = await response.json();
                setAmountFound(data.housings.length);
            }   
        }
        catch (error) {
            console.error(error);
        }
    }

    const clearFilters = () => {
        handleFilterChange({
            destination: "",
            period: undefined,
            travelers: { adults: 0, children: 0, toddlers: 0, pets: 0 },
            category: undefined,
            beds: 0,
            bedrooms: 0,
            bathrooms: 0,
            features: [],
            priceRange: [priceRange.minPrice, priceRange.maxPrice],
            languages: []
        } as FilterSetting);
    }
    
    const handleFilterChange = (filters: FilterSetting) => {
        setFiltersSettings(filters);
        filterChangeHandler(filters);
    }

    return (
        <>
            <div className="filters-modal-wrapper">
                <div className="filter-modal-panel">
                    <div className='header-section'>
                        <h1 className='filter-modal-panel__header'>
                            {t('Modals.Filters.Header')}
                        </h1>
                        <hr className='divider-gray' />
                    </div>
                    <div className='body-section'>
                        <AppliedFilters filters={filters} />
                        <hr className='divider-gray' />
                        <RoomsFilters filters={filtersSettings} filterChangeHandler={handleFilterChange} />
                        <hr className='divider-gray' />
                        <PriceFilter 
                            filters={filtersSettings} 
                            priceRange={priceRange}
                            filterChangeHandler={handleFilterChange}/>
                        <hr className='divider-gray' />
                        <CategoryFilter 
                            filters={filtersSettings} 
                            categories={categories}
                            filterChangeHandler={handleFilterChange} />
                        <hr className='divider-gray' />
                        <FeaturesFilter
                            filters={filtersSettings}
                            features={features}
                            filterChangeHandler={handleFilterChange}
                         />
                        <hr className='divider-gray' />
                        <ReservationFilter />
                        <hr className='divider-gray' />
                        <LanguagesFilter />
                    </div>
                    
                    <div className='result-buttons'>
                        <hr className='divider-gray' />
                        <div className='buttons'>
                            <button className='button-clear' onClick={clearFilters}>
                                {t('Modals.Filters.Clear')}
                            </button>
                            <button className='button-search' onClick={() => searchHandler(filtersSettings)}>
                                {t('Modals.Filters.Search', {number: amountFound})}
                            </button>
                        </div>
                        
                    </div>
                </div>
                <button className="filter-modal-close" onClick={hideModal}>
                    <img src={crossIcon} />
                </button>
            </div>
        </>
    );
}