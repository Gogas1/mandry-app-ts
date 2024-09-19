import { Trans, useTranslation } from "react-i18next";
import DatePicker from "../../app/DatePicker/DatePicker";

import arrowDownIcon from '../../../assets/icons/meta/arrow2.svg';

import "../../../styles/housing/rent/price-section.scss";
import { useContext, useState } from "react";
import AuthContext from "../../auth/AuthenticationContext";
import InlinePopup from "../../app/InlinePopup";
import { daysBetweenDates } from "../../../helpers/DateUtils";
import { useModal } from "../../app/ModalContext";
import AuthModal from "../../auth/AuthModal";
import TextInputMaterial from "../../app/TextInputMaterial";
import { Housing, UserData } from "../HousingPage";
import { Link } from "react-router-dom";
import TravelersPopup, { TravelersPopupData } from "../../home/TravelersPopup";
import { useUserSettings } from "../../app/UserSettingsContext";

export interface ReservationSettings {
    housingData: Housing,
    ownerData: UserData,
    selecetedDates: { dateOne: Date, dateTwo: Date }
    travelersData: TravelersPopupData;
    tax: number;
    calculatedPrice: number;
    discount: number;
}

interface PriceSectionProps {
    selecetedDates: { dateOne: Date | undefined, dateTwo: Date | undefined }
    price: number;
    housingData: Housing;
    ownerData: UserData;
    id: string;
}

