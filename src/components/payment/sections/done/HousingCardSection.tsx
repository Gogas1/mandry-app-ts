import FeatureService from "../../../../helpers/FeatureService";
import { ReservationSettings, SummTravelers } from "../../../housing/rent/PriceSection";
import { PaymentSettings } from "../../PaymentPage";

import starIcon from '../../../../assets/icons/meta/star.svg';
import { useTranslation } from "react-i18next";
import { Housing } from "../../../housing/HousingPage";

import '../../../../styles/payment/done/housing-card-section.scss';
import { useUserSettings } from "../../../app/UserSettingsContext";

interface HousingCardSectionProps {
    reservationSettings: ReservationSettings;
    paymentSettings: PaymentSettings;
}

export default function HousingCardSection({ reservationSettings, paymentSettings }: HousingCardSectionProps) {
    const { t } = useTranslation();
    const { currency } = useUserSettings();

    const totalPrice = paymentSettings.paymentPrice;

    return (
        <>
            <section className="housing-card-section">
                
                    {GetHousingFirstImage(reservationSettings.housingData) && (
                        <div className="image">
                            <img src={FeatureService.getFeatureIcon(GetHousingFirstImage(reservationSettings.housingData))} />
                        </div>
                    )}
                <div className="housing-card-section__data">
                    <div className="data">
                        <p className="data__name">
                            {reservationSettings.housingData.name}
                        </p>                        
                        <p className="data__period">
                            {`${FormatDateLongShort(reservationSettings.selecetedDates.dateOne)} - ${FormatDateLongShort(reservationSettings.selecetedDates.dateTwo)}`}
                        </p>
                        <p className="data__guests">
                            {t('PaymentPage.Sections.Data.GuestsCount', 
                                { 
                                    number: SummTravelers(reservationSettings.travelersData), 
                                    count: SummTravelers(reservationSettings.travelersData) 
                                } )}
                        </p>
                    </div>
                </div>
                <hr className="divider" />
                <div className="housing-card-section__payment-data">
                    <div className="payment-data__total">
                        <span className="payment-data__total__label">
                            {t('PaymentPage.Sections.HousingData.Total')}
                        </span>
                        <span className="payment-data__total__price">
                            {t('PaymentPage.Sections.HousingData.Price',
                                {
                                    currency: currency,
                                    value: totalPrice,
                                }
                            )}
                        </span>
                    </div>
                </div>
                <hr className="divider" />
                <div className="housing-card-section__code">
                    <span className="code__label">
                        {t('PaymentPage.Done.Card.Code')}
                    </span>
                    <span className="code__code">
                        FR7KJ1YS3MO
                    </span>
                </div>
            </section>
        </>
    );
}

function GetHousingFirstImage(housingData: Housing): string {
    if (housingData.images.length < 1) return '';

    return housingData.images[1].src;
}

function FormatDateLongShort(date: Date): string {
    return date.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
    });
};