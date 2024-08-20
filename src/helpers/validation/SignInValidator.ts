export enum EmailValidationErrorCode {
    REQUIRED = 'REQUIRED',
    INVALID_EMAIL = 'INVALID_EMAIL'
}

export enum PasswordValidationErrorCode {
    REQUIRED = 'REQUIRED'
}

export enum PhoneValidationErrorCode {
    REQUIRED = 'REQUIRED',
    NOT_VALIDATED = 'NOT_VALIDATED'
}

export default class SignInValidator {

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

    static ValidatePassowrd(password: string): PasswordValidationErrorCode | undefined {
        if(!password) return PasswordValidationErrorCode.REQUIRED;

        return undefined;
    }

    static ValidatePhone(phone: string): PhoneValidationErrorCode | undefined {
        if(!phone) return PhoneValidationErrorCode.REQUIRED;

        return undefined;
    }

}