import { Trans, useTranslation } from "react-i18next";
import { Feature, Housing } from "../../../housing/HousingPage";
import { useState } from "react";
import FeatureService from "../../../../helpers/FeatureService";

import '../../../../styles/payment/done/housing-info-section.scss';
import { Link } from "react-router-dom";
import { LongTermsBenefits, PaymentSettings } from "../../PaymentPage";

interface HousingInfoSectionProps {
    housingData: Housing;
    longTermBenefits: LongTermsBenefits;
    paymentSettings: PaymentSettings;
} 

export default function HousingInfoSection({ housingData, longTermBenefits }: HousingInfoSectionProps) {
    const { t } = useTranslation();

    const [rulesSectionExpanded, setRulesSectionExpanded] = useState(false);
    const [safetySectionExpanded, setSafetySectionExpanded] = useState(false);
    const [refundSectionExpanded, setRefundSectionExpanded] = useState(false);

    const groupRulesA = groupByProperty(housingData.features.filter(f => f.isHouseRule), "typeCode", 1);
    const groupRulesB = groupByProperty(housingData.features.filter(f => f.isHouseRule), "typeCode");

    const groupRulesSafetyA = groupByProperty(housingData.features.filter(f => f.isSafetyFeature), "typeCode", 1);
    const groupRulesSafetyB = groupByProperty(housingData.features.filter(f => f.isSafetyFeature), "typeCode");

    return (
        <>
            <section className="housing-info-section">
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
                    {!rulesSectionExpanded && (
                        <button 
                            className="show-more-btn" 
                            onClick={() => setRulesSectionExpanded(!rulesSectionExpanded)}>{t('HousingPage.Sections.IInfo.More')}
                        </button>
                    )}
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
                    {!safetySectionExpanded && (
                        <button 
                            className="show-more-btn" 
                            onClick={() => setSafetySectionExpanded(!safetySectionExpanded)}>{t('HousingPage.Sections.IInfo.More')}
                        </button>
                    )}
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
                    {!refundSectionExpanded && (
                        <button className="expand" onClick={() => setRefundSectionExpanded(true)}>
                            {t('PaymentPage.Sections.Refund.Expand')}
                        </button>
                    )}
                    {refundSectionExpanded && (
                        <div className="refund-statements">
                            {longTermBenefits.fullReturnAvailable && (
                                <div className="refund-statement">
                                    <div className="time-col">
                                        <p className="refund-header">{t('HousingPage.Sections.IInfo.Refund.Statements.FullRefund.TimeHeader')}</p>
                                        <p className="refund-body">{t('HousingPage.Sections.IInfo.Refund.Statements.FullRefund.TimeBody')}</p>
                                    </div>
                                    <div className="description-col">
                                        <p className="refund-header">{t('HousingPage.Sections.IInfo.Refund.Statements.FullRefund.DescHeader')}</p>
                                        <p className="refund-body">{t('HousingPage.Sections.IInfo.Refund.Statements.FullRefund.DescBody')}</p>
                                    </div>
                                </div>
                            )}    
                            <div className="refund-statement">
                                <div className="time-col">
                                    <p className="refund-header">{t('HousingPage.Sections.IInfo.Refund.Statements.HalfRefund.TimeHeader')}</p>
                                    <p className="refund-body">
                                        {t('HousingPage.Sections.IInfo.Refund.Statements.HalfRefund.TimeBody', 
                                            { 
                                                dateTime: FormatDateLongShort(longTermBenefits.halfReturnDate) 
                                            }
                                        )}
                                    </p>
                                </div>
                                <div className="description-col">
                                    <p className="refund-header">{t('HousingPage.Sections.IInfo.Refund.Statements.HalfRefund.DescHeader')}</p>
                                    <p className="refund-body">{t('HousingPage.Sections.IInfo.Refund.Statements.HalfRefund.DescBody')}</p>
                                </div>
                            </div>
                            <div className="refund-statement">
                                <div className="time-col">
                                    <p className="refund-header">{t('HousingPage.Sections.IInfo.Refund.Statements.NoRefund.TimeHeader')}</p>
                                    <p className="refund-body">
                                        {t('HousingPage.Sections.IInfo.Refund.Statements.NoRefund.TimeBody', 
                                            { 
                                                dateTime: FormatDateLongShort(longTermBenefits.halfReturnDate) 
                                            }
                                        )}
                                    </p>
                                </div>
                                <div className="description-col">
                                    <p className="refund-header">{t('HousingPage.Sections.IInfo.Refund.Statements.NoRefund.DescHeader')}</p>
                                    <p className="refund-body">{t('HousingPage.Sections.IInfo.Refund.Statements.NoRefund.DescBody')}</p>
                                </div>
                            </div>
                        </div>
                    )}
                    <p className="cleaning-refund">{t('HousingPage.Sections.IInfo.Refund.RefundCleaning')}</p>
                    <Link to={'/'} className="link">{t('HousingPage.Sections.IInfo.Refund.RefundMoreLink')}</Link>
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

function FormatDateLongShort(date: Date): string {
    return date.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
    });
};