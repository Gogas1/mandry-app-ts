import { Trans, useTranslation } from "react-i18next";
import { Feature, Housing } from "../HousingPage";
import { useState } from "react";
import FeatureService from "../../../helpers/FeatureService";

import '../../../styles/housing/sections/important-info-section.scss';
import { Link } from "react-router-dom";

interface ImportantInfoSectionProps {
    housingData: Housing
} 

export default function ImportantInfoSection({ housingData }: ImportantInfoSectionProps) {
    const { t } = useTranslation();

    const [rulesSectionExpanded, setRulesSectionExpanded] = useState(true);
    const [safetySectionExpanded, setSafetySectionExpanded] = useState(true);
    const [refundSectionExpanded, setRefundSectionExpanded] = useState(true);

    const groupRulesA = groupByProperty(housingData.features.filter(f => f.isHouseRule), "typeCode", 1);
    const groupRulesB = groupByProperty(housingData.features.filter(f => f.isHouseRule), "typeCode");

    const groupRulesSafetyA = groupByProperty(housingData.features.filter(f => f.isSafetyFeature), "typeCode", 1);
    const groupRulesSafetyB = groupByProperty(housingData.features.filter(f => f.isSafetyFeature), "typeCode");

    return (
        <>
            <section className="important-info-section">
                <h2 className="header">
                    {t('HousingPage.Sections.IInfo.Header')}
                </h2>
                <section className="info-section">
                    <h3 className="info-section__header">
                        {t('HousingPage.Sections.IInfo.HouseRules.Header')}
                    </h3>
                    <p className="into-section__description">
                        {t('HousingPage.Sections.IInfo.HouseRules.Description')}
                    </p>
                    <div className="features-col">
                        {Object.entries(rulesSectionExpanded ? groupRulesA : groupRulesB).map(([type, feature], index) => {
                            return (
                                <>
                                    <div className="features-block" key={index}>
                                        <h3 className="features-type">
                                            {t(type)}
                                        </h3>
                                        {feature.map((f, index) => {
                                            return (
                                                <>
                                                    <div className="feature" key={index}>
                                                        <div className="feature__icon">
                                                            <img src={FeatureService.getFeatureIcon(f.featureIcon.src)} />
                                                        </div>
                                                        
                                                        <div className="feature__data">
                                                            <div className="feature__name">
                                                                {!f.parameters ? t(f.nameCode) : (
                                                                    t(f.nameCode, FeatureService.processParameters(f.parameters))
                                                                )}
                                                            </div>
                                                            {f.descriptionCode ? (
                                                                <div className="feature__description">{t(f.descriptionCode)}</div>
                                                            ) : ''}
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <button 
                        className="show-more-btn" 
                        onClick={() => setRulesSectionExpanded(!rulesSectionExpanded)}>{t('HousingPage.Sections.IInfo.More')}
                    </button>
                </section>
                <section className="info-section">
                    <h3 className="info-section__header">
                        {t('HousingPage.Sections.IInfo.Safety.Header')}
                    </h3>
                    <p className="into-section__description">
                        {t('HousingPage.Sections.IInfo.Safety.Description')}
                    </p>
                    <div className="features-col">
                        {Object.entries(rulesSectionExpanded ? groupRulesSafetyA : groupRulesSafetyB).map(([type, feature], index) => {
                            return (
                                <>
                                    <div className="features-block" key={index}>
                                        <h3 className="features-type">
                                            {t(type)}
                                        </h3>
                                        {feature.map((f, index) => {
                                            return (
                                                <>
                                                    <div className="feature" key={index}>
                                                        <div className="feature__icon">
                                                            <img src={FeatureService.getFeatureIcon(f.featureIcon.src)} />
                                                        </div>
                                                        
                                                        <div className="feature__data">
                                                            <div className="feature__name">
                                                                {!f.parameters ? t(f.nameCode) : (
                                                                    t(f.nameCode, FeatureService.processParameters(f.parameters))
                                                                )}
                                                            </div>
                                                            {f.descriptionCode ? (
                                                                <div className="feature__description">{t(f.descriptionCode)}</div>
                                                            ) : ''}
                                                        </div>
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                </>
                            );
                        })}
                    </div>
                    <button 
                        className="show-more-btn" 
                        onClick={() => setSafetySectionExpanded(!safetySectionExpanded)}>{t('HousingPage.Sections.IInfo.More')}
                    </button>
                </section>
                <section className="info-section">
                    <h3 className="info-section__header">
                        {t('HousingPage.Sections.IInfo.Refund.Header')}
                    </h3>
                    <p className="into-section__description">
                        <Trans 
                            i18nKey={'HousingPage.Sections.IInfo.Refund.Description'}
                            components={{
                                linkA: <Link to={'/'} className="link" />
                            }} />
                    </p>
                    <div>

                    </div>
                    <button 
                        className="show-more-btn" 
                        onClick={() => setRefundSectionExpanded(!refundSectionExpanded)}>{t('HousingPage.Sections.IInfo.More')}
                    </button>
                </section>
            </section>
        </>
    );
}

type GroupedRecord = Record<string, Feature[]>;

function groupByProperty(items: Feature[], key: keyof Feature, limit?: number): GroupedRecord {
    return items.reduce((acc, item, index) => {        
        if(index && index == limit) return acc;

        const groupKey = item[key] as string;
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(item);
        return acc;
    }, {} as GroupedRecord);
}