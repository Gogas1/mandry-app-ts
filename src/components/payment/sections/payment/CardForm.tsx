import { useTranslation } from "react-i18next";
import TextInputMaterial from "../../../app/TextInputMaterial";
import { useState } from "react";
import CredentialValidator, { CardErrorCode, CVVErrorCode, ExpirationDateErrorCode, LocationIndexErrorCode } from "../../../../helpers/validation/CredentialValidator";
import ValidationError from "../../../app/Validation/ValidationError";

export interface CardData {
    number: string;
    period: string;
    cvv: string;
    index: string;
    location: string;
}

export default function CardForm() {
    const { t } = useTranslation(); 

    const [cardData, setCardData] = useState<CardData>({
        number: "",
        period: "",
        cvv: "",
        index: "",
        location: ""
    })

    const [cardNumberValidation, setCardNumberValidation] = useState<CardErrorCode>();
    const [periodValidation, setPeriodValidation] = useState<ExpirationDateErrorCode>();
    const [cvvValidation, setCvvValidation] = useState<CVVErrorCode>();
    const [indexValidation, setIndexValidation] = useState<LocationIndexErrorCode>();

    const formatCardNumber = (value: string): string => {
        return value.replace(/\D/g, '')
          .replace(/(\d{4})(?=\d)/g, '$1 ')
          .trim();
    };

    function formatExpirationDate(input: string): string {
        // Remove any non-digit characters from the input
        const cleanedInput = input.replace(/\D/g, '');

        // Handle empty input to allow clearing the field
        if (cleanedInput === '') return '';

        // Get the first two digits for the month
        const month = cleanedInput.slice(0, 2);

        // Get the next two digits for the year
        const year = cleanedInput.slice(2, 4);

        // Add a slash between month and year if year part exists
        if (year.length > 0) {
            return `${month.padStart(2, '0')} / ${year}`;
        }

        // If only the month is present
        return month;
      }

    const handleNumberChange = (value: string) => {
        const updatedCardData = { ...cardData };
        updatedCardData.number = value;

        setCardNumberValidation(CredentialValidator.ValidateCardNumber(value));
        setCardData(updatedCardData);
    }

    const handlePeriodChange = (value: string) => {
        const updatedCardData = { ...cardData };
        updatedCardData.period = value;

        setPeriodValidation(CredentialValidator.ValidateExpirationDate(value));
        setCardData(updatedCardData);
    }

    const handleCvvChange = (value: string) => {
        const updatedCardData = { ...cardData };
        updatedCardData.cvv = value;

        setCvvValidation(CredentialValidator.ValidateCVV(value));
        setCardData(updatedCardData);
    }

    const handleIndexChange = (value: string) => {
        const updatedCardData = { ...cardData };
        updatedCardData.index = value;

        setIndexValidation(CredentialValidator.ValidateLocationIndex(value));
        setCardData(updatedCardData);
    }

    const handleLocationChange = (value: string) => {
        const updatedCardData = { ...cardData };
        updatedCardData.location = value;

        setCardData(updatedCardData);
    }

    return (
        <>
            <form className="card-form form-payment">
                <div className="input-block">
                    <TextInputMaterial 
                        label={t('PaymentPage.Sections.Payment.Forms.Card.Number')}
                        onChange={handleNumberChange}
                        validationError={cardNumberValidation ? true : false}
                        className="white-field"
                        outerValue={formatCardNumber(cardData.number)}
                    />
                    {cardNumberValidation && (
                        <ValidationError 
                            label={t(GetCardNumberErrorKey(cardNumberValidation))} />
                    )}
                </div>

                <div className="input-block">
                    <div className="card-form__row">
                        <TextInputMaterial 
                            label={t('PaymentPage.Sections.Payment.Forms.Card.Period')}
                            onChange={handlePeriodChange}
                            validationError={periodValidation ? true : false}
                            className="white-field"
                            outerValue={formatExpirationDate(cardData.period)}
                        />
                        <TextInputMaterial 
                            label={t('PaymentPage.Sections.Payment.Forms.Card.CVV')}
                            onChange={handleCvvChange}
                            validationError={cvvValidation ? true : false}
                            className="white-field"
                        />
                    </div>
                    {(periodValidation || cvvValidation) && (
                        <ValidationError 
                            label={t(GetDateAndCvvErrorKey(periodValidation, cvvValidation))} />
                    )}
                </div>
                
                <div className="input-block">
                    <TextInputMaterial 
                        label={t('PaymentPage.Sections.Payment.Forms.Card.Index')}
                        onChange={handleIndexChange}
                        validationError={indexValidation ? true : false}
                        className="white-field"
                    />
                    {indexValidation && (
                        <ValidationError 
                            label={t(GetIndexErrorKey(indexValidation))} />
                    )}
                </div>
                
                <TextInputMaterial 
                    label={t('PaymentPage.Sections.Payment.Forms.Card.Location')}
                    onChange={handleLocationChange}
                    className="white-field"
                />
            </form>
        </>
    );
}

function GetCardNumberErrorKey(code: CardErrorCode) {
    switch (code) {
        case CardErrorCode.REQUIRED:
            return "PaymentPage.Sections.Payment.Forms.Card.Validation.Number.Required";
        case CardErrorCode.INVALID_NUMBER:
            return "PaymentPage.Sections.Payment.Forms.Card.Validation.Number.Invalid";
    }
}

function GetDateAndCvvErrorKey(dateCode: ExpirationDateErrorCode | undefined, cvvCode: CVVErrorCode | undefined) {
    if(dateCode === ExpirationDateErrorCode.REQUIRED || cvvCode === CVVErrorCode.REQUIRED) {
        return "PaymentPage.Sections.Payment.Forms.Card.Validation.DateAndCCV.Required";
    } else if (dateCode || cvvCode) {
        return "PaymentPage.Sections.Payment.Forms.Card.Validation.DateAndCCV.Invalid";
    } else {
        return '';
    }
}

function GetIndexErrorKey(code: LocationIndexErrorCode) {
    switch (code) {
        case LocationIndexErrorCode.INVALID_LOCATION_INDEX:
            return "PaymentPage.Sections.Payment.Forms.Card.Validation.Index.Invalid";
        case LocationIndexErrorCode.REQUIRED:
            return "PaymentPage.Sections.Payment.Forms.Card.Validation.Index.Required";
    }
}