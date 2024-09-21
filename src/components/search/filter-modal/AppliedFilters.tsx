import { useTranslation } from 'react-i18next';
import '../../../styles/search/filter-modal/applied-filters.scss';
import { FilterSetting } from '../SearchPage';

// import crossIcon from '../../../assets/icons/meta/close-cross.svg';

interface AppliedFiltersProps {
    filters: FilterSetting;
}

export default function AppliedFilters({  }: AppliedFiltersProps) {
    const { t } = useTranslation();

    return (
        <>
            <div className="applied-filters">
                <h2 className='applied-filters__header'>{t('Modals.Filters.Sections.AppliedFilters.Header')}</h2>
                <div className='applied-filters__list'>
                    {/* <div className='list-item'>
                        WiFi
                        <button className='list-item-delete'>
                            <img src={crossIcon} />
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
}