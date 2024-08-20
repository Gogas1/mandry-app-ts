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

        if (yearsDifference <= 18) {
        } 
        else if (yearsDifference === 18) {
            if (currentDate.getMonth() < date.getMonth()) return BirthDateErrorCode.INVALID_DATE;
            if (currentDate.getMonth() === date.getMonth() && currentDate.getDate() <= date.getDate()) return BirthDateErrorCode.INVALID_DATE;
        }
        else {
            return BirthDateErrorCode.INVALID_DATE;
        }

        return undefined;
    }

}