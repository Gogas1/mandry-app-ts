import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import '../../../styles/payment/sections/refund-section.scss';
import { LongTermsBenefits, PaymentSettings } from "../PaymentPage";

interface RefundSectionProps {
    longTermBenefits: LongTermsBenefits;
    paymentSettings: PaymentSettings;
}

export default function RefundSection({ longTermBenefits }: RefundSectionProps) {
    const { t } = useTranslation();

    const [refundSectionExpanded, setRefundSectionExpanded] = useState(false);
    

    const handleExpanding = () => {
        setRefundSectionExpanded(!refundSectionExpanded);
    }

    return (
        <>
            <section className="info-section">
                <h3 className="info-section__header">
                    {t('HousingPage.Sections.IInfo.Refund.Header')}
                </h3>
                <div className="into-section__description">
                    <p>
                        <Trans 
                        i18nKey={'PaymentPage.Sections.Refund.Description'} 
                        components={{ 
                            desc1: <span className="desc1" />, 
                            desc2: <span className="desc2" />
                        }} />
                    </p>
                    {!refundSectionExpanded && (
                        <button className="expand" onClick={() => handleExpanding()}>
                            {t('PaymentPage.Sections.Refund.Expand')}
                        </button>
                    )}
                    
                </div>
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
        </>
    );
}

const FormatDateLongShort = (date: Date): string => {
    return date.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
    });
};