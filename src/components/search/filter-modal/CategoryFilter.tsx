import { useTranslation } from "react-i18next";
import { FilterSetting } from "../SearchPage";

import '../../../styles/search/filter-modal/category-filter.scss';
import { Category } from "../search-panel/Section2";

interface CategoryFilterProps {
    filters: FilterSetting;
    categories: Category[];
    filterChangeHandler: (filters: FilterSetting) => void;
}

export default function CategoryFilter({ filters, categories, filterChangeHandler }: CategoryFilterProps) {
    const { t } = useTranslation();

    const handleCategorySelection = (category: Category) => {
        const updatedFilters = {...filters};
        updatedFilters.category = category;
        
        filterChangeHandler(updatedFilters);
    }

    return (
        <>
            <div className="category-filter">
                <h2 className="category-filter__header">
                    {t('Modals.Filters.Sections.Category.Header')}
                </h2>
                <div className="category-filter__categories">
                    {categories.map((category, index) => (
                        <div 
                            className={`category ${category.id === filters.category?.id ? 'selected' : ''}`} 
                            key={index}
                            onClick={() => handleCategorySelection(category)}>
                            {t(category.nameKey)}
                        </div>
                    ))}                    
                </div>
            </div>
        </>
    );
}