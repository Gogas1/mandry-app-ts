import { FilterSetting } from "../SearchPage";

import '../../../styles/search/filter-modal/rooms-filters.scss';
import { useTranslation } from "react-i18next";

interface RoomsFiltersProps {
    filters: FilterSetting;
    filterChangeHandler: (filters: FilterSetting) => void;
}

export default function RoomsFilters({ filters, filterChangeHandler }: RoomsFiltersProps) {
    const { t } = useTranslation();

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
            <div className="rooms-filters">
                <h2 className="rooms-filters__header">
                    {t('Modals.Filters.Sections.Rooms.Header')}
                </h2>
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
        </>
    );
}