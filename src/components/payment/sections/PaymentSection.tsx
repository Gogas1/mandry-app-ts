import DropdownFieldIconed, { DropdownFieldIconedOption } from "../../app/Fields/DropdownFieldIconed";

import amexIcon from '../../../assets/icons/payment/amex.svg';
import cardIcon from '../../../assets/icons/payment/card.svg';
import gpayIcon from '../../../assets/icons/payment/gpay.svg';
import idealIcon from '../../../assets/icons/payment/ideal.svg';
import masterIcon from '../../../assets/icons/payment/master.svg';
import paypalIcon from '../../../assets/icons/payment/paypal.svg';
import sofortIcon from '../../../assets/icons/payment/sofort.svg';
import visaIcon from '../../../assets/icons/payment/visa.svg';
import { useState } from "react";
import CardForm from "./payment/CardForm";

import '../../../styles/payment/sections/payment-section.scss';
import { useTranslation } from "react-i18next";


export default function PaymentSection() {
    const [paymentType, setPaymentType] = useState<PaymentType>(PaymentType.CARD);

    const { t } = useTranslation();

    const handlePaymentTypeChange = (value: PaymentType) => {
        setPaymentType(value)
    }

    const getPaymentForm = () => {
        switch (paymentType) {
            case PaymentType.CARD:
                return <CardForm />
            default:
                return <CardForm />
        }
    }

    return (
        <>
            <section className="payment-section">
                <h2 className="payment-section__header">
                    {t('PaymentPage.Sections.Payment.Header')}
                </h2>
                <div className="payment-section__icons">
                    <img src={visaIcon} />
                    <img src={masterIcon} />
                    <img src={amexIcon} />
                    <img src={paypalIcon} />
                    <img src={idealIcon} />
                    <img src={sofortIcon} />
                    <img src={gpayIcon} />
                </div>
                <DropdownFieldIconed 
                    label="Метод оплати"
                    options={InitializePaymentList()} 
                    onChoose={handlePaymentTypeChange}
                    defaultOption={InitializePaymentList()[0]}/>
                {getPaymentForm()}
            </section>
        </>
    );
}

enum PaymentType {
    CARD = "CARD",
    PAYPAL = "PAYPAL",
    AMEX = "AMEX",
    GPAY = "GPAY",
    IDEAL = "IDEAL",
    SOFORT = "SOFORT"
}

function InitializePaymentList() : DropdownFieldIconedOption[] {
    return [
        {
            value: PaymentType.CARD,
            dispayValue: PaymentType.CARD,
            displayValueKey: "PaymentPage.Sections.Payment.Card",
            icon: cardIcon
        },
        {
            value: PaymentType.AMEX,
            dispayValue: PaymentType.AMEX,
            displayValueKey: "PaymentPage.Sections.Payment.Amex",
            icon: amexIcon
        },
        {
            value: PaymentType.PAYPAL,
            dispayValue: PaymentType.PAYPAL,
            displayValueKey: "PaymentPage.Sections.Payment.PayPal",
            icon: paypalIcon
        },
        {
            value: PaymentType.IDEAL,
            dispayValue: PaymentType.IDEAL,
            displayValueKey: "PaymentPage.Sections.Payment.iDeal",
            icon: idealIcon
        },
        {
            value: PaymentType.SOFORT,
            dispayValue: PaymentType.SOFORT,
            displayValueKey: "PaymentPage.Sections.Payment.Sofort",
            icon: sofortIcon
        },
        {
            value: PaymentType.GPAY,
            dispayValue: PaymentType.GPAY,
            displayValueKey: "PaymentPage.Sections.Payment.GooglePay",
            icon: gpayIcon
        }
    ]
}