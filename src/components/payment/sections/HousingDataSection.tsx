import { Housing } from "../../housing/HousingPage";
import { ReservationSettings } from "../../housing/rent/PriceSection";
import { PaymentSettings } from "../PaymentPage";

import starIcon from '../../../assets/icons/meta/star.svg';
import { useTranslation } from "react-i18next";
import { daysBetweenDates } from "../../../helpers/DateUtils";
import FeatureService from "../../../helpers/FeatureService";

import '../../../styles/payment/sections/housing-data-section.scss';

interface HousingDataSectionProps {
    reservationSettings: ReservationSettings;
    paymentSettings: PaymentSettings;
}

export default function HousingDataSection({ reservationSettings, paymentSettings }: HousingDataSectionProps) {
    const { t } = useTranslation();

    const cleaningFee = reservationSettings.housingData.cleaningFee;
    const tax = reservationSettings.tax;

    const discount = reservationSettings.discount;
    
    const nightsPrice = reservationSettings.housingData.pricePerNight * 
    daysBetweenDates(reservationSettings.selecetedDates.dateOne, reservationSettings.selecetedDates.dateTwo);

    const totalPrice = paymentSettings.paymentPrice;

    return (
        <>
            <section className="housing-data-section">
                <div className="housing-data-section__data">
                    {GetHousingFirstImage(reservationSettings.housingData) && (
                        <div className="image">
                            <img src={FeatureService.getFeatureIcon(GetHousingFirstImage(reservationSettings.housingData))} />
                        </div>
                    )}                    
                    <div className="data">
                        <p className="data__name">
                            {reservationSettings.housingData.name}
                        </p>
                        <p className="data__property">
                            {reservationSettings.housingData.categoryProperty}
                        </p>
                        <div className="data__rating">
                            <img src={starIcon} />
                            <span>
                                {t('PaymentPage.Sections.HousingData.Rating', 
                                    {
                                        average: reservationSettings.housingData.averageRating.toFixed(2),
                                        reviews: reservationSettings.housingData.reviewsCount,
                                        count: reservationSettings.housingData.reviewsCount
                                    })}
                            </span>
                        </div>
                    </div>
                </div>
                <hr className="divider" />
                <div className="housing-data-section__payment-data">
                    <p className="payment-data__header">{t('PaymentPage.Sections.HousingData.PriceHeader')}</p>

                    <div className="payment-data__price-item">
                        <span className="payment-data__price__amount">
                            {t('PaymentPage.Sections.HousingData.PriceFromNights',
                                {
                                    currency: '$',
                                    price: reservationSettings.housingData.pricePerNight,
                                    nightsCount: daysBetweenDates(reservationSettings.selecetedDates.dateOne, reservationSettings.selecetedDates.dateTwo),
                                    count: daysBetweenDates(reservationSettings.selecetedDates.dateOne, reservationSettings.selecetedDates.dateTwo)
                                }
                            )}
                        </span>
                        <span className="payment-data__price__total">
                            {t('PaymentPage.Sections.HousingData.Price',
                                {
                                    currency: '$',
                                    value: nightsPrice,
                                }
                            )}
                        </span>
                    </div>

                    <div className="payment-data__price-item">
                        <span className="payment-data__price__amount">
                            {t('PaymentPage.Sections.HousingData.Discount')}
                        </span>
                        <span className="payment-data__price__total">
                            {t('PaymentPage.Sections.HousingData.Price',
                                {
                                    currency: '$',
                                    value: discount,
                                }
                            )}
                        </span>
                    </div>

                    <div className="payment-data__price-item">
                        <span className="payment-data__price__amount">
                            {t('PaymentPage.Sections.HousingData.CleaningFee')}
                        </span>
                        <span className="payment-data__price__total">
                            {t('PaymentPage.Sections.HousingData.Price',
                                {
                                    currency: '$',
                                    value: cleaningFee,
                                }
                            )}
                        </span>
                    </div>

                    <div className="payment-data__price-item">
                        <span className="payment-data__price__amount">
                            {t('PaymentPage.Sections.HousingData.Taxes')}
                        </span>
                        <span className="payment-data__price__total">
                            {t('PaymentPage.Sections.HousingData.Price',
                                {
                                    currency: '$',
                                    value: tax,
                                }
                            )}
                        </span>
                    </div>

                    <div className="payment-data__total">
                        <span className="payment-data__total__label">
                            {t('PaymentPage.Sections.HousingData.Total')}
                        </span>
                        <span className="payment-data__total__price">
                            {t('PaymentPage.Sections.HousingData.Price',
                                {
                                    currency: '$',
                                    value: totalPrice,
                                }
                            )}
                        </span>
                    </div>
                </div>
            </section>
        </>
    );
}

function GetHousingFirstImage(housingData: Housing): string {
    if(housingData.images.length < 1) return '';
    
    return housingData.images[1].src;
}