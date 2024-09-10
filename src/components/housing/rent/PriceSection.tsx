import { Trans, useTranslation } from "react-i18next";
import DatePicker from "../../app/DatePicker/DatePicker";

import arrowDownIcon from '../../../assets/icons/meta/arrow2.svg';

import "../../../styles/housing/rent/price-section.scss";
import { useContext } from "react";
import AuthContext from "../../auth/AuthenticationContext";
import InlinePopup from "../../app/InlinePopup";
import { daysBetweenDates } from "../../../helpers/DateUtils";
import { useModal } from "../../app/ModalContext";
import AuthModal from "../../auth/AuthModal";
import TextInputMaterial from "../../app/TextInputMaterial";
import { Housing } from "../HousingPage";

interface PriceSectionProps {
    selecetedDates: { dateOne: Date | undefined, dateTwo: Date | undefined }
    price: number;
    housingData: Housing;
}

export default function PriceSection({ selecetedDates, price, housingData }: PriceSectionProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const { t } = useTranslation();

    const { openModal, closeModal } = useModal();
    const { authState } = authContext;

    const handleSignInOpening = () => {
        openModal('signInModal', <AuthModal hideModal={() => closeModal('signInModal')} />)
    }

    const cleaningFee = housingData.cleaningFee;
    const tax = 25;

    const discount = calculateDiscountedPrice(
        price, 
        selecetedDates.dateOne && 
                selecetedDates.dateTwo ? 
                daysBetweenDates(selecetedDates.dateOne, selecetedDates.dateTwo) : 
                0, 14);
    
    const nightsPrice = price * (selecetedDates.dateOne && 
        selecetedDates.dateTwo ? 
        daysBetweenDates(selecetedDates.dateOne, selecetedDates.dateTwo) : 
        0);

    const totalPrice = nightsPrice + cleaningFee + tax - discount;

    const formatDateToStandart = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad it to 2 digits
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear(); // Get the full year
        
        return `${day}.${month}.${year}`;
    };

    const daysBetween = getDatesBetween(selecetedDates.dateOne, selecetedDates.dateTwo);

    const PriceSummary = () => {
        return (
            <>
                <div className="price-summary">
                    <p className="price-summary__header">{t("HousingPage.RentSections.Price.PriceSummary.Header")}</p>
                    <hr className="price-summary__divider" />
                    <div className="price-summary__list">
                        {daysBetween.length > 0 ? daysBetween.map((date, index) => (
                            <div className="price-summary__item" key={index}>
                                <div className="item-date">{formatDateToStandart(date)}</div>
                                <div className="item-price">{t('HousingPage.RentSections.Price.PriceSummary.TotalPriceValued', { currency: "$", value: price })}</div>
                            </div>
                        )) : <p className="no-items">{t('HousingPage.RentSections.Price.PriceSummary.NoItems')}</p>}
                        
                    </div>
                    <hr className="price-summary__divider" />
                    <div className="price-summary__result">
                        <div className="result-label">
                            {t('HousingPage.RentSections.Price.PriceSummary.TotalPriceLabel')}
                        </div>
                        <div className="result-price">
                            {t('HousingPage.RentSections.Price.PriceSummary.TotalPriceValued', { currency: "$", value: nightsPrice })}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <section className="price-section">
                <div className="base-price">
                    <Trans i18nKey={"HousingPage.RentSections.Price.BasePrice"} 
                    components={{
                        priceText: <span className="base-price__price" /> 
                    }}
                    
                    values={{
                        price: price,
                        currency: "$"
                    }}/>
                </div>
                <div className="period-fields">
                    <DatePicker label={t("HousingPage.RentSections.Price.FromLabel")} onChange={c => c} className="white-field" disable={true}/>
                    <DatePicker label={t("HousingPage.RentSections.Price.ToLabel")} onChange={c => c} className="white-field" disable={true}/>
                </div>
                <div className="travelers-field">
                    <TextInputMaterial 
                        label={t("HousingPage.RentSections.Price.TravelersLabel")} 
                        onChange={s => s} 
                        className="white-field"
                        icon={arrowDownIcon}
                        iconCursorPointer={true} />
                </div>
                <div className="buttons">
                    {!authState.isAuthenticated ? (
                        <button onClick={handleSignInOpening}>Вхід</button>
                    ) : (
                        <button>Бронювання</button>
                    )}
                    
                    <label>Поки що ви нічого не платите</label>
                </div>
                <div className="price-items">
                    <div className="price-item">
                        <div className="price-item__statement">
                            <InlinePopup popupContent={<PriceSummary />}>
                                <Trans 
                                    i18nKey={'HousingPage.RentSections.Price.PriceFromNights'} 
                                    values={{
                                        price: 64,
                                        currency: "$",
                                        nightsCount: 
                                            selecetedDates.dateOne && 
                                            selecetedDates.dateTwo ? 
                                            daysBetweenDates(selecetedDates.dateOne, selecetedDates.dateTwo) : 
                                            0
                                    }}

                                    components={{
                                        fontLink: <span className="font-link" />
                                    }}

                                    count={selecetedDates.dateOne && 
                                        selecetedDates.dateTwo ? 
                                        daysBetweenDates(selecetedDates.dateOne, selecetedDates.dateTwo) : 
                                        0}
                                    />
                            </InlinePopup>
                            
                        </div>
                        <div className="price-item__price">$ {nightsPrice}</div>
                    </div>
                    <div className="price-item">
                        <div className="price-item__statement">
                            <InlinePopup 
                                popupContent={discount > 0 ? 
                                t('HousingPage.RentSections.Price.DiscountPopup.Available') : 
                                t('HousingPage.RentSections.Price.DiscountPopup.Unavailable')}>
                                <Trans i18nKey={'HousingPage.RentSections.Price.Discount'} 
                                        components={{
                                            fontLink: <span className="font-link" />
                                        }}/>
                            </InlinePopup>
                            
                        </div>
                        <div className={`price-item__price ${discount > 0 ? 'red' : ''}`}>
                            $ {discount}
                        </div>
                    </div>
                    <div className="price-item">
                        <div className="price-item__statement">
                            <InlinePopup popupContent={<div className="fee-popup">{t('HousingPage.RentSections.Price.CleaningFeePopup')}</div>}>
                                <Trans i18nKey={'HousingPage.RentSections.Price.CleaningFee'} 
                                        components={{
                                            fontLink: <span className="font-link" />
                                        }}/>
                            </InlinePopup>
                            
                        </div>
                        <div className="price-item__price">$ {cleaningFee}</div>
                    </div>
                    <div className="price-item">
                        <div className="price-item__statement">
                            <InlinePopup popupContent={<div className="taxes-popup">{t('HousingPage.RentSections.Price.TaxesPopup')}</div>}>
                                <Trans i18nKey={'HousingPage.RentSections.Price.Taxes'} 
                                        components={{
                                            fontLink: <span className="font-link" />
                                        }}/>
                            </InlinePopup>
                        </div>
                        <div className="price-item__price">$ {tax}</div>
                    </div>
                    <hr className="divider" />
                    <div className="total-price">
                        <div>
                            {t('HousingPage.RentSections.Price.PriceTotalLabel')}
                        </div>
                        <div>
                            {t('HousingPage.RentSections.Price.PriceTotalPrice', { currency: '$', value: totalPrice })}
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    );
}

function calculateDiscountedPrice(price: number, count: number, threshold: number): number {
    const totalPrice = price * count;

    let discount = 0;
    if (count >= threshold) {
         discount = totalPrice * 0.1;
    }

    return discount;
}

function getDatesBetween(startDate: Date | undefined, endDate: Date | undefined): Date[] {
    // If either of the dates is undefined, return an empty array
    if (!startDate || !endDate) {
        return [];
    }

    const dates: Date[] = [];
    let currentDate = new Date(startDate);

    // Ensure the endDate is after the startDate
    while (currentDate <= endDate) {
        // Add a copy of the current date to avoid mutating the original object
        dates.push(new Date(currentDate));

        // Increment the current date by one day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
}