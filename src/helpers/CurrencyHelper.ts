export enum Currency {
    USD = "$",
    EUR = "€",
    UAH = "₴"
}

export class CurrencyHelper {
    static USD = {
        translationString: "Currency.USD",
        value: Currency.USD
    }

    static EUR = {
        translationString: "Currency.EUR",
        value: Currency.EUR
    }

    static UAH = {
        translationString: "Currency.UAH",
        value: Currency.UAH
    }
}