export default function PriceSection({ selecetedDates, price, housingData, ownerData, id }: PriceSectionProps) {
    const authContext = useContext(AuthContext);
    if(!authContext) {
        throw new Error('AuthContext must be used within an AuthProvider');
    }

    const [travelersPopupOpened, setTravelersPopupOpened] = useState(false);
    const [travelersSettings, setTravelersSettings] = useState<TravelersPopupData>({ adults: 0, children: 0, toddlers: 0, pets: 0 });

    const { t } = useTranslation();
    const { currency } = useUserSettings();

    const { openModal, closeModal } = useModal();
    const { authState } = authContext;

    const handleSignInOpening = () => {
        openModal('signInModal', <AuthModal hideModal={() => closeModal('signInModal')} />)
    }

    const handleTravelersIconClick = () => {        
        setTravelersPopupOpened(!travelersPopupOpened);
    }

    const formatTravelers = () => {
        const number = SummTravelers(travelersSettings);
        return t('HousingPage.RentSections.Price.Travelers', {count: number, number: number});
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

    const handleTravelersChange = (values: TravelersPopupData) => {
        if(values.adults + values.children + values.toddlers <= housingData.maxGuests) {
            setTravelersSettings(values);
        }
    }

    const travelersConditionCapFunction = (values: TravelersPopupData) => {
        if(values.adults + values.children + values.toddlers <= housingData.maxGuests) return true;
        
        return false;
    }

    const daysBetween = getDatesBetween(selecetedDates.dateOne, selecetedDates.dateTwo);

    const getReservationSettings = () => {
        if(!selecetedDates.dateOne || !selecetedDates.dateTwo || SummTravelers(travelersSettings) <= 0) return undefined;
        return {
            housingData: housingData,
            selecetedDates: selecetedDates,
            travelersData: travelersSettings,
            tax: tax,
            calculatedPrice: totalPrice,
            discount: discount,
            ownerData: ownerData
        } as ReservationSettings;
    }

    const reservationSettings = getReservationSettings();

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
                                <div className="item-price">
                                    {t('HousingPage.RentSections.Price.PriceSummary.TotalPriceValued',
                                        {
                                            currency: currency,
                                            value: price
                                        })}
                                </div>
                            </div>
                        )) : <p className="no-items">{t('HousingPage.RentSections.Price.PriceSummary.NoItems')}</p>}
                        
                    </div>
                    <hr className="price-summary__divider" />
                    <div className="price-summary__result">
                        <div className="result-label">
                            {t('HousingPage.RentSections.Price.PriceSummary.TotalPriceLabel')}
                        </div>
                        <div className="result-price">
                            {t('HousingPage.RentSections.Price.PriceSummary.TotalPriceValued', { currency: currency, value: nightsPrice })}
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
                        currency: currency
                    }}/>
                </div>
                <div className="period-fields">
                    {selecetedDates.dateOne ? (
                       <DatePicker 
                            label={t("HousingPage.RentSections.Price.FromLabel")} 
                            onChange={c => c} 
                            className="white-field" 
                            outerValue={selecetedDates.dateOne}
                            disable={true}/> 
                    ) : (
                        <DatePicker 
                            label={t("HousingPage.RentSections.Price.FromLabel")} 
                            onChange={c => c} 
                            className="white-field" 
                            disable={true}/>
                    )}
                    {selecetedDates.dateTwo ? (
                       <DatePicker 
                            label={t("HousingPage.RentSections.Price.ToLabel")} 
                            onChange={c => c} 
                            className="white-field" 
                            outerValue={selecetedDates.dateTwo}
                            disable={true}/> 
                    ) : (
                        <DatePicker 
                            label={t("HousingPage.RentSections.Price.ToLabel")} 
                            onChange={c => c} 
                            className="white-field" 
                            disable={true}/>
                    )}
                    {/* <DatePicker label={t("HousingPage.RentSections.Price.ToLabel")} onChange={c => c} className="white-field" disable={true}/> */}
                </div>
                <div className="travelers-field">
                    <TextInputMaterial 
                        label={t("HousingPage.RentSections.Price.TravelersLabel")} 
                        onChange={s => s} 
                        className={`white-field ${travelersPopupOpened ? 'popup-opened' : ''}`}
                        icon={arrowDownIcon}
                        iconCursorPointer={true}
                        disabled={true}
                        onIconClick={handleTravelersIconClick}
                        outerValue={formatTravelers()} />
                    <TravelersPopup 
                        isOpen={travelersPopupOpened}
                        closeAll={handleTravelersIconClick}
                        onChange={handleTravelersChange}
                        showBackButton={false}
                        className="price-section-tpopup"
                        capConditionFunction={travelersConditionCapFunction}                       
                    />
                </div>
                <div className="buttons">
                    {!authState.isAuthenticated ? (
                        <button onClick={handleSignInOpening}>{t("HousingPage.RentSections.Price.ButtonSignin")}</button>
                    ) : (
                        reservationSettings ? (
                            <Link 
                            to={`/housing/payment/${id}`}
                            state={reservationSettings}>{t("HousingPage.RentSections.Price.ButtonReservation")}</Link>
                        ) : (
                            <button className="disabled">{t("HousingPage.RentSections.Price.ButtonReservation")}</button>
                        ) 
                    )}
                    
                    <label>{t("HousingPage.RentSections.Price.NoPaymentLabel")}</label>
                </div>
                <div className="price-items">
                    <div className="price-item">
                        <div className="price-item__statement">
                            <InlinePopup popupContent={<PriceSummary />}>
                                <Trans 
                                    i18nKey={'HousingPage.RentSections.Price.PriceFromNights'} 
                                    values={{
                                        price: 64,
                                        currency: currency,
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
                        <div className="price-item__price">{currency} {nightsPrice}</div>
                    </div>
                    <div className="price-item">
                        <div className="price-item__statement">
                            <InlinePopup 
                                popupContent={discount > 0 ? 
                                (<div className="discount-popup">{t('HousingPage.RentSections.Price.DiscountPopup.Available')}</div>) : 
                                (<div className="discount-popup">{t('HousingPage.RentSections.Price.DiscountPopup.Unavailable')}</div>)}>
                                <Trans i18nKey={'HousingPage.RentSections.Price.Discount'} 
                                        components={{
                                            fontLink: <span className="font-link" />
                                        }}/>
                            </InlinePopup>
                            
                        </div>
                        <div className={`price-item__price ${discount > 0 ? 'red' : ''}`}>
                            {`${currency} ${discount}`}
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
                        <div className="price-item__price">{currency} {cleaningFee}</div>
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
                        <div className="price-item__price">{currency} {tax}</div>
                    </div>
                    <hr className="divider" />
                    <div className="total-price">
                        <div>
                            {t('HousingPage.RentSections.Price.PriceTotalLabel')}
                        </div>
                        <div>
                            {t('HousingPage.RentSections.Price.PriceTotalPrice', { currency: currency, value: totalPrice })}
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

function formatDateToStandart(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0'); // Get the day and pad it to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear(); // Get the full year
    
    return `${day}.${month}.${year}`;
};

export function SummTravelers(values: TravelersPopupData) {
    return values.adults + values.children + values.toddlers;
}