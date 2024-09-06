import { useTranslation } from "react-i18next";
import { Housing } from "../HousingPage";

import '../../../styles/housing/sections/features-section.scss';
import { useState } from "react";

interface FeaturesSectionProps {
    housingData: Housing;
}

export default function FeaturesSection({ housingData }: FeaturesSectionProps) {
    const { t } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <section className="features-section">
                <h2 className="header">
                    {t('HousingPage.Sections.Features.Header')}
                </h2>
                <div className="features-columns">
                    <div className="features-columns__col-1">
                    </div>
                    <div className="features-columns__col-2">
                    </div>
                </div>
                <button className="show-more-btn" onClick={() => setIsExpanded(!isExpanded)}>
                    {t(!isExpanded ? 'HousingPage.Sections.Features.MoreBtn' : 'HousingPage.Sections.Features.LessBtn', { number: housingData.features.length })}
                </button>
            </section>
        </>
    );
}