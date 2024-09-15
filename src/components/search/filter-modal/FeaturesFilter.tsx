import { FilterSetting } from "../SearchPage";

import '../../../styles/search/filter-modal/features-filter.scss';
import { useTranslation } from "react-i18next";
import { Feature } from "../SearchPanel";
import FeatureService from "../../../helpers/FeatureService";
import CheckboxRound from "../../app/CheckboxRound";

interface FeaturesFilterProps {
    filters: FilterSetting;
    features: Feature[];
    filterChangeHandler: (filters: FilterSetting) => void;
}

export default function FeaturesFilter({ filters, features, filterChangeHandler }: FeaturesFilterProps) {
    const { t } = useTranslation();

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

    return (
        <>
            <div className="features-filter">
                <h2 className="features-filter__header">
                    {t('Modals.Filters.Sections.Features.Header')}
                </h2>
                <div className="features-filter__list">
                    {features.filter(f => !f.isHouseRule).map((feature, index) => (
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
            </div>
        </>
    );
}