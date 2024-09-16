import { useTranslation } from 'react-i18next';
import crossIcon from '../../assets/icons/meta/close-cross.svg';

import '../../styles/search/filters-modal.scss';
import { FilterSetting, PricesRange } from './SearchPage';
import AppliedFilters from './filter-modal/AppliedFilters';
import RoomsFilters from './filter-modal/RoomsFilters';
import { useState } from 'react';
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
    amountFound: number;
    hideModal: () => void;
    searchHandler: () => void;
    clearFilterHandler: () => void;
    filterChangeHandler: (filters: FilterSetting) => void;
}

export default function FiltersModal(
    { 
        filters, 
        categories, 
        features, 
        priceRange, 
        amountFound,
        hideModal, 
        searchHandler, 
        filterChangeHandler, 
        clearFilterHandler 
    }: FiltersModalProps) {
    const { t } = useTranslation();
    const [filtersSettings, setFiltersSettings] = useState({ ...filters });
    
    
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
                            filters={filters}
                            features={features}
                            filterChangeHandler={filterChangeHandler}
                         />
                        <hr className='divider-gray' />
                        <ReservationFilter />
                        <hr className='divider-gray' />
                        <LanguagesFilter />
                    </div>
                    
                    <div className='result-buttons'>
                        <hr className='divider-gray' />
                        <div className='buttons'>
                            <button className='button-clear' onClick={clearFilterHandler}>
                                {t('Modals.Filters.Clear')}
                            </button>
                            <button className='button-search' onClick={searchHandler}>
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