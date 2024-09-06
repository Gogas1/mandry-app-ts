import { useState } from "react";
import { useTranslation } from "react-i18next";

import '../../../styles/housing/sections/description-section.scss';
import { Housing } from "../HousingPage";

interface DescriptionSectionProps {
    className?: string;
    housingData: Housing;
}

export default function DescriptionSection({ className = '', housingData }: DescriptionSectionProps) {
    const { t } = useTranslation();

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <>
            <section className={`description-section ${className}`}>
                <div className="text short">
                    {housingData.shortDescription}
                </div>
                {isExpanded ? 
                (
                    <div className="text full">
                        {housingData.description}
                    </div>
                ) : ''}
                
                <button className="more-button" onClick={() => setIsExpanded(!isExpanded)}>
                    {t(!isExpanded ? 'HousingPage.Sections.Description.MoreButton' : 'HousingPage.Sections.Description.LessButton')}
                </button>
            </section>
        </>
    );
}