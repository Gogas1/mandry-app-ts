export enum EmailValidationErrorCode {
    REQUIRED = 'REQUIRED',
    INVALID_EMAIL = 'INVALID_EMAIL'
}

export enum PasswordValidationErrorCode {
    REQUIRED = 'REQUIRED',
    INVALID = 'INVALID',

    DIFF_PASSOWORDS = "DIFF_PASSWORDS"
}

export enum PhoneValidationErrorCode {
    REQUIRED = 'REQUIRED',
    NOT_VALIDATED = 'NOT_VALIDATED'
}

export enum NameValidationErrorCode {
    REQUIRED = "REQUIRED",
    NOT_VALIDATED = "NOT_VALIDATED"
}

export enum BirthDateErrorCode {
    REQUIRED = "REQUIRED",
    INVALID_DATE = "INVALID_DATE",
    NOT_VALIDATED = "NOT_VALIDATED"
}

export enum CardErrorCode {
    REQUIRED = "REQUIRED",
    INVALID_NUMBER = "INVALID_NUMBER",
}

export enum ExpirationDateErrorCode {
    REQUIRED = "REQUIRED",
    INVALID_DATE = "INVALID_DATE",
    EXPIRED = "EXPIRED"
}

export enum CVVErrorCode {
    REQUIRED = "REQUIRED",
    INVALID_CVV = "INVALID_CVV"
}

export enum LocationIndexErrorCode {
    REQUIRED = "REQUIRED",
    INVALID_LOCATION_INDEX = "INVALID_LOCATION_INDEX"
}

export default class CredentialValidator {

    static ValidateEmail(email: string): EmailValidationErrorCode | undefined {
        if(!email) return EmailValidationErrorCode.REQUIRED;
        
        if(email.includes('\"')) {
            const quotationParts = email.split('\"');

            if(quotationParts.length % 2 === 0) return EmailValidationErrorCode.INVALID_EMAIL;
            
            const quotedParts: string[] = [];
            const unquotedParts: string[] = [];

            for(let i = 0; i < quotationParts.length; i++) {
                if(i % 2 === 0) {
                    unquotedParts.push(quotationParts[i]);
                } else {
                    quotedParts.push(quotationParts[i]);
                }
            }

            if(unquotedParts[unquotedParts.length - 1].split('@').length != 2) {
                console.log(unquotedParts[unquotedParts.length - 1], unquotedParts[unquotedParts.length - 1].split('@'));
                return EmailValidationErrorCode.INVALID_EMAIL;
            } 
            if(unquotedParts.some(char => char.includes('..'))) {
                return EmailValidationErrorCode.INVALID_EMAIL;
            } 
            if(unquotedParts[unquotedParts.length - 1].split('.').length < 2) {
                return EmailValidationErrorCode.INVALID_EMAIL;
            } 
        }
        else {
            const emailParts = email.split('@');
            if(emailParts.length != 2) return EmailValidationErrorCode.INVALID_EMAIL;

            if(emailParts.some(char => char.includes('..'))) return EmailValidationErrorCode.INVALID_EMAIL;
            if(emailParts[1].split('.').length < 2) {
                return EmailValidationErrorCode.INVALID_EMAIL;
            } else if(emailParts[1].split('.').some(char => char === '')) {
                return EmailValidationErrorCode.INVALID_EMAIL;
            }
        }      
        
        return undefined;
    }

    static ValidatePassword(password: string, extendedValidation: boolean = false, passwordConfirmation: string = ''): PasswordValidationErrorCode | undefined {
        if(!password) return PasswordValidationErrorCode.REQUIRED;

        if(extendedValidation) {

            //Last validation step
            if(password != passwordConfirmation) return PasswordValidationErrorCode.DIFF_PASSOWORDS; 
        }

        return undefined;
    }

    static ValidatePhone(phone: string): PhoneValidationErrorCode | undefined {
        if(!phone) return PhoneValidationErrorCode.REQUIRED;

        return undefined;
    }

    static ValidateName(name: string): NameValidationErrorCode | undefined {
        if(!name) return NameValidationErrorCode.REQUIRED;

        return undefined;
    }

    static ValidateBirthDate(date: Date): BirthDateErrorCode | undefined {
        const currentDate = new Date();
        
        const yearsDifference = currentDate.getFullYear() - date.getFullYear();

        if (yearsDifference < 18) {
            return BirthDateErrorCode.INVALID_DATE;
        } 
        else if (yearsDifference === 18) {
            if (currentDate.getMonth() < date.getMonth()) return BirthDateErrorCode.INVALID_DATE;
            if (currentDate.getMonth() === date.getMonth() && currentDate.getDate() <= date.getDate()) return BirthDateErrorCode.INVALID_DATE;
        }

        return undefined;
    }

    static ValidateCardNumber(value: string): CardErrorCode | undefined {
        if(value.length == 0) return CardErrorCode.REQUIRED;
        const unWhiteSpacedValue = value.replace(' ', '');

        const sanitizedCardNumber = unWhiteSpacedValue.replace(/\D/g, '');

        if (sanitizedCardNumber.length !== 16) {
            return CardErrorCode.INVALID_NUMBER;
        }

        if (/^(\d)\1{15}$/.test(sanitizedCardNumber)) {
            return CardErrorCode.INVALID_NUMBER;
        }

        return undefined;
    }

    static ValidateExpirationDate(value: string): ExpirationDateErrorCode | undefined {
        if (value.length === 0) return ExpirationDateErrorCode.REQUIRED;
    
        const [month, year] = value.split("/").map(Number);
        if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < 0) {
            return ExpirationDateErrorCode.INVALID_DATE;
        }
    
        const currentYear = new Date().getFullYear() % 100; 
        const currentMonth = new Date().getMonth() + 1;
    
        if (year < currentYear || (year === currentYear && month < currentMonth)) {
            return ExpirationDateErrorCode.EXPIRED;
        }
    
        return undefined;
    }
    
    static ValidateCVV(value: string): CVVErrorCode | undefined {
        if (value.length === 0) return CVVErrorCode.REQUIRED;
    
        const sanitizedCVV = value.replace(/\D/g, '');
        const isValidLength = sanitizedCVV.length === 3;
    
        if (!isValidLength) {
            return CVVErrorCode.INVALID_CVV;
        }
    
        return undefined;
    }
    
    static ValidateLocationIndex(value: string): LocationIndexErrorCode | undefined {
        if (value.length === 0) return LocationIndexErrorCode.REQUIRED;
    
        return undefined;
    }

}