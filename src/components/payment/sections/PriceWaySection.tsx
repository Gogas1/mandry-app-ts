import { useTranslation } from "react-i18next";
import { LongTermsBenefits, PaymentSettings } from "../PaymentPage";

import '../../../styles/payment/sections/price-way-section.scss';
import Radio from "../../app/Radio";
import { ReservationSettings } from "../../housing/rent/PriceSection";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserSettings } from "../../app/UserSettingsContext";

interface PriceWaySectionProps {
    reservationSettings: ReservationSettings;
    longTermBenefits: LongTermsBenefits;
    paymentSettings: PaymentSettings
    onWayChange: (value: boolean) => void;
}

export enum PaymentWay {
    FULL = "FULL",
    DIVIDED = "DIVIDED"
}

export default function PriceWaySection({ reservationSettings, longTermBenefits, paymentSettings, onWayChange }: PriceWaySectionProps) {
    const { t } = useTranslation();
    const { currency } = useUserSettings();

    const [selectedWay, setSelectedWay] = useState<PaymentWay>(PaymentWay.FULL);

    const handleChange = (value: string) => {
        if(value === PaymentWay.FULL) {
            onWayChange(false);
        }
        else if(value === PaymentWay.DIVIDED) {
            onWayChange(true);
        } else {
            onWayChange(false);
        }
    }

    return (
        <>
            <section className="price-way-section">
                <h2 className="price-way-section__header">                    
                    {t('PaymentPage.Sections.PaymentWay.Header')}
                </h2>
                <div className="price-way">
                    <div className="price-way__main">                        
                        {t('PaymentPage.Sections.PaymentWay.FullWay', { value: reservationSettings.calculatedPrice, currency: currency })}
                        <Radio name="priceWay" value={PaymentWay.FULL} onCheck={handleChange}/>
                    </div>
                </div>
                {longTermBenefits.secondPaymentDate && (
                    <div className="price-way">
                        <div className="price-way__main">
                            {t('PaymentPage.Sections.PaymentWay.DividedWay', { value: reservationSettings.calculatedPrice, currency: currency })}
                            <Radio name="priceWay" value={PaymentWay.FULL} onCheck={handleChange}/>
                        </div>
                        <div className="price-way__description">
                            {t('PaymentPage.Sections.PaymentWay.DividedWay', 
                                { 
                                    firstValue: paymentSettings.paymentPrice, 
                                    secondValue: paymentSettings.secondPaymentPrice,
                                    date: longTermBenefits.secondPaymentDate,
                                    currency: currency })}
                            {/* € 280,00 потрібно оплатити сьогодні, € 140,00 – 3 жовт. 2024 p. Жодних додаткових зборів. <Link to={'/'} className="link">Докладніше</Link> */}
                        </div>
                    </div>
                )}
            </section>
        </>
    );
}